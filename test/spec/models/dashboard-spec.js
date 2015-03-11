define(['models/dashboard'], function (DashboardModel) {
    'use strict';

    describe("Dashboard model test suite", function () {

        describe("instantiation", function () {

            var sut;

            beforeEach(function () {
                sut = new DashboardModel();
            });

            it("can be instantiated", function () {
                expect(sut).to.exist;
            });
        });

        describe("has correct default parameter", function () {

            var sut;

            beforeEach(function () {
                sut = new DashboardModel();
            });

            it("from all models", function () {
                expect(sut.attributes.hasOwnProperty('headerModel')).to.be.true;
                expect(sut.attributes.headerModel).to.be.undefined;
                expect(sut.attributes.hasOwnProperty('contentModel')).to.be.true;
                expect(sut.attributes.contentModel).to.be.undefined;
                expect(sut.attributes.hasOwnProperty('timerModel')).to.be.true;
                expect(sut.attributes.timerModel).to.be.undefined;
                expect(sut.attributes.hasOwnProperty('statusModel')).to.be.true;
                expect(sut.attributes.statusModel).to.be.undefined;
            });
        });
    });
});