(function(){
    'use strict';
    
    var Firebase = require('firebase'),
        React = require('react'),
        Firebase = require('firebase'),
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
                <div>
                    <p>{this.state.workplace.city}</p>
                    <p>{this.state.workplace.street}</p>
                    <p>{this.state.workplace.zipCode}</p>
                    <p>{this.state.workplace.workplaceDescription}</p>
                </div>
            );    
        }
    });

    module.exports = Workplace;
}());


