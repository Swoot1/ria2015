(function(){
    var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    /**Coworker = require('./components/coworker'),**/
    Workplaces = require('./components/workplaces'),
    Workplace = require('./components/workplace'),
    CoworkerCreate = require('./components/coworkerCreate'),
    Wrapper = require('./components/wrapper');

    module.exports = (
        <Route path="/" component={Wrapper}>
            <Route path="workplaces">
                <IndexRoute component={Workplaces} />
                <Route path=":workplaceId">
                    <IndexRoute component={Workplace} />
                    <Route path="coworkers">
                        <Route path="new" component={CoworkerCreate} />
                    </Route>
                </Route>
            </Route>
        </Route>
    );
})();