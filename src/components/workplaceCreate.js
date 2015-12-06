(function(){
    'use strict';
    
    var React = require('react'),
        _ = require('lodash'),
        workplacesReference = new Firebase('https://cowotrack.firebaseio.com/workplaces'),
        WorkplaceCreate = React.createClass({
        
        getInitialState: function(){
            return {
                workplaces: [],
                newWorkplace: {
                    companyName: '',
                    street: '',
                    zipCode: '',
                    city: '',
                    phoneNumber: '',
                    workplaceDescription: '',
                    homepage: '',
                    latitude: '',
                    longitude: '',
                    coworkers: []
                }
            };
        },
        
        createWorkplace: function(){
            var workplaces = new Firebase('https://cowotrack.firebaseio.com/workplaces');
            workplaces.push(this.state.newWorkplace,
            function(error){
                console.log(error)
            });
        },
            
        componentWillMount: function(){
            workplacesReference.on('value', function(snapshot){
                this.setState({workplaces: snapshot.val()});
            }.bind(this), function(errorObject){
                console.log('The read failed' + errorObject.code);
            });
        },
            
        componentWillUnMount: function(){
            workplacesReference.off();
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
                        <input type="text" placeholder="Företagsnamn" onChange={this.handleChange.bind(this, 'newWorkplace.companyName')}/>
                        <input type="text" placeholder="Hemsida" onChange={this.handleChange.bind(this, 'newWorkplace.homepage')}/>
                        <input type="text" placeholder="Gata" onChange={this.handleChange.bind(this, 'newWorkplace.street')}/>
                        <input type="text" placeholder="Postkod" onChange={this.handleChange.bind(this, 'newWorkplace.zipCode')}/>
                        <input type="text" placeholder="Stad" onChange={this.handleChange.bind(this, 'newWorkplace.city')}/>
                        <input type="text" placeholder="Longitud" onChange={this.handleChange.bind(this, 'newWorkplace.longitude')}/>
                        <input type="text" placeholder="Latitud" onChange={this.handleChange.bind(this, 'newWorkplace.latitude')}/>
                        <textarea placeholder="Företagsbeskrivning" onChange={this.handleChange.bind(this, 'newWorkplace.workplaceDescription')}></textarea>  
                        <input type="text" placeholder="Telefonnummer" onChange={this.handleChange.bind(this, 'newWorkplace.phoneNumber')}/>
                        <input type="button" onClick={this.createWorkplace} value="Lägg till" />
                    </form>
                </div>
            );
        }   
    });
    
    module.exports = WorkplaceCreate;
}());