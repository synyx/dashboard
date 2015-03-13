define([
    'backbone',
    'template-manager/template-manager'
], function (Backbone, templateManager) {
    'use strict';

    var ControlView = Backbone.View.extend({

        templateNamePrev: 'ControlViewPrev',
        templateNameNext: 'ControlViewNext',

        initialize: function (options) {
            _.bindAll(this, 'render', 'prev', 'next', 'pauseOrPlay');

            // TODO is defined check
            this.elPrev = options.elPrev;
            this.elNext = options.elNext;

            this.templatePrev = templateManager.getTemplate(this.templateNamePrev);
            this.templateNext = templateManager.getTemplate(this.templateNameNext);

            this.render();

            this.bindKeyPress();
            this.registerEvents();
        },

        create: function (options) {
            'use strict';
            return new ControlView(options);
        },

        render: function () {
            this.elPrev.html(this.templatePrev());
            this.elNext.html(this.templateNext());
        },

        registerEvents: function () {
            $('.control-prev').on('click', $.proxy(this.prev, this));
            $('.control-next').on('click', $.proxy(this.next, this));
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

    return ControlView;
});