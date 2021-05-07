import app from 'firebase/app';
import 'firebase/auth';


class Firebase {
  constructor() {
    app.initializeApp(require('./serviceAccountKey.json'));

    require("firebase");

    this.auth = app.auth();
    this.db = app.database();
  }
}
export default Firebase;
