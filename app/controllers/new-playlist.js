import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    create: function() {
      var newPlaylist = this.store.createRecord('playlist', {
        name: this.get('playlist-title')
      });
      newPlaylist.save().then((playlist) => {
        this.transitionToRoute('playlist', playlist);
      });
    },

    submit: function() {

      var playlistName = this.get('title');
      window.SC.storage().getItem('SC.accessToken');

      SC.post('/playlists', {
        playlist: { title: playlistName, tracks: [] }
      }, function(response) {
        var newPlaylist = this.store.createRecord('playlist', {
          name: playlistName,
          playlist_id: response.id,
          playlist_uri: response.uri
        });
        newPlaylist.save();
        this.transitionToRoute('songs');
        }.bind(this)
      );
    }
  }
});
