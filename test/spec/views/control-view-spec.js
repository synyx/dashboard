define(['views/control-view', 'models/status', 'jquery'], function (ControlView, modelModel, $) {
    'use strict';

    describe('Control view test suite', function () {

        var sut;
        var model;

        beforeEach(function () {
            model = new modelModel();
            sut = new ControlView({
                model: model,
                elPrev: $('<div></div>'),
                elNext: $('<div></div>')
            });
        });

        describe('instantiation', function () {
            it('can be instantiated', function () {
                expect(sut).to.exist;
                expect(sut.templateNamePrev).to.be.equal('ControlViewPrev');
                expect(sut.templateNameNext).to.be.equal('ControlViewNext');
            });
        });

        describe('throws event on', function () {
            it('arrow right has been pressed', function (done) {
                model.on('next', function () {
                    done();
                });
                initiateEvent(39);
            });

            it('arrow left has been pressed', function (done) {
                model.on('prev', function () {
                    done();
                });
                initiateEvent(37);
            });

            it('space has been pressed to play', function (done) {
                model.on('play', function () {
                    done();
                });
                initiateEvent(32);
            });

            it('space has been pressed to pause', function (done) {
                model.on('pause', function () {
                    done();
                });
                model.set({isRunning: true});
                initiateEvent(32);
            });

            function initiateEvent(keyCode) {
                $(document).trigger($.Event('keydown', { keyCode: keyCode }));
            }
        });
    });
});