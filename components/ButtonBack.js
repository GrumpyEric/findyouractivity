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
      icon="arrow-left"
      text={'Zurück'}
      onPress={props.onPress}
    />
  );
}

ButtonBack.propTypes = { onPress: PropTypes.func, style: PropTypes.any, text: PropTypes.string }

export default ButtonBack;
