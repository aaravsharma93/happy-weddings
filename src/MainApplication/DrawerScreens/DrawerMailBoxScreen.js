// DrawerMailBoxScreen
import { View } from 'native-base';
import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, TextInput, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';
import SlideButtonPanel from 'rn-sliding-button-panel';
import { getAllNotification, GetMailboxInterest } from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL } from '../../API_config/BaseURL';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class DrawerMailBoxScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            access_token: '',
            mailDataArr : null,
            selectedBasicFilter : '',
            sentOrInbox : 'inbox',
            filterData : [
                {
                    name : 'Read Status',
                    id : 11,
                    subCategory :[
                        {
                            id : 1,
                            subCat : 'Read',
                            checked : false,
                            parentIndex : 0,
                        },
                        {
                            id : 2,
                            subCat : 'Unread',
                            checked : false,
                            parentIndex : 0,
                        },
                    ]    
                },
                {
                    name : 'Profile Type',
                    id : 12,
                    subCategory :[
                        {
                            id : 1,
                            subCat : 'Matching My Preferences',
                            checked : false,
                            parentIndex : 1,
                        },
                        {
                            id : 2,
                            subCat : 'Premium',
                            checked : false,
                            parentIndex : 1,
                        },
                        {
                            id : 3,
                            subCat : 'Mutual',
                            checked : false,
                            parentIndex : 1,
                        },
                    ]    
                },
                {
                    name : 'Accepted By',
                    id : 13,
                    subCategory :[
                        {
                            id : 1,
                            subCat : 'Accepted By Me',
                            checked : false,
                            parentIndex : 2,
                        },
                        {
                            id : 2,
                            subCat : 'Accepted By Others',
                            checked : false,
                            parentIndex : 2,
                        },
                    ]    
                },
                {
                    name : 'Declined By',
                    id : 14,
                    subCategory :[
                        {
                            id : 1,
                            subCat : 'Declined By Me',
                            checked : false,
                            parentIndex : 3,
                        },
                        {
                            id : 2,
                            subCat : 'Declined By Others',
                            checked : false,
                            parentIndex : 3,
                        },
                    ]    
                },
                {
                    name : 'Viewed Status',
                    id : 15,
                    subCategory :[
                        {
                            id : 1,
                            subCat : 'Viewed By Him',
                            checked : false,
                            parentCategoryId : 4,
                        },
                        {
                            id : 2,
                            subCat : 'Not Viewed By Him ',
                            checked : false,
                            parentCategoryId : 4,
                        },
                    ]    
                },
                {
                    name : 'Conversation Type',
                    id : 16,
                    subCategory :[
                        {
                            id : 1,
                            subCat : 'All',
                            checked : false,
                            parentIndex : 5,
                        },
                        {
                            id : 2,
                            subCat : 'Interests',
                            checked : false,
                            parentIndex : 5,
                        },
                        {
                            id : 3,
                            subCat : 'Messages',
                            checked : false,
                            parentIndex : 5,
                        },
                        {
                            id : 4,
                            subCat : 'Photo Requests',
                            checked : false,
                            parentIndex : 5,
                        },
                        {
                            id : 5,
                            subCat : 'Horoscope Requests',
                            checked : false,
                            parentIndex : 5,
                        },
                        {
                            id : 6,
                            subCat : 'Phone Number Viewed',
                            checked : false,
                            parentIndex : 5,
                        },
                        {
                            id : 7,
                            subCat : 'Other Request',
                            checked : false,
                            parentIndex : 5,
                        },
                    ]    
                }
            ],
            selectedFilterData : [],
            notificationData: [],

        }
    }

    async componentDidMount(){
        try {
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token },()=>console.log(this.state.access_token));
            await this.onCategoryAndBasicFilterChange('')
        }
        catch{

        }
    }

    async onCategoryAndBasicFilterChange(queryStr){
        getAllNotification(this.state.access_token).then(res => {
            let response = res;
            console.log(response.data, "Notification_Data")
            if (response.data.status == true) {
                this.setState({ notificationData: response.data.data })
            } else if (response.data.status == false) {
                this.setState({ notificationData: false })
            }
        })
    }

    onSentOrInboxTabChange(value){
        this.setState({sentOrInbox : value})
        this.onCategoryAndBasicFilterChange(value+'/'+this.state.selectedBasicFilter)
    }

    onSelectBasicFilter(value){
        this.setState({selectedBasicFilter : value})
        this.onCategoryAndBasicFilterChange(this.state.sentOrInbox+'/'+value)
    }

    onFilterItemCheckToggle(parentIndex, categoryIndex, value){
        let existingFilterData = this.state.filterData
        existingFilterData[parentIndex].subCategory[categoryIndex].checked = !value;
        this.setState({filterData : existingFilterData});

        // selected filter data
        let selectedFilterData = this.state.selectedFilterData
        
        // check if selected Data is empty
        if(selectedFilterData.length <= 0){
            selectedFilterData.push(existingFilterData[parentIndex].subCategory[categoryIndex])
            console.log(selectedFilterData);
        }
        // check if selected Data is not empty and filter data does not exist
        else if(selectedFilterData.length > 0 && !selectedFilterData.some(el => el.subCat == existingFilterData[parentIndex].subCategory[categoryIndex].subCat)){
            selectedFilterData.push(existingFilterData[parentIndex].subCategory[categoryIndex])
            console.log(selectedFilterData);
        }
        // check if selected Data is not empty and filter data exist
        else if(selectedFilterData.length > 0 && selectedFilterData.some(el => el.subCat == existingFilterData[parentIndex].subCategory[categoryIndex].subCat)){
            let indexOfSelectedCat = selectedFilterData.indexOf(existingFilterData[parentIndex].subCategory[categoryIndex])
            selectedFilterData.splice(indexOfSelectedCat, 1)
            console.log(selectedFilterData)
        }

        this.setState({selectedFilterData : selectedFilterData})
    }

  render(){
    const renderItem = (el, i, DataArr, title) => {
        return (
            <TouchableOpacity onPress={() => goToMatchedUserProfileOverviewrScreen(DataArr, i, "")}>
                <View style={{
                    width: deviceDimesions.width * 0.95, backgroundColor: "white", borderRadius: 10, shadowColor: "#ffffff",
                    shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, height: 155, marginVertical: deviceDimesions.Height * 0.011, marginHorizontal: 10
                }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <TouchableOpacity style={{ marginLeft: 340, position: 'absolute', marginTop: 5 }}>
                            <NeuBorderView
                                color="#ffffff"
                                borderRadius={20}
                                width={deviceDimesions.width * 0.1}
                                height={deviceDimesions.Height * 0.05}
                                inset>
                                <Image
                                    style={{ width: 40, height: 40 }}

                                    source={IconsPathVariable.BadgesImage}
                                />
                            </NeuBorderView>
                        </TouchableOpacity>
                        <View style={{ flex: 1, position: 'absolute', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: 155, }} >
                            <Image
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                                source={{ uri: BaseURL.DemoURL + el.profile_image }}
                            />
                        </View>
                        <View style={{ flex: 1, width: deviceDimesions.width * 0.9, marginLeft: 90, justifyContent: 'center', alignContent: 'center', height: 155, }}>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>{el.fullname}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                {
                                    el.designation ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                borderRadius={20}
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.04}
                                                inset
                                            >
                                                <Octicons name="primitive-dot" color="orange" size={18} />
                                            </NeuBorderView>
                                            <Text style={{ fontSize: 10, marginLeft: 5, width: deviceDimesions.width * 0.15 }}>{el.designation}</Text>

                                        </View>
                                        :
                                        null

                                }
                                {
                                    el.age ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                borderRadius={20}
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.04}
                                                inset
                                            >
                                                <Octicons name="primitive-dot" color="orange" size={18} />
                                            </NeuBorderView>
                                            <Text style={{ fontSize: 10, marginLeft: 5, width: deviceDimesions.width * 0.15 }}>{el.age}</Text>

                                        </View>
                                        :
                                        null

                                }

                                {
                                    el.city_name ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                borderRadius={20}
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.04}
                                                inset
                                            >
                                                <Octicons name="primitive-dot" color="orange" size={18} />
                                            </NeuBorderView>
                                            <Text style={{ fontSize: 10, marginLeft: 5, width: deviceDimesions.width * 0.15 }}>{el.city_name}</Text>

                                        </View>
                                        :
                                        null
                                }

                            </View>
                            <Text style={{ fontSize: 13, marginTop: deviceDimesions.Height * 0.007, width: deviceDimesions.width * 0.68, marginTop: 10 }}>{el.status_message}</Text>
                            {
                                el.status_message.includes("liked your profile") ?
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity style={{ width: 50, height: 50 }} >
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    borderRadius={20}
                                                    width={deviceDimesions.width * 0.1}
                                                    height={deviceDimesions.Height * 0.05}
                                                    inset
                                                >
                                                    <Entypo name="cross" color="black" size={18} />
                                                </NeuBorderView>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ marginLeft: 10, width: 50, height: 50 }} >
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    borderRadius={20}
                                                    width={deviceDimesions.width * 0.1}
                                                    height={deviceDimesions.Height * 0.05}
                                                    inset
                                                >
                                                    <Ionicons name="md-checkmark-sharp" color="orange" size={18} />
                                                </NeuBorderView>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                            {
                                el.status_message.includes("requested your photo") ?
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity >
                                                <View style={{
                                                    width: deviceDimesions.width * 0.3, backgroundColor: "white", borderRadius: 20, shadowColor: "#ffffff",
                                                    shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, height: 35, marginHorizontal: 10, flexDirection: 'row',
                                                    justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center'
                                                }}>
                                                    <Text style={{ marginRight: 10 }}>No</Text>
                                                    <NeuBorderView
                                                        color="#ffffff"
                                                        borderRadius={20}
                                                        width={deviceDimesions.width * 0.08}
                                                        height={deviceDimesions.Height * 0.04}
                                                        inset
                                                    >
                                                        <Entypo name="cross" color="black" size={18} />
                                                    </NeuBorderView>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => goToManagePhotoScreen()} >
                                                <View style={{
                                                    width: deviceDimesions.width * 0.3, backgroundColor: "white", borderRadius: 20, shadowColor: "#ffffff",
                                                    shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, height: 35, marginHorizontal: 10, flexDirection: 'row',
                                                    alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <Text style={{ marginRight: 10 }}>Add Photo</Text>
                                                    <NeuBorderView
                                                        color="#ffffff"
                                                        borderRadius={20}
                                                        width={deviceDimesions.width * 0.08}
                                                        height={deviceDimesions.Height * 0.04}
                                                        inset
                                                    >
                                                        <Ionicons name="md-checkmark-sharp" color="orange" size={18} />
                                                    </NeuBorderView>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    null

                            }

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const ItemView = ({item}) => {
        console.log("item===LineNo- 249",item)
        return (
          // Flat List Item
         <View 
            style={{padding : 10, flexDirection : "row", justifyContent : "space-around", marginRight : 10, alignItems : "center", borderWidth : 0.6, borderColor : "orange", borderRadius : 10}}
        >
             <Text style={{marginRight : 5}}>{item.subCat}</Text>
             <TouchableOpacity onPress = {()=>this.onFilterItemCheckToggle(item.parentIndex, item.id-1, item.checked)} style={{width : deviceDimesions.width*0.05, alignItems : "center"}}>
                 <Icon name="times" />
             </TouchableOpacity>
             
         </View>
        );
      };

    // 
    let filterView =    <View style={{height : deviceDimesions.Height, backgroundColor : '#ffffff'}}>
                            <View style={{marginTop : -20, marginLeft : 10, padding : 10, borderBottomWidth : 0.5, backgroundColor : '#ffffff'}}>
                                <TouchableOpacity style={{padding : 10}}  onPress={()=>{this.slidingPanelRef.openPanel()}}>
                                        <Icon name="times" size={24} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView contentContainerStyle = {{backgroundColor : '#ffffff', paddingBottom : 200}}>
                                {this.state.filterData.map((el, i)=>{
                                    return (
                                        <View style={{marginTop : 10, padding : 10}}>
                                            <View style={{width : deviceDimesions.width*0.7, alignSelf : "center", padding : 10}}>
                                                <Text style={{fontSize : 18, fontWeight : '600'}}>{el.name}</Text>
                                            </View>
                                            {
                                                el.subCategory.map((ele, index)=>{
                                                    return(
                                                        <View style={{marginTop : deviceDimesions.Height*0.02, alignItems : "center"}}>
                                                            <NeuButton
                                                                color = "#ffffff"
                                                                borderRadius = {10}
                                                                width = {deviceDimesions.width*0.7}
                                                                height = {deviceDimesions.Height*0.07}
                                                                onPress = {()=>this.onFilterItemCheckToggle(i, index, ele.checked)}
                                                                containerStyle = {{
                                                                    alignItems : "flex-start",
                                                                    padding : 10
                                                                }}
                                                            >
                                                                <View style={{flexDirection : "row"}}>
                                                                    <NeuView
                                                                        color = "#ffffff"
                                                                        height = {deviceDimesions.Height*0.03}
                                                                        width = {deviceDimesions.width*0.06}
                                                                        borderRadius = {5}
                                                                    >
                                                                        {
                                                                            ele.checked ? <Icon name="check" color="red" /> : <Icon name="check" color="grey" />
                                                                        }
                                                                    </NeuView>
                                                                    <Text style={{marginLeft : 20,fontSize : 16, fontWeight : '600'}}>{ele.subCat}</Text>
                                                                </View>
                                                            </NeuButton>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })}
                                <View style={{alignItems : "center", marginTop : deviceDimesions.Height*0.1}}>
                                    <TouchableOpacity style={styles.upgradeToPremiumButtonContainer} onPress={()=>{this.slidingPanelRef.openPanel()}}>
                                        <Text style={styles.upgradeToPremiumButtonText}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>

    return(
      <View style={styles.container}>
           <StatusBar
                backgroundColor = "rgba(0,0,0,0)"
                barStyle = "dark-content"
            />
            <ScrollView contentContainerStyle={{paddingBottom : 50}}>
                <View style={{ padding : 5,alignSelf : "center"}}>
                    <NeuView
                        color = "#ffffff"
                        width = {deviceDimesions.width*0.9}
                        height = {deviceDimesions.Height*0.13}
                        borderRadius = {10}
                        containerStyle = {{
                            padding : 10,
                        }}
                    >
                        <View style={{width : deviceDimesions.width*0.9,marginLeft:25}}>
                            <Text style={{fontSize : 16, fontWeight : '700'}}>Mailbox</Text>
                          
                            <View style={{flexDirection : 'row', marginTop : 10,}}>
                            <TouchableOpacity onPress={()=>this.onSentOrInboxTabChange('inbox')} style={{ marginRight:20,width : deviceDimesions.width*0.23, paddingTop : 5, paddingBottom : 5, alignItems : 'center', borderColor : this.state.sentOrInbox == 'inbox' ? '#ffffff' : '#ffcc33', borderWidth : 0.9, backgroundColor : this.state.sentOrInbox == 'inbox' ? '#ffcc33' : '#ffffff', borderRadius : 20}}>
                                    <Text style={this.state.sentOrInbox == 'inbox' ? {color : '#ffffff' } : {color : '#000'} } >Inbox</Text>
                                </TouchableOpacity>
                               
                                <TouchableOpacity onPress={()=>this.onSentOrInboxTabChange('sent')} style={{ width : deviceDimesions.width*0.23, paddingTop : 5, paddingBottom : 5, alignItems : 'center', borderColor : this.state.sentOrInbox == 'sent' ? '#ffffff' : '#ffcc33', borderWidth : 0.9, backgroundColor : this.state.sentOrInbox == 'sent' ? '#ffcc33' : '#ffffff', borderRadius : 20}}>
                                    <Text style={this.state.sentOrInbox == 'sent' ? {color : '#ffffff'} : {color : '#000'}}>Sent</Text>
                                </TouchableOpacity>
                               
                            </View>
                        </View>
                    </NeuView>
                </View>

                <View style={{ width : deviceDimesions.width*0.85,  flexDirection : 'row', alignItems : "center", alignSelf: "center", justifyContent : 'space-between'}}>
                    
                    <View style={{width : deviceDimesions.width*0.65}}>
                        
                        {
                            this.state.selectedFilterData.length <= 0 
                            ?
                            null
                            : 
                                <View>
                                    <FlatList
                                        data={this.state.selectedFilterData}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={ItemView}
                                        horizontal
                                    />
                                </View>
                        }
                        
                    
                    </View>
                    

                    <TouchableOpacity 
                                style={{padding : 5}}
                                onPress={()=>{this.slidingPanelRef.openPanel()}}
                            >
                              
                    </TouchableOpacity>
                </View>

                {
                    this.state.notificationData ?

                        <FlatList
                            data={this.state.notificationData}
                            renderItem={({ item, index }) => renderItem(item, index, this.state.notificationData, "")}
                        />

                        :
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', alignContent: 'center', flex: 1, alignItems: 'center', textAlignVertical: 'center', fontWeight: '700', fontSize: 20, color: 'orange', bottom: 40 }}>There are no new notification</Text>
                }




            </ScrollView>
            
            <SlideButtonPanel
                hideOpenButton     // to hide default open button
                panelStyle={{borderRadius:10, height : deviceDimesions.Height, paddingTop : 10}}
                ref={(ref)=>{this.slidingPanelRef = ref}} // openPanel function on ref
                width = {deviceDimesions.width*0.8}
                height = {deviceDimesions.Height}
                panelBackgroundColor = '#f2f2f2'
                customPanelView = {filterView}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : deviceDimesions.Height*0.01,
        height : deviceDimesions.Height,
        width : deviceDimesions.width
    },
    containerBottomItem: {
        padding: 15,
        marginTop : 12,
        marginLeft : 15,
        marginRight : 25,
        backgroundColor : '#ffffff',
        borderRadius : 10,
        elevation : 5
    },
    button: {
        alignItems: "flex-start",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius : 20,
      },
      upgradeToPremiumButtonContainer:{
        backgroundColor : '#ff6f00',
        borderRadius : 10,
        padding : 10,
        marginTop : 15,
        marginLeft : 15,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems : 'center',
        width : deviceDimesions.width*0.6
    },
    upgradeToPremiumButtonText : {
        color : 'white',
        fontWeight : '500',
        fontSize : 18
    },
  });