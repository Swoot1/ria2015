##Validation with Firebase

The world is not a safe place and there're many bad people that would love to wreck your database. That's why you <del>should</del> have to set up rules in your Firebase database, making their lives harder and yours easier.

###Default rules
This is the default security rules when you create a new database in Firebase.
    
    {
      "rules": {
        ".read": true, // it's ok to read!
        ".write": true // it's ok to write! I don't even care what you write!
      }
    }

You find it at https://\<YOUR-APP-NAME\>.firebaseio.com/?page=Security. It basically says that it's ok for anyone (in the whole wide world) to read your data and to write anything to your data. As you surely understand this is not recommended. **People can not be trusted.**

###New validation rules
What we want is to validate each resource separately according to their security level so that we're in control of the data. 

In this example we have a database containing co-workers. Each co-worker has a fullname and an employee number.  
   
Example:
   
    {
      "rules": {
        ".read": true,
        "coworkers": {
          "$userid": {
            ".write": true,
            ".validate": "newData.hasChildren(['employeeNumber', 'fullname'])", 
            "fullname": {
              ".validate": "newData.isString() && newData.val().matches(/^[\\wåäö\\s-]{2,100}$/i)"
            },
            "employeeNumber": {
              ".validate": "newData.isString() && newData.val().matches(/^[\\wåäö\\d]{4,8}$/i)"
            }
          }
        }
      }
    }
    
We keep the rules property and the .read property from the default settings. It's still ok for everyone to read the data in the database. 

If we'd want we can  set read to only be true for authenticated users. We'll focus on the validation today and let the read property be. 

Since the read property is directly under rules it applies to the entire database. If we would instead set the .read property on a resource just like we've set the .write properties under the coworkers property it would only apply to that resource.
  
In the rules property we have a property coworkers that represents our co-workers resource. The co-workers resource has a variable $userid that represents each co-workers id. This can be any variable name prefixed with a dollar sign.
 
As you can see we have a .validate property directly under the $userid object and then one under each property name. The one directly under the $userid is for the entire co-worker object. I'm using newData.hasChildren(['somePropName', 'otherPropName']) to check that all the properties I want to be set, fullname and employee number, is set. newData is the name of the data from the request and the name is set by Firebase. The other .validates each validate their respective property.
    
###A quick tip
If you get this error message:

FIREBASE WARNING: set at /\<YOUR-APP-NAME\>/-randomString failed: permission_denied

when you're making a POST/PUT to Firebase it doesn't have to be that you're not authorized it can be that you're breaking the validation which yields the same error message.

##Just a thought on incremental id
If you add a new object to your Firebase resource you'll see that you'll get a generated id. Something like: -K4Ihof50OKQaOTHtsqr. I noticed that it's not that incremental (I have a very sharp vision) and that it's not an integer. Why not?

It turns out that since Firebase is a real time database it's not recommended to use incremental id because the risk of one object overwriting the other. (It can be done if you really want to.)
