import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  soundcloud_token: DS.attr('string'),
  soundcloud_username: DS.attr('string'),
  verified: DS.attr('boolean', {defaultValue: false}),

  playlist: DS.belongsTo('playlist', {async: true})
});
