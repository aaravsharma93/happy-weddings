// SocialLoginButton
import { View } from 'native-base';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToPreviousScreen, goToSignupDetailsSignScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';

class ProfileCard extends React.Component {
    
    render(){
        const {imageSource, cardTitle, onCardPress} = this.props
        return(
            <NeuButton
                width = {deviceDimesions.width*0.4}
                height = {deviceDimesions.Height*0.09}
                color = "#ffffff"
                borderRadius = {10}
                containerStyle = {{
                    flexDirection : "row",
                    justifyContent : "space-evenly",
                    alignItems : "center"
                }}
                onPress = {()=>onCardPress()}
            >
                <NeuBorderView
                    width = {deviceDimesions.width*0.1}
                    height = {deviceDimesions.Height*0.06}
                    color = "#ffffff"
                    borderRadius = {8}
                    inset
                >
                    <Image source={imageSource} />
                </NeuBorderView>
                <Text style={{opacity : 0.7}}>{cardTitle}</Text>
            </NeuButton>
        )
    }
} 

export default class ProfileFor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            LoaderProperties : {
                isLoading : false,
                LoadingTitle : "",
            },
        }
    }

    ToggleLoader(name, title){
        this.setState({
              LoaderProperties : {
                  ...this.state.LoaderProperties,
                  LoadingTitle : name,
                  isLoading : title,
              }
          })
    }

    async onProfileCardPress(valueBool, value){
        
        if(value){
             await AsyncStorage.setItem('profileFor', value)
        }
        else{
            await AsyncStorage.setItem('profileFor', "Undefined")
        }

        goToSignupDetailsSignScreen({isGenderMale : valueBool});

    }
  render(){
    return(
      <View style={styles.container}>
            <StatusBar
                backgroundColor = "rgba(0,0,0,0)"
                barStyle = "dark-content"
            />
            {/* Loader */}
            <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText = {this.state.LoaderProperties.LoadingTitle} />

            {/* Header With Progress bar and screen title */}
            <SignupFormHeader 
                progressValue={0} 
                progressBarTotalWidth={deviceDimesions.width*0.9}
                backIcon = {false}
                onBackPress = {()=>goToPreviousScreen(this)}
                ScreenLogoAndTitle = {true}
                ScreenTitle = "Create Profile For"
            />

            {/* Screen Content */}
            <View style={styles.contentContainer}>
                <View style={styles.cardRow}>
                    <ProfileCard 
                        imageSource = {IconsPathVariable.SelfIcon}
                        cardTitle = "SELF"
                        onCardPress = {()=>this.onProfileCardPress(1,"1")}
                    />
                </View>
                <View style={styles.cardRow}>
                    <ProfileCard 
                        imageSource = {IconsPathVariable.SonIcon}
                        cardTitle = "SON"
                        onCardPress = {()=>this.onProfileCardPress(1,"2")}
                    />
                    <ProfileCard 
                        imageSource = {IconsPathVariable.DaughterIcon}
                        cardTitle = "DAUGHTER"
                        onCardPress = {()=>this.onProfileCardPress(2,"8")}
                    />
                </View>
                <View style={styles.cardRow}>
                    <ProfileCard 
                        imageSource = {IconsPathVariable.BrotherIcon}
                        cardTitle = "BROTHER"
                        onCardPress = {()=>this.onProfileCardPress(1,"4")}
                    />
                    <ProfileCard 
                        imageSource = {IconsPathVariable.SisterIcon}
                        cardTitle = "SISTER"
                        onCardPress = {()=>this.onProfileCardPress(2,"3")}
                    />
                </View>
                <View style={styles.cardRow}>
                    <ProfileCard 
                        imageSource = {IconsPathVariable.FriendIcon}
                        cardTitle = "FRIEND"
                        onCardPress = {()=>this.onProfileCardPress(1,"5")}
                    />
                    <ProfileCard 
                        imageSource = {IconsPathVariable.RelativeIcon}
                        cardTitle = "RELATIVE"
                        onCardPress = {()=>this.onProfileCardPress(1,"7")}
                    />
                </View>
                <View style={styles.cardRow}>
                    <ProfileCard 
                        imageSource = {IconsPathVariable.BrotherIcon}
                        cardTitle = "PARENT"
                        onCardPress = {()=>this.onProfileCardPress(1,"6")}
                    />
                </View>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : "#ffffff",
        flex : 1,
        padding : 10,
        width : deviceDimesions.width,
        height : deviceDimesions.Height,
    },
    contentContainer : {
        justifyContent : "center",
        top : deviceDimesions.Height*0.04
    },
    cardRow : {
        flexDirection : "row",
        justifyContent : "space-around",
        marginTop : deviceDimesions.Height*0.04
    }
  });