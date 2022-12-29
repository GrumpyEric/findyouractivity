import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'

const CreateMarkersScreen = ( {navigation} ) => {
  return (
    <View style={stylesGlobal.screenContainer}>
      <Text>Create Marker</Text>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateMarkersScreen

const styles = StyleSheet.create({

})