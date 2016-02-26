import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';


var auth = Ember.Object.extend({
  authed: false,
  extra: {},
  init: function() {
    var firebase = new Firebase(config.firebase);
    this.set('firebase', firebase);

    var user = firebase.getAuth();
    console.log("User : ", user);

    if (user) {
      this.setCurrentUID(user.uid);
      this.set('authed', true);
    }

  },
  signUp: function(username, email, password, callback) {
    this.get('firebase').createUser({
      username: username,
      email: email,
      password: password,
      created_on: new Date()
    }, function(error, userData) {
      callback(error, userData);
      if (error) {
        console.log("Error : ", error);
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
      }
    }.bind(this));
  },
  logout: function() {
    this.get('firebase').unauth();
    this.set('authed', false);
    localStorage.clear();
    return true;
  },
  setCurrentUID: function(uid) {
    this.set('authed', true);
    this.set('current_uid', uid);
  }
});

export default {
  name: 'FirebaseAuth',
  after: 'store',
  initialize: function(container, app) {
    Ember.debug("hello");
    app.register('auth:main', auth, {singleton: true});
    app.inject('controller', 'auth', 'auth:main');
    app.inject('route', 'auth', 'auth:main');
  }
};
