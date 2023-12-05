// AutoCompleteInput
import React from 'react';
import {  View, TextInput, StyleSheet } from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import deviceDimesions from "../../helper/DeviceDimensions/DeviceDimensions";

export const AutoCompleteInput = ({data, value, placeHolder, onChangeText, renderOptions}) => {
    return(
        <View style={styles.container}>
                <Autocomplete
                    data={data}
                    placeholder = {placeHolder}
                    value = {value}
                    onChangeText={(text)=>{onChangeText(text)}}
                    renderItem ={renderOptions}
                    style = {styles.TextInputStyle}
                    inputContainerStyle = {styles.TextInputContainerStyle}
                    defaultValue={
                        !value ? '' : value
                      }
                />
      </View>
    )
}

const styles = StyleSheet.create({
    container : {
        alignSelf : "center",
        marginTop : deviceDimesions.Height*0.05
    },
    TextInputContainerStyle : {
        borderBottomWidth : 2,
        borderRadius : 15,
        borderColor : '#e6e6e6',
        padding : deviceDimesions.Height*0.01
    },
    TextInputStyle : {
        width : deviceDimesions.width*0.75,
    }
  });
