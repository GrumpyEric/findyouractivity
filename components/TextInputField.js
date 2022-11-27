import { View, StyleSheet, TextInput } from "react-native";

const TextInputField = (props) => { 
  return(
    <View style={styles.containerStyle}>
      <TextInput 
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        style={styles.textInputStyle}
      />
    </View>
  )
}

export default TextInputField

const styles = StyleSheet.create({
  containerStyle: {
    width: '80%',
  },

  textInputStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  }
})