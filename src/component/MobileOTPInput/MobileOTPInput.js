// MobileOTPInput
import { View } from 'native-base';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { NeuBorderView, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';

export default class MobileOTPInput extends React.Component{
  render(){
      const {inputRef, onInputChange, autoFocused, onChangeText} = this.props
    return(
        <NeuView
            width={deviceDimesions.width*0.12}
            height={deviceDimesions.Height*0.06}
            borderRadius={10}
            color={'#ffffff'}
            containerStyle={{
            }}
            concave
        >
            <TextInput
                style={{textAlign : "center", width:deviceDimesions.width*0.13, height:deviceDimesions.Height*0.6}}
                keyboardType = 'phone-pad'
                ref={inputRef}
                autoFocus = {autoFocused ? true : false}
                onChange = {()=>onInputChange()}
                onChangeText = {onChangeText}
                maxLength = {1}
            />
        </NeuView>
    )
  }
}

const styles = StyleSheet.create({
    container : {
    }
  });