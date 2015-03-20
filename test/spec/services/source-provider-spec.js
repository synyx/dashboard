define(['services/source-provider'], function (SourceProvider) {
    'use strict';

    describe('SourceProvider test suite', function () {

        var sut;

        beforeEach(function () {
            sut = new SourceProvider({
                listingUrl: 'listingUrl',
                contentUrl: 'contentUrl/'
            });
        });

        describe('instantiation', function () {
            it('can be instantiated', function () {
                expect(sut).to.exist;
            });

            it('throws when no urls are given', function () {
                expect(function () {
                    new SourceProvider();
                }).to.throw();
            });
        });

        describe('function', function () {
            it('has getSources function', function () {
                expect(sut.getSources).to.exist;
            });

            it('getSources throws if no callback given', function () {
                expect(function () {
                    sut.getSources();
                }).to.throw();
            });
        });

        describe('tries to retrieve sources via getSources', function () {

            var callback = {};
            var successReadListingStub;

            var sandbox;
            beforeEach(function () {
                sandbox = sinon.sandbox.create();
                successReadListingStub = sandbox.stub(sut, 'successReadListing', function () {
                });
            });

            afterEach(function () {
                sandbox.restore();
            });

            it('calls success function', function () {
                sandbox.stub(sut, 'call', function (url, successFunction) {
                    successFunction('success');
                });

                sut.getSources(callback);
                expect(successReadListingStub.calledWith(callback, 'success')).to.be.ok;
            });

            it('calls error function', function () {
                sandbox.stub(sut, 'call', function (url, successFunction, errorFunction) {
                    errorFunction();
                });

                sut.getSources(callback);
                expect(successReadListingStub.calledWith(callback, ['listing-problem.json'])).to.be.ok;
            });
        });

        describe('successReadListing', function () {

            var listings = [
                "content/success.json",
                "content/not-found.json"
            ];

            var sandbox;
            beforeEach(function () {
                sandbox = sinon.sandbox.create();
            });

            afterEach(function () {
                sandbox.restore();
            });

            it('creates a source collection', function () {
                var generatedSources;
                var callback = function (sources) {
                    generatedSources = sources;
                };

                var that = this;
                var callStub = sandbox.stub(sut, 'call', function (url, successFunction, errorFunction) {
                    if (url === 'contentUrl/content/success.json') {
                        successFunction({
                            importance: 5,
                            name: 'name',
                            content: 'content',
                            tags: 'tag1, tag2'
                        });
                    }
                    else if (url === 'contentUrl/content/not-found.json') {
                        errorFunction();
                    }
                });

                sut.successReadListing(callback, listings);

                expect(generatedSources.length).to.be.equal(2);

                var firstSource = generatedSources.at(0);
                expect(firstSource.get('importance')).to.be.equal(5);
                expect(firstSource.get('tags')).to.be.equal('tag1, tag2');
                expect(firstSource.get('url')).to.be.equal('contentUrl/content/success.json');
                expect(firstSource.get('header').get('name')).to.be.equal('name');
                expect(firstSource.get('content').get('content')).to.be.equal('content');

                var secondSource = generatedSources.at(1);
                expect(secondSource.get('importance')).to.be.equal(1);
                expect(secondSource.get('header').get('name')).to.be.equal('Error loading');
                expect(secondSource.get('content').get('content')).to.be.equal('Error loading contentUrl/content/not-found.json(undefined)');
            });
        });
    });
});