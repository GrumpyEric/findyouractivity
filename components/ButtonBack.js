import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { height, stylesGlobal, width } from "../constants/StylesGlobal";

import PropTypes from 'prop-types'
import FloatingActionButton from "./FloatingActionButton";

function ButtonBack(props) {
  return (
    <FloatingActionButton
      bottomPos={height * 0.05}
      rightPos={width * 0.05}
      icon="arrow-back"
      text={'Zurück'}
      onPress={props.onPress}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    width: 75,
    height: 75,
    backgroundColor: Colors.findmyactivityYellow
  },
  icon: {
    color: stylesGlobal.buttonTextBlack.color,
    fontSize: 30,
    alignSelf: "center"
  }
});

ButtonBack.propTypes = { onPress: PropTypes.func, style: PropTypes.any, text: PropTypes.text,

  

}

export default ButtonBack;
