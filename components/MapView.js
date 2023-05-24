import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, PanResponder } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { getDistance } from 'geolib';
import { hawRegion } from "../constants/TestCoords";
import * as Location from 'expo-location';

import { saveNewMarkerLocation, getUserInfoFromDB, applyFilters } from "../constants/MainFunctions";
import FloatingActionButton from "./FloatingActionButton";
import { latitudeContext, longitudeContext, mapRef, userPosContext, rangeContext, selectedAuthor, editMarkerMode, mapRefEdit, markersContext } from "./AppContext";

import 'intl'
import 'intl/locale-data/jsonp/de'
import { format, isSameDay, isTomorrow } from 'date-fns'
import { useNavigation } from "@react-navigation/native";
import ButtonVariable from "./ButtonVariable";

import PropTypes from 'prop-types'
import Colors from "../constants/Colors";
import { width, height, stylesGlobal } from "../constants/StylesGlobal";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import ButtonMapNavigation from "./ButtonMapNavigation";

const MapViewGoogle = (props) => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    const q = query(collection(db, "markers"))

    const unsubscribeReadMarkers = onSnapshot(q, (querySnapshot) => {
      let db_markers = []
      querySnapshot.forEach((doc) => {
        db_markers.push(doc.data().markers)
      })
      markersContext._currentValue = (applyFilters(db_markers, setMarkers))
    })
  }, [])
  

  const navigation = useNavigation()
  const [isUserPosLoaded, setIsUserPosLoaded] = useState(false)
  const [userPos, setUserPos] = useState([]);
  const [markerButtonVisible, setMarkerButtonVisible] = useState(false);

  // get current Region
  const [region, setRegion] = useState(props.initialRegion);
  const [userMarker, setUserMarker] = useState([hawRegion]);

  let userMarkerLatitude = 0
  let userMarkerLongitude = 0

  const updateUserMarker = newInputRegion => {
    setUserMarker([newInputRegion])
    userMarkerLatitude = newInputRegion.latitude
    userMarkerLongitude = newInputRegion.longitude
    latitudeContext._currentValue = userMarkerLatitude
    longitudeContext._currentValue = userMarkerLongitude
    setMarkerButtonVisible(true)

    editMarkerMode._currentValue === true

    ? mapRefEdit.current.animateToRegion({
        latitude: userMarkerLatitude,
        longitude: userMarkerLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })

    : mapRef.current.animateToRegion({
        latitude: userMarkerLatitude,
        longitude: userMarkerLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })
    
  }

  function tryTurnOnGPS() {
    Location.getCurrentPositionAsync()
      .then((currentUserPos) => {
        setUserPos(currentUserPos);
        userPosContext._currentValue = currentUserPos
        setIsUserPosLoaded(true)
      })
      .catch(() => {
        Location.hasServicesEnabledAsync()
        .then((services) => {
          if (!services) {
            Alert.alert('Standortdienste sind nicht eingeschaltet', 'Bitte betätigen Sie den "Position"-Knopf, um die Standortdienste einzuschalten, sonst kann Ihre Position nicht gelesen werden')
          }
        })
      })
  }

  function getCurrentPosition() {
    Location.requestForegroundPermissionsAsync()
    .then((status) => {
      if (status.granted) {

        Location.hasServicesEnabledAsync()
        .then((services) => {
          if (!services) tryTurnOnGPS()
        })
        .then(() => {
          if (userPos.coords != undefined) {
            editMarkerMode._currentValue === true
            ? mapRefEdit.current.animateToRegion({
                latitude: userPos.coords.latitude,
                longitude: userPos.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              })
      
            : mapRef.current.animateToRegion({
                latitude: userPos.coords.latitude,
                longitude: userPos.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              })
          }
        })
        .catch(() => {
          tryTurnOnGPS()
        })
      }
      
    })
  }

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
    .then((status) => {
      if (!status.granted) {
        Alert.alert('Standortberechtigungen wurden abgelehnt', 'Bitte betätigen Sie den "Position"-Knopf, um die eigene Position zu sehen');
      } else {
        Location.requestBackgroundPermissionsAsync()
      }
    })
    .then(() => {
      tryTurnOnGPS()
    })
  }, []);

  function setMarkerInMiddleOfMap() {
    updateUserMarker({latitude: region.latitude, longitude: region.longitude})
  }

  function moveMapUp() {
    props.mapRef.current.animateToRegion({
      latitude: region.latitude + 0.0035,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    })
  }

  function moveMapDown() {
    props.mapRef.current.animateToRegion({
      latitude: region.latitude - 0.0035,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    })
  }

  function moveMapLeft() {
    props.mapRef.current.animateToRegion({
      latitude: region.latitude,
      longitude: region.longitude - 0.0035,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    })
  }

  function moveMapRight() {
    props.mapRef.current.animateToRegion({
      latitude: region.latitude,
      longitude: region.longitude + 0.0035,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    })
  }
  
  return (
    <>
      <FloatingActionButton
        onPress={() => getCurrentPosition()}
        bottomPos={height * 0.25}
        rightPos={width * 0.025}
        icon={'crosshairs-gps'}
        text={'Position'}
        accessibilityHint={'Zeigt Ihre momentane Position an'}
      />

      {editMarkerMode._currentValue === false ?
      <FloatingActionButton
        onPress={() => navigation.navigate("FilterScreen")}
        bottomPos={height * 0.35}
        rightPos={width * 0.025}
        icon={'filter'}
        text={'Filter'}
        accessibilityHint={'Öffnet das Filtermenü'}
      />
      : null}

      <FloatingActionButton
        onPress={() => navigation.navigate("HilfeScreen")}
        bottomPos={height * 0.15}
        rightPos={width * 0.025}
        icon={'help'}
        text={'Hilfe'}
        accessibilityHint={'Öffnet das Hilfemenü'}
      />

      <View style={{
        position: 'absolute',
        bottom: height * 0.1,
        left: 0,
        // right: width * 0.25,
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        zIndex: 5,
        }}>
        <ButtonMapNavigation
          onPressMiddle={() => setMarkerInMiddleOfMap()}
          onPressUp={() => moveMapUp()}
          onPressDown={() => moveMapDown()}
          onPressLeft={() => moveMapLeft()}
          onPressRight={() => moveMapRight()}
          accessibilityHint={'Mit diesem Navigationskreuz ist das Bewegen der Karte und das Setzen von Markern möglich'}
        />
      </View>

      {markerButtonVisible && editMarkerMode._currentValue === false ?
      <View style={{
        position: 'absolute',
        bottom: height * 0.1,
        right: width * 0.25 + 25,
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        zIndex: 5,
        }}> 
        <ButtonVariable
          text={'Marker erstellen'}
          onPress={() => { editMarkerMode._currentValue = false; navigation.navigate('CreateMarkersScreen') }}
          backgroundColor={Colors.findmyactivityYellow}
          borderColor={Colors.findmyactivityText}
          width={150}
          accessibilityHint={'Öffnet das Menü zur Markererstellung'}

        /> 
      </View>

      : markerButtonVisible && editMarkerMode._currentValue === true ?

      <View style={{
        position: 'absolute',
        bottom: height * 0.1,
        right: width * 0.25 + 25,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: 'black',
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        // borderRadius: 30,
        zIndex: 5,
        // width: 60,
        }}> 
        <ButtonVariable
          text={'Markerposition aktualisieren'}
          onPress={() => { navigation.goBack(); saveNewMarkerLocation() }}
          backgroundColor={Colors.findmyactivityYellow}
          borderColor={Colors.findmyactivityText}
          width={150}
          accessibilityHint={'Aktualisiert die Position des Markers'}
        /> 
      </View>
    
      : null}
      
      <MapView
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={(region) => { setRegion(region); } }
        ref={props.mapRef}
        style={props.style}
        initialRegion={props.initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onMapLoaded={props.onMapLoaded}
        toolbarEnabled={editMarkerMode._currentValue === true ? false : true}
        zoomControlEnabled={true}
        onLongPress = {(e) => updateUserMarker(e.nativeEvent.coordinate)}
        onPanDrag={() => setMarkerButtonVisible(false)}
        accessibilityLabel="Karte"
        aria-label="Karte"
        accessibilityRole="none"
        accessibilityHint="Die Karte, auf der Events angezeigt und erstellt werden können"
      >
      {/* DB Markers */}
      {
        markers.map((val, index) => 
          {
            
            let distanceToUserPos = "?"
            if (userPos.coords != undefined)
            {
              distanceToUserPos = getDistance(val, userPos.coords) / 1000
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
              <View key={index}>
                {rangeContext._currentValue != null && distanceToUserPos != '?' && rangeContext._currentValue >= distanceToUserPos || rangeContext._currentValue === 21 || rangeContext._currentValue === 'alle' ?
                <Marker
                   key={index} 
                   coordinate={val} 
                   pinColor={Colors.findmyactivityError} 
                   tracksViewChanges={true} 
                   onPress={() => { getUserInfoFromDB(val.user) }}
                   accessibilityRole="none"
                   accessibilityLabel="Marker"
                   aria-label="Marker"
                  //  focusable={true}
                >
                  <Callout 
                    style={{flex: 1}} 
                    accessibilityRole="button"
                    accessibilityLabel="Eventbeschreibung"
                    aria-label="Eventbeschreibung"
                    onPress={ () => navigation.navigate('ViewMarkerScreen', { creationDate: val.creation_date, eventName: val.name, eventDescription: val.description, eventAuthorUsername: selectedAuthor._current_value.markers.username, eventAuthorDescription: selectedAuthor._current_value.markers.description, eventAuthorID: val.user, eventStartTime: displayStartTime(val), eventEndTime: displayEndTime(val), eventTags: displayTags(val), eventMaxParticipants: val.numberParticipants, eventLocationDescription: val.locationDescription, eventParticipantList: val.participantList } ) }
                  >
                    <Text 
                      style={stylesGlobal.ueberschriftText2}
                      accessibilityRole="text"
                      accessibilityLabel={"Eventname: " + val.name}
                      aria-label={"Eventname: " + val.name}
                      selectable={true}
                    >
                      {'Eventname: '} 
                      <Text style={stylesGlobal.standardText}> 
                        {val.name}
                      </Text>
                    </Text>

                    {val.description ?
                    <Text 
                      style={stylesGlobal.ueberschriftText2}
                      accessibilityRole="text"
                      accessibilityLabel={"Beschreibung: " + val.description}
                      aria-label={"Beschreibung: " + val.description}
                      selectable={true}
                    >
                      {'Beschreibung: '} 
                      <Text style={stylesGlobal.standardText}> 
                        {val.description}
                      </Text>
                    </Text>
                    : null}

                    <Text 
                      style={stylesGlobal.ueberschriftText2}
                      accessibilityRole="text"
                      accessibilityLabel={"Distanz: " + distanceToUserPos + ' km'}
                      aria-label={"Distanz: " + distanceToUserPos + ' km'}
                      selectable={true}
                    >
                      {'Distanz: '} 
                      <Text style={stylesGlobal.standardText}>
                        {distanceToUserPos} km
                      </Text>
                    </Text>

                    <Text 
                      style={stylesGlobal.ueberschriftText2}
                      accessibilityRole="text"
                      accessibilityLabel="Klicken für mehr Infos!"
                      aria-label="Klicken für mehr Infos!"
                      selectable={true}
                    >
                      Klicken für mehr Infos!
                    </Text>
                  </Callout>
                </Marker>
                : null}
              </View>)
          }
        )
      }

        
      {/* User Marker */}
      {
        userMarker.map((val, index) => 
          {
            return (
              <Marker 
                key={index} 
                coordinate={val} 
                pinColor={Colors.findmyactivityOwnPin} 
                draggable={false} 
                tracksViewChanges={true} 
                onPress={() => setMarkerButtonVisible(true)}
                accessibilityRole="none"
                accessibilityLabel="Marker"
                aria-label="Marker"
              > 
              </Marker>
            ); 

          }
        )
      }
    </MapView>
    
  </>
  )
}

MapViewGoogle.propTypes = { initialRegion: PropTypes.object, style: PropTypes.any, onMapLoaded: PropTypes.func, mapRef: PropTypes.any.isRequired }

export default MapViewGoogle