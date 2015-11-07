import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  playlist_id: DS.attr('number'),
  playlist_uri: DS.attr('string'),

  user: DS.belongsTo('user', {async: true}),
  songs: DS.hasMany('song', {async: true})

});
