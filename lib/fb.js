import { initializeApp, getApps } from 'firebase/app'

// Add the Firebase products that you want to use
import { getFirestore, collection, doc, getDoc, setDoc } from '@firebase/firestore/lite';

var firebaseConfig = {
   apiKey: "AIzaSyCXa5-lICHDXyRlA3lPv8UkXMr7diURJ20",
   authDomain: "herres.firebaseapp.com",
   projectId: "herres",
   storageBucket: "herres.appspot.com",
   messagingSenderId: "916804957586",
   appId: "1:916804957586:web:f81c696960536dbcd0fd4b"
}
// Initialize Firebase
const app = getApps().length >= 1 ? getApps()[0] : initializeApp(firebaseConfig)

const db = getFirestore(app)

const users = collection(db, "users")
const user = doc(users, "LTftAL23k0roqUXHluqU")
const userAwards = collection(user, "awards")

export const getVideoData = async (id) => {
   const videoDoc = doc(userAwards, id)
   const snapShot = await getDoc(videoDoc)
   if (!snapShot.exists()) return {}

   return snapShot.data()
}

export const setVideoData = async (id, data) => {
   const videoDoc = doc(userAwards, id)
   return await setDoc(videoDoc, data, { merge: true })
}