import config from '../config/environment';
import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';
import DS from 'ember-data';

export default FirebaseAdapter.extend({
  firebase: new Firebase(config.firebase)
});
