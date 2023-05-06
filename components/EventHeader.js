import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import PropTypes from 'prop-types'
import { stylesGlobal } from "../constants/StylesGlobal";
import Colors from "../constants/Colors";

const EventHeader = (props) => {
  const navigation = useNavigation()
  const hasSave = props.saveButton || false

  const onCloseButton = () => {
    navigation.pop();
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftWrapper}>
        <TouchableOpacity
          onPress={() => onCloseButton()}
          style={styles.leftIconButton}
        >
          <Icon name="ios-arrow-back" style={styles.leftIcon}></Icon>
          <Text style={[stylesGlobal.standardText, styles.zuruck]}>Zurück</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={[styles.profil, stylesGlobal.ueberschriftText]}>
          {props.text}
        </Text>
      </View>
      <View style={styles.rightWrapper}>
        <TouchableOpacity
          onPress={props.saveFunction}
          style={styles.leftIconButton}
        >
          {hasSave ?
          <>
            <Text style={[stylesGlobal.standardText, styles.save]}>Speichern</Text>
            <Icon name="save-outline" style={styles.leftIcon}></Icon>
          </>
          : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

EventHeader.propTypes = { style: PropTypes.any, text: PropTypes.string, saveButton: PropTypes.bool, saveFunction: PropTypes.func }

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 15
  },
  leftWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightWrapper: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  leftIconButton: {
    flexDirection: "row",
  },
  leftIcon: {
    color: Colors.findmyactivityGreen,
    fontSize: 30,
  },
  zuruck: {
    color: Colors.findmyactivityGreen,
    paddingLeft: 10,
    alignSelf: "center",
  },
  save: {
    color: Colors.findmyactivityGreen,
    paddingRight: 10,
    alignSelf: "center",
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  rightIconButton: {},
  speichern: {
    color: "rgba(35,112,118,1)",
    fontSize: 17,
    alignSelf: "center"
  }
});

export default EventHeader;
