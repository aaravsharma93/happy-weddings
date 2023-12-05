// SignupDropDownFullWidth

import { View } from 'native-base';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import {Picker} from '@react-native-picker/picker';
import RNModalPicker from 'rn-modal-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';

class SignupDropDownFullWidth extends React.Component{
  render(){
      const {selectedPickerValue, pickerDataArr, onChangeHandler, staticLable, renderPickerOption, containerWidth, pickerWidth } = this.props
    return(
      <View style={styles.container}>
         <NeuBorderView
            color = "#f5f5f5"
            width = {containerWidth ? containerWidth : deviceDimesions.width*0.9}
            height = {50}
            borderRadius = {20}
            inset
         >
             <Picker
                selectedValue={selectedPickerValue}
                style={{width: pickerWidth ? pickerWidth : deviceDimesions.width*0.8}}
                onValueChange = {onChangeHandler}
            >
              <Picker.Item label = {staticLable} value = {null} />
                {renderPickerOption()}
             </Picker>
         </NeuBorderView>
      </View>
    )
  }
}

class SignupDropDownFullWidthWithSearch extends React.Component{
   
  render(){
      const {selectedPickerValue, pickerDataArr, onChangeHandler, staticLable, renderPickerOption, containerWidth, pickerWidth, itemSeparatorStyle, customItemSeparatorHeight,  ShowIcon } = this.props
    return(
      <View style={styles.container}>
         <NeuBorderView
            color = "#f5f5f5"
            width = {containerWidth ? containerWidth : deviceDimesions.width*0.93}
            height = {53}
            borderRadius = {20}
            inset
            containerStyle = {
              ShowIcon ?
              {
                width : containerWidth ? containerWidth : deviceDimesions.width*0.9,
                flexDirection : 'row',
                justifyContent : 'space-evenly'
            }
            :null
          }
         >
          
                <RNModalPicker
                    dataSource={pickerDataArr}
                    dummyDataSource={pickerDataArr}
                    defaultValue={staticLable}
                    pickerTitle={staticLable}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={staticLable + "..."}
                    showPickerTitle={true}
                    placeHolderText = {staticLable}
                    pickerStyle={{width : pickerWidth ? pickerWidth : ShowIcon ? deviceDimesions.width*0.6 : deviceDimesions.width*0.8,}}
                    itemSeparatorStyle={itemSeparatorStyle ? customItemSeparatorHeight ? {height : customItemSeparatorHeight} : {height : deviceDimesions.Height*0.05} : {}}
                    selectedLabel={selectedPickerValue}
                    placeHolderLabel={staticLable}
                    dropDownImage={()=>null}
                    selectedValue={onChangeHandler}
                />

             {
               ShowIcon ? <Icon name="chevron-down" color="#999999" /> : null
             }
             
         </NeuBorderView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        marginTop : deviceDimesions.Height*0.05
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor : 'rgba(255,255,255,0.5)'
  },
  modalView: {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
      height : deviceDimesions.Height*0.7,
      width : deviceDimesions.width*0.9,
      padding : 10,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
  },
  });

  export {SignupDropDownFullWidth, SignupDropDownFullWidthWithSearch}