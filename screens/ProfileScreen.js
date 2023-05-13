import { updateUserFromDB, readUserFromDB, deleteMarkerToDB } from '../constants/MainFunctions';
import { selectedUserContext, loggedInUser, userPosContext, mapRef, saveProfileChangesFunctionContext, editMarkerMode, editMarkerValues, editMarkerObject, markersContext } from '../components/AppContext';
import { getDistance } from 'geolib';
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { height, stylesGlobal } from '../constants/StylesGlobal';
import TextInputField from '../components/TextInputField';
import FloatingBurgerMenu from '../components/FloatingBurgerMenu';
import Colors from '../constants/Colors';
import ButtonBack from '../components/ButtonBack';
import { format, isSameDay, isTomorrow } from 'date-fns';
import ButtonVariable from '../components/ButtonVariable';
import { auth } from '../firebase/firebase-config';
import { useIsFocused } from '@react-navigation/native';

const Profile = ( {navigation} ) => {
  navigation.setOptions({
    headerTransparent: true
  })
  
  const [eventArray, setEventArray] = useState(markersContext._currentValue.filter(function (arr) {
    return arr.user === selectedUserContext._current_value.markers.uid
  }))
  
  // Zustand der Text-Ausgaben
  const [displayUsername, setDisplayUsername] = useState(selectedUserContext._current_value.markers.username)
  const [displayDescription, setDisplayDescription] = useState(selectedUserContext._current_value.markers.description)

  const onSaveButton = () => {
    updateUserFromDB(selectedUserContext._current_value.markers.uid, displayUsername, displayDescription)
    readUserFromDB(selectedUserContext._current_value.markers.uid)
    Alert.alert('Ihr Profil wurde aktualisiert')
  }

  saveProfileChangesFunctionContext._currentValue = onSaveButton

  const moveToMarker = (inputMarker) => {
    navigation.goBack()
    mapRef.current.animateToRegion({
    latitude: inputMarker.latitude,
    longitude: inputMarker.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
    })
  }

  function editMarkerHandler(val) {
    navigation.navigate('CreateMarkersScreen'); editMarker(val)
  }

  function deleteMarkerHandler(val) {
    Alert.alert(
    'Löschen des Markers',
    'Wollen Sie den Marker wirklich löschen?',
    [
        {
        text: 'Löschen',
        onPress: () => { deleteMarkerToDB(auth, val.creation_date) }
        },
        {
        text: 'Abbrechen',
        onPress: () => {  }
        }
    ]
    )
  }

  const editMarker = (markerValues) => {
    editMarkerMode._currentValue = true

    // editMarkerValues._currentValue.creationDate = ((markerValues.creation_date.nanoseconds / 1000000000 + markerValues.creation_date.seconds) * 1000)
    // editMarkerValues._currentValue.creationDate = Timestamp.fromMillis( (markerValues.creation_date.nanoseconds / 10000000 + markerValues.creation_date.seconds) * 1000 )
    editMarkerValues._currentValue.creationDate = markerValues.creation_date
    editMarkerValues._currentValue.name = markerValues.name
    editMarkerValues._currentValue.description = markerValues.description
    editMarkerValues._currentValue.locationDescription = markerValues.locationDescription
    editMarkerValues._currentValue.startDate = new Date(markerValues.startTime.seconds*1000)
    editMarkerValues._currentValue.endDate = new Date(markerValues.endTime.seconds*1000)
    editMarkerValues._currentValue.numberParticipants = markerValues.numberParticipants
    editMarkerValues._currentValue.tags = markerValues.tags
    editMarkerValues._currentValue.latitude = markerValues.latitude
    editMarkerValues._currentValue.longitude = markerValues.longitude

    editMarkerObject._currentValue = markerValues
    console.log('MY VALUES', markerValues);

    // Timestamp creation date:
    // console.log('creation date:', (markerValues.creation_date.nanoseconds / 1000000000 + markerValues.creation_date.seconds) * 1000 );
    // important for update marker: db, "markers", userID_timestampcreationdate (in seconds)

    console.log('create date:', editMarkerValues._currentValue.creationDate );
}

  return (
  <View style={[stylesGlobal.screenContainer, styles.container]}>
    <FloatingBurgerMenu
      onPress={() => navigation.openDrawer()}
      icon={'navicon'}

    />
    {/* <ButtonBack
      onPress={() => navigation.goBack()}
      text={'Zurück'}
    /> */}
    <View style={stylesGlobal.contentContainerMainScreens}>
      <Text style={[stylesGlobal.ueberschriftText, {textAlign: 'center'}]}>Profil</Text>

      <View style={styles.contentSeparatorStyle}>
        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Mein Benutzername (änderbar)</Text>
        <TextInputField
          placeholder="Mein Benutzername"
          value={displayUsername}
          onChangeText={setDisplayUsername}
        />
      </View>

      <View style={styles.contentSeparatorStyle}>
        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Meine Beschreibung (änderbar)</Text>
        <TextInputField
          placeholder="Meine Beschreibung"
          multiline
          maxLength={250}
          value={displayDescription}
          onChangeText={setDisplayDescription}
        />
      </View>
      
      <View style={styles.contentSeparatorStyle}>
        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Meine E-Mail-Adresse</Text>
        <TextInputField
          editable={false}
          placeholder="Meine E-Mail-Adresse"
          value={loggedInUser._current_value.email.toString()}
          onChangeText={null}
        />
      </View>

      <View style={styles.contentSeparatorStyle}>
      <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Meine Events</Text>
        <ScrollView style={styles.scrollAreaStyle} contentContainerStyle={styles.scrollAreaContentContainerStyle}>
          {
          eventArray.length ?
          eventArray.map((val, index) => {
            let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
            if (userPosContext._currentValue.coords != undefined)
            {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
            }

            const displayStartTime = (val) => {

                let startTimeRes = "unbekannt"
                const startDate = val.startTime.toDate()
                const today = new Date()

                if (val.startTime) {
                  if (isSameDay(startDate, today)) {
                    startTimeRes = "Heute um " + format(startDate, 'HH:mm') + ' Uhr'
                  
                  } else if (isTomorrow(startDate)) {
                    startTimeRes = "Morgen um " + format(startDate, 'HH:mm') + ' Uhr'

                  } else {
                    startTimeRes = format(startDate, 'dd.MM.yyyy, HH:mm') + ' Uhr'
                  }
                }
                return (
                  <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}>Start:{'\n'}
                    <Text style={stylesGlobal.standardText}>{startTimeRes}</Text>
                  </Text>
                )
            }

            const displayEndTime = (val) => {

                let endTimeRes = "unbekannt"
                const endDate = val.endTime.toDate()
                const today = new Date()

                if (val.endTime) {
                  if (isSameDay(endDate, today)) {
                    endTimeRes = "Heute um " + format(endDate, 'HH:mm') + ' Uhr'
                  
                  } else if (isTomorrow(endDate)) {
                    endTimeRes = "Morgen um " + format(endDate, 'HH:mm') + ' Uhr'

                  } else {
                    endTimeRes = format(endDate, 'dd.MM.yyyy, HH:mm') + ' Uhr'
                  }
                }

                return (
                  <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}>Ende:{'\n'}
                    <Text style={stylesGlobal.standardText}>{endTimeRes}</Text>
                  </Text>
                )
            }

            const displayTags = (val) => {
              console.log(val.tags);
                return (
                <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}>Tags:{'\n'}
                  <Text style={stylesGlobal.standardText}>{val.tags.length ? val.tags.toString() : 'keine Tags vergeben'}</Text>
                </Text>
              )
            }

            return (
              <View style={{marginBottom: 15, borderTopWidth: index === 0 ? 0 : 1}} key={index}>
                <TouchableOpacity onPress={() => moveToMarker(val)} style={{marginTop: 10}}>
                  <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}>Eventname:{'\n'}
                    <Text style={stylesGlobal.standardText}>{val.name}</Text>
                  </Text>
                  {val.description 
                  ? 
                  <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}>Beschreibung:{'\n'}
                    <Text style={stylesGlobal.standardText}>{val.description}</Text>
                  </Text>  
                  : null}
                  { displayStartTime(val) }
                  { displayEndTime(val) }
                  <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}>Distanz:{'\n'}
                    <Text style={stylesGlobal.standardText}>{distanceToUserPos} km</Text>
                  </Text>
                  { displayTags(val) }
                  <Text style={stylesGlobal.ueberschriftText2}>Auf das Feld klicken, um zum Event zu springen</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: stylesGlobal.marginsAndPadding.paddingBetweenItems}}>
                  <ButtonVariable
                    backgroundColor={Colors.findmyactivityYellow}
                    borderColor={Colors.findmyactivityYellow}
                    onPress={() => editMarkerHandler(val)}
                    text={'Marker bearbeiten'}
                  />
                  <ButtonVariable
                    backgroundColor={Colors.findmyactivityError}
                    borderColor={Colors.findmyactivityError}
                    onPress={() => deleteMarkerHandler(val)}
                    text={'Marker löschen'}
                  />
                </View>
              </View>
            )
          })
          :
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={stylesGlobal.ueberschriftText2}>Sie haben noch keine eigenen Marker gesetzt. Setzen Sie erstmal Marker auf der Karte, um hier dann die eigenen Marker sehen zu können.</Text>
            </View>
          }
            
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground,
  },
  
  textLabels: {
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: 2
  },

  scrollAreaStyle: {
    height: height * 0.3,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.findmyactivityWhite
  },

  scrollAreaContentContainerStyle: {
    margin: 5,
  },

  contentSeparatorStyle: {
    marginVertical: stylesGlobal.marginsAndPadding.paddingBetweenItems,
    width: '100%',
  },
});

export default Profile;
