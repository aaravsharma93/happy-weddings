// ForgetPassword

import { H2, H3 } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ForgetPasswordAPI} from '../../helper/API_Call/API_Call';
import { ToastAndroid } from 'react-native';
import { ValidateEmail, ValidateMobileNumber } from '../../helper/Validations/Validations';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';

export default class ForgetPassword extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            LoaderProperties : {
                isLoading : false,
                LoadingTitle : ""
            },
            email_mobile : "",
            message : "",
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

    onEmail_PasswordSubmit = () =>{
        if(this.state.email_mobile !== ""){
            if(ValidateEmail(this.state.email_mobile) || ValidateMobileNumber(this.state.email_mobile)){
                this.ToggleLoader("Loading...", true)
                ForgetPasswordAPI(this.state.email_mobile).then(res=>{
                    let response = res;
                    console.log(response.data)
                    this.ToggleLoader("", false)
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                })
                .catch(err =>{
                    let error = err;
                    console.log(error)
                    this.ToggleLoader("", false)
                        ToastAndroid.showWithGravityAndOffset(
                        error.email_mobile,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                })
            }
            else{
                ToastAndroid.showWithGravityAndOffset(
                    'Email_Mobile-number Invalid',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
            }
        }
        else{
            ToastAndroid.showWithGravityAndOffset(
                'Email_Mobile-number can not be empty.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            return false
        }
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
                    <H3 style={{ color:"red"}}>Forgot Password ?</H3>
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
                        <View style={{width : deviceDimesions.width*0.66, alignItems : "center"}}>
                            <TextInput placeholder = "Email or Phone" keyboardType='email-address' value={this.state.email_mobile} onChangeText = {(text)=>{this.setState({email_mobile : text})}} />
                        </View>
                    </NeuBorderView>
                </View>
                <View style={{ marginBottom : deviceDimesions.Height*0.05, alignItems : 'center'}}>
                    {
                        this.state.message !== "" ? <Text style ={{color : "red", fontSize : 12}}>{this.state.message}</Text> : null 
                    }
                </View>
                <View>
                    <NeuButton
                        color = "#f5f5f5"
                        width = {deviceDimesions.width*0.5}
                        height = {40}
                        borderRadius = {20}
                        onPress = {()=>this.onEmail_PasswordSubmit()}
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