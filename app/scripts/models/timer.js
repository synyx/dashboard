define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        initialize: function (options) {

            _.bindAll(this, 'run', 'stop', 'tick');

            this.timerModel = options.timerModel;

            Backbone.Events.bind('pause', this.stop);
            Backbone.Events.bind('play', this.run);
        },

        tick: function () {
            var seconds = this.timerModel.get('seconds');

            if (seconds > 0 && this.timerModel.get('isRunning')) {
                seconds = seconds - 1;
                this.timerModel.set('seconds', seconds);
            }

            if (seconds <= 0) {
                console.log('Number of seconds is now ' + seconds + '. Triggering event next.');
                Backbone.Events.trigger('next');
            }
        },

        run: function (startValue) {

            if (!isNaN(startValue)) {
                this.timerModel.set('seconds', startValue);
                console.log('Set start seconds to ' + startValue + '.');
            } else {
                console.log('Starting the timer');
            }

            if (!this.timerModel.get('isRunning')) {
                console.log('Starting the timer');
                this.timerModel.set('isRunning', true);
                this.clock = setInterval(this.tick, 1000);
            }
        },

        stop: function () {
            clearInterval(this.clock);
            this.timerModel.set('isRunning', false);
        }
    });
});