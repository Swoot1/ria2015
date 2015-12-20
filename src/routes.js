/*global require*/

(function() {
    'use strict';

    var React = require('react');
    var Route = require('react-router').Route;
    var Wrapper = require('./components/wrapper');
    var IndexRoute = require('react-router').IndexRoute;
    var Workplaces = require('./components/workplaces');
    var Workplace = require('./components/workplace');
    var WorkplaceCreate = require('./components/workplaceCreate');
    var AuthenticationChecker = require('./authenticationChecker.js');
    var CoworkerCreate = require('./components/coworkerCreate');
    var Login = require('./components/login');

    function requireAuth(nextState, replaceState) {
        if (!AuthenticationChecker.isUserAuthenticated()) {
            replaceState({
                nextPathname: nextState.location.pathname
            }, '/login')
        }
    }
    module.exports = (
            <Route
                component = {
                    Wrapper
                }
                path = "/">
                <Route
                    component = {
                        Login
                    }
                    path = "login"/>
                <Route path = "workplaces">
                    <IndexRoute
                        component = {
                            Workplaces
                        }/>
                    <Route
                        onEnter = {
                            requireAuth
                        }
                        path = "new">
                        <IndexRoute component = {
                            WorkplaceCreate
                        }/>
                </Route>
                <Route path = ":workplaceId" >
                    <IndexRoute component = {
                        Workplace
                    }/>
                    <Route path = "coworkers" >
                        <Route
                            component = {
                                CoworkerCreate
                            }
                            onEnter = {
                                requireAuth
                            }
                            path = "new"/>
                    </Route>
                </Route>
            </Route>
            </Route>
    );
})();
