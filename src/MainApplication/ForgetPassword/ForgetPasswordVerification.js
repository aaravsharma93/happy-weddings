// ForgetPasswordVerification

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

export default class ForgetPasswordVerification extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEditNumberField : false
        }
    }

    onNextPress(){
        // navigate('VerifyMobileNumber')
    }

  render(){
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <View style={{alignItems : "center"}}>
                    <Image source={ImagesPathVariable.LoginLogo} />
                </View>
                <View style={{ marginTop : deviceDimesions.Height*0.05, alignItems : "center"}}>
                    <H3 style={{ color:"red"}}>Verification</H3>
                </View>
                <View style={{ marginTop : deviceDimesions.Height*0.05, alignItems : "center", flexDirection : "row", justifyContent : "space-evenly"}}>
                    <MobileOTPInput />
                    <MobileOTPInput />
                    <MobileOTPInput />
                    <MobileOTPInput />
                </View>
                <View style={{ marginTop : deviceDimesions.Height*0.05, alignItems : "center"}}>
                    <NeuButton
                        color = "#f5f5f5"
                        width = {deviceDimesions.width*0.5}
                        height = {40}
                        borderRadius = {20}
                        // active
                        // onPress = {()=>goToForgetPasswordVerificationScreen()}
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
                         <TouchableOpacity>
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
        // alignItems : "center",
        flex : 1,
        padding : 10,
        width : deviceDimesions.width,
        justifyContent : "center"
        // backgroundColor : "red"
        // height : deviceDimesions.Height,
    },
  });