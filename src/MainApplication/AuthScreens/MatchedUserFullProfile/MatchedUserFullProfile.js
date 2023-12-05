// MatchedUserFullProfile

import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground, ScrollView, Text, Modal, NativeModules, FlatList, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import RangeSlider from 'rn-range-slider';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import LinearGradient from 'react-native-linear-gradient';
import { goToAddPhotosOnRequestScreen, goToChatMessageScreen, goToDrawerViewAllMatchedUserScreen, goToMatchedUserProfileOverviewrScreen, goToPreviousScreen, goToTrustedBadgesScreen, goToUpgradeToPremiumScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';
import { Badge, H3 } from 'native-base';
import ImagesPathVariable from '../../../helper/ImagesPathVariable/ImagesPathVariable';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import StepIndicator from 'react-native-step-indicator';
import Carousel from 'react-native-snap-carousel';
import IconsPathVariable from '../../../helper/IconsPathVariable/IconsPathVariable';
import { BaseURL } from '../../../API_config/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddToShortlist, checkShortlistInterestSent, EducationDetailsOfLoggedInUser, GetKnowMeBetter, GetMemberAllGalleryPics, GetMemberCareerDetails, GetMemberDetail, GetSimilarProfiles, GetUserHobbiesAndInterests, getYouAndHer, RemoveFromShortlist, SendInterest } from '../../../helper/API_Call/API_Call';
import { SafeAreaView } from 'react-native';
import { Linking } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import { push } from '../../../helper/RootNavigator/RootNavigator';
import { SpeedDial } from 'react-native-elements';
import PulseLoader from 'react-native-pulse-loader';
import LoaderOnButtonPress from '../../../component/LoaderOnButtonPress/LoaderOnButtonPress';

export default class MatchedUserFullProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: "",
            MatchedUserData: "",
            isLoading: false,
            Membership_type: "",
            Membership_typedatashow: null,
            SimilarProfilesArr: [],
            CareerDataArr: [],
            MemberEducationDataArr: [],
            KnowMeBetterArr: [],
            YouAndHerArr: [],
            HobbiesAndInterests: null,
            userGalleryImages: null,
            isShortlisted: false,
            interestSent: false,
            Membership_type_contact: true,

        }
    }

    async setAsyncState(name, value) {
        this.setState({ [name]: value })
    }

    async componentDidMount() {

        this.setState({ isLoading: true })
        const access_token = await AsyncStorage.getItem('access_token');
        this.setState({ access_token });

        await GetMemberDetail(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            console.log(response.data.data, "Notification_Dta")
            this.setState({ MatchedUserData: response.data.data })
        })

        // Get Self Data
        await GetMemberDetail("", this.state.access_token).then(res => {
            let response = res;
            this.setState({ Membership_type: response.data.data.membership })
            this.setState({ Membership_type_showdata: true })
        })
            .catch(err => {
                let error = err
                console.log(error)
            })

        await GetMemberAllGalleryPics(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;

            if (response.data.status) {
                let Images = [];
                response.data.gallery_photos.map((el, i) => {
                    let newImgObj = {
                        url: BaseURL.DemoURL + el.gallery
                    }
                    Images.push(newImgObj)
                })
                console.log(Images)

                this.setState({ userGalleryImages: Images })
            }
        })
        await GetMemberCareerDetails(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            response.data.data ? this.setState({ CareerDataArr: response.data.data }) : null
        })
            .catch(err => {
                let error = err
                console.log(error)
            })

        await EducationDetailsOfLoggedInUser(this.props.data.member_id, this.state.access_token).then(res => {
            let response = res;
            response.data.data ? this.setState({ MemberEducationDataArr: response.data.data }) : null

        })
            .catch(err => {
                let error = err;
                console.log(JSON.stringify(error))
            })

        await GetKnowMeBetter(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;
            this.setState({ KnowMeBetterArr: response.data.data })
        })
            .catch(err => {
                let error = err;
                console.log(JSON.stringify(error))
            })

        await getYouAndHer(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;
            this.setState({ YouAndHerArr: response.data.data })
        })
            .catch(err => {
                let error = err;
                console.log(JSON.stringify(error))
            })

        await GetUserHobbiesAndInterests(this.state.access_token, this.props.data.member_id).then(res => {
            let response = res;
            let ArrData = Object.entries(response.data.data)
            ArrData.some((el, i) => el[1].length > 0) ? this.setState({ HobbiesAndInterests: response.data.data }) : this.setState({ HobbiesAndInterests: null })

        })
            .catch(err => {
                let error = err;
                console.log(JSON.stringify(error))
            })
        await GetSimilarProfiles(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ SimilarProfilesArr: response.data.data }) : this.setState({ SimilarProfilesArr: null }) }).catch(err => { let error = err; console.log(error) })
        this.setState({ isLoading: false, isShortlisted: this.props.data.shortlisted, interestSent: this.props.data.interest_sent })
    }

    async onShortlistPress() {
        this.state.isShortlisted ?
            RemoveFromShortlist(this.props.data.member_id).then(res => {
                let response = res;
                console.log(response.data)
                this.setState({ isShortlisted: !this.state.isShortlisted })
            })
                .catch(err => {
                    console.log(err)
                    this.ToggleLoader("", false)
                })
            :
            AddToShortlist(this.props.data.member_id).then(res => {
                let response = res;
                console.log(response.data)
                this.setState({ isShortlisted: !this.state.isShortlisted })
            })
                .catch(err => {
                    console.log(err)
                })
    }

    async onInterestSend() {
        !this.state.interestSent ?
            SendInterest(this.props.data.member_id).then(res => {
                let response = res;
                this.setState({ interestSent: true })
            })
                .catch(err => {
                    console.log(err)
                })
            :
            ToastAndroid.showWithGravityAndOffset(
                "Already Sent Interest",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
    }
    async goToPremiumContactDetails() {
        this.setState({ Membership_typedatashow: true });
        this.setState({ Membership_type_contact: false });
    }
    async onCardShortlistPress(isShortlisted, memberID) {
        isShortlisted ?
            RemoveFromShortlist(memberID).then(res => {
                let response = res;
                this.forceUpdate();
            })
                .catch(err => {
                })
            :
            AddToShortlist(memberID).then(res => {
                let response = res;
                this.forceUpdate();
            })
                .catch(err => {
                })
    }

    async oncardInterestSend(memberID) {
        SendInterest(memberID).then(res => {
            let response = res;
            this.forceUpdate();
        })
            .catch(err => {
                console.log(err)
            })
    }

    OnViewAllButtonPress = async (name) => {
        setTimeout(() => {
            goToDrawerViewAllMatchedUserScreen({ title: "Similar Profiles", data: null })
        }, 0);
    }
    render() {
        const renderItem = (ele, i, DataArr, title) => {
            return (
                <View style={{ marginVertical: deviceDimesions.Height * 0.01, marginHorizontal: -deviceDimesions.width * 0.03, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                    <Card containerStyle={{ backgroundColor: "#ffffff", elevation: 5, borderRadius: 10, paddingVertical: 0, width: deviceDimesions.width * 0.439, alignItems: 'center' }}>
                        <ImageBackground source={{ uri: BaseURL.DemoURL + ele.profile_image }} resizeMode={ele.profile_image == 'uploads/gallery_image/default.jpg' ? 'center' : 'cover'} style={styles.UsersCardContainer} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                           
                            <TouchableOpacity
                                onPress={() => push("MatchedUserProfileOverview", { data: { dataArr: DataArr, activeIndex: i, DataTitle: title } })}
                                style={{ width: deviceDimesions.width * 0.45, height: deviceDimesions.Height * 0.1 }}
                            />
                            <View style={{ position: 'absolute', bottom: 2, flexDirection: 'row', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.45 }}>
                                <TouchableOpacity
                                    onPress={() => push("MatchedUserProfileOverview", { data: { dataArr: DataArr, activeIndex: i, DataTitle: title } })}
                                    style={{ width: deviceDimesions.width * 0.22, flexDirection: "row", justifyContent: "space-around", marginVertical: deviceDimesions.Height * 0.01, alignItems: 'center' }}
                                />
                                <View style={{ width: deviceDimesions.width * 0.22, flexDirection: "row", justifyContent: "space-evenly", marginVertical: deviceDimesions.Height * 0.01, alignItems: 'center' }}>
                                    <View style={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 50 }}>
                                        <TouchableOpacity onPress={() => { this.onShortlistPress(ele.shortlisted, ele.member_id).then(res => ele.shortlisted = !ele.shortlisted) }} style={{ elevation: 3, backgroundColor: '#ffffff', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.07, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                            <Icon size={16} name={ele.shortlisted ? 'bookmark' : 'bookmark-o'} color='red' />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 50 }}>
                                        <TouchableOpacity onPress={() => { !ele.interest_sent ? this.onInterestSend(ele.member_id).then(res => { ele.interest_sent = !ele.interest_sent }) : null }} style={{ elevation: 3, backgroundColor: '#ffffff', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.07, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                            <Icon size={16} name={ele.interest_sent ? 'heart' : 'heart-o'} color='red' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </ImageBackground>
                        <TouchableOpacity
                            style={{ width: deviceDimesions.width * 0.45, alignSelf: 'center', height: deviceDimesions.Height * 0.11, alignItems: 'center' }}
                            onPress={() => {
                                push("MatchedUserProfileOverview", { data: { dataArr: DataArr, activeIndex: i, DataTitle: title } })
                            }}
                        >
                            <View style={{ width: deviceDimesions.width * 0.45, alignSelf: 'center', paddingHorizontal: 2 }}>
                                <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 14, fontWeight: '700', marginVertical: 5 }}>{ele.first_name} {ele.last_name}</Text>
                                {ele.age || ele.edu_course_name ?
                                    <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 13, fontWeight: "600", opacity: 0.7 }}>{ele.age ? ele.age + ", " : ""}{ele.edu_course_name ? ele.edu_course_name : ""}</Text> : <></>}
                                {ele.residence_place || ele.career_type ?
                                    <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 13, fontWeight: "600", opacity: 0.7 }}>{ele.career_type ? ele.career_type + ", " : ""} {ele.residence_place}</Text> : <></>}
                            </View>
                        </TouchableOpacity>
                    </Card>
                </View>

            )
        }
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ?
                        <View style={styles.LoaderContainer}>

                        </View>
                        :
                            <View>
                                <View style={styles.userIntroContainer}>
                                    <View>
                                    {this.state.userGalleryImages != null && this.state.userGalleryImages.length > 1 ?
                                        <View style={{ width: deviceDimesions.width * 0.95, height: deviceDimesions.Height * 0.4, backgroundColor: '#000000', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                            <Image source={this.state.userGalleryImages != null && this.state.userGalleryImages.length > 1 ? { uri: this.state.userGalleryImages[1].url } : ImagesPathVariable.LandingImage2} style={{
                                                flex: 1,
                                                width: deviceDimesions.width * 0.95,
                                                height: deviceDimesions.Height * 0.4,
                                                resizeMode: 'contain', alignSelf: 'center'
                                            }}
                                            />
                                        </View>

                                        : null
                                    }
                                    <View style={styles.userIntroTextContainer}>
                                        {this.state.MatchedUserData.marital_status ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="male" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.marital_status}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.height ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="arrows-v" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.height}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.profile_created_by ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="male" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>Profile Created By {this.state.MatchedUserData.profile_created_by}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.mother_tongue ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="language" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.mother_tongue}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.place_grew_up ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40} color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="street-view" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.place_grew_up ? this.state.MatchedUserData.place_grew_up : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.body_type ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <Icon name="child" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.body_type ? this.state.MatchedUserData.body_type : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.drink ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <F5Icon name="glass-cheers" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.drink ? this.state.MatchedUserData.drink : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.smoke ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <F5Icon name="smoking" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.smoke ? this.state.MatchedUserData.smoke : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.physical_disability ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <F5Icon name="female" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.physical_disability ? this.state.MatchedUserData.physical_disability : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                        {this.state.MatchedUserData.few_words_about_me ?
                                            <View style={styles.userPersonalDetailsRowContainer}>
                                                <NeuBorderView
                                                    width={40}
                                                    height={40}
                                                    color={'#ffffff'}
                                                    borderRadius={20}
                                                    inset
                                                >
                                                    <F5Icon name="user" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData && this.state.MatchedUserData.few_words_about_me ? this.state.MatchedUserData.few_words_about_me : 'null'}</Text>
                                            </View>
                                            : null
                                        }
                                    </View>
                                    </View>
                                </View>

                                <View style={{ ...styles.userIntroContainer, marginTop: deviceDimesions.Height * 0.02, paddingTop: -deviceDimesions.Height * 0.02, }}>
                                    {this.state.userGalleryImages != null && this.state.userGalleryImages.length > 2 ?
                                        <View style={{ width: deviceDimesions.width * 0.95, height: deviceDimesions.Height * 0.4, backgroundColor: '#000000', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                            <Image source={this.state.userGalleryImages != null && this.state.userGalleryImages.length > 2 ? { uri: this.state.userGalleryImages[2].url } : ImagesPathVariable.LandingImage2} style={{
                                                flex: 1,
                                                width: deviceDimesions.width * 0.95,
                                                height: deviceDimesions.Height * 0.4,
                                                resizeMode: 'contain', alignSelf: 'center'
                                            }} />
                                        </View>
                                        : null
                                    }
                                    {this.state.MatchedUserData.working_details ?
                                        this.state.MatchedUserData.working_details.map((el, i) => {
                                            return (
                                                <View style={styles.userPersonalDetailsRowContainer}>
                                                    <NeuBorderView
                                                        width={40}
                                                        height={40}
                                                        color={'#ffffff'}
                                                        borderRadius={20}
                                                        inset
                                                    >
                                                        <Icon name="briefcase" color="orange" size={18} />
                                                    </NeuBorderView>
                                                    <Text style={styles.userPersonalDetailsText}>{el}</Text>
                                                </View>
                                            )
                                        })
                                        : null
                                    }
                                    {this.state.MatchedUserData.education_details ?
                                        this.state.MatchedUserData.education_details.map((el, i) => {
                                            return (
                                                <View style={styles.userPersonalDetailsRowContainer}>
                                                    <NeuBorderView
                                                        width={40}
                                                        height={40}
                                                        color={'#ffffff'}
                                                        borderRadius={20}
                                                        inset
                                                    >
                                                        <Icon name="graduation-cap" color="orange" size={18} />
                                                    </NeuBorderView>
                                                    <Text style={styles.userPersonalDetailsText}>{el}</Text>
                                                </View>
                                            )
                                        })
                                        : null
                                    }
                                    {this.state.MatchedUserData.residence_place ?
                                        <View style={styles.userPersonalDetailsRowContainer}>
                                            <NeuBorderView
                                                width={40}
                                                height={40}
                                                color={'#ffffff'}
                                                borderRadius={20}
                                                inset
                                            >
                                                <Icon name="map-marker" color="orange" size={18} />
                                            </NeuBorderView>
                                            <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.residence_place}</Text>
                                        </View>
                                        : null
                                    }
                                    {this.state.MatchedUserData.residency_status ?
                                        <View style={styles.userPersonalDetailsRowContainer}>
                                            <NeuBorderView
                                                width={40}
                                                height={40}
                                                color={'#ffffff'}
                                                borderRadius={20}
                                                inset
                                            >
                                                <Icon name="map-marker" color="orange" size={18} />
                                            </NeuBorderView>
                                            <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.residency_status}</Text>
                                        </View>
                                        : null
                                    }
                                    {this.state.MatchedUserData.annual_income ?
                                        <View style={styles.userPersonalDetailsRowContainer}>
                                            <NeuBorderView
                                                width={40}
                                                height={40}
                                                color={'#ffffff'}
                                                borderRadius={20}
                                                inset
                                            >
                                                <F5Icon name="rupee-sign" color="orange" size={18} />
                                            </NeuBorderView>
                                            <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.annual_income}</Text>
                                        </View>
                                        : null
                                    }
                                    {this.state.MatchedUserData.country ?
                                        <View style={styles.userPersonalDetailsRowContainer}>
                                            <NeuBorderView
                                                width={40}
                                                height={40}
                                                color={'#ffffff'}
                                                borderRadius={20}
                                                inset
                                            >
                                                <F5Icon name="flag" color="orange" size={18} />
                                            </NeuBorderView>
                                            <Text style={styles.userPersonalDetailsText}>{this.state.MatchedUserData.country}</Text>
                                        </View>
                                        : null
                                    }
                                </View>
                                {/* Contact Details */}
                                {
                                    this.state.Membership_type == 1 || !this.state.Membership_type ?

                                        <View style={{ height: deviceDimesions.Height * 0.27, width: deviceDimesions.width * 0.9, justifyContent: "center" }}>
                                            <TouchableOpacity onPress={() => goToUpgradeToPremiumScreen()}>
                                                <Image style={{
                                                    height: deviceDimesions.Height * 0.25,
                                                    width: deviceDimesions.width * 0.95
                                                }} source={ImagesPathVariable.MatchedUserProfileScreenSliderImage2} />
                                            </TouchableOpacity>
                                        </View>
                                        :

                                        this.state.Membership_type_contact ?
                                            <TouchableOpacity onPress={() => this.goToPremiumContactDetails()} 
                                           >

                                                <View style={{ height: deviceDimesions.Height * 0.1, alignContent: 'center', alignItems: 'center', alignSelf: "center", flexDirection: 'row', width: deviceDimesions.width * 0.88, backgroundColor: "#ffffff", elevation: 5, borderRadius: 15, padding: deviceDimesions.width * 0.02, bottom: 25, top: 1, marginBottom: 25 }}>
                                                    <Image style={{ marginLeft: deviceDimesions.width * 0.08, height: deviceDimesions.Height * 0.06, width: deviceDimesions.width * 0.12 }} source={IconsPathVariable.UpgradeToPremiumBannerIcon} />

                                                    <View style={{ marginRight: deviceDimesions.width * 0.099, flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 18, fontWeight: "700", marginRight: deviceDimesions.width * 0.08, marginLeft: 15 }}>View Contact Deatils</Text>

                                                    </View>

                                                </View>

                                            </TouchableOpacity>
                                            :

                                            null

                                }

                                {

                                    this.state.Membership_typedatashow ?

                                        <View style={{ alignSelf: "center", width: deviceDimesions.width * 0.88, backgroundColor: "#ffffff", elevation: 4, borderRadius: 15, padding: deviceDimesions.width * 0.02, marginVertical: 15 }}>

                                            <View style={{ marginTop: deviceDimesions.Height * 0.01, alignSelf: "center", width: deviceDimesions.width * 0.81, borderBottomWidth: 0.2, paddingBottom: deviceDimesions.Height * 0.03 }}>
                                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.01, width: deviceDimesions.width * 0.88 }}>
                                                    <NeuBorderView
                                                        width={40}
                                                        height={40}
                                                        color={'#ffffff'}
                                                        borderRadius={20}
                                                        inset
                                                    >
                                                        <Icon name="phone" color="orange" size={18} />
                                                    </NeuBorderView>
                                                    <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Mobile : </Text>
                                                    <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.mobile}</Text>

                                                    <View style={{ flexDirection: 'row', position: 'absolute', marginLeft: 280 }}>
                                                        <TouchableOpacity style={{}} onPress={() => Linking.openURL(`tel: + ${this.state.MatchedUserData.mobile}`)}>
                                                            <Icon name='phone' size={20} color='#0066cc' />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => Linking.openURL(`whatsapp://send?text=hello&phone=+${this.state.MatchedUserData.mobile}`)}>
                                                            <Icon name='whatsapp' size={21} color='#00cc00' />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                    <NeuBorderView
                                                        width={40}
                                                        height={40}
                                                        color={'#ffffff'}
                                                        borderRadius={20}
                                                        inset
                                                    >
                                                        <Icon name="phone" color="orange" size={18} />
                                                    </NeuBorderView>
                                                    <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Alternate Mobile Number : </Text>
                                                    <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.mobile}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                    <NeuBorderView
                                                        width={40}
                                                        height={40}
                                                        color={'#ffffff'}
                                                        borderRadius={20}
                                                        inset
                                                    >
                                                        <Icon name="map-marker" color="orange" size={18} />
                                                    </NeuBorderView>
                                                    <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Address / Location : </Text>
                                                    <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }}>{this.state.MatchedUserData.residence_place}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                    <NeuBorderView
                                                        width={40}
                                                        height={40}
                                                        color={'#ffffff'}
                                                        borderRadius={20}
                                                        inset
                                                    >
                                                        <Icon name="envelope" color="orange" size={18} />
                                                    </NeuBorderView>
                                                    <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 15, opacity: 0.7 }}>Email ID : </Text>
                                                    <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "700" }} selectable>{this.state.MatchedUserData.email}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: deviceDimesions.width * 0.8 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
                                                    <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 13, opacity: 0.7 }}>Pending Contacts : </Text>
                                                    <Text style={{ fontSize: 14, fontWeight: "700" }}>{this.state.CountOfPendingContacts ? this.state.CountOfPendingContacts : 'null'}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
                                                    <Text style={{ marginLeft: deviceDimesions.width * 0.05, fontSize: 13, opacity: 0.7 }}>Pending Sms : </Text>
                                                    <Text style={{ fontSize: 14, fontWeight: "700" }}>30</Text>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        null
                                }

                                {this.state.KnowMeBetterArr.some(el => el.answer) ?
                                    <View style={{ ...styles.userIntroContainer, marginTop: deviceDimesions.Height * 0.02, paddingTop: -deviceDimesions.Height * 0.02, }}>
                                        {this.state.userGalleryImages != null && this.state.userGalleryImages.length > 3 ?
                                            <Image source={this.state.userGalleryImages != null && this.state.userGalleryImages.length > 3 ? { uri: this.state.userGalleryImages[2].url } : ImagesPathVariable.LandingImage2} style={{ height: deviceDimesions.Height * 0.42, width: deviceDimesions.width * 0.95, resizeMode: 'stretch' }} />
                                            : null
                                        }
                                        {this.state.KnowMeBetterArr.some(el => el.answer) ?
                                            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: deviceDimesions.width * 0.02, marginTop: 10 }}>
                                                <Image source={IconsPathVariable.KnowMeBetter} />
                                                <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: deviceDimesions.width * 0.05 }}>Know Me Better</Text>
                                            </View>
                                            : null
                                        }
                                        {/* Content Goes Here */}
                                        {
                                            this.state.KnowMeBetterArr ?
                                                this.state.KnowMeBetterArr.map((el, i) => {
                                                    return (
                                                        <>
                                                            {el.answer ?
                                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }} key={i}>
                                                                    <View
                                                                        style={{ width: deviceDimesions.width * 0.85, borderRadius: 15, elevation: 4, padding: deviceDimesions.width * 0.03, backgroundColor: "#f2f2f2" }}
                                                                    >
                                                                        <View style={{ marginTop: deviceDimesions.width * 0.01 }}>
                                                                            <Text style={{ fontSize: 15, fontWeight: "700" }}>{el.question}</Text>
                                                                            <Text style={{ fontSize: 14, opacity: 0.7 }}>{el.answer}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                : null
                                                            }
                                                        </>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </View>
                                    : null
                                }

                                <View style={{ marginTop: deviceDimesions.Height * 0.02 }}>
                                    {
                                        this.state.SimilarProfilesArr != null ?
                                            <>
                                                <View style={styles.skipButtonContainer}>
                                                    <Text style={{ fontSize: 16, fontWeight: '700', }}>Similar Profiles</Text>
                                                    <TouchableOpacity
                                                        style={styles.skipButton}
                                                        onPress={() => { this.OnViewAllButtonPress('Similar Profiles') }}
                                                    >
                                                        <Text>View all</Text>
                                                        <NeuBorderView
                                                            color="#f5f5f5"
                                                            height={30}
                                                            width={30}
                                                            borderRadius={20}
                                                            inset
                                                        >
                                                            <Icon name="chevron-right" size={14} color="#FC7C4C" />
                                                        </NeuBorderView>
                                                    </TouchableOpacity>
                                                </View>
                                                <SafeAreaView >

                                                <FlatList
                                                    data={this.state.SimilarProfilesArr}
                                                    style={{ flex: 1, paddingVertical: deviceDimesions.Height * 0.015, width: deviceDimesions.width*0.89 }}
                                                    contentContainerStyle={{ alignItems: 'center' }}
                                                    numColumns={2}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item, index }) => renderItem(item, index, this.state.SimilarProfilesArr, 'Similar Profiles')}
                                                />
                                                </SafeAreaView>
                                            </>
                                            :
                                            this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                                    }
                                </View>
                            </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    scrollViewStyle: {
        alignSelf: 'center',
        width: deviceDimesions.width,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    LoaderContainer: {
        justifyContent: 'center',
    },
    HeaderBackgroundImageStyle: {
        height: deviceDimesions.Height * 0.5,
        width: deviceDimesions.width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    HeaderBackgroundStyle: {
        width: deviceDimesions.width,
        height: deviceDimesions.Height * 0.5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    HeaderTopOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: deviceDimesions.width * 0.6
    },
    HeaderButtonTouchable: {
        padding: 5
    },
    HeaderBottomButtonTouchable: {
        padding: 15,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userIntroContainer: {
        backgroundColor: "#ffffff",
        paddingBottom: deviceDimesions.Height * 0.02,
        width: deviceDimesions.width * 0.882,
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 10,
        marginBottom: 20
    },
    userIntroTextContainer: {
        width: deviceDimesions.width * 0.85,
        alignSelf: 'center',
        marginTop: deviceDimesions.Height * 0.01
    },
    userPersonalDetailsRowContainer: {
        marginVertical: deviceDimesions.Height * 0.008,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    userPersonalDetailsText: {
        width: deviceDimesions.width * 0.7,
        marginLeft: deviceDimesions.width * 0.025,
        color: 'rgba(0,0,0,0.7)',
        fontSize: 16
    },



    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    modalView: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalInput: {
        marginTop: 20,
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: 'rgba(0,0,0,0.5)'
    },
    panelHeader: {
        height: deviceDimesions.Height * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteIcon: {
        position: 'absolute',
        top: -24,
        right: 24,
        backgroundColor: '#2b8a3e',
        width: 48,
        height: 48,
        padding: 8,
        borderRadius: 24,
        zIndex: 1
    },
    SlideUpContainer: {
        flex: 1,
        zIndex: 1,
        padding: 5
    },
    linearGradient: {
        flex: 1,
        borderRadius: 5
    },
    skipButtonContainer: {
        marginTop: 5,
        alignItems: "center",
        alignSelf: "center",
        width: deviceDimesions.width * 0.9,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    skipButton: {
        width: deviceDimesions.width * 0.3,
        borderRadius: 10,
        alignItems: "center",
        elevation: 4,
        paddingRight: 20,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#ffffff"
    },
    UsersCardContainer: {
        width: deviceDimesions.width * 0.43,
        resizeMode: 'stretch',
        height: deviceDimesions.Height * 0.22,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }
})
