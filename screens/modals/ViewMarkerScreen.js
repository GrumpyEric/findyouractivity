import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'
import TextInputField from '../../components/TextInputField'
import { auth } from '../../firebase/firebase-config'
import {  getParticipant, updateMarkerToDB, getUserInfoFromDB, readUserFromDB } from '../../constants/MainFunctions'
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

const ViewMarkerScreen = ( {route, navigation} ) => {  
  const nameDisplay = route.params.eventName
  const descriptionDisplay = route.params.eventDescription
  const authorDisplay = route.params.eventAuthorID  
  const authorUsernameDisplay = route.params.eventAuthorUsername  
  const authorDescriptionDisplay = route.params.eventAuthorDescription
  const startTimeDisplay = route.params.eventStartTime  
  const endTimeDisplay = route.params.eventEndTime
  const tagDisplay = route.params.eventTags
  const maxParticipantDisplay = route.params.eventMaxParticipants
  const locationDescriptionDisplay = route.params.eventLocationDescription  
  const participantList = route.params.eventParticipantList


  return (
    <View style={styles.screenContainer}>
      <Text> EVENT ÜBERSICHT </Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <Text> Name: {nameDisplay} </Text>
      <Text> Beschreibung: {descriptionDisplay} </Text>      
      <Text> Ortbeschreibung: {locationDescriptionDisplay} </Text>
      <Text> Author: {authorUsernameDisplay} </Text>
      <TextButton
            text={'(Profile ansehen)'}
            onPress={ () => {navigation.navigate('ViewAuthorScreen', { authorID: authorDisplay, authorUsername: authorUsernameDisplay, authorDescription: authorDescriptionDisplay}) } }
      />
      <Text> Anzahl der Teilnehmer: {participantList.length} / {maxParticipantDisplay} </Text>
      <TextButton
            text={'(Teilnehmer-Liste anzeigen)'}
            onPress={ () => { navigation.navigate('ViewParticipantScreen', {memberList: participantList} ) } }
      />
      {startTimeDisplay}
      {endTimeDisplay}
      {tagDisplay}
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

export default ViewMarkerScreen