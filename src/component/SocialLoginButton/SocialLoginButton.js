// SocialLoginButton
import { View } from 'native-base';
import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SocialLoginButton extends React.Component{
  render(){
    const {buttonTitle, buttonIcon, onButtonPress } = this.props
    return(
      <View style={styles.container}>
          <NeuButton
            color = "#f5f5f5"
            width = {deviceDimesions.width*0.25}
            height = {35}
            borderRadius = {20}
            // inset
            containerStyle = {{
                flexDirection : "row",
                justifyContent : "space-evenly"
            }}
            onPress={onButtonPress}
          >
              <NeuBorderView
                    color = "#f5f5f5"
                    width = {30}
                    height = {30}
                    borderRadius = {20}
                    inset
                >
                        {buttonIcon}
                </NeuBorderView>
                <Text style={{fontSize : 12}}>{buttonTitle}</Text>
          </NeuButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
    }
  });