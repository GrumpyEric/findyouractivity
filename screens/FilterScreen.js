
import React, { useEffect, useState } from 'react'
import { Alert,View, Text, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { filterContext,tagData, rangeContext } from '../components/AppContext';
import Slider from '@react-native-community/slider';

import { applyFilters } from '../constants/MainFunctions';

import ButtonRegularWithBorder from '../components/ButtonRegular';

import Colors from '../constants/Colors'

import DropDownPicker from 'react-native-dropdown-picker';


const FilterScreen = ( {navigation} ) => {

  const [selected, setSelected] = useState(filterContext._current_value);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(tagData);  
  const [value, setValue] = useState(filterContext._current_value);

  const [radiusMarkers, setRadiusMarkers] = useState(5)
  const [radiusMarkersVisual, setRadiusMarkersVisual] = useState(5)
  
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


  const changeRange = (inputVal) =>
  {
    setRange(inputVal)
    rangeContext._current_value = inputVal
  }

  const saveFilters = () => {
    //alert("TODO: Filter-Auswahl speichern")
    //filtersRef = selected
    filterContext._current_value = value
    //alert(filterContext._currentValue)
    //setSelected([]);
    applyFilters()
    const alerta_title = "Filter wurden angewendet"
    const alerta_msg = filterContext._current_value.toString()
    Alert.alert(alerta_title,alerta_msg);
    rangeContext._currentValue = radiusMarkers
    //navigation.pop()
  }


  const clearFilters = () => {
    setValue([])
    filterContext._current_value = undefined   
    applyFilters()
    const alerta_title = "Filter wurden zurückgesetzt"
    Alert.alert(alerta_title);
    //navigation.pop()
  }
 
return(
  <View>
    {/*
    // Slider für Such-Radius
    <View style={{width: '100%'}}>
      <Text>Radius der anzuzeigenden Marker</Text>
      <Text>{radiusMarkersVisual === 'alle' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}</Text>
      <Slider
        minimumValue={0}
        maximumValue={21}
        onSlidingComplete={(e) => { e < 21 ? setRadiusMarkers(value) : setRadiusMarkers('alle') } }
        step={1}
        value={radiusMarkers}
        onValueChange={(e) => e < 21 ? setRadiusMarkersVisual(value) : setRadiusMarkersVisual('alle')}
      />
    </View>
*/}
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

    <View style={hampter.button}>
    <ButtonRegularWithBorder
      text={'APPLY FILTERS'}
      onPress={() => saveFilters()}
      backgroundColor={Colors.findmyactivityYellow}
    />
    <ButtonRegularWithBorder
      text={'CLEAR FILTERS'}
      onPress={() => clearFilters()}
      backgroundColor={'red'}
    />
    <ButtonRegularWithBorder
      text={'CLOSE'}
      onPress={() => navigation.pop()}
      backgroundColor={'hotpink'}
    /> 
    </View>
  </View>
)

}

export default FilterScreen

const hampter = StyleSheet.create({
  button: {

    alignItems: 'center',
    marginTop: 40,
  },

})