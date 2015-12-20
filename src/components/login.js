/*global require*/

(function() {
    'use strict';

    var React = require('react');
    var Firebase = require('firebase');
    var cowotrack = new Firebase('https://cowotrack.firebaseio.com');
    var Navigation = require('react-router').Navigation;
    var Login = React.createClass({
        displayName: 'Login',

        propTypes: {
            history: React.PropTypes.shape({
                pushState: React.PropTypes.func
            }),
            location: React.PropTypes.shape({
                state: React.PropTypes.shape({
                    nextPathname: React.PropTypes.string
                })
            })
        },

        mixins: [Navigation],

        getInitialState: function() {
            return {
                error: false
            };
        },

        handleAuthenticateWithOAuthPopUp: function() {
            cowotrack.authWithOAuthPopup('github', function(error, authData) {
                if (error) {
                    this.setState({
                        error: true
                    });
                } else {
                    if (this.props.location && this.props.location.state && this.props.location.state.nextPathname) {
                        this.props.history.pushState(null, this.props.location.state.nextPathname);
                    } else {
                        this.props.history.pushState(null, '/workplaces');
                    }
                }
            }.bind(this));
        },

        render: function() {
            return (
                <div>
                    <input
                        onClick = {this.handleAuthenticateWithOAuthPopUp}
                        type = "button"
                        value = "Logga in med Github" />
                    {this.state.error ? <p> {'Något blev fel med din inloggning. Försök igen.'}</p> : <p></p >}
                </ div>
            );
        }
    });

    module.exports = Login;
}());
