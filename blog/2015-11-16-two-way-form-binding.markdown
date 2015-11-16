##Two-way form binding

Look no further, LinkedStateMixin provides you with two-way data binding for your forms.

    (function(){
        'use strict';
        
        var LinkedStateMixin = require('react-addons-linked-state-mixin'), // Be sure to add this
            React = require('react');

        var Colleagues = React.createClass({

            mixins: [LinkedStateMixin], // Add LinkedStateMixin as a mixin so that you can use it's functions

            getInitialState:function(){
                return {
                    'employeeNumber' : '123'
                };
            },

            render: function(){

                return(
                    <div>
                        <form>
                            <input placeholder="Anställningsnummer" valueLink={this.linkState('employeeNumber')} /> // Link your inputs with your state
                            <p>{this.state['employeeNumber']}</p>
                        </form>
                    </div>
                );    
            }
        });

        module.exports = Colleagues;
    }());


[Behind the scenes](https://facebook.github.io/react/docs/two-way-binding-helpers.html)