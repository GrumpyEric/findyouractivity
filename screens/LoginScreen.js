import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { auth } from '../firebase/firebase-config'

import TextInputField from '../components/TextInputField'
import { stylesGlobal } from '../constants/StylesGlobal'
import ButtonRegular from '../components/ButtonRegular'
import ButtonRegularWithBorder from '../components/ButtonRegularWithBorder'
import TextButton from '../components/TextButton'
import { handleSignUp, handleLogin } from '../constants/MainFunctions'

auth.languageCode = auth.useDeviceLanguage();

const LoginScreen = () => {
  // useState hooks for text input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Navigation to switch between screens
  const navigation = useNavigation()

  // Handler for password-reset; changes screen
  const handleForgotPassword = () => {
    navigation.replace("ForgotPW")
  }

  return (
    <View style={stylesGlobal.screenContainer}>
      <View style={styles.inputContainer}>
        <TextInputField
          placeholder={"E-Mail"}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInputField
          placeholder={"Password"}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ButtonRegular
          onPress={() => handleLogin(auth, email, password, navigation)}
          text={"Login"}
        />
        <ButtonRegularWithBorder
          onPress={() => handleSignUp(auth, email, password)}
          text={"Register"}
        />
        <TextButton
          onPress={handleForgotPassword}
          text={"Forgot password?"}
        />
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%'
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

})