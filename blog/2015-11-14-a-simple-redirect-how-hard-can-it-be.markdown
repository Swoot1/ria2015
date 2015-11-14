##A Simple Redirect, How Hard Can It Be

Actually it's not that hard but it's not that well documented (or maybe I was looking in the wrong places).

Anyway, this is how you do it.

    var React = require("react"),
        Navigation = require('react-router').Navigation; // We're going to need this

    var SomeComponentName = React.createClass({

        mixins: [Navigation], // Adding Navigation as a mixin giving us the possibility to use it's functions.

        redirect: function(){
            this.props.history.pushState(null, '/somepath'); // Redirect!
        },

        render: function(){
            // HTML with a button or something that calls the redirect function
        }
    });

    module.exports = SomeComponentName;
    
[GitHub issue](https://github.com/rackt/react-router/issues/1841) where I found the solution.
