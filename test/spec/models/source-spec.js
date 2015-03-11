define(['models/source', 'models/header', 'models/content'], function (SourceModel, HeaderModel, ContentModel) {
    'use strict';

    describe("Source model test suite", function () {

        describe("instantiation", function () {

            var sut;

            beforeEach(function () {
                sut = new SourceModel();
            });

            it("can be instantiated", function () {
                expect(sut).to.exist;
            });
        });

        describe("has correct default parameter", function () {

            var sut;

            beforeEach(function () {
                sut = new SourceModel();
            });

            it("header", function () {
                expect(sut.attributes.header).to.be.instanceof(HeaderModel);
            });

            it("content", function () {
                expect(sut.attributes.content).to.be.instanceof(ContentModel);
            });

            it("importance", function () {
                expect(sut.attributes.importance).to.be.equal(1);
            });

            it("url", function () {
                expect(sut.attributes.url).to.be.undefined;
            });

            it("tags", function () {
                expect(sut.attributes.tags).to.be.undefined;
            });
        });

        describe("getTags does return correct tags", function () {

            it("when different tags are provided", function () {

                var sut = new SourceModel({'tags': ['test', 'foo', 'nolegacy']});

                expect(sut.getTags()).to.have.length(3);
                expect(sut.getTags()).to.include('test');
                expect(sut.getTags()).to.include('foo');
                expect(sut.getTags()).to.include('nolegacy');
                expect(sut.getTags()).to.not.include('legacy');
            });

            it("when legacy and nolegacy is not provided", function () {

                var sut = new SourceModel({'tags': ['test']});

                expect(sut.getTags()).to.have.length(2);
                expect(sut.getTags()).to.include('legacy');
            });

            it("when non provided", function () {

                var sut = new SourceModel({'tags': undefined});

                expect(sut.getTags()).to.have.length(1);
                expect(sut.getTags()).to.include('legacy');
            });
        });
    });
});