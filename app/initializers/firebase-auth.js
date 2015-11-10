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
    this.get('firebase').authWithPassword({
      email: email,
      password: password
    }, function(error, authData) {
      callback(error, authData);
      if (!error) {
        this.set('authed', true);
        console.log(this.get('firebase').getAuth());
      }
    }.bind(this));
  },
  logout: function() {
    this.set('authed', false);
    localStorage.clear();
    this.transitionToRoute('/');
  },
  setCurrentUser: function(user) {
    this.set('current_user', user);
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
