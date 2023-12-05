// NotificationScreen
import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, TouchableOpacity, FlatList, Modal, ToastAndroid } from 'react-native';
import { NeuView, NeuInput, NeuButton, NeuBorderView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import { H3 } from 'native-base';
import ImagesPathVariable from '../../../helper/ImagesPathVariable/ImagesPathVariable';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import { goToDrawerHomeScreen, goToManagePhotoScreen, goToMatchedUserFullProfileScreen, goToMatchedUserProfileOverviewrScreen, goToMatchedUserProfilerScreen, goToPreviousScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';
import { getAllNotification, GetMemberDetail, NotificationReject, NotificationSeen, SendInterest } from '../../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL } from '../../../API_config/BaseURL';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconsPathVariable from '../../../helper/IconsPathVariable/IconsPathVariable';

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            access_token: "",
            notificationData: [],
            LiveUserData: '',
            noRequestPhoto: true,
            NotificationSeenDataArr: [],
            NotificationsSeenIds: '',
            NotiType : ""


        }
    }

    async componentDidMount() {
        const access_token = await AsyncStorage.getItem('access_token');
        this.setState({ access_token });

        await getAllNotification(this.state.access_token).then(res => {
            let response = res;
            console.log(response.data, "Notification_Data")
            if (response.data.status == true) {
                this.setState({ notificationData: response.data.data })
                let modifiedObj = {};
                let modifiedArr = [];
                this.state.notificationData.map((el, i) => {
                    modifiedObj = {
                        member_id: el.member_id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ NotificationSeenDataArr: modifiedArr })
                let selectedCountryIdArr = this.state.NotificationSeenDataArr.map((el, i) => el.member_id.toString())
                console.log(selectedCountryIdArr, "selectedCountryIdArr------------")
                this.setState({ NotificationsSeenIds: selectedCountryIdArr })

                 //Notification_Seen_Api 
                 NotificationSeen(this.state.NotificationsSeenIds, this.state.access_token).then(res => {
                    let response = res;
                    console.log(response.data.message, "Notification_Data_seeen=======")

                })
            } else if (response.data.status == false) {
                this.setState({ notificationData: false })
            }
        })

    }

    async onRejected(member_id) {
        NotificationReject(member_id,this.state.access_token).then(res => {
            let response = res;
            this.forceUpdate();
            getAllNotification(this.state.access_token).then(res => {
                let response = res;
                console.log(response.data, "Notification_Data")
                if (response.data.status == true) {
                    this.setState({ notificationData: response.data.data })
                } else if (response.data.status == false) {
                    this.setState({ notificationData: false })
                }
            })

        })
            .catch(err => {
                console.log(err)
            })

    }

    async onInterestSend(member_id) {
        SendInterest(member_id,this.state.access_token).then(res => {
            let response = res;
            this.forceUpdate();
            ToastAndroid.showWithGravityAndOffset(
                'Interest Sent',
                ToastAndroid.LONG,
                ToastAndroid.bottom,
                25,
                50
            );

        })
            .catch(err => {
            })

    }
    render() {

        const renderItem = (el, i, DataArr, title) => {
            return (
                <TouchableOpacity onPress={() => goToMatchedUserProfileOverviewrScreen(DataArr, i, "")}>
                    <View style={{
                        width: deviceDimesions.width * 0.95, backgroundColor: "white", borderRadius: 10, shadowColor: "#ffffff",
                        shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, height: 155, marginVertical: deviceDimesions.Height * 0.011, marginHorizontal: 10
                    }}>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <TouchableOpacity style={{ marginLeft: 340, position: 'absolute', marginTop: 5 }}>
                                <NeuBorderView
                                    color="#ffffff"
                                    borderRadius={20}
                                    width={deviceDimesions.width * 0.1}
                                    height={deviceDimesions.Height * 0.05}
                                    inset
                                >
                                    <Image
                                        style={{ width: 40, height: 40 }}

                                        source={IconsPathVariable.BadgesImage}
                                    />
                                </NeuBorderView>
                            </TouchableOpacity>
                            <View style={{ flex: 1, position: 'absolute', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: 155, }} >
                                <Image
                                    style={{
                                        height: 80,
                                        width: 80,
                                        borderRadius: 40,
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                    source={{ uri: BaseURL.DemoURL + el.profile_image }}
                                />
                            </View>
                            <View style={{ flex: 1, width: deviceDimesions.width * 0.9, marginLeft: 90, justifyContent: 'center', alignContent: 'center', height: 155, }}>
                                <Text style={{ fontSize: 17, fontWeight: '600' }}>{el.fullname}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    {
                                        el.designation ?
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    borderRadius={20}
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.04}
                                                    inset
                                                >
                                                    <Octicons name="primitive-dot" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={{ fontSize: 10, marginLeft: 5, width: deviceDimesions.width * 0.15 }}>{el.designation}</Text>

                                            </View>
                                            :
                                            null

                                    }
                                    {
                                        el.age ?
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    borderRadius={20}
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.04}
                                                    inset
                                                >
                                                    <Octicons name="primitive-dot" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={{ fontSize: 10, marginLeft: 5, width: deviceDimesions.width * 0.15 }}>{el.age}</Text>

                                            </View>
                                            :
                                            null

                                    }

                                    {
                                        el.city_name ?
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    borderRadius={20}
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.04}
                                                    inset
                                                >
                                                    <Octicons name="primitive-dot" color="orange" size={18} />
                                                </NeuBorderView>
                                                <Text style={{ fontSize: 10, marginLeft: 5, width: deviceDimesions.width * 0.15 }}>{el.city_name}</Text>

                                            </View>
                                            :
                                            null

                                    }

                                </View>
                                
                                <Text style={{ fontSize: 13, marginTop: deviceDimesions.Height * 0.007, width: deviceDimesions.width * 0.68, marginTop: 10 }}>{el.status_message}</Text>
                                {

                                    el.status_message.includes("liked your profile") ?
                                       
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                            <View style={{ flexDirection: "row" }}>
                                                <TouchableOpacity style={{ width: 50, height: 50 }} onPress={() => this.onRejected(el.member_id)}>
                                                    <NeuBorderView
                                                        color="#ffffff"
                                                        borderRadius={20}
                                                        width={deviceDimesions.width * 0.1}
                                                        height={deviceDimesions.Height * 0.05}
                                                        inset
                                                    >
                                                        <Entypo name="cross" color="black" size={18} />
                                                    </NeuBorderView>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ marginLeft: 10, width: 50, height: 50 }} onPress={() => this.onInterestSend(el.member_id)}>
                                                    <NeuBorderView
                                                        color="#ffffff"
                                                        borderRadius={20}
                                                        width={deviceDimesions.width * 0.1}
                                                        height={deviceDimesions.Height * 0.05}
                                                        inset
                                                    >
                                                        <Ionicons name="md-checkmark-sharp" color="orange" size={18} />
                                                    </NeuBorderView>
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                        :
                                        null

                                }
                                {
                                    el.status_message.includes("requested your photo") ?

                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity >
                                                    <View style={{
                                                        width: deviceDimesions.width * 0.3, backgroundColor: "white", borderRadius: 20, shadowColor: "#ffffff",
                                                        shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, height: 35, marginHorizontal: 10, flexDirection: 'row',
                                                        justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center'
                                                    }}>
                                                        <Text style={{ marginRight: 10 }}>No</Text>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={20}
                                                            width={deviceDimesions.width * 0.08}
                                                            height={deviceDimesions.Height * 0.04}
                                                            inset
                                                        >
                                                            <Entypo name="cross" color="black" size={18} />
                                                        </NeuBorderView>

                                                    </View>

                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => goToManagePhotoScreen()} >
                                                    <View style={{
                                                        width: deviceDimesions.width * 0.3, backgroundColor: "white", borderRadius: 20, shadowColor: "#ffffff",
                                                        shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, height: 35, marginHorizontal: 10, flexDirection: 'row',
                                                        alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
                                                    }}>
                                                        <Text style={{ marginRight: 10 }}>Add Photo</Text>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={20}
                                                            width={deviceDimesions.width * 0.08}
                                                            height={deviceDimesions.Height * 0.04}
                                                            inset
                                                        >
                                                            <Ionicons name="md-checkmark-sharp" color="orange" size={18} />
                                                        </NeuBorderView>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                        :
                                        null

                                }

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            )
        }


        const { onBackButtonPress } = this.props
        return (
            <View style={styles.container}>
                <View style={{ width: deviceDimesions.width * 0.95, alignSelf: "center", alignItems: "center", flexDirection: "row", padding: 10 }}>
                    <TouchableOpacity onPress={() => onBackButtonPress()} style={{}}>
                        <Icon name="chevron-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginLeft: deviceDimesions.width * 0.05 }}>Notifications</Text>
                </View>

                {
                    this.state.notificationData ?

                        <FlatList
                            data={this.state.notificationData}
                            renderItem={({ item, index }) => renderItem(item, index, this.state.notificationData, "")}
                        />

                        :
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', alignContent: 'center', flex: 1, alignItems: 'center', textAlignVertical: 'center', fontWeight: '700', fontSize: 20, color: 'orange', bottom: 40 }}>There are no new notification</Text>
                }


                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.modalOpen}
                    onBackdropPress={() => { this.setState({ modalOpen: !this.state.modalOpen }) }}
                    onRequestClose={() => { this.setState({ modalOpen: !this.state.modalOpen }) }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Image source={ImagesPathVariable.NotificationAlertImage} style={{ alignSelf: "center" }} />
                            <View style={{ alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
                                <H3>Hi Ahana</H3>
                                <Text style={{ fontSize: 16 }}>Congrats</Text>
                                <Text>Venki has accepted your interest</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: deviceDimesions.Height * 0.03 }}>
                                <View>
                                    <NeuButton
                                        color="#f5f5f5"
                                        width={deviceDimesions.width * 0.35}
                                        height={deviceDimesions.Height * 0.05}
                                        borderRadius={20}
                                        onPress={() => this.setState({ modalOpen: false })}
                                        inset
                                        containerStyle={{
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            padding: 10,
                                            alignItems: "center"
                                        }}
                                    >
                                        <NeuBorderView
                                            color="#f5f5f5"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.04}
                                            borderRadius={20}
                                            inset
                                        >
                                            <Icon name="eye" color="orange" />
                                        </NeuBorderView>
                                        <Text>View Profile</Text>
                                    </NeuButton>
                                </View>
                                <View>
                                    <NeuButton
                                        color="#f5f5f5"
                                        width={deviceDimesions.width * 0.35}
                                        height={deviceDimesions.Height * 0.05}
                                        onPress={() => this.setState({ modalOpen: false })}
                                        borderRadius={20}
                                        inset
                                        containerStyle={{
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            padding: 10,
                                            alignItems: "center"
                                        }}
                                    >
                                        <NeuBorderView
                                            color="#f5f5f5"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.04}
                                            borderRadius={20}
                                            inset
                                        >
                                            <Icon name="home" color="orange" />
                                        </NeuBorderView>
                                        <Text>View Contact</Text>
                                    </NeuButton>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: deviceDimesions.Height * 0.03 }}>
                                <View>
                                    <NeuButton
                                        color="#f5f5f5"
                                        width={deviceDimesions.width * 0.35}
                                        height={deviceDimesions.Height * 0.05}
                                        onPress={() => this.setState({ modalOpen: false })}
                                        borderRadius={20}
                                        inset
                                        containerStyle={{
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            padding: 10,
                                            alignItems: "center"
                                        }}
                                    >
                                        <NeuBorderView
                                            color="#f5f5f5"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.04}
                                            borderRadius={20}
                                            inset
                                        >
                                            <Icon name="comment" color="orange" />
                                        </NeuBorderView>
                                        <Text>Chat</Text>
                                    </NeuButton>
                                </View>
                                <View>
                                    <NeuButton
                                        color="#f5f5f5"
                                        width={deviceDimesions.width * 0.35}
                                        height={deviceDimesions.Height * 0.05}
                                        onPress={() => this.setState({ modalOpen: false })}
                                        borderRadius={20}
                                        inset
                                        containerStyle={{
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            padding: 10,
                                            alignItems: "center"
                                        }}
                                    >
                                        <NeuBorderView
                                            color="#f5f5f5"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.04}
                                            borderRadius={20}
                                            inset
                                        >
                                            <Icon name="video-camera" color="orange" />
                                        </NeuBorderView>
                                        <Text>Video Chat</Text>
                                    </NeuButton>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: deviceDimesions.Height * 0.01,
        height: deviceDimesions.Height,
        width: deviceDimesions.width,
    },
    contentContainer: {
        alignItems: "center",
        justifyContent: "space-around"
    },
    centeredView: {
        flex: 1,
        paddingTop: deviceDimesions.Height * 0.05,
        alignItems: "center",
    },
    modalView: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.45,
        paddingTop: deviceDimesions.Height * 0.04,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
})
