import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { auth } from '../firebase/firebase-config'

import { height, stylesGlobal, width } from '../constants/StylesGlobal'
import TextInputField from '../components/TextInputField'

import { handleForgotPassword } from '../constants/MainFunctions'
import Colors from '../constants/Colors'
import ButtonBack from '../components/ButtonBack'
import ButtonRegular from '../components/ButtonRegular'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.replace("Login")
  }

  return (
    <View style={[stylesGlobal.screenContainer, styles.container]}>
      
      {/* <View style={{position: 'absolute', bottom: height * 0.075, right: width * 0.075}}> */}
        <ButtonBack
          onPress={() => handleGoBack()}
          text={'Zurück'}
        />
      {/* </View> */}

      <Text 
        style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenViews, textAlign: 'center'}]}
        accessibilityLabel={'Passwort zurücksetzen für Find your Activity'}
        accessibilityHint={"Das ist der Anmeldebildschirm. Hier bitte anmelden, um fortzufahren."}
        accessibilityRole={'header'}
      >
        Passwort zurücksetzen
      </Text>

      <View style={[styles.itemStyle, {alignItems: 'center'}]}>
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
      </View>

      <View style={styles.buttonContainer}>
        
        <View style={styles.itemStyle}>
          <ButtonRegular
            onPress={() => handleForgotPassword(auth, email)}
            text={"Zurücksetzen"}
            icon={'refresh'}
            backgroundColor={Colors.findmyactivityYellow}
            accessibilityLabel={"Hier drücken"}
            accessibilityHint={"Zum Zurücksetzen des Passwortes bei oben eingegebener E-Mail-Adresse hier drücken, um eine Anfrage loszuschicken."
            + "Falls die oben eingegebene E-Mail-Adresse bei uns vorhanden ist, schicken wir Ihnen einen Link per Mail, wo Sie Ihr Passwort neu setzen können"}
          />
        </View>

      </View>
    </View>
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