define(['models/content'], function (ContentModel) {
    'use strict';

    describe("Content model test suite", function () {

        describe("instantiation", function () {

            var sut;

            beforeEach(function () {
                sut = new ContentModel();
            });

            it("can be instantiated", function () {
                expect(sut).to.exist;
            });
        });

        describe("has correct default parameter", function () {

            var sut;

            beforeEach(function () {
                sut = new ContentModel();
            });

            it("content", function () {
                expect(sut.attributes.content).to.be.equal('Please wait while this is loading...');
            });
        });
    });
});