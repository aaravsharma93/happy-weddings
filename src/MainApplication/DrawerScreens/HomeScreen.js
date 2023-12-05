/* eslint-disable prettier/prettier */
import { H3 } from 'native-base';
import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground, Text, FlatList } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { goToAllFiltersScreen, goToChatContainerScreen, goToDrawerViewAllMatchedUserScreen, goToEditUserPreferencesScreen, goToEditUserProfilenScreen, goToEditUserProfilenScreenSentToHomeScreen, goToFilterByTypeScreen, goToManagePhotoScreen, goToMatchedUserProfileOverviewrScreen, goToNotificationScreen, goToProfileForSignScreen, goToSearchProfilesScreen, goToTrustBadgesSliderScreen, goToTrustedBadgesScreen, goToUpgradeToPremiumScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import { BackHandler } from 'react-native';
import { AndroidBackHandler } from "react-navigation-backhandler";
import { BaseURL } from '../../API_config/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PreferanceMemberListing, RecommendedMembersListings, NewlyJoinedMembers, MembersViewedMe, MutualMatchesListings, RemoveFromShortlist, AddToShortlist, SendInterest, PremiumMembersListings, GetSimilarProfiles, GetNearbyMembers, MembersLookingForMe, KeywordSearchAPI, GetMemberDetail, GetCountOfDiffRequests, GetShortlistedProfiles, GetInterestedMe, GetCountOfNotification, GetShortlistedOthersMembers } from '../../helper/API_Call/API_Call';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import { Pressable } from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import { RefreshControl } from 'react-native';
import { Card } from 'react-native-elements';
import deviceInfoModule from 'react-native-device-info';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            userData: '',
            LiveUserData: '',
            filterOpen: false,
            flatListItem: null,
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: "",
            },
            countArr: null,
            cardsLoading: false,
            access_token: '',
            keyword: '',
            carouselItems: [
                {
                    type: 'img',
                    onPress: goToEditUserProfilenScreen,
                    image: ImagesPathVariable.HomeScreensSliderImage1
                },
                {
                    type: 'img',
                    onPress: goToTrustBadgesSliderScreen,
                    image: ImagesPathVariable.HomeScreensSliderImage2
                },
                {
                    type: 'img',
                    onPress: goToEditUserProfilenScreen,
                    image: ImagesPathVariable.HomeScreensSliderImage3
                },
                {
                    type: 'img',
                    onPress: goToEditUserProfilenScreen,
                    image: ImagesPathVariable.HomeScreensSliderImage4
                },
                {
                    type: 'img',
                    onPress: goToEditUserProfilenScreen,
                    image: ImagesPathVariable.HomeScreensSliderImage5
                },

                {
                    type: 'img',
                    onPress: goToTrustBadgesSliderScreen,
                    image: ImagesPathVariable.HomeScreensSliderImage8
                },
                {
                    type: 'img',
                    onPress: () => goToDrawerViewAllMatchedUserScreen({ title: 'Newly Joined' }),
                    image: ImagesPathVariable.HomeScreensSliderImage9
                },

            ],
            PreferenceMembersArr: null,
            ViewedYouArr: null,
            NewlyJoinedArr: null,
            DailyRecommendationsArr: null,
            MutualMatchesArr: null,
            PremiumMatchesArr: null,
            SimilarProfilesArr: null,
            NearbyMembersArr: null,
            MembersLookingForMeArr: null,
            ShortlistedMembersArr: null,
            LikedMembersArr: null,
            arraycount: null
        }
    }

    ToggleLoader(name, title) {
        this.setState({
         
            LoaderProperties: {
                ...this.state.LoaderProperties,
                LoadingTitle: name,
                isLoading: title,
            }
        })
    }

    goToEditProfile() {
        goToEditUserProfilenScreen()
    }


    OnViewAllButtonPress = async (name) => {
        let ViewAllData;
        if (name == 'Viewed You') {
            ViewAllData = this.state.ViewedYouArr
        }
        else if (name == 'Newly Joined') {
            ViewAllData = this.state.NewlyJoinedArr
        }
        else if (name == 'Daily Recommendations') {
            ViewAllData = this.state.DailyRecommendationsArr
        }
        else if (name == 'Mutual Matches') {
            ViewAllData = this.state.MutualMatchesArr
        }
        else if (name == 'Based On Your Preference') {
            ViewAllData = this.state.PreferenceMembersArr
        }
        setTimeout(() => {
            goToDrawerViewAllMatchedUserScreen({ title: name, data: ViewAllData })
        }, 0);
    }

    _renderSliderItem({ item, index }) {

        if (item.type === 'img') {
            return (
                <TouchableOpacity
                    onPress={() => item.onPress()}
                    style={{
                        paddingHorizontal: deviceDimesions.width * 0.015,
                        alignItems: 'center',
                        alignSelf: "center",
                        elevation: 10
                    }}
                >
                    <Image source={item.image} style={{ width: deviceDimesions.width * 0.9, height: deviceDimesions.Height * 0.3, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            )
        }
        else {
            return (
                false
            )
        }

    }

    asyncSetState(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        this.loadAllData()
       
    }

    async loadAllData() {
        try {
            this.setState({ cardsLoading: true })
            let userDataObj = JSON.parse(await AsyncStorage.getItem('user_data'))
            this.setState({ userData: userDataObj }, () => console.log(userDataObj))
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });

            await GetMemberDetail("", this.state.access_token)
                .then((res) => {
                    let response = res;
                    console.log(response.data)
                    this.setState({ LiveUserData: response.data.data })
                })
            await GetCountOfDiffRequests(this.state.access_token).then(res => {
                let response = res
                console.log(response.data)
                if (response.data.status) {
                    let dataKeys = Object.keys(response.data.data)
                    let countArr = []
                    let colorArr = ['#ffbf00', '#0066ff', '#ff3300', '#cc33ff']
                    var found = dataKeys.filter(function (key) {
                        return response.data.data[key] != null && response.data.data[key] != 0;
                    });

                    if (found.length > 0) {
                        found.map((el, i) => {
                            let newSubArr = [el, response.data.data[el], colorArr[i]]
                            countArr.push(newSubArr)
                        })
                        this.setState({ countArr })
                    }
                  
                }
            })
            await MembersViewedMe(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ ViewedYouArr: response.data.data }) : this.setState({ ViewedYouArr: null }) }).catch(err => { let error = err; console.log(error) })
            await RecommendedMembersListings(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ DailyRecommendationsArr: response.data.data }) : this.setState({ DailyRecommendationsArr: null }) }).catch(err => { let error = err; console.log(error) })
            await NewlyJoinedMembers(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ NewlyJoinedArr: response.data.data }) : this.setState({ NewlyJoinedArr: null }) }).catch(err => { let error = err; console.log(error) })
            await PreferanceMemberListing(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ PreferenceMembersArr: response.data.data }) : this.setState({ PreferenceMembersArr: null }) }).catch(err => { let error = err; console.log(error) })
            await PremiumMembersListings(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ PremiumMatchesArr: response.data.data }) : this.setState({ PremiumMatchesArr: null }) }).catch(err => { let error = err; console.log(error) })
            await GetSimilarProfiles(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ SimilarProfilesArr: response.data.data }) : this.setState({ SimilarProfilesArr: null }) }).catch(err => { let error = err; console.log(error) })
            await GetNearbyMembers(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ NearbyMembersArr: response.data.data }) : this.setState({ NearbyMembersArr: null }) }).catch(err => { let error = err; console.log(error) })
            await MembersLookingForMe(this.state.access_token).then(res => { let response = res; console.log(response.data); response.data.status ? this.setState({ MembersLookingForMeArr: response.data.data }) : this.setState({ MembersLookingForMeArr: null }) }).catch(err => { let error = err; console.log(error) })
            await GetShortlistedOthersMembers(this.state.access_token).then(res => { let response = res; console.log(response.data, "shoetlisted=====data"); response.data.status ? this.setState({ ShortlistedMembersArr: response.data.data }) : this.setState({ ShortlistedMembersArr: null }) }).catch(err => { let error = err; console.log(error) })
            await GetInterestedMe(this.state.access_token).then(res => { let response = res; console.log(response.data); response.data.status ? this.setState({ LikedMembersArr: response.data.data }) : this.setState({ LikedMembersArr: null }) }).catch(err => { let error = err; console.log(error) })
            await this.asyncSetState({ cardsLoading: false })
        }
        catch (error) {
            Alert.alert('Error', 'There was an error.')
        }
    }

    onRefresh() {
        this.setState({ refreshing: true })
        this.loadAllData()
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 1500);
    }

    onSearchPress() {
        this.state.keyword ?
            KeywordSearchAPI(this.state.access_token, this.state.keyword).then(res => {
                let response = res;
                console.log(response.data.data)
                if (response.data.status) {
                    console.log(response.data.data)
                    goToDrawerViewAllMatchedUserScreen({ title: 'Keyword Search', data: response.data.data })
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(
                        'No Such User Exist.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    )
                }
            })
                .catch(err => {
                    console.log(err)
                })
            :
            ToastAndroid.showWithGravityAndOffset(
                'Please enter keyword.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            )
    }

    onBackButtonPressAndroid = () => {
        console.log("back button pressed.")
        BackHandler.exitApp()
    }

    componentWillUnmount() {

    }

    renderCards(item) {
        return (
            <View>
                <Text>{item.member_profile_id}</Text>
            </View>
        )
    }

    async onShortlistPress(isShortlisted, memberID) {
        isShortlisted ?
            RemoveFromShortlist(memberID).then(res => {
                let response = res;
                console.log(response.data, "RemoveFromShortlist")
                this.forceUpdate();
            })
                .catch(err => {
                })
            :
            AddToShortlist(memberID).then(res => {
                let response = res;
                console.log(response.data)
                this.forceUpdate();
            })
                .catch(err => {
                    console.log(err)
                })
    }

    async onInterestSend(memberID) {
        SendInterest(memberID).then(res => {
            let response = res;
            this.forceUpdate();
        })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        const { handleMenuClick } = this.props;

        const filterListArr = [
            {
                id: 1,
                img: ImagesPathVariable.CityFilter,
                title: "City"
            },
            {
                id: 2,
                img: ImagesPathVariable.ProfessionFilter,
                title: "Profession"
            },
            {
                id: 3,
                img: ImagesPathVariable.StarFilter,
                title: "Star"
            },
            {
                id: 4,
                img: ImagesPathVariable.FeaturedMatchesFilter,
                title: "Featured Matches"
            },
            {
                id: 5,
                img: ImagesPathVariable.WithPhotosFilter,
                title: "With Photo"
            },
            {
                id: 6,
                img: ImagesPathVariable.NearMeFilter,
                title: "Near Me"
            },
            {
                id: 7,
                img: ImagesPathVariable.TrustedProfileFilter,
                title: "Saved"
            },
        ]

        const _renderFilterList = (ele) => {
            return (
                <TouchableOpacity
                    style={{ marginRight: deviceDimesions.width * 0.03, alignItems: 'center', marginTop: deviceDimesions.Height * 0.015, padding: deviceDimesions.width * 0.015 }}
                    onPress={() => { goToFilterByTypeScreen({ title: ele.title }) }}
                >
                    <NeuView
                        color="#f5f5f5"
                        borderRadius={10}
                        width={deviceDimesions.width * 0.25}
                        height={deviceDimesions.Height * 0.11}
                        concave
                    >
                        <NeuView
                            color="#f5f5f5"
                            borderRadius={10}
                            width={deviceDimesions.width * 0.22}
                            height={deviceDimesions.Height * 0.09}
                            inset
                        >
                            <Image source={ele.img} style={{ height: deviceDimesions.Height * 0.08, width: deviceDimesions.width * 0.23 }} />
                        </NeuView>
                    </NeuView>
                    <Text style={{ fontSize: 12, marginTop: deviceDimesions.Height * 0.01 }}>{ele.title}</Text>
                </TouchableOpacity>
            )
        }

        const dummyDataForFlatlist = [
            {
                id: 'bd7acbea-c1b1-46c2-aed5-sadsad3ad53abb28ba',
                title: 'Venki',
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-asdsadfbd91aa97f63',
                title: 'Venki',
            },
            {
                id: '58694a0f-3da1-471f-bd96-14asdsadsa5571e29d72',
                title: 'Venki',
            },
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3aasdasdd53abb28ba',
                title: 'Venki',
            },
        ];
        const renderCardItem = (el, i) => {
            console.log(el, "---------------------count-----Data-------------------")
            if (i <= 4) {
                return (
                    <TouchableOpacity

                        onPress={() => {
                            if (el[0] == 'newly_joined') {
                                this.OnViewAllButtonPress('Newly Joined')
                            }
                            else if (el[0] == 'daily_recommendations') {
                                goToDrawerViewAllMatchedUserScreen({ title: 'Daily Recommendations' })
                            }
                            else if (el[0] == 'shortlisted_you') {
                                goToDrawerViewAllMatchedUserScreen({ title: 'Saved Profiles' })
                            }
                            else if (el[0] == 'pending_requests') {
                                goToDrawerViewAllMatchedUserScreen({ title: 'Pending Request' })
                            }
                            else if (el[0] == 'members_liked_you') {
                                goToDrawerViewAllMatchedUserScreen({ title: 'Liked Me' })
                            }
                            else if (el[0] == 'viewd_my_profile') {
                                goToDrawerViewAllMatchedUserScreen({ title: 'Viewed You' })
                            }
                            else if (el[0] == 'nearme') {
                                goToDrawerViewAllMatchedUserScreen({ title: 'Profile Near Me' })
                            }
                            else if (el[0] == 'looking_for_you') {
                                goToDrawerViewAllMatchedUserScreen({ title: 'Looking for me' })
                            }
                            else {
                                this.OnViewAllButtonPress('Daily Recommendations')
                            }
                        }}
                        style={{ alignItems: 'center', marginBottom: 10 }}
                    >

                        <View style={{
                            backgroundColor: '#dcdcde',
                            borderColor: '#fff',
                            width: deviceDimesions.width * 0.4,
                            height: 45,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            shadowColor: "#000",
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            marginHorizontal: 10

                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 18, color: el[2] }}>{el[1]}</Text>
                        </View>
                        <Text style={{ fontSize: 11, opacity: 0.7, marginTop: deviceDimesions.Height * 0.01, fontWeight: '700' }}>{el[0].split('_').join(" ").charAt(0).toUpperCase() + el[0].split('_').join(" ").slice(1)}</Text>
                    </TouchableOpacity>
                )
            }
        }
        const renderItem = (ele, i, DataArr, title) => {
            return (
                <View style={{ marginVertical: deviceDimesions.Height * 0.01, marginHorizontal: -deviceDimesions.width * 0.03, marginLeft: i == 0 ? deviceDimesions.width * 0.02 : -deviceDimesions.width * 0.025 }}>

                    <TouchableOpacity 
                     activeOpacity={1}
                        onPress={() => goToMatchedUserProfileOverviewrScreen(DataArr, i, title)}
                    >
                        <Card containerStyle={{ backgroundColor: "#ffffff", elevation: 5, borderRadius: 10, paddingVertical: 0, width: deviceDimesions.width * 0.45, alignItems: 'center' }}>
                            <ImageBackground source={{ uri: BaseURL.DemoURL + ele.profile_image }} resizeMode={ele.profile_image == 'uploads/gallery_image/default.jpg' ? 'center' : 'cover'} style={styles.UsersCardContainer} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                              
                                <TouchableOpacity
                                    onPress={() => goToMatchedUserProfileOverviewrScreen(DataArr, i, title)}
                                    style={{ width: deviceDimesions.width * 0.45, height: deviceDimesions.Height * 0.1 }}
                                />
                                <View style={{ position: 'absolute', bottom: 2, flexDirection: 'row', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.45 }}>
                                    <TouchableOpacity
                                        onPress={() => goToMatchedUserProfileOverviewrScreen(DataArr, i, title)}
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
                                    // console.log(ele)
                                    goToMatchedUserProfileOverviewrScreen(DataArr, i, title)
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

                    </TouchableOpacity>


                </View>
            )
        }

        const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
            const paddingToBottom = 10;
            return layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom;
        };
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>

                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,0)"
                        barStyle="dark-content"
                    />

                   

                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        bounces={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()}
                            />
                        }
                  
                    >

                        {/* Drawer Header */}
                        <View style={styles.selfProfileCard}>
                            {/* Main Card on top of the screen */}
                            <View
                                style={{ backgroundColor: '#ffffff', marginTop: deviceDimesions.Height * 0.02, elevation: 10, borderRadius: 20, width: deviceDimesions.width * 0.9, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
                          
                            >

                                <View style={{ flexDirection: 'row', width: deviceDimesions.width * 0.9, marginLeft: 40 }}>
                                    {/* Profile Image */}
                                    <TouchableOpacity onPress={() => goToManagePhotoScreen()} style={styles.cardImageContainer}>

                                        <View>

                                            <View>

                                                <ProgressCircle
                                                    percent={this.state.LiveUserData && this.state.LiveUserData.profile_completion ? Number(this.state.LiveUserData.profile_completion.split("%")[0]) : 0}
                                                    radius={50}
                                                    borderWidth={6}
                                                    shadowColor="#e6e6e6"
                                                    color="#f7931d"
                                                    bgColor="#fff"
                                                >
                                                    <Image
                                                      
                                                        source={this.state.userData.userdata ? { uri: BaseURL.DemoURL + this.state.userData.userdata.profile_pic } : ImagesPathVariable.DummyUserSmall}
                                                        style={this.state.userData.userdata ? { height: deviceDimesions.Height * 0.14, width: deviceDimesions.width * 0.29, borderRadius: 50 } : { borderRadius: 50 }}
                                                    />

                                                </ProgressCircle>

                                            </View>


                                        </View>


                                        <View style={styles.profilePicturePercentContainer}>
                                            <Text style={styles.profilePicturePercentText}>{this.state.LiveUserData && this.state.LiveUserData.profile_completion ? this.state.LiveUserData.profile_completion : "0%"}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View></View>


                                    {this.state.LiveUserData && this.state.LiveUserData.membership_type != "Free" ?
                                        <View style={{
                                            alignItems: "center",
                                            alignSelf: 'center',
                                            bottom: 10
                                        }}>
                                            <Text style={{
                                                color: '#e82f42',
                                                fontSize: 18,
                                                fontWeight: '700',
                                                marginLeft: 10
                                            }} >{this.state.LiveUserData ? this.state.LiveUserData.first_name : ""}</Text>
                                            <View style={{ flexDirection: 'row', marginRight: 17, marginTop: 5 }}>
                                                <Image
                                                    style={styles.profileNameWithSubscriptionTypeImage}
                                                    source={IconsPathVariable.DrawerHomeScreenSubscriptionTypeIcon}
                                                />
                                                <Text style={styles.profileNameWithSubscriptionTypeText} >{this.state.LiveUserData.membership_type}</Text>
                                            </View>
                                        </View>
                                        :
                                        <View style={styles.profileNameContainer}>
                                           
                                            <Text style={{
                                                color: '#e82f42',
                                                fontSize: 22,
                                                fontWeight: '700'
                                            }} >{this.state.LiveUserData ? this.state.LiveUserData.first_name : ""}</Text>
                                        </View>

                                    }

                                    <TouchableOpacity onPress={() => goToManagePhotoScreen()} >

                                        <View style={{ width: 60, height: 60, marginLeft: 60, marginTop: 30 }}>
                                            <Image source={IconsPathVariable.HomeAddImage} style={{ width: 60, height: 60 }} />
                                        </View>
                                    </TouchableOpacity>


                                </View>

                                {this.state.countArr != null && this.state.countArr ?
                                    <View style={{ alignItems: 'center', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.9, alignSelf: 'center' }}>

                                        <FlatList
                                            data={this.state.countArr}
                                            numColumns={2}
                                            renderItem={({ item, index }) => renderCardItem(item, index)}
                                        />

                                    </View>
                                    :
                                    null
                                }

                                {/* Search Bar */}

                                <View style={styles.cardSearchBarContainer}>
                                    {this.state.userData.userdata && this.state.userData.userdata.membership == 1 ?
                                        <View style={styles.upgradeToPremiumButtunRow}>
                                            <TouchableOpacity style={styles.upgradeToPremiumButtun}
                                                onPress={() => goToUpgradeToPremiumScreen()}
                                            >
                                                <View style={{
                                                    backgroundColor: '#e73140',
                                                    borderWidth: 1,
                                                    borderColor: '#fff',
                                                    width: 30,
                                                    height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 20,
                                                    marginLeft: 10,
                                                    shadowColor: "#000",
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 3.84,
                                                    elevation: 5
                                                }}>
                                                    <Image source={IconsPathVariable.HomeScreenUpgradeToPremiumIcon} />
                                                </View>
                                                <Text style={{ marginLeft: 18, color: 'white', fontWeight: '700' }}>UPGRADE TO PREMIUM</Text>
                                            </TouchableOpacity>
                                           
                                        </View>
                                        : null
                                    }
                                   
                                </View>
                            </View>
                        </View>
                       
                        <View>

                            {
                                this.state.NewlyJoinedArr != null ?

                                    <>
                                        <View style={styles.skipButtonContainer}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', }}>Newly Joined</Text>

                                            {

                                                this.state.NewlyJoinedArr.length >= 5 && this.state.NewlyJoinedArr != null ?

                                                    <TouchableOpacity
                                                        style={styles.skipButton}
                                                        onPress={() => { this.OnViewAllButtonPress('Newly Joined') }}
                                                    >
                                                        <Text style={{ color: "#ffffff", fontWeight: "700" }}>View {this.state.countArr.find((el, i) => el[0] == "newly_joined")[1]} More</Text>
                                                       
                                                        <View style={styles.skipButtonarrow}>
                                                            <Icon name="chevron-right" size={14} color="white" />
                                                        </View>

                                                    </TouchableOpacity>
                                                    :
                                                    null

                                            }


                                        </View>
                                        <FlatList
                                            data={this.state.NewlyJoinedArr}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => renderItem(item, index, this.state.NewlyJoinedArr, "Newly Joined")}

                                        />
                                    </>
                                    :
                                    this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                            }

                        </View>


                        <View>

                            {
                                this.state.DailyRecommendationsArr != null ?
                                    <>
                                        <View style={styles.skipButtonContainer}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', }}>Daily Recommendations</Text>

                                            {

                                                this.state.DailyRecommendationsArr.length >= 5 && this.state.DailyRecommendationsArr != null ?
                                                    <TouchableOpacity
                                                        style={styles.skipButton}
                                                        onPress={() => { this.OnViewAllButtonPress('Daily Recommendations') }}
                                                    >

                                                        <Text style={{ color: "#ffffff", fontWeight: "700" }}>View {this.state.countArr.find((el, i) => el[0] == "daily_recommendations")[1]} More</Text>
                                                        <View style={styles.skipButtonarrow}>
                                                            <Icon name="chevron-right" size={14} color="white" />
                                                        </View>
                                                      
                                                    </TouchableOpacity>
                                                    :
                                                    null

                                            }

                                        </View>



                                        <FlatList
                                            data={this.state.DailyRecommendationsArr}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => renderItem(item, index, this.state.DailyRecommendationsArr, "Daily Recommendations")}
                                        />
                                    </>
                                    :
                                    this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                            }


                        </View>

                        <TouchableOpacity
                            onPress={() => goToEditUserProfilenScreen()}
                            style={{

                                alignItems: 'center',
                                alignSelf: "center",
                                elevation: 10
                            }}
                        >
                            <Image source={ImagesPathVariable.HomeScreensSliderImage3} style={{ width: deviceDimesions.width, height: deviceDimesions.Height * 0.3, }} />
                        </TouchableOpacity>


                        <View>
                            {
                                this.state.MembersLookingForMeArr != null ?
                                    <>
                                        <View style={styles.skipButtonContainer}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', }}>Looking for me</Text>


                                            {
                                                this.state.MembersLookingForMeArr.length >= 5 && this.state.MembersLookingForMeArr != null ?

                                                    <TouchableOpacity
                                                        style={styles.skipButton}
                                                        onPress={() => { this.OnViewAllButtonPress('Looking for me') }}
                                                    >
                                                        <Text style={{ color: "#ffffff", fontWeight: "700" }}>View {this.state.countArr.find((el, i) => el[0] == "looking_for_you")[1]} More</Text>
                                                       
                                                        <View style={styles.skipButtonarrow}>
                                                            <Icon name="chevron-right" size={14} color="white" />
                                                        </View>

                                                    </TouchableOpacity>
                                                    :

                                                    null

                                            }



                                        </View>
                                        <FlatList
                                            data={this.state.MembersLookingForMeArr}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => renderItem(item, index, this.state.MembersLookingForMeArr, 'Looking for me')}
                                        />
                                    </>
                                    :
                                    this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                            }

                        </View>

                        <View>

                            {
                                this.state.ViewedYouArr != null ?
                                    <>
                                        <View style={styles.skipButtonContainer}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', }}>Viewed You</Text>

                                            {

                                                this.state.ViewedYouArr.length >= 5 && this.state.ViewedYouArr != null ?
                                                    <TouchableOpacity
                                                        style={styles.skipButton}
                                                        onPress={() => this.OnViewAllButtonPress('Viewed You')}
                                                    >
                                                        <Text style={{ color: "#ffffff", fontWeight: "700" }}>View {this.state.countArr.find((el, i) => el[0] == "viewd_my_profile")[1]} More</Text>
                                                      
                                                        <View style={styles.skipButtonarrow}>
                                                            <Icon name="chevron-right" size={14} color="white" />
                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                            }



                                        </View>
                                        <FlatList
                                            data={this.state.ViewedYouArr}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => renderItem(item, index, this.state.ViewedYouArr, 'Viewed You')}
                          
                                        />
                                    </>
                                    :
                                    this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                            }


                        </View>

                        <TouchableOpacity
                            onPress={() => goToTrustBadgesSliderScreen()}

                            style={{

                                alignItems: 'center',
                                alignSelf: "center",
                                elevation: 10
                            }}
                        >
                            <Image source={ImagesPathVariable.HomeScreensSliderImage8} style={{ width: deviceDimesions.width, height: deviceDimesions.Height * 0.3, }} />
                        </TouchableOpacity>



                        <View>

                            {
                                this.state.ShortlistedMembersArr != null ?
                                    <>
                                        <View style={styles.skipButtonContainer}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', }}>Saved Profiles</Text>

                                            {

                                                this.state.ShortlistedMembersArr.length >= 5 && this.state.ShortlistedMembersArr != null ?
                                                    <TouchableOpacity
                                                        style={styles.skipButton}
                                                        onPress={() => this.OnViewAllButtonPress('Saved Profiles')}
                                                    >
                                                    
                                                        <Text style={{ color: "#ffffff", fontWeight: "700" }}>View {this.state.countArr.find((el, i) => el[0] == "shortlisted_you")[1]} More</Text>


                                                        <View style={styles.skipButtonarrow}>
                                                            <Icon name="chevron-right" size={14} color="white" />
                                                        </View>
                                                       

                                                    </TouchableOpacity>
                                                    :
                                                    null
                                            }
                                        </View>
                                        <FlatList
                                            data={this.state.ShortlistedMembersArr}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => renderItem(item, index, this.state.ShortlistedMembersArr, 'Viewed You')}
                              
                                        />
                                    </>
                                    :
                                    this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                            }


                        </View>

                        <TouchableOpacity
                            onPress={() => goToTrustBadgesSliderScreen()}

                            style={{

                                alignItems: 'center',
                                alignSelf: "center",
                                elevation: 10
                            }}
                        >
                            <Image source={ImagesPathVariable.HomeScreensSliderImage9} style={{ width: deviceDimesions.width, height: deviceDimesions.Height * 0.3, }} />
                        </TouchableOpacity>


                        <View>
                            {
                                this.state.PremiumMatchesArr != null ?
                                    <>
                                        <View style={styles.skipButtonContainer}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', }}>Premium Matches</Text>
                                            {


                                                this.state.PremiumMatchesArr.length >= 5 && this.state.PremiumMatchesArr != null ?
                                                    <TouchableOpacity
                                                        style={styles.skipButton}
                                                        onPress={() => { this.OnViewAllButtonPress('Premium Matches') }}
                                                    >
                                                        <Text>View More</Text>
                                                      
                                                        <View style={styles.skipButtonarrow}>
                                                            <Icon name="chevron-right" size={14} color="white" />
                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                            }

                                        </View>
                                        <FlatList
                                            data={this.state.PremiumMatchesArr}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => renderItem(item, index, this.state.PremiumMatchesArr, 'Premium Matches')}
                                        />
                                    </>
                                    :
                                    this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                            }

                        </View>

                        <View>
                            {
                                this.state.NearbyMembersArr != null ?
                                    <>
                                        <View style={styles.skipButtonContainer}>
                                            <Text style={{ fontSize: 18, fontWeight: '700', }}>Profile Near Me</Text>

                                            {
                                                this.state.NearbyMembersArr.length >= 5 && this.state.NearbyMembersArr != null ?
                                                    <TouchableOpacity
                                                        style={styles.skipButton}
                                                        onPress={() => { this.OnViewAllButtonPress('Profile Near Me') }}
                                                    >
                                                        <Text style={{ color: "#ffffff", fontWeight: "700" }}>View {this.state.countArr.find((el, i) => el[0] == "nearme")[1]} More</Text>

                                                      
                                                        <View style={styles.skipButtonarrow}>
                                                            <Icon name="chevron-right" size={14} color="white" />
                                                        </View>
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                            }

                                        </View>
                                        <FlatList
                                            data={this.state.NearbyMembersArr}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => renderItem(item, index, this.state.NearbyMembersArr, 'Profile Near Me')}
                                        />
                                    </>
                                    :
                                    this.state.cardsLoading && <ContentLoader active avatar pRows={4} pWidth={["100%", 200, "25%", 45]} />
                            }

                        </View>
                        <View style={{ marginVertical: deviceDimesions.Height * 0.015 }}>
                            <Carousel
                                layout='default'
                                ref={ref => this.carousel = ref}
                                data={this.state.carouselItems}
                                sliderWidth={deviceDimesions.width}
                                itemWidth={deviceDimesions.width * 0.9}
                                renderItem={this._renderSliderItem}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                                autoplay={true}
                                loop
                                autoplayDelay={5000}
                                autoplayInterval={5000}
                            />
                        </View>

                       
                    </ScrollView>
                </View>
            </AndroidBackHandler>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: deviceDimesions.Height,
        width: deviceDimesions.width
    },
    contentContainer: {
        backgroundColor: '#ffffff',
    },
    selfProfileCard: {
        alignSelf: "center"
    },
    cardImageContainer: {
    },
    profilePicturePercentContainer: {
        alignItems: 'center',
        bottom: 2,
        marginTop: 5

    },
    profilePicturePercentText: {
        fontWeight: "bold",
        fontSize: 12,
        width: deviceDimesions.width * 0.1,
        alignSelf: 'center',

    },
    profileNameContainer: {
        flexDirection: "row",
        marginLeft: 20,
        alignItems: "center",
        alignSelf: 'center',
        bottom: 10
    },
    profileNameWithSubscriptionTypeImage: {
        marginLeft: deviceDimesions.width * 0.01,
        marginRight: deviceDimesions.width * 0.01
    },
    profileNameWithSubscriptionTypeText: {
        color: '#ffc115',
        fontSize: 12,
    },
    cardMenuIconContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: deviceDimesions.width * 0.85,
        padding: 10

    },
    cardMenuIcons: {
        alignItems: "center",
        padding: 5
    },
    cardMenuIconText: {
        marginTop: 5,
        opacity: 0.6,
        fontSize: 10,
    },
    cardSearchBarContainer: {
       
    },
    upgradeToPremiumButtunRow: {

    },
    upgradeToPremiumButtun: {
        padding: 10,
        width: deviceDimesions.width * 0.75,
        backgroundColor: '#e73140',
        color: 'white',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: "center",
        elevation: 4,

    },
    filterButton: {
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center"
    },
    filterOpenStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        padding: 3,
        width: deviceDimesions.width * 0.9,
        marginTop: 20,
        borderRadius: 15,
        alignItems: 'center'
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
        justifyContent: "space-between",
        marginTop: 15

    },
    skipButton: {
        width: deviceDimesions.width * 0.35,
        borderRadius: 10,
        alignItems: "center",
        elevation: 4,
        paddingRight: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "orange"
    },
    skipButtonarrow: {
        width: 22,
        height: 22,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "orange",
        borderWidth: 1,
        borderColor: "white",
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'

    },
    UsersCardContainer: {
        width: deviceDimesions.width * 0.45,
        resizeMode: 'stretch',
        height: deviceDimesions.Height * 0.22,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#ffffff",
    },
});
