(function(){
    'use strict';
    
    var Firebase = require('firebase'),
        cowotrack = new Firebase('https://cowotrack.firebaseio.com'),
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
        Workplaces = React.createClass({
        
        mixins: [Navigation],
            
        getInitialState: function(){
            return {
                selectedWorkplace: null,
                workplaces: []
            };
        },
            
        authenticateWithOAuthPopUp:function() {
            cowotrack.authWithOAuthPopup("github", function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                console.log("Authenticated successfully with payload:", authData);
              }
            });
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
            coworkersReference.off();
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
                    workplacesHTML.push(<li key={workplace} onClick={this.setSelectedWorkplace.bind(this, workplace)}><a>{this.state.workplaces[workplace].companyName}</a></li>);
                    addMarker(this.state.workplaces[workplace], workplace);
                }   
            }
            
            return(
                <div>
                <Row>
                    <Col xs={12}>
                        <input type="button" onClick={this.authenticateWithOAuthPopUp} value="Logga in"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <ul>{workplacesHTML}</ul>
                        <ButtonInput bsStyle="success" onClick={this.redirectToCreateWorkPlace} value="Lägg till"/>
                    </Col>
                    <Col xs={3}>
                        {this.state.selectedWorkplace ? <div>
                        <p>{this.state.selectedWorkplace.companyName}</p>
                        <p>{this.state.selectedWorkplace.city}</p>
                        <p>{this.state.selectedWorkplace.street}</p>
                        <p>{this.state.selectedWorkplace.zipCode}</p>
                        <p>{this.state.selectedWorkplace.phoneNumber}</p>
                        <p>{this.state.selectedWorkplace.homepage}</p>
                        <p>{this.state.selectedWorkplace.workplaceDescription}</p>
                        <ul>
                            {
                                _.map(this.state.selectedWorkplace.coworkers, function(coworker, index){
                                    return <li key={index}>{coworker.fullname} jobbar som {coworker.title}</li>;    
                                }) 
                            }
                        </ul>
                        </div> : <div></div>
                        }
                    </Col>
                    <Col xs={3}>
                        <GoogleMapLoader
                          containerElement={
                            <div
                              {...this.props}
                              style ={{
                                    height: "500px",
                                    width: "500px"
                                    }}
                            />
                          }
                          googleMapElement={
                            <GoogleMap
                              ref={(map) => console.log(map)}
                              defaultZoom={13}
                              defaultCenter={{lat: 57.7067818, lng: 11.9668661}}>
                              {markers}
                           </GoogleMap>
                        }/>
                    </Col>
                </Row>
                        </div>
            );    
        }
    });

    module.exports = Workplaces;
}());


