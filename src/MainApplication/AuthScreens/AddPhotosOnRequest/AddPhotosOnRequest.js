// AddPhotosOnRequest
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { NeuView, NeuInput, NeuButton } from 'react-native-neu-element';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { H3 } from 'native-base';
import ImagesPathVariable from '../../../helper/ImagesPathVariable/ImagesPathVariable';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';

export default class AddPhotosOnRequest extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <View style={styles.container}>
                 <StatusBar
                        backgroundColor = "rgba(0,0,0,0)"
                        barStyle = "dark-content"
                    />
                <View style={{margin : 10, alignItems : 'center'}}>
                    <View style={{flexDirection : 'row'}}>
                        <H3 style={{color : 'orange'}}>80% </H3>
                        <H3>of your matches are</H3>
                    </View>
                    <H3>not seeing you!</H3>
                </View>
                <View style={{alignItems : 'center'}}>
                    <Image 
                        source={ImagesPathVariable.LandingImage3} 
                        style={{height : deviceDimesions.Height*0.5, width : deviceDimesions.width*0.8, resizeMode : 'stretch'}} 
                    />
                </View>
                <View style={{marginTop : deviceDimesions.Height*0.03, alignItems : 'center'}}>
                        <H3>Add Photos to get noticed</H3>
                </View>
                <View style={{marginTop : deviceDimesions.Height*0.07, flexDirection : 'row', alignItems : "center", width : deviceDimesions.width, justifyContent : 'space-evenly'}}>
                    <TouchableOpacity>
                        <NeuView
                            height = {50}
                            width = {50}
                            color = '#f5f5f5'
                            borderRadius = {30}
                            convex
                        > 
                            <Icon name='image' color="orange" size={20} />
                        </NeuView>
                        <Text style={{marginTop : 10}}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <NeuView
                            height = {50}
                            width = {50}
                            color = '#f5f5f5'
                            borderRadius = {30}
                            convex
                        > 
                            <Icon name='camera' color="orange" size={20} />
                        </NeuView>
                        <Text  style={{marginTop : 10}}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <NeuView
                            height = {50}
                            width = {50}
                            color = '#f5f5f5'
                            borderRadius = {30}
                            convex
                        > 
                            <Icon name='facebook-square' color="orange" size={20} />
                        </NeuView>
                        <Text  style={{marginTop : 10}}>Camera</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent : 'center',
    },
  });