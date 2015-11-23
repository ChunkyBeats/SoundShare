import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function () {
      var login_email = this.get("email"),
          login_password = this.get("password");

      this.get("auth").login(login_email, login_password, function(error, userData) {
        if (error) {
        } else {
          this.store.find('user').then(function (users) {
            var user = users.content.find(function(user) {
              if (user.get('email') === login_email) {
                return true;
              }
            });
            SC.accessToken(user.get('soundcloud_token'));
            console.log(user);
            this.get('auth').setCurrentUID(user.uid);
            this.transitionToRoute('songs');
          }.bind(this));
        }
      }.bind(this));
    }
  }
});
