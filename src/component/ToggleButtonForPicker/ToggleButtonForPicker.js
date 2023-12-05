import { View } from 'native-base';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput,TouchableOpacity } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ToggleButtonForPicker extends React.Component{
  render(){
      const {buttonTitle, onButtonPress, DownIcon, ButtonWidth} = this.props
    return(
      <View style={styles.container}>
          <TouchableOpacity style={{padding : 5}} onPress = {()=>onButtonPress()}>
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
                <Text numberOfLines={1}>{buttonTitle}</Text>
                {
                    DownIcon ?  <Icon name="chevron-down" color="red" /> : null
                }
               
            </NeuBorderView>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        marginTop : deviceDimesions.Height*0.04
    }
  });