import { View, StyleSheet, Text, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome'

import PropTypes from 'prop-types'
import Colors from "../constants/Colors";
import { useEffect, useState } from "react";
import { useRef } from "react";

// component props: placeholder, value, onChangeText, secureTextEntry, keyboardType, backgroundColor, borderColor, multiline
const TextInputField = (props) => { 
  const maxTextChars = props.maxTextChars
  const hasMaxLength = props.hasMaxLength
  const hasLeftIcon = props.hasLeftIcon
  const showCharCounter = props.showCharCounter
  const editable = props.editable
  const [borderColor, setBorderColor] = useState(props.borderColor)

  useEffect(() => {
    props.borderColor 
      ? setBorderColor(props.borderColor)
      : null
  }, [props.borderColor])
  
  const ref = useRef()

  return(
    <Pressable onPress={() => ref.current.focus()} style={[styles.buttonStyle, {backgroundColor: 'white', borderColor: borderColor}]}>
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
        collapsable={false}
        dataDetectorTypes={props.dataDetectorTypes}
        onPressOut={() => ref.current.focus()}
        focusable={true}
        ref={ref}
        editable={editable}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.findmyactivityPlaceholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        maxLength={props.maxTextChars}
        style={[styles.textInputStyle, {backgroundColor: 'white', color: editable ? Colors.findmyactivityText : Colors.findmyactivityPlaceholder}]}
        multiline={props.multiline}
        onBlur={() => { props.onBlur ? props.onBlur() : null; setBorderColor(props.borderColor) }}
        onChange={props.onChange}
        onFocus={() => { props.onFocus ? props.onFocus() : null; setBorderColor(Colors.findmyactivityAccept) }}

        accessibilityLabel={props.accessibilityLabel}
        aria-label={props.accessibilityLabel}
        accessibilityHint={props.accessibilityHint}
        accessibilityRole={"none"}
        
      />
      {hasMaxLength && showCharCounter ?
      <Text 
        style={[{alignSelf: 'center', paddingLeft: '5%'}]}
        accessibilityLabel={(props.value === undefined ? 0 : props.value.length/maxTextChars).toString()}
        aria-label={(props.value === undefined ? 0 : props.value.length/maxTextChars).toString()}
        accessibilityRole="text"
      >
        {props.value === undefined ? 0 : props.value.length}/{maxTextChars}
      </Text>
      : null}
    </Pressable>
  )
}

TextInputField.propTypes = { placeholder: PropTypes.string, value: PropTypes.string.isRequired, onChangeText: PropTypes.func, secureTextEntry: PropTypes.bool, 
  keyboardType: PropTypes.string, maxLength: PropTypes.number, borderColor: PropTypes.string, multiline: PropTypes.bool, 
  onBlur: PropTypes.func, onChange: PropTypes.func, editable: PropTypes.bool, onFocus: PropTypes.func, dataDetectorTypes: PropTypes.any,

  accessibilityLabel: PropTypes.string, accessibilityHint: PropTypes.string,
}

export default TextInputField

const styles = StyleSheet.create({

  textInputStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
  },

  buttonStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    borderWidth: 2,
  }
})