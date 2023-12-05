// Blog
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, TouchableOpacity, KeyboardAvoidingView, Modal, ScrollView, NetInfo, ImageBackground} from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import LinearGradient from 'react-native-linear-gradient';
import { H3 } from 'native-base';

export default class Blog extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    render(){
        const {onBackButtonPress} = this.props
        return(
            <View style={styles.container}>
                <View style={{width : deviceDimesions.width*0.95, alignSelf : "center", alignItems : "center", flexDirection : "row", padding : 10}}>
                    <TouchableOpacity onPress={()=>onBackButtonPress()} style={{}}>
                        <Icon name="chevron-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{fontSize : 18, marginLeft : deviceDimesions.width*0.05}}>Success Stories</Text>
                    <View style={{ width : deviceDimesions.width*0.5,alignItems : "flex-end"}}>
                        <NeuButton
                            color = "#f5f5f5"
                            width = {deviceDimesions.width*0.25}
                            height = {deviceDimesions.Height*0.06}
                            borderRadius = {15}
                        >
                            <View style = {{flexDirection : "row", justifyContent : "space-around"}}>
                                <View>
                                    <Icon name="calendar-o" color="orange" size={16} />
                                </View>
                                <View style={{marginLeft : deviceDimesions.width*0.02, marginRight : deviceDimesions.width*0.02,}}>
                                    <Text>2020</Text>
                                </View>
                                <View>
                                    <Icon name="chevron-down" color="orange" size={16} />
                                </View>
                            </View>
                        </NeuButton>
                    </View>
                </View>
                <View style={{width : deviceDimesions.width*0.95, alignSelf : "center", padding : 10}}>
                    <Text style={{opacity : 0.7}}>More than 204,123 Success stories and counting</Text>
                </View>
                <ScrollView style={styles.contentContainer}>
                    <View style={{marginTop : deviceDimesions.Height*0.025, alignSelf : "center"}}>
                        <NeuView
                            color = "#f5f5f5"
                            width = {deviceDimesions.width*0.9}
                            height = {deviceDimesions.Height*0.3}
                            borderRadius = {10}
                            convex
                        >
                            <ImageBackground
                                imageStyle = {{borderRadius : 10, resizeMode : "stretch"}}
                                style = {{height : deviceDimesions.Height*0.3, width : deviceDimesions.width*0.9, elevation : 2}}
                                source = {ImagesPathVariable.BlogImage3}
                            >
                                <View style={{position : "absolute", bottom : 0}}>
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.0)', 'rgba(255,255,255,0.5)','rgba(255,255,255,0.7)', 'rgba(255,255,255,0.9)',]} 
                                        style={styles.linearGradient}
                                    >
                                        <View style={{marginTop : deviceDimesions.Height*0.05, justifyContent : "space-evenly"}}>
                                            <H3>Akash Gupta  - Kajal</H3>
                                            <Text>Lorem ipsum is simply dummy text. Lorem ipsum is simply dummy text. Lorem ipsum is simply dummy text.</Text>
                                            <View style={{flexDirection : "row", justifyContent : "space-evenly"}}>
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </ImageBackground>

                        </NeuView>
                    </View>
                    <View style={{marginTop : deviceDimesions.Height*0.025, alignSelf : "center"}}>
                        <NeuView
                            color = "#f5f5f5"
                            width = {deviceDimesions.width*0.9}
                            height = {deviceDimesions.Height*0.3}
                            borderRadius = {10}
                            convex
                        >
                            <ImageBackground
                                imageStyle = {{borderRadius : 10, resizeMode : "stretch"}}
                                style = {{height : deviceDimesions.Height*0.3, width : deviceDimesions.width*0.9, elevation : 2}}
                                source = {ImagesPathVariable.BlogImage3}
                            >
                                <View style={{position : "absolute", bottom : 0}}>
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.0)', 'rgba(255,255,255,0.5)','rgba(255,255,255,0.7)', 'rgba(255,255,255,0.9)',]} 
                                        style={styles.linearGradient}
                                    >
                                        <View style={{marginTop : deviceDimesions.Height*0.05}}>
                                            <H3>Akash Gupta  - Kajal</H3>
                                            <Text>Lorem ipsum is simply dummy text. Lorem ipsum is simply dummy text. Lorem ipsum is simply dummy text.</Text>
                                            <View style={{flexDirection : "row", justifyContent : "space-evenly"}}>
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </ImageBackground>

                        </NeuView>
                    </View>
                    <View style={{marginTop : deviceDimesions.Height*0.025, alignSelf : "center"}}>
                        <NeuView
                            color = "#f5f5f5"
                            width = {deviceDimesions.width*0.9}
                            height = {deviceDimesions.Height*0.3}
                            borderRadius = {10}
                            convex
                        >
                            <ImageBackground
                                imageStyle = {{borderRadius : 10, resizeMode : "stretch"}}
                                style = {{height : deviceDimesions.Height*0.3, width : deviceDimesions.width*0.9, elevation : 2}}
                                source = {ImagesPathVariable.BlogImage3}
                            >
                                <View style={{position : "absolute", bottom : 0}}>
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.0)', 'rgba(255,255,255,0.5)','rgba(255,255,255,0.7)', 'rgba(255,255,255,0.9)',]} 
                                        style={styles.linearGradient}
                                    >
                                        <View style={{marginTop : deviceDimesions.Height*0.05}}>
                                            <H3>Akash Gupta  - Kajal</H3>
                                            <Text>Lorem ipsum is simply dummy text. Lorem ipsum is simply dummy text. Lorem ipsum is simply dummy text.</Text>
                                            <View style={{flexDirection : "row", justifyContent : "space-evenly"}}>
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                                <Icon name="star" color="orange" size={18} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </ImageBackground>

                        </NeuView>
                    </View>
                    <View style={{margin : deviceDimesions.Height*0.05}}></View>
                </ScrollView>
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
        paddingBottom : deviceDimesions.Height*0.1
    },
    linearGradient : {
        padding : 10,
        width : deviceDimesions.width*0.9,
      },
})
