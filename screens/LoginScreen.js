import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import { auth } from '../firebase/firebase-config'

import TextInputField from '../components/TextInputField'
import { stylesGlobal } from '../constants/StylesGlobal'
import TextButton from '../components/TextButton'
import { handleLogin } from '../constants/MainFunctions'
import Colors from '../constants/Colors'
import ButtonVariable from '../components/ButtonVariable'
import { emailRegexTest } from '../constants/HelperFunctionsAndVariables'
import { AccessibilityHintEmailText, AccessibilityHintPasswortText, AccessibilityHintTitleText, EmailErrorText, EmailPlaceholderText, EmailTitleText, ForgotButtonHint, ForgotButtonText, ForgotButtonTitle, LoginButtonHint, LoginButtonText, LoginTitleText, PasswortErrorText, PasswortPlaceholderText, PasswortTitleText, RegisterButtonHint, RegisterButtonText } from '../constants/Fixtures'

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

  return (
  <ScrollView style={[stylesGlobal.screenContainer, styles.container]} contentContainerStyle={stylesGlobal.contentContainer}>
    <Text 
      style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews, textAlign: 'center'}]}
      accessibilityLabel={LoginTitleText}
      aria-label={LoginTitleText}
      accessibilityHint={AccessibilityHintTitleText}
      accessibilityRole={'header'}
    >
      {LoginTitleText}
    </Text>

    <View style={styles.inputContainer}>

      <View style={styles.singleInputContainer}>
        <Text 
          style={stylesGlobal.ueberschriftText2}
          accessibilityLabel={EmailTitleText}
          aria-label={EmailTitleText}
          accessibilityRole='text'
        >
          {EmailTitleText}
        </Text>
        <TextInputField
          editable={true}
          placeholder={EmailPlaceholderText}
          value={email}
          onChangeText={text => setEmail(text)}
          onFocus={() => setEmailErrorState(false)}
          keyboardType={'email-address'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={emailErrorState ? Colors.findmyactivityError : null}
          accessibilityLabel={EmailPlaceholderText}
          label={EmailPlaceholderText}
          accessibilityHint={AccessibilityHintEmailText}
        />
        {
        emailErrorState && (!email || !emailRegexTest(email))
          ? <Text 
              style={[stylesGlobal.standardText, {color: Colors.findmyactivityError, textAlign: 'center'}]}
              accessibilityLabel={EmailErrorText}
              aria-label={EmailErrorText}
            >
              {EmailErrorText}
            </Text>
          : <Text accessible={false}></Text>
        }
      </View>

      <View>
        <Text 
          style={stylesGlobal.ueberschriftText2}
          accessibilityLabel={PasswortTitleText}
          aria-label={PasswortTitleText}
        >
          {PasswortTitleText}
        </Text>
        <TextInputField
          editable={true}
          placeholder={PasswortPlaceholderText}
          value={password}
          onChangeText={text => setPassword(text)}
          onFocus={() => setPasswordErrorState(false)}
          secureTextEntry={true}
          keyboardType={'default'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={passwordErrorState ? Colors.findmyactivityError : null}
          accessibilityLabel={PasswortPlaceholderText}
          accessibilityHint={AccessibilityHintPasswortText}
        />
        {
        passwordErrorState
          ? <Text 
              style={[stylesGlobal.standardText, {color: Colors.findmyactivityError, textAlign: 'center'}]}
              accessibilityLabel={PasswortErrorText}
              aria-label={PasswortErrorText}
            >
              {PasswortErrorText}
            </Text>
          : <Text accessible={false}></Text>
        }
      </View>
    </View>

    <View style={styles.buttonContainer}>

      <View style={styles.buttonsStyle}>
        <ButtonVariable
          onPress={() => loginHandler()}
          text={LoginButtonText}
          backgroundColor={Colors.findmyactivityYellow}
          borderColor={Colors.findmyactivityYellow}
          accessibilityLabel={LoginButtonText}
          accessibilityHint={LoginButtonHint}
          icon={'login'}
          width={200}
        />
      </View>

      <View style={styles.buttonsStyle}>
        <ButtonVariable
          onPress={() => navigation.navigate('RegisterScreen')}
          text={RegisterButtonText}
          backgroundColor={'white'}
          borderColor={Colors.findmyactivityYellow}
          textColor={Colors.findmyactivityText}
          accessibilityLabel={RegisterButtonText}
          accessibilityHint={RegisterButtonHint}
          icon={'person-add'}
          width={200}
        />
      </View>

      <Text 
        style={stylesGlobal.standardText}
        accessibilityLabel={ForgotButtonTitle}
        aria-label={ForgotButtonTitle}
      >
        {ForgotButtonTitle}
      </Text>
      <TextButton
        onPress={handleForgotPassword}
        text={ForgotButtonText}

        accessibilityLabel={ForgotButtonText}
        accessibilityHint={ForgotButtonHint}
      />
    </View>
    
  </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityWhite,
    // justifyContent: 'center'
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