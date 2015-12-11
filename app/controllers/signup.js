import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      var self = this;
      var signup_username = this.get("name"), signup_email = this.get("email"),
      signup_password = this.get("password"), signup_confirm = this.get("password_confirm");

      if (signup_password === signup_confirm) {
        this.get('auth').signUp(signup_username, signup_email, signup_password, function(error, userData) {
          if (error) {
            Ember.error(error);
          }
          if (userData) {
            var authExtra = self.get('auth.extra');
            var new_user = self.store.createRecord('user', {
              username: signup_username,
              uid: userData.uid,
              email: signup_email,
              soundcloud_token: authExtra.soundcloudToken,
              soundcloud_username: authExtra.soundcloudUsername,
              created_on: new Date()
            });
            new_user.save();
            self.transitionToRoute('login');
          }

        });
      }
    },

    facebookSignup: function() {
      var ref = new Firebase("https://flickering-inferno-7180.firebaseio.com");
      var self = this;
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Sign Up Failed : ", error);
        } else {
          debugger;
          var new_user = self.store.createRecord('user', {
            username: authData.facebook.displayName,
            uid: authData.uid,
            email: authData.facebook.email,
            created_on: new Date()
          }).save();
          self.transitionToRoute('login');
        }
      }, {
        scope:"email"
      });
    }

  }
});
