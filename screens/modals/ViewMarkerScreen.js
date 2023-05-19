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
      <Text style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems}]}>Event</Text>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContainer}>
        <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}>Eventname:{'\n'}
          <Text style={stylesGlobal.standardText}>{nameDisplay}</Text>
        </Text>

        {descriptionDisplay ?
        <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}>Beschreibung:{'\n'}
          <Text style={stylesGlobal.standardText}>{descriptionDisplay}</Text>
        </Text>  
        : null}

        {locationDescriptionDisplay ?
        <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}>Wo?:{'\n'}
          <Text style={stylesGlobal.standardText}>{locationDescriptionDisplay}</Text>
        </Text>
        : null}

        <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.spacingBetweenText, stylesGlobal.textCenterStyle ]}>Anzahl der Teilnehmer:{'\n'}
          <Text style={stylesGlobal.standardText}>{participantList.length} / {maxParticipantDisplay}</Text>
        </Text>

        {startTimeDisplay}
        {endTimeDisplay}
        {tagDisplay}

        <Text style={[stylesGlobal.ueberschriftText2, stylesGlobal.textCenterStyle]}>Erstellt von:{'\n'}
          <Text style={stylesGlobal.standardText}>{authorUsernameDisplay}</Text>
        </Text>

      </ScrollView>
      <ButtonVariable
        text={'Teilnehmen'}
        onPress={() => onParticipateButton() }
        backgroundColor={Colors.findmyactivityYellow}
        borderColor={Colors.findmyactivityYellow}
        width={200}
      />

      <ButtonBack
        onPress={() => navigation.goBack()}
        text={'Zurück'}
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