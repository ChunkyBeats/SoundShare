import DS from 'ember-data';

export default DS.Model.extend({
  artist: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string'),
  track_id: DS.attr('number'),
  recommended_by: DS.attr('string'),
  recommended_on: DS.attr('date'),

  playlist: DS.belongsTo('playlist', {async: true})
});
