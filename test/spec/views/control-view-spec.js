define(['views/control-view', 'models/status'], function (ControlView, StatusModel) {
    'use strict';

    describe('Control view test suite', function () {

        var sut;
        var model;

        beforeEach(function () {
            model = new StatusModel();
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

            var sandbox;

            beforeEach(function () {
                sandbox = sinon.sandbox.create();
                sandbox.stub(Backbone.Events, 'trigger');
            });

            afterEach(function () {
                sandbox.restore();
            });

            it('arrow right has been pressed', function () {
                //TODO
            });

            it('arrow left has been pressed', function () {
                //TODO
            });

            it('space has been pressed', function () {
                //TODO
            });

            function initiateEvent(keyCode) {
                var e = $.Event('keydown');
                e.keyCode = keyCode;
                $(document).trigger(e);
            }
        });
    });
});