(function(){
    'use strict';
    
    var Firebase = require('firebase'),
        workplacesReference = new Firebase('https://cowotrack.firebaseio.com/workplaces'),
        _ = require('lodash'),
        GoogleMap = require('react-google-maps/lib/GoogleMap'),
        GoogleMapLoader = require('react-google-maps/lib/GoogleMapLoader'),
        Marker = require('react-google-maps/lib/Marker'),
        React = require('react'),
        Firebase = require('firebase'),
        Navigation = require('react-router').Navigation,
        Row = require('react-bootstrap/lib/Row'),
        Col = require('react-bootstrap/lib/Col'),
        ButtonInput = require('react-bootstrap/lib/ButtonInput'),
        WorkplaceInfo = require('./workplaceInfo'),
        Map = require('./map'),
        Workplaces = React.createClass({
        
        mixins: [Navigation],
            
        getInitialState: function(){
            return {
                selectedWorkplace: null,
                workplaces: []
            };
        },
            
        redirectToCreateWorkPlace: function(){
            this.props.history.pushState(null, '/workplaces/new');
        },
        
        componentWillMount: function(){
            workplacesReference.on('value', function(snapshot){
                this.setState({workplaces: snapshot.val()});
            }.bind(this), function(errorObject){
                console.log('The read failed ' + errorObject.code);
            });
        },
            
        componentWillUnMount: function(){
            workplacesReference.off();
        },
            
        setSelectedWorkplace:function(index){
            this.setState({selectedWorkplace: this.state.workplaces[index]});
        },
            
        render: function(){
            
            var workplacesHTML = [];
            var markers = [];
            
            var addMarker = function(workplace, index){
                var options = {
                    position: {
                        lat: workplace.latitude,
                        lng: workplace.longitude,
                    },
                    key: index,
                    defaultAnimation: 2
                };
                markers.push(React.createElement(Marker, options));
            };
            
            for(var workplace in this.state.workplaces){
                if(this.state.workplaces.hasOwnProperty(workplace)){
                    workplacesHTML.push(
                        <li 
                            key={workplace} 
                            onClick={this.setSelectedWorkplace.bind(this, workplace)}>
                            <a>{this.state.workplaces[workplace].companyName}</a>
                        </li>);
                    addMarker(this.state.workplaces[workplace], workplace);
                }   
            }
            
            return(
                <div>
                    <Row>
                        <Col xs={3}>
                            <ul>{workplacesHTML}</ul>
                            <ButtonInput 
                                bsStyle="success" 
                                onClick={this.redirectToCreateWorkPlace} 
                                value="Lägg till"
                            />
                        </Col>
                        <Col xs={3}>
                            {
                                this.state.selectedWorkplace ? React.createElement(WorkplaceInfo, {
                                       workplace: this.state.selectedWorkplace
                                       }) 
                                : <div></div>
                            }
                        </Col>
                        <Col xs={3}>
                            {React.createElement(Map, {markers: markers})}
                        </Col>
                    </Row>
                </div>
            );    
        }
    });

    module.exports = Workplaces;
}());


