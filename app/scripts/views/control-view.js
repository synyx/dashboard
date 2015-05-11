define([
    'backbone',
    'underscore',
    'template-manager/template-manager',
    'services/defined-checker'
], function (Backbone, _, templateManager, definedChecker) {
    'use strict';

    var ControlView = Backbone.View.extend({

        templateNamePrev: 'ControlViewPrev',
        templateNameNext: 'ControlViewNext',

        events: {
            'click .control-prev': 'prev',
            'click .control-next': 'next'
        },

        initialize: function (options) {
            definedChecker.isDefined(options.elPrev, 'previous element');
            definedChecker.isDefined(options.elNext, 'next element');

            _.bindAll(this, 'render', 'prev', 'next', 'pauseOrPlay', 'bindKeyPress');

            this.elPrev = options.elPrev;
            this.elNext = options.elNext;

            this.templatePrev = templateManager.getTemplate(this.templateNamePrev);
            this.templateNext = templateManager.getTemplate(this.templateNameNext);

            this.render();

            this.bindKeyPress();
        },

        create: function (options) {
            return new ControlView(options);
        },

        render: function () {
            this.elPrev.html(this.templatePrev());
            this.elNext.html(this.templateNext());
        },

        prev: function () {
            this.model.trigger('prev');
        },

        next: function () {
            this.model.trigger('next');
        },

        pauseOrPlay: function () {
            if (this.model.get('isRunning')) {
                this.model.trigger('pause');
            } else {
                this.model.trigger('play');
            }
        },

        bindKeyPress: function () {
            var that = this;
            $(document).keydown(function (event) {
                event.preventDefault();
                switch (event.keyCode) {
                    case 37:
                        that.prev();
                        break;
                    case 39:
                        that.next();
                        break;
                    case 32:
                        that.pauseOrPlay();
                        break;
                }
            });
        }
    });

    return ControlView;
});
