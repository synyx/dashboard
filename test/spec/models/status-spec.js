define(['models/status'], function (StatusModel) {
    'use strict';

    describe("Status model test suite", function () {

        describe("instantiation", function () {

            var sut;

            beforeEach(function () {
                sut = new StatusModel();
            });

            it("can be instantiated", function () {
                expect(sut).to.exist;
            });
        });

        describe("has correct", function () {

            var sut;

            beforeEach(function () {
                sut = new StatusModel();
            });

            it("default parameter", function () {
                expect(sut.attributes.current).to.be.undefined;
                expect(sut.attributes.next).to.be.undefined;
                expect(sut.attributes.prev).to.be.undefined;
                expect(sut.attributes.total).to.be.undefined;
                expect(sut.attributes.isRunning).to.be.false;
                expect(sut.attributes.secondsLeft).to.be.undefined;
                expect(sut.attributes.seconds).to.be.undefined;
            });
        });
    });
});