/*global require*/

(function(){
    
    'use strict';
    
    var React = require('react'),
        Route = require('react-router').Route,
        Wrapper = require('./components/wrapper'),
        IndexRoute = require('react-router').IndexRoute,
        Workplaces = require('./components/workplaces'),
        Workplace = require('./components/workplace'),
        WorkplaceCreate = require('./components/workplaceCreate'),
        AuthenticationChecker = require('./authenticationChecker.js'),
        CoworkerCreate = require('./components/coworkerCreate'),
        Login = require('./components/login');
        
    
    function requireAuth(nextState, replaceState) {
      if (!AuthenticationChecker.isUserAuthenticated()){
        replaceState({ nextPathname: nextState.location.pathname }, '/login')  
      }
    }
    module.exports = (
        <Route path="/" component={Wrapper}>
            <Route path="login" component={Login} />
            <Route path="workplaces">
                <IndexRoute component={Workplaces} />
                <Route path="new" onEnter={requireAuth}>
                    <IndexRoute component={WorkplaceCreate} />
                </Route>
                <Route path=":workplaceId">
                    <IndexRoute component={Workplace} />
                    <Route path="coworkers">
                        <Route path="new" component={CoworkerCreate} onEnter={requireAuth} />
                    </Route>
                </Route>
            </Route>
        </Route>
    );
})();