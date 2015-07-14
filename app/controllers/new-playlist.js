import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      var playlistName = this.get('title');

      SC.connect(function() {

        SC.post('/playlists', {
          playlist: { title: playlistName }
        });
      });
    }
  }
});
