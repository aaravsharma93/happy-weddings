// Assisted
import { H3 } from 'native-base';
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class AssistedSliderCard extends Component{
    componentDidMount(){
        console.log(this.props.data)
    }
    render(){
        return(
            <View style={{}}>
                <NeuView
                    color = "#ffffff"
                    borderRadius = {20}
                    width = {deviceDimesions.width*0.9}
                    height = {deviceDimesions.Height*0.35}
                    convex
                >
                    <LinearGradient
                        colors={['#ffa64d', '#ffa64d', '#ff944d', '#ff3333']} style={styles.linearGradient}
                    >
                        <Text style={{color : "#ffffff", fontSize : 20, fontWeight : "600"}}>{this.props.data.package_name}</Text>
                        <View style = {{marginTop : deviceDimesions.Height*0.005, padding : 10}}>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#ffffff" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#ffffff"}}>{this.props.data.package_name} Tag on the profile</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#ffffff" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#ffffff"}}>{this.props.data.interest}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#ffffff" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#ffffff"}}>{this.props.data.horoscope}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#ffffff" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#ffffff"}}>{this.props.data.sms_mail_alert}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.015, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#ffffff" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#ffffff"}}>{this.props.data.view_contact_limit}</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </NeuView>
            </View>
        )
    }
}

export class AssistedCardContent extends Component{
    render(){
        return(
                <View
                    style={{width : deviceDimesions.width*0.9, backgroundColor : "#ffffff", elevation : 4, padding : deviceDimesions.width*0.015, alignSelf : "center", borderRadius : 15}}
                >
                 
                    <View style={{flexDirection : "row", justifyContent : "center", width : deviceDimesions.width*0.9,  alignSelf : "center", elevation : 5, marginTop : deviceDimesions.Height*0.01}}>
                     
                        <View style={{alignItems : "center"}}>
                            <TouchableOpacity
                                style={{padding : 5, borderColor : "orange", borderRadius : 15, borderWidth : 0.5, backgroundColor : "rgba(255,255,255,0)", flexDirection : "row", justifyContent : "space-evenly", alignItems : "center", width : deviceDimesions.width*0.35, height : deviceDimesions.Height*0.05}}
                            >
                                <Icon name="inr" color="orange" size={18} />
                                <Text>{this.props.data.amount}  </Text>
                                <NeuBorderView
                                    color="#ffffff"
                                    borderRadius = {20}
                                    width = {deviceDimesions.width*0.07}
                                    height= {deviceDimesions.Height*0.04}
                                    inset
                                >
                                    <Icon name="chevron-right" color="orange" />
                                </NeuBorderView>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {{padding : 10, alignItems : "flex-start", width : deviceDimesions.width*0.85}}>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>Validity {this.props.data.validity} Months</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.interest}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.horoscope}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.view_contact_limit}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.interest}</Text>
                                </View>
                            </View>
                            {this.props.data.video_caling_facility ?
                                <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                    <View style={{alignItems :"center"}}>
                                        <Icon name="star-half-o" color ="#ffa64d" />
                                    </View>
                                    <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                        <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.video_caling_facility}</Text>
                                    </View>
                                </View>
                                : null
                            }
                            {this.props.data.privacy_settings ?
                                <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                    <View style={{alignItems :"center"}}>
                                        <Icon name="star-half-o" color ="#ffa64d" />
                                    </View>
                                    <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                        <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.privacy_settings}</Text>
                                    </View>
                                </View>
                                : null
                            }
                            {this.props.data.assisted_service ?
                                <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02, backgroundColor : "#e2ffe3", padding : 5}}>
                                    <View style={{alignItems :"center"}}>
                                        <Icon name="star-half-o" color ="#ffa64d" />
                                    </View>
                                    <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                        <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.assisted_service}</Text>
                                    </View>
                                </View>
                                : null
                            }
                            {this.props.data.profile_highlighter ?
                                <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                    <View style={{alignItems :"center"}}>
                                        <Icon name="star-half-o" color ="#ffa64d" />
                                    </View>
                                    <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                        <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.profile_highlighter}</Text>
                                    </View>
                                </View>
                                : null
                            }
                            {this.props.data.search_priority ?
                                <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                    <View style={{alignItems :"center"}}>
                                        <Icon name="star-half-o" color ="#ffa64d" />
                                    </View>
                                    <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                        <Text style={{fontWeight : "600", opacity : 0.7}}>{this.props.data.search_priority}</Text>
                                    </View>
                                </View>
                                : null
                            }
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
