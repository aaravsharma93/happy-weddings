// UnlockDiamond

import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { H3 } from 'native-base';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';

export class UnlockDiamondSliderCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            DiamondPlanName : "3 Months",
            isPlanModalOpen : false,
        }
    }
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
                        <View style={{flexDirection : "row", justifyContent : "space-between"}}>
                            <View style={{flexDirection : "row", justifyContent : "space-around", alignItems : "center"}}>
                                <Text style={{color : "#f5f5f5", fontSize : 20, fontWeight : "600"}}>Unlock Diamond  </Text>
                                <Image source={IconsPathVariable.DiamondIcon} />
                                {/* <Image /> */}
                            </View>
                            <View>
                                <NeuButton
                                    color="#f5f5f5"
                                    width = {deviceDimesions.width*0.09}
                                    height = {deviceDimesions.Height*0.05}
                                    borderRadius = {20}
                                    noShadow
                                >
                                    <Icon name="video-camera" color="red"/>
                                </NeuButton>
                            </View>
                        </View>
                        
                        <View style = {{marginTop : deviceDimesions.Height*0.005, padding : 10}}>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.005, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>+ Silver Package</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.005, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>Gold member tag</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.005, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>1 month profile highlighter</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.005, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>Priority in search over silver/free in search result</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "flex-start", marginTop : deviceDimesions.Height*0.005, }}>
                                <View style={{alignSelf :"center"}}>
                                    <Icon name="star-half-o" color ="#f5f5f5" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{color : "#f5f5f5"}}>View 65 contacts + 40 astro match</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{flexDirection : "row", justifyContent : "space-around", width : deviceDimesions.width*0.9, padding : 5}}>
                            <TouchableOpacity
                                style={{backgroundColor : "rgba(255,255,255,0)", borderColor : "#f5f5f5", borderWidth : 0.5, borderRadius : 15, padding : 10}}
                                onPress = {()=>this.setState({isPlanModalOpen : true})}
                            >
                                <View style={{flexDirection : "row", justifyContent : "space-evenly", alignItems : "center"}}>
                                    <Text style={{color : "#f5f5f5", marginRight : deviceDimesions.width*0.03}}>{this.state.DiamondPlanName}</Text>
                                    <Icon name="chevron-down" color="#f5f5f5" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{backgroundColor : "rgba(255,255,255,0)", borderColor : "#f5f5f5", borderWidth : 0.5, borderRadius : 15, padding : 10}}
                            >
                                <View style={{flexDirection : "row", justifyContent : "space-evenly", alignItems : "center"}}>
                                    <Icon name="inr" color="#f5f5f5" />
                                    <Text style={{color : "#f5f5f5"}}>  7500 + tax  </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </NeuView>
                {/*  */}
                <Modal  animationType="slide"
                        transparent={true}
                        visible={this.state.isPlanModalOpen}
                        onBackdropPress = { () => this.setState({isPlanModalOpen:false})}
                        onRequestClose={() => {
                            this.setState({isPlanModalOpen:false})
                        }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <LinearGradient 
                                colors={['#ffa64d', '#ffa64d', '#ff944d', '#ff3333']} 
                                style={{width : deviceDimesions.width*0.6, alignItems : "center", padding : deviceDimesions.width*0.03}}
                            >
                                <TouchableOpacity 
                                    style={{borderBottomWidth : 0.4, borderBottomColor : "#f5f5f5", margin : deviceDimesions.width*0.03, width : deviceDimesions.width*0.45, alignItems : "center"}}
                                    onPress={()=>{this.setState({DiamondPlanName : "1 Month", isPlanModalOpen : false})}}
                                >
                                    <Text style={{color : "#f5f5f5", fontSize : 16}}>1 Month</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{borderBottomWidth : 0.4, borderBottomColor : "#f5f5f5", margin : deviceDimesions.width*0.03, width : deviceDimesions.width*0.45, alignItems : "center"}}
                                    onPress={()=>{this.setState({DiamondPlanName : "3 Month", isPlanModalOpen : false})}}
                                >
                                    <Text style={{color : "#f5f5f5", fontSize : 16}}>3 Month</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{borderBottomWidth : 0.4, borderBottomColor : "#f5f5f5", margin : deviceDimesions.width*0.03, width : deviceDimesions.width*0.45, alignItems : "center"}}
                                    onPress={()=>{this.setState({DiamondPlanName : "6 Month", isPlanModalOpen : false})}}
                                >
                                    <Text style={{color : "#f5f5f5", fontSize : 16}}>6 Month</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{borderBottomWidth : 0.4, borderBottomColor : "#f5f5f5", margin : deviceDimesions.width*0.03, width : deviceDimesions.width*0.45, alignItems : "center"}}
                                    onPress={()=>{this.setState({DiamondPlanName : "9 Month", isPlanModalOpen : false})}}
                                >
                                    <Text style={{color : "#f5f5f5", fontSize : 16}}>9 Month</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{borderBottomWidth : 0.4, borderBottomColor : "#f5f5f5", margin : deviceDimesions.width*0.03, width : deviceDimesions.width*0.45, alignItems : "center"}}
                                    onPress={()=>{this.setState({DiamondPlanName : "12 Month", isPlanModalOpen : false})}}
                                >
                                    <Text style={{color : "#f5f5f5", fontSize : 16}}>12 Month</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>        
                    </View>
                </Modal> 
       
            </View>
        )
    }
}

export class UnlockDiamondCardContent extends Component{
    render(){
        return(
            <View>
                <View
                    style={{width : deviceDimesions.width*0.9, backgroundColor : "#f5f5f5", elevation : 4, padding : deviceDimesions.width*0.015, alignSelf : "center", borderRadius : 15}}
                >
                    <View style = {{padding : 10, alignItems : "flex-start", width : deviceDimesions.width*0.85}}>
                            <View style={{flexDirection : "row", alignItems : "center"}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>Validity 3 Months</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>Send Unlimited Interests</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>View Unlimited Horoscopes</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>View 150 Contacts</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>Validity 3 Months</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>Send Unlimited Interests</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>View Unlimited Horoscopes</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>View 150 Contacts</Text>
                                </View>
                            </View>
                            <View style={{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.02}}>
                                <View style={{alignItems :"center"}}>
                                    <Icon name="star-half-o" color ="#ffa64d" />
                                </View>
                                <View style={{alignItems :"center", marginLeft : deviceDimesions.width*0.05}}>
                                    <Text style={{fontWeight : "600", opacity : 0.7}}>100 Astro Match</Text>
                                </View>
                            </View>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : 'rgba(255,255,255,0.5)'
    },
    modalView: {
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