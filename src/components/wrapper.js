(function(){
    'use strict';
    
    var React = require('react');

    var Wrapper = React.createClass({
        render: function() {
            return (
                <div className="wrapper">
                    {this.props.children}
                </div>
            );
        }
    });

    module.exports = Wrapper;
})();

