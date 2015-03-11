define(['views/paging-view', 'models/status', 'models/sources', 'models/source', 'models/header']
    , function (PagingView, StatusModel, SourcesModel, SourceModel, HeaderModel) {
        'use strict';

        describe('Paging view test suite', function () {

            var sut;
            var model;
            var sources;
            var sourceOne;
            var sourceTwo;

            beforeEach(function () {
                model = new StatusModel();

                sources = new SourcesModel();
                sourceOne = new SourceModel({header: new HeaderModel({name: 'one'})});
                sources.add(sourceOne);
                sourceTwo = new SourceModel({header: new HeaderModel({name: 'two'})});
                sources.add(sourceTwo);

                sut = new PagingView({
                    model: model,
                    sources: sources
                });
            });

            describe('instantiation', function () {
                it('can be instantiated', function () {
                    expect(sut).to.exist;
                    expect(sut.templateName).to.be.equal('PagingView');
                });

                it('and renders own template with colorize and resizing', function () {
                    expect(sut.$el.html()).to.contain('style="background-color: rgb(0, 149, 77)');
                    expect(sut.$el.html()).to.contain('style="background-color: rgb(0, 169, 51)');
                    expect(sut.$el.html()).to.contain('width: 50%;');
                });
            });

            describe('function', function () {
                it('activeSource sets the active Source', function () {
                    model.set({current: 1});
                    sut.activeSource();

                    expect(sut.$el.html()).to.contain('class="page page-active"');
                });
            });
        });
    });