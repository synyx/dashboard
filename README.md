[![Build Status](https://travis-ci.org/synyx/dashboard.svg?branch=master)](https://travis-ci.org/synyx/dashboard) [![devDependency Status](https://david-dm.org/synyx/dashboard/dev-status.svg)](https://david-dm.org/synyx/dashboard#info=devDependencies)

# Dashboard


## Demo

http://synyx.github.io/dashboard/


## Installation

It is very easy to setup this dashboard. All you need is node installed (https://nodejs.org/)

Then you just go to the `/dashboard` directory and type `grunt`.
This will run all the tests and will create a directory `dist/` with the fully functional javascript application.

If you are not familiar with grunt then take your time and get some information about it on http://gruntjs.com/

### Grunt Tasks

There are several grunt tasks pre defined.

* `grunt [default]`
    * will run linting, test and build task
* `grunt test`
    * run mocha tests flavoured with chai of every test defined in `test/spec/runner.js` in the console
* `grunt build`
    * will create the dist directory with the fully functional javascript application in it
* `grunt serve`
    * will run a server over the files of `app/`
    * will watch for changes to reload the server
    * very helpful while adding new features or fixing bugs
* `grunt serve:dist`
    * will execute the build task and run a server over the files in `dist/`
    * with this task you can check if your generated application is correct
    * will not watch for changes
* `grunt serve:test`
    * will run the tests of `test/` in the browser
    * will watch for changes to restart the tests


## Content

This application does only consume json files and will display them.
All JSON files have to be provided in a `listing.json` in the root directory.

### Listing.json
<pre>
[
    "content/table.json",
    "content/centered-div.json",
    "content/responsive-image.json",
    "content/long-text.json",
    "content/fifth.json",
    "content/kvv.json",
    "content/content.json"
]
</pre>

### JSON Format

For example the content/table.json
<pre>
{
    "name": "Responsive table, you know?",
    "content": "<div class=\"table-responsive\">
                <table>
                    <thead><tr><th>Header</th><th>Header</th><th>Header</th></tr></thead>
                    <tbody><tr><td>Cell</td><td>Cell</td><td>Cell</td></tr><tr><td>Cell</td><td>Cell</td><td>Cell</td></tr></tbody>
                </table>
                </div>"
    "importance": 1,
    "tags": ["responsive", "table"],
}
</pre>

* `name`
    * represents the title on the top of the page
* `content`
    * holds the information which will be shown on the dashboard
    * html, css, ... is allowed
* `importance` optional
    * provides the information on how long should this information be displayed
* `tags`
    * is there to create specific dashboard with a custom selection of content


## Tags

As mentioned in the JSON Format section you can create your own custom dashboard show by tags.

For example these three json files are available.

<pre>
{
    "name": "First",
    "content": "first"
    "tags": ["first", "information"],
}
</pre>

<pre>
{
    "name": "Second",
    "content": "second"
    "tags": ["second", "information"],
}
</pre>

<pre>
{
    "name": "Third",
    "content": "third"
    "tags": ["information"],
}
</pre>

### OR `-`

You can specify a custom dashboard show with the slides that have the tag `first` **or** `second` by

<pre>
http://localhost:9000/?first-second
</pre>

Now you get displayed a dashboard show with the two slides first and second.

### AND `+`

Now we want a dashboard show with all slides they got both tags. `first` **and** `information`

<pre>
http://localhost:9000/?first+information
</pre>

Now you get displayed a dashboard show with only the first slide.


## Contribution

If you want to contribute you are very welcome, see our [contribution guidelines](CONTRIBUTING.md)


## License

[synyx/dashboard](http://github.com/synyx/dashboard) is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

All logos, brands and trademarks are **not** under the Apache License 2.0 and may not be used without permission from [synyx](http://www.synyx.de/).
