// AddonPackages

import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity} from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';

export class AddonPackages extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={{backgroundColor : "#8c8c8c", width : deviceDimesions.width*0.98, alignItems : "center", padding : 8, alignSelf : "center"}}>
                    <Text style={{color : "#f5f5f5", fontSize : 16, fontWeight : "600"}}>Select Addon</Text>
                </View>
                <ScrollView contentContainerStyle={{width : deviceDimesions.width, padding : deviceDimesions.width*0.02}}>
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
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#f5f5f5"
    },
})