(function(){
    'use strict';
    
    var React = require('react'),
        _ = require('lodash'),
        coworkersReference = new Firebase('https://cowotrack.firebaseio.com/coworker'),
        CoworkerCreate = React.createClass({
        
        getInitialState: function(){
            return {
                workplaces: [],
                newCoworker: {
                    fullname: '',
                    title: 'Unknown'
                }
            };
        },
        
        createCoworker: function(){
            var workplaceCoworkers = new Firebase('https://cowotrack.firebaseio.com/workplaces/' + this.props.params.workplaceId + '/coworkers');
            workplaceCoworkers.push(this.state.newCoworker,
            function(error){
                console.log(error)
            });
        },
            
        componentWillMount: function(){
            /*workplacesReference.on('value', function(snapshot){
                this.setState({workplaces: snapshot.val()});
            }.bind(this), function(errorObject){
                console.log('The read failed' + errorObject.code);
            });*/
        },
            
        componentWillUnMount: function(){
            coworkersReference.off();
        },
            
        handleChange:function(propertyName, event){
            var propertyNames = propertyName.split('.');

            this.setStateProperty(propertyNames, this.state, event.target.value, true);            
        },
            
        setStateProperty: function(nestedPropertyNames, initialObject, newValue, isFirstLevel){
            var stateObject,
                propertyName = nestedPropertyNames.shift();
            
            if(nestedPropertyNames.length){
                initialObject[propertyName] = this.setStateProperty(nestedPropertyNames, initialObject[propertyName], newValue, false); 
            }else{
                initialObject[propertyName] = newValue;
            }
            
            if(isFirstLevel){
                this.setState(initialObject);    
            }else{
                return initialObject;
            }
        },
            
        render: function(){
            var workplaces = [(<option value={null}></option>)];
                
                for(var workplace in this.state.workplaces){
                    if(this.state.workplaces.hasOwnProperty(workplace)){
                        workplaces.push(<option>{this.state.workplaces[workplace].nameOfWorkplace}</option>);    
                    }
                };
            
            return (
                <div>
                    <form>
                        <input type="text" placeholder="Namn och efternamn" onChange={this.handleChange.bind(this, 'newCoworker.fullname')}/>
                        <input type="text" placeholder="Title" onChange={this.handleChange.bind(this, 'newCoworker.title')}/>
                        <input type="button" onClick={this.createCoworker} value="Lägg till" />
                    </form>
                    <p>{this.state.newCoworker.fullname}</p>
                </div>
            );
        }   
    });
    
    module.exports = CoworkerCreate;
}());