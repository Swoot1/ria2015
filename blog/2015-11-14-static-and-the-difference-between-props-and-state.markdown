##Static and the difference between props and state

###Static
If you've tried out the (hello world example)[https://facebook.github.io/react/docs/getting-started.html#quick-start-without-npm] on the react home page you already know what static is. It's static. It doesn't change and you can't manipulate it. Everytime you call render you get the same result.

    //myChildComponent.js
    (function(){
        'use strict';

        var React = require('react');

        var MyChildComponent = React.createClass({

            render() {
                return(<h1>Hello World I'm Static</h1>);
            }
        });

        module.exports = MyChildComponent;
    }());



    //main.js
    (function(){

        'use strict';

        var React = require('react'),
            ReactDOM = require('react-dom'),
            MyChildComponent = require('./components/myChildComponent.js');

        ReactDOM.render(<MyChildComponent/>, document.getElementById('root'));
    }());
    
    
    //index.html (same for all examples)
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <div id="root"></div>
            <script type="text/javascript" src="bundle.js"></script>
        </body>
    </html>

This example code will always output "Hello World I'm Static" as an h1 tag.

###Props
Use it when you want to manipulate the render output from the outside of the component. By sending in arguments to the component you get a dynamic component and the result from the render method can vary depending on your input. The props can not be changed by the component receiving them.

    //myChildComponent.js
    (function(){
        'use strict';

        var React = require('react');

        var MyChildComponent = React.createClass({

            // This is the default props. They will be set unless the parent component writes them over.
            getDefaultProps: function(){
                return {name: 'Elin'};
            },

            render() {
                return(<h1>Hello {this.props.name}</h1>); // You can use the this.props properties in the render html or somewhere else in the component.
            }
        });

        module.exports = MyChildComponent;
    }());



    //main.js
    /*global require*/

    (function(){

        'use strict';

        var React = require('react'),
            ReactDOM = require('react-dom'),
            MyChildComponent = require('./components/myChildComponent.js');

        // See how we've added the attribute name with the value Santa. The name attribute will be set on the .props object in the component and available for the child component to use.
        ReactDOM.render(<MyChildComponent name="Santa"/>, document.getElementById('root'));
    }());
    
If the MyChildComponent is called without props from the parent component it will use the props that's returned from the 'getDefaultProps function' of course it will try to use the props sent in from the parent first if any.

##State
State is pretty much the same as props except this time the parent can't decide what the state object should contain only the component itself can. I think this is mainly used for when a user is interaction with the component.

    //myChildComponent.js
    (function(){
    'use strict';
    
        var React = require('react');

        var MyChildComponent = React.createClass({

            // This is the initial state. They'll be set until they're overwritten by a call to setState with the same properties.
            getInitialState: function(){
                return {name: 'you'};
            },

            sayHelloRIAMember: function(){
                this.setState({name: 'RIA member'}); // This is how you update the state. This will also cause a re-render of the component.
            },
            // We're now using this.state.name instead of this.props.name.
            render() {
                return(<div><h1>Hello {this.state.name}</h1><input type="button" onClick={this.sayHelloRIAMember} value="Say hello RIA member"/></div>);
            }
        });

        module.exports = MyChildComponent;
    }());


[Example from react](https://facebook.github.io/react/) [Read this as well](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md) [And this](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html)