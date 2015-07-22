import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {

      var newPlaylist = this.store.createRecord('playlist');
      var playlistName = this.get('title');
      SC.post('/playlists', {
       playlist: { title: playlistName, tracks: [] }
      }, function(response) {
          newPlaylist.set('name', playlistName);
          newPlaylist.set('playlist_id', response.id);
          newPlaylist.set('playlist_uri', response.uri);
        }
      );
      newPlaylist.save();
      this.transitionToRoute('songs');
    }
  }
});
