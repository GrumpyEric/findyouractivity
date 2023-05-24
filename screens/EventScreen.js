import { auth } from "../firebase/firebase-config";
import { deleteMarkerToDB } from '../constants/MainFunctions';
import { editMarkerMode, editMarkerObject, editMarkerValues, mapRef, markersContext, userPosContext } from '../components/AppContext';
import { getDistance } from 'geolib';
import Colors from '../constants/Colors';
import Slider from '@react-native-community/slider';

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { height, stylesGlobal } from "../constants/StylesGlobal";
import ButtonVariable from "../components/ButtonVariable";
import { format, isSameDay, isTomorrow } from "date-fns";
import { ProfileDeleteMarkerText, ProfileEditMarkerText, ProfileEventsClickText, ProfileEventsDescriptionText, ProfileEventsDistanceText, ProfileEventsNameText } from "../constants/Fixtures";

const EventScreen = ( {navigation} ) => {
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

  const [showAllMyMarkers, setShowAllMarkers] = useState(true)
  const myUserID = auth.currentUser.uid
  const [radiusMarkers, setRadiusMarkers] = useState(5)
  const [radiusMarkersVisual, setRadiusMarkersVisual] = useState(5)
  // console.log(myUserID);

  let myMarkersRef = markersContext._currentValue.filter(function (arr) {
    return arr.user === myUserID
  })

  return (
    <ScrollView style={[stylesGlobal.screenContainer, styles.container]} contentContainerStyle={stylesGlobal.contentContainer}>
      <View style={stylesGlobal.contentContainerMainScreens}>
        <Text 
          style={[stylesGlobal.ueberschriftText, {textAlign: 'center'}]}
          accessibilityRole="header"
          accessibilityLabel="Events"
          aria-label="Events"
          selectable={true}
        >Events
        </Text>
      
        <View style={{flexDirection: 'row', justifyContent: "center", alignItems: "center"}}> 
          <Text 
            style={[stylesGlobal.ueberschriftText2]}
            accessibilityRole="text"
            accessibilityLabel={showAllMyMarkers ? 'Ansicht auf nur meine Marker umstellen' : 'Ansicht auf alle Marker umstellen'}
            aria-label={showAllMyMarkers ? 'Ansicht auf nur meine Marker umstellen' : 'Ansicht auf alle Marker umstellen'}
            selectable={true}
          >
            {showAllMyMarkers ? 'Ansicht auf nur meine Marker umstellen' : 'Ansicht auf alle Marker umstellen'}
          </Text>
          <Switch
            value={showAllMyMarkers}
            disabled={false}
            onValueChange={() => setShowAllMarkers(!showAllMyMarkers)}
            trackColor={{ false: Colors.findmyactivityError, true: Colors.findmyactivityAccept }}
            thumbColor={Colors.findmyactivityWhite}
            accessibilityRole="switch"
            accessibilityLabel={showAllMyMarkers ? 'Ansicht auf nur meine Marker umstellen' : 'Ansicht auf alle Marker umstellen'}
            aria-label={showAllMyMarkers ? 'Ansicht auf nur meine Marker umstellen' : 'Ansicht auf alle Marker umstellen'}
          ></Switch>
        </View>

        <Text 
          style={[stylesGlobal.ueberschriftText2, {marginBottom: 2}]}
          accessibilityRole="text"
          accessibilityLabel='Umkreis anzuzeigender Marker'
          aria-label='Umkreis anzuzeigender Marker'
          selectable={true}
        >
          Umkreis anzuzeigender Marker:
        </Text>
        <View style={[styles.contentSeparatorStyle, {backgroundColor: Colors.findmyactivityWhite, padding: 5, borderWidth: 2, borderRadius: 10, marginTop: 0}]}>
          <Text 
            style={stylesGlobal.standardText}
            accessibilityRole="text"
            accessibilityLabel={radiusMarkersVisual === 'alle Marker anzeigen' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}
            aria-label={radiusMarkersVisual === 'alle Marker anzeigen' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}
            selectable={true}
          >
            {radiusMarkersVisual === 'alle Marker anzeigen' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={21}
            onSlidingComplete={(value) => { value < 21 ? setRadiusMarkers(value) : setRadiusMarkers('alle') } }
            step={1}
            value={radiusMarkers}
            onValueChange={(value) => value < 21 ? setRadiusMarkersVisual(value) : setRadiusMarkersVisual('alle Marker anzeigen')}
            minimumTrackTintColor={Colors.findmyactivityAccept}
            maximumTrackTintColor={Colors.findmyactivityError}
            thumbTintColor={Colors.findmyactivityText}
            accessibilityRole='adjustable'
            accessibilityLabel={radiusMarkers.toString()}
            aria-label={radiusMarkers.toString()}
          />
        </View>

        <View style={styles.eventsStyle}>
        <Text 
          style={[stylesGlobal.ueberschriftText2, {marginBottom: 2}]}
          accessibilityRole="text"
          accessibilityLabel={showAllMyMarkers ? 'Alle Events' : 'Meine Events'}
          aria-label={showAllMyMarkers ? 'Alle Events' : 'Meine Events'}
          selectable={true}
        >
          {showAllMyMarkers ? 'Alle Events' : 'Meine Events'}
        </Text>

          <ScrollView style={styles.scrollAreaStyle} contentContainerStyle={styles.scrollAreaContentContainerStyle}>
          <View>
          {
          !showAllMyMarkers ?
          myMarkersRef.length ?
          myMarkersRef.map((val, index) => 
          {
            let distanceToUserPos = "?"
            if (userPosContext._currentValueeric.coords != undefined)
            {
              distanceToUserPos = getDistance(val, userPosContext._currentValueeric.coords) / 1000
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

            if (distanceToUserPos < radiusMarkers || radiusMarkers === 'alle') {
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
            }
          }
        )
        :
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text 
              style={stylesGlobal.ueberschriftText2}
              accessibilityRole="text"
              accessibilityLabel='Sie haben noch keine eigenen Marker gesetzt. Setzen Sie erstmal Marker auf der Karte, um hier dann die eigenen Marker sehen zu können.'
              aria-label='Sie haben noch keine eigenen Marker gesetzt. Setzen Sie erstmal Marker auf der Karte, um hier dann die eigenen Marker sehen zu können.'
              selectable={true}
            >
              Sie haben noch keine eigenen Marker gesetzt. Setzen Sie erstmal Marker auf der Karte, um hier dann die eigenen Marker sehen zu können.
            </Text>
          </View>
        :
        markersContext._currentValue.length ?
        markersContext._currentValue.map((val, index) => 
          {
            let distanceToUserPos = "?"
            if (userPosContext._currentValueeric.coords != undefined)
            {
              distanceToUserPos = getDistance(val, userPosContext._currentValueeric.coords) / 1000
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

            if (distanceToUserPos < radiusMarkers || radiusMarkers === 'alle') {
              return (
                <View key={index} style={{ marginBottom: 15, borderTopWidth: index === 0 ? 0 : 1 }}>
                <View style={{marginTop: 10}}>
                  <Text 
                    style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                    accessibilityLabel={ProfileEventsNameText + ' ' + val.name}
                    aria-label={ProfileEventsNameText + ' ' + val.name}
                    selectable={true}
                  >
                    {ProfileEventsNameText + '\n'}
                    <Text 
                      style={stylesGlobal.standardText}
                    >
                      {val.name}
                    </Text>
                  </Text>
                  {val.description 
                  ? 
                  <Text 
                    style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                    accessibilityLabel={ProfileEventsDescriptionText + ' ' + val.description}
                    aria-label={ProfileEventsDescriptionText + ' ' + val.description}
                    selectable={true}
                  >
                    {ProfileEventsDescriptionText + '\n'}
                    <Text
                      style={stylesGlobal.standardText}
                    >
                      {val.description}
                    </Text>
                  </Text>  
                  : null}
                  { displayStartTime(val) }
                  { displayEndTime(val) }
                  <Text 
                    style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle]}
                    accessibilityLabel={ProfileEventsDistanceText + ' ' + distanceToUserPos + ' km'}
                    aria-label={ProfileEventsDistanceText + ' ' + distanceToUserPos + ' km'}
                    selectable={true}
                  >
                    {ProfileEventsDistanceText + '\n'}
                    <Text 
                      style={stylesGlobal.standardText}
                    >
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

                {val.user === myUserID 
                ?
                <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: stylesGlobal.marginsAndPadding.paddingBetweenItems}}>
                  <ButtonVariable
                    backgroundColor={Colors.findmyactivityYellow}
                    borderColor={Colors.findmyactivityYellow}
                    onPress={() => editMarkerHandler(val)}
                    text={ProfileEditMarkerText}
                  />
                  <ButtonVariable
                    backgroundColor={Colors.findmyactivityError}
                    borderColor={Colors.findmyactivityError}
                    textColor={Colors.findmyactivityWhite}
                    onPress={() => deleteMarkerHandler(val)}
                    text={ProfileDeleteMarkerText}
                  />
                </View>
                :
                null
                }

              </View>
              )
            }
          }
        )
        :
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text 
              style={stylesGlobal.ueberschriftText2}
              accessibilityRole="text"
              accessibilityLabel='Es hat noch niemand Marker gesetzt. Setzen Sie den ersten Marker auf der Karte!'
              aria-label='Es hat noch niemand Marker gesetzt. Setzen Sie den ersten Marker auf der Karte!'
              selectable={true}
            >
              Es hat noch niemand Marker gesetzt. Setzen Sie den ersten Marker auf der Karte!
            </Text>
          </View>
      }
          </View>
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

  contentSeparatorStyle: {
    marginVertical: stylesGlobal.marginsAndPadding.paddingBetweenItems,
  },

  scrollAreaStyle: {
    height: height * 0.45,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.findmyactivityWhite
  },

  scrollAreaContentContainerStyle: {
    margin: 5,
  },

});

export default EventScreen;
