(function() {
    'use strict';

    var React = require('react');
    var AuthenticationChecker = require('../authenticationChecker');
    var Login = require('./login');
    var Logout = require('./logout');
    var Firebase = require('firebase');
    var cowotrack = new Firebase('https://cowotrack.firebaseio.com');
    var Wrapper = React.createClass({

        displayName: 'Wrapper',

        propTypes: {
            children: React.PropTypes.object,
            history: React.PropTypes.object,
            location: React.PropTypes.object
        },

        getInitialState: function() {
            return {
                isUserLoggedIn: AuthenticationChecker.isUserAuthenticated()
            }
        },

        componentWillMount() {
            cowotrack.onAuth(this.updateAuthorization);
        },

        updateAuthorization(loggedInUser) {
            this.setState({
                isUserLoggedIn: loggedInUser !== null
            })
        },

        render: function() {
            return (
                <div className = "wrapper">
                    <ul>
                        <li> {
                                this.state.isUserLoggedIn ? (
                                    <Logout
                                        history = {
                                                this.props.history
                                            }/>) : (<Login
                                                history = {
                                                        this.props.history
                                                    }
                                                location = {
                                                        this.props.location
                                                    }/>)
                            }
                        </li>
                    < /ul> {
                    this.props.children
                } < /div>
            );
        }
    });

    module.exports = Wrapper;
})();
