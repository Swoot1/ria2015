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
        CoworkerCreate = require('./components/coworkerCreate');
        
    module.exports = (
        <Route path="/" component={Wrapper}>
            <Route path="workplaces">
                <IndexRoute component={Workplaces} />
                <Route path="new">
                    <IndexRoute component={WorkplaceCreate} />
                </Route>
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