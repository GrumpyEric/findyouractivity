import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { width, height, stylesGlobal } from '../constants/StylesGlobal'
import Icon from 'react-native-vector-icons/FontAwesome'

import PropTypes from 'prop-types'

// component props: onPress, icon
class FloatingBurgerMenu extends React.Component {
  render() {
    return (
      <View style={styles.buttonStyle}>
        <TouchableOpacity 
          onPress={() => this.props.onPress()}
          style={{justifyContent: 'center', alignSelf: 'center'}}
        >
          <Icon 
            name={this.props.icon}
            size={30}
            color='white'
            style={styles.iconStyle}
          />
          <Text style={stylesGlobal.buttonTextWhite}>Menü</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

FloatingBurgerMenu.propTypes = { onPress: PropTypes.func.isRequired, icon: PropTypes.string.isRequired }

export default FloatingBurgerMenu

const styles = StyleSheet.create({
  buttonStyle: {
    top: height * 0.025,
    left: width * 0.05,
    position: 'absolute',  
    zIndex: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
  },

  iconStyle: {
    alignSelf: 'center',
  }

});