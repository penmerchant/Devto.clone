// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCNu15l-RaH1r5dLenFD3Ci_IBgE3TujU',
  authDomain: 'blog-app-439c7.firebaseapp.com',
  projectId: 'blog-app-439c7',
  storageBucket: 'blog-app-439c7.appspot.com',
  messagingSenderId: '1084141371081',
  appId: '1:1084141371081:web:1372c8eb4343864955d718',
  measurementId: 'G-3QFZJQW8CC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
module.exports = app;
