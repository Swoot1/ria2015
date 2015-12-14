/*global require*/

(function(){
    
    'use strict';
    
    var React = require('react'),
        Firebase = require('firebase'),
        cowotrack = new Firebase('https://cowotrack.firebaseio.com'),
        Navigation = require('react-router').Navigation,
        Logout = React.createClass({
        
        mixins: [Navigation],
            
        getInitialState: function(){
            return {
                error: false
            };
        },

        logout:function() {
            cowotrack.unauth();
            this.props.history.pushState(null, '/workplaces');
        },
        
        render: function(){
            return(
                <div>
                    <input type="button" onClick={this.logout} value="Logga ut"/>
                </div>
            );    
        }
    });

    module.exports = Logout;
}());


