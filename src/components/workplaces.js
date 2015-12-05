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
        Workplaces = React.createClass({
        
        getInitialState: function(){
            return {
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
            
        render: function(){
            
            var workplacesHTML = [];
            var markers = [];
            
            var addMarker = function(workplace){
                var options = {
                    position: {
                        lat: workplace.latitude,
                        lng: workplace.longitude,
                    },
                    key: "Gothenburg",
                    defaultAnimation: 2
                };
                markers.push(React.createElement(Marker, options));
            };
            
            for(var workplace in this.state.workplaces){
                if(this.state.workplaces.hasOwnProperty(workplace)){
                    workplacesHTML.push(<li key={workplace}>{this.state.workplaces[workplace].workplaceName}</li>);
                    addMarker(this.state.workplaces[workplace]);
                }   
            }
            
            return(
                
                <div>
                    <input type="button" onClick={this.authenticateWithOAuthPopUp} value="Logga in"/>
                    <ul>{workplacesHTML}</ul>
                
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
                  }
                />
                </div>
            );    
        }
    });

    module.exports = Workplaces;
}());


