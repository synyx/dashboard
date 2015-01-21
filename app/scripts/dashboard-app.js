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
], function (Backbone, SourceCollection, StatusModel, TimerModel, SourceModel, HeaderModel, ContentModel, DashboardModel, DashboardView, SourceProvider, SourceFilter, Timer) {
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
            _.bindAll(this, 'start', 'contentLoaded', 'triggerPrev', 'triggerNext', 'changeSource', 'filter');

            Backbone.Events.bind('prev', this.triggerPrev);
            Backbone.Events.bind('next', this.triggerNext);

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

            Number.prototype.mod = function (n) {
                return ((this % n) + n) % n;
            };

            this.start();
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

        start: function () {
            this.sourceProvider.getSources(this.contentLoaded);
        },

        contentLoaded: function (sources) {
            sources = this.filter(sources);

            this.get('statusModel').set({
                current: undefined,
                next: 0,
                prev: sources.length - 1,
                total: sources.length
            });
            this.set('sources', sources);
            this.triggerNext();
        },

        triggerNext: function () {
            this.changeSource(this.get('statusModel').get('next'));
        },

        triggerPrev: function () {
            this.changeSource(this.get('statusModel').get('prev'));
        },

        changeSource: function (index) {
            var status = this.get('statusModel');
            var source = this.get('sources').at(index);

            this.get('headerModel').set(source.get('header').attributes);
            this.get('contentModel').set(source.get('content').attributes);

            status.set('prev', (index - 1).mod(status.get('total')));
            status.set('current', index);
            status.set('next', (index + 1).mod(status.get('total')));

            this.timerService.play(source.get('importance') * 20);
        }
    });
});