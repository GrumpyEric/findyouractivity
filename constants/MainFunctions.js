// Handle the forgot password function
import { sendPasswordResetEmail } from 'firebase/auth'

const handleForgotPassword = (auth, email) => {
  if (emailRegexTest(email)) {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert('Erfolg!', 'Falls sich Ihre eingegebene E-Mail-Adresse in unserem System befindet, dann bekommen Sie dort in Kürze einen Link zum Zurücksetzen des Passwortes.')
    })
    // TODO: create alert, when email is invalid
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  
  } else {
    Alert.alert('Achtung', 'Keine gültige E-Mail-Adresse angegeben. Bitte erneut versuchen.')
  } 
  
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
      
      loggedInUser._current_value = user
      // user zur DB hinzufügen falls noch nicht vorhanden ist
      readUserFromDB(user.uid);
      navigation.replace("Home")
    }
    else {
      alert("User not verified, yet! Please verify your E-Mail address.")
    }
  })
  .catch(error => alert(error.message))
}

// remove snapshot listener
const unsubscribeMarkerDB = onSnapshot(collection(db, "markers"), () => {
  // Respond to data
  // ...
});

const unsubscribeUserDB = onSnapshot(collection(db, "users"), () => {
  // Respond to data
  // ...
});

const unsubscribe = () => 
{
  unsubscribeMarkerDB()
  unsubscribeUserDB()
}

// SignOut Stuff
import { signOut } from 'firebase/auth'
//import { collection, query} from "firebase/firestore";

const handleSignOut = (auth, navigation) => {
  unsubscribe();
  signOut(auth)
  .then(() => {
    navigation.navigate("Login")
  })
  .catch(error => alert(error.message))
}

// Query snapshot Marker
import { collection, query, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { filterContext, selectedUserContext, loggedInUser } from '../components/AppContext';
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


// wendet die vom nutzer eingestellten filter ein
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


// USER zur user-DB hinzufügen
const addUserToDB = async(username, description, uid, events) =>
{
  // let userID = auth.currentUser.uid.toString()
  await setDoc(doc(db, "users", uid ), {
    markers: {
      uid: uid,
      description: description,
      username: username,
      events: events
    }
  }).catch(error => alert(error.message));
}

// User von user-DB ablesen
const readUserFromDB = async(uid) =>
{
  const docRef = doc( db, "users", uid.toString() )
  const docSnap = await getDoc(docRef);
  
  if ( docSnap.exists() )
  {
    selectedUserContext._current_value = docSnap.data()
    //console.log(docSnap.data())
  }
  else
  {
    addUserToDB( "Unknown User "+ uid , "Write Something about yourself" , uid, [] )
  }
}

// User-Info auf DB ändern (z.B. Benutzernamen ändern)
const updateUserFromDB = async(uid, usernameInput, descriptionInput) =>
{
  const userDocRef = doc(db,"users", uid.toString())
  await updateDoc(userDocRef, {
    "markers.username": usernameInput,
    "markers.description": descriptionInput
  }) 
}



// MARKER zur DB hinzufügen
import { Timestamp, doc, setDoc, getDoc, getDocs, where } from 'firebase/firestore';
import { Alert } from 'react-native';
import { format, formatISO } from 'date-fns';
import { emailRegexTest } from './HelperFunctionsAndVariables';

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

const getEventsFromUser = async(uid) =>
{
  let resArray = []
  const eventQuery = query(collection(db,"markers"), where("user".toString(), "== ", uid.toString()))
  const querySnapshot = await getDocs(eventQuery);
  querySnapshot.forEach((doc) =>
   {
    // doc.data() is never undefined for query doc snapshots
    resArray.push(doc.data().markers);
    //console.log(doc.id, " => ", doc.data());
  });
  return resArray
}

// TODO: creation, start and end date not formatted right; DONE
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

const deleteMarkerToDB = async(auth, markerCreationDate) => {
  let userID = auth.currentUser.uid.toString()

  await deleteDoc(doc(db, "markers", userID+"_"+( markerCreationDate ) ))
  const alerta_title = "Marker has been deleted"
  const alerta_msg = ':('
  Alert.alert(alerta_title,alerta_msg);
}

export { handleForgotPassword, handleSignUp, handleLogin, handleSignOut, addMarkerToDB, updateMarkerToDB, deleteMarkerToDB, markersRef, applyFilters, updateUserFromDB, readUserFromDB, getEventsFromUser}