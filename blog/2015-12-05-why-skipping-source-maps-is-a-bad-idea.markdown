##Why skipping source maps is a bad idea.

Debugging in the dev tools is all fine and dandy when you use regular \<script>\</script> tags to import your JavaScript files. You'll find your .js files under the sources tab in your browser's dev tools but what about using preprocessors like grunt, gulp, webpack or browserify? Then you get a huuuuUUUuuuUUUuuuuUUuuge file bundled with ALL THE .JS FILES. YES I'M SCREAMING. When you open the sources tab in your dev tool that's the only .js file you see. 

Isn't that file a bit annoying and hard to debug? How do you know which file you're actually debugging? Maybe you try to do search and find on some code from the bundled file in your IDE and hopefully you'll find the right file. But is this good? No. This is uneccessary painful. How can we fix this?

###Source Maps
They map the parts in the bundled file that you generated with your preprocessor to the actual .js files. Letting you debug them and not the bundled file.

(Read all about sourcemaps)[http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/]

In Browserify add the --debug flag after the browserify command:
    browserify --debug
    
In Webpack add this to your webpack config file export object.
    devtool: 'source-map',

In Watchify add the --debug flag after the watchify command:
    watchify --debug
    
Gulp, Grunt and all the others? Google.