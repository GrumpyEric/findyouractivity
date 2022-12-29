import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { stylesGlobal } from '../constants/StylesGlobal'
import { db } from "../firebase/firebase-config";
import { markersRef } from '../constants/MainFunctions';

const MyMarkersScreen = ( {navigation} ) => {
  return (
    <ScrollView >
      <View style={stylesGlobal.screenContainer}>
      <Text>MARKERS</Text>

      {
        markersRef.map((val, index) => 
          {
            // let distanceToUserPos = "?"//getDistance(val,props.userPos.coords) / 1000
            // if (userPos.coords != undefined)
            // {
            //   distanceToUserPos = getDistance(val, userPos.coords) / 1000
            // }
            return (
              <View style={{backgroundColor: '#DDDDDD', marginBottom: 10}}>
                <TouchableOpacity onPress={() => console.log(val)}>
                  <Text key={Math.random().toString()}> {"MARKERNAME: " + val.name} </Text>
                  <Text key={Math.random().toString()}> {"BESCHREIBUNG: " + val.description} </Text>
                </TouchableOpacity>
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