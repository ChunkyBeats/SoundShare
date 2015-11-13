import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';


var auth = Ember.Object.extend({
  authed: false,
  extra: {},
  init: function() {
    var firebase = new Firebase(config.firebase);
    this.set('firebase', firebase);
  },
  signUp: function(username, password, callback) {
    this.get('firebase').createUser({
      email: username,
      password: password
    }, function(error, userData) {
      callback(error, userData);
      if (!error) {
        this.set('authed', true);
      }
    }.bind(this));
  },
  login: function(email, password, callback) {
    var ref = this.get('firebase');
    ref.authWithPassword({
      email: email,
      password: password
    }, function(error, authData) {
      callback(error, authData);
      if (!error) {
        this.set('authed', true);
        // console.log(this.get('firebase').getAuth());

        console.log("Authenticated successfully with payload: ", authData);
      }
    }.bind(this));
  },
  logout: function() {
    this.get('firebase').unauth();
    this.set('authed', false);
    localStorage.clear();
  },
  setCurrentUser: function(user) {
    this.set('current_user', user);
  },
  storeUserData: function() {
    var authData = this.get('firebase').getAuth();
    var ref = this.get('firebase');
    console.log(authData);
    ref.onAuth(function(authData) {
      if (authData) {
        // save user profile into database
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: getName(authData)
        });
      }
    });

    function getName(authData) {
      switch(authData.provider) {
        case 'password':
          return authData.password.email.replace(/@.*/, '');
        case 'twitter':
          return authData.twitter.displayName;
        case 'facebook':
          return authData.facebook.displayName;
      }
    }
  }
});

export default {
  name: 'FirebaseAuth',
  initialize: function(container, app) {
    Ember.debug("hello");
    app.register('auth:main', auth, {singleton: true});
    app.inject('controller', 'auth', 'auth:main');
    app.inject('route', 'auth', 'auth:main');
  }
};
