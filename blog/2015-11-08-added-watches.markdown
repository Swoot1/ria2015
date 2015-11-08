##Watch .css and .js files

I don't want to manually call npm run build everytime I've changed a .js file so I've added a script with watchify into my package.js that does it for me. This goes into the script tag:
    
    "watch-js": "watchify --debug -t [reactify --es6] src/main.js -o bundle.js",

Now I can call:
    
    npm run watch-js 

from the terminal once and watchify will keep an eye on my .js files (currently only my main.js file) and output their content and their dependencies to bundle.js.

I did the same thing for my less files but with a npm called catw. This went into the script tag in the package.json.

    "watch-css": "catw -wvc 'lessc --clean-css -' 'styles/styles.less' > dist/styles/styles.min.css"
    
Which lets me run:

    npm run watch-css

And catw will keep an eye on my less file(s) and compile them into css and minify them. You can still use watchify if you write in plain CSS. Just skip the -c flag and the 'lessc --clean-css -' part.

These watches led to new dependencies:

    "watchify": "3.6.0",
    "less-plugin-clean-css": "1.5.1",
    "less": "2.5.3"

[Inspiration](https://gist.github.com/substack/7819530)