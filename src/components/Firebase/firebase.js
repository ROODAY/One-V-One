import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
    this.EmailAuthProvider = app.auth.EmailAuthProvider;
  }

  // Auth
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // DB
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  userPostScore = (uid, pid) => this.db.ref(`users/${uid}/postScores/${pid}`)

  post = uid => this.db.ref(`posts/${uid}`);
  postRating = uid => this.db.ref(`posts/${uid}/rating`);
  posts = () => this.db.ref('posts');

  song = uid => this.storage.ref().child(`audio/${uid}`);
  songs = () => this.storage.ref().child('audio');
}

export default Firebase;