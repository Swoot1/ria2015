##Password protect your routes with React-Router

Don't want everyone to see your very secret page? All you need is to set an onEnter function on your route that calls a function that checks if the user is authenticated. Like this (remember to look at the comments):

```javascript
    /*global require*/

    (function(){

        'use strict';

        var React = require('react'),
            Route = require('react-router').Route,
            Wrapper = require('./components/wrapper'),
            IndexRoute = require('react-router').IndexRoute,
            Workplaces = require('./components/workplaces'),
            WorkplaceCreate = require('./components/workplaceCreate'),
            AuthenticationChecker = require('./authenticationChecker.js'), // Your choice of authentication checker
            Login = require('./components/login');


        function requireAuth(nextState, replaceState) {
          if (!AuthenticationChecker.isUserAuthenticated()){ // Upps, looks like you're not authenticated.
          
            // We better redirect you to the login page
            replaceState({ nextPathname: nextState.location.pathname }, '/login')  
          }
        }
        module.exports = (
            <Route path="/" component={Wrapper}>
                <Route path="login" component={Login} />
                <Route path="workplaces">
                    <IndexRoute component={Workplaces} />
                    // Call requireAuth before redirecting the user to this page!
                    <Route path="new" onEnter={requireAuth}>
                        <IndexRoute component={WorkplaceCreate} />
                    </Route>
                </Route>
            </Route>
        );
    })();
```

If you have sharp eyes (swinglish for the win) you might have seen that we use replaceState instead of history.pushState(). history.replaceState() operates exactly like history.pushState() except that replaceState() modifies the current history entry instead of creating a new one ([source](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method)). 

If you have even sharper vision you might even have spotted that we call replaceState with an object as the first parameter. This is actually so that we can redirect the user to the page she was trying to visit before being redirected to the login page after she's logged in.

Let's pretend that we've authenticated the user in another function. This is how you would redirect her back to the page she wanted to visit in the first place. In this example the 'workplaces/new' page.

```javascript
    // Some authentication stuff

    // Now the nextPathname that we sent in in the first argument as an object prop is reachable
    if(this.props.location && this.props.location.state && this.props.location.state.nextPathname){
        // Go to the password protected page the user requested before logging in.
        this.props.history.pushState(null, this.props.location.state.nextPathname);
    }else{
        // The user didn't try to reach a password protected page before logging in. Go to the default welcome page.
        this.props.history.pushState(null, '/somedefaultloginpage');
    }
```
