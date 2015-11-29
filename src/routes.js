(function(){
    var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Coworker = require('./components/coworkers'),
    CoworkerCreate = require('./components/coworkerCreate'),
    Wrapper = require('./components/wrapper');

    module.exports = (
        <Route path="/" component={Wrapper}>
            <Route path="coworkers">
                <IndexRoute component={Coworker} />
                <Route path="new" component={CoworkerCreate} />
            </Route>
        </Route>
    );
})();