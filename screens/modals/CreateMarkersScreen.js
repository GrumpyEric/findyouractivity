import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'
import TextInputField from '../../components/TextInputField'
import { auth } from '../../firebase/firebase-config'
import { addMarkerToDB } from '../../constants/MainFunctions'
import { latitudeContext, longitudeContext } from '../../components/AppContext'
import Colors from '../../constants/Colors'
import ButtonSmall from '../../components/ButtonSmall'

const CreateMarkersScreen = ( {navigation, latitude, longitude} ) => {
  const [eventName, setEventName] = useState()
  const [eventDescription, setEventDescription] = useState()

  useEffect(() => {
    console.log(latitudeContext._currentValue);
    console.log(longitudeContext._currentValue);
  }, [])

  useEffect(() => {
    console.log(eventName);
  }, [eventName])

  useEffect(() => {
    console.log(eventDescription);
  }, [eventDescription])
  
  return (
    <View style={stylesGlobal.screenContainer}>
      <Text>Create Marker Screen</Text>

      <TextInputField
        placeholder={'Text 1'}
        value={eventName}
        onChangeText={text => setEventName(text)}
        backgroundColor={Colors.lightGrey}
      />
      <TextInputField
        placeholder={'Text 2'}
        value={eventDescription}
        onChangeText={text => setEventDescription(text)}
        backgroundColor={Colors.lightGrey}
      />

      <ButtonSmall
        text={'Abort'}
        onPress={() => navigation.pop()}
        backgroundColor={'red'}
      />

      <ButtonSmall
        text={'Create'}
        onPress={() => navigation.pop()}
        backgroundColor={Colors.findmyactivityBlue}
      />

      <TouchableOpacity onPress={() => addMarkerToDB(auth, eventName, eventDescription, latitudeContext._currentValue, longitudeContext._currentValue)}>
        <Text>Add Marker to DB</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateMarkersScreen

const styles = StyleSheet.create({

})