/*global require*/

(function(){
    
    'use strict';
    
    var React = require('react'),
        ReactDOM = require('react-dom'),
        Coworkers = require('./components/coworkers.js');

    ReactDOM.render(<Coworkers/>, document.getElementById('root'));
}());