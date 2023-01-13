import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { stylesGlobal } from '../constants/StylesGlobal';
import { Avatar, ListItem } from "react-native-elements";

const ProfileScreen = ( {navigation} ) => {
  return (
    <ScrollView >
      <View style={stylesGlobal.screenContainer}>
        <TouchableOpacity>
            <View>
                <Avatar 
                    rounded 
                    size='large'
                    source={{
                        uri:'../assets/Profile_Image-png'
                    }}
                />
            </View>
        </TouchableOpacity>
        <View>
            <Text>Name der Person</Text>
            <Text>E-Mail der Person</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

// const styles = StyleSheet.create({

// })