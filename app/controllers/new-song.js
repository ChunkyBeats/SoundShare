import Ember from 'ember';

export default Ember.Controller.extend({
  clearErrors: function() {
    this.set('errors', null);
  }.observes('suggestion'),
  actions: {
    submit: function() {
      var songURL = this.get('suggestion');

      SC.initialize({
        client_id: 'e0d5f2931e81cf14facf65268cd656e0'
      });

      SC.get('/resolve', {url: songURL}, track => {
        if (track.errors && track.errors.length) {
          this.set('errors', [{attr: "url", message: "Invalid SoundCloud URL"}]);
        }
        else {
          var newSuggestion = this.store.createRecord('song', {
            url: songURL
          });

          newSuggestion.save();

          this.set('suggestion', '');
          this.transitionToRoute('/');

        }
      });

    }
  }
});
