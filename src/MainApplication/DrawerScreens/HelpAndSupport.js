// HelpAndSupport

import AsyncStorage from '@react-native-async-storage/async-storage';
import { H3 } from 'native-base';
import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import {View, StyleSheet, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal} from 'react-native';
import { NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';

export class HelpAndSupport extends Component{
    constructor(props){
        super(props)
        this.state = {
            userData : ""
        }
    }

    async componentDidMount(){
        let userDataObj = JSON.parse(await AsyncStorage.getItem('user_data'))
        this.setState({ userData: userDataObj },()=> console.log(userDataObj))
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{marginTop : deviceDimesions.Height*0.02, width : deviceDimesions.width,  alignItems : "center"}}>
                    <NeuView
                        color = "#ffffff"
                        borderRadius = {15}
                        width = {deviceDimesions.width*0.95}
                        height = {deviceDimesions.Height*0.32}
                    >
                        <Image source = {ImagesPathVariable.HelpAndSupportBannerImage} style={{width : deviceDimesions.width*0.6, height : deviceDimesions.Height*0.25, resizeMode : "stretch"}} />
                        <H3 style={{fontWeight : "700"}}>Help And Support</H3>
                    </NeuView>
                </View>
                <View style={{marginTop : deviceDimesions.Height*0.05, width : deviceDimesions.width*0.9,  alignSelf : "center"}}>
                    <Text 
                        style={{fontSize : 16, fontWeight : "600", opacity : 0.7}}
                    >Our customer care experts will assist you to find your life partner. We are pleased to help you anytime in case of any query raised by you. Contact our customer service team</Text>
                </View>
                <TouchableOpacity 
                    onPress={()=>Linking.openURL('mailto:care@happyweddings.com')}
                    style={{marginTop : deviceDimesions.Height*0.05, width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", flexDirection : "row"}}>
                    <NeuView
                        color = "#ffffff"
                        width = {deviceDimesions.width*0.08}
                        height = {deviceDimesions.Height*0.04}
                        borderRadius = {20}
                        concave
                    >
                        <Icon name="envelope-open" color="#FFC733" size={16} />
                    </NeuView>
                    <Text style={{marginLeft : deviceDimesions.width*0.03,fontSize : 16, fontWeight : "700", opacity : 0.7}}>care@happyweddings.com</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>Linking.openURL(`tel:1800 1237 80036`)}
                    style={{marginTop : deviceDimesions.Height*0.03, width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", flexDirection : "row"}}>
                    <NeuView
                        color = "#ffffff"
                        width = {deviceDimesions.width*0.08}
                        height = {deviceDimesions.Height*0.04}
                        borderRadius = {20}
                        concave
                    >
                        <Icon name="phone" color="#FFC733" size={16} />
                    </NeuView>
                    <Text style={{marginLeft : deviceDimesions.width*0.03,fontSize : 16, fontWeight : "700", opacity : 0.7}}>1800 1237 800367</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>Linking.openURL(`whatsapp://send?text=Hi, I am ${this.state.userData.userdata.first_name}, HWId- ${this.state.userData.userdata.member_profile_id}, I would like a little support.&phone=+91 8943000723`)}
                    style={{marginTop : deviceDimesions.Height*0.03, width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", flexDirection : "row"}}>
                    <NeuView
                        color = "#ffffff"
                        width = {deviceDimesions.width*0.08}
                        height = {deviceDimesions.Height*0.04}
                        borderRadius = {20}
                        concave
                    >
                        <Icon name="whatsapp" color="#33cc33" size={20} />
                    </NeuView>
                    <Text style={{marginLeft : deviceDimesions.width*0.03,fontSize : 16, fontWeight : "700", opacity : 0.7}}>+91 8943000723</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
})