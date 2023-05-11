
import React, { useEffect, useState } from 'react'
import { Alert,View, Text, StyleSheet } from 'react-native';
import { filterContext,tagData, rangeContext } from '../components/AppContext';
import Slider from '@react-native-community/slider';

import { applyFilters, db_markers } from '../constants/MainFunctions';

import Colors from '../constants/Colors'
import { height, paddingBetweenItems, stylesGlobal } from '../constants/StylesGlobal';

import DropDownPicker from 'react-native-dropdown-picker';
import { arrayIsEmpty } from '../constants/HelperFunctionsAndVariables';
import ButtonVariable from '../components/ButtonVariable';
import ButtonBack from '../components/ButtonBack';

const FilterScreen = ( {navigation} ) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(tagData);  
  const [value, setValue] = useState(filterContext._current_value);

  const [radiusMarkers, setRadiusMarkers] = useState(rangeContext._currentValue)
  const [radiusMarkersVisual, setRadiusMarkersVisual] = useState(rangeContext._currentValue === 21 ? 'alle Marker anzeigen' : rangeContext._currentValue)
  
  // ausgewählte Filter als Badges anzeigen
  DropDownPicker.setMode("BADGE");

  // deutsche Übersetzung für die Dropdown_Liste
  DropDownPicker.addTranslation("DE", {
    PLACEHOLDER: "Wähle die gewünschten Tags aus",
    SEARCH_PLACEHOLDER: "Suche...",
    SELECTED_ITEMS_COUNT_TEXT: {
      1: '1 Tags wurde ausgewählt',
      // Feel free to add more
      n: '{count} Tags wurden ausgewählt'
    },
    NOTHING_TO_SHOW: "NOTHING TO SHOW"
  });
  
  // deutsche Sprache einsetzen
  DropDownPicker.setLanguage("DE");

  function changeRange() {
    if (radiusMarkers === 'alle') {
      rangeContext._currentValue = 21
    } else {
      rangeContext._currentValue = radiusMarkers
    }
    
    console.log('context:', rangeContext._currentValue);
    console.log('radius markers:', radiusMarkers);
  }

  function resetRange() {
    rangeContext._currentValue = 21
    setRadiusMarkers(21)
    setRadiusMarkersVisual('alle Marker anzeigen')
    console.log('context:', rangeContext._currentValue);
    console.log('radius markers:', radiusMarkers);
  }

  const saveFilters = () => {
    filterContext._current_value = value
    changeRange();
    if (arrayIsEmpty(filterContext._current_value) || filterContext._current_value === undefined) {
      const alerta_title = 'Filter wurden angewendet' 
      const alerta_msg = radiusMarkers === 21 ? 'Radius der angezeigten Marker wurde zu ALLEN Markern geändert' : 'Radius der angezeigten Marker wurde zu ' + rangeContext._currentValue + ' km' + ' geändert!'
      Alert.alert(alerta_title, alerta_msg)

    } else {
      applyFilters(db_markers)
      const alerta_title = "Filter wurden angewendet"
      const alerta_msg = 'Filter wurde zu ' + filterContext._current_value.toString() + (radiusMarkers === 21 ? ' und Radius der angezeigten Marker wurde zu ALLEN Markern geändert!' : ' und Radius der angezeigten Marker wurde auf ' + rangeContext._currentValue + ' km' +  ' geändert!')
      Alert.alert(alerta_title, alerta_msg);
      rangeContext._currentValue = radiusMarkers
      
    }
  }

  const clearFilters = () => {
    resetRange()
    setValue([])
    filterContext._current_value = undefined   
    applyFilters(db_markers)
    const alerta_title = "Erfolg"
    const alerta_text = "Filter wurden zurückgesetzt"
    Alert.alert(alerta_title,alerta_text) ;
  }
  
return(
  <View style={[stylesGlobal.screenContainer, styles.screenContainer]}>
    <Text style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems}]}>Filter</Text>
    <ButtonBack
      onPress={() => navigation.goBack()}
      text={'Zurück'}
    />
    <View style={{width: '100%', marginBottom: paddingBetweenItems}}>
      <Text style={stylesGlobal.ueberschriftText2}>Radius</Text>
      <Text>{radiusMarkersVisual === 'alle Marker anzeigen' || radiusMarkersVisual === 21 ? radiusMarkersVisual : radiusMarkersVisual + ' km'}</Text>
      <Slider
        minimumValue={0}
        maximumValue={21}
        onSlidingComplete={(value) => { value < 21 ? setRadiusMarkers(value) : setRadiusMarkers('alle') } }
        step={1}
        value={radiusMarkers}
        onValueChange={(value) => value < 21 ? setRadiusMarkersVisual(value) : setRadiusMarkersVisual('alle Marker anzeigen')}
        minimumTrackTintColor={Colors.findmyactivityYellow}
        thumbTintColor={Colors.findmyactivityGreen}
      />
    </View>

    <Text style={[stylesGlobal.ueberschriftText2, {alignSelf: 'flex-start', marginBottom: 2}]}>Tags</Text>
    <DropDownPicker
      searchable={true}
      multiple={true}
      min={0}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode='MODAL'
    />

    <View style={styles.button}>
      <View style={{flexDirection:'row', justifyContent: 'space-evenly', width: '100%'}}>
        <ButtonVariable
          text={'Anwenden'}
          onPress={() => saveFilters()}
          backgroundColor={Colors.findmyactivityYellow}
          borderColor={Colors.findmyactivityYellow}
          width={150}
        />
        <ButtonVariable
          text={'Zurücksetzen'}
          onPress={() => clearFilters()}
          backgroundColor={'red'}
          borderColor={'red'}
          width={150}
        />
      </View>
    </View>
  </View>
)

}

export default FilterScreen

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.findmyactivityBackground,
  },

  button: {
    marginTop: stylesGlobal.marginsAndPadding.paddingBetweenItems,
    position: 'absolute',
    bottom: height * 0.15,
    zIndex: -1
  },
})