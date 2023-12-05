import { View } from 'native-base';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import 'react-native-gesture-handler';
import { goToChatContainerScreen, goToDrawerHomeScreen, goToNotificationScreen, goToSearchProfilesScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import { GetCountOfNotification } from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DrawerHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CountOfNotification: false,

        }
    }
    async componentDidMount() {
        this.loadAllData()
    }
    async loadAllData() {
        try {
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });
            console.log(access_token, "==access_token==")
            await GetCountOfNotification(this.state.access_token).then(res => {
                let response = res
                console.log(response.data, "==status==")
                if (response.data.status) {
                    console.log(this.setState({ CountOfNotification: response.data.data }), "==status==")
                    this.setState({ CountOfNotification: response.data.data })

                }
            })

        }
        catch (error) {
            Alert.alert('Error', 'There was an error.')
        }
    }

    render() {
        const { handleMenuClick } = this.props
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginLeft: 5, marginRight: 10 }} onPress={() => handleMenuClick()}>
                        <Image style={{ height: deviceDimesions.Height * 0.03, width: deviceDimesions.width * 0.06, margin: 5 }} source={IconsPathVariable.DrawerHeaderMenuIcon} />
                    </TouchableOpacity>
                    <View>
                        <Image style={{ marginLeft: 15 }} source={IconsPathVariable.DrawerHeaderLogo} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-evenly" }}>
                   
                    <TouchableOpacity style={{ marginLeft: 5, marginRight: 5 }} onPress={() => goToNotificationScreen()}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.06, }} source={IconsPathVariable.DrawerHeaderNotificationIcon} />

                            {

                                this.state.CountOfNotification ?
                                    <View style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 18,  //half radius will make it cirlce,
                                        backgroundColor: '#FA784A',
                                        marginLeft: -11,
                                        bottom: 5
                                    }}>
                                        <Text style={styles.count}>{this.state.CountOfNotification ? this.state.CountOfNotification : ""}</Text>
                                    </View>

                                    :
                                    null
                            }

                        </View>

                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: deviceDimesions.width * 0.95,
        alignSelf: "center",
        alignItems: 'center',
        top: deviceDimesions.Height * 0.005,
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,  //half radius will make it cirlce,
        backgroundColor: '#FA784A'
    },
    count: { color: '#FFF', textAlign: 'center' }
});