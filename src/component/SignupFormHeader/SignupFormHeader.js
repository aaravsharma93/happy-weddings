import { View } from 'native-base';
import React from 'react';
import { Image, StyleSheet, Text, TextInput } from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';

export default class SignupFormHeader extends React.Component{
  render(){
    const {progressValue, progressBarTotalWidth, backIcon, onBackPress, ScreenLogoAndTitle, ScreenTitle } = this.props
    return(
      <View>
        <View style={styles.container}>
        { backIcon ? <TouchableOpacity onPress={onBackPress}>
            <Icon name="chevron-left" color="rgba(0,0,0,1)" size={deviceDimesions.width*0.05} />
        </TouchableOpacity> : null}
        <View>
            <ProgressBar
                style={{width : progressBarTotalWidth}}
                styleAttr="Horizontal"
                progressTintColor = 'white'
                color = '#ff7f50'
                indeterminate={false}
                progress = {progressValue}
            />
        </View>
        </View>

          {
            ScreenLogoAndTitle ? 
                <View>
                    <View style={styles.logoAndTitleContainer}>
                        <Image source={ImagesPathVariable.LoginLogo} />
                    </View>
                    {
                        ScreenTitle ? 
                        <View  style={styles.logoAndTitleContainer}>
                            <Text style={styles.screenTitleStyle}>{ScreenTitle}</Text>
                        </View>
                        :
                        null
                    }
                    
                </View>
            :
                null
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        justifyContent : "space-around",
        top : deviceDimesions.Height*0.01,
        alignItems : "center",
    },
    logoAndTitleContainer : {
        padding :5,
        top : deviceDimesions.Height*0.03,
    },
    screenTitleStyle : {
        fontSize : 20,
        fontWeight : "800"
    }
  });