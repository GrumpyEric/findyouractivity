import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { stylesGlobal } from '../constants/StylesGlobal'
import { auth, db } from "../firebase/firebase-config";
import { markersRef } from '../constants/MainFunctions';
import { mapRef } from '../components/AppContext';
import { getDistance } from 'geolib';
import { userPosContext } from '../components/AppContext';
import Colors from '../constants/Colors';
import TextButton from '../components/TextButton';

const MyMarkersScreen = ( {navigation} ) => {

const moveToMarker = (inputMarker) => {
  mapRef.current.animateToRegion({
    latitude: inputMarker.latitude,
    longitude: inputMarker.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  })
  navigation.pop()
}
  const [showMyMarkers, setShowMyMarkers] = useState(true)
  const myUserID = auth.currentUser.uid
  // console.log(myUserID);

  let myMarkersRef = markersRef.filter(function (arr) {
    return arr.user === myUserID
  })

  console.log(myMarkersRef);

  return (
    <ScrollView >
      <View style={stylesGlobal.screenContainer}>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: showMyMarkers ? Colors.findmyactivityText : Colors.findmyactivityBlue}}>Alle Marker anzeigen</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={showMyMarkers ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setShowMyMarkers(!showMyMarkers)}
            value={showMyMarkers}
          />
          <Text style={{color: showMyMarkers ? Colors.findmyactivityBlue : Colors.findmyactivityText}}>Nur meine Marker anzeigen</Text>
        </View>
        {
          showMyMarkers ?
          myMarkersRef.map((val, index) => 
            {
              let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
              console.log(userPosContext._currentValue.coords);
              if (userPosContext._currentValue.coords != undefined)
              {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
              }
              return (
                <View style={{backgroundColor: '#DDDDDD', marginBottom: 10}}>
                  <TouchableOpacity onPress={() => moveToMarker(val)}>
                    <Text key={Math.random().toString()}> {"MARKERNAME: " + val.name} </Text>
                    <Text key={Math.random().toString()}> {"BESCHREIBUNG: " + val.description} </Text>
                    <Text> Distanz: {distanceToUserPos} km</Text>
                  </TouchableOpacity>
                  <TextButton
                    onPress={() => null}
                    text={'bearbeiten'}
                    textColor={Colors.findmyactivityBlue}
                  />
                  {/* <Text> Distanz: {distanceToUserPos} km</Text> */}
                </View>
              )
            }
          )
          :
          markersRef.map((val, index) => 
            {
              let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
              if (userPosContext._currentValue.coords != undefined)
              {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
              }
              return (
                <View style={{backgroundColor: '#DDDDDD', marginBottom: 10}}>
                  <TouchableOpacity onPress={() => console.log(val)}>
                    <Text key={Math.random().toString()}> {"MARKERNAME: " + val.name} </Text>
                    <Text key={Math.random().toString()}> {"BESCHREIBUNG: " + val.description} </Text>
                    <Text> Distanz: {distanceToUserPos} km</Text>
                  </TouchableOpacity>
                  {val.user === myUserID 
                  ?
                  <TextButton
                    onPress={() => null}
                    text={'bearbeiten'}
                    textColor={Colors.findmyactivityBlue}
                  />
                  :
                  null
                  }
                  {/* <Text> Distanz: {distanceToUserPos} km</Text> */}
                </View>
              )
            }
          )
        }

        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default MyMarkersScreen

// const styles = StyleSheet.create({

// })