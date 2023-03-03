import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"

import PropTypes from 'prop-types'

// component props: onPress, text, backgroundColor, borderColor
const ButtonRegularWithBorder = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: props.backgroundColor, borderColor: props.borderColor}]}

      accessible={true}
      accessibilityLabel={props.accessibilityLabel}
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
      <Text style={[stylesGlobal.standardText, {color: Colors.findmyactivityText}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

ButtonRegularWithBorder.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, backgroundColor: PropTypes.string.isRequired, 
  borderColor: PropTypes.string.isRequired, textColor: PropTypes.string,

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

export default ButtonRegularWithBorder

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.findmyactivityWhite,
    borderWidth: 2,
    borderColor: Colors.findmyactivityYellow,
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    // marginTop: 40,
  },
})