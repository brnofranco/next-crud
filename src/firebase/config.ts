import firebase from 'firebase';
import 'firebase/firestore';

if(!firebase.apps.length){
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, /* erro do process. corrigido com "@types/node": "~10.12.0", */
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
}

export default firebase;