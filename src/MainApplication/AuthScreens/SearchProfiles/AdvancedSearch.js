// AdvancedSearch

import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Modal, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import SimpleTextInput from '../../../component/SimpleTextInput/SimpleTextInput';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../../helper/IconsPathVariable/IconsPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';
import RangeSlider from 'rn-range-slider';
import { AdvanceSearch, GetAllCasteListByReligion, GetAllMaritalStatus, GetAllMotherTongue, GetAllNationality, GetAllReligionList, GetAllSubCasteListByCast, GetAnnualIncomeOptions, GetFamilyStatusListing, GetHeight, GetStatesListFromCountries } from '../../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignupDropDownFullWidthWithSearch } from '../../../component/SignupDropDownFullWidth/SignupDropDownFullWidth';
import { goToDrawerViewAllMatchedUserScreen } from '../../../helper/NavigationFunctions/NavigationFunctions';
import CountryCodeArr from '../../../helper/CountryCodeJSON/CountryCodeJSON';

export class AdvancedSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            showExtraOptions : false,
            IsGenderMale : true,
            access_token : '',

            // Height
            AllHeightArr : [], //Done
            MaxHeight : '',
            MinHeight : '',

            // Age
            AllAgeArr : [], // Done
            MaxAge : '',
            MinAge : '',

            // Religion / Caste
            ReligionArr : [], //Done
            CasteArr : [],
            SubCasteArr : [],
            SelectedReligion : '',
            SelectedCaste : '',
            SelectedSubCaste : '',

            // Language 
            LanguageArr : [], // Done
            SelectedLanguage : '',

            // Country
            CountryArr : [], // Done
            SelectedCountry : '',

            // City
            CityArr : [], 
            SelectedCity : '',

            // Manglik
            IsManglik : false,

            // shudha jathakam
            ShudhaJathakam : false,

            // marital status
            MaritalStatusArr : [], // Done
            SelectedMaritalStatus : '',

            // Mother Tongue
            MotherTongueArr : [],
            SelectedMotherTongue : '',

            // State By Country
            StateByCountryArr : [],
            SelectedState : '',

            // Family Status
            FamilyStatusArr : [],
            SelectedFamilyStatus : '',

            // Annual Income
            AnnualIncomeArr : [],
            SelectedAnnualIncome : '',

            // Gender
            Gender : '1',

            // partner_profession
            PartnerProfession : '',
            IsChovvaDosham : false

        }
    }
    
    GetAgeArr(){
        let ageArr = []
        let initialAge = 18
        let ageObj = {}
        for (initialAge; initialAge < 100; initialAge++) {
            ageArr.push({name : initialAge, id : initialAge})
        }
        this.setState({AllAgeArr : ageArr})
    }

    async componentDidMount(){
        try{
            let access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });
            
            // Get Height
            await GetHeight(this.state.access_token).then(res=>{
                let response = res; 
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.height_id,
                        name : el.height
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({AllHeightArr : modifiedArr})
            })
            .catch(err=>{
                let error = err
                console.log(JSON.stringify(error))
            })

            // Get Age Arr
            this.GetAgeArr()

            // Get Religion
            await GetAllReligionList().then(res => {
                let response = res;this.setState({ ReligionArr: response.data })
            })
            .catch(err => {
                console.log(err)
            })

            // Get Languages
            await GetAllMotherTongue(false, this.state.access_token).then(res=>{
                let response = res; 
                // console.log(response.data)
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.id,
                        name : el.value
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({LanguageArr : modifiedArr})
            })
            .catch(err=>{
                let error = err
                console.log(JSON.stringify(error))
            })

            // Get Countries
            await GetAllNationality(false, this.state.access_token).then(res=>{
                let response = res; 
                // console.log(response.data)
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.country_id ,
                        name : el.name
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({CountryArr : modifiedArr})
            })
            .catch(err=>{
                let error = err
                console.log(JSON.stringify(error))
            })

            // Marital Status
            await GetAllMaritalStatus(false, this.state.access_token).then(res=>{
                let response = res; 
                // console.log(response.data)
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.id,
                        name : el.value
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({MaritalStatusArr : modifiedArr})
            })
            .catch(err=>{
                let error = err
                console.log(JSON.stringify(error))
            })

            await GetAllMotherTongue(false, this.state.access_token).then(res=>{
                let response = res;
                if (response.status) {
                    let modifiedObj = {}
                    let modifiedArr = []
                    response.data.map((el, i) => {
                        modifiedObj = {
                            name: el.value,
                            id: el.id
                        }
                        modifiedArr.push(modifiedObj)
                    })
                    this.setState({ MotherTongueArr: modifiedArr})
                }
            })


            await GetFamilyStatusListing(this.state.access_token).then(res => {
                let response = res;
                
                if (response.data.status) {
                    let modifiedObj = {};
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        modifiedObj = {
                            id: el.id,
                            name: el.value_en
                        }
                        modifiedArr.push(modifiedObj)
                    })
                    
                    this.setState({ FamilyStatusArr: modifiedArr })
                }
            })
            
            await GetAnnualIncomeOptions(false, this.state.access_token).then(res => { 
                let response = res; 
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.id ,
                        name : el.value_en
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ AnnualIncomeArr: modifiedArr }) 
            })

        }
        catch{

        }
            
    }

    async onCountryChange(item){
        this.setState({SelectedCountry : item})

        await GetStatesListFromCountries(this.state.access_token,{"country_ids":[`${item.id}`]}).then(res=>{
            let response = res;
            console.log(response.data.data)
            let modifiedArr = []
                response.data.data.map((el,i)=>{
                    let modifiedObj = {
                        id : el.state_id,
                        name : el.name,
                    };
                    modifiedArr.push(modifiedObj)
                })
                console.log(modifiedArr)
                this.setState({StateByCountryArr : modifiedArr})
        })
    }

    onMinHeightChange(item){
        this.setState({MinHeight : item})
    }

    onMaxHeightChange(item){
        this.setState({MaxHeight : item})
    }

    onMinAgeChange(item){
        this.setState({MinAge : item})
    }

    onMaxAgeChange(item){
        this.setState({MaxAge : item})
    }

    onReligionChange(item){
        this.setState({SelectedReligion : item})
        GetAllCasteListByReligion(item.religion_id).then((res)=>{
            let response = res            
            if(response.status){
                let modifiedObj = {}
                let modifiedArr = []
                response.data.map((el,i)=>{
                    modifiedObj = {
                        name : el.caste_name,
                        id : el.caste_id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({CasteArr : modifiedArr, Caste : ""})
            }
            else{
                this.setState({allCasteArray : [{id : '0', name : 'No caste for me'}], Caste : "", allSubCasteArray : [{id : '0', name : 'No Sub caste for me'}], SubCaste : ""})
            }
        })
    }

    onCasteChange(item){
        this.setState({SelectedCaste : item})
        GetAllSubCasteListByCast(item.id).then((res)=>{
            let response = res
            if(response.status){
                let modifiedObj = {}
                let modifiedArr = []
                response.data.map((el,i)=>{
                    modifiedObj = {
                        name : el.sub_caste_name,
                        id : el.sub_caste_id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({SubCasteArr : modifiedArr, SubCaste : ""})
            }
        })
    }

    onSubCasteChange(item){
        this.setState({SelectedSubCaste : item})
    }

    onLanguageChange(item){
        this.setState({SelectedLanguage : item})
    }

    onMaritalStatusChange(item){
        this.setState({SelectedMaritalStatus : item})
    }

    async onSearchPress(){
        try {
                let reqObj = {
                    gender : this.state.IsGenderMale ? 1 : 0,
                    marital_status : this.state.SelectedMaritalStatus ? this.state.SelectedMaritalStatus.id : '',
                    religion : this.state.SelectedReligion ? this.state.SelectedReligion.id : '',
                    caste : this.state.SelectedCaste ? this.state.SelectedCaste.id : '',
                    sub_caste : this.state.SelectedSubCaste ? this.state.SelectedSubCaste.id : '',
                    language : this.state.SelectedLanguage ? this.state.SelectedLanguage.id : '' ,
                    country : this.state.SelectedCountry ? this.state.SelectedCountry.id : '',
                    manglik : this.state.IsManglik ? 1 : 0,
                    aged_from : this.state.MinAge ? this.state.MinAge.id : 0,
                    aged_to : this.state.MaxAge ? this.state.MaxAge.id : 100,
                    min_height : this.state.MinHeight ? this.state.MinHeight.id : 0,
                    max_height : this.state.MaxHeight ? this.state.MinAge.id : 100,
                    state : this.state.SelectedState ? this.state.SelectedState.id : '',
                    annual_income : this.state.SelectedAnnualIncome ? this.state.SelectedAnnualIncome.id : '',
                    family_status : this.state.SelectedFamilyStatus ? this.state.SelectedFamilyStatus.id : '',
                    mother_tongue : this.state.SelectedMotherTongue ? this.state.SelectedMotherTongue.id : '',
                }
                await AdvanceSearch(this.state.access_token, reqObj)
                    .then(res => {
                        let response = res;
                        if (response.data.status) {
                            console.log(response.data)
                            goToDrawerViewAllMatchedUserScreen({ title: 'Advance Search', data: response.data.data })
                        }
                        else {
                            ToastAndroid.showWithGravityAndOffset(
                                'No Such User Exist.',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                            )
                        }
                    })
                    .catch(err => {
                        let error = err;
                        console.log(JSON.stringify(error))
                    })
        }

        catch {

        }
    }

    render(){
        return(
            <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps = "always" contentContainerStyle={{width : deviceDimesions.width*0.95, alignSelf : "center", paddingBottom : deviceDimesions.Height*0.1}}>
                <View style={{flexDirection : 'row', justifyContent : 'space-around'}}>
                    <SignupDropDownFullWidthWithSearch
                        containerWidth = {deviceDimesions.width*0.45}
                        containerWidth = {deviceDimesions.width*0.45}
                        pickerWidth = {deviceDimesions.width*0.35}
                        selectedPickerValue = {this.state.MinHeight ? 'Min Height - ' + this.state.MinHeight.name : 'Min Height'}
                        onChangeHandler = {(index,item)=>this.onMinHeightChange(item)}
                        staticLable = "Min Height"
                        pickerDataArr = {this.state.AllHeightArr}
                        ShowIcon
                    />

                    <SignupDropDownFullWidthWithSearch
                        containerWidth = {deviceDimesions.width*0.45}
                        containerWidth = {deviceDimesions.width*0.45}
                        pickerWidth = {deviceDimesions.width*0.35}
                        selectedPickerValue = {this.state.MaxHeight ? 'Max Height - ' + this.state.MaxHeight.name : 'Max Height'}
                        onChangeHandler = {(index,item)=>this.onMaxHeightChange(item)}
                        staticLable = "Max Height"
                        pickerDataArr = {this.state.AllHeightArr}
                        ShowIcon
                    />
                </View>

                <View style={{flexDirection : 'row', justifyContent : 'space-around'}}>
                    <SignupDropDownFullWidthWithSearch
                        containerWidth = {deviceDimesions.width*0.45}
                        containerWidth = {deviceDimesions.width*0.45}
                        pickerWidth = {deviceDimesions.width*0.35}
                        selectedPickerValue = {this.state.MinAge ? 'Min Age - ' + this.state.MinAge.name : 'Min Age'}
                        onChangeHandler = {(index,item)=>this.onMinAgeChange(item)}
                        staticLable = "Min Age"
                        pickerDataArr = {this.state.AllAgeArr}
                        ShowIcon
                    />

                    <SignupDropDownFullWidthWithSearch
                        containerWidth = {deviceDimesions.width*0.45}
                        containerWidth = {deviceDimesions.width*0.45}
                        pickerWidth = {deviceDimesions.width*0.35}
                        selectedPickerValue = {this.state.MaxAge ? 'Max Age - ' + this.state.MaxAge.name : 'Max Age'}
                        onChangeHandler = {(index,item)=>this.onMaxAgeChange(item)}
                        staticLable = "Max Age"
                        pickerDataArr = {this.state.AllAgeArr}
                        ShowIcon
                    />
                </View>

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedReligion ? 'Religion - ' + this.state.SelectedReligion.name : 'Religion'}
                    onChangeHandler = {(index,item)=>this.onReligionChange(item)}
                    staticLable = "Religion"
                    pickerDataArr = {this.state.ReligionArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedCaste ? 'Caste - ' + this.state.SelectedCaste.name : 'Caste'}
                    onChangeHandler = {(index,item)=>this.onCasteChange(item)}
                    staticLable = "Caste"
                    pickerDataArr = {this.state.CasteArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedSubCaste ? 'Sub Caste - ' + this.state.SelectedSubCaste.name : 'Sub Caste'}
                    onChangeHandler = {(index,item)=>this.onSubCasteChange(item)}
                    staticLable = "Sub Caste"
                    pickerDataArr = {this.state.SubCasteArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedLanguage ? 'Language - ' + this.state.SelectedLanguage.name : 'Language'}
                    onChangeHandler = {(index,item)=>this.onLanguageChange(item)}
                    staticLable = "Language"
                    pickerDataArr = {this.state.LanguageArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedCountry ? 'Country - ' + this.state.SelectedCountry.name : 'Country'}
                    onChangeHandler = {(index,item)=>this.onCountryChange(item)}
                    staticLable = "Country"
                    pickerDataArr = {this.state.CountryArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedState ? 'State - ' + this.state.SelectedState.name : 'State'}
                    onChangeHandler = {(index,item)=>this.setState({SelectedState : item})}
                    staticLable = "State"
                    itemSeparatorStyle
                    pickerDataArr = {this.state.StateByCountryArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedMaritalStatus ? 'Marital Status - ' + this.state.SelectedMaritalStatus.name : 'Marital Status'}
                    onChangeHandler = {(index,item)=>this.onMaritalStatusChange(item)}
                    staticLable = "Marital Status"
                    itemSeparatorStyle
                    pickerDataArr = {this.state.MaritalStatusArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedMotherTongue ? 'Mother Tongue - ' + this.state.SelectedMotherTongue.name : 'Mother Tongue'}
                    onChangeHandler = {(index,item)=>this.setState({SelectedMotherTongue : item})}
                    staticLable = "Mother Tongue"
                    pickerDataArr = {this.state.MotherTongueArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedFamilyStatus ? 'Family status - ' + this.state.SelectedFamilyStatus.name : 'Family status'}
                    onChangeHandler = {(index,item)=>this.setState({SelectedFamilyStatus : item})}
                    staticLable = "Family status"
                    itemSeparatorStyle
                    pickerDataArr = {this.state.FamilyStatusArr}
                    ShowIcon
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.SelectedAnnualIncome ? 'Annual Income - ' + this.state.SelectedAnnualIncome.name : 'Annual Income'}
                    onChangeHandler = {(index,item)=>this.setState({SelectedAnnualIncome : item})}
                    staticLable = "Annual Income"
                    itemSeparatorStyle
                    pickerDataArr = {this.state.AnnualIncomeArr}
                    ShowIcon
                />

                <View style={{alignItems : 'center', alignSelf : 'center', width : deviceDimesions.width*0.9,  flexDirection : 'row', marginTop : deviceDimesions.Height*0.05 }}>
                    <Text style={{marginRight : deviceDimesions.width*0.05}}>Manglik</Text>
                    <NeuButton
                        color = "#ffffff"
                        height = {deviceDimesions.Height*0.04}
                        width = {deviceDimesions.width*0.08}
                        borderRadius = {10}
                        onPress = {()=>this.setState({ IsChovvaDosham : !this.state. IsChovvaDosham})}
                    >
                        {
                            this.state.IsChovvaDosham ? <Icon name="check" color="red" /> : <Icon name="check" color="#666666" />
                        }
                        
                    </NeuButton>
                </View>

                <View  style={{alignItems : "center", marginTop : deviceDimesions.Height*0.05}}>
                    <TouchableOpacity
                        onPress = {()=>this.onSearchPress()}
                        style={{backgroundColor : "#ff6600", flexDirection : "row", justifyContent : "space-evenly", width : deviceDimesions.width*0.5, padding : 10, alignItems : "center", borderRadius : 10, elevation : 5}}
                    >
                        <Text style={{color : "#ffffff", fontSize : 16,  fontFamily : "700"}}>SEARCH</Text>
                        <NeuBorderView
                            color = "#ff6600"
                            width = {deviceDimesions.width*0.08}
                            height = {deviceDimesions.Height*0.045}
                            borderRadius = {20}
                            inset
                        >
                            <Icon name="search" color="#ffffff" size={16} />
                        </NeuBorderView>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}