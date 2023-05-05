import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"
import Icon from 'react-native-vector-icons/MaterialIcons'

import PropTypes from 'prop-types'

// component props: onPress, text, backgroundColor, MarginBottom
const ButtonRegular = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: props.backgroundColor}]}

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
      {props.icon ?
      <Icon
        name={props.icon}
        color={Colors.findmyactivityText}
        size={20}
      />
      : null}
      <Text style={stylesGlobal.buttonTextBlack}>{props.text}</Text>
    </TouchableOpacity>
  )
}

ButtonRegular.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, backgroundColor: PropTypes.string.isRequired, icon: PropTypes.string,

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

export default ButtonRegular

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Colors.findmyactivityYellow,
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-evenly"
    // marginTop: 40,
  },
})