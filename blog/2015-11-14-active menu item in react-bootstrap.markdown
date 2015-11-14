##Active menu item in react-bootstrap

TL;DR; Just look at the code

I wanted to change the menu to implement the default menu of react-bootstrap and ran into some problems when I wanted to set the active class name on the link matching the current url.

###Problem 
How do we get the current path (without using location.hash *he-he*) so that we can check which menu item that's active?

###Solution
Making React Router's component History a mixin lets us call the isActive function with a url path that returns true or false if the path is the active path or not.

###New Problem
Now I've done that but why's the home link (/) always active? :/

###Answer!
It's because the router is always matching the / in the path wether you're visiting mycoolpage.com/#/ (that's right), mycoolpage.com/#/members (that's wrong) or mycoolpage.com/#/anyotherroute since the / is present in the beginning in all of them.

###Solution
The solution is to add a third parameter to the isActive function that says if the path only should match / followed by nothing and not the other paths. 

This parameter should only be true for the home link (/).

To make a long short story short. Require the bootstrap elements just like I do below use them in the menuitem code block and to the important part go to the first code block and look for a comment in capitals in the render function. 

    // MENU
    var React = require('react'),
    MenuItem = require('./menuItem'),
    _ = require('lodash')
    NavBar = require('react-bootstrap').Navbar,
    NavBrand = require('react-bootstrap').NavBrand,
    Nav = require('react-bootstrap').Nav,
    History = require('react-router').History;

    var Menu = React.createClass({

        mixins: [History],

        getDefaultProps: function(){
            return {
                menuItems: [
                    {
                        key: 'home',
                        path: '/',
                        linkText: 'Home',
                        isIndexLink: true
                    },
                    {
                        key: 'members',
                        path: '/members/',
                        linkText: 'Members',
                        isIndexLink: false
                    }
                ]
            }
        },

        render: function(){

        var isActive,
            self = this,
            menuItems = this.props.menuItems.map(function(menuItem){
                
                /* HEEEEEY!! I'M OVER HERE!
                The row below was actually quite hard to come up with despite how simple it looks but it's what makes the li elements                     active state work.*/
                isActive = self.history.isActive(menuItem.path, {}, menuItem.isIndexLink);
                
                return React.createElement(MenuItem, _.merge({isActive: isActive}, menuItem))
            });

        return (
                <NavBar>
                    <NavBrand><a className="navbar-brand" href="#">My headline</a></NavBrand>
                    <Nav>
                        {menuItems}
                    </Nav>
                </NavBar>
            );
        }
    });

    module.exports = Menu;
    
    
    // MENU ITEM
    var React = require('react')
    NavItem = require('react-bootstrap').NavItem;
    
    var MenuItem = React.createClass({
        
        render: function(){
    
            return (
                <NavItem href={'#' + this.props.path} active={this.props.isActive}>{this.props.linkText}</NavItem>
            );
        }
    });
    
    module.exports = MenuItem;