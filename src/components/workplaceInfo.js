/*global require*/

(function() {
    'use strict';

    var React = require('react');
    var _ = require('lodash');
    var WorkplaceInfo = React.createClass({

        displayName: 'Workplaceinfo',

        propTypes: {
            workplace: React.PropTypes.shape({
                companyName: React.PropTypes.string,
                city: React.PropTypes.string,
                street: React.PropTypes.string,
                zipCode: React.PropTypes.string,
                phoneNumber: React.PropTypes.string,
                homepage: React.PropTypes.string,
                workplaceDescription: React.PropTypes.string,
                coworkers: React.PropTypes.object
            })
        },

        render: function() {
            return (
                <div>
                    <p> {
                        this.props.workplace.companyName
                    } </p> <p> {
                        this.props.workplace.city
                    } </p> <p> {
                        this.props.workplace.street
                    } </p> <p> {
                        this.props.workplace.zipCode
                    } </p> <p> {
                        this.props.workplace.phoneNumber
                    } </p> <p> {
                        this.props.workplace.homepage
                    } </p> <p> {
                        this.props.workplace.workplaceDescription
                    } </p>
                    <ul> {
                            _.map(this.props.workplace.coworkers, function(coworker, index) {
                                return (<li key = {index}> {coworker.fullname}
                                        {'jobbar som'} {
                                    coworker.title
                                } < /li>);
                            })
                        }
                    < /ul>
                </div>
            );
        }
    });

    module.exports = WorkplaceInfo;
}());
