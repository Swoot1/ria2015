/*global require*/

(function(){
    
    'use strict';
    
    var React = require('react'),
        _ = require('lodash'),
        WorkplaceInfo = React.createClass({
            
            render: function(){
                return(
                    <div>
                        <p>{this.props.workplace.companyName}</p>
                        <p>{this.props.workplace.city}</p>
                        <p>{this.props.workplace.street}</p>
                        <p>{this.props.workplace.zipCode}</p>
                        <p>{this.props.workplace.phoneNumber}</p>
                        <p>{this.props.workplace.homepage}</p>
                        <p>{this.props.workplace.workplaceDescription}</p>
                        <ul>
                            {
                                _.map(this.props.workplace.coworkers, function(coworker, index){
                                    return <li key={index}>{coworker.fullname} jobbar som {coworker.title}</li>;    
                                }) 
                            }
                        </ul>
                    </div>
                );    
            }
    });

    module.exports = WorkplaceInfo;
}());


