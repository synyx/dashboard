define(['services/timer', 'models/status'], function (Timer, StatusModel) {
    'use strict';

    describe('Timer test suite', function () {

        var sut;
        var model;

        beforeEach(function () {
            model = new StatusModel({});
            sut = new Timer({
                model: model
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
                model.on('next', function () {
                    done();
                });

                model.set({isRunning: true, secondsLeft: 0});
                sut.tick();
            });

            it('reduce seconds exactly of one tick (tick = 50ms)', function () {
                model.set({isRunning: true, secondsLeft: 5});
                sut.tick();

                expect(model.get('secondsLeft')).to.be.equal(4.95);
            });

            it('do nothing if not running', function () {
                model.set({isRunning: false});
                sut.tick();

                expect(model.get('secondsLeft')).to.be.undefined;
                expect(model.get('isRunning')).to.be.false;
            });
        });

        describe('function play to', function () {
            it('start the slides', function () {
                var tickSpy = sinon.spy(sut, 'tick');

                model.set({isRunning: false});
                sut.play(10);

                expect(model.get('seconds')).to.be.equal(10);
                expect(model.get('secondsLeft')).to.be.equal(10);
                expect(model.get('isRunning')).to.be.true;
                expect(tickSpy).to.have.been.calledOnce;
            });

            it('resume', function () {
                var tickSpy = sinon.spy(sut, 'tick');

                model.set({isRunning: false});
                sut.play();

                expect(model.get('seconds')).to.be.undefined;
                expect(model.get('secondsLeft')).to.be.undefined;
                expect(model.get('isRunning')).to.be.true;
                expect(tickSpy).to.have.been.calledOnce;
            });
        });

        describe('function stop to', function () {
            it('stop', function () {
                model.set({isRunning: true});
                sut.stop();

                expect(model.get('isRunning')).to.be.false;
            });
        });
    });
});