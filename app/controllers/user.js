import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    logIn: function() {
      var self = this,
      soundcloud_user = '',
      soundcloud_token = '';

      SC.connect(function() {
        SC.get('/me', function(me) {
          self.set('auth.extra', {
            soundcloudUsername: me.username,
            soundcloudToken: SC.accessToken()
          });
          soundcloud_user = me.username;
          soundcloud_token = SC.accessToken();


          var current_user = self.store.find('user').then(users => {
            return users.findBy('uid', self.get('auth').current_uid);
          }).then(function(user) {
            user.set('soundcloud_token', soundcloud_token);
            user.set('soundcloud_username', soundcloud_user);
            user.set('verified', true);

          debugger;

            user.save();
            self.transitionToRoute('/');
          });
          // current_user.save();
        });
      });
    }
  }
});
