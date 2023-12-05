// SocialLoginButton

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { View } from 'native-base';
import React from 'react';
import { Alert, BackHandler, Image, PermissionsAndroid, StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToLoginScreen, goToPersonalDetailsSignScreen, goToPreviousScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import ToggleSwitch from 'toggle-switch-react-native'
import CentralizedTextInput from '../../component/CentralizedTextInput/CentralizedTextInput';
import SimpleTextInput from '../../component/SimpleTextInput/SimpleTextInput';
import MobileNumberWithCountryCodeInput from '../../component/MobileNumberWithCountryCodeInput/MobileNumberWithCountryCodeInput';
import ToggleButtonForPicker from '../../component/ToggleButtonForPicker/ToggleButtonForPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SignupDropDownFullWidthWithSearch } from '../../component/SignupDropDownFullWidth/SignupDropDownFullWidth';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import { ImageBackground } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkEmailAlreadyExist, checkMobileAlreadyExist, GetAllCast, GetAllCasteListByReligion, GetAllCountryCode, GetAllReligionList, GetAllSubCasteListByCast, GetLocationOptions, RegistrationStep1 } from '../../helper/API_Call/API_Call';
// import { Picker } from '@react-native-community/picker';
import { ValidateEmail, ValidateMobileNumber } from '../../helper/Validations/Validations';
import { ToastAndroid } from 'react-native';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { AutoCompleteInput } from '../../component/AutoCompleteInput/AutoCompleteInput';
import { TouchableHighlight } from 'react-native';
import { Modal } from 'react-native';
import RNModalPicker from 'rn-modal-picker';
import { Pressable } from 'react-native';
import DateInput from '../../component/DateInput/DateInput';
import messaging from '@react-native-firebase/messaging';
import { TouchableOpacity } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker';

export default class SignupDetails extends React.Component {
    constructor(props) {
        super(props);
        this.SubCasteButton = React.createRef();
        this.state = {
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: ""
            },
            deviceToken: '',
            showDatePicker: false,
            mode: 'date',
            date: '',
            selectedDate: '',
            ToggleSwitchIcon: 'user',
            termsAndConditionChecked: true,
            email: "",

            // Drop down values
            allReligionArray: [],
            allCasteArray: [{ id: '0', name: 'No caste for me' }],
            allSubCasteArray: [{ id: '0', name: 'No Sub caste for me' }],
            Religion: "",
            Caste: "",
            SubCaste: "",
            SubCasteManual: "",
            showRightSubCaste: false,
            showManualSubcasteInput: false,

            // states for gender switch component
            isOnDefaultToggleSwitch: true,
            isOnLargeToggleSwitch: false,
            isOnBlueToggleSwitch: false,

            // show/hide alternate number input box
            showAlternateNumberInputBox: false,
            CountryCodeArr: [],
            // password input field
            password: "",
            showPassword: false,
            showCorrectPasswordIcon: false,

            // Location
            locationName: "Location",
            LocationData: '',
            showLocationModal: false,

            // Mobile Number
            mobileNumber: "",
            alternateMobileNumber: "",
            selectedCountryCode: "91",
            alternateCountryCode: "91",
            // Profile for 
            profileFor: null,

            emailExist: null,
            fullname: "",

            // Error MEssage 
            EmailError: "",
            MobileError: "",
            isCurrentLocation: false,
            Latitude: '',
            Longitude: '',
            user_Social_data: ''
        }
    }

    ToggleLoader(name, title) {
        this.setState({
            // LoaderProperties : {
            //     ...prevState.LoaderProperties,
            //     LoadingTitle = "Logging In",
            //     isLoading : true,
            // }
            LoaderProperties: {
                ...this.state.LoaderProperties,
                LoadingTitle: name,
                isLoading: title,
            }
        })
    }

    toggleGenderSwitch(isOnDefaultToggleSwitch) {
        this.setState({ showDatePicker: false })
        let iconNameOnToggle = ''
        this.state.ToggleSwitchIcon == 'user' ? iconNameOnToggle = 'pencil' : iconNameOnToggle = 'user'
        this.setState({ ToggleSwitchIcon: iconNameOnToggle })
        this.setState({ isOnDefaultToggleSwitch })
    }

    onDateChange = (event, selectedDate) => {
        let selectedDateReadable = selectedDate.getDate().toString().padStart(2, 0) + '-' + (selectedDate.getMonth() + 1).toString().padStart(2, 0) + '-' + selectedDate.getFullYear()
        this.setState({ selectedDate: selectedDateReadable, showDatePicker: false, date: selectedDate })
        // console.log(this.state.date)
    };

    showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    showDatepicker = () => {
        this.setState({ showDatePicker: true })
    };

    showTimepicker = () => {
        showMode('time');
    };
    

    //Current Location
    getCurrentLocation = () => {
        let geoOptions = {
            enableHighAccuracy: false,
            timeOut: 20000, //20 second  
        };
        this.setState({ ready: false, error: null });
        Geolocation.getCurrentPosition(this.geoSuccess,
            this.geoFailure,
            geoOptions);
       
    }

    //CurrentLocationSucessCode
    geoSuccess = (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
       //GeoCoade using Current Address 
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC-K52B1FhIQewUl4Fp1CgoYxjT6pShusE`)
            .then(res => res.json())
            .then(response => {
                console.log((response))
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
    backAction = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }
        else {
            Alert.alert("", "Skip registration process?", [
                { text: "No", onPress: () => null },
                { text: "YES", onPress: () => goToLoginScreen() }
            ]);
            return true;
        }
    };

    async componentDidMount() {
    
        if (AsyncStorage !== null) {
            let user_Social_data = await AsyncStorage.getItem('user_Social_data');
            let user_Social_data_email = await AsyncStorage.getItem('user_Social_data_email');
            this.setState({ fullname: user_Social_data });
            this.setState({ email: user_Social_data_email });

        }

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this.setState({ isOnDefaultToggleSwitch: this.props.route.params.isGenderMale == 1 ? false : true })
        let userRelation = await AsyncStorage.getItem('profileFor')
        this.setState({ profileFor: Number(userRelation) })

        messaging()
            .getToken()
            .then(token => {
                this.setState({ deviceToken: token })
            });
        GetAllCountryCode().then(res => {
            let response = res;
            let modifiedObj = {};
            let modifiedArr = [];
            response.data.map((el, i) => {
                modifiedObj = {
                    code: el.phonecode,
                    name: el.name
                }
                modifiedArr.push(modifiedObj)
            })
            this.setState({ CountryCodeArr: modifiedArr })
        })
        GetAllReligionList().then((res => {
            let response = res;
            this.setState({ allReligionArray: response.data })
        }))
    }

    checkEmailExist = async (email, message) => {
        if (ValidateEmail(email)) {
            checkEmailAlreadyExist(email).then((res) => {
                let response = res
                if (response.status == true) {
                    this.setState({ EmailError: "Email ID already exists" })
                    
                }
                else {
                    this.setState({ EmailError: "" })
                    
                }
            })
        }
        else if (!email) {
           
        }
        else {
         
        }

    }

    checkMobileExist = async (mobile, message, failedMessage) => {
        if (mobile.length > 3 && mobile.length < 13) {
            checkMobileAlreadyExist(mobile).then((res) => {
                let response = res
                if (response.status == true) {
                    this.setState({ MobileError: message })
                   
                }
                else {
                    this.setState({ MobileError: "" })
                }
            })
        }
        else {
        }
    }

    // on change handler for religion change
    onReligionChange = (item) => {
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
    }

    // on change handler for caste change
    onCasteChange = (item) => {
        this.setState({ showDatePicker: false })
        this.setState({ Caste: item })
        console.log(item.id)
        GetAllSubCasteListByCast(item.id).then((res) => {
            let response = res
            console.log("adasdasdasdsad" + JSON.stringify(response))
            if (response.status) {
                let modifiedObj = {}
                let modifiedArr = []
                response.data.map((el, i) => {
                    modifiedObj = {
                        name: el.sub_caste_name,
                        id: el.sub_caste_id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({ allSubCasteArray: modifiedArr, SubCaste: "", showManualSubcasteInput: false })
            }
            else {
                this.setState({ showManualSubcasteInput: true })
            }
        })
    }

    // on change handler for sub caste change
    onSubCasteChange = (item) => {
        this.setState({ showDatePicker: false, SubCaste: item })
    }

    CompleteRegistrationStep1 = async () => {
        this.setState({ showDatePicker: false, })
        let reqObj = {
            profile_created_for: this.state.profileFor,
            gender: this.state.isOnDefaultToggleSwitch ? 2 : 1,
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password,
            mobile_code: this.state.selectedCountryCode,
            mobile: this.state.mobileNumber,
            date_of_birth: this.state.selectedDate,
            location: typeof (this.state.locationName) == 'string' && this.state.locationName ? this.state.locationName : this.state.locationName.city_id,
            religion: this.state.Religion.religion_id,
            caste: this.state.Caste.id,
            alternate_mobile_code: this.state.alternateCountryCode,
            alternate_mobile: this.state.alternateMobileNumber,
            is_current_location: this.state.isCurrentLocation ? 1 : '',
            loc_latitude: this.state.Latitude,
            loc_longitude: this.state.Longitude,
            device_token: this.state.deviceToken
        }

        if (!reqObj.fullname) {
            ToastAndroid.showWithGravityAndOffset(
                'Enter full name first.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!ValidateEmail(reqObj.email)) {
            ToastAndroid.showWithGravityAndOffset(
                'Please provide a valid email ID.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (this.state.password.length < 6) {
            ToastAndroid.showWithGravityAndOffset(
                'Enter your password.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (this.state.date == new Date()) {
            ToastAndroid.showWithGravityAndOffset(
                'Choose a valid date.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (reqObj.location == "") {
            ToastAndroid.showWithGravityAndOffset(
                'Choose Your Location.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!reqObj.religion) {
            ToastAndroid.showWithGravityAndOffset(
                'Choose your religion.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!reqObj.caste) {
            ToastAndroid.showWithGravityAndOffset(
                'Choose your caste.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!this.state.termsAndConditionChecked) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Accept Terms & Conditions.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (this.state.EmailError) {
            ToastAndroid.showWithGravityAndOffset(
                'Email Already Exist.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (this.state.MobileError) {
            ToastAndroid.showWithGravityAndOffset(
                "Mobile Number Already Exist.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            this.ToggleLoader("Loading...", true)
            // API call for registration step 1
            RegistrationStep1(reqObj)
                .then(res => {
                    let response = res;
                    this.ToggleLoader("", false)
                    console.log(JSON.stringify(response.data))
                    AsyncStorage.setItem('auth_token_registration', response.data.auth_token);
                    AsyncStorage.setItem('first_name_registration', response.data.userdata.first_name);
                    AsyncStorage.setItem('mobile_registration', response.data.userdata.mobile);
                    AsyncStorage.setItem('country_code_registration', this.state.selectedCountryCode)
                    AsyncStorage.setItem('profile_ID_registration', response.data.userdata.member_profile_id);
                    AsyncStorage.setItem('user_email', response.data.userdata.email);
                    AsyncStorage.setItem('user_password', this.state.password);
                    AsyncStorage.setItem('user_religion', this.state.Religion.religion_id)
                    goToPersonalDetailsSignScreen();
                })
                .catch(err => {
                    let error = err
                    console.log(JSON.stringify(error))
                    this.ToggleLoader("", false)
                    ToastAndroid.showWithGravityAndOffset(
                        'Please try again later.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                })
        }
    }

    async onLocationInputChange(text) {
        this.setState({ showDatePicker: false })
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
            GetLocationOptions(text).then(res => { let response = res; this.setState({ LocationData: response.data.data }) }).catch(err => { let error = err; })
        }

    }

    _renderLocationOptions(el) {
        return (
            <Pressable style={{ width: deviceDimesions.width * 0.8, paddingVertical: deviceDimesions.Height * 0.02, paddingHorizontal: deviceDimesions.width * 0.02, backgroundColor: '#fff' }} onPress={() => this.setState({ isCurrentLocation: false, locationName: el.item, LocationData: '', showLocationModal: false })}>
                <Text>{el.item.name}</Text>
            </Pressable>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    barStyle="dark-content"
                />

                {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />

                {/* Screen Content */}
                <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="always" persistentScrollbar={true} contentContainerStyle={styles.contentContainer} ref={(c) => { this.scroll = c }}>
                    {/* Header With Progress bar and screen title */}
                    <View style={{ height: deviceDimesions.Height * 0.25 }}>
                        <SignupFormHeader
                            progressValue={0.16}
                            progressBarTotalWidth={deviceDimesions.width * 0.9}
                            backIcon={false}
                            onBackPress={() => goToPreviousScreen(this)}
                            ScreenLogoAndTitle={true}
                            ScreenTitle="Signup Details"
                        />
                    </View>

                    {/* Toggle Switch For Gender */}
                    <NeuBorderView color='#f5f5f5' height={50} width={130} borderRadius={20}>
                        <ToggleSwitch
                            isOn={this.state.isOnDefaultToggleSwitch}
                            onColor="#f5f5f5"
                            offColor="#f5f5f5"
                            onToggle={isOnDefaultToggleSwitch => {
                                this.toggleGenderSwitch(isOnDefaultToggleSwitch);
                                // this.CompleteRegistrationStep1()
                            }}
                            icon={<Icon color='#f5f5f5' name={!this.state.isOnDefaultToggleSwitch ? 'male' : 'female'} />}
                            innerTextWoman={!this.state.isOnDefaultToggleSwitch ? '' : 'Woman'}
                            innerTextMan={!this.state.isOnDefaultToggleSwitch ? 'Man' : ''}
                            size="large"
                            circleColor='red'
                        />
                    </NeuBorderView>

                    {/* Full name input field */}
                    <View style={{ marginTop: deviceDimesions.Height * 0.05 }}>
                        <Text style={{ marginBottom: deviceDimesions.Height * 0.02 }}>Full Name -</Text>
                        <NeuBorderView
                            color="#f5f5f5"
                            width={deviceDimesions.width * 0.9}
                            height={50}
                            borderRadius={20}
                            inset
                            containerStyle={{
                                flexDirection: "row",
                            }}
                        >
                            <TextInput
                                placeholder="Full Name"
                                onChangeText={(text) => this.setState({ showDatePicker: false, fullname: text })}
                                value={this.state.fullname}
                                style={{ width: deviceDimesions.width * 0.82, textAlign: "left", fontStyle: 'normal' }}
                                onBlur={() => this.setState({ fullname: this.state.fullname.trimStart() })}
                           
                            />
                        </NeuBorderView>
                    </View>
                    <View style={{ marginTop: deviceDimesions.Height * 0.05 }}>
                        <Text style={{ marginBottom: deviceDimesions.Height * 0.02 }}>Email ID -</Text>
                        <NeuBorderView
                            color="#f5f5f5"
                            width={deviceDimesions.width * 0.9}
                            height={50}
                            borderRadius={20}
                            inset
                            containerStyle={{
                                flexDirection: "row",
                    
                            }}
                        >
                            <TextInput
                                keyboardType="email-address"
                                placeholder="Email ID"
                                autoCapitalize="none"
                                onChangeText={(email) => this.setState({ showDatePicker: false, email: email })}
                                value={this.state.email}
                                style={{ width: deviceDimesions.width * 0.82, textAlign: "left", fontStyle: 'normal' }}
                                onBlur={() => { this.state.email ? this.checkEmailExist(this.state.email, "Email ID already exists") : this.setState({ EmailError: "" }); this.setState({ email: this.state.email.trimStart() }) }}
                            />
                        </NeuBorderView>
                        {
                            this.state.EmailError ? <Text style={{ alignSelf: 'center', color: 'red', marginVertical: deviceDimesions.Height * 0.01 }}>{this.state.EmailError}</Text> : null
                        }

                    </View>

                    {/* Password input Field */}

                    <View style={{ marginTop: deviceDimesions.Height * 0.05 }}>
                        <Text style={{ marginBottom: deviceDimesions.Height * 0.02 }}>Password -</Text>
                        <NeuBorderView
                            color="#f5f5f5"
                            width={deviceDimesions.width * 0.9}
                            height={50}
                            borderRadius={20}
                            inset
                            containerStyle={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-evenly"
                            }}
                        >
                            <TextInput placeholder="Password" onBlur={() => this.setState({ password: this.state.password.trimStart() })} onChangeText={(password) => this.setState({ showDatePicker: false, password: password })} value={this.state.password} secureTextEntry={!this.state.showPassword} style={{ width: deviceDimesions.width * 0.65, textAlign: "left", fontStyle: 'normal' }} />
                            {
                                this.state.showPassword ?
                                    <Pressable style={{ padding: 10 }} onPress={() => this.setState({ showPassword: !this.state.showPassword })}>
                                        <Icon name="eye" />
                                    </Pressable>
                                    :
                                    <Pressable style={{ padding: 10 }} onPress={() => this.setState({ showPassword: !this.state.showPassword })}>
                                        <Icon name="eye-slash" />
                                    </Pressable>
                            }
                            {
                                this.state.password.length >= 6 ? <Icon name="check" color="green" /> : <Icon name="exclamation" color="red" />
                            }
                        </NeuBorderView>
                    </View>

                    {/* Password hint text */}
                    <View style={styles.PasswordHint}>
                        <Text>Hint : Use 6 or more characters with a mix of letters(a-z) and numbers(0-9)</Text>
                    </View>

                    {/* Phone Number input field */}
                    <Text style={{ marginBottom: -deviceDimesions.Height * 0.02, marginTop: deviceDimesions.Height * 0.01 }}>Mobile Number -</Text>
                    <MobileNumberWithCountryCodeInput
                        placeholderText="Phone Number"
                        CountryCodeArr={this.state.CountryCodeArr}
                        mobileNumber={this.state.mobileNumber}
                        mobileNumberChangeHandler={(text) => { this.setState({ showDatePicker: false, mobileNumber: text }) }}
                        selectedCountryCode={this.state.selectedCountryCode}
                        onCountryCodeChange={(i, item) => { this.setState({ showDatePicker: false, selectedCountryCode: item.code }) }}
                        onBlur={() => { this.checkMobileExist(this.state.mobileNumber, "mobile number already exists.", "Please enter a 10 digit mobile number, starts with digit 6-9.") > this.setState({ mobileNumber: this.state.mobileNumber.trim() }); }}
                    />

                    {
                        this.state.MobileError ? <Text style={{ alignSelf: 'center', color: 'red', marginVertical: deviceDimesions.Height * 0.01 }}>{this.state.MobileError}</Text> : null
                    }

                    {/* Alternate Phone Number hide/show button with Alternate Phone Number input field */}
                    {
                        this.state.showAlternateNumberInputBox ?
                            <View>
                                <Text style={{ marginBottom: -deviceDimesions.Height * 0.02, marginTop: deviceDimesions.Height * 0.05 }}>Alternate Mobile Number -</Text>
                                <MobileNumberWithCountryCodeInput
                                    placeholderText="Alternate Number"
                                    CountryCodeArr={this.state.CountryCodeArr}
                                    mobileNumber={this.state.alternateMobileNumber}
                                    mobileNumberChangeHandler={(text) => this.setState({ showDatePicker: false, alternateMobileNumber: text })}
                                    selectedCountryCode={this.state.alternateCountryCode}
                                    onCountryCodeChange={(i, item) => { this.setState({ showDatePicker: false, alternateCountryCode: item.code }) }}
                                    onBlur={() => { this.checkMobileExist(this.state.alternateMobileNumber, "Alternate mobile number already exists.", "Please enter a 10 digit alternate mobile number, starts with digit 6-9."); this.setState({ alternateMobileNumber: this.state.alternateMobileNumber.trim() }) }}
                                />
                                <View style={{ alignItems: "flex-end", top: -50 }}>
                                    <NeuButton
                                        color="#f5f5f5"
                                        borderRadius={20}
                                        width={deviceDimesions.width * 0.08}
                                        height={deviceDimesions.Height * 0.04}
                                        onPress={() => this.setState({ showDatePicker: false, showAlternateNumberInputBox: !this.state.showAlternateNumberInputBox, showDatePicker: false })}
                                    >
                                        <Icon name="minus" color="red" />
                                    </NeuButton>
                                </View>
                            </View>
                            :
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: deviceDimesions.Height * 0.02, paddingLeft: 30 }}>
                                <Text style={{ marginRight: 20 }}>Add alternate number</Text>
                                <NeuButton
                                    color="#f5f5f5"
                                    borderRadius={20}
                                    width={deviceDimesions.width * 0.08}
                                    height={deviceDimesions.Height * 0.04}
                                    onPress={() => this.setState({ showDatePicker: false, showAlternateNumberInputBox: !this.state.showAlternateNumberInputBox, showDatePicker: false })}
                                >
                                    <Icon name="plus" color="red" />
                                </NeuButton>
                            </View>
                    }

                    <Text style={{ marginBottom: -deviceDimesions.Height * 0.02, marginTop: deviceDimesions.Height * 0.04 }}>Date Of Birth -</Text>
                    <DateInput onButtonPress={() => this.setState({ showDatePicker: true })} onInputChange={(text) => this.setState({ showDatePicker: false, selectedDate: text })} buttonTitle={this.state.selectedDate} />
                    {this.state.showDatePicker &&
                        <DateTimePicker
                            value={!this.state.date ? new Date(new Date().getFullYear() - 18, 1, 1) : this.state.date}
                            minimumDate={new Date(1900, 1, 1)}
                            maximumDate={new Date(new Date().getFullYear() - 18, 1, 1)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="DOB"
                            textStyle={{ color: "black" }}
                            placeHolderTextStyle={{ opacity: 0.7 }}
                            onChange={this.onDateChange}
                            disabled={false}
                            onTouchCancel={() => this.setState({ showDatePicker: false })}
                            onCancel={() => this.setState({ showDatePicker: false })}
                            onBackdropPress={() => this.setState({ showDatePicker: false })}
                        />
                    }
                    <Text style={{ marginBottom: -deviceDimesions.Height * 0.02, marginTop: deviceDimesions.Height * 0.04 }}>Location -</Text>
                    <ToggleButtonForPicker DownIcon={false} onButtonPress={() => this.setState({ showDatePicker: false, showLocationModal: true })} buttonTitle={typeof (this.state.locationName) == 'string' ? this.state.locationName.length > 50 ? this.state.locationName.slice(0, 35) + "..." : this.state.locationName : this.state.locationName.name} />
                    <View style={{ marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.9, alignSelf: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.getCurrentLocation()} style={{ width: deviceDimesions.width * 0.5, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', height: 20 }}>
                            <Icon name="map-marker" color="red" size={20} />
                            <Text>Use Current Location</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ marginBottom: -deviceDimesions.Height * 0.02, marginTop: deviceDimesions.Height * 0.04 }}>Religion -</Text>
                    <SignupDropDownFullWidthWithSearch
                        selectedPickerValue={this.state.Religion ? this.state.Religion.name : 'Religion'}
                        onChangeHandler={(index, item) => this.onReligionChange(item)}
                        staticLable="Religion"
                        pickerDataArr={this.state.allReligionArray}
                    />

                    <Text style={{ marginBottom: -deviceDimesions.Height * 0.02, marginTop: deviceDimesions.Height * 0.04 }}>Caste -</Text>
                    <SignupDropDownFullWidthWithSearch
                        selectedPickerValue={this.state.Caste ? this.state.Caste.name : 'Caste'}
                        onChangeHandler={(index, item) => this.onCasteChange(item)}
                        staticLable="Caste"
                        pickerDataArr={this.state.allCasteArray}
                    />
                    
                    <View style={styles.termsAndConditionContainer}>
                        <NeuButton
                            color="#f5f5f5"
                            height={deviceDimesions.Height * 0.04}
                            width={deviceDimesions.width * 0.08}
                            borderRadius={10}
                            onPress={() => this.setState({ termsAndConditionChecked: !this.state.termsAndConditionChecked, showDatePicker: false })}
                        >
                            {
                                this.state.termsAndConditionChecked ? <Icon name="check" color="red" /> : null
                            }

                        </NeuButton>
                        <Text style={{ fontSize: 12, marginLeft: 10 }}>  I accept to the terms and conditions.</Text>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <SubmitAndNextButton
                            buttonTitle="Submit"
                            buttonIcon={<Icon name="chevron-right" color="red" />}
                            onSubmitPress={() => this.CompleteRegistrationStep1()}
                        />
                    </View>
                </ScrollView>

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
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableHighlight onPressIn={() => this.setState({ showLocationModal: false })} style={{ position: 'absolute', right: 0, paddingHorizontal: deviceDimesions.width * 0.03, paddingVertical: deviceDimesions.width * 0.02 }}>
                                <Text style={{ fontSize: 20, color: "orange" }}>X</Text>
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
        padding: 10,
        width: deviceDimesions.width,
        backgroundColor: "#ffffff"
    },
    contentContainer: {
        padding: 10,
        paddingBottom: 50,
        paddingTop: 20,
    },
    PasswordHint: {
        alignItems: "center",
        opacity: 0.4,
        padding: 10,
    },
    termsAndConditionContainer: {
        flexDirection: "row",
        justifyContent: "center",
        top: deviceDimesions.Height * 0.04,
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    modalView: {
        backgroundColor: "#f5f5f5",
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
    },
});