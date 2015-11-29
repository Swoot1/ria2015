(function(){
    'use strict';
    
    var React = require('react'),
        LinkedStateMixin = require('react-addons-linked-state-mixin'),
        coworkersReference = new Firebase('https://cowotrack.firebaseio.com/coworker'),
        CoworkerCreate = React.createClass({
        
        mixins: [LinkedStateMixin], // Two-way binding
        
        getInitialState: function(){
            return {
                employeeNumber: '',
                fullname: '',
                workplace: ''
            };
        },
        
        createCoworker: function(){
            coworkersReference.push(this.state);
        },
            
        render: function(){
            return (
                <div>
                    <form>
                        <input type="text" placeholder="Namn och efternamn" valueLink={this.linkState('fullname')}/>
                        <input type="text" placeholder="Anställningsnummer" valueLink={this.linkState('employeeNumber')}/>
                        <input type="text" placeholder="Arbetsplats" valueLink={this.linkState('workplace')}/>
                        <input type="button" onClick={this.createCoworker} value="Lägg till" />
                    </form>
                </div>
            );
        }
    });
    
    module.exports = CoworkerCreate;
}());