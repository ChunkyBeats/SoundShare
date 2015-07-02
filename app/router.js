import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('users');
  this.resource('songs', {path: '/'}, function() {
    this.resource('song', {path: 'songs/:song_id'});
  });
  this.route('new-song');
  this.route('new-user');

  this.route('user');
  this.route('users');
});

export default Router;
