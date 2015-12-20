(function() {
    'use strict';

    var Firebase = require('firebase');
    var React = require('react');
    var workplacesReference = new Firebase('https://cowotrack.firebaseio.com/workplaces');
    var Input = require('react-bootstrap/lib/Input');
    var ButtonInput = require('react-bootstrap/lib/ButtonInput');
    var Col = require('react-bootstrap/lib/Col');
    var Row = require('react-bootstrap/lib/Row');
    var WorkplaceCreate = React.createClass({

        displayName: 'WorkplaceCreate',

        getInitialState: function() {
            return {
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

        componentWillMount: function() {
            workplacesReference.on('value', function(snapshot) {
                this.setState({
                    workplaces: snapshot.val()
                });
            }.bind(this), function(errorObject) {
                console.log('The read failed ' + errorObject.code);
            });
        },

        handleCreateWorkplace: function() {
            workplacesReference.push(this.state.newWorkplace,
                function(error) {
                    console.log(error);
                });
        },

        componentWillUnMount: function() {
            workplacesReference.off();
        },

        handleChange: function(propertyName, event) {
            var propertyNames = propertyName.split('.');
            this.setStateProperty(propertyNames, this.state, event.target.value, true);
        },

        setStateProperty: function(nestedPropertyNames, initialObject, newValue, isFirstLevel) {
            var propertyName = nestedPropertyNames.shift();

            if (nestedPropertyNames.length) {
                initialObject[propertyName] = this.setStateProperty(
                    nestedPropertyNames,
                    initialObject[propertyName],
                    newValue,
                    false
                );
            } else {
                initialObject[propertyName] = newValue;
            }

            if (isFirstLevel) {
                this.setState(initialObject);
            } else {
                return initialObject;
            }
        },

        render: function() {
            var workplaces = [(
                <option
                    key={-1}
                    value = {null}>
                </option>)];

            for (var workplace in this.state.workplaces) {
                if (this.state.workplaces.hasOwnProperty(workplace)) {
                    workplaces.push(<option> {
                            this.state.workplaces[workplace].nameOfWorkplace
                        } < /option>);
                }
            };

            return (
                <Row>
                    <Col xs = {4}>
                        <form>
                            <Input
                                onChange = {
                                    this.handleChange.bind(this, 'newWorkplace.companyName')
                                }
                                placeholder = "Företagsnamn"
                                type = "text"/>
                              <Input
                                  onChange = {
                                        this.handleChange.bind(this, 'newWorkplace.homepage')
                                    }
                                  placeholder = "Hemsida"
                                  type = "text"/>
                              <Input
                                  onChange = {
                                        this.handleChange.bind(this, 'newWorkplace.street')
                                    }
                                  placeholder = "Gata"
                                  type = "text"/>
                              <Input
                                  onChange = {
                                        this.handleChange.bind(this, 'newWorkplace.zipCode')
                                    }
                                  placeholder = "Postkod"
                                  type = "text"/>
                              <Input
                                  onChange = {
                                        this.handleChange.bind(this, 'newWorkplace.city')
                                    }
                                  placeholder = "Stad"
                                  type = "text"/>
                              <Input
                                  onChange = {
                                        this.handleChange.bind(this, 'newWorkplace.longitude')
                                    }
                                  placeholder = "Longitud"
                                  type = "text"/>
                              <Input
                                  onChange = {
                                        this.handleChange.bind(this, 'newWorkplace.latitude')
                                    }
                                  placeholder = "Latitud"
                                  type = "text"/>
                              <Input
                                  onChange = {
                                        this.handleChange.bind(this, 'newWorkplace.workplaceDescription')
                                    }
                                  placeholder = "Företagsbeskrivning"
                                  type = "textarea"/>
                              <Input
                                  onChange = {
                                        this.handleChange.bind(this, 'newWorkplace.phoneNumber')
                                  }
                                  placeholder = "Telefonnummer"
                                  type = "text"/>
                              <ButtonInput
                                  bsStyle = "success"
                                  className = "pull-right"
                                  onClick = {
                                        this.handleCreateWorkplace
                                    }
                                  pullRight
                                  value = "Lägg till"/>
                        </form>
                    </Col>
                </Row>
            );
        }
    });

    module.exports = WorkplaceCreate;
}());
