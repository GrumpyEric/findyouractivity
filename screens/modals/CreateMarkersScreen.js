import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'
import TextInputField from '../../components/TextInputField'
import { auth } from '../../firebase/firebase-config'
import { addMarkerToDB, updateMarkerToDB } from '../../constants/MainFunctions'
import { editMarkerMode, editMarkerValues, latitudeContext, longitudeContext, tagData } from '../../components/AppContext'
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

const CreateMarkersScreen = ( {navigation} ) => {  
  const [eventName, setEventName] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.name : undefined)
  const [eventDescription, setEventDescription] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.description : undefined)
  const [placeDesciption, setPlaceDescription] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.locationDescription : undefined)
  const [numberParticipants, setNumberParticipants] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.numberParticipants : undefined)
  const [tags, setEventTags] = useState(editMarkerMode._currentValue ? editMarkerValues._currentValue.tags : []);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(tagData);  

  const pickedStartTime = useRef(editMarkerMode._currentValue ? editMarkerValues._currentValue.startDate : undefined)
  const pickedEndTime = useRef(editMarkerMode._currentValue ? editMarkerValues._currentValue.endDate : undefined)
  const kindOfTimePicker = useRef()
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  useEffect(() => {
    console.log(editMarkerValues._currentValue);
  }, [])

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

  useEffect(() => {
    console.log(pickedStartTime);
  }, [pickedStartTime])

  useEffect(() => {
    console.log(pickedEndTime);
  }, [pickedEndTime])

  useEffect(() => {
    console.log(kindOfTimePicker.current);
  }, [kindOfTimePicker.current])

  DropDownPicker.setLanguage("DE");
  
  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <Text>{editMarkerMode._currentValue ? 'Marker bearbeiten' : 'Marker erstellen'}</Text>
        <TextInputField
          placeholder={'Eventname'}
          value={eventName}
          onChangeText={text => setEventName(text)}
          keyboardType={'default'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={Colors.findmyactivityBackground}
          hasLeftIcon={true}
          iconName={'edit'}
          hasMaxLength={true}
          maxTextChars={30}
          showCharCounter={true}
        />
        <TextInputField
          placeholder={'Eventbeschreibung'}
          value={eventDescription}
          onChangeText={text => setEventDescription(text)}
          keyboardType={'default'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={Colors.findmyactivityBackground}
          hasLeftIcon={true}
          iconName={'edit'}
          hasMaxLength={true}
          maxTextChars={10000}
          showCharCounter={true}
          multiline={true}
        />
        <TextInputField
          placeholder={'Ortbeschreibung'}
          value={placeDesciption}
          onChangeText={text => setPlaceDescription(text)}
          keyboardType={'default'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={Colors.findmyactivityBackground}
          hasLeftIcon={true}
          iconName={'map-pin'}
          hasMaxLength={true}
          maxTextChars={50}
          showCharCounter={true}
        />
        <TextInputField
          placeholder={'Anzahl Teilnehmer (max. 999)'}
          value={numberParticipants}
          onChangeText={text => setNumberParticipants(text)}
          keyboardType={'number-pad'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={Colors.findmyactivityBackground}
          hasLeftIcon={true}
          iconName={'male'}
          hasMaxLength={true}
          maxTextChars={3}
        />
        {/* Tags */}

        <DropDownPicker
        searchable={true}
        multiple={true}
        min={0}
        open={open}
        value={tags}
        items={items}
        setOpen={setOpen}
        setValue={(val) =>setEventTags(val)}
        setItems={setItems}
      />

      {editMarkerMode._currentValue ?
      <TextAndIconButton
        text='Hier drücken, um die Lage des Events zu ändern'
        // TODO: new Modal for set new marker location in edit mode
        onPress={() => navigation.navigate('EditMarkerLocationScreen')}
      />
      : null}

        <View style={{flexDirection: 'row'}}>
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
            )}
          </Text>
          :
          null
          }
          <TextButton
            text={'Set start time'}
            onPress={() => {kindOfTimePicker.current = 'start'; showTimePicker()}}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
        {pickedEndTime.current !== undefined
        ?
        // <Text>{format(pickedStartTime.current, 'dd.MM.YYY')}</Text>
          <Text style={{alignSelf: 'center'}}>
            End: {intlFormat(pickedEndTime.current, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            }, 
              {locale: 'de-DE',}
            )}
          </Text>
          :
          null
          }
          <TextButton
            text={'Set end time'}
            textColor={Colors.findmyactivityBlue}
            onPress={() => {kindOfTimePicker.current = 'end'; showTimePicker()}}
          />
        </View>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />

        {editMarkerMode._currentValue 
        ?
        <View style={{flexDirection: 'row'}}>
          <ButtonSmall
            text={'Abbrechen'}
            onPress={() => navigation.pop()}
            backgroundColor={'red'}
          />

          <ButtonSmall
            text={'Aktualisieren'}         
            onPress={() => { updateMarkerToDB(auth, eventName, eventDescription, placeDesciption, pickedStartTime.current, pickedEndTime.current, numberParticipants, tags, editMarkerValues._currentValue.latitude, editMarkerValues._currentValue.longitude, editMarkerValues._currentValue.creationDate); navigation.pop() }}
            backgroundColor={Colors.findmyactivityBlue}
          />
        </View>
        : 
        <View style={{flexDirection: 'row'}}>
          <ButtonSmall
            text={'Abbrechen'}
            onPress={() => navigation.pop()}
            backgroundColor={'red'}
          />

          <ButtonSmall
            text={'Erstellen'}         
            onPress={() => { addMarkerToDB(auth, eventName, eventDescription, placeDesciption, pickedStartTime.current, pickedEndTime.current, numberParticipants, tags, latitudeContext._currentValue, longitudeContext._currentValue); navigation.pop() }}
            backgroundColor={Colors.findmyactivityBlue}
          />
        </View>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: stylesGlobal.screenContainer.flex,
    paddingHorizontal: stylesGlobal.screenContainer.paddingHorizontal,
    backgroundColor: stylesGlobal.screenContainer.backgroundColor,
  },

  scrollViewContainer: {
    alignContent: 'stretch',
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100%'
  }
})

export default CreateMarkersScreen