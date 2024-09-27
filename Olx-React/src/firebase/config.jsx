import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBuxOiAbp4AE9wsMw3VxLU8i4-TuemCcVk",
    authDomain: "olx-project-7cc08.firebaseapp.com",
    projectId: "olx-project-7cc08",
    storageBucket: "olx-project-7cc08.appspot.com",
    messagingSenderId: "374114754878",
    appId: "1:374114754878:web:bdb627249b5d02787c4c6f",
    measurementId: "G-80YKEZHEF4"
  };


const firebaseApp= initializeApp(firebaseConfig);
const auth=getAuth(firebaseApp)
const db=getFirestore(firebaseApp)
const storage=getStorage(firebaseApp)
export { firebaseApp,auth,db,storage};
