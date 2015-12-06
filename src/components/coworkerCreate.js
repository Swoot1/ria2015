(function(){
    'use strict';
    
    var React = require('react'),
        Input = require('react-bootstrap/lib/Input'),
        ButtonInput = require('react-bootstrap/lib/ButtonInput'),
        Col = require('react-bootstrap/lib/Col'),
        Row = require('react-bootstrap/lib/Row'),
        coworkersReference,
        CoworkerCreate = React.createClass({

        getInitialState: function(){
            return {
                newCoworker: {
                    fullname: '',
                    title: 'okänd'
                }
            };
        },
        
        createCoworker: function(){
            coworkersReference.push(this.state.newCoworker,
            function(error){
                console.log(error)
            });
        },
            
        componentWillMount: function(){
            coworkersReference = new Firebase(
                'https://cowotrack.firebaseio.com/workplaces/' + this.props.params.workplaceId + '/coworkers');
            coworkersReference.on('value', function(snapshot){
                this.setState({coworkers: snapshot.val()});
            }.bind(this), function(errorObject){
                console.log('The read failed ' + errorObject.code);
            });
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
                initialObject[propertyName] = this.setStateProperty(
                    nestedPropertyNames, 
                    initialObject[propertyName], 
                    newValue, 
                    false
                ); 
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
            
            return (
                <Row>
                    <Col xs={4}>
                        <form>
                            <Input 
                                type="text" 
                                placeholder="Namn och efternamn" 
                                onChange={this.handleChange.bind(this, 'newCoworker.fullname')}
                            />
                            <Input 
                                type="text" 
                                placeholder="Title" 
                                onChange={this.handleChange.bind(this, 'newCoworker.title')}
                            />
                            <ButtonInput 
                               bsStyle="success" 
                               className="pull-right" 
                               onClick={this.createCoworker} 
                               value="Lägg till" 
                            />
                        </form>
                    </Col>
                </Row>
            );
        }   
    });
    
    module.exports = CoworkerCreate;
}());