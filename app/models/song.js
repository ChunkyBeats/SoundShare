import DS from 'ember-data';

export default DS.Model.extend({
  artist: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string'),
  track_id: DS.attr('number'),

  playlists: DS.hasMany('playlist', {async: true})
});
