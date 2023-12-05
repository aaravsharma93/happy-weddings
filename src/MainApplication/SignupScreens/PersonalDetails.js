// PersonalDetails

import { H3, View } from 'native-base';
import React from 'react';
import { Alert, BackHandler, Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToAstroInformationSignScreen, goToLoginScreen, goToPreviousScreen, goToVerifyMobileNumberSignScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import ToggleSwitch from 'toggle-switch-react-native'
import CentralizedTextInput from '../../component/CentralizedTextInput/CentralizedTextInput';
import SimpleTextInput from '../../component/SimpleTextInput/SimpleTextInput';
import MobileNumberWithCountryCodeInput from '../../component/MobileNumberWithCountryCodeInput/MobileNumberWithCountryCodeInput';
import ToggleButtonForPicker from '../../component/ToggleButtonForPicker/ToggleButtonForPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SignupDropDownFullWidth, SignupDropDownFullWidthWithSearch } from '../../component/SignupDropDownFullWidth/SignupDropDownFullWidth';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import { ImageBackground } from 'react-native';
import RangeSliderForSignup from '../../component/RangeSliderForSignup/RangeSliderForSignup';
import { Picker } from '@react-native-picker/picker';
import { GetAllMaritalStatus, GetAllMotherTongue, GetAllNationality, GetAnnualIncomeOptions, GetEducationLevel, GetEmploymentTypeListing, GetFieldOfStudy, GetHeight, GetJobTypeListing, RegistrationStep2, UpdateCareer, UpdateEducation } from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default class PersonalDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            LoaderProperties : {
                isLoading : false,
                LoadingTitle : ""
            },
            Authorization : AsyncStorage.getItem('auth_token_registration'),
            // Dropdown Options
            MotherTongue : "Mother Tongue",
            Nationality : "Nationality",
            MaritalStatus : "Marital Status",
            AnnualIncome : "Annual Income",
            EducationLable : 'Highest Education',
            workExperienceLable : "Employed",
            JobType : '',
            EmploymentType : '',

            // Range
            Height : 0,
            Weight : 0,

            notWorkingChecked : false,
            isEmployedModalOpen : false,
            isEducationModalOpen : false,
            passingYearArr : [],
            PassingYear : "Passing Year",
            isPursuing : false,

            // 
            SelectedEducationLevel : "Education Level",
            SelectedFieldOfStudy : "Field Of Study",

            // 
            NationalityArr : [],
            MaritalStatusArr : [],
            MotherTongueArr : [],
            EducationLevelArr : [],
            FieldOfStudyArr : [],
            AnnualIncomeOptionsArr : [],
            HeightArr : [],
            WeightArr : [],
            JobTypeListArr : [],
            EmploymentTypeListArr : [],
            ChildrenCount : "Children",
            ChildrenCountArr : [
                {
                    id : 1,
                    name : "1 Kid",
                },
                {
                    id : 2,
                    name : "2 Kids",
                },
                {
                    id : 3,
                    name : "3 Kids",
                },
                {
                    id : 4,
                    name : "4 Kids",
                },
                {
                    id : 5,
                    name : "5 Kids",
                },
                {
                    id : 6,
                    name : "6 Kids",
                },
            ],

            workExperienceSubmitted : false,
            isEducationSubmitted : false,
            selectedCollege : "",
            SelectedCourse : "",
            WorkingAs : "",
            WorkingIn : "",
            careerTo : "",
            careerFrom : "",
            signup_token : '',
        }
    }    

    ToggleLoader(name, title){
        this.setState({
              LoaderProperties : {
                  ...this.state.LoaderProperties,
                  LoadingTitle : name,
                  isLoading : title,
              }
          })
    }

        backAction = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }
        else{
            Alert.alert("", "Skip registration process?", [
                { text: "No", onPress: () => null },
                { text: "YES", onPress: () => goToLoginScreen() }
            ]);
            return true;
        }
        };  

    async componentDidMount(){
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );


        try {

            let ModifiedWeightArr = new Array();
            for (let index = 40; index < 170; index++) {
                let weightObj = {
                    id : index,
                    name : index + " kg",
                }
                ModifiedWeightArr.push(weightObj)
            }
            this.setState({WeightArr : ModifiedWeightArr})

            const currentYear = (new Date()).getFullYear();
            const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
            this.setState({passingYearArr : range(currentYear+5, currentYear - 50, -1)})
            
            const signup_token = await AsyncStorage.getItem('auth_token_registration');
            this.setState({ signup_token });
            await GetHeight(this.state.signup_token).then(res=>{
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
                this.setState({HeightArr : modifiedArr})
            })
            .catch(err=>{
                ToastAndroid.showWithGravityAndOffset(
                    `Unable to fetch data.`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            })
            await GetAllNationality(true,this.state.signup_token).then(res => {
                let response = res; 
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.country_id,
                        name : el.name
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({NationalityArr : modifiedArr})
            })
            await GetJobTypeListing(this.state.signup_token).then(res => {
                let response = res; 
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.mdesignation_id,
                        name : el.desig
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({JobTypeListArr : modifiedArr})
            })
            await GetEmploymentTypeListing(this.state.signup_token).then(res => {
                let response = res; 
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.id,
                        name : el.value
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({EmploymentTypeListArr : modifiedArr})
            })
            await GetAllMaritalStatus(true,this.state.signup_token).then(res => {
                let response = res; 
                console.log(response.data)
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
            await GetAllMotherTongue(true,this.state.signup_token).then(res => {
                let response = res; 
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.id,
                        name : el.value
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({MotherTongueArr : modifiedArr})
            })
            await GetEducationLevel(true,this.state.signup_token).then(res => {let response = res; this.setState({EducationLevelArr : response.data}, ()=>{console.log(this.state.EducationLevelArr)})})
            await GetFieldOfStudy(true,this.state.signup_token).then(res => {let response = res; this.setState({FieldOfStudyArr : response.data})})
            await GetAnnualIncomeOptions(true,this.state.signup_token).then(res => {
                let response = res; 
                let modifiedObj = {};
                let modifiedArr = [];
                response.data.map((el,i)=>{
                    modifiedObj = {
                        id : el.id,
                        name : el.value_en
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({AnnualIncomeOptionsArr : modifiedArr})
            })
        } 
        catch (error) {
                Alert.alert('Error', 'There was an error.')
        }
    }

    toggleGenderSwitch(isOnDefaultToggleSwitch){
        let iconNameOnToggle = ''
        this.state.ToggleSwitchIcon == 'user' ? iconNameOnToggle = 'pencil' : iconNameOnToggle= 'user'
        this.setState({ToggleSwitchIcon : iconNameOnToggle})
        this.setState({ isOnDefaultToggleSwitch })
    }

    onDateChange = (event, selectedDate) => {
        let selectedDateReadable = selectedDate.getDate() +'/'+ (selectedDate.getMonth()+1)+'/'+ selectedDate.getFullYear()
        this.setState({selectedDate : selectedDateReadable, showDatePicker : false, date : selectedDate})
    };

    showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    showDatepicker = () => {
        this.setState({showDatePicker : true})
    };
    
    showTimepicker = () => {
        showMode('time');
    };

    onNationalityChange(item){
        this.setState({Nationality : item})
    }

    onMotherTongueChange(item){
        this.setState({MotherTongue : item})
    }

    onHeightChange(item){
        this.setState({Height : item})
    }

    onWeightChange(item){
        this.setState({Weight : item})
    }

    onMaritalStatusChange(item){
        this.setState({MaritalStatus : item})
    }

    onChildrenCountChange(item){
        this.setState({ChildrenCount : item})
    }

    onAnnualIncomeChange(item){
        this.setState({AnnualIncome : item})
    }

    onEmploymentTypeChange(item){
        this.setState({EmploymentType : item})
    }

    onJobTypeChange(item){
        this.setState({JobType : item})
    }

    SubmitEducation = async () => {
        try{
            if(this.state.SelectedEducationLevel == "Education Level"){
                ToastAndroid.showWithGravityAndOffset(
                    `Please Choose "Education Level".`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else if(this.state.SelectedFieldOfStudy == "Field Of Study" && this.state.SelectedEducationLevel != 117 && this.state.SelectedEducationLevel != 118 ){
                ToastAndroid.showWithGravityAndOffset(
                    `Please Choose "Field Of Study".`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else if(!this.state.SelectedCourse && this.state.SelectedEducationLevel != 117 && this.state.SelectedEducationLevel != 118){
                ToastAndroid.showWithGravityAndOffset(
                    `Please Select Course.`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else if(!this.state.selectedCollege  && this.state.SelectedEducationLevel != 117 && this.state.SelectedEducationLevel != 118){
                ToastAndroid.showWithGravityAndOffset(
                    `Please Select College.`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else if(this.state.PassingYear == "Passing Year"  && this.state.SelectedEducationLevel != 117 && this.state.SelectedEducationLevel != 118){
                ToastAndroid.showWithGravityAndOffset(
                    `Please Select Passing Year.`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else{
                let reqObj = {
                    education_level : this.state.SelectedEducationLevel,
                    field_of_study : this.state.SelectedFieldOfStudy,
                    course_name : this.state.SelectedCourse,
                    passing_year : this.state.PassingYear,
                    college : this.state.selectedCollege
                }

                UpdateEducation(this.state.signup_token,reqObj)
                .then(res => {
                    let response = res;
                    console.log(response.data)
                    this.setState({isEducationModalOpen : false, isEducationSubmitted : true, EducationLable : this.state.SelectedCourse+" from "+this.state.selectedCollege})
                })
                .catch((err)=>{
                    let error = err;
                })
            }
        }
        catch{
            
        }
        
    }

    SubmitWorkExperience = async () => {
        this.setState({WorkingAs : this.state.WorkingAs.trim(), WorkingIn : this.state.WorkingIn.trim()})
        try{
            if(!this.state.WorkingAs){
                ToastAndroid.showWithGravityAndOffset(
                    `Please enter your designation in "working as".`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else if(!this.state.WorkingIn){
                ToastAndroid.showWithGravityAndOffset(
                    `Please enter organization name.`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else if(!this.state.JobType){
                ToastAndroid.showWithGravityAndOffset(
                    `Please Select Job Type.`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else if(!this.state.EmploymentType){
                ToastAndroid.showWithGravityAndOffset(
                    `Please Select Employment Type.`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                    );
            }
            else{
                let fData = new FormData();
                fData.append("career_type", this.state.WorkingAs)
                fData.append("company_name", this.state.WorkingIn)
                fData.append("career_designation", this.state.EmploymentType.id)
                fData.append('career_current', this.state.notWorkingChecked ? 0 : 1)
                UpdateCareer(this.state.signup_token,fData)
                .then(res => {
                    let response = res;
                    this.setState({isEmployedModalOpen : !this.state.isEmployedModalOpen, workExperienceSubmitted : true, workExperienceLable : "Working As "+ this.state.WorkingAs+" in "+this.state.WorkingIn})
                })
                .catch(err => {
                    let error = err;
                })
                
            }
           
        }
        catch{

        }
        
    }

    CompleteRegistrationStep2 = async () =>{
        let userReligion = await AsyncStorage.getItem('user_religion');
        if(this.state.Nationality == "Nationality"){
            ToastAndroid.showWithGravityAndOffset(
                'Choose Nationality.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(this.state.MotherTongue ==  "Mother Tongue"){
            ToastAndroid.showWithGravityAndOffset(
                'Choose mother tongue.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(this.state.MaritalStatus == "Marital Status"){
            ToastAndroid.showWithGravityAndOffset(
                'Choose marital status.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(!this.state.notWorkingChecked && !this.state.workExperienceSubmitted){
            ToastAndroid.showWithGravityAndOffset(
                'Submit your work experience.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(!this.state.isEducationSubmitted){
            ToastAndroid.showWithGravityAndOffset(
                'Submit your education details.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(this.state.Height == 0){
            ToastAndroid.showWithGravityAndOffset(
                'Choose your height.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(this.state.AnnualIncome == "Annual Income"){
            ToastAndroid.showWithGravityAndOffset(
                'Choose Annual Income',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(this.state.Weight == 0){
            ToastAndroid.showWithGravityAndOffset(
                'Choose Weight.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else{
            this.ToggleLoader("Loading...", true)
            let reqObj = {
                nationality : Number(this.state.Nationality.id),
                marital_status : Number(this.state.MaritalStatus.id),
                mother_tongue : Number(this.state.MotherTongue.id),
                height : Number(this.state.Height.id),
                weight : Number(this.state.Weight.id),
                annual_income : Number(this.state.AnnualIncome.id),
                number_of_children : this.state.MaritalStatus !== "Marital Status" && this.state.MaritalStatus.name !== "Never Married" ? 0 : Number(this.state.ChildrenCount.id)
            }

            RegistrationStep2(reqObj,this.state.signup_token)
            .then(res => {
                let response = res;
                userReligion == 7 ? goToAstroInformationSignScreen() : goToVerifyMobileNumberSignScreen();
                this.ToggleLoader("", false)
            })
            .catch(err => {
                let error = err;
                this.ToggleLoader("", false)
            })
        }
    }
    
  render(){
    return(
      <View style={styles.container}>
            <StatusBar
                backgroundColor = "rgba(0,0,0,0)"
                barStyle = "dark-content"
            />
           {/* Loader */}
           <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText = {this.state.LoaderProperties.LoadingTitle} />

            {/* Screen Content */}
            <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps = "always" persistentScrollbar={true} contentContainerStyle={styles.contentContainer}>
                 {/* Header With Progress bar and screen title */}
            <View style={{height : deviceDimesions.Height*0.15}}>
                <SignupFormHeader 
                    progressValue={0.32} 
                    progressBarTotalWidth={deviceDimesions.width*0.9}
                    backIcon = {false}
                    onBackPress = {()=>goToPreviousScreen(this)}
                    ScreenLogoAndTitle = {true}
                />
            </View>

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.Nationality !== 'Nationality'? this.state.Nationality.name : 'Nationality'}
                    onChangeHandler = {(index,item)=>this.onNationalityChange(item)}
                    staticLable = "Nationality"
                    pickerDataArr = {this.state.NationalityArr}
                />

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.MaritalStatus !== 'Marital Status'? this.state.MaritalStatus.name : 'Marital Status'}
                    onChangeHandler = {(index,item)=>this.onMaritalStatusChange(item)}
                    staticLable = "Marital Status"
                    itemSeparatorStyle = {true}
                    pickerDataArr = {this.state.MaritalStatusArr}
                />

                {
                    this.state.MaritalStatus !== "Marital Status" && this.state.MaritalStatus.name !== "Never Married" ? 
                    <SignupDropDownFullWidthWithSearch
                        selectedPickerValue = {this.state.ChildrenCount !== 'Children'? this.state.ChildrenCount.name : 'Children'}
                        onChangeHandler = {(index,item)=>this.onChildrenCountChange(item)}
                        staticLable = "Children"
                        itemSeparatorStyle = {true}
                        pickerDataArr = {this.state.ChildrenCountArr}
                    />
                    :
                    null
                }

              
                 <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.MotherTongue !== 'Mother Tongue'? this.state.MotherTongue.name : 'Mother Tongue'}
                    onChangeHandler = {(index,item)=>this.onMotherTongueChange(item)}
                    staticLable = "Mother Tongue"
                    pickerDataArr = {this.state.MotherTongueArr}
                />

                {/* Education Field */}
                <View style={styles.inputTitle}>
                    <H3>Education</H3>
                </View>
                {/* Education input Field */}
                <ToggleButtonForPicker DownIcon={false} onButtonPress={()=>this.setState({isEducationModalOpen : true})} buttonTitle={this.state.EducationLable} />
                
                {/* Work Experience Field */}
                <View style={styles.workExperienceTitle}>
                    <H3>Work Experience</H3>

                    <View style={styles.workExperienceCheckbox}>
                        <NeuButton
                            color = "#ffffff"
                            height = {deviceDimesions.Height*0.04}
                            width = {deviceDimesions.width*0.08}
                            borderRadius = {10}
                            onPress = {()=>this.setState({notWorkingChecked : !this.state.notWorkingChecked, workExperienceSubmitted : !this.state.workExperienceSubmitted})}
                        >
                            {
                                this.state.notWorkingChecked ? <Icon name="check" color="red" /> : null
                            }
                            
                        </NeuButton>
                        <Text style={{fontSize : 12, marginLeft : 10}}> Not Working</Text>
                    </View>
                    
                </View>
                
                {/* Employed input field */}
                {
                    this.state.notWorkingChecked ? 
                    null
                    :
                    <ToggleButtonForPicker DownIcon={false} onButtonPress={()=>this.setState({isEmployedModalOpen : true})} buttonTitle={this.state.workExperienceLable} />   
                }

                {/* Full name dropdown field */}
                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.AnnualIncome=="Annual Income" ? 'Annual Income' :  this.state.AnnualIncome.name}
                    onChangeHandler = {(index,item)=>this.onAnnualIncomeChange(item)}
                    staticLable = "Annual Income"
                    pickerDataArr = {this.state.AnnualIncomeOptionsArr}
                />
               
                        
                    <View style={styles.inputTitle}>
                        <H3>Height & Weight</H3>
                    </View>
                    <SignupDropDownFullWidthWithSearch
                        selectedPickerValue = {this.state.Height !== 0 ? this.state.Height.name : 'Select Height'}
                        onChangeHandler = {(index,item)=>this.onHeightChange(item)}
                        staticLable = "Select Height"
                        pickerDataArr = {this.state.HeightArr}
                    />

                    <SignupDropDownFullWidthWithSearch
                        selectedPickerValue = {this.state.Weight !== 0 ? this.state.Weight.name : 'Select Weight'}
                        onChangeHandler = {(index,item)=>this.onWeightChange(item)}
                        staticLable = "Select Weight"
                        pickerDataArr = {this.state.WeightArr}
                    />

             

                <View style={{marginTop : 20}}>
                    <SubmitAndNextButton
                        buttonTitle = "Next"
                        buttonIcon = {<Icon name="chevron-right" color="red" />}
                        onSubmitPress = {()=>this.CompleteRegistrationStep2()}
                    />
                </View>
            </ScrollView>

            {/* Education */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isEducationModalOpen}
                onBackdropPress = { () => this.setState({isEducationModalOpen:false})}
                onRequestClose={() => {
                    this.setState({isEducationModalOpen:false})
                }}
            >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        
                            <View style={{backgroundColor : "#ffffff", borderRadius : 10, width : deviceDimesions.width*0.85, elevation : 4, alignSelf : "center", paddingVertical : deviceDimesions.Height*0.05, paddingHorizontal : deviceDimesions.width*0.02}}>
                                <TouchableHighlight onPressIn = {()=> this.setState({ isEducationModalOpen: false })} style={{position : 'absolute', right : 0,  paddingHorizontal : deviceDimesions.width*0.03, paddingVertical : deviceDimesions.width*0.02}}>
                                    <Text style={{fontSize : 22 , fontWeight:"700"  , color: "orange"}}>X</Text>
                                </TouchableHighlight>
                                <SignupDropDownFullWidth
                                    selectedPickerValue = {this.state.SelectedEducationLevel}
                                    onChangeHandler = {(item, index)=>this.setState({SelectedEducationLevel : item})}
                                    staticLable = "Education Level"
                                    containerWidth = {deviceDimesions.width*0.8}
                                    pickerWidth = {deviceDimesions.width*0.75}
                                    renderPickerOption = {()=>
                                        this.state.EducationLevelArr.length > 0 ? 
                                        this.state.EducationLevelArr.map((el,i)=>{
                                            return(
                                                <Picker.Item value = {el.id} label = {el.value}  />
                                            )
                                        })
                                        :
                                        null
                                    }
                                />

                            <SignupDropDownFullWidth
                                    selectedPickerValue = {this.state.SelectedFieldOfStudy}
                                    onChangeHandler = {(item, index)=>this.setState({SelectedFieldOfStudy : item})}
                                    staticLable = "Field Of Study"
                                    containerWidth = {deviceDimesions.width*0.8}
                                    pickerWidth = {deviceDimesions.width*0.75}
                                    renderPickerOption = {()=>
                                        this.state.FieldOfStudyArr.length > 0 ? 
                                        this.state.FieldOfStudyArr.map((el,i)=>{
                                            return(
                                                <Picker.Item value = {el.id} label = {el.value}  />
                                            )
                                        })
                                        :
                                        null
                                    }
                                />
                                <View style={{alignSelf : "center", padding : 2,marginTop : deviceDimesions.Height*0.05}}>
                                    <NeuBorderView
                                        color = "#ffffff"
                                        borderRadius = {15}
                                        width = {deviceDimesions.width*0.8}
                                        height={deviceDimesions.Height*0.06}
                                        containerStyle = {{
                                            alignItems : "flex-start"
                                        }}
                                    >
                                        <TextInput placeholder = "Course" value={this.state.SelectedCourse} onChangeText = {(text)=>this.setState({SelectedCourse : text.trimStart()})} onBlur={()=>this.setState({SelectedCourse : this.state.SelectedCourse.trim()})} style={{width : deviceDimesions.width*0.8, height: deviceDimesions.Height*0.06, paddingHorizontal : deviceDimesions.width*0.05}} />
                                    </NeuBorderView>
                                </View>
                                <View style={{alignSelf : "center", padding : 2, marginTop : deviceDimesions.Height*0.05}}>
                                    <NeuBorderView
                                        color = "#ffffff"
                                        borderRadius = {15}
                                        width = {deviceDimesions.width*0.8}
                                        height={deviceDimesions.Height*0.06}
                                        containerStyle = {{
                                            alignItems : "flex-start"
                                        }}
                                    >
                                        <TextInput placeholder = "College" value={this.state.selectedCollege} onBlur={()=>this.setState({selectedCollege : this.state.selectedCollege.trim()})} onChangeText = {(text)=>this.setState({selectedCollege : text.trimStart()})} style={{width : deviceDimesions.width*0.8, height: deviceDimesions.Height*0.06, paddingHorizontal : deviceDimesions.width*0.05}} />
                                    </NeuBorderView>
                                </View>

                                <View style={{alignSelf : "center", padding : 2, marginTop : deviceDimesions.Height*0.05}}>
                                    <NeuBorderView
                                        color = "#ffffff"
                                        borderRadius = {15}
                                        width = {deviceDimesions.width*0.8}
                                        height={deviceDimesions.Height*0.06}
                                        containerStyle = {{
                                        }}
                                    >
                                        <Picker style={{width: deviceDimesions.width*0.7}} selectedValue={this.state.PassingYear} onValueChange = {(itemValue, itemIndex)=>{ this.setState({PassingYear : itemValue, isPursuing : itemValue > new Date().getFullYear() ? true : false})}}>
                                            <Picker.Item label="Passing Year" value={null} />
                                            {
                                                this.state.passingYearArr.map((el,i)=>{
                                                    return <Picker.Item label={el.toString()} value={el.toString()} />
                                                })
                                            }
                                        </Picker>
                                    </NeuBorderView>
                                </View>

                                <View style={{alignSelf : "flex-end", flexDirection : "row", alignItems : "center", padding : 2, marginTop : deviceDimesions.Height*0.05}}>
                                    <NeuButton
                                        color = "#ffffff"
                                        width = {deviceDimesions.width*0.07}
                                        height = {deviceDimesions.Height*0.04}
                                        borderRadius = {5}
                                        onPress = {()=>{this.setState({isPursuing : !this.state.isPursuing})}}
                                    >
                                        <Icon name="check" color = {this.state.isPursuing ? "red" : "rgba(0,0,0,0.5)"} />
                                    </NeuButton>
                                    <Text style={{marginLeft : deviceDimesions.width*0.02, opacity : 0.7}}>Pursuing</Text>
                                </View>
                                <View style={{alignSelf : "center", padding : 2, marginTop : deviceDimesions.Height*0.05}} accessible = {!this.state.isPursuing}>
                                    <NeuButton
                                        color = "#ffffff"
                                        borderRadius = {10}
                                        width = {deviceDimesions.width*0.3}
                                        height = {deviceDimesions.Height*0.05}
                                        onPress = {()=> {this.SubmitEducation()}}
                                    >
                                        <Text>Save</Text>
                                    </NeuButton>
                                </View>
                            </View>
                        </View>
                    </View>
            </Modal>

            {/* Employed */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isEmployedModalOpen}
                onBackdropPress = { () => this.setState({isEmployedModalOpen:false})}
                onRequestClose={() => {
                    this.setState({isEmployedModalOpen:false})
                }}
            >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={{backgroundColor : "#ffffff", borderRadius : 10, width : deviceDimesions.width*0.85, elevation : 4, alignSelf : "center", paddingVertical : deviceDimesions.Height*0.05, paddingHorizontal : deviceDimesions.width*0.02}}>
                                <TouchableHighlight onPressIn = {()=> this.setState({ isEmployedModalOpen: false })} style={{position : 'absolute', right : 0, paddingHorizontal : deviceDimesions.width*0.03, paddingVertical : deviceDimesions.width*0.02}}>
                                    <Text style={{fontSize : 22 , color:"orange" , fontWeight:"700"}}>X</Text>
                                </TouchableHighlight>
                                <View style={{alignSelf : "center", padding : 2}}>
                                    <NeuBorderView
                                        color = "#ffffff"
                                        borderRadius = {15}
                                        width = {deviceDimesions.width*0.8}
                                        height={deviceDimesions.Height*0.06}
                                        containerStyle = {{
                                            alignItems : "flex-start"
                                        }}
                                    >
                                        <TextInput placeholder = "Working As" value={this.state.WorkingAs} onBlur={()=>this.setState({WorkingAs : this.state.WorkingAs.trim()})} onChangeText = {(text)=>this.setState({WorkingAs : text.trimStart()})} style={{width : deviceDimesions.width*0.8, height: deviceDimesions.Height*0.06, paddingHorizontal : deviceDimesions.width*0.05}} />
                                    </NeuBorderView>
                                </View>
                                <View style={{alignSelf : "center", padding : 2, marginTop : deviceDimesions.Height*0.05}}>
                                    <NeuBorderView
                                        color = "#ffffff"
                                        borderRadius = {15}
                                        width = {deviceDimesions.width*0.8}
                                        height={deviceDimesions.Height*0.06}
                                        containerStyle = {{
                                            alignItems : "flex-start"
                                        }}
                                    >
                                        <TextInput placeholder = "In" value={this.state.WorkingIn} onEndEditing={()=>this.setState({WorkingIn : this.state.WorkingIn.trim()})} onChangeText = {(text)=>this.setState({WorkingIn : text.trimStart()})} style={{width : deviceDimesions.width*0.8, height: deviceDimesions.Height*0.06, paddingHorizontal : deviceDimesions.width*0.05}} />
                                    </NeuBorderView>
                                </View>
                                
                                <SignupDropDownFullWidthWithSearch
                                    selectedPickerValue = {this.state.EmploymentType ? "    "+this.state.EmploymentType.name : '    Employment Type'}
                                    onChangeHandler = {(index,item)=>this.onEmploymentTypeChange(item)}
                                    staticLable = "    Employment Type"
                                    containerWidth = {deviceDimesions.width*0.8}
                                    itemSeparatorStyle = {true}
                                    pickerDataArr = {this.state.EmploymentTypeListArr}
                                />
                                <SignupDropDownFullWidthWithSearch
                                    selectedPickerValue = {this.state.JobType ? "    "+this.state.JobType.name : '    Job Type'}
                                    onChangeHandler = {(index,item)=>this.onJobTypeChange(item)}
                                    staticLable = "    Job Type"
                                    containerWidth = {deviceDimesions.width*0.8}
                                    pickerDataArr = {this.state.JobTypeListArr}
                                />
                               
                                <View style={{alignSelf : "center", padding : 2, marginTop : deviceDimesions.Height*0.02}}>
                                    <NeuButton
                                        color = "#ffffff"
                                        borderRadius = {10}
                                        width = {deviceDimesions.width*0.3}
                                        height = {deviceDimesions.Height*0.05}
                                        onPress = {()=>{this.SubmitWorkExperience()}}
                                    >
                                        <Text>Save</Text>
                                    </NeuButton>
                                </View>
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
        padding : 10,
        width : deviceDimesions.width,
    },
    contentContainer : {
        alignSelf : "center",
        padding : 10,
        paddingBottom : 50,
    },
    PasswordHint : {
        alignItems : "center",
        opacity : 0.6,
        padding : 10,
    },
    inputTitle : {
        marginTop : deviceDimesions.Height*0.04,
    },
    workExperienceTitle : {
        flex : 1,
        marginTop : deviceDimesions.Height*0.04,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center"
    },
    workExperienceCheckbox : {
        flexDirection : "row",
        alignItems : "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : 'rgba(255,255,255,0.5)'
    },
    modalView: {
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
  });