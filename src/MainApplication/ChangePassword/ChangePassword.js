// ChangePassword

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
} from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToForgetPasswordVerificationScreen, goToLoginScreen, goToLoginWithOTPVerificationScreen, goToPreviousScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ToastAndroid } from 'react-native';
import {ChangePasswordAPI} from '../../helper/API_Call/API_Call'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChangePassword extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hideOldPassword : true,
            hideNewPassword : true,
            hideConfirmPassword : true,
            access_token : '',
            oldPassword : '',
            newPassword : '',
            confirmPassword : '',
        }
    }

    async onSubmitPress(){
        if(!this.state.oldPassword){
            ToastAndroid.showWithGravityAndOffset(
                'Please Enter Old Password',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
                );
        }
        else if(!this.state.newPassword){
            ToastAndroid.showWithGravityAndOffset(
                'Please Enter New Password',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
                );
        }
        else if(!this.state.confirmPassword){
            ToastAndroid.showWithGravityAndOffset(
                'Please Confirm Password',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
                );
        }
        else if(!(this.state.newPassword == this.state.confirmPassword)){
            ToastAndroid.showWithGravityAndOffset(
                'New password and confirm password do not match.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
                );
        }
        else{
            try {
                const access_token = await AsyncStorage.getItem('access_token');
                this.setState({ access_token });
                let PasswordObj = {
                    newPassword : this.state.newPassword,
                    currentPassword : this.state.oldPassword
                }
                ChangePasswordAPI(this.state.access_token,PasswordObj)
                .then(res=>{
                    let response = res;
                    // console.log(response);
                    this.forceUpdate()
                    ToastAndroid.showWithGravityAndOffset(
                        'Password Updated Successfully.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                        );
                })
                .catch(err => {
                    let error = err;
                    ToastAndroid.showWithGravityAndOffset(
                        'Please Try again later.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                        );
                })
            }
            catch{

            }
            
        }

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{ marginBottom : deviceDimesions.Height*0.05, alignItems : "center"}}>
                    <Image source={ImagesPathVariable.LoginLogo} />
                </View>
                <View style={{ marginBottom : deviceDimesions.Height*0.05, alignItems : "center"}}>
                    <H3>Change Password</H3>
                </View>
                <View style={{ marginBottom : deviceDimesions.Height*0.05, alignItems : "center"}}>
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
                            <Icon name="key" size={18} color="#666666" />
                        </View>
                        <View style={{width : deviceDimesions.width*0.5, alignItems : "flex-start"}}>
                            <TextInput value={this.state.oldPassword} onChangeText={(text)=>this.setState({oldPassword : text})} placeholder = "Old Password" secureTextEntry = {this.state.hideOldPassword}  style={{textAlign : "left", width :deviceDimesions.width*0.5 }} />
                        </View>
                        <View style={{width : deviceDimesions.width*0.1, alignItems : "center"}}>
                            <TouchableOpacity onPress={()=>{this.setState({hideOldPassword : !this.state.hideOldPassword})}}>
                                <Icon  name={this.state.hideOldPassword ? "eye" : "eye-slash"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </NeuBorderView>
                </View>
                
                <View style={{ marginBottom : deviceDimesions.Height*0.05, alignItems : "center"}}>
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
                            <Icon name="key" size={18} color="#666666" />
                        </View>
                        <View style={{width : deviceDimesions.width*0.5, alignItems : "flex-start"}}>
                            <TextInput value={this.state.newPassword} onChangeText={(text)=>this.setState({newPassword : text})} placeholder = "New Password" secureTextEntry = {this.state.hideNewPassword}  style={{textAlign : "left", width :deviceDimesions.width*0.5 }} />
                        </View>
                        <View style={{width : deviceDimesions.width*0.1, alignItems : "center"}}>
                            <TouchableOpacity onPress={()=>{this.setState({hideNewPassword : !this.state.hideNewPassword})}}>
                                <Icon  name={this.state.hideNewPassword ? "eye" : "eye-slash"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </NeuBorderView>
                </View>
                
                <View style={{ marginBottom : deviceDimesions.Height*0.05, alignItems : "center"}}>
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
                            <Icon name="key" size={18} color="#666666" />
                        </View>
                        <View style={{width : deviceDimesions.width*0.5, alignItems : "flex-start"}}>
                            <TextInput value={this.state.confirmPassword} onChangeText={(text)=>this.setState({confirmPassword : text})} placeholder = "Confirm Password" secureTextEntry = {this.state.hideConfirmPassword}  style={{textAlign : "left", width :deviceDimesions.width*0.5 }} />
                        </View>
                        <View style={{width : deviceDimesions.width*0.1, alignItems : "center"}}>
                            <TouchableOpacity onPress={()=>{this.setState({hideConfirmPassword : !this.state.hideConfirmPassword})}}>
                                <Icon  name={this.state.hideConfirmPassword ? "eye" : "eye-slash"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </NeuBorderView>
                </View>
                
                <View style={{alignItems : "center"}}>
                    <NeuButton
                        color = "#f5f5f5"
                        width = {deviceDimesions.width*0.5}
                        height = {40}
                        borderRadius = {20}
                        // active
                        onPress = {()=>this.onSubmitPress()}
                        containerStyle = {{
                            flexDirection : "row",
                            justifyContent : "space-evenly"
                        }}
                    >
                        <Text>Change Password</Text>
                        <NeuBorderView
                                color = "#f5f5f5"
                                width = {35}
                                height = {35}
                                borderRadius = {20}
                                inset
                            >
                                    <Icon name="sign-in" color="#e62e00" />
                            </NeuBorderView>
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
    },
})