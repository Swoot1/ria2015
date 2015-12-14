/*global require*/

(function(){
    
    'use strict';
    
    var React = require('react'),
        Firebase = require('firebase'),
        cowotrack = new Firebase('https://cowotrack.firebaseio.com'),
        Navigation = require('react-router').Navigation,
        Login = React.createClass({
        // https://github.com/rackt/react-router/blob/master/examples/auth-flow/app.js#L117    
        
        mixins: [Navigation],
            
        getInitialState: function(){
            return {
                error: false
            };
        },

        authenticateWithOAuthPopUp:function() {
            cowotrack.authWithOAuthPopup("github", function(error, authData) {
              if (error) {
                this.setState({error: true});
              } else {
                if(this.props.location && this.props.location.state && this.props.location.state.nextPathname){
                    this.props.history.pushState(null, this.props.location.state.nextPathname);
                }else{
                    this.props.history.pushState(null, '/workplaces');
                }
              }
            }.bind(this));
        },
        
        render: function(){
            return(
                <div>
                    <input type="button" onClick={this.authenticateWithOAuthPopUp} value="Logga in med Github"/>
                    {this.state.error ? <p>Något blev fel med din inloggning. Försök igen.</p> : <p></p>}
                </div>
            );    
        }
    });

    module.exports = Login;
}());


