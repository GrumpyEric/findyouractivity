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
import { collection, query, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { filterContext } from '../components/AppContext';
// import { useRef } from 'react';

let markersRef
let db_markers = [];

const q = query(collection(db, "markers"));
const readMarkerFromDB = onSnapshot(q, (QuerySnapshot) => {
  db_markers = [];
  QuerySnapshot.forEach( (doc) => {
    db_markers.push(doc.data().markers);
  } );
  applyFilters()  
  //markersRef = db_markers
})

// TODO: filtert noch nicht nach den Preferences, sondern nur danach ob es überhaupt ne tag-variable besitzt oder nicht
const applyFilters = () => {
  const initMarkers = db_markers // backup der db-marker
  const validMarkers = [];
  const preferTags = filterContext._current_value
  if ( preferTags != undefined )
  {
    preferTags.map((preferTagVal, preferTagIndex) => {
      db_markers.map((dbVal, dbIndex) => {
        if (dbVal.tags != undefined)
        {
          //validMarkers.push(dbVal)
          //console.log("DB Marker: ", dbVal.name, " Tags: ", dbVal.tags, " valid Marker: ", dbVal.tags.includes("Kartenspiel"), " ", preferTagVal )
          if (dbVal.tags.includes(preferTagVal.toString()))
          {
            if (!validMarkers.includes(dbVal))
            {
              validMarkers.push(dbVal)
            }
            
            console.log("valid Markers: ", validMarkers)
          }
        }
      })
    })    
    markersRef = validMarkers
  }
  else
  {
    markersRef = db_markers
  }
  //alert(validMarkers)
  //markersRef = validMarkers
}

// MARKER zur DB hinzufügen
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import { format, formatISO } from 'date-fns';

const addMarkerToDB = async(auth, eventNameInput, eventDescInput, eventLocationDesc, startDate, endDate, numberParticipants, tags, userMarkerLatitude, userMarkerLongitude, ) => {
  let userID = auth.currentUser.uid.toString()
  let timeStampObj = Timestamp.now()
  // let date = new Date()
  // TODO: timestamp in UNIX-Format setzen; DONE
  await setDoc(doc(db, "markers", userID+"_"+( timeStampObj.toDate().getTime() ) ), {
    markers: {
      name: eventNameInput,
      description: eventDescInput,
      locationDescription: eventLocationDesc,
      latitude: userMarkerLatitude,
      longitude: userMarkerLongitude,
      creation_date: timeStampObj.toDate().getTime(),
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

// TODO: creation, start and end date not formatted right
const updateMarkerToDB = async(auth, eventNameInput, eventDescInput, eventLocationDesc, startDate, endDate, numberParticipants, tags, userMarkerLatitude, userMarkerLongitude, markerCreationDate) => {
  let userID = auth.currentUser.uid.toString()
  // let creationDate = formatISO(markerCreationDate)
  // console.log(creationDate);
  await updateDoc(doc(db, "markers", userID+"_"+( markerCreationDate ) ), {
    markers: {
      name: eventNameInput,
      description: eventDescInput,
      locationDescription: eventLocationDesc,
      latitude: userMarkerLatitude,
      longitude: userMarkerLongitude,
      creation_date: markerCreationDate,
      startTime: startDate,
      endTime: endDate,
      numberParticipants: numberParticipants,
      tags: tags,
      user: userID
    }
  });
  const alerta_title = "Marker has been updated"
  const alerta_msg = "Latitude: " + userMarkerLatitude.toString() + "\nLongitude" + userMarkerLongitude.toString()
  Alert.alert(alerta_title,alerta_msg);
  // setRegion(userMarker);
}

export { handleForgotPassword, handleSignUp, handleLogin, handleSignOut, addMarkerToDB, updateMarkerToDB, markersRef, applyFilters}
