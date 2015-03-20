define([
    'backbone',
    'template-manager/template-manager',
    'services/defined-checker'
], function (Backbone, templateManager, definedChecker) {
    'use strict';

    var TimeLineView = Backbone.View.extend({

        templateName: 'TimeLineView',

        initialize: function () {
            definedChecker.isDefined(this.model, 'model');

            _.bindAll(this, 'render', 'drawBar');

            this.template = templateManager.getTemplate(this.templateName);

            this.listenTo(this.model, 'change', this.drawBar);
            this.render();
        },

        create: function (options) {
            'use strict';
            return new TimeLineView(options);
        },

        render: function () {
            this.$el.html(this.template());
        },

        drawBar: function () {
            var secondsLeft = this.model.get('secondsLeft');
            var seconds = this.model.get('seconds');
            this.$('.content-timer-line').css({
                width: ((seconds - secondsLeft) / seconds) * 100 + '%'
            });
        }
    });

    return TimeLineView;
});