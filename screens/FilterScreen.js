
import React, { useEffect, useState } from 'react'
import { Alert,View, Text, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { filterContext,tagData, rangeContext } from '../components/AppContext';
import Slider from '@react-native-community/slider';

import { applyFilters, db_markers } from '../constants/MainFunctions';

import Colors from '../constants/Colors'
import { stylesGlobal } from '../constants/StylesGlobal';

import DropDownPicker from 'react-native-dropdown-picker';
import { arrayIsEmpty } from '../constants/HelperFunctionsAndVariables';
import ButtonSmall from '../components/ButtonSmall';
import EventHeader from '../components/EventHeader';


const FilterScreen = ( {navigation} ) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(tagData);  
  const [value, setValue] = useState(filterContext._current_value);

  const [radiusMarkers, setRadiusMarkers] = useState(rangeContext._currentValue)
  const [radiusMarkersVisual, setRadiusMarkersVisual] = useState(rangeContext._currentValue)
  
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
    setRadiusMarkersVisual(21)
    console.log('context:', rangeContext._currentValue);
    console.log('radius markers:', radiusMarkers);
  }

  const saveFilters = () => {
    //alert("TODO: Filter-Auswahl speichern")
    //filtersRef = selected
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
      //navigation.pop()
      
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
    //navigation.pop()
  }

  useEffect(() => {
    console.log('radius:', radiusMarkers);
    console.log('radius context:', rangeContext._currentValue)
  }, [radiusMarkers])
  
 
return(
  <View style={styles.screenContainer}>
    <EventHeader
      text={'Filter'}
    />
    <View style={{width: '100%', marginBottom: 40}}>
      <Text style={stylesGlobal.ueberschriftText2}>Radius</Text>
      <Text>{radiusMarkersVisual === 'alle' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}</Text>
      <Slider
        minimumValue={0}
        maximumValue={21}
        onSlidingComplete={(value) => { value < 21 ? setRadiusMarkers(value) : setRadiusMarkers('alle') } }
        step={1}
        value={radiusMarkers}
        onValueChange={(value) => value < 21 ? setRadiusMarkersVisual(value) : setRadiusMarkersVisual('alle')}
        minimumTrackTintColor={Colors.findmyactivityYellow}
        thumbTintColor={Colors.findmyactivityGreen}
      />
    </View>

    <Text style={stylesGlobal.ueberschriftText2}>Tags</Text>
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
    />

    <View style={styles.button}>
      <View style={{flexDirection:'row'}}>
        <View>
          <ButtonSmall
            text={'Anwenden'}
            onPress={() => saveFilters()}
            backgroundColor={Colors.findmyactivityBlue}
            color={Colors.findmyactivityWhite}
          />
        </View>
        <View>
          <ButtonSmall
            text={'Zurücksetzen'}
            onPress={() => clearFilters()}
            backgroundColor={Colors.findmyactivityYellow}
          />
        </View>
      </View>
    </View>
  </View>
)

}

export default FilterScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: stylesGlobal.screenContainer.flex,
    // paddingHorizontal: stylesGlobal.screenContainer.paddingHorizontal,
    // paddingVertical: stylesGlobal.screenContainer.paddingVertical,
    backgroundColor: stylesGlobal.screenContainer.backgroundColor,
    alignItems: 'center'
  },

  button: {
    alignItems: 'center',
    marginTop: 40,
  },
})