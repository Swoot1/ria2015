/*global require*/

(function() {
    'use strict';

    var React = require('react');
    var GoogleMap = require('react-google-maps/lib/GoogleMap');
    var GoogleMapLoader = require('react-google-maps/lib/GoogleMapLoader');
    var Map = React.createClass({

        displayName: 'Map',

        propTypes: {
            markers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
        },

        render: function() {
            return (
                <GoogleMapLoader
                    containerElement = {<div
                        style = {
                                        {
                                            height: '500px',
                                            width: '500px'
                                        }
                                }
                        />
                    }
                    googleMapElement = {
                        <GoogleMap
                            defaultCenter = {
                                            {
                                                lat: 57.7067818,
                                                lng: 11.9668661
                                            }
                                        }
                            defaultZoom = {
                                13
                            }
                            ref = {
                                (map) => console.log(map)
                            }>
                            {this.props.markers}
                        </GoogleMap>
                }
                />
            );
        }
    });

    module.exports = Map;
}());
