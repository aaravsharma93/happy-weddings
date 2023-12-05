// InterestedInProfileCard
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { H3 } from 'native-base';

export default class InterestedInProfileCard extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        const {TimeOfNotification} = this.props
        return(
            <View style={styles.container}>
                <NeuView
                    height = {deviceDimesions.Height*0.27}
                    width = {deviceDimesions.width*0.9}
                    color = "#f5f5f5"
                    borderRadius = {10}
                    concave
                    containerStyle = {{
                        padding : 10
                    }}
                >
                    <View style={{flexDirection : "row", alignSelf : "flex-end", alignItems : "center", justifyContent : "space-around", paddingRight : 5, paddingTop : 5}}>
                        <Text style={{marginRight : deviceDimesions.width*0.02}}>{TimeOfNotification} </Text>

                        <NeuView
                            color = "#f5f5f5"
                            width = {deviceDimesions.width*0.08}
                            height = {deviceDimesions.Height*0.045}
                            borderRadius = {20}
                        >
                            <Icon name='shield' color='red' size={16} />
                        </NeuView>
                    </View>

                    <View style={{flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
                        <View style={{width : deviceDimesions.width*0.3}}>
                            <Image source={ImagesPathVariable.DummyUserSmall} />
                        </View>
                        <View  style={{width : deviceDimesions.width*0.5}}>
                            <H3>Krishna Singh</H3>
                            <View style = {{flexDirection : "row", alignItems : "center", marginTop : deviceDimesions.Height*0.01}}>
                                <NeuBorderView
                                    color="#f5f5f5"
                                    width = {deviceDimesions.width*0.06}
                                    height = {deviceDimesions.Height*0.03}
                                    borderRadius = {20}
                                    inset
                                >
                                    <Icon name="circle" color="orange" />
                                </NeuBorderView>
                                <Text style={{marginLeft : deviceDimesions.width*0.05}}>Kochi</Text>
                            </View>
                            <Text style={{fontSize : 12, marginTop : deviceDimesions.Height*0.01}}>He is interested in your profile. Would youlike to communicate further ?</Text>
                        </View>
                    </View>

                    <View style={{flexDirection : "row", justifyContent : "space-around", alignSelf : "flex-end", padding : 10}}>
                        <View style={{marginRight : deviceDimesions.width*0.05}}>
                            <NeuButton
                                color="#f5f5f5"
                                width = {deviceDimesions.width*0.1}
                                height = {deviceDimesions.Height*0.05}
                                borderRadius = {20}
                                inset
                            >
                                <Icon name="times" size = {18} />
                            </NeuButton>
                        </View>
                        <View>
                            <NeuButton
                                color="#f5f5f5"
                                width = {deviceDimesions.width*0.1}
                                height = {deviceDimesions.Height*0.05}
                                borderRadius = {20}
                                inset
                            >
                                <Icon name="check" color="orange" size={18} />
                            </NeuButton>
                        </View>
                        
                        
                    </View>
                </NeuView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        marginTop : deviceDimesions.Height*0.02
    }
})