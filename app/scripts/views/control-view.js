define([
    'backbone',
    'template-manager/template-manager'
], function (Backbone, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateNamePrev: 'ControlViewPrev',
        templateNameNext: 'ControlViewNext',

        initialize: function (options) {
            _.bindAll(this, 'render', 'prev', 'next', 'pauseOrPlay');

            this.elPrev = options.elPrev;
            this.elNext = options.elNext;

            this.templatePrev = templateManager.getTemplate(this.templateNamePrev);
            this.templateNext = templateManager.getTemplate(this.templateNameNext);

            this.render();

            this.bindKeyPress();
            this.registerEvents();
        },

        render: function () {
            this.elPrev.html(this.templatePrev(this.model.toJSON()));
            this.elNext.html(this.templateNext(this.model.toJSON()));
        },

        registerEvents: function () {
            $('#control-prev').on('click', $.proxy(this.prev, this));
            $('#control-next').on('click', $.proxy(this.next, this));
        },

        prev: function () {
            Backbone.Events.trigger('prev');
        },

        next: function () {
            Backbone.Events.trigger('next');
        },

        pauseOrPlay: function () {
            if (this.model.get('isRunning')) {
                Backbone.Events.trigger('pause');
            } else {
                Backbone.Events.trigger('play');
            }
        },

        bindKeyPress: function () {
            var that = this;
            $(document).keydown(function (event) {
                event.stopPropagation();
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
});