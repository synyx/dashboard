define(['services/defined-checker'], function (DefinedChecker) {
    'use strict';

    describe('DefinedChecker test suite', function () {

        var sut;

        beforeEach(function () {
            sut = DefinedChecker;
        });

        describe('initialization', function () {
            it('can be instantiated', function () {
                expect(sut).to.exist;
            });
        });

        describe('functions', function () {
            it('isDefined', function () {
                expect(function () {
                    sut.isDefined(undefined, 'itsAMeMario')
                }).to.throw('need itsAMeMario defined');
            });
        });
    });
});