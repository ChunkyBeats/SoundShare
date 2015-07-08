import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    logIn: function() {
      SC.connect(function() {
        SC.get('/me', function(me) {
          alert('Hello, ' + me.username);
        });
      });
    }
  }
});
