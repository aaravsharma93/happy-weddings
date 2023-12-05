
import React, { Component, createRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ScrollView, Modal, ToastAndroid, TouchableHighlight, Platform, InteractionManager } from 'react-native';
import 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProgressCircle from 'react-native-progress-circle';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import StepIndicator from 'react-native-step-indicator';
import RangeSliderForSignup from '../../component/RangeSliderForSignup/RangeSliderForSignup';
import { CheckBox, H3 } from 'native-base';
import { goToEditUserPreferencesScreen, goToManagePhotoScreen, goToManageVideoScreen, goToTrustBadgesSliderScreen, goToTrustedBadgesScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import RangeSlider from 'rn-range-slider';
import {
    FewWordsAbout,
    GetBloodGrouplist,
    GetBodylist,
    GetComlexionList,
    GetDisabilitiesList, GetFamilyDetailsOfMember, GetHeight, GetKnowMeBetter, GetLocationOptions,
    GetMemberDetail, RegistrationStep3, UpdateKnowMeBetter, UploadHoroscope, GetFamilyStatusListing,
    GetAstroDetail, GetAstroStarsList, GetDietListings, GetDrinkListings, GetSmokeListings, GetAnnualIncomeOptions,
    GetAllNationality, GetAllMaritalStatus, GetAllMotherTongue, GetEducationLevel, GetAllCasteListByReligion, GetAllReligionList,
    EditProfileSignupDetails, EditPhysicalAttributeDetails, UpdateLifeStyleDetails, UpdateFamilyDetails,
    EducationDetailsOfLoggedInUser, GetFieldOfStudy, UpdateEducation, GetMemberCareerDetails, GetJobTypeListing,
    GetEmploymentTypeListing, UpdateCareer, UpdateAstroDetails, GetFamilyValuesListing, GetUserHobbiesAndInterests,
    GetHobbiesParameters, GetInterestParameters, GetMusicParameters, GetMoviesParameters, GetSportsParameters, GetCuisineParameters, GetDressParameters, GetBooksParameters,
    UpdateHobbiesAndInterest,
    updateFamilyStatusValue,
    GetNotWorkingStatus,
    UpdateNotWorking,
    UpdateAnnualIncome,
    AddAboutFamily,
    GetAllCast
} from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL } from '../../API_config/BaseURL';
import ImagePicker from 'react-native-image-crop-picker';
import { AutoCompleteInput } from '../../component/AutoCompleteInput/AutoCompleteInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import ToggleButtonForPicker from '../../component/ToggleButtonForPicker/ToggleButtonForPicker';
import { Pressable } from 'react-native';
import { SignupDropDownFullWidth, SignupDropDownFullWidthWithSearch } from '../../component/SignupDropDownFullWidth/SignupDropDownFullWidth';
import { Picker } from '@react-native-picker/picker';
import { CustomImagePicker } from '../../component/ImagePicker/ImagePicker';
import ContentLoader from 'react-native-easy-content-loader';
import { Keyboard } from 'react-native';
import { Flow, Pulse } from 'react-native-animated-spinkit';
import DateInput from '../../component/DateInput/DateInput';
import { TextInputMask } from 'react-native-masked-text';
import PulseLoader from 'react-native-pulse-loader';
import Geolocation from '@react-native-community/geolocation';
import { Linking } from 'react-native';
import { Alert } from 'react-native';

export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.touchable = createRef();
        this.inputRef = createRef();
        this.state = {
            isScreenLoading: false,
            isFormSubmitting: false,
            fewWordsAboutMeEditable: false,
            AboutMyFamilyValueEditable: false,
            AboutMyFamilyValue: '',
            access_token: '',
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: "",
            },
            showCustomImagePicker: false,
            showBsicDetailsModal: false,
            canclepop: false,
            overpop: false,
            lifestylepop: false,
            userData: '',
            data: [],
            isLoading: true,
            confirmChangesModal: false,
            isChecked: false,
            starsDetails: false,
            singleFileOBJ: '',
            HobbyAndInterestName: "",
            HobbyAndInterestProgressValue: null,
            Diet: 'Diet',
            Drink: 'Drink',
            Smoke: 'Smoke',
            Income: "Income",
            National: "National",
            SelectedDiet: "",
            Drinklisting: "",
            Smokelisting: "",
            language: "Language",
            Marital: "Marital",
            profileCreatedby: "profileCreatedby",
            stars: "stars",
            SelectEducationLevel: "SelectEducationLevel",
            FewWordsAbout: '',
            selectedBlood: '',
            selectedBody: '',
            selectedComplexion: '',
            selectedDisablities: '',
            HealthConditions: '',
            selectedStar: '',
            CityOfBirth: '',
            showCityOfBirthModal: false,
            showMatchingStarsModal: false,
            selectedMatchingStars: null,
            TimeOfBirth: '',
            selectedstar: 'selectedstar',
            IsChovvaDosham: false,
            IsSudhaJathakam: true,
            starlist: [],
            SelectedEducationLevel: "Education Level",
            SelectedFieldOfStudy: "Field Of Study",
            selectedCollege: "",
            SelectedCourse: "",
            PassingYear: "",
            careerFrom: "",
            careerTo: "",
            UserHobbiesAndInterests: null,
            showUpdateHobbiesAndInterestModal: false,
            AllHobbiesParamsArr: [],
            AllInterestParamsArr: [],
            AllMusicParamsArr: [],
            AllBooksParamsArr: [],
            AllMovieParamsArr: [],
            AllSportsParamsArr: [],
            AllCuisineParamsArr: [],
            AllDressParamsArr: [],
            // Range
            HeightArr: [],
            WeightArr: [],
            Height: 0,
            Weight: 0,
            // Drop down values
            allmemberDetail: [],
            allReligionArray: [],
            allCasteArray: [],
            MotherTongueArr: [],
            MaritalArr: [],
            DietArr: [],
            DrinkArr: [],
            SmokeArr: [],
            allSubCasteArray: [],
            NationalArr: [],
            selectedstarArr: [],
            selectedstarlistArr: [],
            MemberEducationDataArr: [],
            passingYearArr: [],
            IncomeOptionsArr: [],
            EducationsLevelArr: [],
            FieldOfStudyArr: [],
            complexionArr: [],
            BloodArr: [],
            BodyArr: [],
            FamilyStatusArr: [],
            AstroDetailsArr: {},
            DisabilitesArr: [],
            showDisabilityOption: false,
            showDisabilityOptionNo: false,
            KnowMeBetterArr: [],
            CloneOfKnowMeBetterData: [],
            selectedKnowMeBetterQuestionIndex: "",
            FamilyDataArr: [],
            FamilyDataEditedArr: [{ name: "", member_type: "", work_status: "", working_in: "", designation: "" }],
            WorkStatusArr: [
                { id: 0, name: 'Not Working' },
                { id: 1, name: 'Working' },
                { id: 2, name: 'Retired' },
                { id: 3, name: 'Deceased' },
                { id: '', name: '' },
            ],

            ShowExistingFamilyMemberEditableModal: false,
            JobTypeListArr: [],
            EmploymentTypeListArr: [],
            CareerDataArr: [],
            CareerDataEditableArr: [{ career_type: "", career_to: "", career_designation: "", company_name: "", annual_income: "", currently_working: true }],

            ShowFamilyStatusAndValueEditableModal: false,
            member: "member",
            Religion: "",
            Caste: "",
            SubCaste: "Sub Caste",
            selectedFamilyStatus: "",
            SelectedMaritalStatus: "",
            SelectedMotherTongue: "",
            selectedNationality: "",
            selectedResidencyStatus: "",

            familyValues: "",

            showDatePicker: false,
            showTimePicker: false,
            mode: 'date',
            date: new Date(),
            selectDate: '',
            email: "",
            name: "",
            Mobile: "",
            Age: "",
            DOB: "",
            // Location
            locationName: "Location",
            isCurrentLocation: false,
            Latitude: '',
            Longitude: '',
            LocationData: '',
            showLocationModal: false,
            ViewHoroscopeModal: false,
            ShowKnowMeBetterModal: false,
            ShowFamilyDetailsEditableModal: false,
            showUpdateEducationModal: false,
            showUpdateCareerModal: false,
            SunsignArr: [
                { name: 'Aries', id: '1' },
                { name: 'Taurus', id: '2' },
                { name: 'Gemini', id: '3' },
                { name: 'Cancer', id: '4' },
                { name: 'Leo', id: '5' },
                { name: 'Virgo', id: '6' },
                { name: 'Libra', id: '7' },
                { name: 'Scorpio', id: '8' },
                { name: 'Sagittarius', id: '9' },
                { name: 'Capricorn', id: '10' },
                { name: 'Aquarius', id: '11' },
                { name: 'Pisces', id: '12' },
            ],
            selectedFamilyValue: '',
            FamilyValueArr: [],
            selectedSunSign: '',
            HobbiesArr: [
                {
                    title: "Music",
                    progressValue: 8,
                },
                {
                    title: "Food",
                    progressValue: 7,
                },
                {
                    title: "Sports",
                    progressValue: 5,
                },
                {
                    title: "Shopping",
                    progressValue: 10,
                },
            ],
            ChildrenCount: "Children",
            ChildrenCountArr: [
                {
                    id: 1,
                    name: "1 Children",
                },
                {
                    id: 2,
                    name: "2 Children",
                },
                {
                    id: 3,
                    name: "3 Children",
                },
                {
                    id: 4,
                    name: "4 Children",
                },
                {
                    id: 5,
                    name: "5 Children",
                },
                {
                    id: 6,
                    name: "6 Children",
                },
            ],
            isCurrentlyWorking: "",
            ShowCurrentlyWorkingOrNotModal: false,
            ShowEditAnnualIncomeModal: false,
            AnnualIncomeToUpdate: "Choose Annual Income",
        }
    }

    ToggleLoader(name, title) {
        this.setState({
            LoaderProperties: {
                ...this.state.LoaderProperties,
                LoadingTitle: name,
                isLoading: title,
            }
        })
    }

    async componentDidMount() {
        setTimeout(async () => {
            try {
                this.setState({ isScreenLoading: true })
                let userDataObj = JSON.parse(await AsyncStorage.getItem('user_data'))
                this.setState({ userData: userDataObj })
                const access_token = await AsyncStorage.getItem('access_token');
                this.setState({ access_token });
                // Passing Year Data
                const currentYear = (new Date()).getFullYear();
                const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
                this.setState({ passingYearArr: range(currentYear + 5, currentYear - 50, -1) })

                console.log(userDataObj)
                await GetMemberDetail(userDataObj.userdata.member_id, this.state.access_token)
                    .then((res) => {
                        let response = res;
                        console.log(this.state.access_token)
                        this.setState({
                            userData: response.data.data,
                            FewWordsAbout: response.data.data.few_words_about_me,
                            name: response.data.data.first_name,
                            Mobile: response.data.data.mobile,
                            email: response.data.data.email,
                            selectDate: response.data.data.date_of_birth,
                            Caste: response.data.data.caste,
                            Weight: { id: response.data.data.weight, name: response.data.data.weight + " kg" },

                        })
                    }).catch(err => {
                        console.log(err)
                    })

                await GetNotWorkingStatus(this.state.access_token).then(res => {
                    let response = res;
                    this.setState({ isCurrentlyWorking: response.data.data })
                }).catch(err => {
                    console.log(err)
                })

                await GetUserHobbiesAndInterests(this.state.access_token).then(res => {
                    let response = res;
                    this.setState({ UserHobbiesAndInterests: response.data.data })
                }).catch(err => {
                    console.log(err)
                })

                await GetAstroDetail(userDataObj.userdata.member_id, this.state.access_token).then((res) => {
                    let response = res;
                    this.setState({ AstroDetailsArr: response.data.data, TimeOfBirth: response.data.data.time_of_birth, IsChovvaDosham: response.data.data.chovva_dosham == "Yes" ? true : false, IsSudhaJathakam: response.data.data.shudha_jathakam == "Yes" ? true : false })
                })
                    .catch(err => { console.log(err) })
                // Weight Data
                let ModifiedWeightArr = new Array();
                for (let index = 40; index < 170; index++) {
                    let weightObj = {
                        id: index,
                        name: index + " kg",
                    }
                    ModifiedWeightArr.push(weightObj)
                }
                this.setState({ WeightArr: ModifiedWeightArr })
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
                    let selectedHeight = modifiedArr.filter(item => item.name === this.state.userData.height)
                    this.setState({ HeightArr: modifiedArr, Height: selectedHeight[0] })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
                await GetComlexionList(this.state.access_token).then(res => {
                    let response = res;

                    let modifiedObj = {};
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        modifiedObj = {
                            id: el.id,
                            name: el.value_en
                        }
                        modifiedArr.push(modifiedObj)
                    })

                    let selectedComplexion = modifiedArr.filter(item => item.name == this.state.userData.complexion)
                    this.setState({ complexionArr: modifiedArr, selectedComplexion: selectedComplexion ? selectedComplexion[0] : "" })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
                await GetBloodGrouplist(this.state.access_token).then(res => {
                    let response = res;

                    let modifiedObj = {};
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        modifiedObj = {
                            id: el.id,
                            name: el.value_en
                        }
                        modifiedArr.push(modifiedObj)
                    })
                    let selectedBlood = modifiedArr.filter(item => item.name == this.state.userData.blood_group)
                    this.setState({ BloodArr: modifiedArr, selectedBlood: selectedBlood ? selectedBlood[0] : "" })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
                await GetBodylist(this.state.access_token).then(res => {
                    let response = res;

                    let modifiedObj = {};
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        modifiedObj = {
                            id: el.id,
                            name: el.value_en
                        }
                        modifiedArr.push(modifiedObj)
                    })
                    let selectedBody = modifiedArr.filter(item => item.name == this.state.userData.body_type);
                    this.setState({ BodyArr: modifiedArr, selectedBody: selectedBody ? selectedBody[0] : "" })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
                await GetDisabilitiesList(this.state.access_token).then(res => {
                    let response = res;

                    let modifiedObj = {};
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        modifiedObj = {
                            id: el.id,
                            name: el.value_en
                        }
                        modifiedArr.push(modifiedObj)
                    })
                    let selectedDisablities = this.state.userData.physical_disability !== null ? modifiedArr.filter(item => item.name == this.state.userData.physical_disability) : null
                    this.setState({ DisabilitesArr: modifiedArr, selectedDisablities: selectedDisablities !== null ? selectedDisablities[0] : null })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
                await GetAstroStarsList(false, this.state.access_token).then(res => {
                    let response = res;
                    let modifiedObj = {};
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        modifiedObj = {
                            id: el.id,
                            name: el.star_name,
                            isChecked: false,
                        }
                        modifiedArr.push(modifiedObj)
                    })
                    let selectedStar = modifiedArr.filter(item => item.name == this.state.AstroDetailsArr.birth_star)
                    let selectedSunSign = this.state.SunsignArr.filter(item => item.name == this.state.AstroDetailsArr.sun_sign)
                    this.setState({ starlist: modifiedArr, selectedStar: selectedStar == null ? "" : selectedStar[0], selectedSunSign: selectedSunSign == null ? "" : selectedSunSign[0] })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
                await EducationDetailsOfLoggedInUser(userDataObj.userdata.member_id, this.state.access_token).then(res => {
                    let response = res;

                    this.setState({ MemberEducationDataArr: response.data.data })
                })
                    .catch(err => {
                        let error = err;
                        console.log(JSON.stringify(error))
                    })
                // Know me better api
                this.KnowMeBetterCall()
                // get family details
                await GetFamilyDetailsOfMember(this.state.access_token, userDataObj.userdata.member_id).then(res => {
                    let response = res;
                    if (response.data.status) {
                        this.setState({ FamilyDataArr: response.data.data, familyValues: response.data.data.family_value, selectedFamilyStatus: response.data.data.family_status })
                    }
                    else {
                        ToastAndroid.showWithGravityAndOffset(
                            'Unable to fetch family info',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                }).catch(err => {
                    let error = err
                    console.log(error)
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
                        let selectedFamilyStatus = modifiedArr.filter(item => item.name == this.state.FamilyDataArr.family_status)
                        this.setState({ FamilyStatusArr: modifiedArr, selectedFamilyStatus: selectedFamilyStatus ? selectedFamilyStatus[0] : "" })
                    }
                    else {
                        ToastAndroid.showWithGravityAndOffset(
                            'Unable to fetch family Status Data.',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                }).catch(err => {
                    let error = err
                    console.log(error)
                })
                await GetEducationLevel(false, this.state.access_token).then(res => {
                    let response = res;
                    this.setState({ EducationsLevelArr: response.data });
                }).catch(err => {
                    let error = err
                    console.log(error)
                })
                await GetFieldOfStudy(true, this.state.access_token).then(res => {
                    let response = res;
                    this.setState({ FieldOfStudyArr: response.data })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
                await GetMemberCareerDetails(userDataObj.userdata.member_id, this.state.access_token).then(res => {
                    let response = res;
                    this.setState({ CareerDataArr: response.data.data })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })

                await GetJobTypeListing(this.state.access_token).then(res => {
                    let response = res;
                    this.setState({ JobTypeListArr: response.data.data })
                })
                await GetEmploymentTypeListing(this.state.access_token).then(res => {
                    let response = res;
                    this.setState({ EmploymentTypeListArr: response.data.data })
                })
                // // Religion API------------------
                await GetAllReligionList().then(async (res) => {
                    let response = res;
                    let SelectedReligion = response.data.filter(item => item.name == this.state.userData.religion)
                    this.setState({ allReligionArray: response.data, Religion: SelectedReligion !== null ? SelectedReligion[0] : "" })
                    this.setState({ showDatePicker: false })
                    console.log(item)
                    this.setState({ Religion: item })
                    GetAllCast(item.religion_id).then((res) => {
                        let response = res
                        console.log(response.data.data)

                        if (response.status) {
                            let modifiedObj = {}
                            let modifiedArr = []
                            response.data.data.map((el, i) => {
                                if (el == null) {
                                    return false
                                }
                                else {
                                    modifiedObj = {
                                        name: el.caste_name,
                                        id: el.caste_id
                                    }
                                    modifiedArr.push(modifiedObj)
                                }
                            })
                            this.setState({ allCasteArray: modifiedArr, Caste: item.religion_id == 16 ? modifiedArr[0] : "", SubCaste: "" })
                        }
                        else {
                            this.setState({ allCasteArray: [{ id: '0', name: 'No caste for me' }], Caste: { id: '0', name: 'No caste for me' }, allSubCasteArray: [{ id: '0', name: 'No Sub caste for me' }], SubCaste: "" })
                        }
                    })
                })
                    .catch(err => { console.log(err) })
                await GetAllMaritalStatus(false, this.state.access_token).then(res => {
                    let response = res;
                    this.setState({ MaritalArr: response.data })
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
                        let SelectedMaritalStatus = modifiedArr.filter(item => item.name == this.state.userData.marital_status)
                        this.setState({ MaritalArr: modifiedArr, SelectedMaritalStatus: SelectedMaritalStatus ? SelectedMaritalStatus[0] : "" })
                    }

                })
                await GetAllMotherTongue(false, this.state.access_token).then(res => {
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
                        let SelectedMotherTongue = modifiedArr.filter(item => item.name == this.state.userData.mother_tongue)
                        this.setState({ MotherTongueArr: modifiedArr, SelectedMotherTongue: SelectedMotherTongue ? SelectedMotherTongue[0] : "" })
                    }
                })
                await GetAllNationality(false, this.state.access_token).then(res => {
                    let response = res;
                    if (response.status) {
                        let modifiedObj = {}
                        let modifiedArr = []
                        response.data.map((el, i) => {
                            modifiedObj = {
                                name: el.name,
                                id: el.country_id
                            }
                            modifiedArr.push(modifiedObj)
                        })
                        let selectedNationality = modifiedArr.filter(item => item.name == this.state.userData.country)
                        this.setState({ NationalArr: modifiedArr, selectedNationality: selectedNationality ? selectedNationality[0] : "" })
                    }
                })
                    .catch(err => {
                        let error = err;
                        console.log(error)
                    })

                await GetFamilyValuesListing(this.state.access_token).then(res => {
                    let response = res;

                    if (response.status) {
                        let modifiedObj = {}
                        let modifiedArr = []
                        response.data.data.map((el, i) => {
                            modifiedObj = {
                                name: el.value_en,
                                id: el.id
                            }
                            modifiedArr.push(modifiedObj)
                        })
                        let selectedFamilyValue = modifiedArr.filter(item => item.name == this.state.FamilyDataArr.family_value)
                        this.setState({ FamilyValueArr: modifiedArr, selectedFamilyValue: selectedFamilyValue ? selectedFamilyValue[0] : "" })
                    }
                })
                    .catch(err => {
                        let error = err;
                        console.log(error)
                    })

                this.setState({ isScreenLoading: false })

                await GetHobbiesParameters(this.state.access_token).then(res => {
                    let response = res;
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        el.isChecked = false
                        return modifiedArr.push(el)
                    })

                    this.state.UserHobbiesAndInterests.hobby.map((el, i) => {
                        for (let index in modifiedArr) {
                            if (el == modifiedArr[index].value) {
                                modifiedArr[index].isChecked = true
                            }
                        }
                    })

                    this.setState({ AllHobbiesParamsArr: modifiedArr })
                })
                await GetInterestParameters(this.state.access_token).then(res => {
                    let response = res;
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        el.isChecked = false
                        return modifiedArr.push(el)
                    })

                    this.state.UserHobbiesAndInterests.interest.map((el, i) => {
                        for (let index in modifiedArr) {
                            if (el == modifiedArr[index].value) {
                                modifiedArr[index].isChecked = true
                            }
                        }
                    })

                    this.setState({ AllInterestParamsArr: modifiedArr })
                })
                await GetMusicParameters(this.state.access_token).then(res => {
                    let response = res;
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        el.isChecked = false
                        return modifiedArr.push(el)
                    })
                    this.state.UserHobbiesAndInterests.music.map((el, i) => {
                        for (let index in modifiedArr) {
                            if (el == modifiedArr[index].value) {
                                modifiedArr[index].isChecked = true
                            }
                        }
                    })

                    this.setState({ AllMusicParamsArr: modifiedArr })
                })
                await GetMoviesParameters(this.state.access_token).then(res => {
                    let response = res;
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        el.isChecked = false
                        return modifiedArr.push(el)
                    })
                    this.state.UserHobbiesAndInterests.movie.map((el, i) => {
                        for (let index in modifiedArr) {
                            if (el == modifiedArr[index].value) {
                                modifiedArr[index].isChecked = true
                            }
                        }
                    })

                    this.setState({ AllMovieParamsArr: modifiedArr })
                })
                await GetSportsParameters(this.state.access_token).then(res => {
                    let response = res;
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        el.isChecked = false
                        return modifiedArr.push(el)
                    })
                    this.state.UserHobbiesAndInterests.sports.map((el, i) => {
                        for (let index in modifiedArr) {
                            if (el == modifiedArr[index].value) {
                                modifiedArr[index].isChecked = true
                            }
                        }
                    })

                    this.setState({ AllSportsParamsArr: modifiedArr })
                })
                await GetCuisineParameters(this.state.access_token).then(res => {
                    let response = res;
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        el.isChecked = false
                        return modifiedArr.push(el)
                    })
                    this.state.UserHobbiesAndInterests.cuisine.map((el, i) => {
                        for (let index in modifiedArr) {
                            if (el == modifiedArr[index].value) {
                                modifiedArr[index].isChecked = true
                            }
                        }
                    })

                    this.setState({ AllCuisineParamsArr: modifiedArr })
                })
                await GetDressParameters(this.state.access_token).then(res => {
                    let response = res;
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        el.isChecked = false
                        return modifiedArr.push(el)
                    })
                    this.state.UserHobbiesAndInterests.dress.map((el, i) => {
                        for (let index in modifiedArr) {
                            if (el == modifiedArr[index].value) {
                                modifiedArr[index].isChecked = true
                            }
                        }
                    })

                    this.setState({ AllDressParamsArr: modifiedArr })
                })
                await GetBooksParameters(this.state.access_token).then(res => {
                    let response = res;
                    let modifiedArr = [];
                    response.data.data.map((el, i) => {
                        el.isChecked = false
                        return modifiedArr.push(el)
                    })
                    this.state.UserHobbiesAndInterests.books.map((el, i) => {
                        for (let index in modifiedArr) {
                            if (el == modifiedArr[index].value) {
                                modifiedArr[index].isChecked = true
                            }
                        }
                    })

                    this.setState({ AllBooksParamsArr: modifiedArr })
                })

                // //await Get Diet list--------------
                await GetDietListings(this.state.access_token).then(res => {
                    let response = res;
                    let selectedDietArr = response.data.data.filter(item => item.value_en == this.state.userData.diet)
                    this.setState({ DietArr: response.data.data, SelectedDiet: selectedDietArr ? selectedDietArr[0] : "" })
                })
                    .catch(err => { console.log(err) })

                // //Drinklisting----------------
                await GetDrinkListings(this.state.access_token).then(res => {
                    let response = res;
                    let selectedDrinkArr = response.data.data.filter(item => item.value_en == this.state.userData.drink)
                    this.setState({ DrinkArr: response.data.data, Drinklisting: selectedDrinkArr ? selectedDrinkArr[0] : "" })
                })
                    .catch(err => { console.log(err) })

                // //Smokelisting----------------
                await GetSmokeListings(this.state.access_token).then(res => {
                    let response = res;
                    let selectedSmokeArr = response.data.data.filter(item => item.value_en == this.state.userData.smoke)
                    this.setState({ SmokeArr: response.data.data, Smokelisting: selectedSmokeArr ? selectedSmokeArr[0] : "" })
                })
                    .catch(err => { console.log(err) })

                await GetAnnualIncomeOptions(false, this.state.access_token).then(res => { let response = res; this.setState({ IncomeOptionsArr: response.data }) })
                //Lifestyle Api-----------------------
            }
            catch {

            }
        }, 0)
    }

    getCurrentLocation = () => {
        let geoOptions = {
            enableHighAccuracy: false,
            timeOut: 20000, //20 second  
            //  maximumAge: 1000 //1 second  
        };
        this.setState({ ready: false, error: null });
        Geolocation.getCurrentPosition(this.geoSuccess,
            this.geoFailure,
            geoOptions);

    }
    geoSuccess = (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC-K52B1FhIQewUl4Fp1CgoYxjT6pShusE`)
            .then(res => res.json())
            .then(response => {
                if (response.status == "OK") {
                    console.log(response, "response--------------------")
                    console.log(response.results[3].formatted_address)
                    this.setState({ locationName: response.results[3].formatted_address, isCurrentLocation: true, Latitude: position.coords.latitude, Longitude: position.coords.longitude })
                }
                else {
                    Alert.alert(response.status.message)
                }
            })
            .catch(err => {
                Alert.alert(err)
            })

        this.setState({
            ready: true,
            where: { lat: position.coords.latitude, lng: position.coords.longitude }
        })
    }
    onCareerDetailsChange(value, name) {
        let CloneOfEditableData = [...this.state.CareerDataEditableArr]
        if (name == "career_designation") {
            CloneOfEditableData[0].career_designation = value
        }
        else if (name == "company_name") {
            CloneOfEditableData[0].company_name = value
        }
        else if (name == "career_type") {
            CloneOfEditableData[0].career_type = value
        }
        else if (name == "career_to") {
            CloneOfEditableData[0].career_to = value
        }
        else if (name == "currently_working") {
            CloneOfEditableData[0].currently_working = !CloneOfEditableData[0].currently_working
        }

        this.setState({ CareerDataEditableArr: CloneOfEditableData })
    }

    UpdateIsworkingOrNot() {
        let ValueToUpdate = this.state.isCurrentlyWorking == "Working" ? "Not Working" : "Working";
        Alert.alert(
            "",
            `Do you want to change current working status? (Currently ${this.state.isCurrentlyWorking})`,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        UpdateNotWorking(ValueToUpdate, this.state.access_token).then(res => {
                            let response = res;
                            console.log(response.data)
                            GetNotWorkingStatus(this.state.access_token).then(res => {
                                let response = res;
                                ToastAndroid.showWithGravityAndOffset(
                                    'Working Status Updated.',
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50
                                );
                                this.setState({ isCurrentlyWorking: response.data.data })
                                GetMemberDetail("", this.state.access_token)
                                    .then((res) => {
                                        let response = res;
                                        console.log(this.state.access_token)
                                        this.setState({
                                            userData: response.data.data,
                                        })
                                    }).catch(err => {
                                        console.log(err)
                                    })
                            }).catch(err => {
                                console.log(err)
                            })
                        })
                            .catch(err => {
                                let error = err;
                            })
                    }
                }
            ]
        )
    }

    onUpdateAnnualIcomePress() {
        console.log(this.state.AnnualIncomeToUpdate)
        if (this.state.AnnualIncomeToUpdate == "Choose Annual Income") {
            ToastAndroid.showWithGravityAndOffset(
                'Choose Annual Income',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            UpdateAnnualIncome(this.state.AnnualIncomeToUpdate, this.state.access_token).then(res => {
                let response = res;
                console.log(response.data)
                GetMemberDetail(this.state.userData.member_id, this.state.access_token)
                    .then((res) => {

                        let response = res;
                        this.setState({
                            userData: response.data.data,
                            FewWordsAbout: response.data.data.few_words_about_me,
                            ShowEditAnnualIncomeModal: false
                        })

                    }).catch(err => {
                        console.log(err)
                        this.setState({ isFormSubmitting: false })
                    })
            })
                .catch(err => {
                    let error = err;
                })
        }
    }

    async onCareerSubmit() {
        if (!this.state.CareerDataEditableArr[0].career_designation) {
            ToastAndroid.showWithGravityAndOffset(
                'Career Type required..',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.CareerDataEditableArr[0].company_name) {
            ToastAndroid.showWithGravityAndOffset(
                'Working in required..',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.CareerDataEditableArr[0].career_type) {
            ToastAndroid.showWithGravityAndOffset(
                'Working as required..',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            this.setState({ isFormSubmitting: true })
            let fData = new FormData();
            fData.append("career_designation", this.state.CareerDataEditableArr[0].career_designation)
            fData.append("company_name", this.state.CareerDataEditableArr[0].company_name)
            fData.append("career_type", this.state.CareerDataEditableArr[0].career_type)
            fData.append('career_current', this.state.CareerDataEditableArr[0].currently_working ? 1 : 0)
            UpdateCareer(this.state.access_token, fData).then(res => {
                let response = res;
                console.log(response.data)
                this.setState({ showUpdateCareerModal: false, isFormSubmitting: false })
                GetMemberCareerDetails(this.state.userData.member_id, this.state.access_token).then(res => {
                    let response = res;
                    console.log(response.data)
                    this.setState({ CareerDataArr: response.data.data })
                })
                    .catch(err => {
                        let error = err
                        console.log(error)
                    })
                this.setState({ CareerDataEditableArr: [{ career_type: "", career_to: "", career_designation: "", company_name: "" }] })
                ToastAndroid.showWithGravityAndOffset(
                    'Career Details Updated.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

                //GetMemberDetails
                GetMemberDetail("", this.state.access_token)
                    .then((res) => {
                        let response = res;
                        console.log(this.state.access_token)
                        this.setState({
                            userData: response.data.data,
                        })
                    }).catch(err => {
                        console.log(err)
                    })
            })
                .catch(err => {
                    let error = err;
                    console.log(error);
                    this.setState({ isFormSubmitting: false })
                })
        }
    }

    KnowMeBetterCall() {
        GetKnowMeBetter(this.state.access_token).then(res => {
            let response = res;
            if (response.data.status) {
                response.data.data.map((el, i) => {
                    el.isFocused = false
                })
                this.setState({ KnowMeBetterArr: response.data.data, CloneOfKnowMeBetterData: response.data.data })
            }

            GetMemberDetail("", this.state.access_token)
                .then((res) => {
                    let response = res;
                    console.log(this.state.access_token)
                    this.setState({
                        userData: response.data.data,
                    })
                }).catch(err => {
                    console.log(err)
                })
        })
            .catch(err => {
                let error = err
                console.log(error)
            })
    }

    onReligionChange = (item) => {
        this.setState({ showDatePicker: false })
        this.setState({ Religion: item })
        GetAllCast(item.religion_id).then((res) => {
            let response = res
            console.log(response.data.data)

            if (response.status) {
                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el, i) => {
                    if (el == null) {
                        return false
                    }
                    else {
                        modifiedObj = {
                            name: el.caste_name,
                            id: el.caste_id
                        }
                        modifiedArr.push(modifiedObj)
                    }
                })
                this.setState({ allCasteArray: modifiedArr, Caste: item.religion_id == 16 ? modifiedArr[0] : "", SubCaste: "" })
            }
            else {
                this.setState({ allCasteArray: [{ id: '0', name: 'No caste for me' }], Caste: { id: '0', name: 'No caste for me' }, allSubCasteArray: [{ id: '0', name: 'No Sub caste for me' }], SubCaste: "" })
            }
        })
    }

    HandleAboutMyFamilyValueUpdate = (value) => {
        this.setState({ isFormSubmitting: true })
        value ?

            AddAboutFamily(value, this.state.access_token)
                .then(res => {
                    let response = res
                    // success
                    ToastAndroid.showWithGravityAndOffset(
                        'Updated Successfully',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    this.setState({ isFormSubmitting: false })
                    GetMemberDetail("", this.state.access_token)
                        .then((res) => {
                            let response = res;
                            console.log(this.state.access_token)
                            this.setState({
                                userData: response.data.data,
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    let error = err;
                    // Failed
                    ToastAndroid.showWithGravityAndOffset(
                        'update Failed.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    this.setState({ isFormSubmitting: false })
                    console.log(error)
                })
            :
            ToastAndroid.showWithGravityAndOffset(
                'Please enter about your family',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        setTimeout(() => {
            this.setState({ isFormSubmitting: false })
        }, 1000);
    }

    HandleFewWordsUpdate = (value) => {
        this.setState({ isFormSubmitting: true })
        value ?

            FewWordsAbout(value, this.state.access_token)
                .then(res => {
                    let response = res
                    // success
                    ToastAndroid.showWithGravityAndOffset(
                        'Updated Successfully',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    this.setState({ isFormSubmitting: false })
                    GetMemberDetail("", this.state.access_token)
                        .then((res) => {
                            let response = res;
                            console.log(this.state.access_token)
                            this.setState({
                                userData: response.data.data,
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    let error = err;
                    // Failed
                    ToastAndroid.showWithGravityAndOffset(
                        'update Failed.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    this.setState({ isFormSubmitting: false })
                    console.log(error)
                })
            :
            ToastAndroid.showWithGravityAndOffset(
                'Please Enter few words about yourself',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        setTimeout(() => {
            this.setState({ isFormSubmitting: false })
        }, 1000);

    }

    EditProfileBasicDetails = async () => {
        this.setState({ showDatePicker: false })
        if (!this.state.SelectedMaritalStatus) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose Marital Status',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.SelectedMotherTongue) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose Mother Tongue',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.selectedNationality) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose Nationality',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.Religion) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose your Religion',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.Caste) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose your Caste',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (this.state.locationName == "Location") {
            ToastAndroid.showWithGravityAndOffset(
                'Please Select Location',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            this.setState({ isFormSubmitting: true })
            let reqObj = {
                marital_status: this.state.SelectedMaritalStatus.id,
                mother_tongue: this.state.SelectedMotherTongue.id,
                nationality: this.state.selectedNationality.id,
                location: typeof (this.state.locationName) == 'string' && this.state.locationName ? this.state.locationName : this.state.locationName.city_id,
                religion: this.state.Religion.religion_id,
                caste: this.state.Caste.id,
                residency_status: this.state.selectedResidencyStatus.id,
                is_current_location: this.state.isCurrentLocation ? 1 : '',
                loc_latitude: this.state.Latitude,
                loc_longitude: this.state.Longitude,
            }



            console.log(JSON.stringify(reqObj))
            await EditProfileSignupDetails(reqObj, this.state.access_token).then(res => {
                this.setState({ showBsicDetailsModal: false, isFormSubmitting: false })
                let response = res;
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                GetMemberDetail(this.state.userData.member_id, this.state.access_token)
                    .then((res) => {
                        let response = res;
                        this.setState({
                            userData: response.data.data,
                            FewWordsAbout: response.data.data.few_words_about_me,
                        })
                    }).catch(err => {
                        console.log(err)
                        this.setState({ isFormSubmitting: false })
                    })

            })
                .catch(err => {
                    let error = err
                    console.log("fhfghfghhhfhfhfhgfhh")
                    console.log(JSON.stringify(error))
                    this.setState({ isFormSubmitting: false })
                    ToastAndroid.showWithGravityAndOffset(
                        'Unable to complete request.',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                })
        }
    }

    onMatchingStarSelectUnselect(el, index) {
        let starList = [...this.state.starlist]
        starList[index].isChecked = !starList[index].isChecked

        this.setState({ starList: starList })
    }

    OnSaveMatchingStarsPress() {
        let matchingStars = this.state.starlist.filter((el, i) => el.isChecked)
        console.log(matchingStars)
        this.setState({ selectedMatchingStars: matchingStars, showMatchingStarsModal: false })
    }

    async onAstroDetailsSubmit() {
        console.log(typeof (this.state.TimeOfBirth))
        this.setState({ showTimePicker: false })
        let reqObj = {
            time_of_birth: typeof (this.state.TimeOfBirth) == 'object' ? this.state.TimeOfBirth.toLocaleTimeString('en-US') : this.state.TimeOfBirth,
            birth_star: this.state.selectedStar.id,
            city_of_birth: this.state.CityOfBirth.city_id,
            chovva_dosham: this.state.IsChovvaDosham ? 'Yes' : 'No',
            shudha_jathakam: this.state.IsSudhaJathakam ? 'Yes' : 'No',
            sun_sign: this.state.selectedSunSign.name,
            astro_stars: this.state.selectedMatchingStars !== null ? this.state.selectedMatchingStars.map((el, i) => { return parseInt(el.id) }) : null
        }

        console.log(reqObj.astro_stars)
        if (!this.state.TimeOfBirth) {
            ToastAndroid.showWithGravityAndOffset(
                'Select Time Of Birth.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.selectedStar) {
            ToastAndroid.showWithGravityAndOffset(
                'Choose Birth Star.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.CityOfBirth) {
            ToastAndroid.showWithGravityAndOffset(
                'Enter City Of Birth.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.selectedSunSign) {
            ToastAndroid.showWithGravityAndOffset(
                'Choose sun sign.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (this.state.selectedMatchingStars == null) {
            ToastAndroid.showWithGravityAndOffset(
                'Choose Matching Stars.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.selectedSunSign) {
            ToastAndroid.showWithGravityAndOffset(
                'Choose sun sign.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            this.setState({ isFormSubmitting: true })
            await UpdateAstroDetails(reqObj, this.state.access_token).then(res => {
                let response = res;
                GetAstroDetail(this.state.userData.member_id, this.state.access_token).then((res) => {
                    this.setState({ starsDetails: false, isFormSubmitting: false })
                    let response = res;
                    this.setState({ AstroDetailsArr: response.data.data, CityOfBirth: response.data.data.city_of_birth, TimeOfBirth: response.data.data.time_of_birth })
                    console.log(response.data.data)
                    ToastAndroid.showWithGravityAndOffset(
                        'Astro Details Successfully Updated.',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                })
                    .catch(err => { console.log(err) })
                this.setState({ isFormSubmitting: false })
                GetMemberDetail("", this.state.access_token)
                    .then((res) => {
                        let response = res;
                        console.log(this.state.access_token)
                        this.setState({
                            userData: response.data.data,
                        })
                    }).catch(err => {
                        console.log(err)
                    })
            })
                .catch(err => {
                    let error = err
                    console.log("produced an error---------------")
                    console.log(error)
                    this.setState({ starsDetails: false, isFormSubmitting: false })
                })
        }
    }

    EditProfilePhysicalDetails = () => {
        if (!this.state.Height) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose your Height',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.Weight) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose your Weight',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }

        else if (!this.state.selectedDisablities && this.state.showDisabilityOption) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose your Physical Disability',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }

        else {
            this.setState({ isFormSubmitting: true })
            let Obj = {
                Height: this.state.Height,
                Weight: this.state.Weight,
                Complexion: this.state.selectedComplexion,
                BloodGroup: this.state.selectedBlood,
                BodyType: this.state.selectedBody,
                PhysicalDisability: this.state.selectedDisablities,
                HealthConditions: this.state.HealthConditions,
            }
            EditPhysicalAttributeDetails(Obj, this.state.access_token).then(async (res) => {
                this.setState({ canclepop: false })
                let response = res;
                console.log(response.data)
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                await GetMemberDetail(this.state.userData.member_id, this.state.access_token)
                    .then((res) => {
                        let response = res;
                        console.log(this.state.access_token)
                        let selectedHeight = this.state.HeightArr.filter(item => item.name === response.data.data.height)
                        let selectedComplexion = this.state.complexionArr.filter(item => item.name === response.data.data.complexion)
                        let selectedBlood = this.state.BloodArr.filter(item => item.name === response.data.data.blood_group)
                        let selectedBody = this.state.BodyArr.filter(item => item.name === response.data.data.body_type)
                        let selectedDisablities = this.state.DisabilitesArr.filter(item => item.name === response.data.data.physical_disability)

                        this.setState({
                            isFormSubmitting: false,
                            userData: response.data.data,
                            FewWordsAbout: response.data.data.few_words_about_me,
                            name: response.data.data.first_name,
                            Mobile: response.data.data.mobile,
                            email: response.data.data.email,
                            selectDate: response.data.data.date_of_birth,
                            Religion: response.data.data.religion,
                            Caste: response.data.data.caste,
                            Weight: response.data.data.weight ? { id: response.data.data.weight, name: response.data.data.weight + " kg" } : "",
                            Height: selectedHeight !== null ? selectedHeight[0] : "",
                            selectedComplexion: selectedComplexion !== null ? selectedComplexion[0] : "",
                            selectedBlood: selectedBlood !== null ? selectedBlood[0] : "",
                            selectedBody: selectedBody !== null ? selectedBody[0] : "",
                            selectedDisablities: selectedDisablities !== null ? selectedDisablities[0] : ""

                        })
                    }).catch(err => {
                        console.log(err)
                    })
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                this.setState({ canclepop: false, isFormSubmitting: false });

            })
                .catch(err => {
                    let error = err
                    console.log(JSON.stringify(error))
                    this.setState({ isFormSubmitting: false })
                })
        }

    }

    onHeightChange(item) {
        this.setState({ Height: item })
    }

    onWeightChange(item) {
        this.setState({ Weight: item })
    }

    onComplexionChange(item) {
        this.setState({ selectedComplexion: item })
    }

    onMotherTongueChange(item) {
        this.setState({ SelectedMotherTongue: item })
    }

    onBloodGroupChange(item) {
        this.setState({ selectedBlood: item })
    }

    onBodyTypeChange(item) {
        this.setState({ selectedBody: item })
    }

    onDisabilityChange(item) {
        this.setState({ selectedDisablities: item })
    }

    onBirthStarChange(item) {
        this.setState({ showTiemPicker: false, selectedStar: item })
    }

    onSunSignChange(item) {
        this.setState({ showTiemPicker: false, selectedSunSign: item })
    }

    LifeStyleDetail = () => {
        if (!this.state.SelectedDiet) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Select your Diet',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.Drinklisting) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Select your Drinking',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.Smokelisting) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Select your Smoking',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            this.setState({ isFormSubmitting: true })
            let AsObj = {
                Diet: this.state.SelectedDiet,
                Drink: this.state.Drinklisting,
                Smoke: this.state.Smokelisting,
            }
            UpdateLifeStyleDetails(AsObj, this.state.access_token).then(res => {
                this.setState({ lifestylepop: false })
                let response = res
                console.log(response.data)
                if (response.data.status) {

                    GetMemberDetail(this.state.userData.member_id, this.state.access_token)
                        .then((res) => {
                            this.setState({ isFormSubmitting: false })
                            let response = res;
                            console.log(response.data.data)
                            console.log(this.state.access_token)
                            this.setState({
                                userData: response.data.data,
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    ToastAndroid.showWithGravityAndOffset(
                        'Data Saved.',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    this.setState({ isFormSubmitting: false })
                }
                else {
                    console.log(response.data)
                    this.setState({ isFormSubmitting: false })
                }

            })
                .catch(err => {
                    let error = err
                    console.log(error)
                    this.setState({ isFormSubmitting: false })
                })
        }

    }

    onCasteChange = (item) => {
        this.setState({ showDatePicker: false, Caste: item })
        console.log(item)

    }

    onSubCasteChange = (item) => {
        this.setState({ SubCaste: item })
    }

    onpickerChange = (event, selectDate) => {
        let selectDateReadable = selectDate.getDate() + '/' + (selectDate.getMonth() + 1) + '/' + selectDate.getFullYear()
        this.setState({ selectDate: selectDateReadable, showDatePicker: false, date: selectDate })
    };

    showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    showDatePicker = () => {
        this.setState({ showDatePicker: true })
    };

    onNationalityChange(item) {
        this.setState({ selectedNationality: item })
    }

    onIncomeChange(item) {
        this.setState({ Income: item })
    }

    onMartialChange(item) {
        this.setState({ SelectedMaritalStatus: item })
    }

    onChildrenCountChange(item) {
        this.setState({ ChildrenCount: item })
    }

    onLanguageChange(item) {
        this.setState({ language: item })
    }

    onEducationChange(item) {
        this.setState({ SelectEducationLevel: item })
    }

    onFamilyStatusChange(item) {
        this.setState({ selectedFamilyStatus: item })
    }

    onFamilyValueChange(item) {
        this.setState({ selectedFamilyValue: item })
    }

    addHobbiesAndInterest = () => {
        let HobbiesAndInterestArr = [...this.state.HobbiesArr];
        let InterestObj = {
            title: this.state.HobbyAndInterestName,
            progressValue: this.state.HobbyAndInterestProgressValue
        };

        if (this.state.HobbyAndInterestName == "") {
            return false
        }
        else {
            HobbiesAndInterestArr.push(InterestObj);
            this.setState({ HobbiesArr: HobbiesAndInterestArr, HobbyAndInterestName: "" })
        }
    }

    OnKnowMeBetterDataChange(el, i, text) {

        let LocalCloneOfKnowMeBetterData = [...this.state.CloneOfKnowMeBetterData]
        LocalCloneOfKnowMeBetterData[i].answer = text
        this.setState({ CloneOfKnowMeBetterData: LocalCloneOfKnowMeBetterData })
    }

    async onKnowMeBetterSubmit() {
        this.setState({ isFormSubmitting: true })
        await UpdateKnowMeBetter(this.state.KnowMeBetterArr, this.state.access_token).then(res => {
            this.setState({ ShowKnowMeBetterModal: false })
            let response = res;
            if (response.data.status) {
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                this.setState({ isFormSubmitting: false })
                this.KnowMeBetterCall()
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    'Please try again later',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                this.setState({ isFormSubmitting: false })
            }
        })
            .catch(err => {
                let error = err;
                console.log(error)
                this.setState({ isFormSubmitting: false })
            })
    }

    OnFamilyDetailsChange(el, text) {

        // console.log(text)
        let LocalFamilyDataToUpdate = [...this.state.FamilyDataEditedArr]
        if (el == "member_type") {
            LocalFamilyDataToUpdate[0].member_type = text
        }
        else if (el == "name") {
            LocalFamilyDataToUpdate[0].name = text
        }
        else if (el == "working_in") {
            LocalFamilyDataToUpdate[0].working_in = text
        }
        else if (el == "designation") {
            LocalFamilyDataToUpdate[0].designation = text
        }
        else if (el == "work_status") {
            LocalFamilyDataToUpdate[0].work_status = text
        }

    }

    async SaveFamilyStatusAndValue() {
        if (!this.state.selectedFamilyStatus) {
            ToastAndroid.showWithGravityAndOffset(
                "Choose Family Status",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.selectedFamilyValue) {
            ToastAndroid.showWithGravityAndOffset(
                "Enter Family Values",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            this.setState({ isFormSubmitting: true })
            updateFamilyStatusValue({ family_status: this.state.selectedFamilyStatus.id, family_value: this.state.selectedFamilyValue.id }, this.state.access_token).then(res => {
                let response = res;
                console.log(response.data)
                this.setState({ ShowFamilyStatusAndValueEditableModal: false, isFormSubmitting: false })
                GetFamilyDetailsOfMember(this.state.access_token, this.state.userData.member_id).then(res => {
                    let response = res;
                    this.setState({ isFormSubmitting: false })
                    if (response.data.status) {
                        let selectedFamilyStatus = this.state.FamilyStatusArr.filter(item => item.name == response.data.data.family_status)
                        let selectedFamilyValue = this.state.FamilyValueArr.filter(item => item.name == response.data.data.family_value)
                        this.setState({ FamilyDataArr: response.data.data, selectedFamilyValue: selectedFamilyValue ? selectedFamilyValue[0] : "", selectedFamilyStatus: selectedFamilyStatus ? selectedFamilyStatus[0] : "" })
                        this.setState({ FamilyDataEditedArr: response.data.data })
                        console.log(selectedFamilyStatus, "selectedFamilyStatus")
                    }
                    else {
                        ToastAndroid.showWithGravityAndOffset(
                            'Unable to fetch family info',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                }).catch(err => {
                    let error = err
                    console.log(error)
                    this.setState({ isFormSubmitting: false })
                })
            })
        }
    }

    async SaveFamilyDetails() {
        {
            this.setState({ isFormSubmitting: true })
            console.log(this.state.FamilyDataEditedArr, "this.state.FamilyDataEditedArr____---------------------")
            UpdateFamilyDetails([this.state.FamilyDataEditedArr], this.state.access_token).then(res => {
                this.setState({ ShowFamilyDetailsEditableModal: false, ShowExistingFamilyMemberEditableModal: false, isFormSubmitting: false })
                let response = res;
                console.log(response.data)
                GetFamilyDetailsOfMember(this.state.access_token, this.state.userData.member_id).then(res => {
                    let response = res;
                    console.log(response.data)
                    this.setState({ isFormSubmitting: false })
                    if (response.data.status) {
                        this.setState({ FamilyDataArr: response.data.data, selectedFamilyValue: response.data.data.family_value, selectedFamilyStatus: response.data.data.family_status })
                    }
                    else {
                        ToastAndroid.showWithGravityAndOffset(
                            'Unable to fetch family info',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                }).catch(err => {
                    let error = err
                    console.log(error)
                    this.setState({ isFormSubmitting: false })
                })
                ToastAndroid.showWithGravityAndOffset(
                    "Updated Successfully",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

                this.setState({ FamilyDataEditedArr: [{ name: "", member_type: "", working_in: "", designation: "", work_status: "" }] })
            })
                .catch(err => {
                    let error = err;
                    console.log(error);
                    ToastAndroid.showWithGravityAndOffset(
                        "Failed to update.",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    this.setState({ isFormSubmitting: false })
                })
        }

    }

    async SaveEducationDetails() {
        try {
            if (this.state.SelectedEducationLevel == "Education Level") {
                ToastAndroid.showWithGravityAndOffset(
                    "Please Choose Education Level.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else if (this.state.SelectedFieldOfStudy == "Field Of Study" && this.state.SelectedEducationLevel != 117 && this.state.SelectedEducationLevel != 118) {
                ToastAndroid.showWithGravityAndOffset(
                    "Please Choose Field Of Study.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else if (!this.state.SelectedCourse && this.state.SelectedEducationLevel != 117 && this.state.SelectedEducationLevel != 118) {
                ToastAndroid.showWithGravityAndOffset(
                    "Please Select Course Name.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else if (!this.state.selectedCollege && this.state.SelectedEducationLevel != 117 && this.state.SelectedEducationLevel != 118) {
                ToastAndroid.showWithGravityAndOffset(
                    "Please Enter College Name.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else if (!this.state.PassingYear && this.state.SelectedEducationLevel != 117 && this.state.SelectedEducationLevel != 118) {
                ToastAndroid.showWithGravityAndOffset(
                    "Please Choose Passing Year.",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else {
                this.setState({ isFormSubmitting: true })
                let reqObj = {
                    education_level: this.state.SelectedEducationLevel,
                    field_of_study: this.state.SelectedFieldOfStudy,
                    course_name: this.state.SelectedCourse,
                    passing_year: this.state.PassingYear,
                    college: this.state.selectedCollege
                }

                UpdateEducation(this.state.access_token, reqObj)
                    .then(res => {
                        this.setState({ showUpdateEducationModal: false, isFormSubmitting: false })
                        let response = res;
                        console.log(response.data)
                        ToastAndroid.showWithGravityAndOffset(
                            "Education details submitted.",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                        EducationDetailsOfLoggedInUser(this.state.userData.member_id, this.state.access_token).then(res => {
                            let responseEdu = res;
                            this.setState({ MemberEducationDataArr: responseEdu.data.data })
                        })
                            .catch(err => {
                                let error = err;
                                console.log(JSON.stringify(error))
                            })
                    })
                    .catch((err) => {
                        let error = err;
                        this.setState({ isFormSubmitting: false })
                    })
            }
        }
        catch {

        }
    }

    async SingleFilePicker() {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
            maxWidth: deviceDimesions.width * 0.9,
            maxHeight: deviceDimesions.Height * 0.9,
        };

        ImagePicker.showImagePicker(options, (responseImg) => {
            if (responseImg.didCancel) {
            } else if (responseImg.error) {
            } else {
                this.setState({
                    singleFileOBJ: responseImg,
                });

                UploadHoroscope(responseImg)
                    .then(res => {
                        let response = res
                        if (response.status) {
                            ToastAndroid.showWithGravityAndOffset(
                                response.message,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                            );

                            this.setState({ isHoroscopeUploaded: true })
                        }
                        else {
                            ToastAndroid.showWithGravityAndOffset(
                                response.data.error,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                            );
                            this.setState({ isHoroscopeUploaded: false })
                        }
                    })
                    .catch(err => {
                        let error = err
                        console.log(error + "Failed")
                        this.setState({ isHoroscopeUploaded: false })
                    })

            }
        });
    }

    UploadHoroscopeFunction(horoscope) {
        UploadHoroscope(this.state.access_token, horoscope)
            .then(res => {
                let response = res
                if (response.status) {
                    GetMemberDetail(this.state.userData.member_id, this.state.access_token)
                        .then((res) => {
                            let response = res;
                            console.log(response.data.data)
                            console.log(this.state.access_token)
                            this.setState({
                                userData: response.data.data,
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    ToastAndroid.showWithGravityAndOffset(
                        "Horoscope Uploaded Successfully.",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
                else {
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.error,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
            })
            .catch(err => {
                let error = err

            })
    }

    async ImageCapture() {
        this.setState({ showTiemPicker: false, showCustomImagePicker: false, isFormSubmitting: true })
        ImagePicker.openCamera({
        }).then(image => {
            this.setState({
                singleFileOBJ: {
                    uri: image.path, width: image.width, height: image.height, mime: image.mime
                },
            });
            this.UploadHoroscopeFunction(image)
            setTimeout(() => {
                this.setState({ isFormSubmitting: false })
            }, 800);
        })
            .catch(image => {
                console.log(image);
                this.setState({ isFormSubmitting: false })
            });
    }

    async ImagePick() {
        this.setState({ showTiemPicker: false, showCustomImagePicker: false, isFormSubmitting: true })
        ImagePicker.openPicker({
        }).then(image => {
            this.setState({
                singleFileOBJ: {
                    uri: image.path, width: image.width, height: image.height, mime: image.mime
                },
            });
            this.UploadHoroscopeFunction(image)
            setTimeout(() => {
                this.setState({ isFormSubmitting: false })
            }, 800);
        })
            .catch(image => {
                this.setState({ isFormSubmitting: false })
            });
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
    async onCityOfBirthChange(text) {
        console.log("Like", text)
        if (text == '') {
            ToastAndroid.showWithGravityAndOffset(
                "Please Enter City Of Birth.",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            this.setState({ CityOfBirth: text })
            GetLocationOptions(text).then(res => {
                let response = res;
                this.setState({ LocationData: response.data.data })
            })
                .catch(err => { let error = err; console.log(error) })
        }
    }

    _renderCityOptions(el) {
        return (
            <Pressable key={el.id} style={{ width: deviceDimesions.width * 0.8, paddingVertical: deviceDimesions.Height * 0.02, paddingHorizontal: deviceDimesions.width * 0.02, backgroundColor: '#fff' }} onPress={() => { console.log(el, "----------------------------location"); this.setState({ CityOfBirth: el.item, LocationData: '', showCityOfBirthModal: false }) }}>
                <Text>{el.item.name}</Text>
            </Pressable>
        )
    }

    _renderLocationOptions(el) {
        // console.log(el)
        return (
            <Pressable style={{ width: deviceDimesions.width * 0.8, paddingVertical: deviceDimesions.Height * 0.02, paddingHorizontal: deviceDimesions.width * 0.02, backgroundColor: '#fff' }} onPress={() => this.setState({ locationName: el.item, LocationData: '', showLocationModal: false, isCurrentLocation: false, })}>
                <Text>{el.item.name}</Text>
            </Pressable>
        )
    }

    onDateChange = (event, selectedDate) => {
        let selectedDateReadable = selectedDate.getDate().toString().padStart(2, 0) + '-' + (selectedDate.getMonth() + 1).toString().padStart(2, 0) + '-' + selectedDate.getFullYear()
        this.setState({ showDatePicker: false, selectDate: selectedDateReadable, date: selectedDate })
        // console.log(this.state.date)
    };

    globalStateUpdate(name, value) {
        this.setState({ [name]: value })
    }

    OnHobbiesElementChange = (i, stateName) => {

        if (stateName == "AllHobbiesParamsArr") {
            let DataArrclone = [...this.state.AllHobbiesParamsArr]
            DataArrclone[i].isChecked = !DataArrclone[i].isChecked
            this.setState({ AllHobbiesParamsArr: DataArrclone })
        }
        else if (stateName == "AllInterestParamsArr") {
            let DataArrclone = [...this.state.AllInterestParamsArr]
            DataArrclone[i].isChecked = !DataArrclone[i].isChecked
            this.setState({ AllInterestParamsArr: DataArrclone })
        }
        else if (stateName == "AllMovieParamsArr") {
            let DataArrclone = [...this.state.AllMovieParamsArr]
            DataArrclone[i].isChecked = !DataArrclone[i].isChecked
            this.setState({ AllMovieParamsArr: DataArrclone })
        }
        else if (stateName == "AllBooksParamsArr") {
            let DataArrclone = [...this.state.AllBooksParamsArr]
            DataArrclone[i].isChecked = !DataArrclone[i].isChecked
            this.setState({ AllBooksParamsArr: DataArrclone })
        }
        else if (stateName == "AllMusicParamsArr") {
            let DataArrclone = [...this.state.AllMusicParamsArr]
            DataArrclone[i].isChecked = !DataArrclone[i].isChecked
            this.setState({ AllMusicParamsArr: DataArrclone })
        }
        else if (stateName == "AllDressParamsArr") {
            let DataArrclone = [...this.state.AllDressParamsArr]
            DataArrclone[i].isChecked = !DataArrclone[i].isChecked
            this.setState({ AllDressParamsArr: DataArrclone })
        }
        else if (stateName == "AllSportsParamsArr") {
            let DataArrclone = [...this.state.AllSportsParamsArr]
            DataArrclone[i].isChecked = !DataArrclone[i].isChecked
            this.setState({ AllSportsParamsArr: DataArrclone })
        }
        else if (stateName == "AllCuisineParamsArr") {
            let DataArrclone = [...this.state.AllCuisineParamsArr]
            DataArrclone[i].isChecked = !DataArrclone[i].isChecked
            this.setState({ AllCuisineParamsArr: DataArrclone })
        }
    }

    SaveHobbiesAndInterest() {
        this.setState({ isFormSubmitting: true })

        let reqJson = {
            hobby: this.state.AllHobbiesParamsArr.filter((el, i) => el.isChecked).map((el, i) => { return el.id }),
            interest: this.state.AllInterestParamsArr.filter((el, i) => el.isChecked).map((el, i) => { return el.id }),
            music: this.state.AllMusicParamsArr.filter((el, i) => el.isChecked).map((el, i) => { return el.id }),
            books: this.state.AllBooksParamsArr.filter((el, i) => el.isChecked).map((el, i) => { return el.id }),
            movie: this.state.AllMovieParamsArr.filter((el, i) => el.isChecked).map((el, i) => { return el.id }),
            sports: this.state.AllSportsParamsArr.filter((el, i) => el.isChecked).map((el, i) => { return el.id }),
            cuisine: this.state.AllCuisineParamsArr.filter((el, i) => el.isChecked).map((el, i) => { return el.id }),
            dress: this.state.AllDressParamsArr.filter((el, i) => el.isChecked).map((el, i) => { return el.id })
        }

        UpdateHobbiesAndInterest(reqJson, this.state.access_token).then(res => {
            let response = res;
            GetUserHobbiesAndInterests(this.state.access_token).then(res => {
                let response = res;
                this.setState({ isFormSubmitting: false, showUpdateHobbiesAndInterestModal: false, UserHobbiesAndInterests: response.data.data })
            }).catch(err => {
                console.log(err)
            })
            if (response.data.status) {
                ToastAndroid.showWithGravityAndOffset(
                    "Updated Successfully.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else {
                ToastAndroid.showWithGravityAndOffset(
                    "Please try again.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        })
    }

    render() {
        const customStyles = {
            stepIndicatorSize: deviceDimesions.width * 0.1,
            currentStepIndicatorSize: deviceDimesions.width * 0.1,
            separatorStrokeWidth: 2,
            currentStepStrokeWidth: 3,
            stepStrokeCurrentColor: 'orange',
            stepStrokeWidth: 3,
            stepStrokeFinishedColor: 'orange',
            stepStrokeUnFinishedColor: 'orange',
            separatorFinishedColor: '#e6e6e6',
            separatorUnFinishedColor: '#e6e6e6',
            stepIndicatorFinishedColor: '#ffffff',
            stepIndicatorUnFinishedColor: '#ffffff',
            stepIndicatorCurrentColor: '#ffffff',
            stepIndicatorLabelFontSize: 13,
            currentStepIndicatorLabelFontSize: 13,
            stepIndicatorLabelCurrentColor: 'orange',
            stepIndicatorLabelFinishedColor: 'orange',
            stepIndicatorLabelUnFinishedColor: 'orange',
            labelColor: 'orange',
            labelSize: 13,
            currentStepLabelColor: 'orange'
        }

        // Education Step Indicator
        const renderStepIndicator = (el, i) => {
            return <Text style={{ color: 'orange', fontSize: 8 }}>{this.state.MemberEducationDataArr ? this.state.MemberEducationDataArr[el.position].till_year : "null"}</Text>
        };

        // Education step Lable
        const renderStepLabel = (el, i) => {
            return <View style={{ width: deviceDimesions.width * 0.7, marginLeft: deviceDimesions.width * 0.05, flexDirection: "row", justifyContent: "space-around" }}>
                <Text style={{ width: deviceDimesions.width * 0.55 }}>{el.label.course_name} from {el.label.college}</Text>
            </View>
        }

        // Career Step Indicator
        const renderCareerStepIndicator = (el, i) => {
            // console.log(el);
            return <Icon name="briefcase" color="orange" size={16} />
        };

        // Career Step Label
        const renderCareerStepLabel = (el, i) => {
            return <View style={{ width: deviceDimesions.width * 0.7, marginLeft: deviceDimesions.width * 0.05, flexDirection: "row", justifyContent: "space-around" }}>
                <Text style={{ width: deviceDimesions.width * 0.55 }}> {el.label.currently_working == 1 ? "Working" : "Worked"}  as {el.label.working_as} in {el.label.working_in}</Text>
            </View>
        }
        const { onBackButtonPress } = this.props
        return (
            <View style={styles.container}>
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />
                <View style={{ width: deviceDimesions.width * 0.95, alignSelf: "center", alignItems: "center", flexDirection: "row", padding: 10 }}>
                    <TouchableOpacity onPressIn={() => onBackButtonPress()} style={{}}>
                        <Icon name="chevron-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginLeft: deviceDimesions.width * 0.05 }}>EDIT PROFILE</Text>
                </View>

                {this.state.isScreenLoading ?
                    <View pointerEvents="none" style={{ alignSelf: 'center', height: deviceDimesions.Height, marginTop: -deviceDimesions.Height * 0.15, width: deviceDimesions.width, justifyContent: 'center' }}>
                        <PulseLoader
                            borderColor="#ff751a"
                            size={deviceDimesions.width * 0.5}
                            avatarBackgroundColor="#ffffff"
                            avatar={BaseURL.DemoURL + this.state.userData.profile_image}
                            pressInValue={0.6}
                        />
                    </View>

                    :
                    <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" keyboardDismissMode='on-drag' contentContainerStyle={{ paddingBottom: this.state.isScreenLoading ? 0 : deviceDimesions.Height * 0.11 }} ref={(c) => { this.scroll = c }}>
                        {/* Header Card */}
                        {this.state.isScreenLoading ?
                            <View style={{ alignSelf: 'center', width: deviceDimesions.width }}>

                                <PulseLoader
                                    borderColor="#ff751a"
                                    size={deviceDimesions.width * 0.5}
                                    avatarBackgroundColor="#ffffff"
                                    avatar={BaseURL.DemoURL + this.state.userData.profile_image}
                                    pressInValue={0.6}

                                />
                            </View>
                            :
                            <View>
                                <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }}>
                                    <NeuView
                                        color="#ffffff"
                                        borderRadius={10}
                                        width={deviceDimesions.width * 0.9}
                                        height={deviceDimesions.Height * 0.25}
                                        containerStyle={{
                                            alignItems: "flex-start",
                                            padding: 10
                                        }}
                                    >
                                        <View style={{ flexDirection: "row", height: deviceDimesions.Height * 0.05 }}>
                                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }} onPress={() => goToManageVideoScreen()}>
                                                <NeuView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.09}
                                                    height={deviceDimesions.Height * 0.05}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="video" />
                                                </NeuView>

                                                <Text style={{ marginLeft: deviceDimesions.width * 0.02 }}>Add Video</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginLeft: deviceDimesions.width * 0.05 }} onPress={() => goToManagePhotoScreen()}>
                                                <NeuView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.09}
                                                    height={deviceDimesions.Height * 0.05}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="image" />
                                                </NeuView>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.02 }}>Add Photo</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", alignSelf: "center", height: deviceDimesions.Height * 0.15, width: deviceDimesions.width * 0.9, marginTop: deviceDimesions.Height * 0.03 }}>
                                            <View style={{ flexDirection: "row", alignItems: "baseline", marginLeft: 5 }}>
                                                <ProgressCircle
                                                    percent={this.state.userData ? Number(this.state.userData.profile_completion.split("%")[0]) : 0}
                                                    radius={50}
                                                    borderWidth={6}
                                                    shadowColor="#e6e6e6"
                                                    color="#ff6f00"
                                                    bgColor="#fff"
                                                >

                                                    <Image
                                                        source={this.state.userData ? { uri: BaseURL.DemoURL + this.state.userData.profile_image } : ImagesPathVariable.DummyUserSmall}
                                                        style={this.state.userData ? { height: deviceDimesions.Height * 0.14, width: deviceDimesions.width * 0.24, borderRadius: 50 } : { borderRadius: 50 }}
                                                    />
                                                </ProgressCircle>
                                                <View style={styles.profilePicturePercentContainer}>
                                                    <Text style={styles.profilePicturePercentText}>{this.state.userData ? this.state.userData.profile_completion : ''}</Text>
                                                </View>
                                            </View>


                                            <View style={{ alignItems: "center" }}>
                                                <NeuButton
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.09}
                                                    height={deviceDimesions.Height * 0.05}
                                                    borderRadius={20}
                                                    onPress={() => { this.scroll.scrollTo({ y: 200, animated: true }) }}
                                                >
                                                    <Image source={IconsPathVariable.EditContact} style={{ height: 25, width: 25 }} />
                                                </NeuButton>
                                                <Text style={{ marginTop: deviceDimesions.Height * 0.01, fontSize: 11, fontWeight: "700", textAlign: "center" }}>Edit Contact</Text>

                                            </View>
                                            {this.state.userData.religion == "Hindu" ?
                                                <View style={{ alignItems: "center" }}>
                                                    <NeuButton
                                                        color="#ffffff"
                                                        width={deviceDimesions.width * 0.09}
                                                        height={deviceDimesions.Height * 0.05}
                                                        borderRadius={20}
                                                        onPress={() => { this.scroll.scrollTo({ y: 4300, animated: true }) }}
                                                    >
                                                        <Image source={IconsPathVariable.Horoscope} style={{ height: 25, width: 25 }} />

                                                    </NeuButton>
                                                    <Text style={{ marginTop: deviceDimesions.Height * 0.01, fontSize: 11, fontWeight: "700", textAlign: "center" }}>Manage Horoscope</Text>
                                                </View> : null}
                                        </View>
                                    </NeuView>
                                </View>
                                <View style={{ marginTop: deviceDimesions.Height * 0.03, width: deviceDimesions.width, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', alignSelf: 'center' }}>
                                    <TouchableOpacity
                                        style={{ width: deviceDimesions.width * 0.26, alignItems: 'center', paddingVertical: 7, backgroundColor: 'orange', borderRadius: 5, elevation: 5 }}
                                        onPress={() => { this.scroll.scrollToEnd({ animated: true }) }}
                                    >
                                        <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffff' }}>Hobbies & Interests</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: deviceDimesions.width * 0.26, alignItems: 'center', paddingVertical: 7, backgroundColor: 'orange', borderRadius: 5, elevation: 5 }}
                                        onPress={() => this.scroll.scrollTo({ y: 1650, animated: true })}
                                    >
                                        <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffff' }}>Know Me Better</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: deviceDimesions.width * 0.26, alignItems: 'center', paddingVertical: 7, backgroundColor: 'orange', borderRadius: 5, elevation: 5 }}
                                        onPress={() => goToTrustBadgesSliderScreen()}
                                    >
                                        <Text style={{ fontSize: 10, fontWeight: '700', color: '#ffffff' }}>Trust badges</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* Few Words About me */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.02 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon name="pencil-alt" />
                                            <Text style={{ fontSize: 18, fontWeight: "700" }}> A few words about me</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <NeuButton
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.09}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => { this.HandleFewWordsUpdate(this.state.FewWordsAbout); this.setState({ fewWordsAboutMeEditable: false }) }}
                                            >
                                                <Icon name={!this.state.fewWordsAboutMeEditable ? "pencil-alt" : "check"} color={!this.state.fewWordsAboutMeEditable ? "#f86728" : "#00b300"} />
                                            </NeuButton>
                                        </View>
                                    </View>
                                    <View style={{ alignSelf: "center" }}>
                                        <NeuBorderView
                                            color="#ffffff"
                                            borderRadius={10}
                                            height={deviceDimesions.Height * 0.12}
                                            width={deviceDimesions.width * 0.9}
                                            containerStyle={{
                                                alignItems: "flex-start",
                                                justifyContent: "flex-start",
                                                padding: 5
                                            }}
                                        >
                                            <TextInput
                                                caretHidden={this.state.fewWordsAboutMeEditable ? true : false}
                                                onFocus={() => this.setState({ fewWordsAboutMeEditable: true }, () => console.log("Focused"))}
                                                onBlur={() => this.setState({ fewWordsAboutMeEditable: false }, () => this.setState({ fewWordsAboutMeEditable: false }))}
                                                focusable={this.state.fewWordsAboutMeEditable}
                                                maxLength={300}
                                                placeholder="Your message here..."
                                                value={this.state.FewWordsAbout}
                                                multiline
                                                onChangeText={(Text) => { this.setState({ FewWordsAbout: Text }) }}
                                                style={{
                                                    height: deviceDimesions.Height * 0.1, width: deviceDimesions.width * 0.85, textAlignVertical: "top"
                                                }}
                                            />
                                        </NeuBorderView>
                                    </View>
                                </View>
                                {/* Basic Details */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.02 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon name="file" />
                                            <Text style={{ fontSize: 18, fontWeight: "700" }}> Basic Details</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <NeuButton
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.09}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => this.setState({ showBsicDetailsModal: true })}

                                            >
                                                <Icon name="pencil-alt" color="#f86728" />
                                            </NeuButton>


                                            <Modal animationType="slide"
                                                transparent={true}
                                                visible={this.state.showBsicDetailsModal}
                                                onBackdropPress={() => this.setState({ showBsicDetailsModal: false })}
                                                onRequestClose={() => {
                                                    this.setState({ showBsicDetailsModal: false })
                                                }}
                                            >
                                                <View style={styles.centerView}>
                                                    <View style={styles.modelView}>
                                                        <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Basic Details</H3>
                                                        <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always" style={{ paddingBottom: deviceDimesions.Height * 0.2 }}>

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginTop: 10 }}>
                                                                <Text style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>Want to Update Email, Mobile Number or Name?</Text>
                                                                <TouchableOpacity
                                                                    onPress={() => Linking.openURL(`whatsapp://send?text=Hello, I'm ${this.state.userData.first_name + " "} and my happy weddings ID - ${this.state.userData.member_profile_id}. I want to change my personal details. &phone=+91 8943000723`)}
                                                                    style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                                                                >
                                                                    <Icon name="whatsapp" color="green" size={24} />
                                                                    <Text style={{ width: deviceDimesions.width * 0.6, alignSelf: 'center', color: "red", fontSize: 15 }}>Contact Us </Text>
                                                                </TouchableOpacity>
                                                            </View>

                                                            {/* Marital Status Change  */}
                                                            <View style={{ width: deviceDimesions.width * 0.7, fontWeight: "bold", alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Marital Status</Text>
                                                            </View>
                                                            <SignupDropDownFullWidthWithSearch
                                                                selectedPickerValue={this.state.SelectedMaritalStatus && typeof (this.state.SelectedMaritalStatus) == 'string' ? this.state.SelectedMaritalStatus : typeof (this.state.SelectedMaritalStatus) == 'object' && this.state.SelectedMaritalStatus !== null ? this.state.SelectedMaritalStatus.name : 'Marital Status'}
                                                                onChangeHandler={(index, item) => this.onMartialChange(item)}
                                                                staticLable={'Marital Status'}
                                                                itemSeparatorStyle
                                                                containerWidth={deviceDimesions.width * 0.7}
                                                                pickerWidth={deviceDimesions.width * 0.65}
                                                                pickerDataArr={this.state.MaritalArr}
                                                            />

                                                            {
                                                                this.state.SelectedMaritalStatus && this.state.SelectedMaritalStatus.name !== "Never Married" ?
                                                                    <>
                                                                        <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                            <Text>Children</Text>
                                                                        </View>
                                                                        <SignupDropDownFullWidthWithSearch
                                                                            selectedPickerValue={this.state.ChildrenCount !== 'Children' ? this.state.ChildrenCount.name : 'Children'}
                                                                            onChangeHandler={(index, item) => this.onChildrenCountChange(item)}
                                                                            staticLable="Children"
                                                                            itemSeparatorStyle
                                                                            containerWidth={deviceDimesions.width * 0.7}
                                                                            pickerWidth={deviceDimesions.width * 0.65}
                                                                            pickerDataArr={this.state.ChildrenCountArr}
                                                                        />
                                                                    </>
                                                                    :
                                                                    null
                                                            }
                                                            {/* Mother Tongue Change */}
                                                            <View style={{ width: deviceDimesions.width * 0.7, fontWeight: "bold", alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Mother Tongue</Text>
                                                            </View>
                                                            <SignupDropDownFullWidthWithSearch
                                                                selectedPickerValue={this.state.SelectedMotherTongue && typeof (this.state.SelectedMotherTongue) == 'string' ? this.state.SelectedMotherTongue : typeof (this.state.SelectedMotherTongue) == 'object' && this.state.SelectedMotherTongue !== null ? this.state.SelectedMotherTongue.name : 'Mother Tongue'}
                                                                onChangeHandler={(index, item) => this.onMotherTongueChange(item)}
                                                                staticLable={'Mother Tongue'}
                                                                containerWidth={deviceDimesions.width * 0.7}
                                                                pickerWidth={deviceDimesions.width * 0.65}
                                                                pickerDataArr={this.state.MotherTongueArr}
                                                            />

                                                            {/* Nationality Change */}
                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Nationality</Text>
                                                            </View>
                                                            <SignupDropDownFullWidthWithSearch
                                                                selectedPickerValue={this.state.selectedNationality && typeof (this.state.selectedNationality) == 'string' ? this.state.selectedNationality : typeof (this.state.selectedNationality) == 'object' && this.state.selectedNationality !== null ? this.state.selectedNationality.name : 'Nationality'}
                                                                onChangeHandler={(index, item) => this.onNationalityChange(item)}
                                                                staticLable={'Nationality'}
                                                                containerWidth={deviceDimesions.width * 0.7}
                                                                pickerWidth={deviceDimesions.width * 0.65}
                                                                pickerDataArr={this.state.NationalArr}
                                                            />

                                                            {/* Residency Status */}
                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Residency Status</Text>
                                                            </View>
                                                            <SignupDropDownFullWidthWithSearch
                                                                selectedPickerValue={this.state.selectedResidencyStatus && typeof (this.state.selectedResidencyStatus) == 'string' ? this.state.selectedResidencyStatus : typeof (this.state.selectedResidencyStatus) == 'object' && this.state.selectedResidencyStatus !== null ? this.state.selectedResidencyStatus.name : 'Residency Status'}
                                                                onChangeHandler={(index, item) => this.setState({ selectedResidencyStatus: item })}
                                                                staticLable={'Residency Status'}
                                                                itemSeparatorStyle
                                                                containerWidth={deviceDimesions.width * 0.7}
                                                                pickerWidth={deviceDimesions.width * 0.65}
                                                                pickerDataArr={[
                                                                    { id: 156, name: "Citizen" },
                                                                    { id: 157, name: "Permanent Resident" },
                                                                    { id: 158, name: "Student Visa" },
                                                                    { id: 159, name: "Temporary Visa" },
                                                                    { id: 160, name: "Work Permit" },
                                                                ]}
                                                            />


                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Location</Text>
                                                            </View>
                                                            <View style={{ marginTop: deviceDimesions.Height * 0.05, alignItems: 'center' }}>
                                                                <TouchableOpacity style={{ padding: 5 }} onPress={() => this.setState({ showDatePicker: false, showLocationModal: true })}>
                                                                    <NeuBorderView
                                                                        active
                                                                        height={50}
                                                                        width={deviceDimesions.width * 0.7}
                                                                        color="#ffffff"
                                                                        borderRadius={20}
                                                                        containerStyle={{
                                                                            flexDirection: "row",
                                                                            justifyContent: "space-between",
                                                                            paddingHorizontal: deviceDimesions.width * 0.05
                                                                        }}
                                                                    >
                                                                        <Text>{typeof (this.state.locationName) == 'string' ? this.state.locationName.length > 50 ? this.state.locationName.slice(0, 35) + "..." : this.state.locationName : this.state.locationName.name}</Text>
                                                                    </NeuBorderView>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={{ marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.9, alignSelf: 'center', alignItems: 'center' }}>
                                                                <TouchableOpacity onPress={() => this.getCurrentLocation()} style={{ width: deviceDimesions.width * 0.5, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', height: 20 }}>
                                                                    <Icon name="map-marker" color="red" size={20} />
                                                                    <Text>Use Current Location</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Religion</Text>
                                                            </View>
                                                            <SignupDropDownFullWidthWithSearch
                                                                selectedPickerValue={this.state.Religion && typeof (this.state.Religion) == 'string' ? this.state.Religion : typeof (this.state.Religion) == 'object' && this.state.Religion !== null ? this.state.Religion.name : 'Religion'}
                                                                onChangeHandler={(index, item) => this.onReligionChange(item)}
                                                                staticLable={'Religion'}
                                                                containerWidth={deviceDimesions.width * 0.7}
                                                                pickerWidth={deviceDimesions.width * 0.65}
                                                                pickerDataArr={this.state.allReligionArray}
                                                            />

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Caste</Text>
                                                            </View>
                                                            <SignupDropDownFullWidthWithSearch
                                                                selectedPickerValue={this.state.Caste && typeof (this.state.Caste) == 'string' ? this.state.Caste : typeof (this.state.Caste) == 'object' && this.state.Caste !== null ? this.state.Caste.name : 'Caste'}
                                                                onChangeHandler={(index, item) => this.onCasteChange(item)}
                                                                staticLable="Caste"
                                                                containerWidth={deviceDimesions.width * 0.7}
                                                                pickerWidth={deviceDimesions.width * 0.65}
                                                                pickerDataArr={this.state.allCasteArray}
                                                            />

                                                        </ScrollView>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                            <NeuButton
                                                                onPress={() => this.EditProfileBasicDetails()}
                                                                color="#ffc115"
                                                                borderRadius={10}
                                                                noShadow
                                                                width={deviceDimesions.width * 0.3}
                                                                height={deviceDimesions.Height * 0.06}
                                                            >
                                                                {
                                                                    !this.state.isFormSubmitting ?
                                                                        <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                        :
                                                                        <Flow size={14} />
                                                                }
                                                            </NeuButton>
                                                            <NeuButton from={this.touchable}
                                                                onPress={() => this.setState({ showDatePicker: false, showBsicDetailsModal: false })}
                                                                color="#ffffff"
                                                                borderRadius={10}
                                                                width={deviceDimesions.width * 0.3}
                                                                height={deviceDimesions.Height * 0.06}
                                                            >
                                                                <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                            </NeuButton>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="user" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Name -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.first_name + " " : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="phone" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Mobile Number -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.mobile : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="envelope" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Email -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.email : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="user" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Age -</Text>
                                            <Text style={{ opacity: 0.7, marginRight: deviceDimesions.width * 0.05 }}>{this.state.userData.age ? this.state.userData.age : "null"}</Text>
                                            <Icon name="lock" color="orange" size={16} />
                                        </View>

                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="globe" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Nationality -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.country : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="map-pin" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Location -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.userData ? this.state.userData.residence_place : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="house-user" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Residency Status -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData && this.state.userData.residency_status ? this.state.userData.residency_status : "null"}</Text>

                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="male" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Marital status -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.marital_status : "null"}</Text>

                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="user" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Profile Created -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.profile_created_by : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="calendar" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>DOB -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.date_of_birth : "null"}</Text>

                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="globe" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Mother Tongue -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.mother_tongue : "null"}</Text>

                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="praying-hands" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Religion -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.religion : "null"}</Text>

                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="paw" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Caste -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.caste : "null"}</Text>

                                        </View>
                                    </View>
                                </View>
                                {/* Physical Details */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.02 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon name="user" />
                                            <Text style={{ fontSize: 18, fontWeight: "700" }}> Physical Attributes</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <NeuButton
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.09}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => this.setState({ canclepop: true })}>
                                                <Icon name="pencil-alt" color="#f86728" />
                                            </NeuButton>
                                            <Modal animationType="slide"
                                                transparent={true}
                                                visible={this.state.canclepop}
                                                onBackdropPress={() => this.setState({ canclepop: false })}
                                                onRequestClose={() => {
                                                    this.setState({ canclepop: false })
                                                }}
                                            >
                                                <View style={styles.cancleview}>
                                                    <View style={styles.cancledView}>
                                                        <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Physical Attributes</H3>
                                                        <ScrollView ref={(c) => { this.scrollPhysicalAttr = c }} contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always">

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Height</Text>
                                                            </View>

                                                            <NeuBorderView
                                                                color="#ffffff"
                                                                width={deviceDimesions.width * 0.8}
                                                                height={deviceDimesions.Height * 0.06}
                                                                borderRadius={20}
                                                                style={{ marginTop: 28, marginLeft: 30 }}
                                                                inset
                                                            >
                                                                <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.Height} onValueChange={(itemValue, itemIndex) => this.setState({ Height: itemValue })}>
                                                                    <Picker.Item label="Select Height" value={null} />
                                                                    {
                                                                        this.state.HeightArr.map((el, i) => {
                                                                            console.log(el, "_--------------------------------------------------------------el")
                                                                            return <Picker.Item label={el.name} value={el.id} />
                                                                        })
                                                                    }
                                                                </Picker>

                                                            </NeuBorderView>
                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Weight</Text>
                                                            </View>

                                                            <NeuBorderView
                                                                color="#ffffff"
                                                                width={deviceDimesions.width * 0.8}
                                                                height={deviceDimesions.Height * 0.06}
                                                                borderRadius={20}
                                                                style={{ marginTop: 28, marginLeft: 30 }}
                                                                inset
                                                            >
                                                                <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.Weight} onValueChange={(itemValue, itemIndex) => this.setState({ Weight: itemValue })}>
                                                                    <Picker.Item label="Select Weight" value={null} />
                                                                    {
                                                                        this.state.WeightArr.map((el, i) => {
                                                                            console.log(el, "_--------------------------------------------------------------el")
                                                                            return <Picker.Item label={el.name} value={el.id} />
                                                                        })
                                                                    }
                                                                </Picker>

                                                            </NeuBorderView>

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Complexion</Text>
                                                            </View>

                                                            <NeuBorderView
                                                                color="#ffffff"
                                                                width={deviceDimesions.width * 0.8}
                                                                height={deviceDimesions.Height * 0.06}
                                                                borderRadius={20}
                                                                style={{ marginTop: 28, marginLeft: 30 }}
                                                                inset
                                                            >
                                                                <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.selectedComplexion} onValueChange={(itemValue, itemIndex) => this.setState({ selectedComplexion: itemValue })}>
                                                                    <Picker.Item label="Select Complexion" value={null} />
                                                                    {
                                                                        this.state.complexionArr.map((el, i) => {
                                                                            console.log(el, "_--------------------------------------------------------------el")
                                                                            return <Picker.Item label={el.name} value={el.id} />
                                                                        })
                                                                    }
                                                                </Picker>

                                                            </NeuBorderView>


                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Blood Group</Text>
                                                            </View>

                                                            <NeuBorderView
                                                                color="#ffffff"
                                                                width={deviceDimesions.width * 0.8}
                                                                height={deviceDimesions.Height * 0.06}
                                                                borderRadius={20}
                                                                style={{ marginTop: 28, marginLeft: 30 }}
                                                                inset
                                                            >
                                                                <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.selectedBlood} onValueChange={(itemValue, itemIndex) => this.setState({ selectedBlood: itemValue })}>
                                                                    <Picker.Item label="Blood Group" value={null} />
                                                                    {
                                                                        this.state.BloodArr.map((el, i) => {
                                                                            console.log(el, "_--------------------------------------------------------------el")
                                                                            return <Picker.Item label={el.name} value={el.id} />
                                                                        })
                                                                    }
                                                                </Picker>

                                                            </NeuBorderView>

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Body Type</Text>
                                                            </View>

                                                            <NeuBorderView
                                                                color="#ffffff"
                                                                width={deviceDimesions.width * 0.8}
                                                                height={deviceDimesions.Height * 0.06}
                                                                borderRadius={20}
                                                                style={{ marginTop: 28, marginLeft: 30 }}
                                                                inset
                                                            >
                                                                <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.selectedBody} onValueChange={(itemValue, itemIndex) => this.setState({ selectedBody: itemValue })}>
                                                                    <Picker.Item label="Body Type" value={null} />
                                                                    {
                                                                        this.state.BodyArr.map((el, i) => {
                                                                            console.log(el, "_--------------------------------------------------------------el")
                                                                            return <Picker.Item label={el.name} value={el.id} />
                                                                        })
                                                                    }
                                                                </Picker>

                                                            </NeuBorderView>
                                                            {this.state.showDisabilityOption ?
                                                                <>
                                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                        <Text>Physical Disability</Text>
                                                                    </View>
                                                                    <NeuBorderView
                                                                        color="#ffffff"
                                                                        width={deviceDimesions.width * 0.8}
                                                                        height={deviceDimesions.Height * 0.06}
                                                                        borderRadius={20}
                                                                        style={{ marginTop: 28, marginLeft: 30 }}
                                                                        inset
                                                                    >
                                                                        <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.selectedDisablities} onValueChange={(itemValue, itemIndex) => this.setState({ selectedDisablities: itemValue })}>
                                                                            <Picker.Item label="Physical Disability" value={null} />
                                                                            {
                                                                                this.state.DisabilitesArr.map((el, i) => {
                                                                                    console.log(el, "_--------------------------------------------------------------el")
                                                                                    return <Picker.Item label={el.name} value={el.id} />
                                                                                })
                                                                            }
                                                                        </Picker>
                                                                    </NeuBorderView>

                                                                </>
                                                                :
                                                                null
                                                            }

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                                                                <Text>Do you have any physical disability</Text>
                                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.7, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                    <TouchableOpacity
                                                                        style={{ flexDirection: 'row', justifyContent: 'space-around', width: deviceDimesions.width * 0.3, alignItems: 'center', padding: deviceDimesions.Height * 0.01 }}
                                                                        onPress={() => this.setState({ showDisabilityOption: true }, () => this.scrollPhysicalAttr.scrollToEnd({ animated: true }))}
                                                                    >
                                                                        <NeuView
                                                                            color="#ffffff"
                                                                            borderRadius={5}
                                                                            width={deviceDimesions.width * 0.06}
                                                                            height={deviceDimesions.Height * 0.03}
                                                                        >
                                                                            {
                                                                                this.state.showDisabilityOption ? <Icon name="check" color="red" /> : null
                                                                            }
                                                                        </NeuView>
                                                                        <Text>Yes</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        style={{ flexDirection: 'row', justifyContent: 'space-around', width: deviceDimesions.width * 0.3, alignItems: 'center', padding: deviceDimesions.Height * 0.01 }}
                                                                        onPress={() => this.setState({ showDisabilityOption: false })}
                                                                    >
                                                                        <NeuView
                                                                            color="#ffffff"
                                                                            borderRadius={5}
                                                                            width={deviceDimesions.width * 0.06}
                                                                            height={deviceDimesions.Height * 0.03}
                                                                        >
                                                                            {
                                                                                !this.state.showDisabilityOption ? <Icon name="check" color="red" /> : null
                                                                            }
                                                                        </NeuView>
                                                                        <Text>No</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </ScrollView>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>

                                                            <NeuButton
                                                                onPress={() => this.EditProfilePhysicalDetails()}
                                                                color="#ffc115"
                                                                borderRadius={10}
                                                                noShadow
                                                                width={deviceDimesions.width * 0.3}
                                                                height={deviceDimesions.Height * 0.06}
                                                            >
                                                                {
                                                                    !this.state.isFormSubmitting ?
                                                                        <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                        :
                                                                        <Flow size={14} />
                                                                }

                                                            </NeuButton>

                                                            <NeuButton from={this.touchable}
                                                                onPress={() => this.setState({ canclepop: false })}
                                                                color="#ffffff"
                                                                borderRadius={10}
                                                                width={deviceDimesions.width * 0.3}
                                                                height={deviceDimesions.Height * 0.06}
                                                            >
                                                                <Text style={{ fontFamily: "700", fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                            </NeuButton>
                                                        </View>

                                                    </View>
                                                </View>
                                            </Modal>

                                        </View>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="arrows-alt-v" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Height -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.height : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="balance-scale" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Weight -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.weight : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="spinner" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Complexion -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.complexion : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="tint" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Blood Group -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.blood_group : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="male" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Body Type -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.body_type : "null"}</Text>
                                        </View>

                                        {
                                            this.state.userData.physical_disability == null ?

                                                null

                                                :

                                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                    <NeuBorderView
                                                        color="#ffffff"
                                                        width={deviceDimesions.width * 0.08}
                                                        height={deviceDimesions.Height * 0.045}
                                                        borderRadius={20}
                                                    >
                                                        <Icon name="user-injured" color="orange" size={16} />
                                                    </NeuBorderView>
                                                    <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Physical Disability -</Text>
                                                    <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.physical_disability : "null"}</Text>
                                                </View>
                                        }

                                    </View>
                                </View>
                                {/* Career Details */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.005 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon name="user" />
                                            <Text style={{ fontSize: 18, fontWeight: "700" }}> Career</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <NeuButton
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.09}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => this.setState({ showUpdateCareerModal: true })}
                                            >
                                                <Icon name="plus" color="red" />
                                            </NeuButton>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start", marginVertical: deviceDimesions.Height * 0.025 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: deviceDimesions.width * 0.9 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="briefcase" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Currently Working -</Text>
                                            <Text style={{ color: "green", width: deviceDimesions.width * 0.35 }}>{this.state.isCurrentlyWorking ? this.state.isCurrentlyWorking : "null"}</Text>
                                            <View style={{ position: 'absolute', right: 0 }}>
                                                <NeuButton
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.09}
                                                    height={deviceDimesions.Height * 0.05}
                                                    borderRadius={20}
                                                    onPress={() => this.UpdateIsworkingOrNot()}
                                                >
                                                    <Icon name="pencil-alt" />
                                                </NeuButton>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: deviceDimesions.width * 0.9, marginTop: deviceDimesions.Height * 0.025 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="briefcase" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Annual Income -</Text>
                                            <Text style={{ color: "green", width: deviceDimesions.width * 0.35 }}>{this.state.userData ? this.state.userData.annual_income : "null"}</Text>
                                            <View style={{ position: 'absolute', right: 0 }}>
                                                <NeuButton
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.09}
                                                    height={deviceDimesions.Height * 0.05}
                                                    borderRadius={20}
                                                    onPress={() => this.setState({ ShowEditAnnualIncomeModal: true })}
                                                >
                                                    <Icon name="pencil-alt" />
                                                </NeuButton>
                                            </View>
                                            <Modal animationType="slide"
                                                transparent={true}
                                                visible={this.state.ShowEditAnnualIncomeModal}
                                                onBackdropPress={() => this.setState({ ShowEditAnnualIncomeModal: false })}
                                                onRequestClose={() => {
                                                    this.setState({ ShowEditAnnualIncomeModal: false })
                                                }}
                                            >
                                                <View style={styles.CenteredKnowMeBetterView}>
                                                    <View style={styles.ModalKnowMeBetterViewIncome}>
                                                        <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                            <Text>Annual Income</Text>
                                                        </View>
                                                        <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                            <NeuBorderView
                                                                color="#ffffff"
                                                                borderRadius={15}
                                                                width={deviceDimesions.width * 0.8}
                                                                height={deviceDimesions.Height * 0.06}
                                                                containerStyle={{
                                                                }}
                                                            >
                                                                <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.AnnualIncomeToUpdate} onValueChange={(itemValue, itemIndex) => this.setState({ AnnualIncomeToUpdate: itemValue })}>
                                                                    <Picker.Item label="Annual Income" value={null} />
                                                                    {
                                                                        this.state.IncomeOptionsArr.map((el, i) => {
                                                                            return <Picker.Item label={el.value_en.toString()} value={el.id.toString()} />
                                                                        })
                                                                    }
                                                                </Picker>
                                                            </NeuBorderView>
                                                        </View>
                                                        <View style={{ position: 'absolute', bottom: 10, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                            <NeuButton
                                                                color="#ffc115"
                                                                borderRadius={10}
                                                                noShadow
                                                                width={deviceDimesions.width * 0.3}
                                                                height={deviceDimesions.Height * 0.06}
                                                                onPress={() => this.onUpdateAnnualIcomePress()}

                                                            >
                                                                {
                                                                    !this.state.isFormSubmitting ?
                                                                        <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                        :
                                                                        <Flow size={14} />
                                                                }

                                                            </NeuButton>

                                                            <NeuButton from={this.touchable}
                                                                color="#ffffff"
                                                                borderRadius={10}
                                                                width={deviceDimesions.width * 0.3}
                                                                height={deviceDimesions.Height * 0.06}
                                                                onPress={() => this.setState({ ShowEditAnnualIncomeModal: false })}
                                                            >
                                                                <Text style={{ fontFamily: "700", fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                            </NeuButton>

                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.94, alignSelf: "center", alignItems: "flex-start" }}>
                                        <View style={{ alignItems: "center", height: this.state.CareerDataArr ? deviceDimesions.Height * (this.state.CareerDataArr.length / 14) : 20 }}>
                                            {
                                                this.state.CareerDataArr ?
                                                    <StepIndicator
                                                        customStyles={customStyles}
                                                        currentPosition={0}
                                                        stepCount={this.state.CareerDataArr.length}
                                                        labels={this.state.CareerDataArr}
                                                        direction="vertical"
                                                        renderStepIndicator={renderCareerStepIndicator}
                                                        renderLabel={renderCareerStepLabel}
                                                    />
                                                    : null
                                            }
                                        </View>
                                    </View>

                                    <Modal animationType="slide"
                                        transparent={true}
                                        visible={this.state.showUpdateCareerModal}
                                        onBackdropPress={() => this.setState({ showUpdateCareerModal: false })}
                                        onRequestClose={() => {
                                            this.setState({ showUpdateCareerModal: false })
                                        }}
                                    >
                                        <View style={styles.CenteredKnowMeBetterView}>
                                            <View style={styles.ModalKnowMeBetterViewAnnualIncome}>
                                                <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02 }}>Career Details</H3>
                                                <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always" style={{ paddingBottom: deviceDimesions.Height * 0.5 }}>

                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Working As</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.05 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                                alignItems: "flex-start"
                                                            }}
                                                        >
                                                            <TextInput placeholder="Working As" value={this.state.CareerDataEditableArr[0].career_type} onChangeText={(text) => this.onCareerDetailsChange(text, "career_type")} style={{ width: deviceDimesions.width * 0.8, height: deviceDimesions.Height * 0.06, paddingHorizontal: deviceDimesions.width * 0.05 }} />
                                                        </NeuBorderView>
                                                    </View>

                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Working In</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.05 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                                alignItems: "flex-start"
                                                            }}
                                                        >
                                                            <TextInput placeholder="Working In" value={this.state.CareerDataEditableArr[0].company_name} onChangeText={(text) => this.onCareerDetailsChange(text, "company_name")} style={{ width: deviceDimesions.width * 0.8, height: deviceDimesions.Height * 0.06, paddingHorizontal: deviceDimesions.width * 0.05 }} />
                                                        </NeuBorderView>
                                                    </View>

                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Career Type</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                            }}
                                                        >
                                                            <Picker style={{ width: deviceDimesions.width * 0.7 }}
                                                                selectedValue={this.state.CareerDataEditableArr[0].career_designation} onValueChange={(itemValue, itemIndex) => { this.onCareerDetailsChange(itemValue, "career_designation") }}>
                                                                <Picker.Item label="Career Type" value={null} />
                                                                {
                                                                    this.state.JobTypeListArr.map((el, i) => {
                                                                        return <Picker.Item label={el.desig.toString()} value={el.mdesignation_id.toString()} />
                                                                    })
                                                                }
                                                            </Picker>
                                                        </NeuBorderView>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Employment Type</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                            }}
                                                        >
                                                            <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.CareerDataEditableArr[0].career_to} onValueChange={(itemValue, itemIndex) => { this.onCareerDetailsChange(itemValue, "career_to") }}>
                                                                <Picker.Item label="Employment Type" value={null} />
                                                                {
                                                                    this.state.EmploymentTypeListArr.map((el, i) => {
                                                                        return <Picker.Item label={el.value.toString()} value={el.id.toString()} />
                                                                    })
                                                                }
                                                            </Picker>
                                                        </NeuBorderView>
                                                    </View>

                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Currently Working</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                        <NeuButton
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.08}
                                                            height={deviceDimesions.Height * 0.04}
                                                            onPress={() => this.onCareerDetailsChange("", "currently_working")}
                                                        >
                                                            {this.state.CareerDataEditableArr[0].currently_working ? <Icon name="check" color="green" size={20} /> : null}
                                                        </NeuButton>
                                                    </View>
                                                </ScrollView>
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                    <NeuButton
                                                        color="#ffc115"
                                                        borderRadius={10}
                                                        noShadow
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.onCareerSubmit()}
                                                    >
                                                        {
                                                            !this.state.isFormSubmitting ?
                                                                <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                :
                                                                <Flow size={14} />
                                                        }

                                                    </NeuButton>
                                                    <NeuButton from={this.touchable}
                                                        color="#ffffff"
                                                        borderRadius={10}
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.setState({ showUpdateCareerModal: false })}
                                                    >
                                                        <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                    </NeuButton>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                                {/* Education Details */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.005 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon name="user" />
                                            <Text style={{ fontSize: 18, fontWeight: "700" }}> Education</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <NeuButton
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.09}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => { this.setState({ showUpdateEducationModal: true }) }}
                                            >
                                                <Icon name="plus" color="red" />
                                            </NeuButton>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                        <View style={{ alignItems: "center", height: this.state.MemberEducationDataArr ? deviceDimesions.Height * (this.state.MemberEducationDataArr.length / 14) : 20 }}>
                                            {
                                                this.state.MemberEducationDataArr ?
                                                    <StepIndicator
                                                        customStyles={customStyles}
                                                        stepCount={this.state.MemberEducationDataArr.length}
                                                        labels={this.state.MemberEducationDataArr}
                                                        direction="vertical"
                                                        renderStepIndicator={renderStepIndicator}
                                                        renderLabel={renderStepLabel}
                                                    />
                                                    :
                                                    null
                                            }
                                        </View>
                                    </View>
                                    <Modal animationType="slide"
                                        transparent={true}
                                        visible={this.state.showUpdateEducationModal}
                                        onBackdropPress={() => this.setState({ showUpdateEducationModal: false })}
                                        onRequestClose={() => {
                                            this.setState({ showUpdateEducationModal: false })
                                        }}
                                    >
                                        <View style={styles.CenteredKnowMeBetterView}>
                                            <View style={styles.ModalKnowMeBetterView}>
                                                <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Education Details</H3>
                                                <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always" style={{ paddingBottom: deviceDimesions.Height * 0.5 }}>

                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Education Level</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                            }}
                                                        >
                                                            <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.EducationsLevelArr} onValueChange={(itemValue, itemIndex) => this.setState({ SelectedEducationLevel: itemValue })}>
                                                                <Picker.Item label="Education Level" value={null} />
                                                                {
                                                                    this.state.EducationsLevelArr.map((el, i) => {
                                                                        return (
                                                                            <Picker.Item value={el.id} label={el.value} />
                                                                        )
                                                                    })
                                                                }
                                                            </Picker>
                                                        </NeuBorderView>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Field Of Study</Text>
                                                    </View>

                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                            }}
                                                        >
                                                            <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.FieldOfStudyArr} onValueChange={(itemValue, itemIndex) => this.setState({ SelectedFieldOfStudy: itemValue })}>
                                                                <Picker.Item label="Field Of Study" value={null} />
                                                                {
                                                                    this.state.FieldOfStudyArr.map((el, i) => {
                                                                        return (
                                                                            <Picker.Item value={el.id} label={el.value} />
                                                                        )
                                                                    })
                                                                }
                                                            </Picker>
                                                        </NeuBorderView>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Course</Text>
                                                    </View>

                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                                alignItems: "flex-start"
                                                            }}
                                                        >
                                                            <TextInput placeholder="Course" value={this.state.SelectedCourse} onChangeText={(text) => this.setState({ SelectedCourse: text.trimStart() })} style={{ width: deviceDimesions.width * 0.8, height: deviceDimesions.Height * 0.06, paddingHorizontal: deviceDimesions.width * 0.05 }} />
                                                        </NeuBorderView>
                                                    </View>

                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>College</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                                alignItems: "flex-start"
                                                            }}
                                                        >
                                                            <TextInput placeholder="College" value={this.state.selectedCollege} onChangeText={(text) => this.setState({ selectedCollege: text.trimStart() })} style={{ width: deviceDimesions.width * 0.8, height: deviceDimesions.Height * 0.06, paddingHorizontal: deviceDimesions.width * 0.05 }} />
                                                        </NeuBorderView>
                                                    </View>

                                                    <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                        <Text>Passing Year</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "center", padding: 2, marginTop: deviceDimesions.Height * 0.04 }}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            borderRadius={15}
                                                            width={deviceDimesions.width * 0.8}
                                                            height={deviceDimesions.Height * 0.06}
                                                            containerStyle={{
                                                            }}
                                                        >
                                                            <Picker style={{ width: deviceDimesions.width * 0.7 }} selectedValue={this.state.PassingYear} onValueChange={(itemValue, itemIndex) => { this.setState({ PassingYear: itemValue, isPursuing: itemValue > new Date().getFullYear() ? true : false }) }}>
                                                                <Picker.Item label="Passing Year" value={null} />
                                                                {
                                                                    this.state.passingYearArr.map((el, i) => {
                                                                        return <Picker.Item label={el.toString()} value={el.toString()} />

                                                                    })
                                                                }
                                                            </Picker>
                                                        </NeuBorderView>
                                                    </View>
                                                </ScrollView>
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                    <NeuButton
                                                        color="#ffc115"
                                                        borderRadius={10}
                                                        noShadow
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.SaveEducationDetails()}
                                                    >
                                                        {
                                                            !this.state.isFormSubmitting ?
                                                                <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                :
                                                                <Flow size={14} />
                                                        }
                                                    </NeuButton>

                                                    <NeuButton from={this.touchable}
                                                        color="#ffffff"
                                                        borderRadius={10}
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.setState({ showUpdateEducationModal: false })}
                                                    >
                                                        <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                    </NeuButton>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                                {/* Know Me Better */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }}>
                                        <View
                                            style={{ width: deviceDimesions.width * 0.9, borderRadius: 15, elevation: 4, padding: deviceDimesions.width * 0.03, backgroundColor: "#ffffff" }}
                                        >
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <View>
                                                    <Image source={IconsPathVariable.KnowMeBetter} />
                                                </View>
                                                <View style={{ marginLeft: deviceDimesions.width * 0.05 }}>
                                                    <Text style={{ fontSize: 18, fontWeight: "600" }}>Know Me Better</Text>
                                                </View>
                                               
                                            </View>
                                            <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: deviceDimesions.width * 0.03 }}>
                                                <Text style={{ fontSize: 14 }}>Completing this questionnaire is intended to help your prospects know you better. You can answer any questions that you like and </Text>
                                                <Text style={{ fontSize: 14, color: "orange" }}>answering these is entirely optional</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {
                                        this.state.KnowMeBetterArr.map((el, i) => {

                                            return (
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center" }} key={i}>
                                                    <View
                                                        onPress={() => this.setState({ selectedKnowMeBetterQuestionIndex: i }, () => { console.log(this.state.selectedKnowMeBetterQuestionIndex); this.setState({ ShowKnowMeBetterModal: true }) })}
                                                        style={{ width: deviceDimesions.width * 0.9, borderRadius: 15, elevation: 4, padding: deviceDimesions.width * 0.03, backgroundColor: "#ffffff" }}
                                                    >
                                                        <View style={{ alignItems: "center", position: 'absolute', right: 10, top: 5 }}>
                                                            {
                                                                el.isFocused ?
                                                                    <NeuButton
                                                                        color="#ffffff"
                                                                        width={deviceDimesions.width * 0.09}
                                                                        height={deviceDimesions.Height * 0.05}
                                                                        borderRadius={20}
                                                                        onPress={() => {
                                                                            let KnowMeBetterArr = [...this.state.KnowMeBetterArr]
                                                                            KnowMeBetterArr[i].isFocused = !KnowMeBetterArr[i].isFocused;
                                                                            this.setState({ KnowMeBetterArr }, () => {
                                                                                if (!el.isFocused) {
                                                                                    Keyboard.dismiss()
                                                                                    this.onKnowMeBetterSubmit()
                                                                                }
                                                                            })
                                                                        }}
                                                                    >
                                                                        <Icon name="check" color='green' />
                                                                    </NeuButton>
                                                                    : null
                                                            }
                                                        </View>
                                                        <View style={{ marginTop: deviceDimesions.width * 0.01, width: deviceDimesions.width * 0.7 }}>
                                                            <Text style={{ fontSize: 15, fontWeight: "700", marginBottom: deviceDimesions.Height * 0.02 }}>{el.question}</Text>
                                                            <NeuBorderView
                                                                color="#ffffff"
                                                                height={deviceDimesions.Height * 0.07}
                                                                width={deviceDimesions.width * 0.85}
                                                                borderRadius={10}
                                                            >
                                                                <TextInput
                                                                    focusable={el.isFocused}
                                                                    onFocus={() => {
                                                                        let KnowMeBetterArr = [...this.state.KnowMeBetterArr]
                                                                        KnowMeBetterArr[i].isFocused = true;
                                                                        this.setState({ KnowMeBetterArr })
                                                                    }}
                                                                    onBlur={() => {
                                                                        let KnowMeBetterArr = [...this.state.KnowMeBetterArr]
                                                                        KnowMeBetterArr[i].isFocused = false;
                                                                        this.setState({ KnowMeBetterArr })
                                                                    }}
                                                                    style={{ fontSize: 14, opacity: 0.7, paddingHorizontal: deviceDimesions.width * 0.08, width: deviceDimesions.width * 0.8 }}
                                                                    value={el.answer}
                                                                    onChangeText={(text) => {
                                                                        let KnowMeBetterArr = [...this.state.KnowMeBetterArr]
                                                                        KnowMeBetterArr[i].answer = text;
                                                                        this.setState({ KnowMeBetterArr })
                                                                    }}
                                                                />
                                                               
                                                                <Icon name="pencil-alt" size={18} color='rgba(0,0,0,0.6)' style={{ position: 'absolute', alignSelf: "flex-start", marginLeft: deviceDimesions.width * 0.03 }} />
                                                              
                                                            </NeuBorderView>

                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }

                                    <Modal animationType="slide"
                                        transparent={true}
                                        visible={this.state.ShowKnowMeBetterModal}
                                        onBackdropPress={() => this.setState({ ShowKnowMeBetterModal: false })}
                                        onRequestClose={() => {
                                            this.setState({ ShowKnowMeBetterModal: false })
                                        }}
                                    >
                                        <View style={styles.CenteredKnowMeBetterView}>
                                            <View style={styles.ModalKnowMeBetterView}>
                                                <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02 }}>Know Me Better</H3>
                                                <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always" style={{ paddingBottom: deviceDimesions.Height * 0.5 }}>
                                                    {
                                                        this.state.CloneOfKnowMeBetterData.map((el, i) => {
                                                            return (
                                                                <View style={{ display: this.state.selectedKnowMeBetterQuestionIndex == i ? 'flex' : this.state.selectedKnowMeBetterQuestionIndex !== 0 && this.state.selectedKnowMeBetterQuestionIndex == "" ? 'flex' : 'none', marginTop: deviceDimesions.Height * 0.02, alignSelf: "center", paddingBottom: 3 }} key={i}>
                                                                    <View
                                                                        style={{ width: deviceDimesions.width * 0.7, borderRadius: 15, elevation: 4, padding: deviceDimesions.width * 0.03, backgroundColor: "#ffffff" }}
                                                                    >
                                                                        <View style={{ marginTop: deviceDimesions.width * 0.01 }}>
                                                                            <Text style={{ fontSize: 15, fontWeight: "700", marginVertical: deviceDimesions.Height * 0.02 }}>{el.question}</Text>
                                                                            <NeuBorderView
                                                                                height={50}
                                                                                width={deviceDimesions.width * 0.64}
                                                                                borderRadius={10}
                                                                                color="#ffffff"
                                                                            >
                                                                                <TextInput onChangeText={(text) => { this.OnKnowMeBetterDataChange(el, i, text) }} value={el.answer} style={{ width: deviceDimesions.width * 0.55 }} />
                                                                            </NeuBorderView>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </ScrollView>
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                    <NeuButton
                                                        color="#ffc115"
                                                        borderRadius={10}
                                                        noShadow
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.onKnowMeBetterSubmit()}
                                                    >
                                                        {
                                                            !this.state.isFormSubmitting ?
                                                                <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                :
                                                                <Flow size={14} />
                                                        }
                                                    </NeuButton>

                                                    <NeuButton from={this.touchable}
                                                        color="#ffffff"
                                                        borderRadius={10}
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={async () => { this.KnowMeBetterCall(); this.setState({ ShowKnowMeBetterModal: false }) }}
                                                    >
                                                        <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                    </NeuButton>

                                                </View>
                                            </View>
                                        </View>

                                    </Modal>

                                </View>
                                {/* Life style */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.02 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon name="user" />
                                            <Text style={{ fontSize: 18, fontWeight: "700", }}> Life Style</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <NeuButton
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.09}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => this.setState({ lifestylepop: true })}
                                            >
                                                <Icon name="pencil-alt" />
                                            </NeuButton>
                                            <Modal animationType="slide"
                                                transparent={true}
                                                visible={this.state.lifestylepop}
                                                onBackdropPress={() => this.setState({ lifestylepop: false })}
                                                onRequestClose={() => {
                                                    this.setState({ lifestylepop: false })
                                                }}
                                            >
                                                <View style={styles.overview}>
                                                    <View style={styles.overedView}>
                                                        <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Life Style</H3>

                                                        <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always">

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Diet</Text>
                                                            </View>
                                                            <View style={{ marginTop: deviceDimesions.Height * 0.04, alignSelf: 'center' }}>
                                                                <NeuBorderView
                                                                    color="#ffffff"
                                                                    width={deviceDimesions.width * 0.7}
                                                                    height={deviceDimesions.Height * 0.05}
                                                                    borderRadius={20}
                                                                    inset
                                                                >
                                                                    <Picker
                                                                        selectedValue={this.state.SelectedDiet}
                                                                        onValueChange={(item) => this.setState({ SelectedDiet: item })}
                                                                        style={{
                                                                            width: deviceDimesions.width * 0.6,
                                                                            Height: deviceDimesions.Height * 0.045
                                                                        }}
                                                                    >
                                                                        {this.state.DietArr.length > 0 ?
                                                                            this.state.DietArr.map((el) => {
                                                                                return (
                                                                                    <Picker.Item value={el.id} label={el.value_en} />
                                                                                )
                                                                            })
                                                                            :
                                                                            null
                                                                        }
                                                                    </Picker>
                                                                </NeuBorderView>
                                                            </View>

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Drink</Text>
                                                            </View>
                                                            <View style={{ marginTop: deviceDimesions.Height * 0.04, alignSelf: 'center' }}>
                                                                <NeuBorderView
                                                                    color="#ffffff"
                                                                    width={deviceDimesions.width * 0.7}
                                                                    height={deviceDimesions.Height * 0.05}
                                                                    borderRadius={20}
                                                                    inset
                                                                >
                                                                    <Picker
                                                                        selectedValue={this.state.Drinklisting}
                                                                        onValueChange={(item) => this.setState({ Drinklisting: item })}
                                                                        style={{
                                                                            width: deviceDimesions.width * 0.6,
                                                                            Height: deviceDimesions.Height * 0.045
                                                                        }}
                                                                    >

                                                                        {this.state.DrinkArr.length > 0 ?
                                                                            this.state.DrinkArr.map((el) => {
                                                                                return (
                                                                                    <Picker.Item value={el.id} label={el.value_en} />
                                                                                )
                                                                            })
                                                                            :
                                                                            null
                                                                        }
                                                                    </Picker>
                                                                </NeuBorderView>
                                                            </View>

                                                            <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                <Text>Smoke</Text>
                                                            </View>
                                                            <View style={{ marginTop: deviceDimesions.Height * 0.04, alignSelf: 'center' }}>

                                                                <NeuBorderView
                                                                    color="#ffffff"
                                                                    width={deviceDimesions.width * 0.7}
                                                                    height={deviceDimesions.Height * 0.05}
                                                                    borderRadius={20}
                                                                    inset
                                                                >

                                                                    <Picker
                                                                        selectedValue={this.state.Smokelisting}
                                                                        onValueChange={(item) => this.setState({ Smokelisting: item })}
                                                                        style={{
                                                                            width: deviceDimesions.width * 0.6,
                                                                            Height: deviceDimesions.Height * 0.045
                                                                        }}
                                                                    >

                                                                        {this.state.SmokeArr.length > 0 ?
                                                                            this.state.SmokeArr.map((el) => {
                                                                                return (
                                                                                    <Picker.Item value={el.id} label={el.value_en} />
                                                                                )
                                                                            })
                                                                            :
                                                                            null
                                                                        }
                                                                    </Picker>
                                                                </NeuBorderView>
                                                            </View>
                                                        </ScrollView>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                            <NeuButton
                                                                onPress={() => this.LifeStyleDetail()}
                                                                color="#ffc115"
                                                                borderRadius={10}
                                                                noShadow
                                                                width={deviceDimesions.width * 0.3}
                                                                height={deviceDimesions.Height * 0.06}
                                                            >
                                                                {
                                                                    !this.state.isFormSubmitting ?
                                                                        <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                        :
                                                                        <Flow size={14} />
                                                                }
                                                            </NeuButton>
                                                            <NeuButton from={this.touchable}

                                                                onPress={() => this.setState({ lifestylepop: false })}
                                                                color="#ffffff"
                                                                borderRadius={10}
                                                                width={deviceDimesions.width * 0.3}
                                                                height={deviceDimesions.Height * 0.06}
                                                            >
                                                                <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                            </NeuButton>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="pizza-slice" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Diet -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.diet && this.state.userData.diet !== null ? this.state.userData.diet : null : null}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="wine-glass" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Drinking -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.drink && this.state.userData.drink !== null ? this.state.userData.drink : null : null}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="smoking-ban" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Smoking -</Text>
                                            <Text style={{ opacity: 0.7 }}>{this.state.userData ? this.state.userData.smoke && this.state.userData.smoke !== null ? this.state.userData.smoke : null : null}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Family Details */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.02 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon name="user" />
                                            <Text style={{ fontSize: 18, fontWeight: "700", fontWeight: "bold" }}> Family Details</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <NeuButton
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.09}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => this.setState({ ShowFamilyDetailsEditableModal: true })}
                                            >
                                                <Icon name="plus" color="#f86728" />
                                            </NeuButton>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", width: deviceDimesions.width * 0.9 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="users" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Family Status -</Text>
                                            <Text style={{ color: "green" }}>{this.state.FamilyDataArr ? this.state.FamilyDataArr.family_status : ''}</Text>
                                            <View style={{ position: 'absolute', right: 0 }}>
                                                <NeuButton
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.09}
                                                    height={deviceDimesions.Height * 0.05}
                                                    borderRadius={20}
                                                    onPress={() => this.setState({ ShowFamilyStatusAndValueEditableModal: true })}
                                                >
                                                    <Icon name="pencil-alt" />
                                                </NeuButton>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="fist-raised" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Family Value -</Text>
                                            <Text style={{ color: "green" }}>{this.state.FamilyDataArr ? this.state.FamilyDataArr.family_value : ''}</Text>
                                        </View>
                                        {/* Few Words About me */}
                                        <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.02 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Icon name="pencil-alt" />
                                                    <Text style={{ fontSize: 18, fontWeight: "700" }}> About My Family</Text>
                                                </View>
                                                <View style={{ alignItems: "center" }}>
                                                    <NeuButton
                                                        color="#ffffff"
                                                        width={deviceDimesions.width * 0.09}
                                                        height={deviceDimesions.Height * 0.05}
                                                        borderRadius={20}
                                                        onPress={() => { this.HandleAboutMyFamilyValueUpdate(this.state.AboutMyFamilyValue); this.setState({ AboutMyFamilyValueEditable: false }) }}
                                                    >
                                                        <Icon name={!this.state.AboutMyFamilyValueEditable ? "pencil-alt" : "check"} color={!this.state.AboutMyFamilyValueEditable ? "#333033" : "#00b300"} />
                                                    </NeuButton>
                                                </View>
                                            </View>
                                            <View style={{ alignSelf: "center" }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    borderRadius={10}
                                                    height={deviceDimesions.Height * 0.12}
                                                    width={deviceDimesions.width * 0.9}
                                                    containerStyle={{
                                                        alignItems: "flex-start",
                                                        justifyContent: "flex-start",
                                                        padding: 5
                                                    }}
                                                >
                                                    <TextInput
                                                        caretHidden={this.state.AboutMyFamilyValueEditable ? true : false}
                                                        onFocus={() => this.setState({ AboutMyFamilyValueEditable: true }, () => console.log("Focused"))}
                                                        onBlur={() => this.setState({ AboutMyFamilyValueEditable: false }, () => this.setState({ AboutMyFamilyValueEditable: false }))}
                                                        focusable={this.state.AboutMyFamilyValueEditable}
                                                        maxLength={300}
                                                        placeholder="About my family..."
                                                        value={this.state.AboutMyFamilyValue}
                                                        multiline
                                                        onChangeText={(Text) => { this.setState({ AboutMyFamilyValue: Text }) }}
                                                        style={{
                                                            height: deviceDimesions.Height * 0.1, width: deviceDimesions.width * 0.85, textAlignVertical: "top"
                                                        }}
                                                    />
                                                </NeuBorderView>
                                            </View>
                                        </View>

                                        {
                                            this.state.FamilyDataArr.parent_data ? this.state.FamilyDataArr.parent_data.map((el, i) => {
                                                return (
                                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.9 }} key={el.id}>
                                                        <NeuBorderView
                                                            color="#ffffff"
                                                            width={deviceDimesions.width * 0.08}
                                                            height={deviceDimesions.Height * 0.045}
                                                            borderRadius={20}
                                                        >
                                                            <Icon name="briefcase" color="orange" size={16} />
                                                        </NeuBorderView>
                                                        <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600", width: deviceDimesions.width * 0.22 }}>{el.parent_type} -</Text>
                                                        <Text style={{ color: "green", width: deviceDimesions.width * 0.45 }}>{el.name} {el.designation ? " working as " + el.designation : ""} {el.working_in ? " in " + el.working_in : ''}</Text>
                                                        <View style={{ position: 'absolute', right: 0 }}>
                                                            <NeuButton
                                                                color="#ffffff"
                                                                width={deviceDimesions.width * 0.09}
                                                                height={deviceDimesions.Height * 0.05}
                                                                borderRadius={20}
                                                                onPress={() => this.setState({
                                                                    FamilyDataEditedArr: [{
                                                                        name: el.name,
                                                                        parent_type: [{ id: 1, name: "Father" }, { id: 2, name: "Mother" }, { id: 3, name: "Brother" }, { id: 4, name: "Sister" }, { id: "", name: "" }].filter((ele, i) => ele.name == el.parent_type)[0],
                                                                        working_in: el.working_in,
                                                                        designation: el.designation,
                                                                        member_id: el.id,
                                                                        work_status: this.state.WorkStatusArr.filter((ele, i) => ele.name == el.work_status)
                                                                    }]
                                                                },
                                                                    () => this.setState({ ShowExistingFamilyMemberEditableModal: true }))}
                                                            >
                                                                <Icon name="pencil-alt" />
                                                            </NeuButton>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                                :
                                                null
                                        }
                                    </View>
                                    <Modal animationType="slide"
                                        transparent={true}
                                        visible={this.state.ShowFamilyStatusAndValueEditableModal}
                                        onBackdropPress={() => this.setState({ ShowFamilyStatusAndValueEditableModal: false })}
                                        onRequestClose={() => {
                                            this.setState({ ShowFamilyStatusAndValueEditableModal: false })
                                        }}
                                    >
                                        <View style={styles.CenteredKnowMeBetterView}>
                                            <View style={styles.ModalKnowMeBetterViewFamilyStatus}>
                                                <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Family Status & Value</H3>
                                                <View style={{ alignSelf: 'center' }}>
                                                    <Text style={{ marginBottom: -deviceDimesions.Height * 0.02 }}>Family Status -</Text>
                                                    <SignupDropDownFullWidthWithSearch
                                                        selectedPickerValue={this.state.selectedFamilyStatus && typeof (this.state.selectedFamilyStatus) == 'string' ? this.state.selectedFamilyStatus : typeof (this.state.selectedFamilyStatus) == 'object' && this.state.selectedFamilyStatus !== null ? this.state.selectedFamilyStatus.name : 'Family Status'}
                                                        onChangeHandler={(index, item) => this.onFamilyStatusChange(item)}
                                                        staticLable={'Family Status'}
                                                        containerWidth={deviceDimesions.width * 0.7}
                                                        pickerWidth={deviceDimesions.width * 0.65}
                                                        pickerDataArr={this.state.FamilyStatusArr}
                                                    />
                                                    <Text style={{ paddingTop: deviceDimesions.Height * 0.02, marginBottom: -deviceDimesions.Height * 0.03 }}>Family Value -</Text>
                                                    <SignupDropDownFullWidthWithSearch
                                                        selectedPickerValue={this.state.selectedFamilyValue && typeof (this.state.selectedFamilyValue) == 'string' ? this.state.selectedFamilyValue : typeof (this.state.selectedFamilyValue) == 'object' && this.state.selectedFamilyValue !== null ? this.state.selectedFamilyValue.name : 'Family Value'}
                                                        onChangeHandler={(index, item) => this.onFamilyValueChange(item)}
                                                        staticLable={'Family Value'}
                                                        containerWidth={deviceDimesions.width * 0.7}
                                                        pickerWidth={deviceDimesions.width * 0.65}
                                                        pickerDataArr={this.state.FamilyValueArr}
                                                    />
                                                </View>
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center', position: 'absolute', bottom: 10 }}>
                                                    <NeuButton
                                                        color="#ffc115"
                                                        borderRadius={10}
                                                        noShadow
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.SaveFamilyStatusAndValue()}
                                                    >
                                                        {
                                                            !this.state.isFormSubmitting ?
                                                                <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                :
                                                                <Flow size={14} />
                                                        }
                                                    </NeuButton>

                                                    <NeuButton from={this.touchable}
                                                        color="#ffffff"
                                                        borderRadius={10}
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.setState({ ShowFamilyStatusAndValueEditableModal: false })}
                                                    >
                                                        <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                    </NeuButton>

                                                </View>
                                            </View>
                                        </View>
                                    </Modal>



                                    <Modal animationType="slide"
                                        transparent={true}
                                        visible={this.state.ShowFamilyDetailsEditableModal}
                                        onBackdropPress={() => this.setState({ ShowFamilyDetailsEditableModal: false })}
                                        onRequestClose={() => {
                                            this.setState({ ShowFamilyDetailsEditableModal: false })
                                        }}
                                    >
                                        <View style={styles.CenteredKnowMeBetterView}>
                                            <View style={styles.ModalKnowMeBetterView}>
                                                <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always" style={{ paddingBottom: deviceDimesions.Height * 0.5 }}>
                                                    <View style={{ alignSelf: 'center' }}>
                                                        <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Family Details</H3>
                                                        {
                                                            this.state.FamilyDataEditedArr ? this.state.FamilyDataEditedArr.map((el, i) => {
                                                                return (
                                                                    <View style={{ alignSelf: 'center', width: deviceDimesions.width * 0.7, paddingBottom: deviceDimesions.Height * 0.05 }} key={el.id}>
                                                                        <Text style={{ paddingTop: deviceDimesions.Height * 0.02, marginBottom: -deviceDimesions.Height * 0.03 }}>Relation -</Text>
                                                                        <SignupDropDownFullWidthWithSearch
                                                                            selectedPickerValue={el.member_type ? el.member_type.name : "Relation"}
                                                                            onChangeHandler={(index, item) => this.OnFamilyDetailsChange("member_type", item)}
                                                                            staticLable={'Relation'}
                                                                            itemSeparatorStyle
                                                                            containerWidth={deviceDimesions.width * 0.7}
                                                                            pickerWidth={deviceDimesions.width * 0.65}
                                                                            pickerDataArr={[{ id: 1, name: "Father" }, { id: 2, name: "Mother" }, { id: 3, name: "Brother" }, { id: 4, name: "Sister" }, { id: "", name: "" }]}
                                                                        />


                                                                        <Text style={{ paddingVertical: deviceDimesions.Height * 0.02 }}>Name -</Text>
                                                                        <NeuBorderView
                                                                            height={50}
                                                                            width={deviceDimesions.width * 0.7}
                                                                            borderRadius={20}
                                                                            color="#ffffff"
                                                                        >
                                                                            <TextInput placeholder="Member Name" onChangeText={(text) => this.OnFamilyDetailsChange("name", text)} value={el.name} style={{ width: deviceDimesions.width * 0.6 }} />
                                                                        </NeuBorderView>
                                                                        <Text style={{ paddingTop: deviceDimesions.Height * 0.02, marginBottom: -deviceDimesions.Height * 0.03 }}>Is Working -</Text>
                                                                        <SignupDropDownFullWidthWithSearch
                                                                            selectedPickerValue={el.work_status ? el.work_status.name : "Work Status"}
                                                                            onChangeHandler={(index, item) => this.OnFamilyDetailsChange("work_status", item)}
                                                                            staticLable={'Work Status'}
                                                                            itemSeparatorStyle
                                                                            containerWidth={deviceDimesions.width * 0.7}
                                                                            pickerWidth={deviceDimesions.width * 0.65}
                                                                            pickerDataArr={this.state.WorkStatusArr}
                                                                        />
                                                                       
                                                                        {typeof (el.work_status) == "object" && el.work_status.id != 0 ?
                                                                            <>
                                                                                <Text style={{ paddingVertical: deviceDimesions.Height * 0.02 }}>Working In -</Text>
                                                                                <NeuBorderView
                                                                                    height={50}
                                                                                    width={deviceDimesions.width * 0.7}
                                                                                    borderRadius={20}
                                                                                    color="#ffffff"
                                                                                >
                                                                                    <TextInput placeholder="Working In" onChangeText={(text) => this.OnFamilyDetailsChange("working_in", text)} value={el.working_in} style={{ width: deviceDimesions.width * 0.6 }} />
                                                                                </NeuBorderView>
                                                                                <Text style={{ paddingVertical: deviceDimesions.Height * 0.02 }}>Designation -</Text>
                                                                                <NeuBorderView
                                                                                    height={50}
                                                                                    width={deviceDimesions.width * 0.7}
                                                                                    borderRadius={20}
                                                                                    color="#ffffff"
                                                                                >
                                                                                    <TextInput placeholder="Member Designation" onChangeText={(text) => this.OnFamilyDetailsChange("designation", text)} value={el.designation} style={{ width: deviceDimesions.width * 0.6 }} />
                                                                                </NeuBorderView>
                                                                            </>
                                                                            : null
                                                                        }

                                                                    </View>
                                                                )
                                                            })
                                                                :
                                                                null
                                                        }
                                                    </View>
                                                </ScrollView>
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                    <NeuButton
                                                        color="#ffc115"
                                                        borderRadius={10}
                                                        noShadow
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.SaveFamilyDetails()}

                                                    >
                                                        {
                                                            !this.state.isFormSubmitting ?
                                                                <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                :
                                                                <Flow size={14} />
                                                        }
                                                    </NeuButton>

                                                    <NeuButton from={this.touchable}
                                                        color="#ffffff"
                                                        borderRadius={10}
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.setState({ ShowFamilyDetailsEditableModal: false, FamilyDataEditedArr: [{ name: "", member_type: "", working_in: "", designation: "" }] })}
                                                    >
                                                        <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                    </NeuButton>

                                                </View>
                                            </View>
                                        </View>

                                    </Modal>
                                    <Modal animationType="slide"
                                        transparent={true}
                                        visible={this.state.ShowExistingFamilyMemberEditableModal}
                                        onBackdropPress={() => this.setState({ ShowExistingFamilyMemberEditableModal: false })}
                                        onRequestClose={() => {
                                            this.setState({ ShowExistingFamilyMemberEditableModal: false })
                                        }}
                                    >

                                        <View style={styles.CenteredKnowMeBetterView}>
                                            <View style={styles.ModalKnowMeBetterViewFamilyDetails}>
                                                <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always" style={{ paddingBottom: deviceDimesions.Height * 0.5 }}>
                                                    <View style={{ alignSelf: 'center' }}>
                                                        <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Family Details</H3>
                                                        {

                                                            this.state.FamilyDataEditedArr ? this.state.FamilyDataEditedArr.map((el, i) => {
                                                                return (
                                                                    <View style={{ alignSelf: 'center', width: deviceDimesions.width * 0.7, paddingBottom: deviceDimesions.Height * 0.05 }} key={el.id}>
                                                                        <Text style={{ paddingTop: deviceDimesions.Height * 0.02, marginBottom: -deviceDimesions.Height * 0.03 }}>Relation-</Text>
                                                                        <SignupDropDownFullWidthWithSearch
                                                                            selectedPickerValue={el.parent_type ? el.parent_type.name : "Relation"}
                                                                            onChangeHandler={(index, item) => this.OnFamilyDetailsChange("member_type", item)}
                                                                            staticLable={'Relation'}
                                                                            itemSeparatorStyle
                                                                            containerWidth={deviceDimesions.width * 0.7}
                                                                            pickerWidth={deviceDimesions.width * 0.65}
                                                                            pickerDataArr={[{ id: 1, name: "Father" }, { id: 2, name: "Mother" }, { id: 3, name: "Brother" }, { id: 4, name: "Sister" }, { id: "", name: "" }]}
                                                                        />

                                                                        <Text style={{ paddingVertical: deviceDimesions.Height * 0.02 }}>Name -</Text>
                                                                        <NeuBorderView
                                                                            height={50}
                                                                            width={deviceDimesions.width * 0.7}
                                                                            borderRadius={20}
                                                                            color="#ffffff"
                                                                        >
                                                                            <TextInput placeholder="Member Name" onChangeText={(text) => this.OnFamilyDetailsChange("name", text)} value={el.name} style={{ width: deviceDimesions.width * 0.6 }} />
                                                                        </NeuBorderView>

                                                                        <Text style={{ paddingTop: deviceDimesions.Height * 0.02, marginBottom: -deviceDimesions.Height * 0.03 }}>Is Working -</Text>
                                                                        <SignupDropDownFullWidthWithSearch
                                                                            selectedPickerValue={el.work_status ? el.work_status.name : "Work Status"}
                                                                            onChangeHandler={(index, item) => this.OnFamilyDetailsChange("work_status", item)}
                                                                            staticLable={'Work Status'}
                                                                            itemSeparatorStyle
                                                                            containerWidth={deviceDimesions.width * 0.7}
                                                                            pickerWidth={deviceDimesions.width * 0.65}
                                                                            pickerDataArr={this.state.WorkStatusArr}
                                                                        />
                                                                        {typeof (el.work_status) == "object" && el.work_status.id != 0 ?
                                                                            <>
                                                                                <Text style={{ paddingVertical: deviceDimesions.Height * 0.02 }}>Working In -</Text>
                                                                                <NeuBorderView
                                                                                    height={50}
                                                                                    width={deviceDimesions.width * 0.7}
                                                                                    borderRadius={20}
                                                                                    color="#ffffff"
                                                                                >
                                                                                    <TextInput placeholder="Working In" onChangeText={(text) => this.OnFamilyDetailsChange("working_in", text)} value={el.working_in} style={{ width: deviceDimesions.width * 0.6 }} />
                                                                                </NeuBorderView>
                                                                                <Text style={{ paddingVertical: deviceDimesions.Height * 0.02 }}>Designation -</Text>
                                                                                <NeuBorderView
                                                                                    height={50}
                                                                                    width={deviceDimesions.width * 0.7}
                                                                                    borderRadius={20}
                                                                                    color="#ffffff"
                                                                                >
                                                                                    <TextInput placeholder="Member Designation" onChangeText={(text) => this.OnFamilyDetailsChange("designation", text)} value={el.designation} style={{ width: deviceDimesions.width * 0.6 }} />
                                                                                </NeuBorderView>
                                                                            </>
                                                                            : null
                                                                        }
                                                                    </View>
                                                                )
                                                            })
                                                                :
                                                                null
                                                        }
                                                    </View>
                                                </ScrollView>
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                    <NeuButton
                                                        color="#ffc115"
                                                        borderRadius={10}
                                                        noShadow
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.SaveFamilyDetails()}
                                                    >
                                                        {
                                                            !this.state.isFormSubmitting ?
                                                                <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                :
                                                                <Flow size={14} />
                                                        }
                                                    </NeuButton>

                                                    <NeuButton from={this.touchable}
                                                        color="#ffffff"
                                                        borderRadius={10}
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.setState({ ShowExistingFamilyMemberEditableModal: false })}
                                                    >
                                                        <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                    </NeuButton>

                                                </View>
                                            </View>
                                        </View>

                                    </Modal>


                                </View>
                                {/* Astro Details */}
                                {this.state.userData.religion == "Hindu" ?
                                    <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Icon name="user" />
                                                <Text style={{ fontSize: 18, fontWeight: "700", fontWeight: "bold" }}> Astro Details</Text>
                                            </View>
                                            <View style={{ alignItems: "center" }}>
                                                <NeuButton
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.09}
                                                    height={deviceDimesions.Height * 0.05}
                                                    borderRadius={20}
                                                    onPress={() => this.setState({ starsDetails: true })}
                                                >
                                                    <Icon name="pencil-alt" color="#f86728" />
                                                </NeuButton>
                                                <Modal animationType="slide"
                                                    transparent={true}
                                                    visible={this.state.starsDetails}
                                                    onBackdropPress={() => this.setState({ starsDetails: false })}
                                                    onRequestClose={() => {
                                                        this.setState({ starsDetails: false })
                                                    }}
                                                >
                                                    <View style={styles.starsview}>
                                                        <View style={styles.starstyledView}>
                                                            <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Astro Details</H3>
                                                            <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always">
                                                                <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                    <Text>Time Of Birth</Text>
                                                                </View>
                                                                <View style={{ marginTop: deviceDimesions.Height * 0.04, alignItems: 'center' }}>
                                                                    <TouchableOpacity style={{ padding: 5 }} onPress={() => this.setState({ showTimePicker: true })}>
                                                                        <NeuBorderView
                                                                            active
                                                                            height={50}
                                                                            width={deviceDimesions.width * 0.7}
                                                                            color="#ffffff"
                                                                            borderRadius={20}
                                                                            containerStyle={{
                                                                                flexDirection: "row",
                                                                                justifyContent: "space-between",
                                                                                paddingHorizontal: deviceDimesions.width * 0.05
                                                                            }}
                                                                        >
                                                                            <Text>{!this.state.TimeOfBirth ? 'Time Of Birth' : typeof (this.state.TimeOfBirth) == "string" ? this.state.TimeOfBirth.slice(0, 5) : this.state.TimeOfBirth.toTimeString().slice(0, 5)}</Text>
                                                                        </NeuBorderView>
                                                                    </TouchableOpacity>
                                                                    {this.state.showTimePicker &&
                                                                        <DateTimePicker
                                                                            value={!this.state.TimeOfBirth ? new Date() : typeof (this.state.TimeOfBirth) == "string" ? new Date() : this.state.TimeOfBirth}
                                                                            mode="time"
                                                                            onChange={(event, date) => this.setState({ TimeOfBirth: date, showTimePicker: false })}
                                                                            is24Hour={false}
                                                                            minimumDate={new Date()}
                                                                            maximumDate={new Date()}
                                                                        />
                                                                    }
                                                                </View>

                                                                <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                    <Text>Birth Star</Text>
                                                                </View>
                                                                <SignupDropDownFullWidthWithSearch
                                                                    selectedPickerValue={this.state.selectedStar ? this.state.selectedStar.name : ' Birth Star'}
                                                                    onChangeHandler={(index, item) => this.onBirthStarChange(item)}
                                                                    staticLable="Birth Star"
                                                                    containerWidth={deviceDimesions.width * 0.7}
                                                                    pickerWidth={deviceDimesions.width * 0.65}
                                                                    pickerDataArr={this.state.starlist}
                                                                />

                                                                <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                    <Text>Sun Sign</Text>
                                                                </View>
                                                                <SignupDropDownFullWidthWithSearch
                                                                    selectedPickerValue={this.state.selectedSunSign ? this.state.selectedSunSign.name : 'Sun Sign'}
                                                                    onChangeHandler={(index, item) => this.onSunSignChange(item)}
                                                                    staticLable="Sun Sign"
                                                                    containerWidth={deviceDimesions.width * 0.7}
                                                                    pickerWidth={deviceDimesions.width * 0.65}
                                                                    pickerDataArr={this.state.SunsignArr}
                                                                />

                                                                <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                    <Text>City Of Birth</Text>
                                                                </View>
                                                                <View style={{ marginTop: deviceDimesions.Height * 0.04, alignSelf: 'center' }}>
                                                                    <TouchableOpacity style={{ padding: 5 }} onPress={() => this.setState({ showTiemPicker: false, showCityOfBirthModal: true })}>
                                                                        <NeuBorderView
                                                                            active
                                                                            height={50}
                                                                            width={deviceDimesions.width * 0.7}
                                                                            color="#ffffff"
                                                                            borderRadius={20}
                                                                            containerStyle={{
                                                                                flexDirection: "row",
                                                                                justifyContent: "space-between",
                                                                                paddingHorizontal: deviceDimesions.width * 0.05
                                                                            }}
                                                                        >
                                                                            <Text>{!this.state.CityOfBirth ? 'Select City Of Birth' : this.state.CityOfBirth.name}</Text>
                                                                        </NeuBorderView>
                                                                    </TouchableOpacity>
                                                                    <Modal
                                                                        animationType="slide"
                                                                        transparent={true}
                                                                        visible={this.state.showCityOfBirthModal}
                                                                        onBackdropPress={() => this.setState({ showCityOfBirthModal: false })}
                                                                        onRequestClose={() => {
                                                                            this.setState({ showCityOfBirthModal: false })
                                                                        }}
                                                                    >
                                                                        <View style={styles.centeredViewLocation}>
                                                                            <View style={styles.modalViewLocation}>
                                                                                <TouchableHighlight onPressIn={() => this.setState({ showTiemPicker: false, showCityOfBirthModal: false })} style={{ position: 'absolute', right: 0, paddingHorizontal: deviceDimesions.width * 0.03, paddingVertical: deviceDimesions.width * 0.02 }}>
                                                                                    <Text style={{ fontSize: 16, color: 'orange' }}>X</Text>
                                                                                </TouchableHighlight>
                                                                                <AutoCompleteInput placeHolder="Enter City of birth" value={!this.state.CityOfBirth ? '' : this.state.CityOfBirth.name} data={this.state.LocationData} onChangeText={(text) => this.onCityOfBirthChange(text)} renderOptions={(el) => this._renderCityOptions(el)} />
                                                                            </View>
                                                                        </View>
                                                                    </Modal>

                                                                </View>

                                                                <View style={{ width: deviceDimesions.width * 0.7, alignSelf: 'center', marginBottom: -20, marginTop: 20 }}>
                                                                    <Text>Matching Stars</Text>
                                                                </View>
                                                                <View style={{ marginTop: deviceDimesions.Height * 0.04, alignSelf: 'center' }}>
                                                                    <TouchableOpacity style={{ padding: 5 }} onPress={() => this.setState({ showTiemPicker: false, showMatchingStarsModal: true })}>
                                                                        <NeuBorderView
                                                                            active
                                                                            height={50}
                                                                            width={deviceDimesions.width * 0.7}
                                                                            color="#ffffff"
                                                                            borderRadius={20}
                                                                            containerStyle={{
                                                                                flexDirection: "row",
                                                                                justifyContent: "space-between",
                                                                                paddingHorizontal: deviceDimesions.width * 0.05
                                                                            }}
                                                                        >
                                                                            <Text>{this.state.selectedMatchingStars !== null ? this.state.selectedMatchingStars.map((el, i) => { return el.name }).toString().slice(0, 35) + "..." : 'Select Matching Stars'}</Text>
                                                                        </NeuBorderView>
                                                                    </TouchableOpacity>
                                                                    <Modal
                                                                        animationType="slide"
                                                                        transparent={true}
                                                                        visible={this.state.showMatchingStarsModal}
                                                                        onBackdropPress={() => this.setState({ showMatchingStarsModal: false })}
                                                                        onRequestClose={() => {
                                                                            this.setState({ showMatchingStarsModal: false })
                                                                        }}
                                                                    >
                                                                        <View style={styles.centeredViewLocation}>
                                                                            <View style={styles.modalViewLocation}>
                                                                                <ScrollView contentContainerStyle={{ width: deviceDimesions.width * 0.8, backgroundColor: "#ffffff", padding: deviceDimesions.width * 0.02, borderRadius: 10 }}>
                                                                                    {
                                                                                        this.state.starlist.map((el, i) => {
                                                                                            return (
                                                                                                <TouchableOpacity
                                                                                                    onPress={() => this.onMatchingStarSelectUnselect(el, i)}
                                                                                                    style={{ paddingHorizontal: deviceDimesions.Height * 0.015, paddingVertical: deviceDimesions.width * 0.025, flexDirection: 'row', width: deviceDimesions.width * 0.8 }}>
                                                                                                    <View style={{ alignItems: 'center' }}>
                                                                                                        <Text style={{ color: el.isChecked ? "red" : "#000", fontSize: 15 }}>{el.name}</Text>
                                                                                                    </View>
                                                                                                </TouchableOpacity>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </ScrollView>
                                                                                <View style={{ alignItems: 'center', backgroundColor: "#ffffff", paddingVertical: deviceDimesions.Height * 0.01 }}>
                                                                                    <NeuButton
                                                                                        width={deviceDimesions.width * 0.5}
                                                                                        height={deviceDimesions.Height * 0.05}
                                                                                        color="#ffffff"
                                                                                        borderRadius={10}
                                                                                        onPress={() => this.OnSaveMatchingStarsPress()}
                                                                                    >
                                                                                        <Text>Save</Text>
                                                                                    </NeuButton>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </Modal>

                                                                </View>

                                                                <View style={{ marginVertical: deviceDimesions.Height * 0.05, alignSelf: 'center', width: deviceDimesions.width * 0.7, flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                    <View style={{ alignItems: 'center' }}>
                                                                        <Text style={{ marginVertical: deviceDimesions.Height * 0.015 }}>Chovva Dosham</Text>
                                                                        <NeuButton
                                                                            color="#ffffff"
                                                                            height={deviceDimesions.Height * 0.04}
                                                                            width={deviceDimesions.width * 0.08}
                                                                            borderRadius={10}
                                                                            onPress={() => this.setState({ showTimePicker: false, IsChovvaDosham: !this.state.IsChovvaDosham, IsSudhaJathakam: false })}
                                                                        >
                                                                            {
                                                                                this.state.IsChovvaDosham && !this.state.IsSudhaJathakam ? <Icon name="check" color="red" /> : null
                                                                            }

                                                                        </NeuButton>
                                                                    </View>
                                                                    <View style={{ alignItems: 'center' }}>
                                                                        <Text style={{ marginVertical: deviceDimesions.Height * 0.015 }}>Shudha Jathakam</Text>
                                                                        <NeuButton
                                                                            color="#ffffff"
                                                                            height={deviceDimesions.Height * 0.04}
                                                                            width={deviceDimesions.width * 0.08}
                                                                            borderRadius={10}
                                                                            onPress={() => this.setState({ showTimePicker: false, IsSudhaJathakam: !this.state.IsSudhaJathakam, IsChovvaDosham: false })}
                                                                        >
                                                                            {
                                                                                this.state.IsSudhaJathakam && !this.state.IsChovvaDosham ? <Icon name="check" color="red" /> : null
                                                                            }

                                                                        </NeuButton>
                                                                    </View>
                                                                </View>
                                                            </ScrollView>
                                                            <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                                <NeuButton
                                                                    color="#ffc115"
                                                                    borderRadius={10}
                                                                    noShadow
                                                                    width={deviceDimesions.width * 0.3}
                                                                    height={deviceDimesions.Height * 0.06}
                                                                    onPress={() => this.onAstroDetailsSubmit()}
                                                                >
                                                                    {
                                                                        !this.state.isFormSubmitting ?
                                                                            <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                            :
                                                                            <Flow size={14} />
                                                                    }
                                                                </NeuButton>
                                                                <NeuButton
                                                                    onPress={() => this.setState({ showTimePicker: false, starsDetails: false })}
                                                                    color="#ffffff"
                                                                    borderRadius={10}
                                                                    width={deviceDimesions.width * 0.3}
                                                                    height={deviceDimesions.Height * 0.06}
                                                                >
                                                                    <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                                </NeuButton>


                                                            </View>
                                                        </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                        <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.045}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="star" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ color: "green", paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Star is -</Text>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.02, opacity: 0.7 }}>{this.state.AstroDetailsArr ? this.state.AstroDetailsArr.birth_star : ''}</Text>

                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.045}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="clock" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Time of Birth -</Text>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.02, opacity: 0.7 }}>{this.state.AstroDetailsArr ? this.state.AstroDetailsArr.time_of_birth : ''}</Text>

                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.045}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="city" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>City Of Birth -</Text>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.02, opacity: 0.7 }}>{this.state.AstroDetailsArr ? this.state.AstroDetailsArr.city_of_birth : ''}</Text>

                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.045}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="briefcase" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ color: "green", paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Chovva Dosham -</Text>
                                                <View style={{ marginLeft: deviceDimesions.width * 0.05 }}>
                                                    <NeuView
                                                        color="#ffffff"
                                                        borderRadius={5}
                                                        width={deviceDimesions.width * 0.06}
                                                        height={deviceDimesions.Height * 0.03}
                                                    >
                                                        {
                                                            this.state.AstroDetailsArr.chovva_dosham == "Yes" ? <Icon name="check" color="red" /> : <Icon name="check" color="#666666" />
                                                        }
                                                    </NeuView>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.045}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="briefcase" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ color: "green", paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}> Shudha Jathakam -</Text>
                                                <View style={{ marginLeft: deviceDimesions.width * 0.05 }}>
                                                    <NeuView
                                                        color="#ffffff"
                                                        borderRadius={5}
                                                        width={deviceDimesions.width * 0.06}
                                                        height={deviceDimesions.Height * 0.03}
                                                    >
                                                        {
                                                            this.state.AstroDetailsArr.shudha_jathakam == "Yes" ? <Icon name="check" color="red" /> : <Icon name="check" color="#666666" />
                                                        }
                                                    </NeuView>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.045}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="briefcase" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ paddingHorizontal: deviceDimesions.width * 0.05 }}>Matching stars </Text>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.02, opacity: 0.7, width: deviceDimesions.width * 0.5, alignSelf: 'center' }}>{this.state.AstroDetailsArr && this.state.AstroDetailsArr.matching_stars ? this.state.AstroDetailsArr.matching_stars.length > 40 ? this.state.AstroDetailsArr.matching_stars.slice(0.20) + '...' : this.state.AstroDetailsArr.matching_stars : ''}</Text>

                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02 }}>
                                                <NeuBorderView
                                                    color="#ffffff"
                                                    width={deviceDimesions.width * 0.08}
                                                    height={deviceDimesions.Height * 0.045}
                                                    borderRadius={20}
                                                >
                                                    <Icon name="sun" color="orange" size={16} />
                                                </NeuBorderView>
                                                <Text style={{ paddingHorizontal: deviceDimesions.width * 0.05 }}>Sun Sign   </Text>
                                                <Text style={{ marginLeft: deviceDimesions.width * 0.02, opacity: 0.7 }}>{this.state.AstroDetailsArr ? this.state.AstroDetailsArr.sun_sign : ''}</Text>
                                            </View>
                                            {this.state.userData && this.state.userData.horoscope ?
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-evenly', width: deviceDimesions.width * 0.9, alignItems: 'center' }}>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({ showCustomImagePicker: true })}
                                                        style={{ borderWidth: 0.7, borderColor: "orange", width: deviceDimesions.width * 0.35, height: deviceDimesions.Height * 0.05, elevation: 2, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#ffffff" }}>
                                                        {
                                                            this.state.isFormSubmitting ?
                                                                <Flow size={12} />
                                                                :
                                                                <Text style={{ color: "orange" }}>Update Horoscope</Text>
                                                        }

                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({ ViewHoroscopeModal: true })}
                                                        style={{ width: deviceDimesions.width * 0.35, alignItems: "center" }}
                                                    >
                                                        <Text style={{ color: "orange" }}>View Horoscope</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.9, alignSelf: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({ showCustomImagePicker: true })}
                                                        style={{ borderWidth: 0.7, borderColor: "orange", width: deviceDimesions.width * 0.35, height: deviceDimesions.Height * 0.05, elevation: 2, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#ffffff" }}>
                                                        {
                                                            this.state.isFormSubmitting ?
                                                                <Flow size={12} />
                                                                :
                                                                <Text style={{ color: "orange" }}>Update Horoscope</Text>
                                                        }

                                                    </TouchableOpacity>
                                                </View>
                                            }
                                            <CustomImagePicker
                                                pickerMode='image'
                                                pickerTitle="Upload Image"
                                                CaptureImage={() => { this.ImageCapture() }}
                                                UploadImage={() => { this.ImagePick() }}
                                                UploadImageFromFacebook={() => null}
                                                showImagePicker={this.state.showCustomImagePicker}
                                                onPressOut={() => { this.setState({ showCustomImagePicker: false }) }}
                                            />
                                            <Modal animationType="slide"
                                                transparent={true}
                                                visible={this.state.ViewHoroscopeModal}
                                                onBackdropPress={() => this.setState({ ViewHoroscopeModal: false })}
                                                onRequestClose={() => {
                                                    this.setState({ ViewHoroscopeModal: false })
                                                }}
                                            >
                                                <View style={styles.centeredView}>
                                                    <View style={styles.modalView}>
                                                        <TouchableHighlight onPressIn={() => this.setState({ ViewHoroscopeModal: false })} style={{ position: 'absolute', right: 0, paddingHorizontal: deviceDimesions.width * 0.05, paddingVertical: deviceDimesions.width * 0.02 }}>
                                                            <Text style={{ fontSize: 16 }}>X</Text>
                                                        </TouchableHighlight>
                                                        <Image style={{ width: deviceDimesions.width * 0.85, height: deviceDimesions.Height * 0.5 }} source={this.state.userData && this.state.userData.horoscope ? { uri: BaseURL.DemoURL + this.state.userData.horoscope } : null} />
                                                    </View>
                                                </View>
                                            </Modal>
                                            {/*  */}
                                        </View>
                                    </View>
                                    : null}
                                {/* Hobbies & Interests */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.03 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: deviceDimesions.width * 0.9, marginBottom: deviceDimesions.Height * 0.03 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon name="user" />
                                            <Text style={{ fontSize: 18, fontWeight: "700" }}> Hobbies & Interest</Text>
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <NeuButton
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.09}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => { this.setState({ showUpdateHobbiesAndInterestModal: true }) }}
                                            >
                                                <Icon name="pencil-alt" color="#f86728" />
                                            </NeuButton>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceDimesions.width * 0.9, alignSelf: "center", alignItems: "flex-start" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="life-ring" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Hobbies -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.UserHobbiesAndInterests !== null && this.state.UserHobbiesAndInterests.hobby ? this.state.UserHobbiesAndInterests.hobby.toString() : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="infinity" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Interest -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.UserHobbiesAndInterests !== null && this.state.UserHobbiesAndInterests.interest ? this.state.UserHobbiesAndInterests.interest.toString() : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="itunes-note" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Music -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.UserHobbiesAndInterests !== null && this.state.UserHobbiesAndInterests.music ? this.state.UserHobbiesAndInterests.music.toString() : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="book" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Books -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.UserHobbiesAndInterests !== null && this.state.UserHobbiesAndInterests.books ? this.state.UserHobbiesAndInterests.books.toString() : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="film" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Movie -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.UserHobbiesAndInterests !== null && this.state.UserHobbiesAndInterests.movie ? this.state.UserHobbiesAndInterests.movie.toString() : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="football-ball" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Sports -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.UserHobbiesAndInterests !== null && this.state.UserHobbiesAndInterests.sports ? this.state.UserHobbiesAndInterests.sports.toString() : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="utensil-spoon" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Cuisine -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.UserHobbiesAndInterests !== null && this.state.UserHobbiesAndInterests.cuisine ? this.state.UserHobbiesAndInterests.cuisine.toString() : "null"}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: deviceDimesions.Height * 0.02 }}>
                                            <NeuBorderView
                                                color="#ffffff"
                                                width={deviceDimesions.width * 0.08}
                                                height={deviceDimesions.Height * 0.045}
                                                borderRadius={20}
                                            >
                                                <Icon name="tshirt" color="orange" size={16} />
                                            </NeuBorderView>
                                            <Text style={{ paddingLeft: deviceDimesions.width * 0.05, paddingRight: deviceDimesions.width * 0.02, fontSize: 16, fontWeight: "600" }}>Dress -</Text>
                                            <Text style={{ opacity: 0.7, width: deviceDimesions.width * 0.6 }}>{this.state.UserHobbiesAndInterests !== null && this.state.UserHobbiesAndInterests.dress ? this.state.UserHobbiesAndInterests.dress.toString() : "null"}</Text>
                                        </View>
                                    </View>
                                    <Modal animationType="slide"
                                        transparent={true}
                                        visible={this.state.showUpdateHobbiesAndInterestModal}
                                        onBackdropPress={() => this.setState({ showUpdateHobbiesAndInterestModal: false })}
                                        onRequestClose={() => {
                                            this.setState({ showUpdateHobbiesAndInterestModal: false })
                                        }}
                                    >
                                        <View style={styles.CenteredKnowMeBetterView}>
                                            <View style={styles.ModalKnowMeBetterView}>
                                                <H3 style={{ alignSelf: 'center', marginVertical: deviceDimesions.Height * 0.02, fontWeight: "bold" }}>Hobbies & Interest</H3>
                                                <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always" style={{ paddingBottom: deviceDimesions.Height * 0.5 }}>
                                                    <View style={{ width: deviceDimesions.width * 0.8, alignSelf: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: deviceDimesions.Height * 0.03 }}>Hobbies -</Text>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.015, flexWrap: 'wrap', flexDirection: 'row' }}>
                                                            {
                                                                this.state.AllHobbiesParamsArr.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity onPress={() => this.OnHobbiesElementChange(i, 'AllHobbiesParamsArr')} key={el.id} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                                            <View style={{ backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.05, borderRadius: 5, elevation: 5 }}>
                                                                                {el.isChecked ? <Icon name="check" color="red" /> : null}
                                                                            </View>
                                                                          
                                                                            <Text style={{ marginLeft: 5, }}>{el.value}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.8, alignSelf: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: deviceDimesions.Height * 0.03 }}>Interest -</Text>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.015, flexWrap: 'wrap', flexDirection: 'row' }}>
                                                            {
                                                                this.state.AllInterestParamsArr.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity onPress={() => this.OnHobbiesElementChange(i, 'AllInterestParamsArr')} key={el.id} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                                            <View style={{ backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.05, borderRadius: 5, elevation: 5 }}>
                                                                                {el.isChecked ? <Icon name="check" color="red" /> : null}
                                                                            </View>
                                                                          
                                                                            <Text style={{ marginLeft: 5, }}>{el.value}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.8, alignSelf: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: deviceDimesions.Height * 0.03 }}>Music -</Text>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.015, flexWrap: 'wrap', flexDirection: 'row' }}>
                                                            {
                                                                this.state.AllMusicParamsArr.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity onPress={() => this.OnHobbiesElementChange(i, 'AllMusicParamsArr')} key={el.id} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                                            <View style={{ backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.05, borderRadius: 5, elevation: 5 }}>
                                                                                {el.isChecked ? <Icon name="check" color="red" /> : null}
                                                                            </View>
                                                                           
                                                                            <Text style={{ marginLeft: 5, }}>{el.value}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.8, alignSelf: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: deviceDimesions.Height * 0.03 }}>Books -</Text>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.015, flexWrap: 'wrap', flexDirection: 'row' }}>
                                                            {
                                                                this.state.AllBooksParamsArr.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity onPress={() => this.OnHobbiesElementChange(i, 'AllBooksParamsArr')} key={el.id} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                                            <View style={{ backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.05, borderRadius: 5, elevation: 5 }}>
                                                                                {el.isChecked ? <Icon name="check" color="red" /> : null}
                                                                            </View>
                                                                          
                                                                            <Text style={{ marginLeft: 5, }}>{el.value}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.8, alignSelf: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: deviceDimesions.Height * 0.03 }}>Movies -</Text>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.015, flexWrap: 'wrap', flexDirection: 'row' }}>
                                                            {
                                                                this.state.AllMovieParamsArr.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity onPress={() => this.OnHobbiesElementChange(i, 'AllMovieParamsArr')} key={el.id} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                                            <View style={{ backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.05, borderRadius: 5, elevation: 5 }}>
                                                                                {el.isChecked ? <Icon name="check" color="red" /> : null}
                                                                            </View>
                                                                           
                                                                            <Text style={{ marginLeft: 5, }}>{el.value}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.8, alignSelf: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: deviceDimesions.Height * 0.03 }}>Sports -</Text>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.015, flexWrap: 'wrap', flexDirection: 'row' }}>
                                                            {
                                                                this.state.AllSportsParamsArr.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity onPress={() => this.OnHobbiesElementChange(i, 'AllSportsParamsArr')} key={el.id} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                                            <View style={{ backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.05, borderRadius: 5, elevation: 5 }}>
                                                                                {el.isChecked ? <Icon name="check" color="red" /> : null}
                                                                            </View>
                                                                           
                                                                            <Text style={{ marginLeft: 5, }}>{el.value}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.8, alignSelf: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: deviceDimesions.Height * 0.03 }}>Cuisine -</Text>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.015, flexWrap: 'wrap', flexDirection: 'row' }}>
                                                            {
                                                                this.state.AllCuisineParamsArr.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity onPress={() => this.OnHobbiesElementChange(i, 'AllCuisineParamsArr')} key={el.id} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                                            <View style={{ backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.05, borderRadius: 5, elevation: 5 }}>
                                                                                {el.isChecked ? <Icon name="check" color="red" /> : null}
                                                                            </View>
                                                                           
                                                                            <Text style={{ marginLeft: 5, }}>{el.value}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{ width: deviceDimesions.width * 0.8, alignSelf: 'center' }}>
                                                        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: deviceDimesions.Height * 0.03 }}>Dress -</Text>
                                                        <View style={{ marginTop: deviceDimesions.Height * 0.015, flexWrap: 'wrap', flexDirection: 'row' }}>
                                                            {
                                                                this.state.AllDressParamsArr.map((el, i) => {
                                                                    return (
                                                                        <TouchableOpacity onPress={() => this.OnHobbiesElementChange(i, 'AllDressParamsArr')} key={el.id} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                                                            <View style={{ backgroundColor: "#ffffff", justifyContent: 'center', alignItems: 'center', height: deviceDimesions.Height * 0.035, width: deviceDimesions.width * 0.05, borderRadius: 5, elevation: 5 }}>
                                                                                {el.isChecked ? <Icon name="check" color="red" /> : null}
                                                                            </View>
                                                                            
                                                                            <Text style={{ marginLeft: 5, }}>{el.value}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                </ScrollView>
                                                <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: 'row-reverse', justifyContent: 'space-between', width: deviceDimesions.width * 0.7, alignSelf: 'center' }}>
                                                    <NeuButton
                                                        color="#ffc115"
                                                        borderRadius={10}
                                                        noShadow
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => { this.SaveHobbiesAndInterest() }}
                                                    >
                                                        {
                                                            !this.state.isFormSubmitting ?
                                                                <Text style={{ color: '#ffffff', fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Save</Text>
                                                                :
                                                                <Flow size={14} />
                                                        }
                                                    </NeuButton>

                                                    <NeuButton from={this.touchable}
                                                        color="#ffffff"
                                                        borderRadius={10}
                                                        width={deviceDimesions.width * 0.3}
                                                        height={deviceDimesions.Height * 0.06}
                                                        onPress={() => this.setState({ showUpdateHobbiesAndInterestModal: false })}
                                                    >
                                                        <Text style={{ fontSize: 15, fontFamily: "700", fontWeight: "bold" }}>Cancel</Text>
                                                    </NeuButton>

                                                </View>
                                            </View>
                                        </View>

                                    </Modal>

                                </View>

                                {/* Trust Badges Button */}
                                <View style={{ marginTop: deviceDimesions.Height * 0.06, alignSelf: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => goToTrustBadgesSliderScreen()}
                                        style={{ backgroundColor: "#ff751a", paddingHorizontal: deviceDimesions.width * 0.05, paddingVertical: deviceDimesions.Height * 0.02, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "600", color: "#ffffff" }}>Add Trust Badges</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </ScrollView>
                }
                {/* Confirmation modal to save data */}
                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.confirmChangesModal}
                    onRequestClose={() => { this.setState({ confirmChangesModal: !this.state.modalOpen }) }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ alignItems: "center", marginTop: deviceDimesions.Height * 0.01 }}>
                                <H3>Hi Ahana</H3>
                                <Text>Are you sure about the changes ?</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: deviceDimesions.Height * 0.03 }}>
                                <View>
                                    <NeuButton
                                        color="#ff8533"
                                        width={deviceDimesions.width * 0.35}
                                        height={deviceDimesions.Height * 0.07}
                                        onPress={() => this.setState({ confirmChangesModal: false })}
                                        borderRadius={20}
                                        noShadow
                                        containerStyle={{
                                        }}
                                    >
                                        <Text style={{ color: "#ffffff" }}>Yes</Text>
                                    </NeuButton>
                                </View>
                                <View>
                                    <NeuButton
                                        color="#ffffff"
                                        width={deviceDimesions.width * 0.35}
                                        height={deviceDimesions.Height * 0.07}
                                        onPress={() => this.setState({ confirmChangesModal: false })}
                                        borderRadius={20}
                                        containerStyle={{
                                        }}
                                    >
                                        <Text>No</Text>
                                    </NeuButton>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Location Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showLocationModal}
                    onBackdropPress={() => this.setState({ showLocationModal: false })}
                    onRequestClose={() => {
                        this.setState({ showLocationModal: false })
                    }}
                >
                    <View style={styles.centeredViewLocation}>
                        <View style={styles.modalViewLocation}>
                            <TouchableHighlight onPressIn={() => this.setState({ showLocationModal: false, isCurrentLocation: false })} style={{ position: 'absolute', right: 0, borderWidth: 0.4, borderRadius: 30, paddingHorizontal: deviceDimesions.width * 0.03, paddingVertical: deviceDimesions.width * 0.02 }}>
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
        width: deviceDimesions.width,
        backgroundColor: "#ffffff"
    },
    profilePicturePercentContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: -deviceDimesions.Height * 0.01
    },
    profilePicturePercentText: {
        fontWeight: "bold",
        fontSize: 12,
        width: deviceDimesions.width * 0.1,
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ' rgba(255,255,255,0.4)'
    },
    modalView: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.5,
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
    // Know me better styling
    CenteredKnowMeBetterView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ' rgba(255,255,255,0.4)'
    },
    ModalKnowMeBetterView: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.8,
        paddingVertical: deviceDimesions.Height * 0.04,
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
    ModalKnowMeBetterViewIncome: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.3,
        paddingVertical: deviceDimesions.Height * 0.04,
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
    ModalKnowMeBetterViewFamilyStatus: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.5,
        paddingVertical: deviceDimesions.Height * 0.04,
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
    ModalKnowMeBetterViewFamilyDetails: {

        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.7,
        paddingVertical: deviceDimesions.Height * 0.04,
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
    ModalKnowMeBetterViewAnnualIncome: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.9,
        paddingVertical: deviceDimesions.Height * 0.04,
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
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    modelView: {
        width: deviceDimesions.width * 0.9,
        height: deviceDimesions.Height * 0.7,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: 35,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    cancleview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    cancledView: {
        width: deviceDimesions.width * 0.9,
        height: deviceDimesions.Height * 0.7,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: 35,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    overview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    overedView: {
        width: deviceDimesions.width * 0.9,
        height: deviceDimesions.Height * 0.6,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: 35,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    lifestyleview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    lifestyledView: {
        width: deviceDimesions.width * 0.9,
        height: deviceDimesions.Height * 0.4,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: 35,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    starsview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    starstyledView: {
        width: deviceDimesions.width * 0.9,
        height: deviceDimesions.Height * 0.7,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: 35,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredViewLocation: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    modalViewLocation: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        height: deviceDimesions.Height * 0.6,
        padding: deviceDimesions.width * 0.04,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }

})
