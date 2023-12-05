import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import SimpleTextInput from '../../../component/SimpleTextInput/SimpleTextInput';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../../helper/IconsPathVariable/IconsPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchUserById } from '../../../helper/API_Call/API_Call';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { goToDrawerViewAllMatchedUserScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';

export class SearchByID extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileID: '',
            access_token: ''
            // state definition and initialization
        }
    }

    async onSearchPress() {
        try {
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });

            if (!this.state.profileID) {
                ToastAndroid.showWithGravityAndOffset(
                    'Enter Profile ID.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                )

            }
            else {
                await SearchUserById(this.state.access_token, this.state.profileID)
                    .then(res => {
                        let response = res;
                        if (response.data.status) {
                            goToDrawerViewAllMatchedUserScreen({ title: 'Search By Id', data: response.data.data })
                        }
                        else {
                            ToastAndroid.showWithGravityAndOffset(
                                'No Such User Exist.',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                            )
                        }
                    })
                    .catch(err => {
                        let error = err;
                        console.log(JSON.stringify(error))
                    })
            }
        }

        catch {

        }
    }

    render() {
        return (
            <View style={{ width: deviceDimesions.width * 0.85, alignSelf: "center" }}>
                <View style={{ alignItems: "flex-start" }}>
                    <Text style={{ fontSize: 16, opacity: 0.7 }}>Enter Profile ID</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <SimpleTextInput placeholder="Profile ID" value={this.state.profileID} onChangeText={(text) => this.setState({ profileID: text })} style={{ width: deviceDimesions.width * 0.8, textAlign: "left" }} />
                </View>
                <View style={{ alignItems: "center", marginTop: deviceDimesions.Height * 0.05 }}>
                    <TouchableOpacity
                        onPress={() => this.onSearchPress()}
                        style={{ backgroundColor: "#ff6600", flexDirection: "row", justifyContent: "space-evenly", width: deviceDimesions.width * 0.5, padding: 10, alignItems: "center", borderRadius: 10, elevation: 5 }}
                    >
                        <Text style={{ color: "#f5f5f5", fontSize: 16, fontFamily: "700" }}>SEARCH</Text>
                        <NeuBorderView
                            color="#ff6600"
                            width={deviceDimesions.width * 0.08}
                            height={deviceDimesions.Height * 0.045}
                            borderRadius={20}
                            inset
                        >
                            <Icon name="search" color="#f5f5f5" size={16} />
                        </NeuBorderView>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}