import { updateUserFromDB, readUserFromDB, deleteMarkerToDB } from '../constants/MainFunctions';
import { selectedUserContext, loggedInUser, userPosContext, mapRef, saveProfileChangesFunctionContext, editMarkerMode, editMarkerValues, editMarkerObject, markersContext } from '../components/AppContext';
import { getDistance } from 'geolib';
import React, { useState } from "react";
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
import Colors from '../constants/Colors';
import { format, isSameDay, isTomorrow } from 'date-fns';
import ButtonVariable from '../components/ButtonVariable';
import { auth } from '../firebase/firebase-config';
import { DeleteMarkerText1, DeleteMarkerText2, ProfileDeleteMarkerText, ProfileDescriptionHint, ProfileDescriptionText, ProfileEditMarkerText, ProfileEmailHint, ProfileEmailText, ProfileEventsClickText, ProfileEventsDescriptionText, ProfileEventsDistanceText, ProfileEventsEndeText, ProfileEventsNameText, ProfileEventsStartText, ProfileEventsTagsText, ProfileEventsText, ProfileNoMarkersText, ProfileTitleText, ProfileUsernameHint, ProfileUsernameText } from '../constants/Fixtures';
import { useEffect } from 'react';
import TextButton from '../components/TextButton';

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

  useEffect(() => {
    console.log(markersContext._currentValue);
  }, [markersContext._currentValue])

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
    DeleteMarkerText1,
    DeleteMarkerText2,
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
  <ScrollView style={[stylesGlobal.screenContainer, styles.container]} contentContainerStyle={stylesGlobal.contentContainer}>
    <View style={stylesGlobal.contentContainerMainScreens}>
      <Text 
        style={[stylesGlobal.ueberschriftText, {textAlign: 'center'}]}
        accessibilityLabel={ProfileTitleText}
        aria-label={ProfileTitleText}
        accessibilityRole='header'
        selectable={true}
      >
        {ProfileTitleText}
      </Text>

      <View style={styles.contentSeparatorStyle}>
        <Text 
          style={[styles.textLabels, stylesGlobal.ueberschriftText2]}
          accessibilityLabel={ProfileUsernameText}
          aria-label={ProfileUsernameText}
          accessibilityRole='text'
          selectable={true}
        >
          {ProfileUsernameText}
        </Text>
        <TextInputField
          editable
          placeholder={ProfileUsernameText}
          accessibilityLabel={ProfileUsernameText}
          accessibilityHint={ProfileUsernameHint}
          value={displayUsername}
          onChangeText={setDisplayUsername}
        />
      </View>

      <View style={styles.contentSeparatorStyle}>
        <Text 
          style={[styles.textLabels, stylesGlobal.ueberschriftText2]}
          accessibilityLabel={ProfileDescriptionText}
          aria-label={ProfileDescriptionText}
          accessibilityRole='text'
          selectable={true}
        >
          {ProfileDescriptionText}
        </Text>
        <TextInputField
          editable
          placeholder={ProfileDescriptionText}
          accessibilityLabel={ProfileDescriptionText}
          accessibilityHint={ProfileDescriptionHint}
          multiline
          maxLength={250}
          value={displayDescription}
          onChangeText={setDisplayDescription}
        />
      </View>
      
      <View style={styles.contentSeparatorStyle}>
        <Text 
          style={[styles.textLabels, stylesGlobal.ueberschriftText2]}
          accessibilityLabel={ProfileEmailText}
          aria-label={ProfileEmailText}
          accessibilityRole='text'
          selectable={true}
        >
          {ProfileEmailText}
        </Text>
        <TextInputField
          editable={false}
          placeholder={ProfileEmailText}
          accessibilityLabel={ProfileEmailText}
          accessibilityHint={ProfileEmailHint}
          value={loggedInUser._current_value.email.toString()}
          onChangeText={null}
        />
      </View>

      <View style={styles.contentSeparatorStyle}>
        <Text 
          style={[styles.textLabels, stylesGlobal.ueberschriftText2]}
          accessibilityLabel={ProfileEventsText}
          aria-label={ProfileEventsText}
          accessibilityRole='text'
          selectable={true}
        >
          {ProfileEventsText}
        </Text>
        <ScrollView style={styles.scrollAreaStyle} contentContainerStyle={styles.scrollAreaContentContainerStyle}>
          {
          eventArray.length ?
          eventArray.map((val, index) => {
            let distanceToUserPos = "?"
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
                <Text 
                  style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                  accessibilityLabel={"Start: " + startTimeRes}
                  aria-label={"Start: " + startTimeRes}
                  selectable={true}
                >
                  Start:{'\n'}
                  <Text style={stylesGlobal.standardText}>
                    {startTimeRes}
                  </Text>
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
                <Text 
                  style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                  accessibilityLabel={"Ende: " + endTimeRes}
                  aria-label={"Ende: " + endTimeRes}
                  selectable={true}
                >
                  Ende:{'\n'}
                  <Text style={stylesGlobal.standardText}>
                    {endTimeRes}
                  </Text>
                </Text>
              )
          }

          const displayTags = (val) => {
            console.log(val.tags);
              return (
              <Text 
                style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                accessibilityLabel={"Tags: " + val.tags.length ? val.tags.toString() : 'keine Tags vergeben'}
                aria-label={"Tags: " + val.tags.length ? val.tags.toString() : 'keine Tags vergeben'}
                selectable={true}
              >
                Tags:{'\n'}
                <Text style={stylesGlobal.standardText}>
                  {val.tags.length ? val.tags.toString() : 'keine Tags vergeben'}
                </Text>
              </Text>
            )
          }

            return (
              <View style={{marginBottom: 15, borderTopWidth: index === 0 ? 0 : 1}} key={index}>
                <View style={{marginTop: 10}}>
                  <Text 
                    style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                    accessibilityLabel={ProfileEventsNameText + ': ' + val.name}
                    aria-label={ProfileEventsNameText + ': ' + val.name}
                    accessibilityRole='text'
                    selectable={true}
                  >
                    {ProfileEventsNameText + '\n'}
                    <Text style={stylesGlobal.standardText}>
                      {val.name}
                    </Text>
                  </Text>
                  {val.description 
                  ? 
                  <Text 
                    style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                    accessibilityLabel={ProfileEventsDescriptionText + ': ' + val.description}
                    aria-label={ProfileEventsDescriptionText + ': ' + val.description}
                    accessibilityRole='text'
                    selectable={true}
                  >
                    {ProfileEventsDescriptionText + '\n'}
                    <Text style={stylesGlobal.standardText}>
                      {val.description}
                    </Text>
                  </Text>  
                  : null}
                  { displayStartTime(val) }
                  { displayEndTime(val) }
                  <Text 
                    style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                    accessibilityLabel={ProfileEventsDistanceText + ': ' + distanceToUserPos + ' km'}
                    aria-label={ProfileEventsDistanceText + ': ' + distanceToUserPos + ' km'}
                    accessibilityRole='text'
                    selectable={true}
                  >
                    {ProfileEventsDistanceText + '\n'}
                    <Text style={stylesGlobal.standardText}>
                      {distanceToUserPos} km
                    </Text>
                  </Text>
                  { displayTags(val) }
                  <TextButton 
                    onPress={() => moveToMarker(val)}
                    text={ProfileEventsClickText}
                    accessibilityHint={'Springt zum Event auf der Karte'}
                  />
                </View>

                <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: stylesGlobal.marginsAndPadding.paddingBetweenItems}}>
                  <ButtonVariable
                    backgroundColor={Colors.findmyactivityYellow}
                    borderColor={Colors.findmyactivityYellow}
                    onPress={() => editMarkerHandler(val)}
                    text={ProfileEditMarkerText}
                    accessibilityHint={'Führt auf eine neue Seite für das Bearbeiten des Markers'}
                  />
                  <ButtonVariable
                    backgroundColor={Colors.findmyactivityError}
                    borderColor={Colors.findmyactivityError}
                    textColor={Colors.findmyactivityWhite}
                    onPress={() => deleteMarkerHandler(val)}
                    text={ProfileDeleteMarkerText}
                    accessibilityHint={'Sie werden gefragt, ob die den Marker wirklich löschen wollen'}
                  />
                </View>
              </View>
            )
          })
          :
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text 
                style={stylesGlobal.ueberschriftText2}
                accessibilityLabel={ProfileNoMarkersText}
                aria-label={ProfileNoMarkersText}
                accessibilityRole='text'
                selectable={true}
              >
                {ProfileNoMarkersText}
              </Text>
            </View>
          }
            
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground
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
