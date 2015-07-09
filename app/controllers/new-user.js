import Ember from 'ember';

export default Ember.Controller.extend({
  // clearErrors: function() {        ADD IN ERROR THROW FOR
  //   this.set('errors', null);      WHEN PASSWORD AND PASSWORD CONFIRM
  // }.observes('addPassConfirm'),    DO NOT MATCH
  //
  actions: {
    submit: function() {
      var userName = this.get('addUserName'), password = this.get('addPass'),
      passwordConfirm = this.get('addPassConfirm');

      if (password === passwordConfirm) {     // CHANGE LATER TO != FOR PASS CONFIRM
        var newUser = this.store.createRecord('user', {
          name: userName, password: password
        });
        newUser.save();
        this.set('addUser', '');
        this.set('addPass', '');
        this.set('addPassConfirm', '');
        this.transitionToRoute('/users');
      }
    }
  }
});
