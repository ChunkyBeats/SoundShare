import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('songs', {path: '/'}, function() {
    this.resource('song', {path: 'songs/:song_id'});
  });
  
  this.route('new-song');
  this.route('new-playlist');
  this.route('login');
  this.route('signup');

  this.resource('user', {path: 'users/:uid'});

  this.resource('playlists', function() {
    this.resource('playlist', {path: 'playlists/:playlist_id'});
  });

});

export default Router;
