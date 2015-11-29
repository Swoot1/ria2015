(function(){
    'use strict';
    
    var Firebase = require('firebase'),
        cowotrack = new Firebase("https://cowotrack.firebaseio.com"),
        coworkersReference = new Firebase('https://cowotrack.firebaseio.com/coworker'),
        _ = require("lodash"),
        GoogleMap = require('react-google-maps/lib/GoogleMap'),
        GoogleMapLoader = require('react-google-maps/lib/GoogleMapLoader'),
        Marker = require('react-google-maps/lib/Marker'),
        React = require('react'),
        Firebase = require('firebase'),
        Coworkers = React.createClass({
        
        getInitialState: function(){
            return {
                coworkers: [],
                markers: [{
                  position: {
                    lat: 57.7067818,
                    lng: 11.9668661,
                  },
                  key: "Gothenburg",
                  defaultAnimation: 2
                }]
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
            coworkersReference.on('value', function(snapshot){
                this.setState({coworkers: snapshot.val()});
            }.bind(this), function(errorObject){
                console.log('The read failed ' + errorObject.code);
            });
        },
            
        componentWillUnMount: function(){
            coworkersReference.off();
        },
            
        render: function(){
            
            var coworkersHTML = _.map(this.state.coworkers, function(coworker){
                return <li key={coworker.employeeNumber}>{coworker.fullname}</li>;
            });
            
            var markers = _.map(this.state.markers,(marker, index) => {
                  return (
                    <Marker
                      {...marker}/>
                  );
                });
            
            return(
                
                <div>
                    <input type="button" onClick={this.authenticateWithOAuthPopUp} value="Logga in"/>
                    <ul>{coworkersHTML}</ul>
                
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
                          {this.state.markers.map((marker, index) => {
                            return (
                              <Marker
                                {...marker}/>
                            );
                          })}
                    </GoogleMap>
                  }
                />
                </div>
            );    
        }
    });

    module.exports = Coworkers;
}());


