import React, { Component, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, TouchableOpacity, KeyboardAvoidingView, ImageBackground, Modal, ScrollView, TextInput } from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import { H2, H3 } from 'native-base';
import { CustomImagePicker } from '../../component/ImagePicker/ImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import { checkAllTrustBadges, ResendOTP, UpdateFacebookBadge, uploadEducationSalaryBadge, uploadIdentityBadge, uploadProfilePictureBadge } from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import MobileOTPInput from '../../component/MobileOTPInput/MobileOTPInput';
import { BaseURL } from '../../API_config/BaseURL';
import { NeuBorderView } from 'react-native-neu-element';
import { Linking } from 'react-native';

export default function TrustBadgesSliderScreen() {
  
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [Token, setToken] = useState()
    const [showProfilePictureBadgeUploadModal, setShowProfilePictureBadgeUploadModal] = useState(false)
    const [showIdentityBadgeUploadModal, setShowIdentityBadgeUploadModal] = useState(false)
    const [showEducationBadgeUploadModal, setShowEducationBadgeUploadModal] = useState(false)
    const [userData, setUserData] = useState()
    const [ DigitOne , setDigitOne ] = useState();
    const [ DigitTwo , setDigitTwo ] = useState();
    const [ DigitThree , setDigitThree ] = useState();
    const [ DigitFour , setDigitFour ] = useState();

    const [UserFacebookURL, setUserFacebookURL] = useState();
    const [UserInstagramURL, setUserInstagramURL] = useState();
    const [UserLinkedInURL, setUserLinkedInURL] = useState();
    this.digit1 = React.createRef();
    this.digit2 = React.createRef();
    this.digit3 = React.createRef();
    this.digit4 = React.createRef();
    useEffect(() => {
        (async () => {
            let access_token = await AsyncStorage.getItem('access_token');
            console.log(access_token,"access_tokenaccess_token")
            setToken(access_token);
            
            let userData = JSON.parse(await AsyncStorage.getItem('user_data'));
            setUserData(userData);
            console.log(userData,"userData--------")
            // console.log(userData)
            CheckTrustBadgeStatus()
        })()
    })
    const [sliderDataArr, setSliderDataArr] = useState([
        {
            headerImage: IconsPathVariable.TrustedBadgeNumberingIcon1,
            title: "Photo Verification",
            type: "image",
            Image: ImagesPathVariable.TrustedBadgeVerificationSliderImages1,
            description: "",
            bottomCardImage: ImagesPathVariable.TrustBadgeBottomMessageImage1,
            bottomCardDescription: "Let members see you and trust you. ",
            updateStatus: "Not Done",
            UpdateStatusIcon: <Icon name="exclamation" color="#ff5c21" size={20} />,
            AttachButton: <TouchableOpacity
                onPress={() => setShowProfilePictureBadgeUploadModal(true)}
                style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, borderColor: "#e88e88", borderWidth: 1, backgroundColor: "#fefefe", paddingVertical: deviceDimesions.Height * 0.015, paddingHorizontal: deviceDimesions.width * 0.05, width: deviceDimesions.width * 0.45, elevation: 5 }}
            >
                <Icon name="file" color="#ff8d08" size={18} />
                <Text style={{ fontWeight: '700' }}>Upload a Photo</Text>
            </TouchableOpacity>
        },
        {
            facebookURL: "",
            headerImage: IconsPathVariable.TrustedBadgeNumberingIcon2,
            title: "Social Media Verification",
            type: "social",
            Image: ImagesPathVariable.TrustedBadgeVerificationSliderImages2,
            description: "Please give link to your facebook or instagram or Linkedin Id for verification.",
            bottomCardImage: ImagesPathVariable.TrustBadgeBottomMessageImage2,
            bottomCardDescription: "Please give link to your facebook or instagram or Linkedin Id for verification. ",
            updateStatus: "Not Done",
            UpdateStatusIcon: <Icon name="exclamation" color="#ff5c21" size={20} />,
            // AttachButton : ()=>null
            AttachButton: (UserFacebookURL, UserLinkedInURL, UserInstagramURL) => {
                return <TouchableOpacity
                onPress={() => SaveFacebookSocialBadge(UserFacebookURL, UserLinkedInURL, UserInstagramURL)}
                    style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, borderColor: "#e88e88", borderWidth: 1, backgroundColor: "#fefefe", paddingVertical: deviceDimesions.Height * 0.015, paddingHorizontal: deviceDimesions.width * 0.05, width: deviceDimesions.width * 0.3, elevation: 5 }}
                >
                    <Icon name="file" color="#ff8d08" size={18} />
                    <Text>Update</Text>
                </TouchableOpacity>
            },
        },
        {
            headerImage: IconsPathVariable.TrustedBadgeNumberingIcon3,
            title: "ID Verification",
            type: "image",
            Image: ImagesPathVariable.TrustedBadgeVerificationSliderImages3,
            description: "",
            bottomCardImage: ImagesPathVariable.TrustBadgeBottomMessageImage3,
            bottomCardDescription: "Let members be able to trust your Age and Name. Upload your valid National ID ( Driving license, passport copy or any other Govt issued ID card). This will not be shown to any other member and will be used for our verification purposes only.",
            updateStatus: "Not Done",
            UpdateStatusIcon: <Icon name="exclamation" color="#ff5c21" size={20} />,
            AttachButton: <TouchableOpacity
                onPress={() => setShowIdentityBadgeUploadModal(true)}
                style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, borderColor: "#e88e88", borderWidth: 1, backgroundColor: "#fefefe", paddingVertical: deviceDimesions.Height * 0.015, paddingHorizontal: deviceDimesions.width * 0.05, width: deviceDimesions.width * 0.5, elevation: 5 }}
            >
                <Icon name="file" color="#ff8d08" size={18} />
                <Text style={{ fontWeight: '700' }}>Upload Documents</Text>
            </TouchableOpacity>
        },
        {
            headerImage: IconsPathVariable.TrustedBadgeNumberingIcon4,
            title: "Mobile Number Verification",
            type: "mobile",
            Image: ImagesPathVariable.TrustedBadgeVerificationSliderImages4,
            description: "",
            bottomCardImage: ImagesPathVariable.TrustBadgeBottomMessageImage4,
            bottomCardDescription: "Let members see you and trust you. Let members see you and trust you. ",
            updateStatus: "Not Done",
            UpdateStatusIcon: <Icon name="exclamation" color="#ff5c21" size={20} />,
            AttachButton: <View style={{ width: deviceDimesions.width * 0.9, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center' }}>
                <TouchableOpacity
                   
                    style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, borderColor: "#e88e88", borderWidth: 1, backgroundColor: "#fefefe", paddingVertical: deviceDimesions.Height * 0.015, paddingHorizontal: deviceDimesions.width * 0.05, width: deviceDimesions.width * 0.4, elevation: 5 }}
                >
                    <Icon name="phone-alt" color="#ff8d08" size={18} />
                    <Text>Verify OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                     onPress={() => onNextPress()}
                    style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, borderColor: "#e88e88", borderWidth: 1, backgroundColor: "#fefefe", paddingVertical: deviceDimesions.Height * 0.015, paddingHorizontal: deviceDimesions.width * 0.05, width: deviceDimesions.width * 0.4, elevation: 5 }}
                >
                    <Icon name="phone-alt" color="#ff8d08" size={18} />
                    <Text>Resend</Text>
                </TouchableOpacity>
            </View>
        },
        {
            headerImage: IconsPathVariable.TrustedBadgeNumberingIcon5,
            title: "Education Verification",
            type: "image",
            Image: ImagesPathVariable.TrustedBadgeVerificationSliderImages5,
            description: "",
            bottomCardImage: ImagesPathVariable.TrustBadgeBottomMessageImage5,
            bottomCardDescription: "Please upload your education certificate and other relevant details. This will not be shown to other members and will be used for admin verification only",
            updateStatus: "Not Done",
            UpdateStatusIcon: <Icon name="exclamation" color="#ff5c21" size={20} />,
            AttachButton: <TouchableOpacity
                onPress={() => setShowEducationBadgeUploadModal(true)}
                style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, borderColor: "#e88e88", borderWidth: 1, backgroundColor: "#fefefe", paddingVertical: deviceDimesions.Height * 0.015, paddingHorizontal: deviceDimesions.width * 0.05, width: deviceDimesions.width * 0.5, elevation: 5 }}
            >
                <Icon name="file" color="#ff8d08" size={18} />
                <Text style={{ fontWeight: '700' }}>Upload Documents</Text>
            </TouchableOpacity>
        },
    ])
    const SaveFacebookSocialBadge   = async (UserFacebookURL, UserLinkedInURL, UserInstagramURL) => {
        let access_token = await AsyncStorage.getItem('access_token');

        console.log(access_token,"----------------------------------access_token---------------------")
        {
            // console.log(authToken)
            UpdateFacebookBadge(UserFacebookURL, UserLinkedInURL, UserInstagramURL,access_token).then(res => {
                let response = res;
                console.log(response ,"response.data")
                if (response.data.status) {

                    console.log(response.data.data ,"response.data")

                    CheckTrustBadgeStatus()
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
            })
        }


    }

    const onNextPress = async () => {
        if(userData.mobile && DigitOne && DigitTwo && DigitThree && DigitFour){
            let reqObj = {
                mobile : userData.mobile,
                otp_val_one : DigitOne,
                otp_val_two : DigitTwo,
                otp_val_three : DigitThree,
                otp_val_four : DigitFour,
            }

           console.log(reqObj,"reqObj--------------")

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
    const onResendPress = async () => {
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

    const CheckTrustBadgeStatus = async () => {
        await checkAllTrustBadges(Token).then(res => {
            let response = res;
            let sliderDataArrClone = [...sliderDataArr]
            if (response.data.status) {
                let ProfilePictureStatus = response.data.trust_badge_status.find((el, i) => el.type == "photo")
                let educationStatus = response.data.trust_badge_status.find((el, i) => el.type == "education")
                let IdentityStatus = response.data.trust_badge_status.find((el, i) => el.type == "identity")
                let FacebookStatus = response.data.trust_badge_status.find((el, i) => el.type == "facebook")

                if (ProfilePictureStatus == 'undefined') {
                } else {

                    sliderDataArrClone[0].Image = { uri: BaseURL.DemoURL + ProfilePictureStatus.trust_badge_name }
                    sliderDataArrClone[0].updateStatus = ProfilePictureStatus.status
                    sliderDataArrClone[0].UpdateStatusIcon = ProfilePictureStatus.status == "PENDING" ? <Icon name="clock" color="#ffd43b" size={20} /> : <Icon name="check" color="#82b541" size={20} />
                }

                if (educationStatus == 'undefined') {
                } else {
                    sliderDataArrClone[4].updateStatus = educationStatus.status
                    sliderDataArrClone[4].UpdateStatusIcon = educationStatus.status == "PENDING" ? <Icon name="clock" color="#ffd43b" size={20} /> : <Icon name="check" color="#82b541" size={20} />
                }

                if (IdentityStatus == 'undefined') {
                } else {
                    sliderDataArrClone[2].updateStatus = IdentityStatus.status
                    sliderDataArrClone[2].UpdateStatusIcon = IdentityStatus.status == "PENDING" ? <Icon name="clock" color="#ffd43b" size={20} /> : <Icon name="check" color="#82b541" size={20} />
                }

                if (FacebookStatus == 'undefined') {
                } else {
                    sliderDataArrClone[1].updateStatus = FacebookStatus.status
                    sliderDataArrClone[1].UpdateStatusIcon = FacebookStatus.status == "PENDING" ? <Icon name="clock" color="#ffd43b" size={20} /> : <Icon name="check" color="#82b541" size={20} />
                    sliderDataArrClone[1].facebookURL = FacebookStatus.trust_badge_name
                }

                setSliderDataArr(sliderDataArrClone)
            } else {
            }

        })
    }
    // Profile Picture Badge Image Capture
    const ProfilePictureBadgeImageCapture = () => {
        setShowProfilePictureBadgeUploadModal(false)
        ImagePicker.openCamera({
            useFrontCamera: true,
            mediaType: 'photo',
        }).then(image => {
            uploadProfilePictureBadgeToServer(image)
        })
    }

    // Profile Picture Badge Image Pick
    const ProfilePictureBadgeImagePick = () => {
        setShowProfilePictureBadgeUploadModal(false)
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(image => {
            uploadProfilePictureBadgeToServer(image)
        })
    }

    // Identity Badge Image Capture
    const IdentityBadgeImageCapture = () => {
        setShowIdentityBadgeUploadModal(false)
        ImagePicker.openCamera({
            mediaType: 'photo',
        }).then(image => {
            console.log(image)
            uploadIdentityBadgeToServer(image)
        })
    }

    // Identity Badge Image Pick
    const IdentityBadgeImagePick = () => {
        setShowIdentityBadgeUploadModal(false)
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(image => {
            console.log(image)
            uploadIdentityBadgeToServer(image)
        })
    }

    // Education Badge Image Capture
    const EducationBadgeImageCapture = () => {
        setShowEducationBadgeUploadModal(false)
        ImagePicker.openCamera({
            mediaType: 'photo',
        }).then(image => {
            console.log(image)
            uploadEducationBadgeToServer(image)
        })
    }

    // Education Badge Image Pick
    const EducationBadgeImagePick = () => {
        setShowEducationBadgeUploadModal(false)
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(image => {
            console.log(image)
            uploadEducationBadgeToServer(image)
        })
    }


    // send profile picture badge image to server
    const uploadProfilePictureBadgeToServer = async (ProfilePicImg) => {
        await uploadProfilePictureBadge(ProfilePicImg, Token).then(res => {
            let response = res;
            if (response.data.status) {
                console.log(response.data)
                CheckTrustBadgeStatus()
                ToastAndroid.showWithGravityAndOffset(
                    'Profile Picture Badge Uploaded Successfully.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }).catch(err => {
            let error = err
        })
    }

    // send Identity badge image to server
    const uploadIdentityBadgeToServer = async (IdentityImg) => {
        await uploadIdentityBadge(IdentityImg, Token).then(res => {
            let response = res;
            console.log(response.data)
            if (response.data.status) {
                CheckTrustBadgeStatus()
                ToastAndroid.showWithGravityAndOffset(
                    'Thanks, document submitted for verification.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }).catch(err => {
            let error = err
        })
    }
    _renderItem = ({ item, index }) => {

        if (item.type == "image") {

            return (
                <View style={{ backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.9, width: deviceDimesions.width * 0.93, paddingHorizontal: deviceDimesions.width * 0.05, paddingVertical: deviceDimesions.width * 0.03, elevation: 5, borderRadius: 15, alignSelf: "center", marginVertical: deviceDimesions.Height * 0.015 }}>

                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ alignSelf: 'center', height: deviceDimesions.Height * 0.1, width: deviceDimesions.width * 0.15, marginVertical: deviceDimesions.Height * 0.01, paddingHorizontal: deviceDimesions.width * 0.02 }} source={item.headerImage} />
                        <ImageBackground source={ImagesPathVariable.TrustBadgesCardBackgroundImage} style={styles.linearGradient} imageStyle={{ resizeMode: 'stretch', borderRadius: 10 }}>
                            <Image source={item.Image} style={{ height: deviceDimesions.Height * 0.23, width: deviceDimesions.width * 0.5, }} />
                            <H3 style={{ color: "#ffffff", marginTop: -deviceDimesions.Height * 0.02 }}>{item.title}</H3>
                            <View style={{ position: 'absolute', left: deviceDimesions.width * 0.53, top: deviceDimesions.Height * 0.02, backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.06, width: deviceDimesions.width * 0.11, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                {item.UpdateStatusIcon}
                            </View>
                        </ImageBackground>

                        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                            {item.description ? <Text style={{ marginBottom: deviceDimesions.Height * 0.015, opacity: 0.7, alignSelf: 'center' }}>{item.description}</Text> : null}
                            <View style={{ backgroundColor: "#ffeae9", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.015, height: deviceDimesions.Height * 0.14, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <View>
                                    <Image source={item.bottomCardImage} style={{ height: deviceDimesions.Height * 0.14, width: deviceDimesions.width * 0.2 }} />
                                    <View style={{ position: 'absolute', left: deviceDimesions.width * 0.13, top: deviceDimesions.Height * 0.01, backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.04, width: deviceDimesions.width * 0.08, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                        {item.UpdateStatusIcon}
                                    </View>
                                </View>
                                <Text style={{ opacity: 0.5, fontSize: 14, width: deviceDimesions.width * 0.6 }}>{item.bottomCardDescription}</Text>
                            </View>
                            {item.AttachButton}
                        </View>
                    </View>
                </View>

            )
        }
        else if (item.type == "social") {

            {
                return (
                    <View style={{ backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.9, width: deviceDimesions.width * 0.9, paddingHorizontal: deviceDimesions.width * 0.05, paddingVertical: deviceDimesions.width * 0.03, elevation: 5, borderRadius: 15, alignSelf: "center", marginVertical: deviceDimesions.Height * 0.015 }}>

                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ alignSelf: 'center', height: deviceDimesions.Height * 0.1, width: deviceDimesions.width * 0.15, marginVertical: deviceDimesions.Height * 0.01, paddingHorizontal: deviceDimesions.width * 0.02 }} source={item.headerImage} />
                            <ImageBackground source={ImagesPathVariable.TrustBadgesCardBackgroundImage} style={styles.linearGradient} imageStyle={{ resizeMode: 'stretch', borderRadius: 10 }}>
                                <Image source={item.Image} style={{ height: deviceDimesions.Height * 0.23, width: deviceDimesions.width * 0.5, }} />
                                <H3 style={{ color: "#ffffff", marginTop: -deviceDimesions.Height * 0.02 }}>{item.title}</H3>
                                <View style={{ position: 'absolute', left: deviceDimesions.width * 0.53, top: deviceDimesions.Height * 0.02, backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.06, width: deviceDimesions.width * 0.11, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                    {item.UpdateStatusIcon}
                                </View>
                            </ImageBackground>
                            <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 5 }}>
                                <Text style={{ marginBottom: deviceDimesions.Height * 0.015, opacity: 0.7, }}>{item.description.slice(0, 50)}</Text>
                                <Text style={{ marginBottom: deviceDimesions.Height * 0.015, opacity: 0.7, alignSelf: 'center', marginTop: -10 }}>{item.description.slice(50)}</Text>
                                <View style={{ backgroundColor: "#ffeae9", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.01, height: deviceDimesions.Height * 0.1, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <View>
                                        <Image source={item.bottomCardImage} style={{ height: deviceDimesions.Height * 0.11, width: deviceDimesions.width * 0.18 }} />
                                        <View style={{ position: 'absolute', left: deviceDimesions.width * 0.13, top: deviceDimesions.Height * 0.01, backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.04, width: deviceDimesions.width * 0.08, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                            {item.UpdateStatusIcon}
                                        </View>
                                    </View>
                                    <NeuBorderView
                                        color="#f5f5f5"
                                        width={deviceDimesions.width * 0.6}
                                        height={50}

                                        borderRadius={20}
                                        inset
                                    >
                                        <TextInput
                                            placeholder="Facebook Profile URL"
                                            autoCapitalize="none"
                                            onChangeText={(text) => setUserFacebookURL(text)}
                                            value={UserFacebookURL}
                                            style={{ width: deviceDimesions.width * 0.55, textAlign: "left", fontStyle: 'normal' }}  
                                        />
                                    </NeuBorderView>
                                </View>
                                <View style={{ backgroundColor: "#ffeae9", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.01, height: deviceDimesions.Height * 0.1, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <View>
                                        <Image source={item.bottomCardImage} style={{ height: deviceDimesions.Height * 0.11, width: deviceDimesions.width * 0.18 }} />
                                        <View style={{ position: 'absolute', left: deviceDimesions.width * 0.13, top: deviceDimesions.Height * 0.01, backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.04, width: deviceDimesions.width * 0.08, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                            {item.UpdateStatusIcon}
                                        </View>
                                    </View>
                                    <NeuBorderView
                                        color="#f5f5f5"
                                        width={deviceDimesions.width * 0.6}
                                        height={50}
                                        borderRadius={20}
                                        inset
                                    >
                                        <TextInput
                                            placeholder="LinkedIn Profile URL"
                                            autoCapitalize="none"
                                            onChangeText={(text) => setUserLinkedInURL(text)}
                                            value={UserLinkedInURL}
                                            style={{ width: deviceDimesions.width * 0.55, textAlign: "left", fontStyle: 'normal' }}   
                                        />
                                    </NeuBorderView>
                                </View>
                                <View style={{ backgroundColor: "#ffeae9", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.01, height: deviceDimesions.Height * 0.1, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <View>
                                        <Image source={item.bottomCardImage} style={{ height: deviceDimesions.Height * 0.11, width: deviceDimesions.width * 0.18 }} />
                                        <View style={{ position: 'absolute', left: deviceDimesions.width * 0.13, top: deviceDimesions.Height * 0.01, backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.04, width: deviceDimesions.width * 0.08, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                            {item.UpdateStatusIcon}
                                        </View>
                                    </View>
                                    <NeuBorderView
                                        color="#f5f5f5"
                                        width={deviceDimesions.width * 0.6}
                                        height={50}
                                        borderRadius={20}
                                        inset
                                    >
                                        <TextInput
                                            placeholder="Instagram Profile URL"
                                            autoCapitalize="none"
                                            onChangeText={(text) => setUserInstagramURL(text)}
                                            value={UserInstagramURL}
                                            style={{ width: deviceDimesions.width * 0.55, textAlign: "left", fontStyle: 'normal' }}
                                        />
                                    </NeuBorderView>
                                </View>
                              
                                {item.AttachButton(UserFacebookURL, UserLinkedInURL, UserInstagramURL)}

                            </View>

                        </View>
                    </View>
                )
            }
        }
        else if (item.type == "mobile") {



            return (
                <View style={{ backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.9, width: deviceDimesions.width * 0.9, paddingHorizontal: deviceDimesions.width * 0.05, paddingVertical: deviceDimesions.width * 0.03, elevation: 5, borderRadius: 15, alignSelf: "center", marginVertical: deviceDimesions.Height * 0.015 }}>

                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ alignSelf: 'center', height: deviceDimesions.Height * 0.1, width: deviceDimesions.width * 0.15, marginVertical: deviceDimesions.Height * 0.01, paddingHorizontal: deviceDimesions.width * 0.02 }} source={item.headerImage} />
                        <ImageBackground source={ImagesPathVariable.TrustBadgesCardBackgroundImage} style={styles.linearGradient} imageStyle={{ resizeMode: 'stretch', borderRadius: 10 }}>
                            <Image source={item.Image} style={{ height: deviceDimesions.Height * 0.23, width: deviceDimesions.width * 0.5, }} />
                            <H3 style={{ color: "#ffffff", marginTop: -deviceDimesions.Height * 0.02 }}>{item.title}</H3>
                            <View style={{ position: 'absolute', left: deviceDimesions.width * 0.53, top: deviceDimesions.Height * 0.02, backgroundColor: "#ffffff", height: deviceDimesions.Height * 0.06, width: deviceDimesions.width * 0.11, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                {item.UpdateStatusIcon}
                            </View>
                        </ImageBackground>

                        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                            {item.description ? <Text style={{ marginBottom: deviceDimesions.Height * 0.015, opacity: 0.7, alignSelf: 'center' }}>{item.description}</Text> : null}
                            <View style={{ backgroundColor: "#ffeae9", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.015, height: deviceDimesions.Height * 0.15, borderRadius: 20, justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: deviceDimesions.width * 0.7 }}>
                                    {/* <MobileOTPInput autoFocused={true} inputRef={DigitOne} onInputChange={() => DigitTwo.current.focus()} onChangeText={(text) => null} />
                                    <MobileOTPInput inputRef={DigitTwo} onInputChange={() => DigitThree.current.focus()} onChangeText={(text) => null} />
                                    <MobileOTPInput inputRef={DigitThree} onInputChange={() => DigitFour.current.focus()} onChangeText={(text) => null} />
                                    <MobileOTPInput inputRef={DigitFour} onInputChange={() => null} onChangeText={(text) => null} /> */}

                        <MobileOTPInput autoFocused={true} inputRef={this.digit1} onInputChange ={()=>this.digit2.current.focus()} onChangeText = {(text)=> setDigitOne (text)} />
                        <MobileOTPInput inputRef={this.digit2} onInputChange ={()=>this.digit3.current.focus()} onChangeText = {(text)=>setDigitTwo(text)} />  
                        <MobileOTPInput inputRef={this.digit3} onInputChange ={()=>this.digit4.current.focus()} onChangeText = {(text)=>setDigitThree (text)} />
                        <MobileOTPInput inputRef={this.digit4} onInputChange ={()=>null} onChangeText = {(text)=> setDigitFour (text)} />
                                </View>
                            </View>
                           
                            {item.AttachButton}
                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginTop: deviceDimesions.Height * 0.06 }}>
                                <Text style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>Unable to recieve OTP on your mobile phone</Text>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(`whatsapp://send?text=Hello, I'm ${userInfo.userdata.Ranjeet}, ${userInfo.userdata.member_profile_id}. I wanted to verify my mobile number. &phone=+91 8943000723`)}
                                    style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                                >
                                    <Icon name="whatsapp" color="green" size={24} />
                                    <Text style={{ width: deviceDimesions.width * 0.5, alignSelf: 'center', color: "red", borderBottomWidth: 0.5 }}>Contact us to verify your number over WhatsApp.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </View>
            )
        }
    }
    // send Education badge image to server
    const uploadEducationBadgeToServer = async (EducationImg) => {
        await uploadEducationSalaryBadge(EducationImg, Token).then(res => {
            let response = res;
            if (response.data.status) {
                CheckTrustBadgeStatus()
                ToastAndroid.showWithGravityAndOffset(
                    'Thanks, document submitted for verification.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }).catch(err => {
            let error = err
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                <Carousel
                    data={sliderDataArr}
                    renderItem={this._renderItem}
                    sliderWidth={deviceDimesions.width}
                    itemWidth={deviceDimesions.width}
                    keyboardShouldPersistTaps='handled'
                    autoplay = {false}
                    

                />
            
            </ScrollView>
            {/* Upload Profile Picture Badge */}
            <CustomImagePicker
                pickerMode='image'
                pickerTitle="Upload Profile Picture Badge"
                CaptureImage={() => { ProfilePictureBadgeImageCapture() }}
                UploadImage={() => null}
                HideGalleryOption
                HideFacebookOption
                UploadImageFromFacebook={() => null}
                showImagePicker={showProfilePictureBadgeUploadModal}
                onPressOut={() => setShowProfilePictureBadgeUploadModal(false)}
            />

            {/* Upload Identity Badge */}
            <CustomImagePicker
                pickerMode='image'
                pickerTitle="Upload Identity Badge"
                CaptureImage={() => { IdentityBadgeImageCapture() }}
                UploadImage={() => { IdentityBadgeImagePick() }}
                UploadImageFromFacebook={() => null}
                HideFacebookOption
                showImagePicker={showIdentityBadgeUploadModal}
                onPressOut={() => setShowIdentityBadgeUploadModal(false)}
            />

            {/* Upload Education Badge */}
            <CustomImagePicker
                pickerMode='image'
                pickerTitle="Upload Education Badge"
                CaptureImage={() => { EducationBadgeImageCapture() }}
                UploadImage={() => { EducationBadgeImagePick() }}
                UploadImageFromFacebook={() => null}
                HideFacebookOption
                showImagePicker={showEducationBadgeUploadModal}
                onPressOut={() => setShowEducationBadgeUploadModal(false)}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: "#fcfcfc"
    },
    linearGradient: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.28,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'center'
    }
})