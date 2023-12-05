// DateInput
import { View } from 'native-base';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default class DateInput extends React.Component{
  render(){
      const {buttonTitle, onButtonPress, DownIcon, ButtonWidth, InputWidth, onInputChange, hideCalenderButton} = this.props
    return(
      <View style={styles.container}>
              <NeuBorderView
                active
                height = {50}
                width = {ButtonWidth ? ButtonWidth : deviceDimesions.width*0.9}
                color = "#f5f5f5"
                borderRadius = {20}
                containerStyle = {{
                    flexDirection : "row",
                    justifyContent : "space-between",
                    paddingLeft : 30,
                    paddingRight : 30
                }}
              >
                <TextInputMask
                  refInput={(ref) => this.myDateText = ref}
                  type={'datetime'}
                  value = {buttonTitle}
                  placeholder = "DD-MM-YYYY"
                  maxLength = {10}
                  onChangeText = {onInputChange}
                  keyboardType = "number-pad"
                  style={{width : InputWidth ? InputWidth : deviceDimesions.width*0.7, fontStyle : 'normal'}}
                  options={{
                    format: 'DD-MM-YYYY HH:mm:ss'
                  }}
                />
                {
                  hideCalenderButton ? 
                  null
                  :
                  <TouchableOpacity onPress={onButtonPress} style = {{padding : deviceDimesions.width*0.02, backgroundColor : "#f5f5f5", color : '#f5f5f5'}}>
                      <Icon name="calendar" color = 'red' size = {18} />
                  </TouchableOpacity>
               }
            </NeuBorderView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        marginTop : deviceDimesions.Height*0.04
    }
  });
