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

        describe('provides content', function () {

            before(function () {
                sinon.spy(jQuery, 'ajax');
            });

            it('has getSources function', function () {
                expect(sut.getSources).to.exist;
            });

            it('getSources throws if no callback given', function () {
                expect(function () {
                    sut.getSources();
                }).to.throw();
            });

            // TODO
//            it('getSources calls for listing', function () {
//                sut.getSources(function () {
//                });
//
//                expect(jQuery.ajax.calledOnce).to.be.true;
//                expect(jQuery.ajax.getCall(0).args[0].url).to.be.equal('listingUrl');
//            });
//
//            it('getSources calls for content from listing', function () {
//                var callback = sinon.spy();
//                sut.getSources(callback);
//
//                // we expect the listing has been loaded
//                expect($.ajax).toHaveBeenCalled();
//                var arg = $.ajax.mostRecentCall.args[0];
//                expect(arg.url).to.be.equal(this.listingurl);
//                expect(arg.success).to.exist;
//
//                // and we simulate the data coming back
//                $.ajax.reset();
//                var contentName = 'content1.json';
//                arg.success([contentName]);
//
//                // then we expect the content-slide to have been loaded
//                expect($.ajax).toHaveBeenCalled();
//                var contentarg = $.ajax.mostRecentCall.args[0];
//                expect(contentarg.url).to.be.equal(this.contenturl + contentName);
//                expect(contentarg.success).to.exist;
//
//                // and we simulate the data coming back for the content
//                $.ajax.reset();
//                contentarg.success({title: 'test', body: 'yeah'});
//
//                //t then we expect the data is delivered using the callback
//                expect(callback).toHaveBeenCalled();
//                var list = callback.mostRecentCall.args[0];
//                expect(list).to.exist;
//                expect(list.length).to.be.equal(1);
//                expect(list.at(0).get('title')).to.be.equal('test');
//                expect(list.at(0).get('body')).to.be.equal('yeah');
//            });
        });
    });
});