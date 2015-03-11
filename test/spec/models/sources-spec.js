define(['models/sources', 'models/source'], function (SourcesModel, SourceModel) {
    'use strict';

    describe("Sources collection test suite", function () {

        describe("instantiation", function () {

            var sut;

            beforeEach(function () {
                sut = new SourcesModel();
            });

            it("can be instantiated", function () {
                expect(sut).to.exist;
            });
        });

        describe("has correct default parameter", function () {

            var sut;

            beforeEach(function () {
                sut = new SourcesModel();
            });

            it("model", function () {
                expect(sut.model).to.be.instanceof(SourceModel);
            });
        });
    });
});