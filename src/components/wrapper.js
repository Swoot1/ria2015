(function(){
    'use strict';
    
    var React = require('react'),
        Row = require('react-bootstrap/lib/Row'),
        Col = require('react-bootstrap/lib/Col');

    var Wrapper = React.createClass({
        render: function() {
            return (
                <div xs={12} className="wrapper" >
                    {this.props.children}
                </div>
            );
        }
    });

    module.exports = Wrapper;
})();

