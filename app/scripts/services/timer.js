define([
    'backbone'
], function (Backbone) {
    'use strict';

    var tick = 50; // every ${tick}ms

    return Backbone.Model.extend({

        initialize: function (options) {

            _.bindAll(this, 'play', 'stop', 'tick');

            this.model = options.model;

            Backbone.Events.bind('pause', this.stop);
            Backbone.Events.bind('play', this.play);
        },

        tick: function () {
            var secondsLeft = this.model.get('secondsLeft');
            var isRunning = this.model.get('isRunning');

            if (isRunning) {
                if (secondsLeft > 0) {
                    this.model.set('secondsLeft', (secondsLeft - (tick / 1000)));
                }
                else {
                    console.log('Triggering next event');
                    Backbone.Events.trigger('next');
                }
            }
        },

        play: function (startValue) {
            if (startValue) {
                this.model.set({
                    seconds: startValue,
                    secondsLeft: startValue
                });
                console.log('Set duration to: ' + startValue + 's');
            }

            if (!this.model.get('isRunning')) {
                this.model.set('isRunning', true);
                this.tickIntervall = setInterval(this.tick, tick);
                console.log('Starting the timer');
            }
        },

        stop: function () {
            clearInterval(this.tickIntervall);
            this.model.set('isRunning', false);
        }
    });
});