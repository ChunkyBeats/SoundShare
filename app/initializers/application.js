export default {
  name: 'application',
  initialize: function(container, application) {
    var auth_user = localStorage.getItem('session_user');
    if (auth_user) {
      var sc_access = JSON.parse(auth_user).soundcloud_token;
      window.SC.storage().setItem('SC.accessToken', sc_access);
    }
  }
};
