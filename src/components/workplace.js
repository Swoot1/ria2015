(function(){
    'use strict';
    
    var Firebase = require('firebase'),
        React = require('react'),
        Firebase = require('firebase'),
        WorkplaceInfo = require('./workplaceInfo'),
        Workplace = React.createClass({
        
        getInitialState: function(){
            return {
                workplace: {
                    city: '',
                    street: '',
                    zipCode: '',
                    workplaceDescription: '',
                    workplaceName: ''
                }
            };
        },
            
        componentWillMount: function(){
            var workplaceReference = new Firebase('https://cowotrack.firebaseio.com/workplaces/' + this.props.params.workplaceId);
            workplaceReference.on('value', function(snapshot){
                this.setState({workplace: snapshot.val()});
            }.bind(this), function(errorObject){
                console.log('The read failed ' + errorObject.code);
            });
        },
            
/*        componentWillUnMount: function(){
            coworkersReference.off();
        },*/
            
        render: function(){
            return(
                React.createElement(WorkplaceInfo, {workplace: this.state.workplace})
            );    
        }
    });

    module.exports = Workplace;
}());


