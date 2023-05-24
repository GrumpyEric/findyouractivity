import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'

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
    navigation.goBack()
  }

  function forgotHandler() {
    if (!email || !emailRegexTest(email)) {
      setEmailErrorState(true)
    }
    handleForgotPassword(auth, email)
  }

  return (
    <ScrollView style={[stylesGlobal.screenContainer, styles.container]} contentContainerStyle={[stylesGlobal.contentContainer, {justifyContent: 'center'}]}>
      <Text 
        style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews, textAlign: 'center'}]}
        accessibilityLabel={ForgotTitleText}
        aria-label={ForgotTitleText}
        accessibilityHint={ForgotTitleHint}
        accessibilityRole={'header'}
        selectable={true}
      >
        {ForgotTitleText}
      </Text>

      <View style={[styles.itemStyle, {alignItems: 'center'}]}>
        <Text 
          style={[stylesGlobal.ueberschriftText2, {alignSelf: 'flex-start'}]}
          accessibilityLabel={EmailTitleText}
          aria-label={EmailTitleText}
          accessibilityRole='text'
          selectable={true}
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
          accessibilityLabel={EmailTitleText}
          accessibilityHint={AccessibilityHintEmailText}
        />
          { emailErrorState && (!email || !emailRegexTest(email))
            ? <Text 
                style={[stylesGlobal.standardText, {color: Colors.findmyactivityError, textAlign: 'center'}]}
                accessibilityLabel={EmailErrorText}
                aria-label={EmailErrorText}
                accessibilityRole='alert'
                selectable={true}
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

      <ButtonBack
        onPress={() => handleGoBack()}
        text={'Zurück'}
        accessibilityHint={LoginBackHint}
      />
    </ScrollView>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground
  },
  
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemStyle: {
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems,
  }
})