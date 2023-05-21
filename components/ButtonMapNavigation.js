import { TouchableOpacity, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PropTypes from 'prop-types'

const upText = "Nach oben"
const downText = "Nach unten"
const leftText = "Nach links"
const rightText = "Nach rechts"
const middleText = "Marker setzen"

const upHintText = "Bewegt die Karte nach oben"
const downHintText = "Bewegt die Karte nach unten"
const leftHintText = "Bewegt die Karte nach links"
const rightHintText = "Bewegt die Karte nach rechts"
const middleHintText = "Setzt einen Marker in die Mitte der Karte"

// component props: onPress, text, backgroundColor, MarginBottom
const ButtonMapNavigation = (props) => {
  return (
    <>
      <TouchableOpacity
        onPress={props.onPressMiddle}
        style={[styles.buttonMiddle, styles.buttonStyling]}

        accessible={true}
        accessibilityLabel={middleText}
        aria-label={middleText}
        accessibilityHint={middleHintText}
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
        <Icon
          name={'map-marker'}
          color={Colors.findmyactivityText}
          size={20}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={props.onPressUp}
        style={[styles.buttonUp, styles.buttonStyling]}

        accessible={true}
        accessibilityLabel={upText}
        aria-label={upText}
        accessibilityHint={upHintText}
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
        <Icon
          name={'arrow-up'}
          color={Colors.findmyactivityText}
          size={20}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.onPressDown}
        style={[styles.buttonDown, styles.buttonStyling]}

        accessible={true}
        accessibilityLabel={downText}
        aria-label={downText}
        accessibilityHint={downHintText}
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
        <Icon
          name={'arrow-down'}
          color={Colors.findmyactivityText}
          size={20}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.onPressLeft}
        style={[styles.buttonLeft, styles.buttonStyling]}

        accessible={true}
        accessibilityLabel={leftText}
        aria-label={leftText}
        accessibilityHint={leftHintText}
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
        <Icon
          name={'arrow-left'}
          color={Colors.findmyactivityText}
          size={20}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={props.onPressRight}
        style={[styles.buttonRight, styles.buttonStyling]}

        accessible={true}
        onFocus={() => console.log('right')}
        accessibilityLabel={rightText}
        aria-label={rightText}
        accessibilityHint={rightHintText}
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
        <Icon
          name={'arrow-right'}
          color={Colors.findmyactivityText}
          size={20}
        />
      </TouchableOpacity>
    </>
  )
}

ButtonMapNavigation.propTypes = { onPressUp: PropTypes.func.isRequired, onPressDown: PropTypes.func.isRequired,
  onPressLeft: PropTypes.func.isRequired, onPressRight: PropTypes.func.isRequired, onPressMiddle: PropTypes.func.isRequired,

  accessibilityHint: PropTypes.string,
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

export default ButtonMapNavigation

const styles = StyleSheet.create({
  buttonStyling: {
    position: "absolute",
    borderWidth: 2,
    borderColor: Colors.findmyactivityText,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexShrink: 1,
    justifyContent: "space-evenly"
  },

  buttonMiddle: {
    backgroundColor: Colors.findmyactivityWhite,
    top: -5,
    left: 40,
  },

  buttonUp: {
    backgroundColor: Colors.findmyactivityWhite,
    top: -40,
    left: 40
  },

  buttonDown: {
    backgroundColor: Colors.findmyactivityWhite,
    top: 30,
    left: 40
  },

  buttonLeft: {
    backgroundColor: Colors.findmyactivityWhite,
    top: -5,
    left: 5
  },

  buttonRight: {
    backgroundColor: Colors.findmyactivityWhite,
    top: -5,
    left: 75
  },
})