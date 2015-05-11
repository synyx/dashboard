define([
    'services/source-statistics',
    'models/sources',
    'models/source',
    'models/header',
    'models/content'
], function (sourceStatistics, Sources, SourceModel, HeaderModel, ContentModel) {
    'use strict';

    describe('SourceStatistics test suite', function () {

        describe('initialization', function () {

            var sut;

            beforeEach(function () {
                sut = sourceStatistics;
            });

            it('can be instantiated', function () {
                expect(sut).to.exist;
            });
        });

        describe('source statistics', function () {

            var sut;

            beforeEach(function () {
                sut = sourceStatistics;
            });

            it('does exist', function () {
                expect(sut.sources).to.exist;
            });

            it('generate statistics with empty sources', function () {
                var generatedStatisticSource = sut.sources(new Sources(), 'no filter');

                expect(generatedStatisticSource).to.exist;
                expect(generatedStatisticSource.get('header').get('name')).to.be.equal('Sorry, no content there...');
                expect(generatedStatisticSource.get('content').get('content')).to.be.equal('...with the filter ' +
                    '<b>no filter</b><br/><br/>There are <b>0</b> sources available');
                expect(generatedStatisticSource.get('importance')).to.be.equal(10);
            });

            it('generate statistics', function () {

                var source1 = generateSource('1', ['info', 'sonar', 'legacy']);
                var source2 = generateSource('2', ['info', 'jenkins']);

                var generatedStatisticSource = sut.sources(new Sources([source1, source2]), 'no filter');

                expect(generatedStatisticSource).to.exist;
                expect(generatedStatisticSource.get('header').get('name')).to.be.equal('Sorry, no content there...');
                expect(generatedStatisticSource.get('content').get('content')).to.be.equal('...with the filter ' +
                    '<b>no filter</b><br/><br/>There are <b>2</b> filtered sources with tags<table class="table-small ' +
                    'width-full center"><tr><th>Tag</th><th>Count</th><th>In Sources</generateh></tr><tr><td>info</td>' +
                    '<td>2</td><td>1 || 2</td></tr><tr><td>sonar</td><td>1</td><td>1</td></tr><tr><td>legacy</td><td>1' +
                    '</td><td>1</td></tr><tr><td>jenkins</td><td>1</td><td>2</td></tr></table>');
                expect(generatedStatisticSource.get('importance')).to.be.equal(10);
            });
        });
    });

    function generateSource(name, tags) {
        var header = new HeaderModel({'name': name});
        return new SourceModel({'header': header, 'tags': tags});
    }

});