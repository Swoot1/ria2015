(function(){
    'use strict';
    
    var React = require('react'),
        AuthenticationChecker = require('../authenticationChecker'),
        Link = require('react-router').Link,
        Login = require('./login'),
        Logout = require('./logout'),
        cowotrack = new Firebase('https://cowotrack.firebaseio.com'),
        Wrapper = React.createClass({
        
        
        getInitialState:function(){
            return {
                isUserLoggedIn: AuthenticationChecker.isUserAuthenticated()
            }
        },
            
        updateAuthorization(loggedInUser) {
            this.setState({
              isUserLoggedIn: loggedInUser !== null
            })
        },
            
        componentWillMount() {
            cowotrack.onAuth(this.updateAuthorization);
        },

        render: function() {
            return (
                <div className="wrapper" >
                    <ul>
                        <li>
                            {this.state.isUserLoggedIn ? (
                            <Logout history={this.props.history} />
                            ) : (
                            <Login history={this.props.history} location={this.props.location} />
                            )}
                        </li>
                    </ul>
                    {this.props.children}
                </div>
            );
        }
    });

    module.exports = Wrapper;
})();

