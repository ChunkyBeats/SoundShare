import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    logIn: function() {

      SC.initialize({
        client_id: 'e0d5f2931e81cf14facf65268cd656e0',
        redirect_uri: "http://localhost:4200"
      });

      SC.connect(function() {
        SC.get('/me', function(me) {
          alert('Hello, ' + me.username);
        });
      });
    }
  }
});
