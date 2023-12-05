// LoginWithOTPVerification

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { H3, View } from 'native-base';
import React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import MobileOTPInput from '../../component/MobileOTPInput/MobileOTPInput';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToChangePasswordScreen, goToDrawerScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import {LoginWithOTPVerificationAPI, ResendOTP} from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import messaging from '@react-native-firebase/messaging';

export default class LoginWithOTPVerification extends React.Component{
    constructor(props){
        super(props);
        this.digit1 = React.createRef();
        this.digit2 = React.createRef();
        this.digit3 = React.createRef();
        this.digit4 = React.createRef();
        this.state = {
            showEditNumberField : false,
            mobileNumber : '',
            DigitOne : '',
            DigitTwo : '',
            DigitThree : '',
            DigitFour : '',
            LoaderProperties : {
                isLoading : false,
                LoadingTitle : ""
            },
            deviceToken : '',
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

    focusInput = (reference) => {
        reference.current.focus()
    }

    componentDidMount(){
        let mobile_number = this.props.route.params.MobileNumber
        messaging()
        .getToken()
        .then(token => {
            this.setState({deviceToken : token})
        });
    }
    
    async onNextPress(){
       
        let reqObj = {
            mobile : this.props.route.params.MobileNumber,
            otp_val_one : this.state.DigitOne,
            otp_val_two : this.state.DigitTwo,
            otp_val_three : this.state.DigitThree,
            otp_val_four : this.state.DigitFour,
            device_token : this.state.deviceToken
        }

        if(!this.state.DigitOne && !this.state.DigitTwo && !this.state.DigitThree && !this.state.DigitFour){
            ToastAndroid.showWithGravityAndOffset(
                'Enter The OTP sent to your mobile number.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else{
            this.ToggleLoader("Loading...", true)
            LoginWithOTPVerificationAPI(reqObj)
            .then(async(res) => {
                let response = res;
                console.log(response.data)
                await AsyncStorage.setItem('user_data' , JSON.stringify(response.data))
                await AsyncStorage.setItem('access_token',response.data.auth_token);
                await AsyncStorage.setItem('isLoggedIn','true');
                goToDrawerScreen()
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                    'Logged in successfully.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            })
            .catch(err => {
                let error = err
                console.log(error + "...................fsdfsdfsff")
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                    "Please Enter Correct OTP.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            })
        }

    }

    onResendPress(){
        ResendOTP(this.props.route.params.MobileNumber)
        .then(res => {
            let response = res
            console.log(response)
            ToastAndroid.showWithGravityAndOffset(
                'OTP Sent to your mobile number.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        })
        .catch(err => {
            let error = err
            console.log(error)
            ToastAndroid.showWithGravityAndOffset(
                'Please try again later.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        })
    }

  render(){
    return(
        <View style={styles.container}>
            {/* Loader */}
            <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText = {this.state.LoaderProperties.LoadingTitle} />
            <KeyboardAvoidingView>
                <View style={{alignItems : "center"}}>
                    <Image source={ImagesPathVariable.LoginLogo} />
                </View>
                <View style={{ marginTop : deviceDimesions.Height*0.05, alignItems : "center"}}>
                    <H3 style={{ color:"red"}}>Login With OTP</H3>
                </View>
                <View style={{ marginTop : deviceDimesions.Height*0.05, alignItems : "center", flexDirection : "row", justifyContent : "space-evenly"}}>
                        <MobileOTPInput autoFocused={true} inputRef={this.digit1} onInputChange ={()=>this.digit2.current.focus()} onChangeText = {(text)=>this.setState({DigitOne : text}, console.log(this.state.DigitOne))} />
                        <MobileOTPInput inputRef={this.digit2} onInputChange ={()=>this.digit3.current.focus()} onChangeText = {(text)=>this.setState({DigitTwo : text}, console.log(this.state.DigitTwo))} />  
                        <MobileOTPInput inputRef={this.digit3} onInputChange ={()=>this.digit4.current.focus()} onChangeText = {(text)=>this.setState({DigitThree : text}, console.log(this.state.DigitThree))} />
                        <MobileOTPInput inputRef={this.digit4} onInputChange ={()=>null} onChangeText = {(text)=>this.setState({DigitFour : text}, console.log(this.state.DigitFour))} />
                </View>
                <View style={{ marginTop : deviceDimesions.Height*0.05, alignItems : "center"}}>
                    <NeuButton
                        color = "#f5f5f5"
                        width = {deviceDimesions.width*0.5}
                        height = {40}
                        borderRadius = {20}
                        onPress = {()=>this.onNextPress()}
                        containerStyle = {{
                            flexDirection : "row",
                            justifyContent : "space-evenly"
                        }}
                    >
                        <Text>Submit</Text>
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
                <View  style={{ marginTop : deviceDimesions.Height*0.03, alignItems : "center"}}>
                        <Text style={{opacity : 0.7}}>Didn't recieve code?</Text>
                </View>
                <View  style={{ marginTop : deviceDimesions.Height*0.03, alignItems : "center"}}>
                         <TouchableOpacity onPress={()=>this.onResendPress()}>
                             <Text style={{color : "red"}}>Resend Now</Text>
                        </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        width : deviceDimesions.width,
        justifyContent : "center"
    },
  });