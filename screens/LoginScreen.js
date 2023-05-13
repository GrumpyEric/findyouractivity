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

auth.languageCode = auth.useDeviceLanguage();

const LoginScreen = () => {
  // useState hooks for text input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailErrorState, setEmailErrorState] = useState(false)
  const [passwordErrorState, setPasswordErrorState] = useState(false)

  // Navigation to switch between screens
  const navigation = useNavigation()

  // Handler for password-reset; changes screen
  const handleForgotPassword = () => {
    navigation.navigate("Passwort zurücksetzen")
  }

  function loginHandler() {
    if (!email || !emailRegexTest(email)) {
      setEmailErrorState(true)
    }

    if (!password) {
      setPasswordErrorState(true)
    }
    handleLogin(auth, email, password, navigation)
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
      <Text 
        style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews, textAlign: 'center'}]}
        accessibilityLabel={'Anmeldung Find your Activity'}
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
            onPress={() => loginHandler()}
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
            onPress={() => navigation.navigate('RegisterScreen')}
            text={"Neu hier?\nRegistrieren"}
            backgroundColor={'white'}
            borderColor={Colors.findmyactivityYellow}
            textColor={Colors.findmyactivityText}
            accessibilityLabel={"Hier drücken"}
            accessibilityHint={"Zur Registrierung mit allen ausgefüllten Textfeldern oben diesen Knopf drücken"}
            icon={'person-add'}
            width={200}
          />
        </View>

        <Text style={stylesGlobal.standardText}>Passwort vergessen?</Text>
        <TextButton
          onPress={handleForgotPassword}
          text={"Passwort zurücksetzen"}

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