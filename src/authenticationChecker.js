(function () {
    'use strict';

    var Firebase = require('firebase');
    var cowotrack = new Firebase('https://cowotrack.firebaseio.com');

    module.exports = {
        isUserAuthenticated: isUserAuthenticated
    };

    function isUserAuthenticated() {
        var authData = cowotrack.getAuth();
        return authData !== null;
    }
})();
