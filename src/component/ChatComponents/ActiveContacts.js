// ActiveContacts
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity } from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToUpgradeToPremiumScreen } from '../../helper/NavigationFunctions/NavigationFunctions';

export class ActiveContacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            membership: 1,
        }
    }

    async componentDidMount() {
        let userData = JSON.parse(await AsyncStorage.getItem('user_data'))
        this.setState({ membership: userData.userdata.membership })
    }
    render() {
        return (
            <>
                {this.state.membership != 1 ?
                    <ScrollView style={styles.container}>
                        <View style={{alignItems:'center',width:deviceDimesions.width*0.9,marginTop:60}}>
                            <View >
                                <Image source={ImagesPathVariable.ChatOnlineImage} style={{ width: deviceDimesions.width * 0.99, height: deviceDimesions.Height * 0.3, }} />

                            </View>
                            <Text>No members online.</Text>

                        </View>

                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => goToUpgradeToPremiumScreen()} style={{ elevation: 5, padding: 1, backgroundColor: "#ffffff", borderRadius: 10 }}>
                            <Image source={ImagesPathVariable.MatchedUserProfileScreenSliderImage2} style={{ height: deviceDimesions.Height * 0.25, width: deviceDimesions.width * 0.9 }} />
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        
    },
});