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
import { errorEmailCheckContext, errorPasswordCheckContext } from '../components/AppContext'
import { emailRegexTest } from '../constants/HelperFunctionsAndVariables'
import { useEffect } from 'react'
import ButtonBack from '../components/ButtonBack'

auth.languageCode = auth.useDeviceLanguage();

const RegisterScreen = () => {
  // useState hooks for text input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailErrorState, setEmailErrorState] = useState(false)
  const [passwordErrorState, setPasswordErrorState] = useState(false)

  // Navigation to switch between screens
  const navigation = useNavigation()

  // Handler for password-reset; changes screen
  // const handleForgotPassword = () => {
  //   navigation.navigate("Passwort zurücksetzen")
  // }

  function registerHandler() {
    if (!email || !emailRegexTest(email)) {
      setEmailErrorState(true)
    }

    if (!password || password.length < 8) {
      setPasswordErrorState(true)
    }
    handleSignUp(auth, email, password, navigation)
  }

  useEffect(() => {
    console.log('email', emailErrorState);
  }, [emailErrorState])

  useEffect(() => {
    console.log('passwort', passwordErrorState);
  }, [passwordErrorState])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[stylesGlobal.screenContainer, styles.container]}>
      <ButtonBack
        onPress={() => navigation.goBack()}
        text={'Zurück'}
      />
      <Text 
        style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews, textAlign: 'center'}]}
        accessibilityLabel={'Registrierung Find your Activity'}
        accessibilityHint={"Das ist der Anmeldebildschirm. Hier bitte anmelden, um fortzufahren."}
        accessibilityRole={'header'}
      >
        {'Anmeldung \n Find your Activity'}
      </Text>

      <View style={styles.inputContainer}>

        <View style={styles.singleInputContainer}>
          <Text style={stylesGlobal.ueberschriftText2}>E-Mail</Text>
          <TextInputField
            placeholder={"muster@mail.de"}
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => setEmailErrorState(false)}
            keyboardType={'email-address'}
            backgroundColor={Colors.findmyactivityWhite}
            borderColor={emailErrorState ? 'red' : Colors.findmyactivityText}
            accessibilityLabel={'Hier Text eingeben'}
            accessibilityHint={"Es wird eine E-Mail-Adresse gefordert; die Tastatur hat sich geöffnet, bitte E-Mail-Adresse eingeben"}
          />
          {
          emailErrorState && (!email || !emailRegexTest(email))
            ? <Text style={[stylesGlobal.standardText, {color: 'red', textAlign: 'center'}]}>Überprüfen Sie Ihre eingegebene E-Mail-Adresse</Text>
            : <Text accessible={false}></Text>
          }
        </View>

        <View>
          <Text style={stylesGlobal.ueberschriftText2}>Passwort</Text>
          <TextInputField
            placeholder={"passwort123"}
            value={password}
            onChangeText={text => setPassword(text)}
            onFocus={() => setPasswordErrorState(false)}
            secureTextEntry={true}
            keyboardType={'default'}
            backgroundColor={Colors.findmyactivityWhite}
            borderColor={passwordErrorState ? 'red' : Colors.findmyactivityText}
            accessibilityLabel={'Hier Text eingeben'}
            accessibilityHint={"Es wird ein Passwort gefordert; die Tastatur hat sich geöffnet, bitte E-Mail-Adresse eingeben"}
          />
          <Text style={[stylesGlobal.standardText, {textAlign: 'center'}]}>Hinweis: Das Passwort muss mindestens 8 Zeichen lang sein!</Text>
          {
          passwordErrorState
            ? <Text style={[stylesGlobal.standardText, {color: 'red', textAlign: 'center'}]}>Überprüfen Sie Ihre eingegebenes Passwort</Text>
            : <Text accessible={false}></Text>
          }
        </View>
      </View>

      <View style={styles.buttonContainer}>

        <View style={styles.buttonsStyle}>
          <ButtonVariable
            onPress={() => registerHandler()}
            text={"Registrieren"}
            backgroundColor={Colors.findmyactivityYellow}
            borderColor={Colors.findmyactivityYellow}
            textColor={Colors.findmyactivityText}
            accessibilityLabel={"Hier drücken"}
            accessibilityHint={"Zur Registrierung mit allen ausgefüllten Textfeldern oben diesen Knopf drücken"}
            icon={'person-add'}
            width={200}
          />
        </View>
        
      </View>
      
    </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground,
    justifyContent: 'center'
  },

  inputContainer: {
    width: '100%',
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews,
  },

  singleInputContainer: {
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews / 2,
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