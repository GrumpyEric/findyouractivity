import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { auth } from '../firebase/firebase-config'

import { stylesGlobal } from '../constants/StylesGlobal'
import TextInputField from '../components/TextInputField'
import ButtonSmall from '../components/ButtonSmall'
import TextButton from '../components/TextButton'

import { handleForgotPassword } from '../constants/MainFunctions'
import Colors from '../constants/Colors'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.replace("Login")
    // navigation.goBack()
  }

  return (
    <View style={stylesGlobal.screenContainer}>
      <TextInputField 
        placeholder={"Email"}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType={'default'}
        backgroundColor={'white'}
      />

      <View style={styles.buttonContainer}>
        <ButtonSmall
          onPress={() => handleForgotPassword(auth, email)}
          text={"Reset password"}
          backgroundColor={Colors.findmyactivityBlue}
        />
        <TextButton
          onPress={() => handleGoBack()}
          text={"Go back to login"}
          textColor={Colors.findmyactivityBlue}
        />
      </View>
    </View>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})