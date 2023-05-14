import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView, BackHandler } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'
import TextInputField from '../../components/TextInputField'
import { auth } from '../../firebase/firebase-config'
import { addMarkerToDB, updateMarkerToDB } from '../../constants/MainFunctions'
import { editMarkerMode, editMarkerValues, latitudeContext, longitudeContext, tagData } from '../../components/AppContext'
import Colors from '../../constants/Colors'
import ButtonVariable from '../../components/ButtonVariable'
import TextButton from '../../components/TextButton'
import ButtonBack from '../../components/ButtonBack'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DropDownPicker from 'react-native-dropdown-picker';

import 'intl'
import 'intl/locale-data/jsonp/de'
import { intlFormat } from 'date-fns'

const CreateMarkersScreen = ( {navigation} ) => {  
  const [eventName, setEventName] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.name : '')
  const [eventDescription, setEventDescription] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.description : '')
  const [placeDesciption, setPlaceDescription] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.locationDescription : '')
  const [numberParticipants, setNumberParticipants] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.numberParticipants : '')
  const [tags, setEventTags] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.tags : []);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(tagData);  

  const pickedStartTime = useRef(editMarkerMode._currentValue === true ? editMarkerValues._currentValue.startDate : undefined)
  const pickedEndTime = useRef(editMarkerMode._currentValue === true ? editMarkerValues._currentValue.endDate : undefined)
  const kindOfTimePicker = useRef()
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [eventNameError, setEventNameError] = useState(editMarkerMode._currentValue === true ? false : undefined)
  const [participantsError, setParticipantsError] = useState(editMarkerMode._currentValue === true ? false : undefined)

  function printErrors() {
    console.log("name error: ", eventNameError);
    console.log("participants error: ", participantsError);
    console.log('start error: ', pickedStartTime.current);
    console.log('end error: ', pickedEndTime.current);
  }

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  function errorHandlerName() {
    if (eventName.length < 1) {
      setEventNameError(true)
  
    } else {
      setEventNameError(false)
    }

  }

  function errorHandlerParticipants() {
    if (numberParticipants.length < 1) {
      setParticipantsError(true)
    
    } else {
      setParticipantsError(false)
    }

  }

  function errorMessageHandler() {
    let errors = {
      eventName: {name: 'Eventname', status: eventNameError}, 
      participants: {name: 'Teilnehmeranzahl', status: participantsError}, 
      startTime: {name: 'Startzeit', status: pickedStartTime.current}, 
      endTime: {name: 'Endzeit', status: pickedEndTime.current}
    }

    let errorPropertyNames = Object.getOwnPropertyNames(errors)
    // let insideErrorPropertyNames = Object.getOwnPropertyNames(errors[errorPropertyNames[0]])
    let errorCount = 0
    let loopCount = 0
    let errorMsg = ''
    let singleError = false
    // console.log(errors[errorPropertyNames[index]][insideErrorPropertyNames[1]])

    for (let index = 0; index < errorPropertyNames.length; index++) {
      // console.log(errors[errorPropertyNames[index]].status);
      if (errors[errorPropertyNames[index]].status === undefined || errors[errorPropertyNames[index]].status === true) {
        // errorMsg.concat(errors[errorPropertyNames[index]].name)
        errorCount = errorCount + 1
      }
    }

    for (let index = 0; index < errorPropertyNames.length; index++) {
      if (errors[errorPropertyNames[index]].status === undefined || errors[errorPropertyNames[index]].status === true) {
        errorMsg = errorMsg.concat(errors[errorPropertyNames[index]].name)
        errorCount = errorCount - 1
        loopCount = loopCount + 1
        if (errorCount >= 2) {
          errorMsg = errorMsg.concat(', ')
        }
        if (errorCount === 1) {
          errorMsg = errorMsg.concat(' und ')
        }

        if (errorCount < 1 && loopCount === 1) {
          errorMsg = errorMsg.concat(' fehlt. Bitte fügen Sie das genannte Attribut in das gleichnamige Feld ein! ')
          singleError = true
        }
        
      }
    }
    if (!singleError) {
      errorMsg = errorMsg.concat(' fehlen. Bitte fügen Sie die genannten Attribute in die gleichnamigen Felder ein!')
    }
    
    return errorMsg
  }

  function createMarker() {
    addMarkerToDB(auth, eventName, eventDescription, placeDesciption, pickedStartTime.current, pickedEndTime.current, numberParticipants, tags, latitudeContext._currentValue, longitudeContext._currentValue); 
    navigation.pop()
  }

  function updateMarker() {
    updateMarkerToDB(auth, eventName, eventDescription, placeDesciption, pickedStartTime.current, pickedEndTime.current, numberParticipants, tags, editMarkerValues._currentValue.latitude, editMarkerValues._currentValue.longitude, editMarkerValues._currentValue.creationDate); 
    navigation.pop()
    editMarkerMode._currentValue = false
  }

  // handles time picker
  // if start time before time right now: error
  // if end time before start time: error
  // else: set start or end time
  const handleConfirmTime = (time) => {
    if (kindOfTimePicker.current === 'start') {
      if (pickedEndTime.current != undefined) {
        if (time > pickedEndTime.current) {
          hideTimePicker()
          Alert.alert('Warnung', 'Startdatum kann nicht nach dem Enddatum liegen! Bitte wählen Sie ein anderes Datum.')
          return
        }
        console.log(time, pickedEndTime.current, time < pickedEndTime.current);
      }
      console.log(time);
      pickedStartTime.current = time
      console.log(pickedStartTime.current);
    } 

    else if (kindOfTimePicker.current === 'end') {
      if (pickedStartTime.current != undefined) {
        if (time < pickedStartTime.current) {
          hideTimePicker()
          Alert.alert('Warnung', 'Enddatum kann nicht vor dem Startdatum liegen! Bitte wählen Sie ein anderes Datum.')
          return
        }
        console.log(pickedStartTime.current, time, pickedStartTime.current < time);
      }
      pickedEndTime.current = time
      console.log(pickedEndTime.current);
    }

    hideTimePicker();
  };

  DropDownPicker.setLanguage("DE");

  BackHandler.addEventListener('hardwareBackPress', function () {
    if (editMarkerMode._currentValue === true) {
      navigation.goBack()
      editMarkerMode._currentValue = false
    
    } else {
      navigation.goBack()
    }
  });

  DropDownPicker.setMode("BADGE");
  DropDownPicker.addTranslation("DE", {
    PLACEHOLDER: "Wähle die gewünschten Tags aus",
    SEARCH_PLACEHOLDER: "Suche...",
    SELECTED_ITEMS_COUNT_TEXT: {
      1: '1 Tags wurde ausgewählt',
      // Feel free to add more
      n: '{count} Tags wurden ausgewählt'
    },
    NOTHING_TO_SHOW: "Keine Tags zur Auswahl"
  });
  DropDownPicker.setLanguage("DE");
  
  return (
    <View style={[stylesGlobal.screenContainer, {backgroundColor: Colors.findmyactivityBackground}]}>
      <ButtonBack
        onPress={() => { navigation.goBack(); editMarkerMode._currentValue === true ? editMarkerMode._currentValue = false : null }}
        text={'Zurück'}
      />
      <Text style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems}]}>{editMarkerMode._currentValue ? 'Marker bearbeiten' : 'Marker erstellen'}</Text>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContainer} persistentScrollbar>
      <Text style={[stylesGlobal.standardText, {alignSelf: 'flex-start', marginBottom: 5}]}>Felder mit einem * sind Pfilchtfelder!</Text>
      
      <View style={styles.itemSpacerStyle}>
        <Text style={stylesGlobal.ueberschriftText2}>Eventname*</Text>
        <TextInputField
          placeholder={'Eventname'}
          value={eventName}
          onChangeText={(text) => { setEventName(text); text.length < 1 ? setEventNameError(true) : setEventNameError(false) }}
          keyboardType={'default'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={eventNameError ? Colors.findmyactivityError : Colors.findmyactivityText}
          hasLeftIcon={true}
          iconName={'edit'}
          hasMaxLength={true}
          maxTextChars={30}
          showCharCounter={true}
          onBlur={() => errorHandlerName() }
        />

        {eventNameError ?
          <Text>Textfeld 'Eventname' darf nicht leer sein! Bitte Eventnamen eingeben</Text>
        : null}
      </View>

      <View style={styles.itemSpacerStyle}>
      <Text style={stylesGlobal.ueberschriftText2}>Eventbeschreibung</Text>
        <TextInputField
          placeholder={'Eventbeschreibung (optional)'}
          value={eventDescription}
          onChangeText={text => setEventDescription(text)}
          keyboardType={'default'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={Colors.findmyactivityText}
          hasLeftIcon={true}
          iconName={'edit'}
          hasMaxLength={true}
          maxTextChars={10000}
          showCharCounter={true}
          multiline={true}
        />
      </View>

      <View style={styles.itemSpacerStyle}>
      <Text style={stylesGlobal.ueberschriftText2}>Ortbeschreibung</Text>
        <TextInputField
          placeholder={'Ortbeschreibung (optional)'}
          value={placeDesciption}
          onChangeText={text => setPlaceDescription(text)}
          keyboardType={'default'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={Colors.findmyactivityText}
          hasLeftIcon={true}
          iconName={'map-pin'}
          hasMaxLength={true}
          maxTextChars={50}
          showCharCounter={true}
        />
      </View>

      <View style={styles.itemSpacerStyle}>
      <Text style={stylesGlobal.ueberschriftText2}>Teilnehmeranzahl*</Text>
        <TextInputField
          placeholder={'Anzahl Teilnehmer (max. 999)'}
          value={numberParticipants}
          onChangeText={(text) => { setNumberParticipants(text); text.length < 1 ? setParticipantsError(true) : setParticipantsError(false) }}
          keyboardType={'number-pad'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={participantsError ? Colors.findmyactivityError : Colors.findmyactivityText}
          hasLeftIcon={true}
          iconName={'male'}
          hasMaxLength={true}
          maxTextChars={3}
          onBlur={() => errorHandlerParticipants()}
        />

        {participantsError ?
        <Text>Textfeld 'Anzahl Teilnehmer' darf nicht leer sein! Bitte Teilnehmeranzahl angeben</Text>
        : null}
      </View>

      <View style={styles.itemSpacerStyle}>
        {/* Tags */}
        <Text style={stylesGlobal.ueberschriftText2}>Tags</Text>
        <DropDownPicker
          style={{borderWidth: 2}}
          searchable={true}
          multiple={true}
          min={0}
          open={open}
          value={tags}
          items={items}
          setOpen={setOpen}
          setValue={(val) =>setEventTags(val)}
          setItems={setItems}
          listMode='MODAL'
        />
      </View>

      {editMarkerMode._currentValue ?
      <View style={{paddingBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems}}>
        <TextButton
          text='Hier drücken, um die Lage des Events zu ändern'
          onPress={() => navigation.navigate('EditMarkerLocationScreen')}
        />
      </View>
      : null}

        <View style={{marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, alignItems: 'center'}}>
        {pickedStartTime.current !== undefined
        ?
          <Text style={{alignSelf: 'center'}}>
            Start: {intlFormat(pickedStartTime.current, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            }, 
              {locale: 'de-DE',}
            )} Uhr
          </Text>
          :
          null
          }
          <TextButton
            text={pickedStartTime.current ? 'Startzeit ändern*' : 'Startzeit auswählen*'}
            onPress={() => {kindOfTimePicker.current = 'start'; showTimePicker()}}
          />
        </View>

        <View style={{marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, alignItems: 'center'}}>
        {pickedEndTime.current !== undefined
        ?
          <Text style={{alignSelf: 'center'}}>
            Ende: {intlFormat(pickedEndTime.current, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            }, 
              {locale: 'de-DE',}
            )} Uhr
          </Text>
          :
          null
          }
          <TextButton
            text={pickedEndTime.current ? 'Endzeit ändern*' : 'Endzeit auswählen*'}
            onPress={() => {kindOfTimePicker.current = 'end'; showTimePicker()}}
          />
        </View>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />
        </ScrollView>

        {editMarkerMode._currentValue 
        ?
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>

          <ButtonVariable
            text={'Aktualisieren'}         
            onPress={() => {
              errorHandlerName()
              errorHandlerParticipants()
              eventNameError === true || participantsError === true || eventNameError === undefined || participantsError === undefined || pickedStartTime.current === undefined || pickedEndTime.current === undefined
                ? Alert.alert('Achtung!', errorMessageHandler())
                : updateMarker()
            }}
            backgroundColor={Colors.findmyactivityYellow}
            borderColor={Colors.findmyactivityYellow}
            width={200}
          />
        </View>
        
        :
        <ButtonVariable
          text={'Erstellen'}         
          onPress={() => {
            errorHandlerName()
            errorHandlerParticipants()
            eventNameError === true || participantsError === true || eventNameError === undefined || participantsError === undefined || pickedStartTime.current === undefined || pickedEndTime.current === undefined
              ? Alert.alert('Achtung!', errorMessageHandler())
              : createMarker()
          }}
          backgroundColor={Colors.findmyactivityYellow}
          borderColor={Colors.findmyactivityYellow}
          width={200}
        />
        }
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: stylesGlobal.screenContainer.flex,
    backgroundColor: stylesGlobal.screenContainer.backgroundColor,
  },

  scrollViewStyle: {
    width: '100%',
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems,
  },

  scrollViewContainer: {
    alignItems: 'center',
    marginRight: 10
  },

  itemSpacerStyle: {
    width: '100%', 
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems
  }
})

export default CreateMarkersScreen