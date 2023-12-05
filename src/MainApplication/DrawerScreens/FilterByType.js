// FilterByType

import AsyncStorage from '@react-native-async-storage/async-storage';
import { H3 } from 'native-base';
import React, {Component} from 'react';
import {View, Image, StyleSheet, StatusBar, ImageBackground, Text, FlatList} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DiscoverMemberBasedOnBirthStar, DiscoverMemberBasedOnCity, DiscoverMemberBasedOnFeatured, DiscoverMemberBasedOnNearMe, DiscoverMemberBasedOnProfession, DiscoverMemberBasedOnShortlisted, DiscoverMemberBasedOnWithPhoto } from '../../helper/API_Call/API_Call';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';

export default class FilterByType extends Component {
    constructor(props){
        super(props);
        this.state = {
            DataArr : [],
            access_token : "",
        }
    }

    async componentDidMount(){
        try {
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });

            console.log(this.state.access_token)

            console.log(this.props.TitleText.title)

            if(this.props.TitleText.title == "City"){
                await DiscoverMemberBasedOnCity(this.state.access_token).then(res=>console.log(res.data))
            }
            else if(this.props.TitleText.title == "Profession"){
                await DiscoverMemberBasedOnProfession(this.state.access_token).then(res=>console.log(res.data))
            }
            else if(this.props.TitleText.title == "Star"){
                await DiscoverMemberBasedOnBirthStar(this.state.access_token).then(res=>console.log(res.data))
            }
            else if(this.props.TitleText.title == "Featured Matches"){
                await DiscoverMemberBasedOnFeatured(this.state.access_token).then(res=>console.log(res.data))
            }
            else if(this.props.TitleText.title == "With Photo"){
                await DiscoverMemberBasedOnWithPhoto(this.state.access_token).then(res=>console.log(res.data))
            }
            else if(this.props.TitleText.title == "Near Me"){
                await DiscoverMemberBasedOnNearMe(this.state.access_token).then(res=>console.log(res.data))
            }
            else if(this.props.TitleText.title == "Shortlisted"){
                await DiscoverMemberBasedOnShortlisted(this.state.access_token).then(res=>console.log(res.data))
            }
        } 
        catch (error) {
            
        }
    }

    render(){
        const filterListArr = [
            {
                id: 1,
                img: ImagesPathVariable.CityFilter,
                title: "City"
            },
            {
                id: 2,
                img: ImagesPathVariable.ProfessionFilter,
                title: "Profession"
            },
            {
                id: 3,
                img: ImagesPathVariable.StarFilter,
                title: "Star"
            },
            {
                id: 4,
                img: ImagesPathVariable.FeaturedMatchesFilter,
                title: "Featured Matches"
            },
            {
                id: 5,
                img: ImagesPathVariable.WithPhotosFilter,
                title: "With Photo"
            },
            {
                id: 6,
                img: ImagesPathVariable.NearMeFilter,
                title: "Near Me"
            },
            {
                id: 7,
                img: ImagesPathVariable.TrustedProfileFilter,
                title: "Shortlisted"
            },
      ]

      const  _renderFilterList = (ele) => {
        return(
          <TouchableOpacity 
              style={{marginHorizontal : deviceDimesions.width*0.02, marginVertical : deviceDimesions.Height*0.01, alignItems : 'center', marginTop : deviceDimesions.Height*0.015, paddingHorizontal : deviceDimesions.width*0.02, paddingVertical : deviceDimesions.Height*0.01, borderRadius : 10, backgroundColor : "#f5f5f5", elevation : 4, flexDirection : 'row'}}
              onPress = {()=>console.log(ele.title)}    
          >
                <Text style={{fontSize : 12,}}>{ele.title}</Text>
                <View style = {{marginLeft : deviceDimesions.width*0.04, alignItems : 'center'}}>
                    <Icon name="times" color = "#ff6600" size={16} />
                </View>
            </TouchableOpacity>
        )
    }

        const TitleText = this.props.TitleText;
        const {onBackButtonPress} = this.props;
        return(
            <View style={styles.container}>

                <View style={{width: deviceDimesions.width*0.9, alignSelf : 'center', marginVertical : deviceDimesions.Height*0.015, flexDirection : 'row', }}>
                    <TouchableOpacity
                        style={{marginRight : deviceDimesions.width*0.05, alignItems : 'center'}}
                        onPress = {()=>onBackButtonPress()}
                    >
                        <Icon name="chevron-left" size={20} />
                    </TouchableOpacity>
                    <View style={{alignItems : 'center'}}>
                        <Text style={{fontSize : 16, fontWeight : "700"}}>{TitleText.title}</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom : deviceDimesions.Height*0.06}}>
                <View style={{width : deviceDimesions.width*0.9, alignSelf : 'center', paddingVertical : deviceDimesions.Height*0.01}}>
                    <FlatList 
                        data={filterListArr}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>_renderFilterList(item)}
                    />
                </View>
                {/* Matched User Card List */}
                    <View style={{alignSelf : 'center', width : deviceDimesions.width*0.8, alignItems : 'center', marginTop : deviceDimesions.Height*0.02,flexDirection : 'row', justifyContent : 'center'}}>
                        <Text style={{fontSize : 10, color : 'rgba(0,0,0,0.7)'}}>No data found for Discover Members Based On </Text>
                        <Text style={{fontSize : 12}}>{this.props.TitleText.title}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linearGradient : {
        flex: 1,
        borderRadius: 5
    },
})