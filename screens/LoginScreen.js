import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase/firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth"

auth.languageCode = auth.useDeviceLanguage();

const LoginScreen = () => {
  // useState hooks for text input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Navigation to switch between screens
  const navigation = useNavigation()

  // Handler for sign-up; sends data to Firebase and gets E-Mail back to verify
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("E-Mail verification sent! Please confirm your identity to sign-in.")
      });
      })
    .catch(error => alert(error.message))
  }

  // Handler for sign-in; signs into app and checks if user is email-verified
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (user.emailVerified) {
        navigation.replace("Home")
      }
      else {
        alert("User not verified, yet! Please verify your E-Mail address.")
      }
    })
    .catch(error => alert(error.message))
  }

  // Handler for password-reset; changes screen
  const handleForgotPassword = () => {
    navigation.replace("ForgotPW")
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
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.buttonForgotPassword}
        >
          <Text style={styles.buttonOutlineText}>Forgot password?</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonForgotPassword: {
    marginTop: 5
  }
})