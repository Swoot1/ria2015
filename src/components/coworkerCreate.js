(function() {
    'use strict';

    var React = require('react');
    var Input = require('react-bootstrap/lib/Input');
    var ButtonInput = require('react-bootstrap/lib/ButtonInput');
    var Col = require('react-bootstrap/lib/Col');
    var Row = require('react-bootstrap/lib/Row');
    var Firebase = require('firebase');
    var coworkersReference;
    var CoworkerCreate = React.createClass({

        displayName: 'CoworkerCreate',

        propTypes: {
            params: React.PropTypes.shape({
                workplaceId: React.PropTypes.string.isRequired
            })
        },

        getInitialState: function() {
            return {
                newCoworker: {
                    fullname: '',
                    title: 'okänd'
                }
            };
        },

        componentWillMount: function() {
            coworkersReference = new Firebase(
                'https://cowotrack.firebaseio.com/workplaces/' + this.props.params.workplaceId + '/coworkers');
            coworkersReference.on('value', function(snapshot) {
                this.setState({
                    coworkers: snapshot.val()
                });
            }.bind(this), function(errorObject) {
                console.log('The read failed ' + errorObject.code);
            });
        },

        handleCreateCoworker: function() {
            coworkersReference.push(this.state.newCoworker,
                function(error) {
                    console.log(error);
                });
        },

        componentWillUnMount: function() {
            coworkersReference.off();
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

        render: function(){
            return (
                <Row>
                    <Col xs = {4}>
                        <form>
                            <Input
                                onChange = {
                                    this.handleChange.bind(this, 'newCoworker.fullname')
                                }
                                placeholder = "Namn och efternamn"
                                type = "text"/>
                            <Input
                                onChange = {
                                    this.handleChange.bind(this, 'newCoworker.title')
                                }
                                placeholder = "Title"
                                type = "text"/>
                            <ButtonInput bsStyle = "success"
                                className = "pull-right"
                                onClick = {
                                    this.handleCreateCoworker
                                }
                                value = "Lägg till" />
                        </form>
                    </Col>
                </Row>
            );
        }
    });

    module.exports = CoworkerCreate;
}());
