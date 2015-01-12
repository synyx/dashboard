define([
    'backbone',
    'template-manager'
], function (Backbone, templateManager) {
    'use strict';

    return Backbone.View.extend({

        templateName: 'ControlView',

        events: {
            'click .reload': 'reload',
            'click .prev': 'prev',
            'click .next': 'next',
            'click .pause': 'pause',
            'click .play': 'play'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'reload', 'prev', 'next', 'pause', 'play', 'pauseOrPlay');

            this.model.bind('change', this.render);

            this.template = templateManager.getTemplate(this.templateName);
            this.render();

            this.bindKeyPress();
        },

        bindKeyPress: function () {
            var self = this;
            $(document).keydown(function (e) {
                if (e.keyCode === 37) { // left
                    self.prev();
                    return false;
                }
                else if (e.keyCode === 39) { // right
                    self.next();
                    return false;
                }
                else if (e.keyCode === 32) { // space
                    self.pauseOrPlay();
                    return false;
                }
            });
        },

        render: function () {
            var model = this.model.toJSON();
            this.$el.html(this.template(model));
        },

        reload: function () {
            Backbone.Events.trigger('reload');
        },

        prev: function () {
            Backbone.Events.trigger('prev');
        },

        next: function () {
            Backbone.Events.trigger('next');
        },

        pause: function () {
            Backbone.Events.trigger('pause');
        },

        play: function () {
            Backbone.Events.trigger('play');
        },

        pauseOrPlay: function () {
            if (this.model.get('isRunning')) {
                Backbone.Events.trigger('pause');
            } else {
                Backbone.Events.trigger('play');
            }
        }
    });
});