

import { H2, H3 } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToLoginWithOTPVerificationScreen,  } from '../../helper/NavigationFunctions/NavigationFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LoginWithOTPAPI} from '../../helper/API_Call/API_Call';
import { ToastAndroid } from 'react-native';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';

export default class LoginWithOTP extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mobile : "",
            LoaderProperties : {
                isLoading : false,
                LoadingTitle : ""
            },
        }
    }

    ToggleLoader(name, title){
        this.setState({
             
              LoaderProperties : {
                  ...this.state.LoaderProperties,
                  LoadingTitle : name,
                  isLoading : title,
              }
          })
    }

    onSubmit = async () => {
            this.ToggleLoader("Loading...", true)
            LoginWithOTPAPI(this.state.mobile).then(res => {
                let response = res;
                console.log(response.data)
                if(response.data.status){
                    this.ToggleLoader("", false)
                    goToLoginWithOTPVerificationScreen({MobileNumber : this.state.mobile})
                }
                else{
                    this.ToggleLoader("",false)
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );
                }
            })
        
    }
    render(){
        return(
            <View style={styles.container}>

                {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText = {this.state.LoaderProperties.LoadingTitle} />

                <View style={{ marginBottom : deviceDimesions.Height*0.05}}>
                    <Image source={ImagesPathVariable.LoginLogo} />
                </View>
                <View style={{ marginBottom : deviceDimesions.Height*0.05}}>
                    <H3 style={{ color:"red"}}>Login With OTP</H3>
                </View>
                <View style={{ marginBottom : deviceDimesions.Height*0.05}}>
                    <NeuBorderView
                        color = "#f5f5f5"
                        width = {deviceDimesions.width*0.8}
                        height = {50}
                        borderRadius = {20}
                        inset
                        containerStyle = {{
                            flexDirection : "row",
                        }}
                    >
                        <View style={{width : deviceDimesions.width*0.1, alignItems : "center"}}>
                            <Icon name="user" size={18} color="#666666" />
                        </View>
                        <View style={{width : deviceDimesions.width*0.66, alignItems : "flex-start"}}>
                            <TextInput 
                                placeholder = "Phone Number" 
                                value = {this.state.mobile} 
                                onChangeText = {(text)=>this.setState({mobile : text})}
                                maxLength = {10}
                                keyboardType='phone-pad' 
                                style={{textAlign : "left", width :deviceDimesions.width*0.66 }} 
                            />
                        </View>
                    </NeuBorderView>
                </View>
                <View>
                    <NeuButton
                        color = "#f5f5f5"
                        width = {deviceDimesions.width*0.5}
                        height = {40}
                        borderRadius = {20}
                        // active
                        onPress = {()=>this.onSubmit()}
                        containerStyle = {{
                            flexDirection : "row",
                            justifyContent : "space-evenly"
                        }}
                    >
                        <Text>Send</Text>
                        <NeuView
                                color = "#f5f5f5"
                                width = {25}
                                height = {25}
                                borderRadius = {20}
                                inset
                            >
                                    <Icon name="sign-in" color="#e62e00" />
                            </NeuView>
                    </NeuButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        width : deviceDimesions.width,
        justifyContent : "center",
        alignItems : "center"
    },
})