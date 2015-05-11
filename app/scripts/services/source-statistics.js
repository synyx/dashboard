define([
    'models/source',
    'models/header',
    'models/content'
], function (SourceModel, HeaderModel, ContentModel) {
    'use strict';

    return {
        sources: function (sources, providedStringTags) {

            //tagName -> {count: #Int , names: [#String]}
            var tagMap = [];
            sources.forEach(function (source) {
                source.get('tags').forEach(function (tag) {
                    var sourceName = source.get('header').get('name');
                    var tagEntry = tagMap[tag];
                    if (tagEntry) {
                        tagEntry.count++;
                        tagEntry.names.push(sourceName);
                    }
                    else {
                        tagMap[tag] = {count: 1, names: [sourceName]}
                    }
                });
            });

            var content = '...with the filter <b>' + providedStringTags + '</b><br/><br/>';

            if (sources.size() > 0) {
                content += 'There are <b>' + sources.size() + '</b> filtered sources with tags';

                content += '<table class="table-small width-full center">';
                content += '<tr><th>Tag</th><th>Count</th><th>In Sources</generateh></tr>';
                for (var key in tagMap) {
                    content += '<tr><td>' + key + '</td><td>' + tagMap[key].count + '</td><td>' + tagMap[key].names.join(' || ') + '</td></tr>';
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
});