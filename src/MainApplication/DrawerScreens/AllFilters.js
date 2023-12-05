// AllFilters

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import {View, Image, StyleSheet, StatusBar, ImageBackground, Text, FlatList} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BaseURL } from '../../API_config/BaseURL';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { AddToShortlist, MutualMatchesListings, RemoveFromShortlist, SendInterest } from '../../helper/API_Call/API_Call';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToFilterByTypeScreen, goToMatchedUserProfileOverviewrScreen, goToTrustedBadgesScreen } from '../../helper/NavigationFunctions/NavigationFunctions';

export default class AllFilters extends Component {
    constructor(props){
        super(props)
        this.state = {
            access_token : '',
            MutualMatchesArr : [],
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: "",
            },
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

    async componentDidMount(){
        try {
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });
            await MutualMatchesListings(this.state.access_token).then(res => { let response = res; response.data.status ? this.setState({ MutualMatchesArr: response.data.data },console.log("Response is" + JSON.stringify(response.data.data))) : this.setState({ MutualMatchesArr: null }) }).catch(err => { let error = err; console.log(error) })
        } 
        catch (error) {
                Alert.alert('Error', 'There was an error.')
        }
    }

    async onShortlistPress(isShortlisted, memberID){
        this.ToggleLoader("Wait...", true)
        isShortlisted ?
        RemoveFromShortlist(memberID).then(res=>{
            let response = res;
            console.log(response.data)
            this.ToggleLoader("", false)
            ToastAndroid.showWithGravityAndOffset(
                "Removed From Shortlist ",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            this.forceUpdate();
        })
        .catch(err=>{
            console.log(err)
            this.ToggleLoader("", false)
        })
        :
        AddToShortlist(memberID).then(res=>{
            let response = res;
            console.log(response.data)
            this.ToggleLoader("", false)
            ToastAndroid.showWithGravityAndOffset(
                "Shortlisted",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            this.forceUpdate();
        })
        .catch(err=>{
            console.log(err)
            this.ToggleLoader("", false)
        })
    }

    async onInterestSend(memberID){
        this.ToggleLoader("Wait...", true)
        SendInterest(memberID).then(res=>{
            let response = res;
            this.ToggleLoader("", false)
            ToastAndroid.showWithGravityAndOffset(
                "Interest Sent",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            this.forceUpdate();
        })
        .catch(err=>{
            console.log(err)
            this.ToggleLoader("", false)
        })
    }

    render(){
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
                title: "Shortlisted"
            },
      ]

      

    const renderItem = (ele) => {
        return (
            <ImageBackground source={{uri : BaseURL.DemoURL+ele.profile_image}} style={styles.UsersCardContainer}>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', width : deviceDimesions.width*0.42, alignSelf : "center", padding : 5, alignItems : "center"}}>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                        <Image source={IconsPathVariable.ImagesIcon} />
                        <Text style={{marginLeft : 5}}>You & Her</Text>
                    </View>
                        <TouchableOpacity 
                            onPress= {()=>goToTrustedBadgesScreen()}
                            style={{borderRadius : 30, elevation : 3, backgroundColor : '#f5f5f5'}}>
                            <Image source={IconsPathVariable.ShieldIcon} />
                        </TouchableOpacity>
                </View>
                <LinearGradient
                    colors={['rgba(238, 241, 247,0.1)', 'rgba(238, 241, 247,0.5)', 'rgba(0, 0, 0,0.5)']} style={styles.linearGradient}
                >
                    <View style={{position : "absolute", bottom : 30, padding : 5, backgroundColor : 'rgba(255,255,255,0.0)' }}>
                        <TouchableOpacity 
                            onPress={()=>goToMatchedUserProfileOverviewrScreen(ele)}
                        >
                            <Text style={{fontSize : 14, fontWeight : '700'}}>{ele.first_name}</Text>
                            <Text style={{fontSize : 10, fontWeight : "600", opacity : 0.7}}>24 yrs</Text>
                            <Text style={{fontSize : 10, fontWeight : "600", opacity : 0.7}}>Banking Professional in SIB</Text>
                            <Text style={{fontSize : 10, fontWeight : "600", opacity : 0.7}}>{ele.residence_place}</Text>
                            <Text style={{fontSize : 10, fontWeight : "600", opacity : 0.7}}>{ele.mother_tongue}, {ele.caste}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{position : "absolute", bottom : 2,flexDirection : "row", justifyContent : "space-around", width : deviceDimesions.width*0.45}}>
                        <TouchableOpacity onPress={()=>{this.onShortlistPress(ele.shortlisted, ele.member_id).then(res=>ele.shortlisted = !ele.shortlisted)}} style={{backgroundColor : '#ff6f00', alignItems : 'center', borderRadius : 10, padding : 5, flexDirection : 'row', justifyContent : 'space-evenly' }}>
                            <Text style={{color : '#f5f5f5', fontSize : 8, marginRight : 5}}>{!ele.shortlisted ? 'SHORTLIST' : 'SHORTLISTED'}</Text>
                            <Icon name='download'  color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{!ele.interest_sent ? this.onInterestSend(ele.member_id).then(res=>{ele.interest_sent = !ele.interest_sent}) : null}} style={{backgroundColor : '#f5f5f5', alignItems : 'center', borderRadius : 10, padding : 5, flexDirection : 'row',  justifyContent : 'space-evenly', eleevation : 3 }}>
                            <Text style={{marginRight : 5,fontSize : 8,}}>{!ele.interest_sent ? "SEND INTEREST" : "INTEREST SENT"}</Text>
                            <Icon name='paper-plane' color='#ff6f00'/>
                        </TouchableOpacity>
                    </View> 
                </LinearGradient>
            </ImageBackground>
        
        )
    }
        return(
            <View style={styles.container}>
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />
                <ScrollView contentContainerStyle={{paddingBottom : deviceDimesions.Height*0.06}}>
                    <View style={{width : deviceDimesions.width*0.9, alignSelf : 'center', marginTop : deviceDimesions.Height*0.02}}>
                    <NeuButton 
                        color = "#f5f5f5"
                        height = {deviceDimesions.Height*0.05}
                        width = {deviceDimesions.width*0.3}
                        borderRadius ={15}
                        containerStyle = {{
                            flexDirection : "row",
                            justifyContent : "space-around"
                        }}
                    >
                        <NeuBorderView
                            color = "#f5f5f5"
                            height = {deviceDimesions.Height*0.04}
                            width = {deviceDimesions.width*0.08}
                            borderRadius ={20}
                        >
                            <Icon name="filter" color="#ff6600" />
                        </NeuBorderView>
                        <Text>Filter</Text>
                    </NeuButton>
                </View>
                <View style={{width : deviceDimesions.width*0.95, alignSelf : 'center', marginTop : deviceDimesions.Height*0.02, flexWrap : 'wrap', flexDirection : 'row', justifyContent : 'space-evenly'}}>
                    {
                        filterListArr.map((el,i)=>{
                            return(
                                <TouchableOpacity 
                                    style={{ marginHorizontal : deviceDimesions.width*0.012, alignItems : 'center', marginTop : deviceDimesions.Height*0.015, padding : deviceDimesions.width*0.01, width : deviceDimesions.width*0.28}}
                                    onPress = {()=>{goToFilterByTypeScreen({title : el.title})}}
                                >
                                        <NeuView
                                        color = "#f5f5f5"
                                        borderRadius = {10}
                                        width = {deviceDimesions.width*0.25}
                                        height = {deviceDimesions.Height*0.13}
                                        concave
                                    >
                                        <NeuView
                                            color = "#f5f5f5"
                                            borderRadius = {10}
                                            width = {deviceDimesions.width*0.22}
                                            height = {deviceDimesions.Height*0.11}
                                            inset
                                        >
                                            <Image source={el.img} style={{height : deviceDimesions.Height*0.1, width : deviceDimesions.width*0.24 }} />
                                        </NeuView>
                                    </NeuView>
                                    <Text style={{fontSize : 10, marginTop : deviceDimesions.Height*0.01}}>{el.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={{marginTop : deviceDimesions.Height*0.04, width : deviceDimesions.width*0.97, alignSelf : 'center'}}>
                    <View style={{width : deviceDimesions.width*0.9, alignSelf : 'center'}}>
                        <Text style={{fontSize : 16, fontWeight : '500', marginVertical : deviceDimesions.Height*0.015}}>Featured Profiles</Text>
                    </View>
                    <FlatList 
                        data={this.state.MutualMatchesArr}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>renderItem(item)}
                    />
                </View>
                </ScrollView>
                 </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linearGradient : {
        flex: 1,
        borderRadius: 5
    },
    UsersCardContainer : {
        width : deviceDimesions.width*0.45,
        margin : deviceDimesions.width*0.02,
        height : deviceDimesions.Height*0.25
    }
})