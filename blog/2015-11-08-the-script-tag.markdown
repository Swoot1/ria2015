##The script tag in package.json
In the demo app David uses the following script: 

    "scripts" : {
        "build": "browserify --debug -t [reactify --es6] src/main.js > bundle.js"    
    }
in his package.json

To run the build script use:

    npm run build
    
or

    npm run-script build
    
or simply

    npm run
    
which runs all scripts under the script property.

This generates the file "bundle.js".

That's all well and good but what does the command do?

##browserify
The part "browserify" tells us that we want to use Browserify's require() function in our app. For example writing:

    var React = require('react');
    
in a .js file loads the react module into our variable React, probably using magic. You can say that it's what "import" is for Java and "require" is for PHP but for JavaScript.

##The --debug flag
The "--debug" flag tells Browserify to create [source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/). It  basically links our bundled (and sometimes minified and uglified) code to the original source files making it a whole lot easier to debug.

[Here]("https://github.com/substack/node-browserify#usage") are some other flags you can use with Browserify.

##The -t flag
The "-t" flag is short for "-tranform" and it's what makes your files with HTML-syntax convert into files JavaScript-syntax for the HTML. 

I.e:

    ReactDOM.render(<h1>Hello, world</h1>, document.getElementById('root'));
    
results in

    ReactDOM.render(React.createElement("h1", null, "Hello, world"), document.getElementById('root'));
    
Meaning that if you want to write all you HTML with React's JavaScript syntax from the beginning you won't be needing this flag.

##[reactify --es6]
"[reactify --es6]" is an "option for the -t flag" it lets you write some ECMAScript6 syntax constructs (arrow functions, rest params, templates, object short notation and classes) that will be transformed into ECMAScript5 syntax which is more widely supported than ECMAScript6. 

(Current browser support for [ECMAScript6](("https://kangax.github.io/compat-table/es6/") and for [ECMAScript5](http://kangax.github.io/compat-table/es5/)).

##src/main.js > bundle.js
"src/main.js > bundle.js" says "take all the required modules from the file main.js and the code in the file main.js, concatenate all the source code into a new file named "bundle.js" and put it in the root of the project". Then, instead of adding all your dependencies into script tags in your index.html you only need to reference bundle.js which already contains all of them. [Example]("https://github.com/substack/node-browserify#example"). 

Bundling all you .js files has many advantages such as:
* Your page will load faster since you only need to fetch one .js file. 
* You won't include scripts that you don't use anymore.
* Browserify takes care of the order the scripts need to be loaded in.
* Perfect spot for a pull request.

Feel free to make a pull request if you find errors or want to improve the text. />