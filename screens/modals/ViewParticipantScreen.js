import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'
import TextInputField from '../../components/TextInputField'
import { auth } from '../../firebase/firebase-config'
import { getParticipant, addMarkerToDB, updateMarkerToDB, getUserInfoFromDB } from '../../constants/MainFunctions'
import { editMarkerMode, editMarkerValues, latitudeContext, longitudeContext, tagData, participantContext } from '../../components/AppContext'
import Colors from '../../constants/Colors'
import ButtonSmall from '../../components/ButtonSmall'
import CloseScreenButton from '../../components/CloseScreenButton'
import TextButton from '../../components/TextButton'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DropDownPicker from 'react-native-dropdown-picker';

import 'intl'
import 'intl/locale-data/jsonp/de'
import { intlFormat } from 'date-fns'
import TextAndIconButton from '../../components/TextAndIconButton'

const ViewParticipantScreen = ( {route, navigation} ) => {  

  const members = route.params.memberList

  const onParticipantButton = async(val) => {
    await getParticipant(val)
    navigation.navigate('ViewAuthorScreen', { authorID: val, authorUsername: participantContext._current_value.markers.username, authorDescription: participantContext._current_value.markers.description})
  }

  return (
    <View style={styles.screenContainer}>
      <Text> Event - Teilnehmer: </Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      {
        members.map( (val,index) => {
          return (
            <TextButton
            text={val+' (Profile ansehen)'}
            onPress={ () => { onParticipantButton(val) } }
      />
          )
        } )
      }
      </ScrollView>

      <ButtonSmall
            text={'Schließen'}
            onPress={() => navigation.pop()}
            backgroundColor={'red'}
          />
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: stylesGlobal.screenContainer.flex,
    paddingHorizontal: stylesGlobal.screenContainer.paddingHorizontal,
    backgroundColor: stylesGlobal.screenContainer.backgroundColor,
    alignItems: 'center'
  },

  scrollViewContainer: {
    alignContent: 'stretch',
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100%'
  }


})

export default ViewParticipantScreen