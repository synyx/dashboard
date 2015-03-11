define(['views/time-line-view', 'models/status'], function (TimeLineView, StatusModel) {
    'use strict';

    describe('Time line view test suite', function () {

        var sut;
        var model;

        var name = 'ThisIsMyName';

        beforeEach(function () {
            model = new StatusModel();
            sut = new TimeLineView({
                model: model
            });
        });

        describe('instantiation', function () {
            it('can be instantiated', function () {
                expect(sut).to.exist;
                expect(sut.templateName).to.be.equal('TimeLineView');
            });

            it('and renders own template', function () {
                expect(sut.$el.html()).to.contain('<div class="content-timer-line"></div>');
            });
        });

        describe('function', function () {

            it('drawbar colorizes the half bar', function () {
                model.set({secondsLeft: 10, seconds: 20});
                sut.drawBar();

                expect(sut.$el.find('.content-timer-line').css('width')).to.be.equal('50%')
            });
        });
    });
});