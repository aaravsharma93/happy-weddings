// ChatContainer
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity} from 'react-native';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import { goToPreviousScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AllChats } from '../../../component/ChatComponents/AllChats';
import { ActiveContacts } from '../../../component/ChatComponents/ActiveContacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ChatContainer extends Component{
    constructor(props){
        super(props)
        this.state={
            activeTab : 'inbox',
            membership : 1,
        }
    }
    async componentDidMount(){
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{width : deviceDimesions.width*0.95, alignSelf : "center", alignItems : "center", flexDirection : "row", justifyContent : 'space-around', paddingVertical : deviceDimesions.Height*0.03}}>
                    <TouchableOpacity onPress={()=>goToPreviousScreen(this)} style={{padding : 10}}>
                        <Icon name="chevron-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{fontSize : 18, width : deviceDimesions.width*0.7}}>My Chats</Text>
                </View>
                <View style={{width : deviceDimesions.width*0.9, alignSelf : "center", alignItems : "center", flexDirection : "row", paddingBottom : deviceDimesions.Height*0.03}}>
                    <TouchableOpacity
                        onPress = {()=>this.state.activeTab == 'active'? this.setState({activeTab : 'inbox'}): null}
                        style={ this.state.activeTab == 'inbox' ? {backgroundColor : '#ff6600', borderRadius : 15, alignItems : "center", borderColor : '#ffffff', elevation : 10, height : deviceDimesions.Height*0.06, justifyContent : "center", padding : 5, width : deviceDimesions.width*0.25, borderWidth : 0.4} 
                        : {backgroundColor : '#ffffff', borderRadius : 15,  elevation : 10, height : deviceDimesions.Height*0.06, justifyContent : "center", padding : 5, width : deviceDimesions.width*0.25, alignItems : "center"}}
                    >
                        <Text 
                            style={ this.state.activeTab == 'inbox' ? {fontSize : 16, color : "#ffffff"} : {fontSize : 16, color : "#000"}}
                        >Inbox</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {()=>this.state.activeTab == 'inbox' ? this.setState({activeTab : 'active'}): null}
                        style={ this.state.activeTab == 'active' ? {marginLeft : deviceDimesions.width*0.05,backgroundColor : '#ff6600', borderRadius : 15, alignItems : "center", borderColor : '#ffffff', elevation : 10, height : deviceDimesions.Height*0.06, justifyContent : "center", padding : 5, width : deviceDimesions.width*0.25, borderWidth : 0.4} 
                        : {marginLeft : deviceDimesions.width*0.05,backgroundColor : '#ffffff', borderRadius : 15,  elevation : 10, height : deviceDimesions.Height*0.06, justifyContent : "center", padding : 5, width : deviceDimesions.width*0.25, alignItems : "center"}}
                    >
                       <Text 
                            style={ this.state.activeTab == 'active' ? {fontSize : 16, color : "#ffffff"} : {fontSize : 16, color : "#000"}}
                        >Active</Text>
                    </TouchableOpacity>
                </View>
                    {
                        this.state.activeTab == 'inbox' ? <AllChats /> : <ActiveContacts />
                    }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : '#ffffff',
    }
  });