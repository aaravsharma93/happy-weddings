// UpgradeToPremium

import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, Alert, AndroidBackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AssistedCardContent, AssistedSliderCard } from '../../component/UpgradeToPremiumOptions/Assisted';
import { UnlockDiamondCardContent, UnlockDiamondSliderCard } from '../../component/UpgradeToPremiumOptions/UnlockDiamond';
import { TopUpCardContent, TopUpSliderCard } from '../../component/UpgradeToPremiumOptions/TopUp';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { H3 } from 'native-base';
import { goToAddonPackagesScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import { checkPaymentStatusWebView, ClaimNowPackage, GetMemberDetail, getPackageList } from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { Overlay } from 'react-native-elements';
import { FlatList } from 'react-native';
import WebView from 'react-native-webview';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { ToastAndroid } from 'react-native';

class PackageCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            showPriceModal: false,
            showWebView: false,
            selectedPlanData: {
                userID: '',
                selectedPlan: '',
            },
            timeStamp: '',
            isUserEligibleForOutReach: true
        }
    }

    async componentDidMount() {
        let userData = JSON.parse(await AsyncStorage.getItem('user_data'))

        const access_token = await AsyncStorage.getItem('access_token');
        this.setState({ access_token });
        await GetMemberDetail("", this.state.access_token).then(res => {
            let response = res;
            console.log(response.data.data)
            if (response.data.status) {
                if (response.data.data.eligible_for_claim == 'not_eligible') {
                    this.setState({ isUserEligibleForOutReach: false })
                } else if (response.data.data.eligible_for_claim == 'eligible') {
                    this.setState({ isUserEligibleForOutReach: true })
                } else {
                    this.setState({ isUserEligibleForOutReach: "Already Claimed" })
                }
            }
        })
            .catch(err => {
                let error = err
                console.log(error)
            })

        let selectedPlanData = { ...this.state.selectedPlanData };
        selectedPlanData.userID = userData.userdata.member_id;
        this.setState({ selectedPlanData })
    }

    checkPaymentStatus() {
        let fetchStatus = setInterval(() => {
            if (!this.state.showWebView) {
                clearInterval(fetchStatus)
            }
            else {
                checkPaymentStatusWebView(this.state.access_token, this.state.timeStamp).then(res => {
                    let response = res
                    console.log(response.data)
                    if (response.data.status) {
                        clearInterval(fetchStatus)
                        this.setState({ showWebView: false })
                    }
                })
            }

        }, 3000);
    }

    async onPlanSelection(planObj) {
        console.log(planObj,"-------------planObj-----------")
        let timeStamp = new Date().getTime();
        this.setState({ timeStamp })
        this.checkPaymentStatus()

        let selectedPlanData = { ...this.state.selectedPlanData };
        console.log("selectedPlanData",selectedPlanData)
        selectedPlanData.selectedPlan = planObj.planID

        this.setState({ selectedPlanData }, () => this.setState({ showWebView : true }))
    }

    async onClaimOutReachPress() {
        ClaimNowPackage(this.state.access_token).then(res => {
            let response = res
            if (response.data.status) {
                ToastAndroid.showWithGravityAndOffset(
                    "Your claim for basic plan has been sent for admin approval. We will inform you soon.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                this.forceUpdate()
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                )
            }
        })
    }

    renderLoadingView() {
        return (
            <LoaderOnButtonPress showLoader={true} LoadingText={""} />
        );
    }

    render() {
        const { backgroundImage, CardTitle, detailsArr, ChoosePlanButton, PackageIcon, PackagePlans, CardIndex } = this.props
        return (
            <ImageBackground source={backgroundImage} style={{ display: CardIndex == 3 && !this.state.isUserEligibleForOutReach && typeof (this.state.isUserEligibleForOutReach) == 'boolean' ? 'none' : 'flex', width: deviceDimesions.width * 0.92, justifyContent: 'center', alignItems: 'center', paddingVertical: deviceDimesions.Height * 0.01, padding: 5, paddingHorizontal: deviceDimesions.width * 0.03, marginTop: CardIndex == 0 ? deviceDimesions.Height * 0.025 : 0, marginVertical: deviceDimesions.Height * 0.01, borderRadius: 15 }} imageStyle={{ borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', width: deviceDimesions.width * 0.85, justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center' }}>
                    <View style={{ width: deviceDimesions.width * 0.6 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#ffffff', marginBottom: deviceDimesions.Height * 0.01 }}>{CardTitle}</Text>
                        {detailsArr.length > 1 ?
                            detailsArr.map((el, i) => {
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: deviceDimesions.Height * 0.005 }}>
                                        <Icon name={el.isProvided ? "check" : "times"} size={10} color="#ffffff" />
                                        <Text style={{ fontSize: 12, marginLeft: deviceDimesions.width * 0.02, width: deviceDimesions.width * 0.55, color: '#ffffff' }}>{el.feature}</Text>
                                    </View>
                                )
                            })
                            :
                            detailsArr.map((el, i) => {
                                return (
                                    <View style={{ marginBottom: deviceDimesions.Height * 0.005 }}>
                                        <Text style={{ fontSize: 12, width: deviceDimesions.width * 0.55, color: '#ffffff' }}>{el.feature}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    {CardIndex == 3 && this.state.isUserEligibleForOutReach && typeof (this.state.isUserEligibleForOutReach) != 'boolean' ?
                        <View style={{ width: deviceDimesions.width * 0.2, height: deviceDimesions.Height * 0.18, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#ffffff', fontWeight: '700' }}>Already</Text>
                            <Text style={{ color: '#ffffff', fontWeight: '700' }}>Claimed</Text>
                        </View>
                        :
                        <TouchableOpacity
                            style={{ width: deviceDimesions.width * 0.2, height: deviceDimesions.Height * 0.18, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-evenly' }}
                            onPress={CardIndex != 3 ? () => this.setState({ showPriceModal: true }) : () => this.onClaimOutReachPress()}
                        >
                            <Image source={PackageIcon} style={{ width: deviceDimesions.width * 0.22, height: deviceDimesions.Height * 0.12, resizeMode: 'center' }} />
                            <Image source={ChoosePlanButton} style={{ width: deviceDimesions.width * 0.2, height: deviceDimesions.Height * 0.03, resizeMode: 'stretch' }} />
                        </TouchableOpacity>
                    }
                </View>
                {
                    this.state.showPriceModal ?
                        <View style={{ position: 'absolute', borderRadius: 10, width: deviceDimesions.width * 0.92, height: '110%', alignSelf: 'center', marginVertical: -deviceDimesions.Height * 0.01, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ showPriceModal: !this.state.showPriceModal })}
                                style={{ position: 'absolute', right: 2, top: 2, alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 7, backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 20 }}
                            >
                                <Icon name="times" color="#ffffff" size={16} />
                            </TouchableOpacity>
                            <Text style={{ alignSelf: 'center', color: '#ffffff', fontSize: 18, fontWeight: '700', marginVertical: deviceDimesions.Height * 0.012 }}>Choose your option below</Text>
                            <View style={{ width: deviceDimesions.width * 0.9, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', alignSelf: 'center' }}>
                                <FlatList
                                    data={PackagePlans}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => <View style={{ width: deviceDimesions.width * 0.03 }}></View>}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ backgroundColor: '#ffffff', borderRadius: 15, width: deviceDimesions.width * 0.35, borderWidth: 1.5, borderColor: 'orange', paddingVertical: deviceDimesions.Height * 0.01 }}>
                                                <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Icon name="rupee-sign" color="#e67300" size={16} />
                                                    <Text style={{ marginLeft: deviceDimesions.width * 0.03, color: "#e67300", fontSize: 16, fontWeight: '700' }}>{item.planPrice}</Text>
                                                </View>
                                                <Text style={{ alignSelf: 'center', fontSize: 10, marginVertical: deviceDimesions.Height * 0.005 }}>{item.planValidity}</Text>
                                                <TouchableOpacity
                                                    onPress={() => this.onPlanSelection(item)}
                                                    style={{ backgroundColor: '#e67300', padding: 5, alignSelf: 'center', borderRadius: 10, width: deviceDimesions.width * 0.25, alignItems: 'center' }}>
                                                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '700' }}>Buy Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        </View>
                        : null
                }
                <Modal
                    animationType={'slide'}
                    visible={this.state.showWebView}
                    onRequestClose={() => this.setState({ showWebView: false })}
                    transparent
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ width: deviceDimesions.width, height: deviceDimesions.Height * 0.05, justifyContent: 'center', backgroundColor: '#ffffff' }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ showWebView: false })}
                                    style={{ padding: 10, width: deviceDimesions.width * 0.15, alignItems: 'center' }}
                                >
                                    <Icon name="times" color="rbg(0,0,0)" size={20} />
                                </TouchableOpacity>
                            </View>
                            <WebView
                                style={{ height: deviceDimesions.Height * 0.95, width: deviceDimesions.width }}
                                source={{ uri: `https://demo.happyweddings.com/home/package_web_view/${this.state.selectedPlanData.selectedPlan}/${this.state.selectedPlanData.userID}/1627880055` }}
                                scalesPageToFit
                                ref={(ref) => { this.webview = ref; }}
                                startInLoadingState
                                renderLoading={this.renderLoadingView}
                           
                            />
                        </View>
                    </View>
                </Modal >
            </ImageBackground>
        )
    }
}

// 45	Basic	2500	3 Months
// 46	Basic	4500	6 Months
// 47	Basic	9000	12 Months
// 50	Diamond	7500	3 Months
// 51	Diamond	12000	6 Months
// 52	Diamond	20000	12 Months
// 53	Happy Wedding Assist	10000	3 Months
// 54	Happy Wedding Assist	15000	6 Months
// 55	Happy Wedding Assist	20000	12 Months

export class UpgradeToPremium extends Component {
    constructor(props) {
        super(props)
        this.state = {
            packageArr: [
                {
                    title: 'BASIC',
                    packagePlans: [
                        { planID: 45, planPrice: 2500, planValidity: "3 Months" },
                        { planID: 46, planPrice: 4500, planValidity: "6 Months" },
                        { planID: 47, planPrice: 9000, planValidity: "12 Months" },
                    ],
                    packagePrice: '883',
                    PackageIcon: ImagesPathVariable.BasicPlanIcon,
                    packageDetails: [
                        { isProvided: true, feature: 'Rs. 883/month' },
                        { isProvided: true, feature: 'Chat with connected members' },
                        { isProvided: false, feature: 'Video calling with connected members' },
                        { isProvided: false, feature: 'Profile highlighter' },
                        { isProvided: false, feature: 'Top of search results' },
                    ],
                    backgroundImage: ImagesPathVariable.PackageBackground1
                },
                {
                    title: 'DIAMOND',
                    packagePlans: [
                        { planID: 50, planPrice: 7500, planValidity: "3 Months" },
                        { planID: 51, planPrice: 12000, planValidity: "6 Months" },
                        { planID: 52, planPrice: 20000, planValidity: "12 Months" },
                    ],
                    packagePrice: '2167',
                    PackageIcon: ImagesPathVariable.DiamondPlanIcon,
                    packageDetails: [
                        { isProvided: true, feature: 'Rs. 2167/month' },
                        { isProvided: true, feature: 'Diamond member tag' },
                        { isProvided: true, feature: 'Chat & video calling with connected members' },
                        { isProvided: true, feature: 'Profile highlighter' },
                        { isProvided: true, feature: 'Top of search results' },
                    ],
                    backgroundImage: ImagesPathVariable.PackageBackground2
                },
                {
                    title: 'HAPPY WEDDING ASSIST',
                    packagePlans: [
                        { planID: 53, planPrice: 10000, planValidity: "3 Months" },
                        { planID: 54, planPrice: 15000, planValidity: "6 Months" },
                        { planID: 55, planPrice: 20000, planValidity: "12 Months" },
                    ],
                    packagePrice: '3500',
                    PackageIcon: ImagesPathVariable.VIPPlanIcon,
                    packageDetails: [
                        { isProvided: true, feature: 'Get Happy Wedding Assist for just Rs. 3500/month & Leave all the hassle to us.' },
                        { isProvided: true, feature: 'Assisted tag' },
                        { isProvided: true, feature: 'Chat & video calling with connected members' },
                        { isProvided: true, feature: 'Profile highlighter' },
                        { isProvided: true, feature: 'Top of search results' },
                        { isProvided: true, feature: 'Dedicated Relationship Manager' },
                    ],
                    backgroundImage: ImagesPathVariable.PackageBackground3
                },
                {
                    title: 'HAPPY WEDDING OUTREACH',
                    packagePlans: false,
                    packagePrice: '0',
                    PackageIcon: ImagesPathVariable.OutReachPlanIcon,
                    packageDetails: [
                        {
                            isProvided: true,
                            feature: `As part of our mission to make Happy Weddings accessible to everyone, we made Basic Plan free for female members whose income fall under the lowest annual income range. If you are eligible, we would be glad to assist you.`
                        },
                    ],
                    backgroundImage: ImagesPathVariable.PackageBackground4
                },
            ]
        }
    }

    render() {
        const {a} = this.props
        return (
           
                <View style={styles.container}>
                    <View style={{ width: deviceDimesions.width * 0.95, backgroundColor: '#ff4d4d', alignItems: 'center', paddingVertical: deviceDimesions.Height * 0.015, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: "#ffffff" }}>UPGRADE NOW</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            this.state.packageArr.map((el, i) => {
                                return (
                                    <PackageCards
                                        PackageIcon={el.PackageIcon}
                                        backgroundImage={el.backgroundImage}
                                        CardTitle={el.title}
                                        detailsArr={el.packageDetails}
                                        ChoosePlanButton={i == 3 ? ImagesPathVariable.ClaimPlanButton : ImagesPathVariable.ChoosePlanButton}
                                        PackagePrice={el.packagePrice}
                                        CardIndex={i}
                                        PackagePlans={el.packagePlans}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        borderWidth: 0.7,
        borderRadius: 15,
        paddingBottom: 10,
        width: deviceDimesions.width * 0.95,
        alignSelf: 'center'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.8)",
    },
    modalView: {
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        borderRadius: 20,
        height: deviceDimesions.Height,
        width: deviceDimesions.width,
        alignItems: "center",
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
})