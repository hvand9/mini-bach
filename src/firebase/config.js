import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBhwlFVHwro1GFWB_vB1ibHxOzb0pD9xcM',
	authDomain: 'mini-bach.firebaseapp.com',
	databaseURL: 'https://mini-bach-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'mini-bach',
	storageBucket: 'mini-bach.appspot.com',
	messagingSenderId: '1032130657100',
	appId: '1:1032130657100:web:f0ff585637089a77796de9',
	measurementId: 'G-B78XQ6ESYM'
};

//init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const projectStorage = firebase.storage();

export { projectFirestore, timestamp, projectAuth, projectStorage };
