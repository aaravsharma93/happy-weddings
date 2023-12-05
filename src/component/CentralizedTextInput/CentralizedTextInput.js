import { View } from 'native-base';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { NeuBorderView, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';

export default class CentralizedTextInput extends React.Component{
  render(){
    return(
      <View style={styles.container}>
          <NeuBorderView
            color = "#f5f5f5"
            width = {deviceDimesions.width*0.65}
            height = {50}
            borderRadius = {20}
          >
              <TextInput {...this.props} textAlignVertical = "center" />
          </NeuBorderView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        flex : 1,
        top : deviceDimesions.Height*0.05
    }
  });