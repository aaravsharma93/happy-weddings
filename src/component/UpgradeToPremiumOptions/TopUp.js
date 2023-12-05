// TopUp

import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { goToAddonPackagesScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';

export class TopUpSliderCard extends Component{
    render(){
        return(
            <View>
               <NeuView
                    color = "#f5f5f5"
                    borderRadius = {20}
                    width = {deviceDimesions.width*0.9}
                    height = {deviceDimesions.Height*0.35}
                    convex
                >
                    <LinearGradient
                        colors={['#ffa64d', '#ffa64d', '#ff944d', '#ff3333']} style={styles.linearGradient}
                    >
                        <Text style={{color : "#f5f5f5", fontSize : 20, marginLeft : deviceDimesions.width*0.03, fontWeight : "600"}}>Top Up</Text>
                        
                        <View style = {{marginTop : deviceDimesions.Height*0.005, padding : 10}}>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>Profile Highlighter</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>Contact</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>Astro Match</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>Featured Service</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>Happy Wedding Assist</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </NeuView>
            </View>
        )
    }
}

export class TopUpCardContent extends Component{
    render(){
        return(
            <View>
                <View
                    style={{width : deviceDimesions.width*0.9, padding : deviceDimesions.width*0.015, alignSelf : "center", borderRadius : 15}}
                >
                    <View style={{backgroundColor : "#f5f5f5", width : deviceDimesions.width*0.95, alignSelf : "center", elevation : 5, padding : deviceDimesions.width*0.02, borderRadius : 10, marginTop : deviceDimesions.Height*0.015}}>
                        <View style = {{alignItems : "center"}}>
                            <Image source={ImagesPathVariable.ProfileHighlighterCardImage} style={{height : deviceDimesions.Height*0.15, width : deviceDimesions.width*0.6, resizeMode : "contain"}} />
                            <Text style={{fontSize : 18, fontWeight : "600", color : "#ff6600", marginTop : deviceDimesions.Height*0.01}}>Profile Highlighter</Text>
                            <Text style={{fontSize : 14, opacity : 0.8, marginTop : deviceDimesions.Height*0.01}}>Highlight Your profile and stand out from others</Text>
                        </View>
                        <View style={{width : deviceDimesions.width*0.9,  flexDirection : "row",justifyContent : "space-around", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems : "center"}}>
                                    <Text style={{}}>1 Month</Text>
                                    <TouchableOpacity
                                        style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.01, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.04, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.2, flexDirection : "row"}}
                                    >
                                        <Icon name="inr" color="#f5f5f5" size={16} />
                                        <Text style={{fontSize : 14, color : "#f5f5f5", fontWeight : "700"}}>1,000</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems : "center"}}>
                                    <Text style={{}}>1 Month</Text>
                                    <TouchableOpacity
                                        style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.01, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.04, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.2, flexDirection : "row"}}
                                    >
                                        <Icon name="inr" color="#f5f5f5" size={16} />
                                        <Text style={{fontSize : 14, color : "#f5f5f5", fontWeight : "700"}}>1,000</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                    <View style={{backgroundColor : "#f5f5f5", width : deviceDimesions.width*0.95, alignSelf : "center", elevation : 5, padding : deviceDimesions.width*0.02, borderRadius : 10, marginTop : deviceDimesions.Height*0.015}}>
                        <View style = {{alignItems : "center"}}>
                            <Image source={ImagesPathVariable.AstroMatchCardImage} style={{height : deviceDimesions.Height*0.15, width : deviceDimesions.width*0.6, resizeMode : "contain"}} />
                            <Text style={{fontSize : 18, fontWeight : "600", color : "#ff6600", marginTop : deviceDimesions.Height*0.01}}>Astro Match</Text>
                            <Text style={{fontSize : 14, opacity : 0.8, marginTop : deviceDimesions.Height*0.01}}>Highlight Your profile and stand out from others</Text>
                        </View>
                        <View style={{width : deviceDimesions.width*0.9,  flexDirection : "row",justifyContent : "space-around", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems : "center"}}>
                                    <Text style={{}}>1 Month</Text>
                                    <TouchableOpacity
                                        style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.01, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.04, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.2, flexDirection : "row"}}
                                    >
                                        <Icon name="inr" color="#f5f5f5" size={16} />
                                        <Text style={{fontSize : 14, color : "#f5f5f5", fontWeight : "700"}}>1,000</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems : "center"}}>
                                    <Text style={{}}>1 Month</Text>
                                    <TouchableOpacity
                                        style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.01, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.04, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.2, flexDirection : "row"}}
                                    >
                                        <Icon name="inr" color="#f5f5f5" size={16} />
                                        <Text style={{fontSize : 14, color : "#f5f5f5", fontWeight : "700"}}>1,000</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                    <View style={{backgroundColor : "#f5f5f5", width : deviceDimesions.width*0.95, alignSelf : "center", elevation : 5, padding : deviceDimesions.width*0.02, borderRadius : 10, marginTop : deviceDimesions.Height*0.015}}>
                        <View style = {{alignItems : "center"}}>
                            <Image source={ImagesPathVariable.FeatureServicesCardImage} style={{height : deviceDimesions.Height*0.15, width : deviceDimesions.width*0.6, resizeMode : "contain"}} />
                            <Text style={{fontSize : 18, fontWeight : "600", color : "#ff6600", marginTop : deviceDimesions.Height*0.01}}>Feature Service</Text>
                            <Text style={{fontSize : 14, opacity : 0.8, marginTop : deviceDimesions.Height*0.01}}>Highlight Your profile and stand out from others</Text>
                        </View>
                        <View style={{width : deviceDimesions.width*0.9,  flexDirection : "row",justifyContent : "space-around", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems : "center"}}>
                                    <Text style={{}}>1 Month</Text>
                                    <TouchableOpacity
                                        style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.01, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.04, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.2, flexDirection : "row"}}
                                    >
                                        <Icon name="inr" color="#f5f5f5" size={16} />
                                        <Text style={{fontSize : 14, color : "#f5f5f5", fontWeight : "700"}}>1,000</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems : "center"}}>
                                    <Text style={{}}>1 Month</Text>
                                    <TouchableOpacity
                                        style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.01, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.04, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.2, flexDirection : "row"}}
                                    >
                                        <Icon name="inr" color="#f5f5f5" size={16} />
                                        <Text style={{fontSize : 14, color : "#f5f5f5", fontWeight : "700"}}>1,000</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                    <View style={{backgroundColor : "#f5f5f5", width : deviceDimesions.width*0.95, alignSelf : "center", elevation : 5, padding : deviceDimesions.width*0.02, borderRadius : 10, marginTop : deviceDimesions.Height*0.015}}>
                        <View style = {{alignItems : "center"}}>
                            <Image source={ImagesPathVariable.ContactCardImage} style={{height : deviceDimesions.Height*0.15, width : deviceDimesions.width*0.6, resizeMode : "contain"}} />
                            <Text style={{fontSize : 18, fontWeight : "600", color : "#ff6600", marginTop : deviceDimesions.Height*0.01}}>Contact</Text>
                            <Text style={{fontSize : 14, opacity : 0.8, marginTop : deviceDimesions.Height*0.01}}>Highlight Your profile and stand out from others</Text>
                        </View>
                        <View style={{width : deviceDimesions.width*0.9,  flexDirection : "row",justifyContent : "space-around", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems : "center"}}>
                                    <Text style={{}}>1 Month</Text>
                                    <TouchableOpacity
                                        style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.01, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.04, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.2, flexDirection : "row"}}
                                    >
                                        <Icon name="inr" color="#f5f5f5" size={16} />
                                        <Text style={{fontSize : 14, color : "#f5f5f5", fontWeight : "700"}}>1,000</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems : "center"}}>
                                    <Text style={{}}>1 Month</Text>
                                    <TouchableOpacity
                                        style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.01, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.04, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.2, flexDirection : "row"}}
                                    >
                                        <Icon name="inr" color="#f5f5f5" size={16} />
                                        <Text style={{fontSize : 14, color : "#f5f5f5", fontWeight : "700"}}>1,000</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                    <View style={{alignItems : "center", padding : deviceDimesions.width*0.05}}>     
                        <TouchableOpacity
                            style={{backgroundColor : '#ff6600', borderRadius : 10, marginTop : deviceDimesions.Height*0.015, alignItems : "center", elevation : 5, height : deviceDimesions.Height*0.06, justifyContent : "space-evenly", padding : 5, width : deviceDimesions.width*0.3, flexDirection : "row"}}
                        >
                            <Text style={{fontSize : 16, color : "#f5f5f5", fontWeight : "700"}}>Next</Text>
                            <Icon name="chevron-right" color="#f5f5f5" size={16} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        height : deviceDimesions.Height*0.35,
        width : deviceDimesions.width*0.9,
        borderRadius: 5,
        padding : 10
      },
})