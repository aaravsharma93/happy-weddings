// KeywordSearch
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import SimpleTextInput from '../../../component/SimpleTextInput/SimpleTextInput';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../../helper/IconsPathVariable/IconsPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastAndroid } from 'react-native';
import { KeywordSearchAPI } from '../../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { goToDrawerViewAllMatchedUserScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';

export class KeywordSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            keyword : "",
            access_token : '',
        }
    }

    async componentDidMount(){
        try{
            let access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });
        }
        catch{

        }
    }

    onSearchPress(){
        this.state.keyword ?
        KeywordSearchAPI(this.state.access_token, this.state.keyword).then(res=>{
            let response = res;
            console.log(response.data.data)
            if (response.data.status) {
                console.log(response.data.data)
                goToDrawerViewAllMatchedUserScreen({ title: 'Keyword Search', data: response.data.data })
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
        .catch(err=>{
            console.log(err)
        })
        : 
        ToastAndroid.showWithGravityAndOffset(
            'Please enter keyword.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    render(){
        return(
            <View style={{width : deviceDimesions.width*0.85, alignSelf : "center"}}>
                <View style={{alignItems : "flex-start"}}>
                    <Text style={{fontSize : 16, opacity : 0.7}}>Enter Keyword</Text>
                </View>
                <View style={{alignItems : "center"}}>
                    <SimpleTextInput placeholder="Search By Keyword" value = {this.state.keyword} onChangeText={(text)=>{this.setState({keyword : text})}}  style={{width : deviceDimesions.width*0.8, textAlign : "left"}} />
                </View>
                <View  style={{alignItems : "center", marginTop : deviceDimesions.Height*0.05}}>
                    <TouchableOpacity
                        onPress = {()=>this.onSearchPress()}
                        style={{backgroundColor : "#ff6600", flexDirection : "row", justifyContent : "space-evenly", width : deviceDimesions.width*0.5, padding : 10, alignItems : "center", borderRadius : 10, elevation : 5}}
                    >
                        <Text style={{color : "#ffffff", fontSize : 16,  fontFamily : "700"}}>SEARCH</Text>
                        <NeuBorderView
                            color = "#ff6600"
                            width = {deviceDimesions.width*0.08}
                            height = {deviceDimesions.Height*0.045}
                            borderRadius = {20}
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