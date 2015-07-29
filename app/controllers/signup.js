import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      var self = this;
      var signup_email = this.get("email"), signup_password = this.get("password"),
        signup_confirm = this.get("password_confirm");
      if (this.get("password") === this.get("password_confirm")) {
        this.get('auth').signUp(signup_email, signup_password, function(error, userData) {
          if (error) {
            Ember.error(error);
          }
          if (userData) {
            var authExtra = self.get('auth.extra');
            var new_user = self.store.createRecord('user', {
              auth_uid: userData.uid,
              email: signup_email,
              soundcloud_token: authExtra.soundcloudToken,
              soundcloud_username: authExtra.soundcloudUsername

            });
            new_user.save();
            self.transitionToRoute('songs');
          }

        });
      }
    }
  }
});