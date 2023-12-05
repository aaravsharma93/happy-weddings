// DrawerMenuTabs
import { View } from 'native-base';
import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DrawerMenuTabs extends React.Component{
  render(){
    const {buttonTitle, buttonImage, onSubmitPress } = this.props
    return(
      <View style={styles.container}>
          <NeuButton
            color = "#f5f5f5"
            width = {deviceDimesions.width*0.7}
            height = {deviceDimesions.Height*0.055}
            borderRadius = {10}
            // active
            onPress = {onSubmitPress}
            containerStyle = {{
                flexDirection : "row",
                justifyContent : "flex-start",
                paddingLeft : deviceDimesions.width*0.05,
                alignItems : "center"
            }}
          >
              <NeuBorderView
                    color = "#f5f5f5"
                    width = {deviceDimesions.width*0.08}
                    height = {35}
                    borderRadius = {5}
                >
                        {buttonImage}
                </NeuBorderView>
                <Text style={styles.TabTitle}>{buttonTitle}</Text>
          </NeuButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        flex : 1,
        marginTop : deviceDimesions.Height*0.03
    },
    TabTitle : {
        marginLeft : deviceDimesions.width*0.08,
        paddingHorizontal : deviceDimesions.width*0.01,
        fontWeight : "700",
        fontSize : 16,
        opacity : 0.7
    }
  });