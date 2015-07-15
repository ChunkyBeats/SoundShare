import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {

      // SC.initialize({
      //   client_id: 'e0d5f2931e81cf14facf65268cd656e0',
      //   redirect_uri: "http://localhost:4200"
      // });

      var playlistName = this.get('title');
      SC.post('/playlists', {
        playlist: { title: playlistName, tracks: [] }
      });
    }
  }
});
