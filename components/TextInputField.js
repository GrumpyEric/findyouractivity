import { useEffect, useRef} from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from "react-native/Libraries/NewAppScreen";
import { stylesGlobal } from "../constants/StylesGlobal";

import PropTypes from 'prop-types'

// component props: placeholder, value, onChangeText, secureTextEntry, keyboardType, backgroundColor, borderColor, multiline
const TextInputField = (props) => { 
  const maxTextChars = props.maxTextChars
  const hasMaxLength = props.hasMaxLength
  const hasLeftIcon = props.hasLeftIcon
  const showCharCounter = props.showCharCounter

  // TODO: ICONS AND TEXT ARE OFFSET
  return(
    <View style={[styles.buttonStyle, {backgroundColor: props.backgroundColor, borderColor: props.borderColor}]}>
      {hasLeftIcon ?
      <View style={{justifyContent: 'center', paddingRight: 10, width: 30}}>
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
        maxLength={props.maxTextChars}
        style={[styles.textInputStyle, {backgroundColor: props.backgroundColor}]}
        multiline={props.multiline}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      {hasMaxLength && showCharCounter ?
      <Text style={[{alignSelf: 'center', paddingLeft: '5%'}]}>{props.value === undefined ? 0 : props.value.length}/{maxTextChars}</Text>
      : null}
    </View>
  )
}

TextInputField.propTypes = { placeholder: PropTypes.string, value: PropTypes.string.isRequired, onChangeText: PropTypes.func.isRequired, secureTextEntry: PropTypes.bool, 
  keyboardType: PropTypes.string, maxLength: PropTypes.number, backgroundColor: PropTypes.string, borderColor: PropTypes.string, multiline: PropTypes.bool, 
  onBlur: PropTypes.func, onChange: PropTypes.func
}

export default TextInputField

const styles = StyleSheet.create({

  textInputStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1
    // borderWidth: 1
  },

  buttonStyle: {
    // width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    borderWidth: 2,
  }
})