// TrustedBadges
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, TouchableOpacity, KeyboardAvoidingView, Modal, ScrollView} from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import { goToTrustBadgesSliderScreen } from '../../helper/NavigationFunctions/NavigationFunctions';

export default class TrustedBadges extends Component {
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
                    <Text style={{fontSize : 18, marginLeft : deviceDimesions.width*0.05}}>Trusted Badges</Text>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style = {{marginTop : deviceDimesions.Height*0.02}}>
                        <NeuView 
                            color = "#f5f5f5"
                            borderRadius = {15}
                            width = {deviceDimesions.width*0.9}
                            height = {deviceDimesions.Height*0.25}
                            containerStyle = {{
                                alignItems : "flex-start",
                                padding : 15,
                            }}
                        >
                            <Text style={{fontSize : 18, fontWeight : "600"}}>Identity Badge</Text>
                            <Text style = {{fontWeight : "500", marginTop : deviceDimesions.Height*0.01}}>Let members be able to trust your Age, Name and Date of birth</Text>
                            <Text style={{fontSize : 12, opacity : 0.7, marginTop : deviceDimesions.Height*0.01}}>To get this badge, Upload your Driving License or PAN Card or Passport (this will not shown to any member)</Text>
                            <View style={{marginTop : deviceDimesions.Height*0.02}}>
                                    <NeuButton
                                        color = "#f5f5f5"
                                        borderRadius = {20}
                                        width = {deviceDimesions.width*0.45}
                                        height = {deviceDimesions.Height*0.05}
                                        containerStyle = {{
                                            flexDirection : "row",
                                            justifyContent : "space-evenly",
                                            alignItems : "center"
                                        }}
                                        onPress = {()=>goToTrustBadgesSliderScreen()}
                                    >
                                        <Icon name="file" color="orange" />
                                        <Text>Upload Document</Text>
                                    </NeuButton>
                            </View>
                        </NeuView>
                    </View>
                    <View style = {{marginTop : deviceDimesions.Height*0.02}}>
                        <NeuView 
                            color = "#f5f5f5"
                            borderRadius = {15}
                            width = {deviceDimesions.width*0.9}
                            height = {deviceDimesions.Height*0.25}
                            containerStyle = {{
                                alignItems : "flex-start",
                                padding : 15,
                            }}
                        >
                            <Text style={{fontSize : 18, fontWeight : "600"}}>Professional Badge</Text>
                            <Text style = {{fontWeight : "500", marginTop : deviceDimesions.Height*0.01}}>Let members be able to trust your Occupation, Salary and Education details</Text>
                            <Text style={{fontSize : 12, opacity : 0.7, marginTop : deviceDimesions.Height*0.01}}>To get this badge, Please upload the following documents (this will not shown to any member)</Text>
                            <View style={{marginTop : deviceDimesions.Height*0.02, width : deviceDimesions.width*0.8, flexDirection : "row", justifyContent : "space-around"}}>
                                    <NeuButton
                                        color = "#f5f5f5"
                                        borderRadius = {20}
                                        width = {deviceDimesions.width*0.45}
                                        height = {deviceDimesions.Height*0.05}
                                        containerStyle = {{
                                            flexDirection : "row",
                                            justifyContent : "space-evenly",
                                            alignItems : "center"
                                        }}
                                        onPress = {()=>goToTrustBadgesSliderScreen()}
                                    >
                                        <Icon name="graduation-cap" color="orange" />
                                        <Text>Education Certificate</Text>
                                    </NeuButton>

                                    <NeuButton
                                        color = "#f5f5f5"
                                        borderRadius = {20}
                                        width = {deviceDimesions.width*0.3}
                                        height = {deviceDimesions.Height*0.05}
                                        containerStyle = {{
                                            flexDirection : "row",
                                            justifyContent : "space-evenly",
                                            alignItems : "center"
                                        }}
                                        onPress = {()=>goToTrustBadgesSliderScreen()}
                                    >
                                        <Icon name="inr" color="orange" />
                                        <Text>Salary Slip</Text>
                                    </NeuButton>
                            </View>
                        </NeuView>
                    </View>
                    <View style = {{marginTop : deviceDimesions.Height*0.02}}>
                        <NeuView 
                            color = "#f5f5f5"
                            borderRadius = {15}
                            width = {deviceDimesions.width*0.9}
                            height = {deviceDimesions.Height*0.25}
                            containerStyle = {{
                                alignItems : "flex-start",
                                padding : 15,
                            }}
                        >
                            <Text style={{fontSize : 18, fontWeight : "600"}}>Profile Badge</Text>
                            <Text style = {{fontWeight : "500", marginTop : deviceDimesions.Height*0.01}}>Let members be able to trust your Profile Photo</Text>
                            <Text style={{fontSize : 12, opacity : 0.7, marginTop : deviceDimesions.Height*0.01}}>Your profile does not have an image. Add a picture before we can verify it</Text>
                            <View style={{marginTop : deviceDimesions.Height*0.02}}>
                                    <NeuButton
                                        color = "#f5f5f5"
                                        borderRadius = {20}
                                        width = {deviceDimesions.width*0.4}
                                        height = {deviceDimesions.Height*0.05}
                                        containerStyle = {{
                                            flexDirection : "row",
                                            justifyContent : "space-evenly",
                                            alignItems : "center"
                                        }}
                                        onPress = {()=>goToTrustBadgesSliderScreen()}
                                    >
                                        <Icon name="user" color="orange" />
                                        <Text>Profile Picture</Text>
                                    </NeuButton>
                            </View>
                        </NeuView>
                    </View>
                    <View style = {{marginTop : deviceDimesions.Height*0.02}}>
                        <NeuView 
                            color = "#f5f5f5"
                            borderRadius = {15}
                            width = {deviceDimesions.width*0.9}
                            height = {deviceDimesions.Height*0.25}
                            containerStyle = {{
                                alignItems : "flex-start",
                                padding : 15,
                            }}
                        >
                            <Text style={{fontSize : 18, fontWeight : "600"}}>Social Badge</Text>
                            <Text style = {{fontWeight : "500", marginTop : deviceDimesions.Height*0.01}}>Let members be able to trust your Profile better with your social account linked.</Text>
                            <View style={{marginTop : deviceDimesions.Height*0.02, width : deviceDimesions.width*0.8, flexDirection : "row", justifyContent : "space-around"}}>
                                    <NeuButton
                                        color = "#f5f5f5"
                                        borderRadius = {20}
                                        width = {deviceDimesions.width*0.3}
                                        height = {deviceDimesions.Height*0.05}
                                        containerStyle = {{
                                            flexDirection : "row",
                                            justifyContent : "space-evenly"
                                        }}
                                        onPress = {()=>goToTrustBadgesSliderScreen()}
                                      >
                                          <NeuBorderView
                                                color = "#f5f5f5"
                                                width = {30}
                                                height = {30}
                                                borderRadius = {20}
                                                inset
                                            >
                                                    <Icon name="facebook" color="#3333ff" />
                                            </NeuBorderView>
                                            <Text style={{fontSize : 12}}>Facebook</Text>
                                    </NeuButton>

                                    <NeuButton
                                        color = "#f5f5f5"
                                        borderRadius = {20}
                                        width = {deviceDimesions.width*0.3}
                                        height = {deviceDimesions.Height*0.05}
                                        containerStyle = {{
                                            flexDirection : "row",
                                            justifyContent : "space-evenly"
                                        }}
                                        onPress = {()=>goToTrustBadgesSliderScreen()}
                                      >
                                          <NeuBorderView
                                                color = "#f5f5f5"
                                                width = {30}
                                                height = {30}
                                                borderRadius = {20}
                                                inset
                                            >
                                                    <Icon name="instagram" color="pink" />
                                            </NeuBorderView>
                                            <Text style={{fontSize : 12}}>Instagram</Text>
                                    </NeuButton>
                            </View>
                        </NeuView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : deviceDimesions.Height*0.01,
        height : deviceDimesions.Height,
        width : deviceDimesions.width,
    },
    contentContainer : {
        alignItems : "center",
        justifyContent : "space-around",
        paddingBottom : deviceDimesions.Height*0.07
    },
    centeredView: {
        flex: 1,
        paddingTop : deviceDimesions.Height*0.05,
        alignItems: "center",
      },
      modalView: {
        width : deviceDimesions.width*0.85,
        height : deviceDimesions.Height*0.45,
        paddingTop : deviceDimesions.Height*0.04,
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
