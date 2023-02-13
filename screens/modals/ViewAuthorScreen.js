import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { stylesGlobal } from '../../constants/StylesGlobal';
import { Avatar, ListItem } from "react-native-elements";
import { userPosContext } from '../../components/AppContext';
import { getDistance } from 'geolib';
import React, { useEffect} from "react";
import ButtonRegularWithBorder from '../../components/ButtonRegular';
import Colors from '../../constants/Colors'
import { markersRef } from '../../constants/MainFunctions';
import ButtonSmall from '../../components/ButtonSmall';


const ViewAuthorScreen = ( {route,navigation} ) => {

  const displayID = route.params.authorID
  const  displayUsername = route.params.authorUsername
  const  displayDescription = route.params.authorDescription

  let eventArray = markersRef.filter(function (arr) {
    return arr.user === displayID
  })
  


  const onCloseButton = () => {
    navigation.pop();
  }


  return (
    <View style={stylesGlobal.screenContainer}>
    <ScrollView >
      <View style={stylesGlobal.screenContainer}>

        <TouchableOpacity>
            <View>
                <Avatar 
                    rounded 
                    size='large'
                    source={{
                        uri:'../assets/Profile_Image-png'
                    }}
                />
            </View>
        </TouchableOpacity>  

        
      </View>
      <View>
        <Text style={{fontWeight:'bold'}}>Benutzername:</Text>        
        <Text>  {displayUsername}</Text>
        <Text>__________________________________________ </Text>
        <Text style={{fontWeight:'bold'}}>Beschreibung:</Text>
        <Text>  {displayDescription} </Text>
        <Text>__________________________________________ </Text>
        <Text style={{fontWeight:'bold'}}>Benutzer-ID:</Text>
        <Text>  {displayID} </Text>
      </View>
      <View>
        
      <Text>__________________________________________ </Text> 
    </View>
    <View>
      <Text style={{fontWeight:'bold'}}>Events von diesem Benutzer:</Text>
      {eventArray.map((val, index) => 
            {

              let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
              if (userPosContext._currentValue.coords != undefined)
              {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
              }

              const displayTags = (val) => {
                if( (val.tags != undefined)) 
                {
                  return <Text> Tags: {val.tags.toString()}</Text>
                }
              }

              const displayStartTime = (val) => {

                let startTimeRes = ""//val.startTime

                if( (val.startTime != undefined) ) 
                {
                  //return <Text> Start-Zeit: {val.startTime.toDate().toString()} </Text>
                  startTimeRes = val.startTime.toDate().toString()
                }
                else if ( !(val.startTime != undefined) ) 
                {
                  //return <Text> Start-Zeit: unbekannt </Text>
                  startTimeRes = "unbekannt"
                }
                return  <Text> Start-Zeit: {startTimeRes} </Text>
              }

              const displayEndTime = (val) => {

                let endTimeRes = ""//val.endTime

                if( (val.endTime != undefined) ) 
                {
                  //return <Text> Start-Zeit: {val.startTime.toDate().toString()} </Text>
                  endTimeRes = val.endTime.toDate().toString()
                }
                else if ( !(val.endTime != undefined) ) 
                {
                  //return <Text> Start-Zeit: unbekannt </Text>
                  endTimeRes = "unbekannt"
                }

                return  <Text> End-Zeit: {endTimeRes} </Text>
              }


              return (
                <View key={index} style={{backgroundColor: '#FFFFFF', borderRadius: 10}}>
                  <TouchableOpacity onPress={() => console.log(val)}>
                    <Text key={Math.random().toString()}> {val.name} </Text>
                    <Text key={Math.random().toString()}> {val.description} </Text>
                    { displayStartTime(val) }
                    { displayEndTime(val) }
                    <Text> Distanz: {distanceToUserPos} km</Text>
                    { displayTags(val) }
                  </TouchableOpacity>
                </View>
              )
            }
          )}
      </View>
    </ScrollView>   
    <View style={{alignItems: 'center'}}>
        <ButtonSmall
          text={"Schließen"}
          onPress={() => onCloseButton()}
          backgroundColor={'red'}
        /> 
      </View> 
    </View>
  )
}

export default ViewAuthorScreen

// const styles = StyleSheet.create({

// })