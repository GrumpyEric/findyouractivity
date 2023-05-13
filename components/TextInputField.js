import { View, StyleSheet, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'

import PropTypes from 'prop-types'

// component props: placeholder, value, onChangeText, secureTextEntry, keyboardType, backgroundColor, borderColor, multiline
const TextInputField = (props) => { 
  const maxTextChars = props.maxTextChars
  const hasMaxLength = props.hasMaxLength
  const hasLeftIcon = props.hasLeftIcon
  const showCharCounter = props.showCharCounter

  // TODO: ICONS AND TEXT ARE OFFSET
  return(
    <View style={[styles.buttonStyle, {backgroundColor: 'white', borderColor: props.borderColor}]}>
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
        editable={props.editable}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        maxLength={props.maxTextChars}
        style={[styles.textInputStyle, {backgroundColor: 'white'}]}
        multiline={props.multiline}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}

        accessible={true}
        accessibilityLabel={props.accessibilityLabel}
        aria-label={props.accessibilityLabel}
        accessibilityHint={props.accessibilityHint}
        // accessibilityRole={}
        accessibilityState={{
          disabled: props.isAccessibilityStateDisabled,
          selected: props.isAccessibilityStateSelected,
          checked: props.isAccessibilityStateChecked,
          busy: props.isAccessibilityStateBusy,
          expanded: props.isAccessibilityStateExpanded
        }}
        accessibilityValue={{
          min: props.isAccessibilityValueMin,
          max: props.isAccessibilityValueMax,
          now: props.isAccessibilityValueNow,
          text: props.isAccessibilityValueText
        }}
        
      />
      {hasMaxLength && showCharCounter ?
      <Text style={[{alignSelf: 'center', paddingLeft: '5%'}]}>{props.value === undefined ? 0 : props.value.length}/{maxTextChars}</Text>
      : null}
    </View>
  )
}

TextInputField.propTypes = { placeholder: PropTypes.string, value: PropTypes.string.isRequired, onChangeText: PropTypes.func.isRequired, secureTextEntry: PropTypes.bool, 
  keyboardType: PropTypes.string, maxLength: PropTypes.number, borderColor: PropTypes.string, multiline: PropTypes.bool, 
  onBlur: PropTypes.func, onChange: PropTypes.func, editable: PropTypes.bool, onFocus: PropTypes.func,

  accessibilityLabel: PropTypes.string, accessibilityHint: PropTypes.string, accessibilityRole: PropTypes.any,
  isAccessibilityStateDisabled: PropTypes.bool,
  isAccessibilityStateSelected: PropTypes.bool,
  isAccessibilityStateChecked: PropTypes.bool,
  isAccessibilityStateBusy: PropTypes.bool,
  isAccessibilityStateExpanded: PropTypes.bool,

  isAccessibilityValueMin: PropTypes.number,
  isAccessibilityValueMax: PropTypes.number,
  isAccessibilityValueNow: PropTypes.number,
  isAccessibilityValueText: PropTypes.string
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