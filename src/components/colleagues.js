(function(){
    'use strict';
    
    var collegues = require('../data/colleagues.json'),
        LinkedStateMixin = require('react-addons-linked-state-mixin'),
        GoogleMap = require('react-google-maps/lib/GoogleMap'),
        Marker = require('react-google-maps/lib/Marker'),
        React = require('react'),
        Colleagues = React.createClass({
        
        mixins: [LinkedStateMixin],
        
        getInitialState: function(){
            return {
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
        
        render: function(){
            
            var colleguesHTML = collegues.map(function(collegue){
                return <li key={collegue.employeeNumber}>{collegue.fullname}</li>;
            });
            
            var markers = this.state.markers.map((marker, index) => {
                  return (
                    <Marker
                      {...marker}/>
                  );
                });
            
            return(
                
                <div>
                    
                    <ul>{colleguesHTML}</ul>
            
                    <GoogleMap containerProps={{
                                                    ...this.props,
                                                    style: {
                                                        height: "500px",
                                                        width: "500px"
                                                    }
                                                }}
                    ref="map"
                    defaultZoom={13}
                    defaultCenter={{
                                    lat: 57.7067818, 
                                    lng: 11.9668661
                                    }}>
                    {markers}
                  </GoogleMap>
                </div>
            );    
        }
    });

    module.exports = Colleagues;
}());


