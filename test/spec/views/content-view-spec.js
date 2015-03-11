define(['views/content-view', 'models/content'], function (ContentView, ContentModel) {
    'use strict';

    describe('Content view test suite', function () {

        var sut;
        var model;

        beforeEach(function () {
            model = new ContentModel();
            sut = new ContentView({
                model: model
            });
        });

        describe('instantiation', function () {
            it('can be instantiated', function () {
                expect(sut).to.exist;
                expect(sut.templateName).to.be.equal('ContentView');
            });
        });

        describe('throws event on', function () {
            it('model change and renders again', function () {
                expect(sut.$el.html()).to.contain(' wait while this is lo');                
                model.set({content: 'new content'});
                expect(sut.$el.html()).to.contain('new content')
            });
        });
    });
});