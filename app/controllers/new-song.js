import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      var songURL = this.get('suggestion');

      SC.initialize({
        client_id: 'e0d5f2931e81cf14facf65268cd656e0'
      });

      SC.get('/resolve', {url: songURL}, track => {
        if (track.errors && track.errors.length) {
           console.error("This track does not exist");
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
