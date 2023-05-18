// Handle the forgot password function
import { sendPasswordResetEmail } from 'firebase/auth'

export const handleForgotPassword = (auth, email) => {
  if (emailRegexTest(email)) {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert('Erfolg!', 'Falls sich Ihre eingegebene E-Mail-Adresse in unserem System befindet, dann bekommen Sie dort in Kürze einen Link zum Zurücksetzen des Passwortes.')
    })
    .catch((error) => {
      Alert.alert('Fehler', 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut')
    });
  
  } else {
    Alert.alert('Achtung', 'Keine gültige E-Mail-Adresse angegeben. Bitte erneut versuchen.')
  } 
  
}

// Handler for sign-up; sends data to Firebase and gets E-Mail back to verify
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export const handleSignUp = (auth, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
  sendEmailVerification(auth.currentUser)
    .then(() => {
      Alert.alert("Authentifizierungs-E-Mail gesendet!", "Bitte bestätigen Sie Ihre Identität, indem Sie auf den Link in der E-Mail klicken!")
    });
    })
  .catch((error) => {
    if (error.code === "auth/email-already-in-use") {
      Alert.alert("Diese E-Mail ist schon in Verwendung", "Bitte nutzen Sie eine andere E-Mail oder setzen Sie Ihr Passwort zurück, falls Sie es vergessen haben!")
    }

    else if (error.code === 'auth/weak-password') {
      Alert.alert("Ihr gewähltes Passwort ist zu schwach", "Bitte nutzen Sie mindestens 8 Zeichen für Ihr Passwort!")
    }

    else if (!email || !emailRegexTest(email)) {
      Alert.alert("E-Mail fehlt oder falsch", "Bitte geben Sie eine gültige E-Mail-Adresse an!")
    }

    else if (error.code === "auth/wrong-password") {
      Alert.alert("E-Mail oder Passwort falsch", "Bitte geben Sie E-Mail oder Passwort erneut ein!")
    }

    else if (!password) {
      Alert.alert("Passwort fehlt", "Bitte geben Sie ein Passwort ein!")
    }

    else if (!email || (!emailRegexTest(email) && (!password || error.code === "auth/wrong-password")) || error.code === "auth/wrong-password") {
      Alert.alert("E-Mail oder Passwort falsch", "Bitte geben Sie E-Mail oder Passwort erneut ein!")
    }
  })
}

// Handler for sign-in; signs into app and checks if user is email-verified
import { signInWithEmailAndPassword } from 'firebase/auth';

export const handleLogin = (auth, email, password, navigation) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
    if (user.emailVerified) {
      loggedInUser._current_value = user
      isLoggedInContext._currentValue = true
      // user zur DB hinzufügen falls noch nicht vorhanden ist
      readUserFromDB(user.uid);
      navigation.replace("Home")
    }
    else {
      Alert.alert("Benutzer ist registiert, aber noch nicht per E-Mail verifiziert. Bitte folgen Sie dem Link in der E-Mail oder fordern Sie einen neuen Link an!")
    }
  })
  .catch((error) => {
    if (error.code === "auth/too-many-requests") {
      Alert.alert("Zu viele Anmeldeversuche", "Bitte setzen Sie Ihr Passwort zurück oder versuchen Sie es später nocheinmal!")
    }

    else if (!email || !emailRegexTest(email)) {
      Alert.alert("E-Mail fehlt oder falsch", "Bitte geben Sie eine gültige E-Mail-Adresse an!")
    }

    else if (error.code === "auth/wrong-password") {
      Alert.alert("E-Mail oder Passwort falsch", "Bitte geben Sie E-Mail oder Passwort erneut ein!")
    }

    else if (!password) {
      Alert.alert("Passwort fehlt", "Bitte geben Sie ein Passwort ein!")
    }

    else if (!email || (!emailRegexTest(email) && (!password || error.code === "auth/wrong-password")) || error.code === "auth/wrong-password") {
      Alert.alert("E-Mail oder Passwort falsch", "Bitte geben Sie E-Mail oder Passwort erneut ein!")
    }
  })
}

// SignOut Stuff
import { signOut } from 'firebase/auth'
//import { collection, query} from "firebase/firestore";


export const handleSignOut = (auth, navigation) => {
  signOut(auth)
  .then(() => {
    navigation.navigate("Login")
  })
  .catch(error => alert(error.message))
}

// Query snapshot Marker
import { collection, query, onSnapshot, updateDoc, deleteDoc, FieldValue } from "firebase/firestore";
import { db } from '../firebase/firebase-config';

import { filterContext, selectedUserContext, loggedInUser, selectedAuthor, participantContext, editMarkerValues, latitudeContext, longitudeContext, errorPasswordCheckContext, errorEmailCheckContext, markersContext, isLoggedInContext } from '../components/AppContext';

// wendet die vom nutzer eingestellten filter ein
export const applyFilters = (db_markers, setMarkers) => {
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
    setMarkers(validMarkers)
    return validMarkers
    // markersContext._currentValue = validMarkers
  }
  else
  {
    setMarkers(db_markers)
    return db_markers
    // markersContext._currentValue = db_markers
  }
}


// USER zur user-DB hinzufügen
export const addUserToDB = async(username, description, uid, events) =>
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
export const readUserFromDB = async(uid) =>
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

export const getUserInfoFromDB = async(uid) => {
  const docRef = doc( db, "users", uid.toString() )
  const docSnap = await getDoc(docRef);
  
  if ( docSnap.exists() )
  {
    selectedAuthor._current_value = docSnap.data()
    return selectedAuthor._current_value
  }
  
}

export const getParticipant = async(uid) => {
  const docRef = doc( db, "users", uid.toString() )
  const docSnap = await getDoc(docRef);
  
  if ( docSnap.exists() )
  {
    participantContext._current_value = docSnap.data()
    //Alert.alert(docSnap.name)
    return participantContext._current_value
  }
  
}


// User-Info auf DB ändern (z.B. Benutzernamen ändern)
export const updateUserFromDB = async(uid, usernameInput, descriptionInput) =>
{
  const userDocRef = doc(db,"users", uid.toString())
  await updateDoc(userDocRef, {
    "markers.username": usernameInput,
    "markers.description": descriptionInput
  }) 
}

export function saveNewMarkerLocation() {
  editMarkerValues._currentValue.latitude = latitudeContext._currentValue
  editMarkerValues._currentValue.longitude = longitudeContext._currentValue
}



// MARKER zur DB hinzufügen
import { Timestamp, doc, setDoc, getDoc, getDocs, where } from 'firebase/firestore';
import { Alert } from 'react-native';
import { format, formatISO } from 'date-fns';
import { emailRegexTest } from './HelperFunctionsAndVariables';

export const addMarkerToDB = async(auth, eventNameInput, eventDescInput, eventLocationDesc, startDate, endDate, numberParticipants, tags, userMarkerLatitude, userMarkerLongitude, ) => {
  let userID = auth.currentUser.uid.toString()
  let timeStampObj = Timestamp.now()

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
      user: userID,
      participantList: [userID]
    }
  });
  const alerta_title = "Marker has been Set"
  const alerta_msg = "Latitude: " + userMarkerLatitude.toString() + "\nLongitude" + userMarkerLongitude.toString()
  Alert.alert(alerta_title,alerta_msg);
  // setRegion(userMarker);
}

export const getEventsFromUser = async(uid) =>
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
export const updateMarkerToDB = async(auth, eventNameInput, eventDescInput, eventLocationDesc, startDate, endDate, numberParticipants, tags, userMarkerLatitude, userMarkerLongitude, markerCreationDate) => {
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

export const optInToEvent = async(creatorID, markerCreationDate, participantID) => {
  // let creationDate = formatISO(markerCreationDate)
  // console.log(creationDate);
  const docRef = doc(db, "markers", creatorID+"_"+( markerCreationDate ) )
  const docSnap = await getDoc(docRef);
  
  if ( docSnap.exists() )
  {
    let eventParticipantList = docSnap.data().markers.participantList
    if (eventParticipantList.length < docSnap.data().markers.numberParticipants)
    {
      eventParticipantList.push(participantID)
      await updateDoc(docRef, {
        markers: {
          name: docSnap.data().markers.name,
          description: docSnap.data().markers.description,
          locationDescription: docSnap.data().markers.locationDescription,
          latitude: docSnap.data().markers.latitude,
          longitude: docSnap.data().markers.longitude,
          creation_date: docSnap.data().markers.creation_date,
          startTime: docSnap.data().markers.startTime,
          endTime: docSnap.data().markers.endTime,
          numberParticipants: docSnap.data().markers.numberParticipants,
          tags: docSnap.data().markers.tags,
          user: docSnap.data().markers.user,
          participantList: eventParticipantList
        }
      });
    }
    else
    {
      Alert.alert("Teilnahme nicht erfolgreich", "Die maximale Anzahl an Teilnehmer wurde erreicht")
    }
  }
  else
    {
      Alert.alert("Teilnahme nicht erfolgreich", "Event nicht mehr verfügbar")
    }
}

export const optOutOfEvent = async(creatorID, markerCreationDate, participantID) => {
  // let creationDate = formatISO(markerCreationDate)
  // console.log(creationDate);
  const docRef = doc(db, "markers", creatorID+"_"+( markerCreationDate ) )
  const docSnap = await getDoc(docRef);
  
  if ( docSnap.exists() )
  {
    let eventParticipantList = docSnap.data().markers.participantList
    eventParticipantList = eventParticipantList.filter(function (arr) {
      return arr != participantID
    })

    await updateDoc(docRef, {
      markers: {
        name: docSnap.data().markers.name,
        description: docSnap.data().markers.description,
        locationDescription: docSnap.data().markers.locationDescription,
        latitude: docSnap.data().markers.latitude,
        longitude: docSnap.data().markers.longitude,
        creation_date: docSnap.data().markers.creation_date,
        startTime: docSnap.data().markers.startTime,
        endTime: docSnap.data().markers.endTime,
        numberParticipants: docSnap.data().markers.numberParticipants,
        tags: docSnap.data().markers.tags,
        user: docSnap.data().markers.user,
        participantList: eventParticipantList
      }
    });

  }
}


export const deleteMarkerToDB = async(auth, markerCreationDate) => {
  let userID = auth.currentUser.uid.toString()

  await deleteDoc(doc(db, "markers", userID+"_"+( markerCreationDate ) ))
  const alerta_title = "Marker has been deleted"
  const alerta_msg = ':('
  Alert.alert(alerta_title,alerta_msg);
}

// export function refreshMap() {
//   refreshContext._currentValue = Math.floor(Math.random() * 100)
//   console.log(refreshContext._currentValue);
// }
