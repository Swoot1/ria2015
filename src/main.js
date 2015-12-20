/*global require*/

(function() {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');
    var Router = require('react-router').Router;
    var routes = require('./routes');

    ReactDOM.render(
        <Router
            routes = {
                    routes
                }
        />, document.getElementById('root'));
}());
