/*global require*/

(function() {
    'use strict';

    var React = require('react');
    var Firebase = require('firebase');
    var cowotrack = new Firebase('https://cowotrack.firebaseio.com');
    var Navigation = require('react-router').Navigation;
    var Logout = React.createClass({

        displayName: 'Logout',

        propTypes: {
            history: React.PropTypes.shape({
                pushState: React.PropTypes.func
            })
        },

        mixins: [Navigation],

        getInitialState: function() {
            return {
                error: false
            };
        },

        handleLogout: function() {
            cowotrack.unauth();
            this.props.history.pushState(null, '/workplaces');
        },

        render: function() {
            return (
                <div>
                    <input
                        onClick = {
                            this.handleLogout
                        }
                        type = "button"
                        value = "Logga ut" />
                </div>
            );
        }
    });

    module.exports = Logout;
}());
