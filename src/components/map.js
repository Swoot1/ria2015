/*global require*/

(function(){
    
    'use strict';
    
    var React = require('react'),
        GoogleMap = require('react-google-maps/lib/GoogleMap'),
        GoogleMapLoader = require('react-google-maps/lib/GoogleMapLoader'),
        Map = React.createClass({
            
        render: function(){
            return(
                <GoogleMapLoader
                          containerElement={
                            <div
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
                              {this.props.markers}
                           </GoogleMap>
                        }
                />
            );    
        }
    });

    module.exports = Map;
}());


