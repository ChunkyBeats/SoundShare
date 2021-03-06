import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr('string'),
  email: DS.attr('string'),
  username: DS.attr('string'),
  soundcloud_token: DS.attr('string'),
  soundcloud_username: DS.attr('string'),
  verified: DS.attr('boolean', {defaultValue: false}),
  created_on: DS.attr('date'),

  playlists: DS.hasMany('playlist', {
    async: true,
    inverse: 'users'
  }),

  friends: DS.hasMany('user', {
    inverse: null
  })
});
