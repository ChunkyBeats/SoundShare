/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'sound-share',
    environment: environment,
    firebase: 'https://flickering-inferno-7180.firebaseio.com/',
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "",
      'object-src': "'self'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.soundcloud.com https://*.firebaseio.com",
      'font-src': "'self'",
      'connect-src': "'self' wss://*.firebaseio.com https://*.firebase.com http://*.soundcloud.com https://*.soundcloud.com",
      'img-src': "'self' http://*.soundcloud.com",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "https://*.soundcloud.com"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
