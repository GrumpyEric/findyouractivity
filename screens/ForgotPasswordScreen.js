import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { auth } from '../firebase/firebase-config'
import { sendPasswordResetEmail } from 'firebase/auth'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Link to reset password has been sent!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  const handleGoBack = () => {
    navigation.replace("Login")
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.inputContainer}>

        <TextInput 
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Reset password</Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={handleGoBack}
              style={styles.buttonGoBack}
            >
              <Text style={styles.buttonOutlineText}>Go Back to login</Text>
          </TouchableOpacity>

        </View>
      </View>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonGoBack: {
    marginTop: 5
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: '80%'
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})