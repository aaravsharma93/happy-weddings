import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    Linking,
    Modal,
    ToastAndroid
} from "react-native";
import { DrawerContentScrollView,} from "@react-navigation/drawer";
import { NeuBorderView, NeuView } from "react-native-neu-element";
import DrawerMenuTabs from "../../component/DrawerMenuTabs/DrawerMenuTabs";
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconsPathVariable from "../../helper/IconsPathVariable/IconsPathVariable";
import ImagesPathVariable from "../../helper/ImagesPathVariable/ImagesPathVariable";
import deviceDimesions from "../../helper/DeviceDimensions/DeviceDimensions";
import { goToDrawerHomeScreenHomeTab, goToDrawerMailBoxScreen, goToDrawerViewAllMatchedUserScreen, goToEditUserPreferencesScreen, goToEditUserProfilenScreen, goToHelpAndSupportScreen, goToHomeScreen, goToLoginScreen, goToMailboxScreen, goToPrivacySettingsScreen, goToSearchProfilesScreen, goToSettingsScreen, goToUpgradeToPremiumScreen } from '../../helper/NavigationFunctions/NavigationFunctions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL } from "../../API_config/BaseURL";
import { Pressable } from "react-native";
import { GetCountViewedYou, Logout } from "../../helper/API_Call/API_Call";
import { Share } from "react-native";
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class CustomDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {
                first_name: 'Ahana Ahana',
                member_profile_id: 'HW1122FFG',
                profile_pic: '',
            },
            showExitModal: false,
            ViewedYouCount: "0",
            SearchDropdown: false,
            countarray: 0,
            SettingsDropdown: false,
            access_token: '',
            count: 0 ,
            countsettings : 0
        };
    }

    async componentDidMount() {
        let userData = JSON.parse(await AsyncStorage.getItem('user_data'))
        this.setState({ userDetails: userData.userdata }, () => console.log(this.state.userDetails))

        console.log("drawer.........");
        console.log(userData.auth_token)
        let access_token = userData.auth_token

        this.setState({ access_token })

        GetCountViewedYou(userData.auth_token).then(res => {
            let response = res;
            if (response.data.status) {
                this.setState({ ViewedYouCount: response.data.data })
            }
        })

        setInterval(async () => {
            let updatedUserData = JSON.parse(await AsyncStorage.getItem('user_data'))
            if (updatedUserData.userdata === userData.userdata) {
                return false
            }
            else {
                this.setState({ userDetails: updatedUserData.userdata })
            }
        }, 5000)

      
    }



    async onSharePress() {
        try {
            const result = await Share.share(
                {
                    title: `Share Your Profile`,
                    message: `https://demo.happyweddings.com/home/member_profile/${this.state.userDetails.member_id}`,
                    url: `https://demo.happyweddings.com/home/member_profile/${this.state.userDetails.member_id}`
                }
            );

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    OpenClickSearch = () =>{

        if(this.state.count == 0){
            this.setState({ SearchDropdown: true })
            // this.state.count = 1 ; 
            this.setState({ count: 1 })
        }
        else if(this.state.count == 1 ){
            this.setState({ SearchDropdown: false })
            this.setState({ count: 0 })

        }
        
    }

    OpenClickSettings = () =>{

        if(this.state.countsettings == 0){
            this.setState({ SettingsDropdown: true })
            this.setState({ countsettings: 1 })
        }
        else if(this.state.countsettings == 1 ){
            this.setState({ SettingsDropdown: false })
            this.setState({ countsettings: 0 })

        }
        
    }



    onLogOutPress = async () => {
        console.log(this.state.access_token, "this.state.access_token")
        Logout(this.state.access_token)
            .then(async (res) => {
                let response = res;
                console.log(response.data)
                if (response.data.status) {
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    AsyncStorage.clear();

                    goToLoginScreen({ openModel: false })
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }

            })
            .catch(err => {
                let error = err;
                ToastAndroid.showWithGravityAndOffset(
                    'Please try again later.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                console.log(error)
            })

    }

    render() {
        const { handleMenuClick } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.containertopRow}>
                    <View style={styles.profileInfoContainer}>
                        <TouchableOpacity  onPress={() => goToEditUserProfilenScreen()}>
                            <View>
                                <Image
                                    style={styles.imageTopRow}
                                    source={this.state.userDetails.profile_pic ? { uri: BaseURL.DemoURL + this.state.userDetails.profile_pic } : ImagesPathVariable.DummyUserSmall}
                                />
                            </View>

                        </TouchableOpacity>
                        <View style={styles.profilePicContainer}>


                            <View>
                                <Text style={styles.ProfileName}>{this.state.userDetails.first_name}</Text>
                                <Text style={styles.ProfileId}>{this.state.userDetails.member_profile_id}</Text>
                              
                            </View>
                            <Pressable onPressIn={() => this.props.navigation.closeDrawer()} style={styles.drawerCloseButton}>
                                <Image source={IconsPathVariable.DrawerCloseIcon} />
                            </Pressable>
                        </View>


                    </View>
                    <TouchableOpacity onPress={() => goToEditUserProfilenScreen()}>

                        <View style={{ flexDirection: 'row' ,alignContent:'center',alignContent:'center',   marginTop: 10,
                              
                              marginLeft: 15,   }}>
                           
                                <Icon name="pencil-alt" color="#e73140" size={12} style={{marginTop:3}} />

                          
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '700',

                                marginLeft: 8,
                                color: "#e73140"
                            }}>Edit Profile</Text>
                        </View>

                    </TouchableOpacity>

                    {this.state.userDetails.membership == 1 ?
                        <TouchableOpacity
                            style={styles.upgradeToPremiumButtonContainer}
                            onPress={() => goToUpgradeToPremiumScreen()}
                        >
                            <Text style={styles.upgradeToPremiumButtonText}>Upgrade To Premium</Text>
                            <NeuBorderView
                                height={25}
                                width={25}
                                color='#ff6f00'
                                borderRadius={20}
                                borderWidth={0}
                            >
                                <Icon name="chevron-right" color="white" size={16} />
                            </NeuBorderView>
                        </TouchableOpacity> : null}
                </View>

                {
                    this.state.PopupProfilePage ?

                        <View style={{ alignSelf: 'center' }}>

                            <Modal
                                animationType="fade"
                                transparent={true}

                            >
                                <TouchableOpacity
                                    style={styles.centeredView}
                                    activeOpacity={1}

                                >
                                    <TouchableWithoutFeedback>
                                        <View style={{
                                            margin: 10,
                                            backgroundColor: "rgba(255,255,255,1)",
                                            borderRadius: 20,
                                            height: deviceDimesions.Height * 0.28,
                                            width: deviceDimesions.width * 0.95,
                                            alignSelf: "center",
                                            elevation: 4,
                                            bottom: deviceDimesions.Height * 0.005,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2
                                            },
                                        }}>

                                            <View style={{ justifyContent: 'space-around', width: deviceDimesions.width * 0.9, alignSelf: 'center', height: deviceDimesions.Height * 0.17, alignItems: 'center', borderBottomWidth: 0.2, }}>
                                                <TouchableOpacity style={{ alignItems: 'center', padding: 10 }} >

                                                    <Text style={{ marginTop: deviceDimesions.Height * 0.02 }}>1.Select new profile photo</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ alignItems: 'center', padding: 10 }} >

                                                    <Text style={{ marginTop: deviceDimesions.Height * 0.02 }}>2.Take new profile photo</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ alignItems: 'center', padding: 10 }}
                                                >

                                                    <Text style={{ marginTop: deviceDimesions.Height * 0.02 }}>3.Select profile Video</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ alignItems: 'center', padding: 10 }}
                                                >

                                                    <Text style={{ marginTop: deviceDimesions.Height * 0.02 }}>4.Take new profile video</Text>
                                                </TouchableOpacity>

                                            </View>
                                            <TouchableOpacity
                                                style={styles.upgradeToPremiumButtonContainer}

                                            >
                                                <Text style={styles.upgradeToPremiumButtonText}>Cancel</Text>
                                               
                                            </TouchableOpacity>
                                            
                                        </View>
                                    </TouchableWithoutFeedback>
                                </TouchableOpacity>
                            </Modal>
                        </View>
                        :

                        null

                }


                <DrawerContentScrollView>
                    <View >

                        {/* Drawer Bottom Container */}

                        <View style={styles.containerBottom}>

                            <DrawerMenuTabs
                                buttonTitle="Home"
                                buttonImage={<Icon name="home" color="#F47445" size={16} />}
                                onSubmitPress={() => goToDrawerHomeScreenHomeTab()}

                            />
                            <TouchableOpacity 
                            

                            onPress={() => this.OpenClickSearch()}>

                                <View style={styles.containerBottomLastItemSearch}>
                                    <NeuView
                                        containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                        color="#f5f5f5"
                                        borderRadius={10}
                                        width={deviceDimesions.width * 0.7}
                                        height={deviceDimesions.Height * 0.055}
                                    >

                                        <TouchableOpacity  
                                           >
                                            <NeuBorderView
                                                width={deviceDimesions.width * 0.08}
                                                height={35}
                                                borderRadius={5}
                                                color='#f5f5f5'
                                                inset
                                            >
                                                <Icon name="search" color="#F47445" size={16} />
                                            </NeuBorderView>
                                        </TouchableOpacity>
                                        <Text style={{
                                            marginRight: 69, fontWeight: "700",
                                            fontSize: 16,
                                            opacity: 0.7
                                        }}>Search</Text>
                                        <TouchableOpacity
                                           onPress={() => this.OpenClickSearch()}>
                                        
                                           
                                                <MaterialIcons name="arrow-drop-down" color="#F47445" size={35} />
                                        </TouchableOpacity>
                                    </NeuView>
                                </View>
                            </TouchableOpacity>
                            {
                                this.state.SearchDropdown ?

                                    <View >

                                        <TouchableOpacity onPress={() => { goToSearchProfilesScreen({ Index: '3' }), this.setState({ SearchDropdown: false }) }}>
                                            <View style={styles.containerBottomLastItemSearch}>
                                                <NeuView
                                                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                                    color="#f5f5f5"
                                                    borderRadius={10}
                                                    width={deviceDimesions.width * 0.7}
                                                    height={deviceDimesions.Height * 0.055}
                                                >
                                                    <View style={{ flexDirection: 'row', marginRight: 60 }}>

                                                        <TouchableOpacity>
                                                            <NeuBorderView
                                                                width={deviceDimesions.width * 0.08}
                                                                height={35}
                                                                borderRadius={5}
                                                                color='#f5f5f5'
                                                                inset
                                                            >
                                                                <Octicons name="primitive-dot" color="#F47445" size={16} />
                                                            </NeuBorderView>
                                                        </TouchableOpacity>
                                                        <Text style={{
                                                            fontWeight: "500",
                                                            fontSize: 16,
                                                            opacity: 0.7,
                                                            marginLeft: 15
                                                        }}>Keyword search</Text>

                                                    </View>
                                                </NeuView>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { goToSearchProfilesScreen({ Index: '2' }), this.setState({ SearchDropdown: false }) }}>
                                            <View style={styles.containerBottomLastItemSearch}>
                                                <NeuView
                                                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                                    color="#f5f5f5"
                                                    borderRadius={10}
                                                    width={deviceDimesions.width * 0.7}
                                                    height={deviceDimesions.Height * 0.055}
                                                >
                                                    <View style={{ flexDirection: 'row', marginRight: 110 }}>
                                                        <TouchableOpacity>
                                                            <NeuBorderView
                                                                width={deviceDimesions.width * 0.08}
                                                                height={35}
                                                                borderRadius={5}
                                                                color='#f5f5f5'
                                                                inset
                                                            >
                                                                <Octicons name="primitive-dot" color="#F47445" size={16} />
                                                            </NeuBorderView>
                                                        </TouchableOpacity>
                                                        <Text style={{
                                                            fontWeight: "500",
                                                            fontSize: 16,
                                                            opacity: 0.7,
                                                            marginLeft: 15
                                                        }}>ID Search</Text>
                                                    </View>
                                                </NeuView>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { goToSearchProfilesScreen({ Index: '0' }), this.setState({ SearchDropdown: false }) }}>
                                            <View style={styles.containerBottomLastItemSearch}>
                                                <NeuView
                                                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                                    color="#f5f5f5"
                                                    borderRadius={10}
                                                    width={deviceDimesions.width * 0.7}
                                                    height={deviceDimesions.Height * 0.055}
                                                >
                                                    <View style={{ flexDirection: 'row', marginRight: 90 }}>
                                                        <TouchableOpacity>
                                                            <NeuBorderView
                                                                width={deviceDimesions.width * 0.08}
                                                                height={35}
                                                                borderRadius={5}
                                                                color='#f5f5f5'
                                                                inset
                                                            >
                                                                <Octicons name="primitive-dot" color="#F47445" size={16} />
                                                            </NeuBorderView>
                                                        </TouchableOpacity>
                                                        <Text style={{
                                                            fontWeight: "500",
                                                            fontSize: 16,
                                                            opacity: 0.7,
                                                            marginLeft: 15
                                                        }}>Quick Search</Text>
                                                    </View>
                                                </NeuView>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { goToSearchProfilesScreen({ Index: '1' }), this.setState({ SearchDropdown: false }) }}>
                                            <View style={styles.containerBottomLastItemSearch}>
                                                <NeuView
                                                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                                    color="#f5f5f5"
                                                    borderRadius={10}
                                                    width={deviceDimesions.width * 0.7}
                                                    height={deviceDimesions.Height * 0.055}
                                                >
                                                    <View style={{ flexDirection: 'row', marginRight: 55 }}>
                                                        <TouchableOpacity>
                                                            <NeuBorderView
                                                                width={deviceDimesions.width * 0.08}
                                                                height={35}
                                                                borderRadius={5}
                                                                color='#f5f5f5'
                                                                inset
                                                            >
                                                                <Octicons name="primitive-dot" color="#F47445" size={16} />
                                                            </NeuBorderView>
                                                        </TouchableOpacity>
                                                        <Text style={{
                                                            fontWeight: "500",
                                                            fontSize: 16,
                                                            opacity: 0.7,
                                                            marginLeft: 15
                                                        }}>Advanced Search</Text>
                                                    </View>
                                                </NeuView>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                    :
                                    null

                            }

                            <DrawerMenuTabs
                                buttonTitle="Matches"
                                buttonImage={<Image source={IconsPathVariable.DrawerMatchesIcon} />}
                                onSubmitPress={() => { goToDrawerViewAllMatchedUserScreen('4') }}
                            />

                            <DrawerMenuTabs
                                buttonTitle="Saved Profiles"
                                buttonImage={<Icon name="save" color="#F47445" size={16} />}
                                onSubmitPress={() => { goToDrawerViewAllMatchedUserScreen({ title: 'Shortlisted Profiles' }) }}
                            />
                            <DrawerMenuTabs
                                buttonTitle="Mailbox"
                                buttonImage={<Image source={IconsPathVariable.DrawerMailboxIcon} />}
                                onSubmitPress={() => goToDrawerMailBoxScreen()}
                            >

                              
                            </DrawerMenuTabs>
                          
                            <DrawerMenuTabs
                                buttonTitle="Blog"
                                buttonImage={<Image source={IconsPathVariable.DrawerBlogIcon} />}
                                onSubmitPress={() => Linking.openURL("https://happyweddings.com/matrimony/blogs/")}
                            />

                            <TouchableOpacity                           
                             onPress={() => this.OpenClickSettings()}>


                                <View style={styles.containerBottomLastItemSearch}>
                                    <NeuView
                                        containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                        color="#f5f5f5"
                                        borderRadius={10}
                                        width={deviceDimesions.width * 0.7}
                                        height={deviceDimesions.Height * 0.055}
                                    >

                                        <TouchableOpacity>
                                            <NeuBorderView
                                                width={deviceDimesions.width * 0.08}
                                                height={35}
                                                borderRadius={5}
                                                color='#f5f5f5'
                                                inset
                                            >
                                                <Image source={IconsPathVariable.DrawerSettingsIcon} />
                                            </NeuBorderView>
                                        </TouchableOpacity>
                                        <Text style={{
                                            marginRight: 59, fontWeight: "700",
                                            fontSize: 16,
                                            opacity: 0.7,
                                        }}>Settings</Text>
                                        <TouchableOpacity 
                                          
                                          onPress={() => this.OpenClickSettings()}
                                        >
                                          
                                                <MaterialIcons name="arrow-drop-down" color="#F47445" size={35} />
                                        </TouchableOpacity>
                                    </NeuView>
                                </View>
                            </TouchableOpacity>

                            {
                                this.state.SettingsDropdown ?

                                    <View >

                                        <TouchableOpacity onPress={() => goToHelpAndSupportScreen()}>

                                            <View style={styles.containerBottomLastItemSearch}>
                                                <NeuView
                                                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                                    color="#f5f5f5"
                                                    borderRadius={10}
                                                    width={deviceDimesions.width * 0.7}
                                                    height={deviceDimesions.Height * 0.055}
                                                >
                                                    <View style={{ flexDirection: 'row', marginRight: 70 }}>
                                                        <TouchableOpacity
                                                        >
                                                            <NeuBorderView
                                                                width={deviceDimesions.width * 0.08}
                                                                height={35}
                                                                borderRadius={5}
                                                                color='#f5f5f5'
                                                                inset
                                                            >
                                                                <AntDesign name="setting" color="#F47445" size={16} />
                                                            </NeuBorderView>
                                                        </TouchableOpacity>
                                                        <Text style={{
                                                            fontWeight: "500",
                                                            fontSize: 16,
                                                            opacity: 0.7,
                                                            marginLeft: 15
                                                        }}>Help and Support</Text>
                                                    </View>
                                                </NeuView>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => goToPrivacySettingsScreen()}>
                                            <View style={styles.containerBottomLastItemSearch}>
                                                <NeuView
                                                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                                    color="#f5f5f5"
                                                    borderRadius={10}
                                                    width={deviceDimesions.width * 0.7}
                                                    height={deviceDimesions.Height * 0.055}
                                                >
                                                    <View style={{ flexDirection: 'row', marginRight: 85 }}>
                                                        <TouchableOpacity>
                                                            <NeuBorderView
                                                                width={deviceDimesions.width * 0.08}
                                                                height={35}
                                                                borderRadius={5}
                                                                color='#f5f5f5'
                                                                inset
                                                            >
                                                                <FontAwesome name="file-code-o" color="#F47445" size={17} />
                                                            </NeuBorderView>
                                                        </TouchableOpacity>
                                                        <Text style={{
                                                            fontWeight: "500",
                                                            fontSize: 16,
                                                            opacity: 0.7,
                                                            marginLeft: 15
                                                        }}>Privacy settings</Text>
                                                    </View>
                                                </NeuView>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => goToEditUserPreferencesScreen()}>

                                            <View style={styles.containerBottomLastItemSearch}>
                                                <NeuView
                                                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                                    color="#f5f5f5"
                                                    borderRadius={10}
                                                    width={deviceDimesions.width * 0.7}
                                                    height={deviceDimesions.Height * 0.055}
                                                >
                                                    <View style={{ flexDirection: 'row', }}>
                                                        <TouchableOpacity>
                                                            <NeuBorderView
                                                                width={deviceDimesions.width * 0.08}
                                                                height={35}
                                                                borderRadius={5}
                                                                color='#f5f5f5'
                                                                inset
                                                            >
                                                                <SimpleLineIcons name="wrench" color="#F47445" size={16} />
                                                            </NeuBorderView>
                                                        </TouchableOpacity>
                                                        <Text style={{
                                                            fontWeight: "500",
                                                            fontSize: 16,
                                                            opacity: 0.7,
                                                            marginLeft: 15
                                                        }}>Partner Preference settings</Text>
                                                    </View>
                                                </NeuView>
                                            </View>
                                        </TouchableOpacity>

                                        <View style={styles.containerBottomLastItemSearch}>
                                            <NeuView
                                                containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                                color="#f5f5f5"
                                                borderRadius={10}
                                                width={deviceDimesions.width * 0.7}
                                                height={deviceDimesions.Height * 0.055}
                                            >
                                                <View style={{ flexDirection: 'row', marginRight: 50 }}>

                                                    <TouchableOpacity>
                                                        <NeuBorderView
                                                            width={deviceDimesions.width * 0.08}
                                                            height={35}
                                                            borderRadius={5}
                                                            color='#f5f5f5'
                                                            inset
                                                        >
                                                            <Ionicons name="notifications-outline" color="#F47445" size={18} />

                                                        </NeuBorderView>
                                                    </TouchableOpacity>
                                                    <Text style={{
                                                        fontWeight: "500",
                                                        fontSize: 16,
                                                        opacity: 0.7,
                                                        marginLeft: 15
                                                    }}>Notification settings</Text>

                                                </View>


                                            </NeuView>
                                        </View>


                                    </View>

                                    :
                                    null
                            }

                            <TouchableOpacity onPress={() => this.onLogOutPress()}>
                                <View style={styles.containerBottomLastItemSearch}>
                                    <NeuView
                                        containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                        color="#f5f5f5"
                                        borderRadius={10}
                                        width={deviceDimesions.width * 0.7}
                                        height={deviceDimesions.Height * 0.055}
                                    >
                                        <View style={{ flexDirection: 'row', marginRight: 130 }}>

                                            <TouchableOpacity>
                                                <NeuBorderView
                                                    width={deviceDimesions.width * 0.08}
                                                    height={35}
                                                    borderRadius={5}
                                                    color='#f5f5f5'
                                                    inset
                                                >
                                                    <FontAwesome name="sign-out" color="#F47445" size={18} />

                                                </NeuBorderView>
                                            </TouchableOpacity>
                                            <Text style={{
                                                fontWeight: "700",
                                                fontSize: 16,
                                                opacity: 0.7,
                                                marginLeft: 40
                                            }}>Logout</Text>

                                        </View>


                                    </NeuView>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </DrawerContentScrollView>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: deviceDimesions.Height,
        backgroundColor: '#f5f5f5'
    },
    containertopRow: {
        marginTop: 10,
        marginLeft: 5,
        paddingBottom: 20,
        width: deviceDimesions.width * 0.8,
        borderBottomWidth: 0.2,
    },
    profileInfoContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        paddingLeft: 0,
        alignItems: "center"
    },
    ProfileName: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 2
    },
    ProfileId: {
        opacity: 0.7,
    },
    ProfileViewCountButton: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        elevation: 20,
        padding: 10,
        marginTop: 15,
        borderRadius: 15,
        alignItems: "center"
    },
    ProfileViewCountNumber: {
        color: '#ff6f00',
        fontSize: 16,
        marginRight: 10,
    },
    ProfileViewCountText: {
        opacity: 0.5,
        fontSize: 12
    },
    profilePicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    drawerCloseButton: {
        marginTop: 10,
        marginLeft: 25,
    },
    upgradeToPremiumButtonContainer: {
        backgroundColor: '#ff6f00',
        justifyContent: 'space-around',
        borderRadius: 10,
        padding: 10,
        marginTop: 14,
        marginLeft: 10,
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    upgradeToPremiumButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    txtBottom: {
        marginLeft: 30,
        opacity: 0.6,
        fontSize: 15,
        fontWeight: '100'
    },
    imageTopRow: {
        height: 70,
        width: 70,
        marginRight: 25,
        borderRadius: 50,
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 20,
    },

    containertopRowText: {
        flexDirection: 'column',
        marginLeft: 5
    },

    containerBottom: {
        paddingBottom: 50,
    },
    containerBottomItem: {
        padding: 15,
        marginTop: 12,
        marginLeft: 15,
        marginRight: 25,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 5
    },
    containerBottomLastItem: {
        alignItems: 'center',
        marginTop: 20,
        
    },
    containerBottomLastItemSearch: {
        marginTop: 20,
        alignItems: 'center',
    },
    bottomButtonBar: {

    }
});