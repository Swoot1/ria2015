(function(){
    'use strict';
    
    var React = require('react'),
        Row = require('react-bootstrap/lib/Row'),
        Col = require('react-bootstrap/lib/Col');

    var Wrapper = React.createClass({
        render: function() {
            return (
                <Row>
                    <Col xs={12} >
                        {this.props.children}
                    </Col>
                </Row>
            );
        }
    });

    module.exports = Wrapper;
})();

