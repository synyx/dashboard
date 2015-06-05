define([
    'models/source',
    'models/header',
    'models/content'
], function (SourceModel, HeaderModel, ContentModel) {
    'use strict';

    return {
        sources: function (sources, providedStringTags) {

            //tagName -> {count: #Int , names: [#String]}
            var tags = [];
            sources.forEach(function (source) {
                source.get('tags').forEach(function (tag) {
                    var sourceName = source.get('header').get('name');
                    var tagEntry = tags[tag];
                    if (tagEntry) {
                        tagEntry.count++;
                        tagEntry.names.push(sourceName);
                    }
                    else {
                        tags[tag] = {count: 1, names: [sourceName]};
                    }
                });
            });

            var sortedTags = sortArray(tags);
            var content = '...with the filter <b>' + providedStringTags + '</b><br/><br/>';

            if (sources.size() > 0) {
                content += 'There are <b>' + sources.size() + '</b> filtered sources with tags';

                content += '<table class="table-small width-full center">';
                content += '<tr><th>Tag</th><th>Count</th><th>In Sources</generateh></tr>';
                for (var key in sortedTags) {
                    content += '<tr><td>' + key + '</td><td>' + sortedTags[key].count + '</td><td>' + sortedTags[key].names.join(' || ') + '</td></tr>';
                }
                content += '</table>';
            }
            else {
                content += 'There are <b>0</b> sources available';
            }

            return new SourceModel({
                header: new HeaderModel({name: 'Sorry, no content there...'}),
                content: new ContentModel({
                    content: content
                }),
                importance: 10
            });
        }
    };

    function sortArray(array) {
        var tuples = [];

        for (var key in array) {
            tuples.push([key, array[key]]);
        }
        tuples.sort(function (a, b) {
            return b[1].count - a[1].count;
        });

        var sortedArray = [];
        tuples.forEach(function (tuple) {
            sortedArray[tuple[0]] = tuple[1];
        });

        return sortedArray;
    }
});
