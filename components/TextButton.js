import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { stylesGlobal } from "../constants/StylesGlobal";

import PropTypes from 'prop-types'

// component props: onPress, text
const TextButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.button}

      accessible={true}
      accessibilityLabel={props.text}
      aria-label={props.text}
      accessibilityHint={props.accessibilityHint}
      accessibilityRole={"button"}
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
    >
      {props.icon ?
      <Icon 
        name={props.icon}
      />
      : null}
      <Text style={[stylesGlobal.buttonTextBlack, {color: props.textColor, textAlign: "center", textDecorationLine: "underline"}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

TextButton.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, textColor: PropTypes.string,
  icon: PropTypes.string,
  
  accessibilityLabel: PropTypes.string, accessibilityHint: PropTypes.string, 
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

export default TextButton

const styles = StyleSheet.create ({
  button: {
    // marginTop: 5,
    // marginBottom: 20,
  },
})