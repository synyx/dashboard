[![Build Status](https://travis-ci.org/synyx/dashboard.svg?branch=master)](https://travis-ci.org/synyx/dashboard) [![devDependency Status](https://david-dm.org/synyx/dashboard/dev-status.svg)](https://david-dm.org/synyx/dashboard#info=devDependencies)

# Dashboard


## Demo

http://synyx.github.io/dashboard/


## Installation

It is very easy to setup this dashboard. All you need is node installed (https://nodejs.org/)

Then you just go to the

<pre>/dashboard</pre>

directory 
and type

<pre>grunt</pre>

If you are not familiar with grunt then take your time and get some information about it on http://gruntjs.com/

This will run all the tests and will create a directory <pre>dist/</pre> with the full functional javascript application.
You can take the content of <pre>dist/</pre> and use this wherever you want.


### Grunt Tasks

There are several grunt tasks pre defined.

* `grunt [default]`
    * will run linting, test and build task
* `grunt test`
    * run mocha tests flavoured with chai of every test defined in <pre>test/spec/runner.js</pre> in the console
* `grunt build`
    * will create the dist directory with the fully functional javascript application in it
* `grunt serve`
    * will run a server over the files of <pre>app/</pre>
    * will watch for changes to reload the server
    * very helpful while adding new features or fixing bugs
* `grunt serve:dist`
    * will execute the build task and run a server over the files in <pre>dist/</pre>
    * with this task you can check if your generated application is correct
    * will not watch for changes
* `grunt serve:test`
    * will run the tests of <pre>test/</pre> in the browser
    * will watch for changes to restart the tests


## Contribution

If you want to contribute you are very welcome, see our [contribution guidelines](CONTRIBUTING.md)


## License

[synyx/dashboard](http://github.com/synyx/dashboard) is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

All logos, brands and trandemarks are **not** under the Apache License 2.0 and may not be used without permission from [synyx](http://www.synyx.de/).
