/*global require*/

(function(){
    
    'use strict';
    
    var React = require('react'),
        ReactDOM = require('react-dom'),
        Router = require('react-router').Router,
        routes = require('./routes');

    ReactDOM.render(<Router routes={routes}/>, document.getElementById('root'));
                    
}());