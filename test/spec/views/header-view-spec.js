define(['views/header-view', 'models/header'], function (HeaderView, HeaderModel) {
    'use strict';

    describe('Header view test suite', function () {

        var sut;
        var model;

        var name = 'ThisIsMyName';
        
        beforeEach(function () {
            model = new HeaderModel({name : name});
            sut = new HeaderView({
                model: model
            });
        });

        describe('instantiation', function () {
            it('can be instantiated', function () {
                expect(sut).to.exist;
                expect(sut.templateName).to.be.equal('HeaderView');
            });            
            
            it('and renders own template', function () {
                expect(sut.$el.html()).to.contain(name);
                expect(sut.$el.html()).to.contain('<div id="header" class="header">')
            });
        });
    });
});