define(['models/header'], function (HeaderModel) {
    'use strict';

    describe("Header model test suite", function () {

        describe("instantiation", function () {

            var sut;

            beforeEach(function () {
                sut = new HeaderModel();
            });

            it("can be instantiated", function () {
                expect(sut).to.exist;
            });
        });

        describe("has correct default parameter", function () {

            var sut;

            beforeEach(function () {
                sut = new HeaderModel();
            });

            it("name", function () {
                expect(sut.attributes.name).to.be.equal('Loading...');
            });
        });
    });
});