// SearchProfilesMainContainer

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome5';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToPreviousScreen, goToUpgradeToPremiumScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';
import { AdvancedSearch } from './AdvancedSearch';
import { KeywordSearch } from './KeywordSearch';
import { QuickSearch } from './QuickSearch';
import { SearchByID } from './SearchByID';
import {useRoute} from '@react-navigation/native';

export class SearchProfilesMainContainer extends Component{
    constructor(props ){
        super(props)
        this.state = {
          
            searchComponents : [ <QuickSearch />, <AdvancedSearch />, <SearchByID />, <KeywordSearch /> ],
            membershipType : 1,
            showPremiumAccessModal : false,
            ItemIndex : null
            
        }
    }

    async componentDidMount(){
        const userData = JSON.parse(await AsyncStorage.getItem('user_data'))
        if(this.props.TitleText.Index == "0" ){
            this.setState({activeTabIndex : 0})
        }
        if(this.props.TitleText.Index == "1" ){
            this.setState({activeTabIndex : 1})
        }
        if(this.props.TitleText.Index == "2" ){
            this.setState({activeTabIndex : 2})
        }
        if(this.props.TitleText.Index == "3" ){
            this.setState({activeTabIndex : 3})
        }
        this.setState({membershipType : userData.userdata.membership},()=>console.log(this.state.membershipType))
    }
     

    render(){

        return(
            <View style={styles.container}>
                <View style={{marginTop : deviceDimesions.Height*0.01, width : deviceDimesions.width*0.9, alignSelf : "center", backgroundColor : "#ffffff", paddingHorizontal : deviceDimesions.width*0.005, alignItems : 'flex-end'}}>
                    <TouchableOpacity onPress={()=>this.props.onBackButtonPress()}>
                        <Icon name="times" size={20} />
                    
                    </TouchableOpacity>
                </View>
          
                <View style={{marginTop : deviceDimesions.Height*0.01, width : deviceDimesions.width, alignSelf : "center", flexDirection : "row", justifyContent : "space-around", backgroundColor : "#ffffff", borderRadius : 5, elevation : 5, paddingVertical : 0, paddingHorizontal : deviceDimesions.width*0.005}}>
                    <TouchableOpacity 
                        style={{flexDirection : "row", alignItems : "center", paddingHorizontal : deviceDimesions.width*0.01,paddingVertical : deviceDimesions.Height*0.015, borderBottomColor : "#ff6600", borderBottomWidth : this.state.activeTabIndex == 0 ? 2 : 0}}    
                        onPress={()=>this.setState({activeTabIndex : 0})}
                    >
                        <Image source={IconsPathVariable.QuickSearchSearchScreen} />
                        <Text style={{fontSize : 10, marginLeft : deviceDimesions.width*0.005, color : this.state.activeTabIndex == 0 ? "#ff6600" : "#000",}}>Quick Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flexDirection : "row", alignItems : "center", paddingHorizontal : deviceDimesions.width*0.01,paddingVertical : deviceDimesions.Height*0.015, borderBottomColor : "#ff6600", borderBottomWidth : this.state.activeTabIndex == 1 ? 2 : 0}}    
                        onPress={this.state.membershipType == 1 ? ()=>this.setState({showPremiumAccessModal : true}) : ()=>this.setState({activeTabIndex : 1})}
                    >
                        <Image source={IconsPathVariable.AdvancedSearchSearchScreen} />
                        <Text style={{fontSize : 10, marginLeft : deviceDimesions.width*0.005, color : this.state.activeTabIndex == 1 ? "#ff6600" : "#000",}}>Advanced Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flexDirection : "row", alignItems : "center", paddingHorizontal : deviceDimesions.width*0.01,paddingVertical : deviceDimesions.Height*0.015, borderBottomColor : "#ff6600", borderBottomWidth : this.state.activeTabIndex == 2 ? 2 : 0}}    
                        onPress={()=>this.setState({activeTabIndex : 2})}
                    >
                        <Image source={IconsPathVariable.SearchByIDSearchScreen} />
                        <Text style={{fontSize : 10, marginLeft : deviceDimesions.width*0.005, color : this.state.activeTabIndex == 2 ? "#ff6600" : "#000",}}>Search By ID</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flexDirection : "row", alignItems : "center", paddingHorizontal : deviceDimesions.width*0.01,paddingVertical : deviceDimesions.Height*0.015, borderBottomColor : "#ff6600", borderBottomWidth : this.state.activeTabIndex == 3 ? 2 : 0}}    
                        onPress={()=>this.setState({activeTabIndex : 3})}
                    >
                        <Image source={IconsPathVariable.KeywordSearchSearchScreen} />
                        <Text style={{fontSize : 10, marginLeft : deviceDimesions.width*0.005, color : this.state.activeTabIndex == 3 ? "#ff6600" : "#000",}}>Keyword Search</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop : deviceDimesions.Height*0.04}}>
                    {this.state.searchComponents[this.state.activeTabIndex]}
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showPremiumAccessModal}
                    onBackdropPress={() => this.setState({ showPremiumAccessModal: false })}
                    onRequestClose={() => {
                        this.setState({ showPremiumAccessModal: false })
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Image source={IconsPathVariable.DiamondIcon} style={{height : deviceDimesions.Height*0.1, width : deviceDimesions.width*0.5, resizeMode : 'contain', margin : 20}} />
                            <Image source={ImagesPathVariable.LoginLogo} style={{resizeMode : 'contain', margin : 20}} />
                            <Text style={{fontSize : 18, fontWeight : '600', color : "#ff6600", width : deviceDimesions.width*0.8, alignItems : 'center', alignContent : 'center'}}>Upgrade to premium to use this feature</Text>
                            <View style={{position : 'absolute', bottom : 20, width : deviceDimesions.width*0.9, paddingVertical : deviceDimesions.Height*0.015, flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center'}}>
                                <TouchableOpacity onPress={() =>this.setState({ showPremiumAccessModal: false },()=>goToUpgradeToPremiumScreen())} style={{backgroundColor : "#ff6600", padding : 15, borderRadius : 20}}>
                                    <Text style={{fontSize : 18, color : "#ffffff"}}>Upgrade Now</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ showPremiumAccessModal: false })}>
                                    <Text style={{opacity : 0.5}}>I'll do it later</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#ffffff"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.8)",
    },
    modalView: {
        backgroundColor: "rgba(255,255,255,0.7)",
        justifyContent: "center",
        borderRadius: 20,
        height: deviceDimesions.Height,
        width: deviceDimesions.width,
        alignItems: "center",
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
})