define(['template-manager/template-manager'], function (templateManager) {
    'use strict';

    describe('TemplateManager test suite', function () {

        var sut;

        beforeEach(function () {
            sut = templateManager;
        });

        describe('instantiation', function () {

            it('can be instantiated', function () {
                expect(sut).to.exist;
            });

            it('will check for function to load a template', function () {
                expect(sut.getTemplate).to.exist;
            });
        });
    });
});