(function(){
    'use strict';
    
    var Firebase = require('firebase'),
        React = require('react'),
        Firebase = require('firebase'),
        WorkplaceInfo = require('./workplaceInfo'),
        workplaceReference,
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
            var onError = function(errorObject){
                console.log('The read failed ' + errorObject.code);
            };
            
            workplaceReference = new Firebase(
                'https://cowotrack.firebaseio.com/workplaces/' + this.props.params.workplaceId);
            
            workplaceReference.on('value', function(snapshot){
                this.setState({workplace: snapshot.val()});
            }.bind(this), onError);
            
            
        },
            
        componentWillUnMount: function(){
            workplaceReference.off();
        },
            
        render: function(){
            return(
                React.createElement(WorkplaceInfo, {workplace: this.state.workplace})
            );    
        }
    });

    module.exports = Workplace;
}());


