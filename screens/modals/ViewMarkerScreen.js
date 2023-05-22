import React from 'react'
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native'
import { auth } from '../../firebase/firebase-config'
import { optOutOfEvent,optInToEvent } from '../../constants/MainFunctions'
import ButtonVariable from '../../components/ButtonVariable'

import 'intl'
import 'intl/locale-data/jsonp/de'
import { stylesGlobal } from '../../constants/StylesGlobal'
import ButtonBack from '../../components/ButtonBack'
import Colors from '../../constants/Colors'
import { LoginBackHint } from '../../constants/Fixtures'

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
    <ScrollView accessibilityViewIsModal={true} style={[stylesGlobal.screenContainer, styles.container]} contentContainerStyle={stylesGlobal.contentContainer}>
      <Text 
        style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, textAlign: 'center'}]}
        accessibilityRole="header"
        accessibilityLabel='Event'
        aria-label='Event'
      >
        Event
      </Text>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContainer}>
        <Text 
          style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}
          accessibilityRole="text"
          accessibilityLabel='Eventname'
          aria-label='Eventname'
        >
          Eventname:{'\n'}
          <Text 
            style={stylesGlobal.standardText}
            accessibilityRole="text"
            accessibilityLabel={nameDisplay}
            aria-label={nameDisplay}
          >
            {nameDisplay}
          </Text>
        </Text>

        {descriptionDisplay ?
        <Text 
          style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}
          accessibilityRole="text"
          accessibilityLabel='Beschreibung'
          aria-label='Beschreibung'
        >
          Beschreibung:{'\n'}
          <Text 
            style={stylesGlobal.standardText}
            accessibilityRole="text"
            accessibilityLabel={descriptionDisplay}
            aria-label={descriptionDisplay}
          >
            {descriptionDisplay}
          </Text>
        </Text>  
        : null}

        {locationDescriptionDisplay ?
        <Text 
          style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}
          accessibilityRole="text"
          accessibilityLabel='Wo'
          aria-label='Wo'
        >
          Wo?:{'\n'}
          <Text 
            style={stylesGlobal.standardText}
            accessibilityRole="text"
            accessibilityLabel={locationDescriptionDisplay}
            aria-label={locationDescriptionDisplay}
          >
            {locationDescriptionDisplay}
            </Text>
        </Text>
        : null}

        <Text 
          style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}
          accessibilityRole="text"
          accessibilityLabel='Anzahl der Teilnehmer'
          aria-label='Anzahl der Teilnehmer'
        >
          Anzahl der Teilnehmer:{'\n'}
          <Text 
            style={stylesGlobal.standardText}
            accessibilityRole="text"
            accessibilityLabel={participantList.length + 'von' + maxParticipantDisplay}
            aria-label={participantList.length + 'von' + maxParticipantDisplay}
          >
            {participantList.length} von {maxParticipantDisplay}
          </Text>
        </Text>

        {startTimeDisplay}
        {endTimeDisplay}
        {tagDisplay}

        <Text 
          style={[stylesGlobal.ueberschriftText2, stylesGlobal.textCenterStyle]}
          accessibilityRole="text"
          accessibilityLabel='Erstellt von'
          aria-label='Erstellt von'
        >
          Erstellt von:{'\n'}
          <Text 
            style={stylesGlobal.standardText}
            accessibilityRole="text"
            accessibilityLabel={authorUsernameDisplay}
            aria-label={authorUsernameDisplay}
          >
            {authorUsernameDisplay}
            </Text>
        </Text>

      </ScrollView>
      
      <View style={{alignSelf: 'center'}}>
        <ButtonVariable
          text={'Teilnehmen'}
          onPress={() => onParticipateButton() }
          backgroundColor={Colors.findmyactivityYellow}
          borderColor={Colors.findmyactivityYellow}
          width={200}
          accessibilityHint={'Drücken, um am Event teilzunehmen'}
        />
      </View>

      <ButtonBack
        onPress={() => navigation.goBack()}
        text={'Zurück'}
        accessibilityHint={'Zur Karte zurückgehen'}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground
  },

  scrollViewStyle: {
    width: '100%',
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems
  },
  
  spacingBetweenText: {
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems
  },

  textCenterStyle: {
    textAlign: 'left'
  },

  scrollViewContainer: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.findmyactivityWhite,
    padding: 10
  },
})

export default ViewMarkerScreen