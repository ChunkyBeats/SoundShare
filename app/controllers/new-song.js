import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      var songURL = this.get('suggestion');
      var newSuggestion = this.store.createRecord('song', {
        url: songURL
      });

      newSuggestion.save();

      this.set('suggestion', '');
      this.transitionToRoute('/');
    }
  }
});
