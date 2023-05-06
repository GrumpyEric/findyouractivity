import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const EventHeader = (props) => {
  const navigation = useNavigation()

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
          <Text style={styles.zuruck}>Zurück</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.profil}>
          Events
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
      >
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(223,242,242,1)",
    paddingRight: 8,
    paddingLeft: 8,
  },
  leftWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  leftIconButton: {
    flexDirection: "row",
  },
  leftIcon: {
    color: "rgba(35,112,118,1)",
    fontSize: 30,
  },
  zuruck: {
    fontSize: 17,
    color: "rgba(35,112,118,1)",
    paddingLeft: 5,
    alignSelf: "center",
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profil: {
    fontSize: 17,
    lineHeight: 17,
    color: "#000",
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
