define([
    'backbone',
    'models/content-collection',
    'models/status-model',
    'models/timer-model',
    'models/content',
    'models/dash-model',
    'models/content-provider',
    'models/content-filter',
    'models/timer',
    'views/dash-view'
], function (Backbone, ContentCollection, StatusModel, TimerModel, ContentModel, DashModel, ContentProvider, ContentFilter, Timer, DashView) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            dashModel: undefined,
            dashView: undefined,

            tagString: '',
            contentList: new ContentCollection(),
            status: new StatusModel(),
            timerModel: new TimerModel()
        },

        initialize: function () {
            _.bindAll(this, 'contentLoaded', 'contentLoadedBackward', 'nextTriggered', 'prevTriggered');

            var content = new ContentModel({
                name: 'Please wait while this is loading...'
            });
            content.set('statusModel', this.get('status'));

            this.dashModel = new DashModel({
                content: content,
                timerModel: this.get('timerModel'),
                status: this.get('status')
            });

            this.dashView = new DashView({
                el: $('#page'),
                model: this.dashModel
            });

            Backbone.Events.bind('next', this.nextTriggered);
            Backbone.Events.bind('prev', this.prevTriggered);

            this.contentProvider = new ContentProvider({
                listingurl: this.get('listingurl'),
                contenturl: this.get('contenturl')
            });

            this.contentFilter = new ContentFilter({
                tagString: this.get('tagString')
            });

            this.timer = new Timer({timerModel: this.get('timerModel')});
            this.nextTriggered();
        },

        filter: function (l) {
            var list = this.contentFilter.filter(l);
            if (list.size() === 0) {
                var tags = l.pluck('tags').join('; ');
                list.add(new ContentModel({
                    name: 'Sorry, No content there...',
                    content: 'No content is coming back (maybe after filtering).<br/><br/> ' +
                        'Tag-String used: <b>' + this.get('tagString') + '</b><br/><br/>' +
                        'There were ' + l.size() + ' entries in the unfiltered list with tags : ' + tags
                }));
            }
            return list;
        },

        contentLoaded: function (list) {
            list = this.filter(list);

            var status = this.get('status');
            status.set({current: 0, total: list.length});
            this.set('contentList', list);
            this.nextTriggered();
        },

        contentLoadedBackward: function (list) {
            list = this.filter(list);

            var status = this.get('status');
            status.set({current: list.length + 1, total: list.length});
            this.set('contentList', list);
            this.prevTriggered();
        },

        nextTriggered: function () {
            var status = this.get('status');

            var nextIndex = status.get('current');
            var list = this.get('contentList');

            if (nextIndex >= list.length) {
                this.contentProvider.getContent(this.contentLoaded);
                // todo: show 'loading?'
            } else {
                var next = list.at(nextIndex);

                this.dashModel.set('content', next);

                status.set('current', nextIndex + 1);
                var importance = next.get('importance');
                this.timer.run(importance * 20);
            }
        },

        prevTriggered: function () {
            var status = this.get('status');

            var prevIndex = status.get('current') - 1;
            var list = this.get('contentList');

            if (prevIndex <= 0) {
                console.log('Cannot display first... ' + prevIndex + ' <= 0');
                this.contentProvider.getContent(this.contentLoadedBackward);
            } else {
                console.log('Displaying number ' + prevIndex);

                var prev = list.at(prevIndex - 1);
                this.dashModel.set('content', prev);
                status.set('current', prevIndex);

                var importance = prev.get('importance');
                this.timer.run(importance * 20);
            }
        }
    });
});