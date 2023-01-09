// Handle the forgot password function
import { sendPasswordResetEmail } from 'firebase/auth'

const handleForgotPassword = (auth, email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Link to reset password has been sent!")
  })
  // TODO: create alert, when email is invalid
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

// Handler for sign-up; sends data to Firebase and gets E-Mail back to verify
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const handleSignUp = (auth, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
  sendEmailVerification(auth.currentUser)
    .then(() => {
      alert("E-Mail verification sent! Please confirm your identity to sign-in.")
    });
    })
  .catch(error => alert(error.message))
}

// Handler for sign-in; signs into app and checks if user is email-verified
import { signInWithEmailAndPassword } from 'firebase/auth';

const handleLogin = (auth, email, password, navigation) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
    if (user.emailVerified) {
      navigation.replace("Home")
    }
    else {
      alert("User not verified, yet! Please verify your E-Mail address.")
    }
  })
  .catch(error => alert(error.message))
}

// SignOut Stuff
import { signOut } from 'firebase/auth'
//import { collection, query} from "firebase/firestore";

const handleSignOut = (auth, navigation) => {
  signOut(auth)
  .then(() => {
    navigation.navigate("Login")
  })
  .catch(error => alert(error.message))
}

// Query snapshot Marker
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
// import { useRef } from 'react';

let markersRef

const q = query(collection(db, "markers"));
const readMarkerFromDB = onSnapshot(q, (QuerySnapshot) => {
  const db_markers = [];
  QuerySnapshot.forEach( (doc) => {
    db_markers.push(doc.data().markers);
  } );
  markersRef = db_markers
})


// MARKER zur DB hinzufügen
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import { createContext } from 'react';

const addMarkerToDB = async(auth, eventNameInput, eventDescInput, startDate, endDate, numberParticipants, tags, userMarkerLatitude, userMarkerLongitude, ) => {
  let userID = auth.currentUser.uid.toString()
  let timeStampObj = Timestamp.now()
  // TODO: timestamp in UNIX-Format setzen; DONE
  await setDoc(doc(db, "markers", userID+"_"+( timeStampObj.toDate().getTime() ) ), {
    markers: {
      name: eventNameInput,
      description: eventDescInput,
      latitude: userMarkerLatitude,
      longitude: userMarkerLongitude,
      creation_date: timeStampObj.toDate(),
      startTime: startDate,
      endTime: endDate,
      numberParticipants: numberParticipants,
      tags: tags,
      user: userID
    }
  });
  const alerta_title = "Marker has been Set"
  const alerta_msg = "Latitude: " + userMarkerLatitude.toString() + "\nLongitude" + userMarkerLongitude.toString()
  Alert.alert(alerta_title,alerta_msg);
  // setRegion(userMarker);
}



export { handleForgotPassword, handleSignUp, handleLogin, handleSignOut, addMarkerToDB, markersRef }
