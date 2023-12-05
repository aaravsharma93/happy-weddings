// Settings
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, TouchableOpacity, KeyboardAvoidingView, Modal, ScrollView} from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { goToEditUserPreferencesScreen, goToLandingScreen, goToLoginScreen, goToPrivacySettingsScreen, goToUpgradeToPremiumScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import { Logout } from '../../helper/API_Call/API_Call';
import { ToastAndroid } from 'react-native';

export default class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            carouselItems: [
                {
                    type : 'img',
                    image : ImagesPathVariable.MatchedUserProfileScreenSliderImage1
                },
                {
                    type : 'img',
                    image : ImagesPathVariable.MatchedUserProfileScreenSliderImage2
                },
                {
                    type : 'img',
                    image : ImagesPathVariable.MatchedUserProfileScreenSliderImage3
                },
              ],
              activeDotIndex : 0,
              access_token : '',
        }
        
    }

    async componentDidMount(){
        let userData = JSON.parse(await AsyncStorage.getItem('user_data'))
        let access_token = userData.auth_token

        this.setState({access_token})
    }

    _renderSliderItem({item,index}){
        return <TouchableOpacity onPress={()=>goToUpgradeToPremiumScreen()} style={{
                        alignItems : 'center' }}>
                    <Image style={{height : deviceDimesions.Height*0.3, width : deviceDimesions.width*0.9, resizeMode : 'cover'}} source={item.image} />
                </TouchableOpacity>
    }

    async onLogOutPress(){
        console.log(this.state.access_token,"this.state.access_token")
        Logout(this.state.access_token)
        .then( async (res)=>{
            let response = res;
            console.log(response.data)
            if(response.data.status){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                this.props.onLogOutResetStack()
                goToLoginScreen({openModel : false})
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
            }

        })
        .catch(err=>{
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

    render(){
        const {onBackButtonPress} = this.props
        return(
            <View style={styles.container}>
                <View style={{width : deviceDimesions.width*0.95, alignSelf : "center", alignItems : "center", flexDirection : "row", padding : 10}}>
                    <TouchableOpacity onPress={()=>onBackButtonPress()} style={{}}>
                        <Icon name="chevron-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{fontSize : 18, marginLeft : deviceDimesions.width*0.05}}>Settings</Text>
                </View>
                <View style={styles.contentContainer}>
                    

                    <View style = {{marginTop : deviceDimesions.Height*0.015, alignSelf : "center"}}>
                        <NeuButton
                            color = "#ffffff"
                            width = {deviceDimesions.width*0.9}
                            height = {deviceDimesions.Height*0.06}
                            borderRadius = {8}
                            onPress = {()=>this.onLogOutPress()}
                            containerStyle = {{
                                flexDirection : "row",
                                justifyContent : "space-around",
                                padding : 5
                            }}
                        >
                            <View style={{alignItems : "flex-start", width : deviceDimesions.width*0.6}}>
                                <Text>Logout</Text>
                            </View>
                            <View style={{alignItems : "center", width : deviceDimesions.width*0.2}}>
                                <Icon name="sign-out" color="orange" size = {18} />
                            </View>
                        </NeuButton>
                    </View>
                 
                </View>

                <View style={{position : "absolute", bottom : -10, height : deviceDimesions.Height*0.385}}>
                     <Carousel
                            layout={'default'} 
                            ref={ref => this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={deviceDimesions.width}
                            itemWidth={deviceDimesions.width-20}
                            layoutCardOffset = {9}
                            renderItem={this._renderSliderItem}
                            onSnapToItem = { index => this.setState({activeDotIndex:index}) }
                            autoplay = {true}
                            loop
                            autoplayDelay = {10000}
                            autoplayInterval = {10000}
                    />
                    <Pagination
                        dotsLength={this.state.carouselItems.length}
                        activeDotIndex={this.state.activeDotIndex}
                        containerStyle={{ 
                            backgroundColor: 'rgba(247,247,247,0)',
                        }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 10,
                            marginHorizontal: 1,
                            backgroundColor: 'rgb(255,139,3)'
                        }}
                        inactiveDotStyle={{
                            backgroundColor : 'rgb(255,139,3)'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : deviceDimesions.Height*0.01,
        width : deviceDimesions.width,
    },
    contentContainer : {
        paddingBottom : deviceDimesions.Height*0.07
    },
})
