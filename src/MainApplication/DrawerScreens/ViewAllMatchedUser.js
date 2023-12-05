// ViewAllMatchedUser

import { H3 } from 'native-base';
import React, { Component } from 'react';
import { View, Image, StyleSheet,ImageBackground, Text, FlatList } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  goToMatchedUserProfileOverviewrScreen, } from '../../helper/NavigationFunctions/NavigationFunctions';
import {  AddToShortlist, RemoveFromShortlist, SendInterest,  GetYetToViewCount, GetMatchesForTheDay, MembersLookingForMe,  ViewAllViewedMe, ViewAllNewlyJoined, ViewAllRecommendation, ViewAllMutualMatches, ViewAllPreferences, ViewAllPremiumMatches, ViewAllSimilarProfiles, ViewAllNearByMembers, GetInterestedMe, GetPendingRequests, GetShortlistedOthersMembers } from '../../helper/API_Call/API_Call';
import { BaseURL } from '../../API_config/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { Card } from 'react-native-elements';
import PulseLoader from 'react-native-pulse-loader';

export default class ViewAllMatchedUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOpen: false,
            flatListItem: null,
            UsersDataList: [],
            UserData: '',
            DataArr: '',
            ProfileViewersCount: '0',
            YetToView: '0',
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: ""
            },
            CardsLoading: false,
            token: '',
            TitleText: "",
            ErrorMessage: "",
            dummyDataForFlatlist: [
                {
                    isChecked: false,
                    title: 'Matches For The Day',
                    onItemPress: GetMatchesForTheDay
                },
                 {
                    isChecked: false,
                    title: 'Daily Recommendations',
                    onItemPress: ViewAllRecommendation
                },
        
                {
                    isChecked: false,
                    title: 'Looking for me',
                    onItemPress:  MembersLookingForMe             
                 },
                 {
                    isChecked: false,
                    title: 'Based On Your Preference',
                    onItemPress:  ViewAllPreferences             
                 },
                {
                    isChecked: false,
                    title: 'Pending Request',
                    onItemPress: GetPendingRequests
                },
                {
                    isChecked: false,
                    title: 'Mutual matches',
                    onItemPress: ViewAllMutualMatches
                },
                {
                    isChecked: false,
                    title: 'Saved Profiles',
                    onItemPress: GetShortlistedOthersMembers
                },
                {
                    isChecked: false,
                    title: 'Liked Me',
                    onItemPress: GetInterestedMe
                },
            ],
        }
        this.DataArr = ''
        
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

    async componentDidMount() {
        try {
            this.setState({ CardsLoading: true })
            let screenTitle = this.props.TitleText.title;
            let UserData = JSON.parse(await AsyncStorage.getItem('user_data'));
            const token = await AsyncStorage.getItem('access_token');
            this.setState({ token }); //SetToken
            this.setState({ UserData: UserData.userdata, }); //SetUserData

            //MatchesForTheDayApi
            GetMatchesForTheDay(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
           
            if (screenTitle == 'Viewed You') {
                await ViewAllViewedMe(this.state.token).then(res => { let response = res; console.log(response.data); response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Newly Joined') {
                await ViewAllNewlyJoined(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Pending Request') {
                await GetPendingRequests(this.state.token,'10','10' ).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Liked Me') {
                await GetInterestedMe(this.state.token).then(res => { let response = res; console.log(response.data); response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Daily Recommendations') {
                await ViewAllRecommendation(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Mutual Matches') {
                await ViewAllMutualMatches(this.state.token).then(res => { let response = res; console.log(response.data); response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Matches') {
                await ViewAllMutualMatches(this.state.token).then(res => { let response = res; console.log(response); response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Saved Profiles') {
                await GetShortlistedOthersMembers(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Based On Your Preference') {
                await ViewAllPreferences(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Premium Matches') {
                await ViewAllPremiumMatches(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Similar Profiles') {
                await ViewAllSimilarProfiles(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Profile Near Me') {
                await ViewAllNearByMembers(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            else if (screenTitle == 'Looking for me') {
                await MembersLookingForMe(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
            // Keyword Search
            else if (screenTitle == 'Search By Id') {
                this.setState({ DataArr: this.props.TitleText.data })
                console.log(this.props.TitleText.data)
            }
            else if (screenTitle == 'Advance Search') {
                this.setState({ DataArr: this.props.TitleText.data })
            }
            else if (screenTitle == 'Quick Search') {
                this.setState({ DataArr: this.props.TitleText.data })
            }
            else if (screenTitle == 'Keyword Search') {
                this.setState({ DataArr: this.props.TitleText.data })
            }
            else {
                GetMatchesForTheDay(this.state.token).then(res => { let response = res; response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: null, ErrorMessage: "Data Not Found" }) }).catch(err => { let error = err; console.log(error) })
            }
 
            GetYetToViewCount().then(res => {
                let response = res;
                console.log(response.data)
                response.data.count !== null ? this.setState({ YetToView: response.data.data }) : 0
            })
                .catch(err => {
                    console.log(err)
                })

            GetCountViewedYou(token).then(res => {
                let response = res;
                if (response.data.status) {
                    this.setState({ ProfileViewersCount: response.data.data })
                }
            })

            await this.asyncSetState({ CardsLoading: false })
        }
        catch {

        }

    }
    async onTagPress(el, i) {

        let dummyDataForFlatlist = [...this.state.dummyDataForFlatlist];
        for (let index = 0; index < dummyDataForFlatlist.length; index++) {
            if (index == i) {
                dummyDataForFlatlist[index].isChecked = true
            }
            else {
                dummyDataForFlatlist[index].isChecked = false
            }
        }
        this.setState({ dummyDataForFlatlist: dummyDataForFlatlist, TitleText: el.title }, () => {
            console.log(dummyDataForFlatlist)
        })

        await el.onItemPress(this.state.token).then(res => {
            let response = res;
            console.log(response.data)
            response.data.status ? this.setState({ DataArr: response.data.data }) : this.setState({ DataArr: '', ErrorMessage: "Data Not Found" })
        })
            .catch(err => {
                let error = err
                console.log(err)
            })
    }

    asyncSetState(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async onShortlistPress(isShortlisted, memberID) {
        isShortlisted ?
            RemoveFromShortlist(memberID).then(res => {
                let response = res;
                console.log(response.data)
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
                })
    }

    async onInterestSend(memberID) {
        SendInterest(memberID).then(res => {
            let response = res;
            this.forceUpdate();
        })
            .catch(err => {
            })
    }

    render() {
        const { BackPressHandler } = this.props;
        let titleText = this.props.TitleText;
      
        const renderItem = (ele, i) => {
            return (
                <TouchableOpacity
                    style={{ padding: 5, marginRight: 10, borderRadius: 5, backgroundColor: ele.isChecked ? "#ff6f00" : '#ffffff', borderColor: ele.isChecked ? "#ffffff" : '#ff6f00', borderWidth: 1, alignItems: 'center' }}
                    onPress={() => this.onTagPress(ele, i)}
                >
                    <Text style={{ fontSize: 12, color: ele.isChecked ? "#000000" : '#ff6f00', }}>{ele.title}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />


                <View style={{ alignSelf: "center", padding: 5, }}>
                    <NeuView
                        color="#ffffff"
                        width={deviceDimesions.width * 0.94}
                        height={deviceDimesions.Height * 0.1}
                        borderRadius={10}
                        containerStyle={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10
                        }}
                    >
                        
                        <View style={{ width: deviceDimesions.width * 0.85 }}>
                            <View style={{ width: deviceDimesions.width * 0.89 }}>
                                <FlatList
                                    data={this.state.dummyDataForFlatlist}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => renderItem(item, index)}
                               
                                />
                            </View>
                        </View>
                    </NeuView>
                </View>
                <ScrollView>
                    {this.state.DataArr ?
                        <FlatList
                            data={this.state.DataArr}
                            style={{ flex: 1, width: deviceDimesions.width }}
                            contentContainerStyle={{ alignItems: 'center' }}
                            ItemSeparatorComponent={() => { return <View style={{ width: deviceDimesions.width * 0.5, height: 5, backgroundColor: "#fie493" }} /> }}
                            numColumns={2}
                            renderItem={(ele) => {
                                return (
                                    <View style={{ marginHorizontal: -deviceDimesions.width * 0.02, }}>
                                        <Card containerStyle={{ backgroundColor: "#ffffff", elevation: 5, borderRadius: 10, paddingVertical: 0, width: deviceDimesions.width * 0.45, alignItems: 'center' }}>
                                            <ImageBackground source={{ uri: BaseURL.DemoURL + ele.item.profile_image }} resizeMode={ele.item.profile_image == 'uploads/gallery_image/default.jpg' ? 'center' : 'cover'} style={styles.UsersCardContainer} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                                
                                                <TouchableOpacity
                                                    onPress={() => goToMatchedUserProfileOverviewrScreen(this.state.DataArr, ele.index, "")}
                                                    style={{ width: deviceDimesions.width * 0.45, height: deviceDimesions.Height * 0.1 }}
                                                />
                                                <View style={{ position: 'absolute', bottom: 2, flexDirection: 'row', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.45 }}>
                                                    <TouchableOpacity
                                                        onPress={() => goToMatchedUserProfileOverviewrScreen(this.state.DataArr, ele.index, "")}
                                                        style={{ width: deviceDimesions.width * 0.22, flexDirection: "row", justifyContent: "space-around", marginVertical: deviceDimesions.Height * 0.01, alignItems: 'center' }}
                                                    />
                                                    <View style={{ width: deviceDimesions.width * 0.22, flexDirection: "row", justifyContent: "space-evenly", marginVertical: deviceDimesions.Height * 0.01, alignItems: 'center' }}>
                                                        <View style={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 50 }}>
                                                            <TouchableOpacity onPress={() => { this.onShortlistPress(ele.item.shortlisted, ele.item.member_id).then(res => ele.item.shortlisted = !ele.item.shortlisted) }} style={{ elevation: 3, backgroundColor: '#ffffff', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.07, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                                                <Icon size={16} name={ele.item.shortlisted ? 'bookmark' : 'bookmark-o'} color='red' />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 50 }}>
                                                            <TouchableOpacity onPress={() => { !ele.item.interest_sent ? this.onInterestSend(ele.item.member_id).then(res => { ele.item.interest_sent = !ele.item.interest_sent }) : null }} style={{ elevation: 3, backgroundColor: '#ffffff', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.07, alignItems: 'center', borderRadius: 40, justifyContent: 'center' }}>
                                                                <Icon size={16} name={ele.item.interest_sent ? 'heart' : 'heart-o'} color='red' />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>

                                            </ImageBackground>
                                            <TouchableOpacity
                                                style={{ width: deviceDimesions.width * 0.45, alignSelf: 'center', height: deviceDimesions.Height * 0.11, alignItems: 'center' }}
                                                onPress={() => {
                                                    goToMatchedUserProfileOverviewrScreen(this.state.DataArr, ele.index, titleText.title)
                                                }}
                                            >
                                                <View style={{ width: deviceDimesions.width * 0.45, alignSelf: 'center', paddingHorizontal: 2 }}>
                                                    <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 15, fontWeight: '700', marginVertical: 5, ellipsizeMode: 'tail', }}>{ele.item.first_name} {ele.item.last_name}</Text>
                                                    {ele.item.age || ele.item.edu_course_name ?
                                                        <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 13, fontWeight: "600", opacity: 0.7 }}>{ele.item.age ? ele.item.age + ", " : ""}{ele.item.edu_course_name ? ele.item.edu_course_name : ""}</Text> : <></>}
                                                    {ele.item.residence_place || ele.item.career_type ?
                                                        <Text numberOfLines={1} style={{ paddingHorizontal: 3, width: deviceDimesions.width * 0.35, fontSize: 13, fontWeight: "600", opacity: 0.7 }}>{ele.item.career_type ? ele.item.career_type + ", " : ""} {ele.item.residence_place}</Text> : <></>}
                                                </View>
                                              
                                            </TouchableOpacity>
                                        </Card>
                                    </View>
                                )
                            }}
                        />
                        :
                        <View pointerEvents="none" style={{ alignSelf: 'center', height: deviceDimesions.Height, marginTop: -deviceDimesions.Height * 0.2, width: deviceDimesions.width, justifyContent: 'center' }}>
                           
                            {this.state.ErrorMessage ?
                                <>
                                   
                                    <View style={{
                                        bottom: 150, flexDirection: 'row', width: deviceDimesions.width * 0.95, height: deviceDimesions.Height * 0.12, backgroundColor: "#ffffff", marginLeft: 10
                                        , elevation: 3, borderRadius: 15, padding: deviceDimesions.width * 0.02
                                    }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: deviceDimesions.width * 0.85 }}>
                                            <Image style={{ alignSelf: "center", height: deviceDimesions.Height * 0.12, width: deviceDimesions.width * 0.2 }} source={IconsPathVariable.Nomemebers} />
                                            <View style={{ marginRight: deviceDimesions.width * 0.099, flexDirection: 'column', }}>
                                                <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 12, marginRight: deviceDimesions.width * 0.08, }}>Sorry.. No members here.
                                                </Text>
                                                <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 12, marginRight: deviceDimesions.width * 0.08, }}>
                                                    Please go to New Matches for more members.</Text>
                                            </View>
                                        </View>
                                    </View>
                                </>
                                :
                                <PulseLoader
                                    borderColor="#ff751a"
                                    size={deviceDimesions.width * 0.5}
                                    avatarBackgroundColor="#ffffff"
                                    avatar={BaseURL.DemoURL + this.state.UserData.profile_pic}
                                    pressInValue={0.6}
                                />
                            }

                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: deviceDimesions.Height * 0.01,
        height: deviceDimesions.Height,
        width: deviceDimesions.width
    },
    profilePicturePercentContainer: {
        alignItems: "flex-end",
        marginTop: -deviceDimesions.Height * 0.03,
    },
    profilePicturePercentText: {
        fontWeight: "bold",
        fontSize: 12
    },
    profileNameContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: deviceDimesions.Height * 0.02,
        alignItems: "center"
    },
    profileNameWithSubscriptionTypeImage: {
        marginLeft: deviceDimesions.width * 0.01,
        marginRight: deviceDimesions.width * 0.01
    },
    profileNameWithSubscriptionTypeText: {
        color: '#ffc115',
        fontSize: 12,
    },
    upgradeToPremiumButtunRow: {
        width: deviceDimesions.width,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center"
    },
    upgradeToPremiumButtun: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#ff8053',
        color: 'white',
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: "center"
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
        borderRadius: 5,
    },

    UsersCardContainer: {
        width: deviceDimesions.width * 0.45,
        resizeMode: 'stretch',
        height: deviceDimesions.Height * 0.22,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    }
})