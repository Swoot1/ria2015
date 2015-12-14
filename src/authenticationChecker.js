(function(){
    
    'use strict';
    
    var Firebase = require('firebase'),
        cowotrack = new Firebase('https://cowotrack.firebaseio.com'),
        React = require('react');
        
    module.exports= {isUserAuthenticated: isUserAuthenticated};
    
    function isUserAuthenticated(){
        var authData = cowotrack.getAuth();
        
        return authData !== null ? true : false;
    }
    
})();