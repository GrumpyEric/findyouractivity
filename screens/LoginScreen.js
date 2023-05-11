import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { auth } from '../firebase/firebase-config'

import TextInputField from '../components/TextInputField'
import { stylesGlobal } from '../constants/StylesGlobal'
import TextButton from '../components/TextButton'
import { handleSignUp, handleLogin } from '../constants/MainFunctions'
import Colors from '../constants/Colors'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
import ButtonVariable from '../components/ButtonVariable'

auth.languageCode = auth.useDeviceLanguage();

const LoginScreen = () => {
  // useState hooks for text input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Navigation to switch between screens
  const navigation = useNavigation()

  // Handler for password-reset; changes screen
  const handleForgotPassword = () => {
    navigation.navigate("Passwort zurücksetzen")
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[stylesGlobal.screenContainer, styles.container]}>
      <Text 
        style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews, textAlign: 'center'}]}
        accessibilityLabel={'Anmeldung Find your Activity'}
        accessibilityHint={"Das ist der Anmeldebildschirm. Hier bitte anmelden, um fortzufahren."}
        accessibilityRole={'header'}
      >
        {'Anmeldung \n Find your Activity'}
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
          placeholder={"Passwort"}
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

        <View style={styles.buttonsStyle}>
          <ButtonVariable
            onPress={() => handleLogin(auth, email, password, navigation)}
            text={"Anmelden"}
            backgroundColor={Colors.findmyactivityYellow}
            borderColor={Colors.findmyactivityYellow}
            accessibilityLabel={"Hier drücken"}
            accessibilityHint={"Zur Anmeldung mit allen ausgefüllten Textfeldern oben diesen Knopf drücken"}
            icon={'login'}
            width={200}
          />
        </View>

        <View style={styles.buttonsStyle}>
          <ButtonVariable
            onPress={() => handleSignUp(auth, email, password)}
            text={"Registrieren"}
            backgroundColor={'white'}
            borderColor={Colors.findmyactivityYellow}
            textColor={Colors.findmyactivityText}
            accessibilityLabel={"Hier drücken"}
            accessibilityHint={"Zur Registrierung mit allen ausgefüllten Textfeldern oben diesen Knopf drücken"}
            icon={'person-add'}
            width={200}
          />
        </View>

        <TextButton
          onPress={handleForgotPassword}
          text={"Passwort vergessen"}
          accessibilityLabel={"Hier drücken"}
          accessibilityHint={"Wenn Sie Ihr Passwort vergessen haben, dann hier drücken, um zum Bildschirm für das Zurücksetzen des Passwortes zu kommen"}
        />
      </View>
      
    </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground,
    justifyContent: 'center'
  },

  inputContainer: {
    width: '100%',
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews,
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsStyle: {
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems,
  }

})