define(['services/source-filter', 'models/sources', 'models/source'], function (SourceFilter, SourcesModel, SourceModel) {
    'use strict';

    describe('SourceFilter test suite', function () {

        describe('initialization', function () {

            var sut;

            beforeEach(function () {
                sut = new SourceFilter({tags: []});
            });

            it('can be instantiated', function () {
                expect(sut).to.exist;
            });
        });

        describe('filters SourceModel', function () {

            var sut;

            beforeEach(function () {
                sut = new SourceFilter({tags: []});
            });

            it('has filter function', function () {
                expect(sut.filter).to.exist;
            });

            it('filter throws if no SourceModel given', function () {
                expect(function () {
                    sut.filter();
                }).to.throw();
            });

            it('filter returns list', function () {
                var list = new SourcesModel();
                var result = sut.filter(list);
                expect(result).to.exist;
            });

            it('does not filter when no tags are given', function () {
                var list = new SourcesModel();
                list.add(new SourceModel({tags: ['foo'], name: 'fooName'}));

                var result = sut.filter(list);

                expect(result).to.exist;
                expect(result.size()).to.be.equal(1);
                expect(result.at(0).get('name')).to.be.equal('fooName');
            });
        });

        describe('filters SourceModel by tags (OR)', function () {

            var sut;

            beforeEach(function () {
                sut = new SourceFilter({tags: ['foo', 'bar']});
            });

            it('filters using tags', function () {

                var list = new SourcesModel();

                list.add(new SourceModel({tags: ['foo'], name: 'fooName'}));
                list.add(new SourceModel({tags: ['hurz'], name: 'hurzName'}));

                var result = sut.filter(list);

                expect(result).to.exist;
                expect(result.size()).to.be.equal(1);
                expect(result.at(0).get('name')).to.be.equal('fooName');
            });

            it('filters using tags using OR', function () {
                var list = new SourcesModel();

                list.add(new SourceModel({tags: ['foo'], name: 'fooName'}));
                list.add(new SourceModel({tags: ['hurz'], name: 'hurzName'}));
                list.add(new SourceModel({tags: ['bar'], name: 'barName'}));

                var result = sut.filter(list);

                expect(result).to.exist;
                expect(result.size()).to.be.equal(2);
                expect(result.at(0).get('name')).to.be.equal('fooName');
                expect(result.at(1).get('name')).to.be.equal('barName');
            });

            it('filters using tags by matching any of the SourceModels tags', function () {
                var list = new SourcesModel();

                list.add(new SourceModel({tags: ['fun', 'foo'], name: 'fooName'}));
                list.add(new SourceModel({tags: ['hurz'], name: 'hurzName'}));
                list.add(new SourceModel({tags: ['blupp', 'fun', 'foo'], name: 'barName'}));

                var result = sut.filter(list);

                expect(result).to.exist;
                expect(result.size()).to.be.equal(2);
                expect(result.at(0).get('name')).to.be.equal('fooName');
                expect(result.at(1).get('name')).to.be.equal('barName');
            });
        });

        describe('filters SourceModel by tags (OR and AND)', function () {

            it('filters using tags', function () {
                var sut = new SourceFilter({
                    tags: [
                        ['project', 'fun'],
                        'info'
                    ]
                });
                var list = new SourcesModel();

                list.add(new SourceModel({tags: ['fun'], name: 'funny'}));
                list.add(new SourceModel({tags: ['info', 'blah'], name: 'informational'}));
                list.add(new SourceModel({tags: ['fun', 'project'], name: 'funnyAboutProject'}));

                var result = sut.filter(list);

                expect(result).to.exist;
                expect(result.size()).to.be.equal(2);
                expect(result.at(0).get('name')).to.be.equal('informational');
                expect(result.at(1).get('name')).to.be.equal('funnyAboutProject');
            });

            it('filters using tags from providedStringTags', function () {
                var sut = new SourceFilter({providedStringTags: 'project+fun-info'});
                
                var list = new SourcesModel();
                list.add(new SourceModel({tags: ['fun'], name: 'funny'}));
                list.add(new SourceModel({tags: ['info', 'blah'], name: 'informational'}));
                list.add(new SourceModel({tags: ['fun', 'project'], name: 'funnyAboutProject'}));

                var result = sut.filter(list);

                expect(result).to.exist;
                expect(result.size()).to.be.equal(2);
                expect(result.at(0).get('name')).to.be.equal('informational');
                expect(result.at(1).get('name')).to.be.equal('funnyAboutProject');
            });
        });
    });
});