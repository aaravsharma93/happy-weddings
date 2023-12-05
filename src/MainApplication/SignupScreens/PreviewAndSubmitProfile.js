// PreviewAndSubmitProfile

import AsyncStorage from '@react-native-async-storage/async-storage';
import { H2 } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import { NeuButton } from 'react-native-neu-element';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToLoginScreen, goToPreviousScreen, goToWelcomeScreenSignScreen } from '../../helper/NavigationFunctions/NavigationFunctions';

export default class PreviewAndSubmitProfile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userName : '',
        }
    }

    backAction = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }
        else{
            Alert.alert("", "Skip registration process?", [
                { text: "No", onPress: () => null },
                { text: "YES", onPress: () => goToLoginScreen() }
            ]);
            return true;
        }
        };  


    async componentDidMount(){
        this.setState({UserImg : this.props.route.params.UserImg})
        console.log(this.props.route.params)
        this.setState({userName : await AsyncStorage.getItem('first_name_registration')})
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }
    render(){
        return(
            <View style={styles.container}>

                <View style={{height : deviceDimesions.Height*0.15}}>
                    <SignupFormHeader
                        progressValue={0.852} 
                        progressBarTotalWidth={deviceDimesions.width*0.9}
                        backIcon = {false}
                        onBackPress = {()=>goToPreviousScreen(this)}
                        ScreenLogoAndTitle = {true}
                    />
                </View>

                <View style={styles.contentContainer}>
                    <Image style={{height : 150, width : 150, borderRadius : 70, marginTop : 20}} source={this.state.UserImg ? this.state.UserImg : ImagesPathVariable.DummyUserLarge} />
                    <View style={styles.textContainer}>
                        <H2>Welcome {this.state.userName}</H2>
                        <Text style={styles.smallText}>Thanks for uploading your photo</Text>
                        <Text style={styles.smallText}>Your photo will be  live only after the screening</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                        <NeuButton
                            color = "#ffffff"
                            width = {deviceDimesions.width*0.4}
                            height = {deviceDimesions.Height*0.05}
                            borderRadius = {20}
                          
                        >
                            <Text>Preview Your Profile</Text>
                        </NeuButton>
                        <NeuButton
                            color = "#ffffff"
                            width = {deviceDimesions.width*0.4}
                            height = {deviceDimesions.Height*0.05}
                            borderRadius = {20}
                            onPress = {()=>{goToWelcomeScreenSignScreen()}}
                        >
                            <Text>Skip And Submit</Text>
                        </NeuButton>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        width : deviceDimesions.width,
        backgroundColor : "#ffffff"
    },
    contentContainer : {
        justifyContent : "center",
        alignItems : "center"
    },
    textContainer : {
        marginTop : deviceDimesions.Height*0.02,
        alignItems : "center"
    },
    smallText : {
        fontSize : 16,
        opacity : 0.7,
        marginTop : deviceDimesions.Height*0.01
    },
    buttonContainer : {
        flexDirection : "row",
        justifyContent : "space-around",
        marginTop : deviceDimesions.Height*0.05
    }
})