define([
    'backbone',
    'jquery',
    'models/source',
    'models/sources',
    'models/status',
    'models/header',
    'models/content',
    'models/dashboard',
    'views/dashboard-view',
    'services/source-provider',
    'services/source-filter',
    'services/timer'
], function (Backbone, $, SourceModel, Sources, StatusModel, HeaderModel, ContentModel, DashboardModel, DashboardView, SourceProvider, SourceFilter, Timer) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            contentUrl: undefined,
            listingUrl: undefined,
            providedTags: undefined,
            sources: new Sources(),
            headerModel: new HeaderModel(),
            contentModel: new ContentModel(),
            statusModel: new StatusModel()
        },

        initialize: function () {
            _.bindAll(this, 'render', 'initializeLoadSources', 'loadSources', 'triggerPrev', 'triggerNext', 'changeSource', 'filter');

            Number.prototype.mod = function (n) {
                return ((this % n) + n) % n;
            };

            Backbone.Events.bind('prev', this.triggerPrev);
            Backbone.Events.bind('next', this.triggerNext);

            this.sourceProvider = new SourceProvider({
                listingUrl: this.get('listingUrl'),
                contentUrl: this.get('contentUrl')
            });

            this.sourceFilter = new SourceFilter({
                providedTags: this.get('providedTags')
            });

            this.timerService = new Timer({
                model: this.get('statusModel')
            });

            this.initializeLoadSources();
            this.render();
        },

        render: function () {
            new DashboardView({
                el: $('#dashboard'),
                model: new DashboardModel({
                    headerModel: this.get('headerModel'),
                    contentModel: this.get('contentModel'),
                    statusModel: this.get('statusModel'),
                    sources: this.get('sources')
                })
            });
        },

        filter: function (sources) {
            var filteredSources = this.sourceFilter.filter(sources);
            if (filteredSources.size() === 0) {
                var tags = filteredSources.pluck('tags').join('; ');
                filteredSources.add(new SourceModel({
                        header: new HeaderModel({name: 'Sorry, no content there...'}),
                        content: new ContentModel({
                            content: 'No content is coming back (maybe after filtering).<br/><br/> ' +
                                'Tag-String used: <b>' + this.get('providedTags') + '</b><br/><br/>' +
                                'There were ' + filteredSources.size() + ' entries in the unfiltered list with tags : ' + tags
                        }),
                        importance: 1000
                    })
                );
            }
            return filteredSources;
        },

        initializeLoadSources: function () {
            this.sourceProvider.getSources(this.loadSources);
            this.triggerNext();
        },

        loadSources: function (sources) {
            var filteredSources = this.filter(sources);

            this.get('statusModel').set({
                current: undefined,
                next: 0,
                prev: filteredSources.length - 1,
                total: filteredSources.length
            });
            this.get('sources').reset(filteredSources.toArray());
        },

        triggerNext: function () {
            this.changeSource(this.get('statusModel').get('next'));
        },

        triggerPrev: function () {
            this.changeSource(this.get('statusModel').get('prev'));
        },

        changeSource: function (index) {

            var status = this.get('statusModel');
            if (index === status.get('next') && status.get('next') === 0) {
                this.sourceProvider.getSources(this.loadSources);
            }

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