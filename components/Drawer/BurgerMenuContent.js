import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet, PixelRatio, BackHandler, Alert } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { stylesGlobal } from '../../constants/StylesGlobal'
import { handleSignOut } from '../../constants/MainFunctions'
import { auth } from '../../firebase/firebase-config'
import { useNavigation } from '@react-navigation/native'

// All the content and styling of left drawer
function BurgerMenuContent ( props )  {
  const navigation = useNavigation()
  return ( 
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="lol"
      />
      <DrawerItem
        label="Meine Marker"
      />
      <DrawerItem
        label="Logout"
        onPress={() => handleSignOut(auth, navigation)} 
      />
    </DrawerContentScrollView>

       
  )
}

export default BurgerMenuContent

const styles = StyleSheet.create({

});