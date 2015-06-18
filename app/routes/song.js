import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('song', params.song_id);
  },
  setupController: function(controller, model) {
    var track_url = model.get('url');

    controller.set('model', model);

    SC.oEmbed(track_url, { auto_play: true, maxheight: 160 }, function(oEmbed) {
      controller.set('player', oEmbed);
    });
  }
});
