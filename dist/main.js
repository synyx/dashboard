require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        'jquery': 'libs/jquery',
        'handlebars': 'libs/handlebars',
        'backbone': 'libs/backbone',
        'lodash': 'libs/lodash',
        'bootstrap': 'libs/bootstrap',
        'string-to-color': 'libs/string-to-color.umd'
    },
    map: {
        '*': {
            'underscore': 'lodash'
        }
    }
});

require([
    'backbone',
    'dashboard-app'
], function (Backbone, DashboardApp) {
    Backbone.history.start();

    var tags = window.location.search;
    if (tags === undefined || tags.length === 0) {
        tags = 'legacy';
    } else {
        tags = tags.substr(1);
    }

    new DashboardApp({
        listingUrl: './listing.json',
        contentUrl: './',
        providedStringTags: tags
    });
});