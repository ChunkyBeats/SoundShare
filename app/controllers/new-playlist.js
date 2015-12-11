import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    create: function() {
      var name = this.get('playlist-title');

      this.store.find('user').then(users => {
        var user = users.findBy('uid', this.get('auth').current_uid),
          newPlaylist = this.store.createRecord('playlist', {
            name: name,
            users: [user]
          });

        newPlaylist.save().then((playlist) => {
          user.get('playlists').then(playlists => {
            playlists.pushObject(newPlaylist);
            user.save().then(() => {
              this.transitionToRoute('playlists');
            });
          });
        });
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
