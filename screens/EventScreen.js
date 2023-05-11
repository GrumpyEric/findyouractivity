import { auth } from "../firebase/firebase-config";
import { deleteMarkerToDB, markersRef } from '../constants/MainFunctions';
import { editMarkerMode, editMarkerObject, editMarkerValues, mapRef } from '../components/AppContext';
import { getDistance } from 'geolib';
import { userPosContext } from '../components/AppContext';
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
import FloatingBurgerMenu from "../components/FloatingBurgerMenu";
import ButtonBack from "../components/ButtonBack";
import ButtonVariable from "../components/ButtonVariable";
import { format, isSameDay, isTomorrow } from "date-fns";

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

    const [showMyMarkers, setShowMyMarkers] = useState(true)
    const myUserID = auth.currentUser.uid
    const [radiusMarkers, setRadiusMarkers] = useState(5)
    const [radiusMarkersVisual, setRadiusMarkersVisual] = useState(5)
    // console.log(myUserID);

    let myMarkersRef = markersRef.filter(function (arr) {
      return arr.user === myUserID
  })

  return (
    <View style={[stylesGlobal.screenContainer, styles.container]}>
      <FloatingBurgerMenu
        onPress={() => navigation.openDrawer()}
        icon={'navicon'}
      />
      <ButtonBack
        onPress={() => navigation.goBack()}
        text={'Zurück'}
      />
      <View style={stylesGlobal.contentContainerMainScreens}>
        <Text style={[stylesGlobal.ueberschriftText, {textAlign: 'center'}]}>Events</Text>
      
        <Text style={[stylesGlobal.ueberschriftText2, {textAlign: 'center'}]}>Ansicht umstellen auf:</Text>
        <View style={{flexDirection: 'row', justifyContent: "center"}}> 
          <Text style={{color: showMyMarkers ? '#CAD6E0' : Colors.findmyactivityText, alignSelf: 'center'}}>Alle Marker</Text>
          <Switch
            value={showMyMarkers}
            disabled={false}
            onValueChange={() => setShowMyMarkers(!showMyMarkers)}
            trackColor={{ false: "#237076", true: "#FBB900" }}
            thumbColor={showMyMarkers ? "#237076" : "#FBB900"}
            ios_backgroundColor="#3e3e3e"
            style={styles.switch}
          ></Switch>
          <Text style={{color: showMyMarkers ? Colors.findmyactivityText : '#CAD6E0', marginLeft: 20, alignSelf: 'center'}}>Meine Marker</Text>
        </View>

        <View style={styles.contentSeparatorStyle}>
          <Text style={[stylesGlobal.ueberschriftText2, {marginBottom: 2}]}>Radius:</Text>
          <Text style={styles.radius1}>{radiusMarkersVisual === 'alle Marker anzeigen' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}</Text>
          <Slider 
            value={radiusMarkers}
            minimumValue={0}
            maximumValue={21}
            onSlidingComplete={(value) => value < 21 ? setRadiusMarkers(value) : setRadiusMarkers('alle')}
            step={1}
            onValueChange={(value) => value < 21 ? setRadiusMarkersVisual(value) : setRadiusMarkersVisual('alle Marker anzeigen')}
            minimumTrackTintColor={Colors.findmyactivityYellow}
            thumbTintColor={Colors.findmyactivityGreen}
          />
        </View>

        <View style={styles.eventsStyle}>
        <Text style={[stylesGlobal.ueberschriftText2, {marginBottom: 2}]}>{showMyMarkers ? 'Meine Events' : 'Alle Events'}</Text>

          <ScrollView style={styles.scrollAreaStyle} contentContainerStyle={styles.scrollAreaContentContainerStyle}>
          <View>
          {
          showMyMarkers ?
          myMarkersRef.length ?
          myMarkersRef.map((val, index) => 
          {
            let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
            // console.log(userPosContext._currentValue.coords);
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
                  startTimeRes = format(startDate, 'dd.MM.yyyy - HH:mm') + ' Uhr'
                }
              }
              return <Text style={stylesGlobal.standardText}> Start-Zeit: {startTimeRes} </Text>
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
                  endTimeRes = format(endDate, 'dd.MM.yyyy - HH:mm') + ' Uhr'
                }
              }

              return <Text style={stylesGlobal.standardText}> End-Zeit: {endTimeRes} </Text>
          }

          const displayTags = (val) => {
            console.log(val.tags);
            if( (val.tags.length)) {
              return <Text style={stylesGlobal.standardText}> Tags: {val.tags.toString()}</Text>
            } else {
              return <Text style={stylesGlobal.standardText}> Tags: keine Tags vergeben</Text>
            }
          }

            if (distanceToUserPos < radiusMarkers || radiusMarkers === 'alle') {
              return (
                <View key={index} style={{ marginBottom: 15, borderTopWidth: index === 0 ? 0 : 1 }}>
                  <TouchableOpacity onPress={() => moveToMarker(val)} style={{marginTop: 10}}>
                    <Text style={[stylesGlobal.ueberschriftText2, {marginBottom: val.description ? 0 : 5} ]}> {val.name} </Text>
                    {val.description 
                      ? <Text style={[stylesGlobal.standardText, {marginBottom: 5}]}> {val.description} </Text>
                      : null
                    }
                    { displayStartTime(val) }
                    { displayEndTime(val) }
                    <Text style={stylesGlobal.standardText}> Distanz: {distanceToUserPos} km</Text>
                    { displayTags(val) }
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: stylesGlobal.marginsAndPadding.paddingBetweenItems}}>
                    <ButtonVariable
                      backgroundColor={Colors.findmyactivityYellow}
                      borderColor={Colors.findmyactivityYellow}
                      onPress={() => editMarkerHandler(val)}
                      text={'Marker bearbeiten'}
                    />
                    <ButtonVariable
                      backgroundColor={'red'}
                      borderColor={'red'}
                      onPress={() => deleteMarkerHandler(val)}
                      text={'Marker löschen'}
                    />
                  </View>

                </View>
              )
            }
          }
        )
        :
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={stylesGlobal.ueberschriftText2}>Sie haben noch keine eigenen Marker gesetzt. Setzen Sie erstmal Marker auf der Karte, um hier dann die eigenen Marker sehen zu können.</Text>
          </View>
        :
        markersRef.length ?
        markersRef.map((val, index) => 
          {
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
                  startTimeRes = format(startDate, 'dd.MM.yyyy - HH:mm') + ' Uhr'
                }
              }
              return <Text style={stylesGlobal.standardText}> Start-Zeit: {startTimeRes} </Text>
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
                  endTimeRes = format(endDate, 'dd.MM.yyyy - HH:mm') + ' Uhr'
                }
              }

              return <Text style={stylesGlobal.standardText}> End-Zeit: {endTimeRes} </Text>
          }

          const displayTags = (val) => {
            console.log(val.tags);
            if( (val.tags.length)) {
              return <Text style={stylesGlobal.standardText}> Tags: {val.tags.toString()}</Text>
            } else {
              return <Text style={stylesGlobal.standardText}> Tags: keine Tags vergeben</Text>
            }
          }

            if (distanceToUserPos < radiusMarkers || radiusMarkers === 'alle') {
              return (

                <View key={index} style={{ marginBottom: 15, borderTopWidth: index === 0 ? 0 : 1 }}>
                <TouchableOpacity onPress={() => moveToMarker(val)} style={{marginTop: 10}}>
                  <Text style={[stylesGlobal.ueberschriftText2, {marginBottom: val.description ? 0 : 5} ]}> {val.name} </Text>
                  {val.description 
                    ? <Text style={[stylesGlobal.standardText, {marginBottom: 5}]}> {val.description} </Text>
                    : null
                  }
                  { displayStartTime(val) }
                  { displayEndTime(val) }
                  <Text style={stylesGlobal.standardText}> Distanz: {distanceToUserPos} km</Text>
                  { displayTags(val) }
                </TouchableOpacity>

                {val.user === myUserID 
                ?
                <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: stylesGlobal.marginsAndPadding.paddingBetweenItems}}>
                  <ButtonVariable
                    backgroundColor={Colors.findmyactivityYellow}
                    borderColor={Colors.findmyactivityYellow}
                    onPress={() => editMarkerHandler(val)}
                    text={'Marker bearbeiten'}
                  />
                  <ButtonVariable
                    backgroundColor={'red'}
                    borderColor={'red'}
                    onPress={() => deleteMarkerHandler(val)}
                    text={'Marker löschen'}
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
            <Text style={stylesGlobal.ueberschriftText2}>Es hat noch niemand Marker gesetzt. Setzen Sie den ersten Marker auf der Karte!</Text>
          </View>
      }
          </View>
        </ScrollView>
        </View>
      </View>      
    </View>
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
