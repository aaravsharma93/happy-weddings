// EditPreferences

import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, Alert, BackHandler, Image, KeyboardAvoidingView, TextInput, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import Popover from 'react-native-popover-view';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAstroStarsList, GetPartnerPreferenceAstrodetails, GetPartnerPreferenceBasicDetails, GetPartnerPreferenceHobbies, GetPartnerPreferenceLifestyle, GetPartnerPreferencePhysicalAttr, UpdatePArtnerPreferenceAstroDetails, GetHobbiesParameters, UpdatePArtnerPreferenceHobbiesAndInterest, GetDietListings, GetBloodGrouplist, GetBodylist, GetDisabilitiesList, GetHeight, UpdatePArtnerPreferencePhysicalAttr, GetSmokeListings, GetDrinkListings, UpdatePArtnerPreferenceLifeStyle, GetLocationOptions, UpdatePArtnerPreferenceBasicDetails, GetAllMotherTongue, GetAllMaritalStatus, GetAllCountryCode, GetStatesListFromCountries, GetAllReligionList, GetAllCasteListByReligion, GetFamilyStatusListing, GetFamilyValuesListing } from '../../helper/API_Call/API_Call';
import { Modal } from 'react-native';
import ToggleButtonForPicker from '../../component/ToggleButtonForPicker/ToggleButtonForPicker';
import { SignupDropDownFullWidthWithSearch } from '../../component/SignupDropDownFullWidth/SignupDropDownFullWidth';
import { ToastAndroid } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { AutoCompleteInput } from '../../component/AutoCompleteInput/AutoCompleteInput';
import { Pressable } from 'react-native';
import { H3 } from 'native-base';
import CountryCodeArr from '../../helper/CountryCodeJSON/CountryCodeJSON';

export default class EditPreferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            access_token: "",
            userData: '',
            BasicPreference: [],
            PhysicalPreference: [],
            LifestylePreference: [],
            HobbiesPreference: [],
            AstroPreference: [],

            showBasicDetailsModal: false,
            showAstroDetailsModal: false,
            showEditHobbiesPreferenceModal: false,
            showPhysicalDetailsModal: false,
            showLifeStyleModal: false,
            showMultiSelectionPicker: false,

            //  Basic details
            showPlaceGreUpLocationModal: false,
            locationName: "",
            LocationData: [],
            AllKidsCountArr: [{ id: '0', name: `Doesn't matter` }, { id: 'Yes', name: `Yes` }, { id: 'No', name: `No` }],
            HaveKidsCount: "",
            AllAgeArr: [],
            MaxAge: '',
            MinAge: '',
            MotherTongueListing: [],
            MaritalStatusListing: [],
            ResidencyStatusListing: [
                { id: 156, isChecked: false, value: "Citizen" },
                { id: 157, isChecked: false, value: "Permanent Resident" },
                { id: 158, isChecked: false, value: "Student Visa" },
                { id: 159, isChecked: false, value: "Temporary Visa" },
                { id: 160, isChecked: false, value: "Work Permit" },
            ],
            CountryListing: CountryCodeArr,
            ReligionListing: [],
            FamilyValuesListing: [],
            CasteByReligionListing: [],
            StateByCountryListing: [],
            FamilyStatusListing: [],
            FamilyValuesListing: [],

            showMotherTongueMultiselectionPicker: false,
            showMaritalStatusMultiselectionPicker: false,
            showResidencyStatusMultiselectionPicker: false,
            showCountryMultiselectionPicker: false,
            showStateBySelectedCountryMultiselectionPicker: false,
            showReligionMultiselectionPicker: false,
            showCasteByReligionMultiselectionPicker: false,
            showFamilyValuesMultiselectionPicker: false,
            showFamilyStatusMultiselectionPicker: false,

            // Physical Details
            AllHeightArr: [],
            MaxHeight: '',
            MinHeight: '',

            AllWeightArr: [],
            MaxWeight: '',
            MinWeight: '',

            BloodGroupArr: [],
            BodyTypeArr: [],
            DisabilityArr: [],

            selectedBloodGroup: "",
            selectedBodyType: "",
            selectedDisability: "",

            // Astro details 
            matchingStarsLable: 'Matching Stars',
            isSudhajathakam: true,
            showMiltiselectPicker: false,
            AllStarsArr: [],
            MatchingStarsArr: [],

            // Hobbies & Interest
            showHobbiesMultiselectedPicker: false,
            HobbiesLable: "Hobbies and Interest",
            AllHobbiesList: [],
            SelectedHobbiesArr: [],

            // LifeStyle Details
            dietArr: [],
            smokeArr: [],
            drinkArr: [],

            selectedDiet: "",
            selectedSmoke: "",
            selectedDrink: "",
        }
    }


    GetAgeArr() {
        let ageArr = []
        let initialAge = 18
        for (initialAge; initialAge < 100; initialAge++) {
            ageArr.push({ name: initialAge, id: initialAge })
        }
        this.setState({ AllAgeArr: ageArr })
    }

    async componentDidMount() {
        try {

            let userDataObj = JSON.parse(await AsyncStorage.getItem('user_data'))
            this.setState({ userData: userDataObj })
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });

            let ModifiedWeightArr = new Array();
            for (let index = 40; index < 170; index++) {
                let weightObj = {
                    id: index,
                    name: index + " kg",
                }
                ModifiedWeightArr.push(weightObj)
            }
            this.setState({ AllWeightArr: ModifiedWeightArr })

            this.GetAgeArr()
            await GetPartnerPreferenceBasicDetails(this.state.access_token).then(res => { let response = res; this.setState({ BasicPreference: response.data.data }) }).catch(err => { let error = err; console.log(error) })
            await GetPartnerPreferencePhysicalAttr(this.state.access_token).then(res => { let response = res; this.setState({ PhysicalPreference: response.data.data }) }).catch(err => { let error = err; console.log(error) })
            await GetPartnerPreferenceLifestyle(this.state.access_token).then(res => { let response = res; this.setState({ LifestylePreference: response.data.data }) }).catch(err => { let error = err; console.log(error) })

            await GetAllMotherTongue(false, this.state.access_token).then(res => {
                let response = res;
                let modifiedArr = []
                response.data.map((el, i) => {
                    let modifiedObj = el;
                    modifiedObj.isChecked = false;
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ MotherTongueListing: modifiedArr })
            })

            await GetAllMaritalStatus(false, this.state.access_token).then(res => {
                let response = res;
                let modifiedArr = []
                response.data.map((el, i) => {
                    let modifiedObj = el;
                    modifiedObj.isChecked = false;
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ MaritalStatusListing: modifiedArr })
            })

            await GetAllReligionList().then(res => {
                let response = res;
                let modifiedArr = []
                response.data.map((el, i) => {
                    let modifiedObj = {
                        id: el.religion_id,
                        value: el.name,
                        isChecked: false
                    };
                    modifiedObj.isChecked = false;
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ ReligionListing: modifiedArr })
            })

            await GetFamilyStatusListing(this.state.access_token).then(res => {
                let response = res;
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    let modifiedObj = {
                        id: el.id,
                        value: el.value_en,
                        isChecked: false
                    };
                    modifiedObj.isChecked = false;
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ FamilyStatusListing: modifiedArr })
            })

            await GetFamilyValuesListing(this.state.access_token).then(res => {
                let response = res;
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    let modifiedObj = {
                        id: el.id,
                        value: el.value_en,
                        isChecked: false
                    };
                    modifiedObj.isChecked = false;
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ FamilyValuesListing: modifiedArr })
            })

            await GetPartnerPreferenceHobbies(this.state.access_token).then(res => {
                let response = res;
                this.setState({ HobbiesPreference: response.data.data, HobbiesLable: response.data.data.hobbies_interests.toString() })
            })

            await GetPartnerPreferenceAstrodetails(this.state.access_token).then(res => {
                let response = res;
                this.setState({ AstroPreference: response.data.data, isSudhajathakam: response.data.data.shudha_jathakam == "Yes" ? true : false, matchingStarsLable: response.data.data.matching_stars != [] ? response.data.data.matching_stars.toString() : "Matching Stars" })
            })

            await GetHobbiesParameters(this.state.access_token).then(res => {
                let response = res;
                let modifiedResponse = response.data.data.map((el, i) => {
                    el.checked = false;
                    return el;
                });

                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        name: el.value,
                        id: el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ AllHobbiesList: modifiedResponse })
            })

            await GetAstroStarsList(true, this.state.access_token).then(res => {
                let response = res;
                let modifiedResponse = response.data.data.map((el, i) => {
                    el.checked = false;
                    return el;
                });

                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        name: el.star_name,
                        id: el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ AllStarsArr: modifiedResponse })
            })

            await GetHeight(this.state.access_token).then(res => {
                let response = res;
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        id: el.height_id,
                        name: el.height
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ AllHeightArr: modifiedArr })
            })

            await GetBloodGrouplist(this.state.access_token).then(res => {
                let response = res;
                let modifiedResponse = response.data.data.map((el, i) => {
                    el.checked = false;
                    return el;
                });

                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        name: el.value_en,
                        id: el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ BloodGroupArr: modifiedArr })
            })

            await GetBodylist(this.state.access_token).then(res => {
                let response = res;
                let modifiedResponse = response.data.data.map((el, i) => {
                    el.checked = false;
                    return el;
                });

                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        name: el.value_en,
                        id: el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ BodyTypeArr: modifiedArr })
            })

            await GetDisabilitiesList(this.state.access_token).then(res => {
                let response = res;
                let modifiedResponse = response.data.data.map((el, i) => {
                    el.checked = false;
                    return el;
                });

                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        name: el.value_en,
                        id: el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ DisabilityArr: modifiedArr })
            })

            await GetDietListings(this.state.access_token).then(res => {
                let response = res;
                let modifiedResponse = response.data.data.map((el, i) => {
                    el.checked = false;
                    return el;
                });

                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        name: el.value_en,
                        id: el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ dietArr: modifiedArr })
            })

            await GetSmokeListings(this.state.access_token).then(res => {
                let response = res;
                let modifiedResponse = response.data.data.map((el, i) => {
                    el.checked = false;
                    return el;
                });

                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        name: el.value_en,
                        id: el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ smokeArr: modifiedArr })
            })

            await GetDrinkListings(this.state.access_token).then(res => {
                let response = res;
                let modifiedResponse = response.data.data.map((el, i) => {
                    el.checked = false;
                    return el;
                });

                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    modifiedObj = {
                        name: el.value_en,
                        id: el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ drinkArr: modifiedArr })
            })


        }
        catch {

        }
    }

    //  Hobbies Preferences
    onHobbiesSelectUnselect(el, i) {
        let AllHobbiesArrModify = [...this.state.AllHobbiesList]
        AllHobbiesArrModify.some((ele, i) => ele.id == el.id) ? AllHobbiesArrModify[i].checked = !AllHobbiesArrModify[i].checked : false;
        this.setState({ AllHobbiesList: AllHobbiesArrModify })

        let checkedStarsArr = []

        AllHobbiesArrModify.map((el, i) => {
            el.checked ? checkedStarsArr.push(el) : false
        })
        this.setState({ SelectedHobbiesArr: checkedStarsArr })

    }

    OnSaveSelectedHobbiesPress() {
        let SelectHobbiesArr = [...this.state.SelectedHobbiesArr]
        let SelectHobbiesStr = ''
        if (SelectHobbiesArr.length > 0) {
            SelectHobbiesArr.map((el, i) => {
                SelectHobbiesStr = SelectHobbiesStr.concat(el.value + ", ")
            })

            this.setState({ showHobbiesMultiselectedPicker: false, HobbiesLable: SelectHobbiesStr })
        }
        else {
            this.setState({ showHobbiesMultiselectedPicker: false, HobbiesLable: "Hobbies and Interests" })
        }

    }

    SaveHobbiesPreference() {
        let data = {
            hobbies_interests: this.state.SelectedHobbiesArr.map((el, i) => { return el.id }),
        };
        console.log(data)
        UpdatePArtnerPreferenceHobbiesAndInterest(data, this.state.access_token).then(res => {
            let response = res
            console.log(response.data)
            GetPartnerPreferenceHobbies(this.state.access_token).then(res => { let response = res; this.setState({ HobbiesPreference: response.data.data, showEditHobbiesPreferenceModal: false }) }).catch(err => { let error = err; console.log(error) })
        })
            .catch(err => {
                let error = err
            })
    }
    // Astro Details Preferences
    onMatchingStarSelectUnselect(el, i) {
        let AllStarsArrModify = [...this.state.AllStarsArr]
        AllStarsArrModify.some((ele, i) => ele.id == el.id) ? AllStarsArrModify[i].checked = !AllStarsArrModify[i].checked : false;
        this.setState({ AllStarsArr: AllStarsArrModify })

        let checkedStarsArr = []

        AllStarsArrModify.map((el, i) => {
            el.checked ? checkedStarsArr.push(el) : false
        })
        this.setState({ MatchingStarsArr: checkedStarsArr })

    }

    OnSaveMatchingStarsPress() {
        let MatchStarsArr = [...this.state.MatchingStarsArr]
        let MatchingStarsStr = ''
        if (MatchStarsArr.length > 0) {
            MatchStarsArr.map((el, i) => {
                MatchingStarsStr = MatchingStarsStr.concat(el.star_name + ", ")
            })

            this.setState({ showMiltiselectPicker: false, matchingStarsLable: MatchingStarsStr })
        }
        else {
            this.setState({ showMiltiselectPicker: false, matchingStarsLable: "Matching Stars" })
        }

    }

    toggleMultiselectPicker(value) {
        this.setState({ showMiltiselectPicker: value })
    }

    SaveAstroPreference() {
        let data = {
            matching_stars: this.state.MatchingStarsArr.map((el, i) => { return el.id }),
            chovva_dosham: this.state.isSudhajathakam ? 2 : 1,
            shudha_jathakam: this.state.isSudhajathakam ? 2 : 1,
        };
        console.log(data)
        UpdatePArtnerPreferenceAstroDetails(data, this.state.access_token).then(res => {
            let response = res
            console.log(response.data)
            GetPartnerPreferenceAstrodetails(this.state.access_token).then(res => { let response = res; console.log(response.data.data); this.setState({ AstroPreference: response.data.data, showAstroDetailsModal: false }) }).catch(err => { let error = err; console.log(error) })
        })
            .catch(err => {
                let error = err
            })
    }

    // Basic Details Preferences
    onMinAgeChange(item) {
        this.setState({ MinAge: item })
    }

    onMaxAgeChange(item) {
        this.setState({ MaxAge: item })
    }

    onMotherTongueCheck(item, i) {
        let cloneData = [...this.state.MotherTongueListing]
        cloneData[i].isChecked = !cloneData[i].isChecked
        this.setState({ MotherTongueListing: cloneData }, () => {
            console.log(this.state.MotherTongueListing.filter((el, i) => el.isChecked))
        })
    }

    onMaritalStatusCheck(item, i) {
        let cloneData = [...this.state.MaritalStatusListing]
        cloneData[i].isChecked = !cloneData[i].isChecked
        this.setState({ MaritalStatusListing: cloneData })
    }

    onResidencyStatusCheck(item, i) {
        let cloneData = [...this.state.ResidencyStatusListing]
        cloneData[i].isChecked = !cloneData[i].isChecked
        this.setState({ ResidencyStatusListing: cloneData })
    }

    onCountryCheck(item, i) {
        let cloneData = [...this.state.CountryListing]
        cloneData[i].isChecked = !cloneData[i].isChecked
        this.setState({ CountryListing: cloneData })

        let selectedCountry = cloneData.filter((el, i) => el.isChecked)
        let selectedCountryIdArr = { country_ids: selectedCountry.map((el, i) => el.id.toString()) }

        GetStatesListFromCountries(this.state.access_token, JSON.stringify(selectedCountryIdArr)).then(res => {
            let response = res;
            console.log(response.data.data)
            let modifiedArr = []
            response.data.data.map((el, i) => {
                let modifiedObj = {
                    id: el.state_id,
                    value: el.name,
                    isChecked: false
                };
                modifiedObj.isChecked = false;
                modifiedArr.push(modifiedObj)
            })
            console.log(modifiedArr)
            this.setState({ StateByCountryListing: modifiedArr })
        })
    }

    onStateByCountryCheck(item, i) {
        let cloneData = [...this.state.StateByCountryListing]
        cloneData[i].isChecked = !cloneData[i].isChecked
        this.setState({ StateByCountryListing: cloneData })
    }

    onReligionCheck(item, i) {
        let cloneData = [...this.state.ReligionListing]
        cloneData[i].isChecked = !cloneData[i].isChecked
        this.setState({ ReligionListing: cloneData })

        let selectedReligion = cloneData.filter((el, i) => el.isChecked)
        let selectedReligionIdArr = selectedReligion.map((el, i) => el.id.toString())
        this.setState({ CasteByReligionListing: [] })
        let allCasteArr = [...this.state.CasteByReligionListing];

        selectedReligionIdArr.map(async (el, i) => {
            console.log("selectedReligionIdArr",el)
            await GetAllCasteListByReligion(el).then(res => {
                let response = res;
            
                let modifiedArr = []
                response.data.map((el, i) => {
                    let modifiedObj = {
                        id: el.caste_id,
                        value: el.caste_name,
                        isChecked: false
                    };
                    allCasteArr.push(modifiedObj)
                })
                
            })
        })
        this.setState({ CasteByReligionListing: allCasteArr })
    }

    onCasteCheck(item, i) {
        let cloneData = [...this.state.CasteByReligionListing]
        cloneData[i].isChecked = !cloneData[i].isChecked 
        this.setState({ CasteByReligionListing: cloneData })
    }

    onFamilyStatusCheck(item, i) {
        let cloneData = [...this.state.FamilyStatusListing]
        cloneData[i].isChecked = !cloneData[i].isChecked
        this.setState({ FamilyStatusListing: cloneData })
    }

    onFamilyValuesCheck(item, i) {
        let cloneData = [...this.state.FamilyValuesListing]
        cloneData[i].isChecked = !cloneData[i].isChecked
        this.setState({ FamilyValuesListing: cloneData })
    }

    async onLocationInputChange(text) {
        if (text == '') {
            ToastAndroid.showWithGravityAndOffset(
                "Please Enter Location.",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            this.setState({ locationName: text })
            GetLocationOptions(text).then(res => { let response = res; this.setState({ LocationData: response.data.data }) }).catch(err => { let error = err; console.log(error) })
        }

    }

    _renderLocationOptions(el) {
        console.log(el)
        return (
            <Pressable style={{ width: deviceDimesions.width * 0.8, paddingVertical: deviceDimesions.Height * 0.02, paddingHorizontal: deviceDimesions.width * 0.02, backgroundColor: '#fff' }} onPress={() => this.setState({ locationName: el.item, LocationData: '', showPlaceGreUpLocationModal: false })}>
                <Text>{el.item.name}</Text>
            </Pressable>
        )
    }

    SaveBasicPreference() {
        let reqObj = {
            min_age: this.state.MinAge ? this.state.MinAge.id : null,
            max_age: this.state.MaxAge ? this.state.MaxAge.id : null,
            have_kids: this.state.HaveKidsCount ? this.state.HaveKidsCount.id : null,
            place_grew_up: this.state.locationName ? this.state.locationName.city_id : null,
            mother_tongue: this.state.MotherTongueListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
            marital_status: this.state.MaritalStatusListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
            religion: this.state.ReligionListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
            caste: this.state.CasteByReligionListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
            country: this.state.CountryListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
            state: this.state.StateByCountryListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
            residency_status: this.state.ResidencyStatusListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
            family_status: this.state.FamilyStatusListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
            family_values: this.state.FamilyValuesListing.filter((el, i) => el.isChecked).map((el, i) => el.id).toString(),
        }

        console.log(JSON.stringify(reqObj),"-------------------------------JSON-----------------------------")

        UpdatePArtnerPreferenceBasicDetails(reqObj, this.state.access_token).then(res => {
            let response = res;
            console.log(response)
            GetPartnerPreferenceBasicDetails(this.state.access_token).then(res => { let response = res; 
                console.log(response.data.data,"-------------------------------response.data.data-----------------------------")
                this.setState({ BasicPreference: response.data.data, showBasicDetailsModal: false }) }).catch(err => { let error = err; console.log(error) })
        })
    }

    // Physical Preference
    SavePhysicalPreference() {
        let reqObj = {
            partner_from_height: this.state.MinHeight ? this.state.MinHeight.id : null,
            partner_to_height: this.state.MaxHeight ? this.state.MaxHeight.id : null,
            partner_from_weight: this.state.MinWeight ? this.state.MinWeight.id : null,
            partner_to_weight: this.state.MaxWeight ? this.state.MaxWeight.id : null,
            partner_blood_group: this.state.selectedBloodGroup ? this.state.selectedBloodGroup.id : null,
            partner_body_type: this.state.selectedBodyType ? this.state.selectedBodyType.id : null,
            partner_any_disability: this.state.selectedDisability ? this.state.selectedDisability.id : null,
        }

        UpdatePArtnerPreferencePhysicalAttr(reqObj, this.state.access_token).then(res => {
            let response = res;
            console.log(response)
            GetPartnerPreferencePhysicalAttr(this.state.access_token).then(res => { let response = res; this.setState({ PhysicalPreference: response.data.data, showPhysicalDetailsModal: false }) }).catch(err => { let error = err; console.log(error) })
        })
            .catch(err => {
                let error = err;
                console.log(error)
            })
    }

    // Life Style Preference
    SaveLifeStylePreference() {
        let reqObj = {
            smoke: this.state.selectedSmoke ? this.state.selectedSmoke.id : null,
            drink: this.state.selectedDrink ? this.state.selectedDrink.id : null,
            diet: this.state.selectedDiet ? this.state.selectedDiet.id : null,
        }
        UpdatePArtnerPreferenceLifeStyle(reqObj, this.state.access_token).then(res => {
            let response = res;
            console.log(response)
            GetPartnerPreferenceLifestyle(this.state.access_token).then(res => { 
                
                let response = res; 
                this.setState({ LifestylePreference: response.data.data, showLifeStyleModal: false }) })
                
                .catch(err => { let error = err; console.log(error) })
        })
            .catch(err => {
                let error = err;
                console.log(error)
            })
    }

    render() {
        const { onBackButtonPress } = this.props
        return (
            <View style={styles.container}>
                <View style={{ width: deviceDimesions.width * 0.95, alignSelf: "center", alignItems: "center", flexDirection: "row", padding: 10 }}>
                    <TouchableOpacity onPress={() => onBackButtonPress()} style={{}}>
                        <Icon name="chevron-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginLeft: deviceDimesions.width * 0.05 }}>EDIT PREFERENCES</Text>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: deviceDimesions.Height * 0.2 }}>
                    <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }}>
                        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, width: deviceDimesions.width * 0.9, paddingVertical: 20, alignSelf: 'center', elevation: 4 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.02 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name="file" />
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}> Basic Preferences</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                   
                                    <NeuButton
                                        color="#ffffff"
                                        width={deviceDimesions.width * 0.09}
                                        height={deviceDimesions.Height * 0.05}
                                        borderRadius={20}
                                        onPress={() => this.setState({ showBasicDetailsModal: true })}
                                    >
                                        <Icon name="pencil" />
                                    </NeuButton>
                                </View>
                            </View>

                            <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Age</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.min_age} yrs - {this.state.BasicPreference.max_age} yrs</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="globe" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Mother Tongue</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.mother_tongue ? this.state.BasicPreference.mother_tongue.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="male" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Marital Status</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.marital_status ? this.state.BasicPreference.marital_status.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="child" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Have Kids</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.have_kids == null ? "No" : "Yes"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Religion</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.religion ? this.state.BasicPreference.religion.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Caste</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.caste ? this.state.BasicPreference.caste.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Family Status</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.family_status ? this.state.BasicPreference.family_status.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Family Values</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.family_values ? this.state.BasicPreference.family_values.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="male" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Country</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.country ? this.state.BasicPreference.country.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="male" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>State</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.BasicPreference.state ? this.state.BasicPreference.state.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                               
                            </View>
                        </View>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showBasicDetailsModal}
                            onBackdropPress={() => this.setState({ showBasicDetailsModal: false })}
                            onRequestClose={() => {
                                this.setState({ showBasicDetailsModal: false })
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.01 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Basic Preference</Text>
                                    </View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignSelf: 'center' }}>
                                            <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.9 }}>
                                                <SignupDropDownFullWidthWithSearch

                                                    containerWidth={deviceDimesions.width * 0.39}
                                                    pickerWidth={deviceDimesions.width * 0.25}
                                                    selectedPickerValue={this.state.MinAge ? 'Min Age - ' + this.state.MinAge.name : 'Min Age'}
                                                    onChangeHandler={(index, item) => this.onMinAgeChange(item)}
                                                    staticLable="Min Age"
                                                    pickerDataArr={this.state.AllAgeArr}

                                                />

                                                <SignupDropDownFullWidthWithSearch

                                                    containerWidth={deviceDimesions.width * 0.39}
                                                    pickerWidth={deviceDimesions.width * 0.25}

                                                    selectedPickerValue={this.state.MaxAge ? 'Max Age - ' + this.state.MaxAge.name : 'Max Age'}
                                                    onChangeHandler={(index, item) => this.onMaxAgeChange(item)}
                                                    staticLable="Max Age"
                                                    pickerDataArr={this.state.AllAgeArr}

                                                />
                                            </View>

                                            <View style={{ alignItems: 'center' }}>

                                              

                                                <SignupDropDownFullWidthWithSearch
                                                    containerWidth={deviceDimesions.width * 0.8}
                                                    pickerWidth={deviceDimesions.width * 0.7}
                                                    selectedPickerValue={this.state.HaveKidsCount ? 'Have Kids - ' + this.state.HaveKidsCount.name : 'Have Kids'}
                                                    onChangeHandler={(index, item) => this.setState({ HaveKidsCount: item })}
                                                    staticLable="Have Kids"
                                                    pickerDataArr={this.state.AllKidsCountArr}
                                                />

                                                <ToggleButtonForPicker
                                                    ButtonWidth={deviceDimesions.width * 0.8}
                                                    DownIcon={false}
                                                    onButtonPress={
                                                        () => this.setState({ showMotherTongueMultiselectionPicker: true })
                                                    }
                                                    buttonTitle={this.state.MotherTongueListing.filter((el, i) => el.isChecked).length > 0 ? this.state.MotherTongueListing.filter((el, i) => el.isChecked).map((el, i) => el.value).toString() : "Mother Tongue"}
                                                />
                                                <ToggleButtonForPicker
                                                    ButtonWidth={deviceDimesions.width * 0.8}
                                                    DownIcon={false}
                                                    onButtonPress={
                                                        () => this.setState({ showMaritalStatusMultiselectionPicker: true })
                                                    }
                                                    buttonTitle={this.state.MaritalStatusListing.filter((el, i) => el.isChecked).length > 0 ? this.state.MaritalStatusListing.filter((el, i) => el.isChecked).map((el, i) => el.value).toString() : "Marital Status"}
                                                />
                                               

                                                <ToggleButtonForPicker
                                                    ButtonWidth={deviceDimesions.width * 0.8}
                                                    DownIcon={false}
                                                    onButtonPress={
                                                        () => this.setState({ showCountryMultiselectionPicker: true })
                                                    }
                                                    buttonTitle={this.state.CountryListing.filter((el, i) => el.isChecked).length > 0 ? this.state.CountryListing.filter((el, i) => el.isChecked).map((el, i) => el.value).toString() : "Country"}
                                                />

                                                <ToggleButtonForPicker
                                                    ButtonWidth={deviceDimesions.width * 0.8}
                                                    DownIcon={false}
                                                    onButtonPress={
                                                        () => this.setState({ showStateBySelectedCountryMultiselectionPicker: true })
                                                    }
                                                    buttonTitle={this.state.StateByCountryListing.filter((el, i) => el.isChecked).length > 0 ? this.state.StateByCountryListing.filter((el, i) => el.isChecked).map((el, i) => el.value).toString() : "State"}
                                                />

                                                <ToggleButtonForPicker
                                                    ButtonWidth={deviceDimesions.width * 0.8}
                                                    DownIcon={false}
                                                    onButtonPress={
                                                        () => this.setState({ showReligionMultiselectionPicker: true })
                                                    }
                                                    buttonTitle={this.state.ReligionListing.filter((el, i) => el.isChecked).length > 0 ? this.state.ReligionListing.filter((el, i) => el.isChecked).map((el, i) => el.value).toString() : "Religion"}
                                                />

                                                <ToggleButtonForPicker
                                                    ButtonWidth={deviceDimesions.width * 0.8}
                                                    DownIcon={false}
                                                    onButtonPress={
                                                        () => this.setState({ showCasteByReligionMultiselectionPicker: true })
                                                    }
                                                    buttonTitle={this.state.CasteByReligionListing.filter((el, i) => el.isChecked).length > 0 ? this.state.CasteByReligionListing.filter((el, i) => el.isChecked).map((el, i) => el.value).toString() : "Caste"}
                                                />

                                                <ToggleButtonForPicker
                                                    ButtonWidth={deviceDimesions.width * 0.8}
                                                    DownIcon={false}
                                                    onButtonPress={
                                                        () => this.setState({ showFamilyValuesMultiselectionPicker: true })
                                                    }
                                                    buttonTitle={this.state.FamilyValuesListing.filter((el, i) => el.isChecked).length > 0 ? this.state.FamilyValuesListing.filter((el, i) => el.isChecked).map((el, i) => el.value).toString() : "Family Values"}
                                                />

                                                <ToggleButtonForPicker
                                                    ButtonWidth={deviceDimesions.width * 0.8}
                                                    DownIcon={false}
                                                    onButtonPress={
                                                        () => this.setState({ showFamilyStatusMultiselectionPicker: true })
                                                    }
                                                    buttonTitle={this.state.FamilyStatusListing.filter((el, i) => el.isChecked).length > 0 ? this.state.FamilyStatusListing.filter((el, i) => el.isChecked).map((el, i) => el.value).toString() : "Family Status"}
                                                />
                                            </View>

                                        </ScrollView>

                                    </View>
                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.SaveBasicPreference()}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                        </NeuButton>

                                        <NeuButton
                                            color="#ffffff"
                                            borderRadius={10}
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showBasicDetailsModal: false })}
                                        >
                                            <Text style={{ fontSize: 15,fontWeight: "bold", fontFamily: "700" }}>Cancel</Text>
                                        </NeuButton>
                                    </View>


                                </View>
                            </View>
                        </Modal>
                        {/* Mother Tongue Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showMotherTongueMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showMotherTongueMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showMotherTongueMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>Mother Tongue</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.MotherTongueListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onMotherTongueCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 ,}}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showMotherTongueMultiselectionPicker: false })}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold"}}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/* Marital Status  Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showMaritalStatusMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showMaritalStatusMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showMaritalStatusMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>Marital Status</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.MaritalStatusListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onMaritalStatusCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showMaritalStatusMultiselectionPicker: false })}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/* Residency Status  Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showResidencyStatusMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showResidencyStatusMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showResidencyStatusMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>Residency Status</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.ResidencyStatusListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onResidencyStatusCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showResidencyStatusMultiselectionPicker: false })}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/* Country Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showCountryMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showCountryMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showCountryMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>Country</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.CountryListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onCountryCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text numberOfLines={1} style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showCountryMultiselectionPicker: false })}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold"}}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/* State By Country Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showStateBySelectedCountryMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showStateBySelectedCountryMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showStateBySelectedCountryMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>State</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.StateByCountryListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onStateByCountryCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                                           borderRadius={10}
                                                           noShadow
                                                           width={deviceDimesions.width * 0.3}
                                                           height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showStateBySelectedCountryMultiselectionPicker: false })}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold"}}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showReligionMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showReligionMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showReligionMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>Religion</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.ReligionListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onReligionCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showReligionMultiselectionPicker: false })}
                                        >
                                            <Text style={{color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showCasteByReligionMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showCasteByReligionMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showCasteByReligionMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>Caste</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.CasteByReligionListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onCasteCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showCasteByReligionMultiselectionPicker: false })}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/* Family Values Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showFamilyValuesMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showFamilyValuesMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showFamilyValuesMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>Family Values</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.FamilyValuesListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onFamilyValuesCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showFamilyValuesMultiselectionPicker: false })}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold"}}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/* Family Status Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showFamilyStatusMultiselectionPicker}
                            onBackdropPress={() => this.setState({ showFamilyStatusMultiselectionPicker: false })}
                            onRequestClose={() => this.setState({ showFamilyStatusMultiselectionPicker: false })}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ alignSelf: 'center' }}><H3>Family Status</H3></View>
                                    <View style={{ height: deviceDimesions.Height * 0.5, alignSelf: 'center' }}>
                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", paddingVertical: deviceDimesions.width * 0.04, borderRadius: 10 }}>
                                            {
                                                this.state.FamilyStatusListing.map((el, i) => {
                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => this.onFamilyStatusCheck(el, i)}
                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>

                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                                           borderRadius={10}
                                                           noShadow
                                                           width={deviceDimesions.width * 0.3}
                                                           height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showFamilyStatusMultiselectionPicker: false })}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold"}}>Save</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>


                    </View>
                    <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }}>
                        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, width: deviceDimesions.width * 0.9, paddingVertical: 20, alignSelf: 'center', elevation: 4 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.02 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name="file" />
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}> Physical Attributes</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <NeuButton
                                        color="#ffffff"
                                        width={deviceDimesions.width * 0.09}
                                        height={deviceDimesions.Height * 0.05}
                                        borderRadius={20}
                                        onPress={() => this.setState({ showPhysicalDetailsModal: true })}
                                    >
                                        <Icon name="pencil" />
                                    </NeuButton>
                                </View>
                            </View>

                            <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="arrows-v" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Height</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.PhysicalPreference.from_height} - {this.state.PhysicalPreference.to_height}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="balance-scale" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Weight</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.PhysicalPreference.from_weight ? this.state.PhysicalPreference.from_weight + "-" : ""} {this.state.PhysicalPreference.to_weight ? this.state.PhysicalPreference.to_weight : "All"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Body Type</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.PhysicalPreference.body_type}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="male" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Physical Disability</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.PhysicalPreference.physical_disability}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showPhysicalDetailsModal}
                            onBackdropPress={() => this.setState({ showPhysicalDetailsModal: false })}
                            onRequestClose={() => {
                                this.setState({ showPhysicalDetailsModal: false })
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalViewPhysicalpreference}>
                                    <View style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.005 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Physical Preference</Text>
                                    </View>
                                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignSelf: 'center', padding: 10 }}>
                                        <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.9 }}>
                                            <SignupDropDownFullWidthWithSearch
                                               
                                                containerWidth={deviceDimesions.width * 0.39}
                                                pickerWidth={deviceDimesions.width * 0.32}
                                                selectedPickerValue={this.state.MinHeight ? 'Min Height - ' + this.state.MinHeight.name : 'Min Height'}
                                                onChangeHandler={(index, item) => this.setState({ MinHeight: item })}
                                                staticLable="Min Height"
                                                pickerDataArr={this.state.AllHeightArr}

                                            />

                                            <SignupDropDownFullWidthWithSearch
                                                containerWidth={deviceDimesions.width * 0.39}
                                                pickerWidth={deviceDimesions.width * 0.32}
                                                selectedPickerValue={this.state.MaxHeight ? 'Max Height - ' + this.state.MaxHeight.name : 'Max Height'}
                                                onChangeHandler={(index, item) => this.setState({ MaxHeight: item })}
                                                staticLable="Max Height"
                                                pickerDataArr={this.state.AllHeightArr}

                                            />
                                        </View>
                                        <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.9 }}>
                                            <SignupDropDownFullWidthWithSearch
                                                containerWidth={deviceDimesions.width * 0.39}
                                                pickerWidth={deviceDimesions.width * 0.32}
                                                selectedPickerValue={this.state.MinWeight ? 'Min Weight - ' + this.state.MinWeight.name : 'Min Weight'}
                                                onChangeHandler={(index, item) => this.setState({ MinWeight: item })}
                                                staticLable="Min Weight"
                                                pickerDataArr={this.state.AllWeightArr}

                                            />

                                            <SignupDropDownFullWidthWithSearch
                                                containerWidth={deviceDimesions.width * 0.39}
                                                pickerWidth={deviceDimesions.width * 0.32}
                                                selectedPickerValue={this.state.MaxWeight ? 'Max Weight - ' + this.state.MaxWeight.name : 'Max Weight'}
                                                onChangeHandler={(index, item) => this.setState({ MaxWeight: item })}
                                                staticLable="Max Weight"
                                                pickerDataArr={this.state.AllWeightArr}

                                            />
                                        </View>
                                       
                                        <View style={{ alignSelf: 'center' }}>
                                            <SignupDropDownFullWidthWithSearch
                                                containerWidth={deviceDimesions.width * 0.8}
                                                pickerWidth={deviceDimesions.width * 0.7}
                                                selectedPickerValue={this.state.selectedBodyType ? 'Body Type - ' + this.state.selectedBodyType.name : 'Body Type'}
                                                onChangeHandler={(index, item) => this.setState({ selectedBodyType: item })}
                                                staticLable="Body Type"
                                                pickerDataArr={this.state.BodyTypeArr}
                                                itemSeparatorStyle
                                               
                                            />
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <SignupDropDownFullWidthWithSearch
                                                containerWidth={deviceDimesions.width * 0.8}
                                                pickerWidth={deviceDimesions.width * 0.7}
                                                selectedPickerValue={this.state.selectedDisability ? this.state.selectedDisability.name : 'Disability'}
                                                onChangeHandler={(index, item) => this.setState({ selectedDisability: item })}
                                                staticLable="Disability"
                                                pickerDataArr={this.state.DisabilityArr}
                                                customItemSeparatorStyle={deviceDimesions.Height * 0.1}
                                            />
                                        </View>
                                    </ScrollView>
                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.SavePhysicalPreference()}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                        </NeuButton>

                                        <NeuButton
                                            color="#ffffff"
                                            borderRadius={10}
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showPhysicalDetailsModal: false })}
                                        >
                                            <Text style={{ fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Cancel</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                    <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }}>
                        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, width: deviceDimesions.width * 0.9, paddingVertical: 20, alignSelf: 'center', elevation: 4 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.02 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name="file" />
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}> Hobbies & Interests Preferences</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <NeuButton
                                        color="#ffffff"
                                        width={deviceDimesions.width * 0.09}
                                        height={deviceDimesions.Height * 0.05}
                                        borderRadius={20}
                                        onPress={() => this.setState({ showEditHobbiesPreferenceModal: true })}
                                    >
                                        <Icon name="pencil" />
                                    </NeuButton>
                                </View>
                            </View>

                            <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Hobbies </Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.HobbiesPreference.hobbies_interests ? this.state.HobbiesPreference.hobbies_interests.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.showEditHobbiesPreferenceModal}
                                onBackdropPress={() => this.setState({ showEditHobbiesPreferenceModal: false })}
                                onRequestClose={() => {
                                    this.setState({ showEditHobbiesPreferenceModal: false })
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalViewHobbies}>
                                        <View style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.01 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Hobbies & Interest Preference</Text>
                                        </View>
                                        <View style={{ marginVertical: deviceDimesions.Height * 0.01, alignSelf: 'center', flex: 1 }}>
                                            <ToggleButtonForPicker
                                                ButtonWidth={deviceDimesions.width * 0.8}
                                                DownIcon={false}
                                                onButtonPress={() => this.setState({ showHobbiesMultiselectedPicker: !this.state.showHobbiesMultiselectedPicker })}
                                                buttonTitle={!this.state.HobbiesLable ? "Hobbies & Interests" : this.state.HobbiesLable.length > 50 ? this.state.HobbiesLable.slice(0, 35) + "..." : this.state.HobbiesLable}
                                            />
                                            <Modal
                                                visible={this.state.showHobbiesMultiselectedPicker}
                                                animationType="slide"
                                                transparent={true}
                                                onBackdropPress={() => this.setState({ showHobbiesMultiselectedPicker: false })}
                                                onRequestClose={() => {
                                                    this.setState({ showHobbiesMultiselectedPicker: false })
                                                }}
                                            >
                                                <View style={styles.centeredView}>
                                                    <View style={styles.modalView}>
                                                        <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", padding: deviceDimesions.width * 0.02, borderRadius: 10 }}>
                                                            {
                                                                this.state.AllHobbiesList.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity
                                                                            onPress={() => this.onHobbiesSelectUnselect(el, i)}
                                                                            style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                                            <View style={{ alignItems: 'center' }}>
                                                                                <Text style={{ color: el.checked ? "red" : "#000", fontSize: 15 }}>{el.value}</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </ScrollView>
                                                        <View style={{ alignItems: 'center', backgroundColor: "#f2f2f2", paddingVertical: deviceDimesions.Height * 0.01 }}>
                                                            <NeuButton
                                                                 color="#ffc115"
                                                                 borderRadius={10}
                                                                 noShadow
                                                                 width={deviceDimesions.width * 0.3}
                                                                 height={deviceDimesions.Height * 0.06}
                                                                onPress={() => this.OnSaveSelectedHobbiesPress()}
                                                            >
                                                                <Text>Save</Text>
                                                            </NeuButton>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                        <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                            <NeuButton
                                                color="#ffc115"
                                                borderRadius={10}
                                                noShadow
                                                width={deviceDimesions.width * 0.3}
                                                height={deviceDimesions.Height * 0.06}
                                                onPress={() => this.SaveHobbiesPreference()}
                                            >
                                                <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                            </NeuButton>

                                            <NeuButton
                                                color="#ffffff"
                                                borderRadius={10}
                                                width={deviceDimesions.width * 0.3}
                                                height={deviceDimesions.Height * 0.06}
                                                onPress={() => this.setState({ showEditHobbiesPreferenceModal: false })}
                                            >
                                                <Text style={{ fontSize: 15, fontFamily: "700" , fontWeight: "bold"  }}>Cancel</Text>
                                            </NeuButton>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                    <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }}>
                        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, width: deviceDimesions.width * 0.9, paddingVertical: 20, alignSelf: 'center', elevation: 4 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.02 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name="file" />
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}> Life Style</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <NeuButton
                                        color="#ffffff"
                                        width={deviceDimesions.width * 0.09}
                                        height={deviceDimesions.Height * 0.05}
                                        borderRadius={20}
                                        onPress={() => this.setState({ showLifeStyleModal: true })}
                                    >
                                        <Icon name="pencil" />
                                    </NeuButton>
                                </View>
                            </View>

                            <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Diet</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.LifestylePreference.diet ? this.state.LifestylePreference.diet.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="arrows-v" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Drinking</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.LifestylePreference.drinking ? this.state.LifestylePreference.drinking.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="balance-scale" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Smoking</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.LifestylePreference.smoking ? this.state.LifestylePreference.smoking.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                            </View>

                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showLifeStyleModal}
                            onBackdropPress={() => this.setState({ showLifeStyleModal: false })}
                            onRequestClose={() => {
                                this.setState({ showLifeStyleModal: false })
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalViewlifestyle}>
                                    <View style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.01 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Life Style Preference</Text>
                                    </View>
                                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignSelf: 'center' }}>
                                        <View style={{ alignSelf: 'center' }}>
                                            <SignupDropDownFullWidthWithSearch
                                                containerWidth={deviceDimesions.width * 0.67}
                                                pickerWidth={deviceDimesions.width * 0.6}
                                                selectedPickerValue={this.state.selectedDiet ? 'Diet - ' + this.state.selectedDiet.name : 'Diet'}
                                                onChangeHandler={(index, item) => this.setState({ selectedDiet: item })}
                                                staticLable="Diet"
                                                pickerDataArr={this.state.dietArr}
                                                itemSeparatorStyle
                                                customItemSeparatorStyle={deviceDimesions.Height * 0.1}

                                            />
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <SignupDropDownFullWidthWithSearch
                                                containerWidth={deviceDimesions.width * 0.67}
                                                pickerWidth={deviceDimesions.width * 0.6}
                                                selectedPickerValue={this.state.selectedDrink ? 'Drink - ' + this.state.selectedDrink.name : 'Drink'}
                                                onChangeHandler={(index, item) => this.setState({ selectedDrink: item })}
                                                staticLable="Drink"
                                                pickerDataArr={this.state.drinkArr}
                                                customItemSeparatorStyle={deviceDimesions.Height * 0.1}
                                            />
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <SignupDropDownFullWidthWithSearch
                                                containerWidth={deviceDimesions.width * 0.68}
                                                pickerWidth={deviceDimesions.width * 0.6}
                                                selectedPickerValue={this.state.selectedSmoke ? 'Smoke - ' + this.state.selectedSmoke.name : 'Smoke'}
                                                onChangeHandler={(index, item) => this.setState({ selectedSmoke: item })}
                                                staticLable="Smoke"
                                                pickerDataArr={this.state.smokeArr}
                                                customItemSeparatorStyle={deviceDimesions.Height * 0.1}
                                            />
                                        </View>
                                    </ScrollView>
                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            onPress={() => this.SaveLifeStylePreference()}
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                        >

                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                        </NeuButton>

                                        <NeuButton
                                            color="#ffffff"
                                            borderRadius={10}
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showLifeStyleModal: false })}
                                        >
                                            <Text style={{fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Cancel</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                    <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }}>
                        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, width: deviceDimesions.width * 0.9, paddingVertical: 20, alignSelf: 'center', elevation: 4 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.85, marginBottom: deviceDimesions.Height * 0.02 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name="file" />
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}> Astro Details</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <NeuButton
                                        color="#ffffff"
                                        width={deviceDimesions.width * 0.09}
                                        height={deviceDimesions.Height * 0.05}
                                        borderRadius={20}
                                        onPress={() => this.setState({ showAstroDetailsModal: true })}
                                    >
                                        <Icon name="pencil" />
                                    </NeuButton>
                                </View>
                            </View>

                            <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="user" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Matching Stars</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.AstroPreference.matching_stars ? this.state.AstroPreference.matching_stars.toString() : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: deviceDimesions.Height * 0.015, justifyContent: "space-evenly", alignItems: "flex-start", alignSelf: "center", width: deviceDimesions.width * 0.85 }}>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "flex-start" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            width={deviceDimesions.width * 0.08}
                                            height={deviceDimesions.Height * 0.045}
                                            borderRadius={20}
                                        >
                                            <Icon name="arrows-v" color="orange" size={16} />
                                        </NeuBorderView>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.3, alignItems: "flex-start" }}>
                                        <Text>Shudha Jathakam</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.25, alignItems: "flex-start" }}>
                                        <Text>{this.state.AstroPreference.shudha_jathakam ? this.state.AstroPreference.shudha_jathakam : "-"}</Text>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.15, alignItems: "center" }}>

                                    </View>
                                </View>
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showAstroDetailsModal}
                            onBackdropPress={() => this.setState({ showAstroDetailsModal: false })}
                            onRequestClose={() => {
                                this.setState({ showAstroDetailsModal: false })
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalViewAstroPreference}>
                                    <View style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.01 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Astro Preference</Text>
                                    </View>
                                    <View style={{ marginVertical: deviceDimesions.Height * 0.01, alignSelf: 'center', flex: 1 }}>
                                        <ToggleButtonForPicker
                                            ButtonWidth={deviceDimesions.width * 0.8}
                                            DownIcon={false}
                                            onButtonPress={() => this.toggleMultiselectPicker(!this.state.showMiltiselectPicker)}
                                            buttonTitle={!this.state.matchingStarsLable || this.state.matchingStarsLable == "Matching Stars" ? "Matching Stars" : this.state.matchingStarsLable.length > 50 ? this.state.matchingStarsLable.slice(0, 35) + "..." : this.state.matchingStarsLable}
                                        />
                                        <Modal
                                            visible={this.state.showMiltiselectPicker}
                                            animationType="slide"
                                            transparent={true}
                                            onBackdropPress={() => this.setState({ showMiltiselectPicker: false })}
                                            onRequestClose={() => {
                                                this.setState({ showMiltiselectPicker: false })
                                            }}
                                        >
                                            <View style={styles.centeredView}>
                                                <View style={styles.modalView}>
                                                    <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", padding: deviceDimesions.width * 0.02, borderRadius: 10 }}>
                                                        {
                                                            this.state.AllStarsArr.map((el, i) => {
                                                                return (
                                                                    <TouchableOpacity
                                                                        onPress={() => this.onMatchingStarSelectUnselect(el, i)}
                                                                        style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                                        <View style={{ alignItems: 'center' }}>
                                                                            <Text style={{ color: el.checked ? "red" : "#000", fontSize: 15 }}>{el.star_name}</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                )
                                                            })
                                                        }
                                                    </ScrollView>
                                                    <View style={{ alignItems: 'center', backgroundColor: "#f2f2f2", paddingVertical: deviceDimesions.Height * 0.01 }}>
                                                        <NeuButton

                                                            color="#ffc115"
                                                            borderRadius={10}
                                                            noShadow
                                                            width={deviceDimesions.width * 0.3}
                                                            height={deviceDimesions.Height * 0.06}
                                                            onPress={() => this.OnSaveMatchingStarsPress()}
                                                        >
                                                            <Text>Save</Text>
                                                        </NeuButton>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                        <View style={styles.termsAndConditionContainer}>
                                            <NeuButton
                                                color="#ffffff"
                                                height={deviceDimesions.Height * 0.04}
                                                width={deviceDimesions.width * 0.08}
                                                borderRadius={10}
                                                onPress={() => this.setState({ isSudhajathakam: !this.state.isSudhajathakam })}
                                            >
                                                {
                                                    this.state.isSudhajathakam ? <Icon name="check" color="red" /> : null
                                                }

                                            </NeuButton>
                                            <Text style={{ marginLeft: 10, opacity: 0.7 }}> Manglik</Text>
                                        </View>
                                    </View>
                                    <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-around', width: deviceDimesions.width * 0.8 }}>
                                        <NeuButton
                                            color="#ffc115"
                                            borderRadius={10}
                                            noShadow
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.SaveAstroPreference()}
                                        >
                                            <Text style={{ color:'#ffffff', fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Save</Text>
                                        </NeuButton>

                                        <NeuButton
                                            color="#ffffff"
                                            borderRadius={10}
                                            width={deviceDimesions.width * 0.3}
                                            height={deviceDimesions.Height * 0.06}
                                            onPress={() => this.setState({ showAstroDetailsModal: false })}
                                        >
                                            <Text style={{ fontSize: 15, fontFamily: "700" , fontWeight: "bold" }}>Cancel</Text>
                                        </NeuButton>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>

                </ScrollView>
                {/* Place Grew Up Location Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showPlaceGreUpLocationModal}
                    onBackdropPress={() => this.setState({ showPlaceGreUpLocationModal: false })}
                    onRequestClose={() => {
                        this.setState({ showPlaceGreUpLocationModal: false })
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableHighlight onPressIn={() => this.setState({ showPlaceGreUpLocationModal: false })} style={{ position: 'absolute', right: 0, borderWidth: 0.4, borderRadius: 30, paddingHorizontal: deviceDimesions.width * 0.03, paddingVertical: deviceDimesions.width * 0.02 }}>
                                <Text style={{ fontSize: 16 }}>X</Text>
                            </TouchableHighlight>
                            <AutoCompleteInput placeHolder="Enter Location" value={!this.state.locationName ? '' : this.state.locationName.name} data={this.state.LocationData} onChangeText={(text) => this.onLocationInputChange(text)} renderOptions={(el) => this._renderLocationOptions(el)} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: deviceDimesions.Height * 0.01,
        height: deviceDimesions.Height,
        width: deviceDimesions.width
    },
    profilePicturePercentContainer: {
        marginLeft: -deviceDimesions.width * 0.02,
        marginTop: deviceDimesions.Height * 0.11
    },
    profilePicturePercentText: {
        fontWeight: "bold",
        fontSize: 12
    },
    termsAndConditionContainer: {
        flexDirection: "row",
        marginTop: deviceDimesions.Height * 0.04,
        alignItems: "center",
        alignSelf: 'center'
    },
    modalView: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.7,
        paddingTop: deviceDimesions.Height * 0.04,
        backgroundColor: "#ffffff",

        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalViewPhysicalpreference: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.65,
        paddingTop: deviceDimesions.Height * 0.04,
        backgroundColor: "#ffffff",

        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalViewHobbies: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.35,
        paddingTop: deviceDimesions.Height * 0.04,
        backgroundColor: "#ffffff",

        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalViewlifestyle: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.55,
        paddingTop: deviceDimesions.Height * 0.04,
        backgroundColor: "#ffffff",

        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalViewAstroPreference: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.45,
        paddingTop: deviceDimesions.Height * 0.04,
        backgroundColor: "#ffffff",

        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ' rgba(255,255,255,0.4)'
    },
})