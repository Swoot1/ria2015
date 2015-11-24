/*global require*/

(function(){
    
    'use strict';
    
    var React = require('react'),
        ReactDOM = require('react-dom'),
        Colleagues = require('./components/colleagues.js');

    ReactDOM.render(<Colleagues/>, document.getElementById('root'));
}());