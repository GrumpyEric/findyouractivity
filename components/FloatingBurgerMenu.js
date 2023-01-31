import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { stylesglobal, width, height } from '../constants/StylesGlobal'
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
            size={35}
            color='white'
          />
        </TouchableOpacity>
      </View>
    )
  }
}

FloatingBurgerMenu.propTypes = { onPress: PropTypes.func.isRequired, icon: PropTypes.string.isRequired,  }

export default FloatingBurgerMenu

const styles = StyleSheet.create({
  buttonStyle: {
    top: height * 0.05,
    left: width * 0.05,
    position: 'absolute',  
    zIndex: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 30,
    width: 60,
    height: 60

  },

  textStyle: {
    alignSelf: 'center', 
    paddingHorizontal: '10%',
    textAlign: 'center',
  },

  iconStyle: {
    alignSelf: 'center',
  }

});