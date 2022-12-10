import React, {useRef} from "react";
import { Text } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import { getDistance } from 'geolib';



// TODO: make it class component
const MapViewGoogle = (props) => {
  const mapRef = useRef(null);
  return (
    <MapView
      provider = {PROVIDER_GOOGLE}
      ref= {mapRef}
      style={props.style}
      initialRegion={props.initialRegion}
      showsUserLocation={true}
      followsUserLocation={true}
      onPress = {props.onPress}
      //onRegionChangeComplete runs when the user stops dragging MapView
      onRegionChangeComplete={props.onRegionChangeComplete}

    >
    {/* DB Markers */}
    {
      props.markers.map((val, index) => 
        {
          let distanceToUserPos = getDistance(val,props.userPos.coords) / 1000
          return (
          <Marker key={index} coordinate={val} pinColor={val.color} tracksViewChanges={true} /*image={require("./assets/haw logo.png")}*/>
            <Callout>
              <Text key={Math.random().toString()}> {val.name} </Text>
              <Text key={Math.random().toString()}> {val.description} </Text>
              <Text> Distanz: {distanceToUserPos} km</Text>
            </Callout>
        </Marker>); 
        }
      )
    }

      
    {/* User Marker */}
    {
      props.userMarker.map((val, index) => 
        {
          return (
          <Marker key={index} coordinate={val} pinColor='blue' draggable={false} tracksViewChanges={true}>
            <Callout >
                <Text key={Math.random().toString()}> {props.eventNameInput} </Text>
                <Text key={Math.random().toString()}> {props.eventDescInput} </Text>
            </Callout>
        </Marker>); 
        }
      )
    }
  </MapView>
  )
}

export default MapViewGoogle