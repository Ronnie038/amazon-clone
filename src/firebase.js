import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDXsPOF9cV454mlRo8wFPpLeewVsMjpato',
	authDomain: 'clone-7f4ba.firebaseapp.com',
	projectId: 'clone-7f4ba',
	storageBucket: 'clone-7f4ba.appspot.com',
	messagingSenderId: '451453155662',
	appId: '1:451453155662:web:b8ef431ec51f46eb56061f',
	measurementId: 'G-LCQJ3ZHEJ5',
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth();

export { db, auth };
