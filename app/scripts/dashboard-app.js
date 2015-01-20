define([
    'backbone',
    'models/source-collection',
    'models/status-model',
    'models/timer-model',
    'models/source',
    'models/header',
    'models/content',
    'models/dashboard-model',
    'views/dashboard-view',
    'services/source-provider',
    'services/source-filter',
    'services/timer'
], function (Backbone, SourceCollection, StatusModel, TimerModel, SourceModel, HeaderModel, ContentModel, DashboardModel,
             DashboardView,
             SourceProvider, SourceFilter, Timer) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            tagString: undefined,
            sources: new SourceCollection(),
            headerModel: new HeaderModel(),
            contentModel: new ContentModel(),
            statusModel: new StatusModel(),
            timerModel: new TimerModel()
        },

        initialize: function () {
            _.bindAll(this, 'contentLoaded', 'contentLoadedBackward', 'nextTriggered', 'prevTriggered', 'filter');

            Backbone.Events.bind('next', this.nextTriggered);
            Backbone.Events.bind('prev', this.prevTriggered);

            this.dashboardModel = new DashboardModel({
                headerModel: this.get('headerModel'),
                contentModel: this.get('contentModel'),
                timerModel: this.get('timerModel'),
                statusModel: this.get('statusModel')
            });
            new DashboardView({
                el: $('#dashboard'),
                model: this.dashboardModel
            });

            this.sourceProvider = new SourceProvider({
                listingUrl: this.get('listingUrl'),
                contentUrl: this.get('contentUrl')
            });

            this.sourceFilter = new SourceFilter({
                tagString: this.get('tagString')
            });

            this.timerService = new Timer({
                model: this.get('timerModel')
            });

            this.nextTriggered();
        },

        filter: function (sources) {
            var filteredSources = this.sourceFilter.filter(sources);
            if (filteredSources.size() === 0) {
                var tags = filteredSources.pluck('tags').join('; ');
                filteredSources.add(new SourceModel({
                        header: new HeaderModel({name: 'Sorry, no content there...'}),
                        content: new ContentModel({
                            content: 'No content is coming back (maybe after filtering).<br/><br/> ' +
                                'Tag-String used: <b>' + this.get('tagString') + '</b><br/><br/>' +
                                'There were ' + filteredSources.size() + ' entries in the unfiltered list with tags : ' + tags
                        })
                    })
                );
            }
            return filteredSources;
        },

        contentLoaded: function (sources) {
            sources = this.filter(sources);

            this.get('statusModel').set({
                current: 0,
                total: sources.length
            });
            this.set('sources', sources);
            this.nextTriggered();
        },

        contentLoadedBackward: function (sources) {
            sources = this.filter(sources);

            this.get('statusModel').set({
                current: sources.length + 1,
                total: sources.length
            });
            this.set('sources', sources);
            this.prevTriggered();
        },

        nextTriggered: function () {
            var status = this.get('statusModel');
            var nextIndex = status.get('current');
            var sourceCollection = this.get('sources');

            if (nextIndex < sourceCollection.length) {
                var nextSource = sourceCollection.at(nextIndex);

                this.get('headerModel').set(nextSource.get('header').attributes);
                this.get('contentModel').set(nextSource.get('content').attributes);

                status.set('current', nextIndex + 1);
                this.timerService.play(nextSource.get('importance') * 20);
            }
            else {
                this.sourceProvider.getSources(this.contentLoaded);
            }
        },

        prevTriggered: function () {
            var status = this.get('statusModel');
            var previousIndex = status.get('current') - 1;
            var sourceCollection = this.get('sources');

            if (previousIndex > 0) {
                var previousSource = sourceCollection.at(previousIndex);

                this.get('headerModel').set(previousSource.get('header').attributes);
                this.get('contentModel').set(previousSource.get('content').attributes);

                status.set('current', previousIndex);
                this.timerService.play(previousSource.get('importance') * 20);
            }
            else {
                console.log('Cannot display first... ' + previousIndex + ' <= 0');
                this.sourceProvider.getSources(this.contentLoadedBackward);
            }
        }
    });
});