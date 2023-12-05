// MobileNumberWithCountryCodeInput
import { View } from 'native-base';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { NeuBorderView, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import RNPicker from "rn-modal-picker";

export default class MobileNumberWithCountryCodeInput extends React.Component{
  render(){
      const {placeholderText, CountryCodeArr, mobileNumber, mobileNumberChangeHandler, selectedCountryCode, onCountryCodeChange, onBlur } = this.props
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
                alignItems : 'center'
            }}
          >
            <View style={{alignSelf : 'center', paddingTop : deviceDimesions.Height*0.01}}>
                <RNPicker
                    dataSource={CountryCodeArr}
                    dummyDataSource={CountryCodeArr}
                    defaultValue={selectedCountryCode}
                    pickerTitle={"Select Country"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={"Search....."}
                    showPickerTitle={true}
                    pickerStyle={{width : deviceDimesions.width*0.2}}
                    selectedLabel={selectedCountryCode}
                    placeHolderLabel={selectedCountryCode}
                    selectLabelTextStyle={{width : deviceDimesions.width*0.2, alignSelf : 'center', justifyContent : 'center'}}
                    dropDownImage={()=>null}
                    selectedValue={onCountryCodeChange}
                />
            </View>
                <TextInput keyboardType="phone-pad" style={{width : deviceDimesions.width*0.6, textAlign : "left", borderLeftWidth : 0.2, paddingHorizontal : deviceDimesions.width*0.05,  fontStyle : 'normal'}} maxLength = {12} placeholder={placeholderText} value={mobileNumber} onChangeText={mobileNumberChangeHandler} onBlur = {onBlur} />
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