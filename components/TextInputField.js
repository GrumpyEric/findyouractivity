import { useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { stylesGlobal } from "../constants/StylesGlobal";

// component props: placeholder, value, onChangeText, secureTextEntry, keyboardType, backgroundColor, borderColor
const TextInputField = (props) => { 
  const maxTextChars = 150
  const hasMaxLength = props.hasMaxLength
  const hasLeftIcon = props.hasLeftIcon

  return(
    <View style={[styles.buttonStyle, {backgroundColor: props.backgroundColor, borderColor: props.borderColor}]}>
      {hasLeftIcon ?
      <View style={{justifyContent: 'center', paddingRight: 10}}>
        <Icon
          name={props.iconName}
          size={15}
          color='black'
        /> 
      </View>
      : null}
      <TextInput 
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        style={[styles.textInputStyle, {backgroundColor: props.backgroundColor}]}
      />
      {hasMaxLength ?
      <Text style={[{alignSelf: 'center', paddingLeft: '5%'}]}>{props.value === undefined ? 0 : props.value.length}/{maxTextChars}</Text>
      : null}
    </View>
  )
}

export default TextInputField

const styles = StyleSheet.create({

  textInputStyle: {
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    // borderWidth: 1
  },

  buttonStyle: {
    // width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    borderWidth: 2,
  },
})