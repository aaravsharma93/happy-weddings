import { H2 } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import { NeuButton, NeuView } from 'react-native-neu-element';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToDrawerScreen, goToLoginScreen, goToPreviousScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { LoginWithUsernamePassword } from '../../helper/API_Call/API_Call';
import { ToastAndroid } from 'react-native';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import messaging from '@react-native-firebase/messaging';

export default class WelcomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName : '',
            LoaderProperties : {
                isLoading : false,
                LoadingTitle : "",
            },
            deviceToken : "",
        }
    }

    async componentDidMount(){
        this.setState({userName : await AsyncStorage.getItem('first_name_registration')})

        messaging()  //Fcm_token
        .getToken()
        .then(token => {
            this.setState({deviceToken : token})
        });
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

    async onSignupContinuePress(){
        let reqObj = {
            username : await AsyncStorage.getItem('user_email'),
            password : await AsyncStorage.getItem('user_password'),
            device_token : this.state.deviceToken
        }
        this.ToggleLoader('Loading...', true)
        this.setState({isSignUpMessage : false})
        await LoginWithUsernamePassword(reqObj).then(async(res)=>{
            let response = res
            console.log(JSON.stringify(response.data))
            if(response.data.status){
                AsyncStorage.setItem('user_data' , JSON.stringify(response.data))
                AsyncStorage.setItem('access_token',response.data.auth_token);
                AsyncStorage.setItem('isLoggedIn','true');
                goToDrawerScreen()
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                    'Logged in successfully.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else{
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
            }
        }).catch(err=>{
            let error = err
            console.log(JSON.stringify(error))
            this.ToggleLoader("", false)
        })

    }

    render(){
        return(
            <View style={styles.container}>
                {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText = {this.state.LoaderProperties.LoadingTitle} />

                <View style={{height : deviceDimesions.Height*0.15}}>
                    <SignupFormHeader
                        progressValue={1} 
                        progressBarTotalWidth={deviceDimesions.width*0.9}
                        backIcon = {false}
                        onBackPress = {()=>goToPreviousScreen(this)}
                    />
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.textAndLogoContainer}>
                        <Image source={ImagesPathVariable.LoginLogo} />
                        <View style={{marginTop : deviceDimesions.Height*0.02, marginBottom : deviceDimesions.Height*0.02}}>
                            <NeuView 
                                color = "#f5f5f5"
                                width = {deviceDimesions.width*0.2}
                                height = {deviceDimesions.Height*0.1}
                                borderRadius = {40}
                            >
                                <Image source={IconsPathVariable.CompleteIcon} />
                            </NeuView>
                        </View>
                            <H2>Hi {this.state.userName}</H2>
                            <Text style={styles.smallText}>Thank you for registering with us. One of our happy</Text>
                            <Text style={styles.smallText}>wedding assistant will get in touch with you</Text>
                            <Text style={styles.smallText}>shortly for verification.</Text>
                    </View>
                    <View style={styles.contactContainer}>
                        <View style={styles.textWithIcon}>
                            <NeuButton
                                color="#f5f5f5"
                                width = {deviceDimesions.width*0.1}
                                height = {deviceDimesions.Height*0.05}
                                borderRadius = {20}
                                onPress={() => Linking.openURL('mailto:care@happyweddings.com') }
                            >
                                <Image source={IconsPathVariable.EmailIcon} />
                            </NeuButton>
                            <Text style={{marginLeft : 20,fontWeight : 'bold', opacity : 0.8}}>care@happyweddings.com</Text>
                        </View>

                        <View style={styles.phoneNumberContainer}>
                            <View style={styles.textWithIcon}>
                                <NeuButton
                                    color="#f5f5f5"
                                    width = {deviceDimesions.width*0.1}
                                    height = {deviceDimesions.Height*0.05}
                                    borderRadius = {20}
                                    onPress = {()=> Linking.openURL(`tel:1800 1237 80036`) }
                                >
                                    <Image source={IconsPathVariable.PhoneIcon} />
                                </NeuButton>
                                <Text style={{marginLeft : 5,fontWeight : 'bold', opacity : 0.8}}>1800 1237 80036</Text>
                            </View>
                            <View style={styles.textWithIcon}>
                                <NeuButton
                                    color="#f5f5f5"
                                    width = {deviceDimesions.width*0.1}
                                    height = {deviceDimesions.Height*0.05}
                                    borderRadius = {20}
                                    onPress = {()=> Linking.openURL('whatsapp://send?text=hello&phone=+91 8943000723') }
                                >
                                    <Icon name="whatsapp" color="green" size = {24} />
                                </NeuButton>
                                <Text style={{marginLeft : 5,fontWeight : 'bold', opacity : 0.8}}>+91 8943000723</Text>
                            </View>
                        </View>
                    </View>
                                        
                    </View>
                    <SubmitAndNextButton
                        buttonTitle = "Login"
                        buttonIcon = {<Icon name="chevron-right" color="red" />}
                        onSubmitPress = {()=>this.onSignupContinuePress()}
                        
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        width : deviceDimesions.width,
        backgroundColor : "#ffffff"
    },
    contentContainer : {
        justifyContent : "center",
    },
    textAndLogoContainer : {
        alignItems : "center"
    },
    smallText : {
        opacity : 0.7,
        marginTop : deviceDimesions.Height*0.005,
        fontSize : 14
    },
    contactContainer : {
        marginTop : deviceDimesions.Height*0.02,
    },
    textWithIcon : {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center"
    },
    phoneNumberContainer : {
        flexDirection : "row",
        justifyContent : "space-around",
        marginTop : deviceDimesions.Height*0.02,
        marginBottom : deviceDimesions.Height*0.03
    },
    goToLogInButtonContainer : {

    }
})