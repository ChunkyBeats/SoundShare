import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('playlist', params.playlist_id);
  }
});
