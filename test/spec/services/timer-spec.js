define(['services/timer', 'models/status'], function (Timer, StatusModel) {
    'use strict';

    describe('Timer test suite', function () {

        var sut;
        var status;

        beforeEach(function () {
            status = new StatusModel({});
            sut = new Timer({
                model: status
            });
        });

        describe('instantiation', function () {

            it('can be instantiated', function () {
                expect(sut).to.exist;
            });

            it('throws when no model is given', function () {
                expect(function () {
                    new Timer();
                }).to.throw();
            });
        });

        describe('function tick to', function () {

            it('triggers next page', function (done) {
                Backbone.Events.bind('next', function () {
                    done();
                });

                status.set({isRunning: true, secondsLeft: 0});
                sut.tick();
            });

            it('reduce seconds exactly of one tick (tick = 50ms)', function () {
                status.set({isRunning: true, secondsLeft: 5});
                sut.tick();

                expect(status.get('secondsLeft')).to.be.equal(4.95);
            });

            it('do nothing if not running', function () {
                status.set({isRunning: false});
                sut.tick();

                expect(status.get('secondsLeft')).to.be.undefined;
                expect(status.get('isRunning')).to.be.false;
            });
        });

        describe('function play to', function () {

            it('start the slides', function () {

                var tickSpy = sinon.spy(sut, 'tick');

                status.set({isRunning: false});
                sut.play(10);

                expect(status.get('seconds')).to.be.equal(10);
                expect(status.get('secondsLeft')).to.be.equal(10);
                expect(status.get('isRunning')).to.be.true;
                expect(tickSpy).to.have.been.calledOnce;
            });

            it('resume', function () {

                var tickSpy = sinon.spy(sut, 'tick');

                status.set({isRunning: false});
                sut.play();

                expect(status.get('seconds')).to.be.undefined;
                expect(status.get('secondsLeft')).to.be.undefined;
                expect(status.get('isRunning')).to.be.true;
                expect(tickSpy).to.have.been.calledOnce;
            });
        });

        describe('function stop to', function () {

            it('stop', function () {
                status.set({isRunning: true});
                sut.stop();

                expect(status.get('isRunning')).to.be.false;
            });
        });
    });
});