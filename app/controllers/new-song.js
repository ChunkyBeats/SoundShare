import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['new-song'],
  selectedUser: null,
  userPlaylists: null,
  selectedPlaylist: null,

  getUserPlaylists: function() {
    Ember.run.once(this, 'getPlaylists');
  }.observes('selectedUser'),

  getPlaylists: function() {
    this.store.find('playlist').then(playlists => {
      var queryPlaylists = [];
      playlists.content.filter(function(playlist) {
        if (playlist.get('users').content.currentState[0].get('id') === this.selectedUser.id) {
          queryPlaylists.push(playlist);
        }
      }.bind(this));
      this.set('userPlaylists', queryPlaylists);
    }.bind(this));
  },

  // getPlaylists: function() {
  //   this.get('auth').get('firebase').child('playlists').on('value', function(snapshot) {
  //     debugger;
  //     console.log(snapshot);
  //   });
  // },

  clearErrors: function() {
    this.set('errors', null);
  }.observes('suggestion'),

  actions: {
    submit: function() {
      var songURL = this.get('suggestion');

      SC.get('/resolve', {url: songURL}, track => {
        if (track.errors && track.errors.length) {
          this.set('errors', [{attr: "url", message: "*Invalid SoundCloud URL"}]);
        }
        else {
          var current_user = this.store.find('user').then(users => {
            return users.findBy('uid', this.get('auth').current_uid);
          }).then(user => {
            var newSuggestion = this.store.createRecord('song', {
              url: track.permalink_url,
              artist: track.user.username,
              title: track.title,
              track_id: track.id,
              recommended_by: current_user.name,
              recommended_on: new Date()
            });

            newSuggestion.save().then((suggestion) => {
              debugger;
              this.selectedPlaylist.get('songs').then((songs) => {
                songs.pushObject(newSuggestion);
                this.selectedPlaylist.save().then(() => {
                  this.transitionToRoute('success');
                });
              });
            }.bind(this));
          }.bind(this));



          // trackInfo = SC.get('/resolve', {url: songURL+'#client_id=e0d5f2931e81cf14facf65268cd656e0'});
          // newSuggestion.set('songName', track.title);
          // newSuggestion.save();
          this.set('suggestion', '');
          // this.transitionToRoute('/');


        }
      });

    }
  }
});
