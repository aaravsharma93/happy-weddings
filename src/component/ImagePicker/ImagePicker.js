// ImagePicker
import { H3 } from 'native-base';
import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import UploadPhotoAndVideo from '../../MainApplication/SignupScreens/UploadPhotoAndVideo';

export class CustomImagePicker extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        const {pickerMode = 'image' || 'video', showImagePicker, onPressOut, CaptureImage, CaptureVideo, UploadImage, UploadVideo, UploadImageFromFacebook, UploadVideoFromFacebook,pickerTitle, HideGalleryOption, HideFacebookOption} = this.props
        return(
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showImagePicker}
                >
                    <TouchableOpacity 
                        style={styles.centeredView}
                        activeOpacity={1} 
                        onPressOut={() =>onPressOut()}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <View style={{height : deviceDimesions.Height*0.1, alignSelf : 'center', justifyContent : 'center'}}>
                                    <H3>{pickerTitle}</H3>
                                </View>
                                <View style={{flexDirection : 'row', justifyContent : 'space-around', width : deviceDimesions.width*0.9, alignSelf : 'center', height : deviceDimesions.Height*0.17, alignItems : 'center', borderBottomWidth : 0.2,}}>
                                    <TouchableOpacity style={{alignItems : 'center'}} onPress={pickerMode === 'image' ? ()=>CaptureImage() : ()=>CaptureVideo()}>
                                        <Icon name={pickerMode === 'image' ? "camera" : "video-camera"}  color="#ff6600" size={20} />
                                        <Text style={{marginTop : deviceDimesions.Height*0.02}}>Camera</Text>
                                    </TouchableOpacity>
                                    {!HideGalleryOption ?
                                        <TouchableOpacity style={{alignItems : 'center'}} onPress={pickerMode === 'image' ? ()=>UploadImage() : ()=>UploadVideo()}>
                                            <Icon name="image" color="#33bbff" size={20} />
                                            <Text style={{marginTop : deviceDimesions.Height*0.02}}>Gallery</Text>
                                        </TouchableOpacity> 
                                        : null
                                        }
                                    {!HideFacebookOption ?
                                        <TouchableOpacity style={{alignItems : 'center'}} 
                                        >
                                            <Icon name="facebook" color="#3385ff" size={20} />
                                            <Text style={{marginTop : deviceDimesions.Height*0.02}}>Facebook</Text>
                                        </TouchableOpacity>
                                        : null
                                    }
                                </View>
                                <TouchableOpacity style={{width : deviceDimesions.width*0.9, alignSelf : 'center', height : deviceDimesions.Height*0.08, alignItems : 'center', justifyContent : 'center'}} onPress={()=>onPressOut()}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.2)",
      },
      modalView: {
        margin: 10,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 20,
        height : deviceDimesions.Height*0.35,
        width : deviceDimesions.width*0.95,
        alignSelf: "center",
        elevation : 4,
        bottom : deviceDimesions.Height*0.005,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
      },
})