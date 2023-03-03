import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { auth } from '../firebase/firebase-config'

import TextInputField from '../components/TextInputField'
import { stylesGlobal } from '../constants/StylesGlobal'
import ButtonRegular from '../components/ButtonRegular'
import ButtonRegularWithBorder from '../components/ButtonRegularWithBorder'
import TextButton from '../components/TextButton'
import { handleSignUp, handleLogin } from '../constants/MainFunctions'
import Colors from '../constants/Colors'

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

      <Text 
        style={[stylesGlobal.ueberschriftText, {marginBottom: 20}]}
        accessibilityLabel={'Anmeldung'}
        accessibilityHint={"Das ist der Anmeldebildschirm. Hier bitte anmelden, um fortzufahren."}
        accessibilityRole={'header'}
      >
        Anmeldung
      </Text>

      <View style={styles.inputContainer}>
        <TextInputField
          placeholder={"E-Mail"}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType={'email-address'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={Colors.findmyactivityBackground}

          accessibilityLabel={'Hier Text eingeben'}
          accessibilityHint={"Es wird eine E-Mail-Adresse gefordert; die Tastatur hat sich geöffnet, bitte E-Mail-Adresse eingeben"}
        />
        <TextInputField
          placeholder={"Password"}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          keyboardType={'default'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={Colors.findmyactivityBackground}

          accessibilityLabel={'Hier Text eingeben'}
          accessibilityHint={"Es wird ein Passwort gefordert; die Tastatur hat sich geöffnet, bitte E-Mail-Adresse eingeben"}
        />
      </View>

      <View style={styles.buttonContainer}>
        <ButtonRegular
          onPress={() => handleLogin(auth, email, password, navigation)}
          text={"Login"}
          backgroundColor={Colors.findmyactivityYellow}
          marginBottom={10}
        />
        <ButtonRegularWithBorder
          onPress={() => handleSignUp(auth, email, password)}
          text={"Register"}
          backgroundColor={'white'}
          borderColor={Colors.findmyactivityYellow}
          textColor={Colors.findmyactivityText}
        />
        <TextButton
          onPress={handleForgotPassword}
          text={"Forgot password?"}
          textColor={Colors.findmyactivityBlue}
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