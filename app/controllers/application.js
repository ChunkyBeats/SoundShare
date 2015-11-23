import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    logIn: function() {
      var self = this;
      SC.initialize({
        client_id: 'e0d5f2931e81cf14facf65268cd656e0',
        redirect_uri: "http://localhost:4200"
      });

      SC.connect(function() {
        SC.get('/me', function(me) {
          self.set('auth.extra', {
            soundcloudUsername: me.username,
            soundcloudToken: SC.accessToken()
          });
          // self.current_user.set('verified', true);
          self.transitionToRoute('signup');
        });
      });
    },
    logOut: function() {
      this.get('auth').logout();
      localStorage.clear();
      this.transitionToRoute('/');
    }
  }
});
