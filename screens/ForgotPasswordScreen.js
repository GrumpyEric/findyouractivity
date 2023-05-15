import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { auth } from '../firebase/firebase-config'

import { stylesGlobal } from '../constants/StylesGlobal'
import TextInputField from '../components/TextInputField'

import { handleForgotPassword } from '../constants/MainFunctions'
import Colors from '../constants/Colors'
import ButtonBack from '../components/ButtonBack'
import ButtonVariable from '../components/ButtonVariable'
import { emailRegexTest } from '../constants/HelperFunctionsAndVariables'
import { AccessibilityHintEmailText, EmailErrorText, EmailPlaceholderText, EmailTitleText, ForgotResetHint, ForgotResetText, ForgotTitleHint, ForgotTitleText, LoginBackHint } from '../constants/Fixtures'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [emailErrorState, setEmailErrorState] = useState(false)
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.replace("Login")
  }

  function forgotHandler() {
    if (!email || !emailRegexTest(email)) {
      setEmailErrorState(true)
    }
    handleForgotPassword(auth, email)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[stylesGlobal.screenContainer, styles.container]}>
      
      <ButtonBack
        onPress={() => handleGoBack()}
        text={'Zurück'}
        accessibilityHint={LoginBackHint}
      />

      <Text 
        style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews, textAlign: 'center'}]}
        accessibilityLabel={ForgotTitleText}
        aria-label={ForgotTitleText}
        accessibilityHint={ForgotTitleHint}
        accessibilityRole={'header'}
      >
        {ForgotTitleText}
      </Text>

      <View style={[styles.itemStyle, {alignItems: 'center'}]}>
        <Text 
          style={[stylesGlobal.ueberschriftText2, {alignSelf: 'flex-start'}]}
          accessibilityLabel={EmailTitleText}
          aria-label={EmailTitleText}
        >
          {EmailTitleText}
        </Text>
        <TextInputField
          editable
          placeholder={EmailPlaceholderText}
          value={email}
          onChangeText={text => setEmail(text)}
          onFocus={() => setEmailErrorState(false)}
          keyboardType={'email-address'}
          backgroundColor={Colors.findmyactivityWhite}
          borderColor={emailErrorState ? Colors.findmyactivityError : Colors.findmyactivityText}
          accessibilityLabel={EmailPlaceholderText}
          accessibilityHint={AccessibilityHintEmailText}
        />
          { emailErrorState && (!email || !emailRegexTest(email))
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

      <View style={styles.buttonContainer}>
        
        <View style={styles.itemStyle}>
          <ButtonVariable
            onPress={() => forgotHandler()}
            text={ForgotResetText}
            icon={'refresh'}
            backgroundColor={Colors.findmyactivityYellow}
            borderColor={Colors.findmyactivityYellow}
            accessibilityLabel={ForgotResetText}
            accessibilityHint={ForgotResetHint}
            width={200}
          />
        </View>

      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground,
    justifyContent: 'center'
  },
  
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemStyle: {
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems,
  }
})