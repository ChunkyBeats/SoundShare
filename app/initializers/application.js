export default {
  name: 'application',
  initialize: function() {
    var sc_access = JSON.parse(localStorage.getItem('session_user')).soundcloud_token;
    window.SC.storage().setItem('SC.accessToken', sc_access);
  }
}
