// MobileNumberWithCountryCodeInputReverse
import { View } from 'native-base';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { NeuBorderView, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import {Picker} from '@react-native-picker/picker';

export default class MobileNumberWithCountryCodeInputReverse extends React.Component{
  render(){
      const {placeholderText } = this.props
    return(
      <View style={styles.container}>
          <NeuBorderView
            color = "#f5f5f5"
            width = {deviceDimesions.width*0.9}
            height = {50}
            borderRadius = {20}
            inset
            containerStyle = {{
                flexDirection : "row",
                justifyContent : "space-around",
                paddingLeft : 10,
            }}
          >    
                <TextInput keyboardType="phone-pad" style={{width : deviceDimesions.width*0.5, textAlign : "left", borderRightWidth : 0.2, paddingLeft : 10}} placeholder={placeholderText} />
                <Picker
                    selectedValue=""
                    style={{width: deviceDimesions.width*0.35}}
                    >
                        <Picker.Item label="Country Code" value={null} />
                        <Picker.Item label="+91" value="+91" />
                        <Picker.Item label="+318" value="+318" />
                </Picker>
          </NeuBorderView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        marginTop : deviceDimesions.Height*0.04
    }
  });