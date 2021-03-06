import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('user').then(users => {
      return users.findBy('uid', this.get('auth').current_uid);
    });
  }
});
