import { View } from 'native-base';
import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SubmitAndNextButton extends React.Component{
  render(){
    const {buttonTitle, buttonIcon, onSubmitPress, disabled } = this.props
    return(
      <View style={styles.container}>
          <NeuButton
            color = "#f5f5f5"
            width = {deviceDimesions.width*0.5}
            height = {40}
            borderRadius = {20}
            onPressIn = {disabled ? ()=>null : onSubmitPress }
            containerStyle = {{
                flexDirection : "row",
                justifyContent : "space-evenly"
            }}
          >
              <Text>{buttonTitle}</Text>
              <NeuBorderView
                    color = "#f5f5f5"
                    width = {35}
                    height = {35}
                    borderRadius = {20}
                    inset
                >
                        {buttonIcon}
                </NeuBorderView>
          </NeuButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        flex : 1,
        top : deviceDimesions.Height*0.02
    }
  });