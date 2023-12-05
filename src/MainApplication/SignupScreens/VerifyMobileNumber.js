// VerifyMobileNumber
import { H3, View } from 'native-base';
import React from 'react';
import { Alert, BackHandler, Image,KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToLoginScreen, goToPreviousScreen, goToUploadPhotoAndVideoSignScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import MobileOTPInput from '../../component/MobileOTPInput/MobileOTPInput';
import MobileNumberWithCountryCodeInput from '../../component/MobileNumberWithCountryCodeInput/MobileNumberWithCountryCodeInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkMobileAlreadyExist, GetAllCountryCode, GetMemberDetail,  LoginWithOTPVerificationAPI, ResendOTP, UpdateNewMobileNumber } from '../../helper/API_Call/API_Call';
import { ValidateMobileNumber } from '../../helper/Validations/Validations';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { Linking } from 'react-native';

export default class VerifyMobileNumber extends React.Component{
    constructor(props){
        super(props);
        this.digit1 = React.createRef();
        this.digit2 = React.createRef();
        this.digit3 = React.createRef();
        this.digit4 = React.createRef();
        this.state = {
            signup_token : '',
            LoaderProperties : {
                isLoading : false,
                LoadingTitle : ""
            },
            CountryCodeArr : [],
            showEditNumberField : false,
            mobileNumber : "",
            updatedCountryCode : "",
            selectedCountryCode : "",
            mobileNumberUpdated : "",
            DigitOne : '',
            DigitTwo : '',
            DigitThree : '',
            DigitFour : '',
            userName : '',
            happyWeddings_Id : '',
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

    backAction = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }
        else{
            Alert.alert("", "Skip registration process?", [
                { text: "No", onPress: () => null },
                { text: "YES", onPress: () => goToLoginScreen() }
            ]);
            return true;
        }
        };  

    async componentDidMount(){
        
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

        const signup_token = await AsyncStorage.getItem('auth_token_registration');
        this.setState({ signup_token, mobileNumber : await AsyncStorage.getItem('mobile_registration'), updatedCountryCode : await AsyncStorage.getItem('country_code_registration'), selectedCountryCode : await AsyncStorage.getItem('country_code_registration'), userName : await AsyncStorage.getItem('first_name_registration')})
       
        //Meber_Details_Api_Calling
        GetMemberDetail('', this.state.signup_token).then(res=>{
            let response = res
            console.log(response.data.data.member_profile_id)
            this.setState({happyWeddings_Id : response.data.data.member_profile_id})
        })
        
        GetAllCountryCode().then(res=>{
            let response = res;
            let modifiedObj = {};
                let modifiedArr = [];
                response.data.map((el,i)=>{
                    modifiedObj = {
                        code : el.phonecode,
                        name : el.name
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({CountryCodeArr : modifiedArr})
        })
    }

    onNextPress(){
        goToUploadPhotoAndVideoSignScreen()
        if(this.state.mobileNumber && this.state.DigitOne && this.state.DigitTwo && this.state.DigitThree && this.state.DigitFour){
            let reqObj = {
                mobile : this.state.mobileNumber,
                otp_val_one : this.state.DigitOne,
                otp_val_two : this.state.DigitTwo,
                otp_val_three : this.state.DigitThree,
                otp_val_four : this.state.DigitFour,
            }

            this.ToggleLoader("Loading...", true)

            LoginWithOTPVerificationAPI(reqObj)
            .then(res => {
                let response = res;
                     ToastAndroid.showWithGravityAndOffset(
                        'Verified successfully.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    this.ToggleLoader("", false)
                    goToUploadPhotoAndVideoSignScreen()
               
            })
            .catch(err => {
                let error = err
                console.log(error)
                this.ToggleLoader("", false)
            })
        }
        else{
            ToastAndroid.showWithGravityAndOffset(
                'Please Enter Correct OTP OR try Resend OTP if not recieved OTP.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }

    onResendPress(){
        ResendOTP(this.state.signup_token,this.state.mobileNumber)
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

    //EditMobileNumberAPICalling
    onEditMobileNumber(){
        if(ValidateMobileNumber(this.state.mobileNumberUpdated)){
            this.ToggleLoader("Updating...", true)
            checkMobileAlreadyExist(this.state.mobileNumberUpdated).then((res)=>{
                let response = res
                if(response.status == true){
                    ToastAndroid.showWithGravityAndOffset(
                        "Mobile Number Already Exists.",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );
                      this.ToggleLoader("", false)
                }
                else{
                     UpdateNewMobileNumber(this.state.mobileNumberUpdated)
                    .then(res=>{
                        let response = res;
                        console.log(response)
                        ToastAndroid.showWithGravityAndOffset(
                            "OTP has been sent to your updated mobile number.",
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                          );
                          this.ToggleLoader("", false)
                        this.setState({showEditNumberField : false, updatedCountryCode : this.state.selectedCountryCode, mobileNumber : this.state.mobileNumberUpdated})
                    })
                    .catch(err => {
                        let error = err
                        console.log(err)
                        this.ToggleLoader("", false)
                    })
                }
            })
        }
        else{
            ToastAndroid.showWithGravityAndOffset(
                "Invalid Mobile Number",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        
    }


  render(){
    return(
      <View style={styles.container}>
          <KeyboardAvoidingView>
            <StatusBar
                backgroundColor = "rgba(0,0,0,0)"
                barStyle = "dark-content"
            />
           
           {/* Loader */}
           <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText = {this.state.LoaderProperties.LoadingTitle} />

            {/* Screen Content */}
            <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps = "always" contentContainerStyle={styles.HeaderContainer}>
                 {/* Header With Progress bar and screen title */}
                <View style={{height : deviceDimesions.Height*0.15}}>
                    <SignupFormHeader 
                        progressValue={0.64} 
                        progressBarTotalWidth={deviceDimesions.width*0.9}
                        backIcon = {false}
                        onBackPress = {()=>goToPreviousScreen(this)}
                        ScreenLogoAndTitle = {true}
                    />
                </View>

                <View style={styles.contentContainer}>

                    <View style={styles.userImageContainer}>
                        <Image source={ImagesPathVariable.DummyUserSmall} />
                    </View>

                    {/* Text for guiding the user to enter OTP */}
                    <View style={styles.textContainer}>
                            <H3>Hi, {this.state.userName}</H3>
                            <Text style={{marginTop : deviceDimesions.Height*0.02, opacity : 0.7}}>Please verify your mobile number</Text>
                            <Text style={{ opacity : 0.7}}>one time password has been sent to your number</Text>
                            <Text style={{marginTop : deviceDimesions.Height*0.02, color : "red", fontSize : 20}}>01:36</Text>
                            <TouchableOpacity onPress={()=>this.onResendPress()}>
                                <Text style={{marginTop : deviceDimesions.Height*0.01, opacity : 0.7}}>Resend ?</Text>
                            </TouchableOpacity>
                    </View>

                    {/* Input OTP Box */}
                    <View style={styles.OTPInputContainer}>
                        <MobileOTPInput autoFocused={true} inputRef={this.digit1} onInputChange ={()=>this.digit2.current.focus()} onChangeText = {(text)=>this.setState({DigitOne : text})} />
                        <MobileOTPInput inputRef={this.digit2} onInputChange ={()=>this.digit3.current.focus()} onChangeText = {(text)=>this.setState({DigitTwo : text})} />  
                        <MobileOTPInput inputRef={this.digit3} onInputChange ={()=>this.digit4.current.focus()} onChangeText = {(text)=>this.setState({DigitThree : text})} />
                        <MobileOTPInput inputRef={this.digit4} onInputChange ={()=>null} onChangeText = {(text)=>this.setState({DigitFour : text})} />
                    </View> 

                    {/* Edit Number Toggle Field */}
                        {/* Edit Number Button */}
                        <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.03, marginLeft : deviceDimesions.width*0.07 }}>
                            <Text style={{opacity : 0.7, marginRight : 10, fontSize : 18}}>Edit Number</Text>
                            <TouchableOpacity onPress={()=>this.setState({showEditNumberField : !this.state.showEditNumberField})}>
                                <Icon name="pencil" color="red" size={18} />
                            </TouchableOpacity>
                        </View>
                    {
                        this.state.showEditNumberField ?
                            // render mobile number input field to edit
                            <View>
                                <MobileNumberWithCountryCodeInput 
                                    placeholderText="Enter your mobile number" 
                                    CountryCodeArr = {this.state.CountryCodeArr}
                                    mobileNumber={this.state.mobileNumberUpdated} 
                                    mobileNumberChangeHandler={(text)=>{this.setState({mobileNumberUpdated : text})}} 
                                    selectedCountryCode={this.state.selectedCountryCode} 
                                    onCountryCodeChange={(i, item)=>{this.setState({selectedCountryCode : item.code})}}  
                                />
                                <View style={{paddingVertical : deviceDimesions.Height*0.01, alignSelf : "center"}}>
                                    <Text style={{fontSize : 12, opacity : 0.7}}>Your mobile number is : {this.state.updatedCountryCode ? this.state.updatedCountryCode : this.state.selectedCountryCode} {this.state.mobileNumber}</Text>
                                </View>
                                <View style={{marginTop : deviceDimesions.Height*0.02}}>
                                    <SubmitAndNextButton
                                        buttonTitle = "Edit"
                                        buttonIcon = {<Icon name="chevron-right" color="red" />}
                                        onSubmitPress = {()=>this.onEditMobileNumber()}
                                    />
                                </View>
                            </View>
                            :
                            
                            <View style={{marginTop : deviceDimesions.Height*0.02}}>
                                <SubmitAndNextButton
                                    buttonTitle = "Verify Now"
                                    buttonIcon = {<Icon name="chevron-right" color="red" />}
                                    onSubmitPress = {()=>this.onNextPress()}
                                />

                                <View style={{width : deviceDimesions.width*0.7, alignSelf : 'center', marginTop : deviceDimesions.Height*0.06}}>
                                    <Text style={{width : deviceDimesions.width*0.7, alignSelf : 'center'}}>Unable to recieve OTP on your mobile phone</Text>
                                    <TouchableOpacity 
                                        onPress={()=> Linking.openURL(`whatsapp://send?text=Hello, I'm ${this.state.userName}, ${this.state.happyWeddings_Id}. I wanted to verify my mobile number. &phone=+91 8943000723`)}
                                        style={{width : deviceDimesions.width*0.7, alignSelf : 'center', marginTop : 10, flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center'}}
                                    >
                                        <Icon name="whatsapp" color="green" size={24} />
                                        <Text style={{width : deviceDimesions.width*0.5, alignSelf : 'center', color : "red", borderBottomWidth : 0.5}}>Contact us to verify your number over Whatsapp</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                </View>
            </ScrollView>
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
        justifyContent : "center",
        backgroundColor : "#ffffff",
    },
    background: {
        resizeMode : 'cover',
        height: '100%',
      },
    HeaderContainer : {
        padding : 10,
    },
    contentContainer : {
        padding : 10,
    },
    userImageContainer : {
        alignItems : "center",
    },
    textContainer : {
        alignItems : "center",
        marginTop : deviceDimesions.Height*0.04,
        justifyContent : "space-evenly",
    },  
    OTPInputContainer :{
        flexDirection : 'row', 
        marginTop : deviceDimesions.Height*0.03, 
        justifyContent : "space-around",
        padding : 10
    },
  });