define(['views/dashboard-view',
    'views/control-view',
    'views/paging-view',
    'views/time-line-view',
    'views/content-view',
    'views/header-view',
    'models/dashboard',
    'models/header',
    'models/status',
    'models/content',
    'models/sources'
], function (DashboardView, ControlView, PagingView, TimeLineView, ContentView, HeaderView, 
             DashboardModel, HeaderModel, StatusModel, ContentModel, SourcesModel) {
    'use strict';

    describe('Dashboard view test suite', function () {

        var sut;
        var model;

        var headerViewStub;
        var pagingViewStub;
        var timeLineViewStub;
        var contentViewStub;
        var controlViewStub;

        var headerModel;
        var statusModel;
        var contentModel;
        var sourcesModel;

        var sandbox;
        beforeEach(function () {
            sandbox = sinon.sandbox.create();

            headerViewStub = sandbox.stub(HeaderView.prototype, 'create', function () {
            });
            pagingViewStub = sandbox.stub(PagingView.prototype, 'create', function () {
            });
            timeLineViewStub = sandbox.stub(TimeLineView.prototype, 'create', function () {
            });
            contentViewStub = sandbox.stub(ContentView.prototype, 'create', function () {
            });
            controlViewStub = sandbox.stub(ControlView.prototype, 'create', function () {
            });

            headerModel = new HeaderModel();
            statusModel = new StatusModel();
            contentModel = new ContentModel();
            sourcesModel = new SourcesModel();

            model = new DashboardModel({
                headerModel: headerModel,
                statusModel: statusModel,
                contentModel: contentModel,
                sources: sourcesModel

            });
            sut = new DashboardView({
                model: model
            });
        });

        afterEach(function () {
            sandbox.restore();
        });

        describe('instantiation', function () {
            it('can be instantiated', function () {
                expect(sut).to.exist;
                expect(sut.templateName).to.be.equal('DashboardView');
            });

            it('children will be rendered', function () {
                expect(headerViewStub.calledWith({
                    el: sinon.match.any,
                    model: headerModel
                })).to.be.ok;

                expect(pagingViewStub.calledWith({
                    el: sinon.match.any,
                    model: statusModel,
                    sources: sourcesModel
                })).to.be.ok;

                expect(timeLineViewStub.calledWith({
                    el: sinon.match.any,
                    model: statusModel
                })).to.be.ok;

                expect(contentViewStub.calledWith({
                    el: sinon.match.any,
                    model: contentModel
                })).to.be.ok;

                expect(controlViewStub.calledWith({
                    elPrev: sinon.match.any,
                    elNext: sinon.match.any,
                    model: statusModel
                })).to.be.ok;
            });

            it('inserts own template', function () {
                // TODO
            });
        });
    });
});