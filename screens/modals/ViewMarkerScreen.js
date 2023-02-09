import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'
import { auth } from '../../firebase/firebase-config'
import {  optOutOfEvent,optInToEvent } from '../../constants/MainFunctions'
import ButtonSmall from '../../components/ButtonSmall'
import TextButton from '../../components/TextButton'

import 'intl'
import 'intl/locale-data/jsonp/de'

const ViewMarkerScreen = ( {route, navigation} ) => {  
  const nameDisplay = route.params.eventName
  const descriptionDisplay = route.params.eventDescription
  const authorDisplay = route.params.eventAuthorID  
  const authorUsernameDisplay = route.params.eventAuthorUsername  
  const authorDescriptionDisplay = route.params.eventAuthorDescription  
  const creationTimeStamp = route.params.creationDate
  const startTimeDisplay = route.params.eventStartTime  
  const endTimeDisplay = route.params.eventEndTime
  const tagDisplay = route.params.eventTags
  const maxParticipantDisplay = route.params.eventMaxParticipants
  const locationDescriptionDisplay = route.params.eventLocationDescription  
  const participantList = route.params.eventParticipantList


  const onParticipateButton = () =>
  {
    let isParticipating
    if ( participantList.includes( auth.currentUser.uid.toString() ) )
    { 
      isParticipating = true
    }
    else
    {
      isParticipating = false
    }

    if (isParticipating)
    {
      Alert.alert('Teilnahme Absagen', 'Sie sind schon ein Teilnehmer dieses Events. \nWollen Sie die Teilnahme am Event absagen?', [
        {
          text: 'Abbrechen',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'Absage Bestätigen', onPress: () =>{ optOutOfEvent( authorDisplay, creationTimeStamp, auth.currentUser.uid.toString() ), navigation.pop() } },
      ]);
    }
    else
    {
      Alert.alert('Teilnahme Bestätigen', 'Sie sind noch kein Teilnehmer dieses Events. \nWollen Sie an diesem Event teilnehmen?', [
        {
          text: 'Abbrechen',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'Teilnahme Bestätigen', onPress: () => {optInToEvent( authorDisplay, creationTimeStamp, auth.currentUser.uid.toString() ), navigation.pop() } },
      ]);
    }
  }



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
            text={'Teilnahme'}
            onPress={() => onParticipateButton() }
            backgroundColor={'hotpink'}
          />
      <ButtonSmall
            text={'Schließen'}
            onPress={() => navigation.pop()}
            backgroundColor={'orange'}
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