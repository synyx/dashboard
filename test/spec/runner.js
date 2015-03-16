'use strict';
require.config({
    baseUrl: 'scripts/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        handlebars: '../bower_components/handlebars/handlebars',
        lodash: '../bower_components/lodash/lodash',
        colorizer: '../bower_components/colorizer/dist/string-to-color.umd'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    map: {
        "*": {
            "underscore": "lodash"
        }
    }
});

var specs = [
    'spec/models/content-spec.js',
    'spec/models/header-spec.js',
    'spec/models/source-spec.js',
    'spec/models/sources-spec.js',
    'spec/models/status-spec.js',
    'spec/models/dashboard-spec.js',
    'spec/services/source-filter-spec.js',
    'spec/services/source-provider-spec.js',
    'spec/services/timer-spec.js',
    'spec/services/defined-checker-spec.js',
    'spec/views/content-view-spec.js',
    'spec/views/control-view-spec.js',
    'spec/views/dashboard-view-spec.js',
    'spec/views/header-view-spec.js',
    'spec/views/time-line-view-spec.js',
    'spec/views/paging-view-spec.js',
    'spec/template-manager/template-manager-spec.js'
];

require(specs, function () {
    mocha.run();
});