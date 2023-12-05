// AstroInformation
import { H3, View } from 'native-base';
import React from 'react';
import { Alert, BackHandler, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToLoginScreen, goToPreviousScreen, goToVerifyMobileNumberSignScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import ToggleSwitch from 'toggle-switch-react-native'
import CentralizedTextInput from '../../component/CentralizedTextInput/CentralizedTextInput';
import SimpleTextInput from '../../component/SimpleTextInput/SimpleTextInput';
import MobileNumberWithCountryCodeInput from '../../component/MobileNumberWithCountryCodeInput/MobileNumberWithCountryCodeInput';
import ToggleButtonForPicker from '../../component/ToggleButtonForPicker/ToggleButtonForPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import { ImageBackground } from 'react-native';
import RangeSliderForSignup from '../../component/RangeSliderForSignup/RangeSliderForSignup';
import { GetAstroStarsList, GetLocationOptions, RegistrationStep3, UploadHoroscope } from '../../helper/API_Call/API_Call';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import { ToastAndroid } from 'react-native';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignupDropDownFullWidth, SignupDropDownFullWidthWithSearch } from '../../component/SignupDropDownFullWidth/SignupDropDownFullWidth';
import { CustomImagePicker } from '../../component/ImagePicker/ImagePicker';
import { AutoCompleteInput } from '../../component/AutoCompleteInput/AutoCompleteInput';

export default class AstroInformation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            LoaderProperties : {
                isLoading : false,
                LoadingTitle : ""
            },
            showTiemPicker : false,
            singleFileOBJ : '',
            isAstroInterested : true,
            isSudhajathakam : false,
            isManglik : false,
            BirthTime : "",
            birthStar : "",
            BirthCity : "",
            showMiltiselectPicker : false,
            AllStarsArr : [],
            MatchingStarsArr : [],
            BirthStarArr : [],
            isHoroscopeUploaded : true,
            signup_token : '',
            matchingStarsLable : 'Matching Stars',
            showCustomImagePicker : '',
            showLocationModal: false,
            locationName: "City Name",


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

    _renderLocationOptions(el) {
        return (
            <Pressable style={{ width: deviceDimesions.width * 0.8, paddingVertical: deviceDimesions.Height * 0.02, paddingHorizontal: deviceDimesions.width * 0.02, backgroundColor: '#fff' }} onPress={() => this.setState({ isCurrentLocation: false, locationName: el.item, LocationData: '', showLocationModal: false })}>
                <Text>{el.item.name}</Text>
            </Pressable>
        )
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
            const currentYear = (new Date()).getFullYear();
            const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
            this.setState({passingYearArr : range(currentYear, currentYear - 50, -1)})
            
            const signup_token = await AsyncStorage.getItem('auth_token_registration');
            this.setState({ signup_token });
            await GetAstroStarsList(true, this.state.signup_token)
            .then(res=>{
                let response = res;
                let modifiedResponse = response.data.data.map((el,i)=>{
                    el.checked = false;
                    return el;
                }); 
                let modifiedObj = {}
                let modifiedArr = []
                response.data.data.map((el,i)=>{
                    modifiedObj = {
                        name : el.star_name,
                        id : el.id
                    }
                    modifiedArr.push(modifiedObj)
                })
                this.setState({AllStarsArr : modifiedResponse, BirthStarArr : modifiedArr})
            })
        }
        catch{
            Alert.alert('Error', 'There was an error.')
        }
        
    }


    UploadHoroscopeFunction(horoscope){
        UploadHoroscope(this.state.signup_token, horoscope)
              .then(res => {
                  let response = res
                  if(response.status){
                    ToastAndroid.showWithGravityAndOffset(
                        "Horoscope Uploaded Successfully.",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );

                      this.setState({isHoroscopeUploaded : true})
                  }
                  else{
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.error,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );
                      this.setState({isHoroscopeUploaded : false})
                  }
              })
              .catch(err => {
                  let error = err
                  this.setState({isHoroscopeUploaded : false})
              })
    }

    async ImageCapture(){
        this.setState({showTiemPicker : false, showCustomImagePicker : false})
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            this.setState({
                singleFileOBJ : {
                    uri: image.path, width: image.width, height: image.height, mime: image.mime
                },
            });
            this.UploadHoroscopeFunction(image)
          })
          .catch(image => {
            console.log(image);
          });
    }

    async ImagePick(){
        this.setState({showTiemPicker : false, showCustomImagePicker : false})
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping:true
          }).then(image => {
            console.log(image);
            this.setState({
                singleFileOBJ : {
                    uri: image.path, width: image.width, height: image.height, mime: image.mime
                },
            });
            this.UploadHoroscopeFunction(image)
          })
          .catch(image => {
          });
    }

    async SingleFilePicker() {
        this.setState({showTiemPicker : false})
        ImagePicker.openPicker({
            multiple: true
          }).then(images => {
          });
       
      }

    onMatchingStarSelectUnselect(el,i){
        let AllStarsArrModify = [...this.state.AllStarsArr]
        AllStarsArrModify.some((ele,i)=>ele.id == el.id) ? AllStarsArrModify[i].checked = !AllStarsArrModify[i].checked : false;
        this.setState({AllStarsArr : AllStarsArrModify})

        let checkedStarsArr = []

        AllStarsArrModify.map((el,i)=>{
            el.checked ? checkedStarsArr.push(el) : false
        })
        this.setState({MatchingStarsArr : checkedStarsArr})
        
    }

    OnSaveMatchingStarsPress(){
        let MatchStarsArr = [...this.state.MatchingStarsArr]
        let MatchingStarsStr = ''
        if(MatchStarsArr.length > 0){
            MatchStarsArr.map((el,i)=>{
               MatchingStarsStr = MatchingStarsStr.concat(el.star_name+", ")
            })

            this.setState({showMiltiselectPicker : false, matchingStarsLable : MatchingStarsStr})
        }
        else{
            this.setState({showMiltiselectPicker : false, matchingStarsLable : "Matching Stars"})
        }

    }

    toggleMultiselectPicker(value){
        this.setState({showTiemPicker : false,showMiltiselectPicker : value})
    }

    toggleTimePicker(value){
        this.setState({showTiemPicker : value})
    }

    onBirthStarChange(item){
        this.setState({ showTiemPicker : false,birthStar : item})
    }

    onNextPress(){
        this.setState({showTiemPicker : false})
        if(!this.state.isAstroInterested){
            goToVerifyMobileNumberSignScreen();
        }
        else if(!this.state.birthStar){
            ToastAndroid.showWithGravityAndOffset(
                "Choose Birth Star.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(!this.state.BirthTime){
            ToastAndroid.showWithGravityAndOffset(
                "Choose Time Of Birth.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        else if(!this.state.locationName){
            ToastAndroid.showWithGravityAndOffset(
                "Enter Birth City.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        
        else{
            let matchingStarsValue = [];

            this.state.MatchingStarsArr.map((el,i)=>{
                matchingStarsValue.push(el.id)
            })

            if(matchingStarsValue == []){
                ToastAndroid.showWithGravityAndOffset(
                    "Choose Matching Stars.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
            }
            else{
                this.ToggleLoader("Loading...", true)
                let reqObj = {
                    birthstar : this.state.birthStar.id,
                    time_of_birth : this.state.BirthTime.toTimeString(),
                    city_of_birth : this.state.locationName,
                    u_manglik : this.state.isManglik ? 'YES' : 'NO',
                    shudha_jathakam : this.state.isSudhajathakam ? 'YES' : 'NO',
                    matching_stars : matchingStarsValue.toString(),
                    interested_in_astro : true,
                }

                RegistrationStep3(reqObj, this.state.signup_token)
                .then(res => {
                    let response = res;
                    goToVerifyMobileNumberSignScreen()
                    this.ToggleLoader("", false)
                })
                
                .catch(err => {
                    let error = err
                    this.ToggleLoader("", false)
                })
            } 
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
                <View style={{height : deviceDimesions.Height*0.2}}>
                    <SignupFormHeader 
                        progressValue={0.48} 
                        progressBarTotalWidth={deviceDimesions.width*0.9}
                        backIcon = {false}
                        onBackPress = {()=>goToPreviousScreen(this)}
                        ScreenLogoAndTitle = {true}
                        ScreenTitle = "Astro Information"
                    />
                </View>

                {/* Is Astro Interested Field */}
                <View style={styles.termsAndConditionContainer}>
                    <NeuButton
                        color = "#ffffff"
                        height = {deviceDimesions.Height*0.04}
                        width = {deviceDimesions.width*0.08}
                        borderRadius = {10}
                        onPress = {()=>this.setState({ showTiemPicker : false,isAstroInterested : !this.state.isAstroInterested})}
                    >
                        {
                            this.state.isAstroInterested ? <Icon name="check" color="red" /> : null
                        }
                        
                    </NeuButton>
                    <Text style={{marginLeft : 10, opacity : 0.7, fontStyle : 'normal'}}>{this.state.isAstroInterested ? "Interested In Astro" : "Astro Not Interested" }</Text>
                </View>

                {
                    this.state.isAstroInterested ? 
                    <View>
               

                <SignupDropDownFullWidthWithSearch
                    selectedPickerValue = {this.state.birthStar ? this.state.birthStar.name : 'Birth Star'}
                    onChangeHandler = {(index,item)=>this.onBirthStarChange(item)}
                    staticLable = "Birth Star"
                    pickerDataArr = {this.state.BirthStarArr}
                />
                
                {/* Time Of Birth input field */}
                <ToggleButtonForPicker DownIcon={false} onButtonPress={()=>this.toggleTimePicker(!this.state.showTiemPicker)} buttonTitle={!this.state.BirthTime ? "Time Of Birth" : this.state.BirthTime.toTimeString().slice(0,5)} />
                {this.state.showTiemPicker && 
                    <DateTimePicker
                        value={!this.state.BirthTime ? new Date() : this.state.BirthTime}
                        mode="time"
                        onChange = {(event, date)=>this.setState({BirthTime : date, showTiemPicker : false})}
                        is24Hour={true}
                        minimumDate={new Date()}
                        maximumDate={new Date()}
                    />
                }
                
                {/* City Of Birth */}
                <ToggleButtonForPicker DownIcon={false} onButtonPress={() => this.setState({ showLocationModal: true })} buttonTitle={typeof (this.state.locationName) == 'string' ? this.state.locationName.length > 50 ? this.state.locationName.slice(0, 35) + "..." : this.state.locationName : this.state.locationName.name} />

                {/* Is Astro Interested Field */}
                <View style={styles.termsAndConditionContainer}>
                    <NeuButton
                        color = "#ffffff"
                        height = {deviceDimesions.Height*0.04}
                        width = {deviceDimesions.width*0.08}
                        borderRadius = {10}
                        onPress = {()=>this.setState({showTiemPicker : false,isManglik : !this.state.isManglik}, this.setState({isSudhajathakam : false }))}
                    >
                        {
                            this.state.isManglik ? <Icon name="check" color="red" /> : null
                        }
                        
                    </NeuButton>
                    <Text style={{marginLeft : 10, opacity : 0.7}}> Chovva Dosham / Manglik</Text>
                </View>

                {/* Is Astro Interested Field */}
                <View style={styles.termsAndConditionContainer}>
                    <NeuButton
                        color = "#ffffff"
                        height = {deviceDimesions.Height*0.04}
                        width = {deviceDimesions.width*0.08}
                        borderRadius = {10}
                        onPress = {()=>this.setState({showTiemPicker : false,isSudhajathakam : !this.state.isSudhajathakam},this.setState({isManglik : false }))}
                    >
                        {
                            this.state.isSudhajathakam ? <Icon name="check" color="red" /> : null
                        }
                        
                    </NeuButton>
                    <Text style={{marginLeft : 10, opacity : 0.7}}> Sudhajathakam</Text>
                </View>

                {/* Matching Stars */}
                <ToggleButtonForPicker 
                    DownIcon={false} 
                    onButtonPress={()=>this.toggleMultiselectPicker(!this.state.showMiltiselectPicker)} 
                    buttonTitle = {this.state.matchingStarsLable.length > 50 ? this.state.matchingStarsLable.slice(0,35)+"..." : this.state.matchingStarsLable}
                />
                <Modal
                    visible = {this.state.showMiltiselectPicker}
                    animationType="slide"
                    transparent={true}
                    onBackdropPress = { () => this.setState({showMiltiselectPicker:false})}
                    onRequestClose={() => {
                        this.setState({showMiltiselectPicker:false})
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView contentContainerStyle={{width : deviceDimesions.width*0.8, backgroundColor : "#ffffff", padding : deviceDimesions.width*0.02, borderRadius : 10}}>
                                {
                                    this.state.AllStarsArr.map((el,i)=>{
                                        return(
                                            <TouchableOpacity  
                                                onPress = {()=>this.onMatchingStarSelectUnselect(el,i)}
                                                style = {{paddingHorizontal : deviceDimesions.Height*0.015, paddingVertical : deviceDimesions.width*0.025, flexDirection : 'row',width : deviceDimesions.width*0.8}}>
                                                <View style = {{alignItems : 'center'}}>
                                                    <Text style={{color : el.checked ? "red" : "#000", fontSize : 15}}>{el.star_name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                            <View style={{alignItems : 'center', alignContent:'center',justifyContent:'center',flexDirection : 'row' , backgroundColor : "#f2f2f2", paddingVertical : deviceDimesions.Height*0.01}}>
                            <NeuButton
                                    width = {deviceDimesions.width*0.3}
                                    height = {deviceDimesions.Height*0.05}
                                    color = "#ffffff"
                                    borderRadius = {10}
                                    onPress = {() => this.setState({showMiltiselectPicker:false})}
                                    style={{marginLeft:10}}
                                >
                                    <Text>Cancel</Text>
                                </NeuButton>
                                <NeuButton
                                    width = {deviceDimesions.width*0.3}
                                    height = {deviceDimesions.Height*0.05}
                                    color="#ffc115"
                                    borderRadius = {10}
                                    onPress = {() => this.OnSaveMatchingStarsPress()}
                                    style={{marginLeft:10}}
                                    noShadow
                                >
                                    <Text>Save</Text>
                                </NeuButton>
                                
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.uploadButtonContainer}>
                    <NeuButton
                        color = "#ffffff"
                        width = {deviceDimesions.width*0.5}
                        height = {35}
                        borderRadius = {20}
                        // active
                        onPress = {()=>this.setState({showCustomImagePicker : true})}
                        containerStyle = {{
                            flexDirection : "row",
                            justifyContent : "space-evenly"
                        }}
                    >
                        <Text>Upload Horoscope</Text>
                        <NeuBorderView
                                color = "#ffffff"
                                width = {30}
                                height = {30}
                                borderRadius = {20}
                                inset
                            >
                                    <Icon name="upload" color="red" />
                            </NeuBorderView>
                    </NeuButton>
                    {
                        this.state.singleFileOBJ ? 
                        <View>
                            <Image source={this.state.singleFileOBJ} style={{height : deviceDimesions.Height*0.15, width : deviceDimesions.width*0.3, marginTop : deviceDimesions.Height*0.02}} />
                            <TouchableOpacity style={{width : deviceDimesions.width*0.3, padding : 5, alignItems : 'center'}} onPress={()=>this.setState({singleFileOBJ : ''})}>
                                <Text style={{color : 'red'}}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                         : null
                    }
                   
                </View>
                </View>
                : 
                null
            }

                <View style={{marginTop : 30}}>
                    <SubmitAndNextButton
                        buttonTitle = "Next"
                        buttonIcon = {<Icon name="chevron-right" color="red" />}
                        onSubmitPress = {()=>this.onNextPress()}
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
                            <TouchableOpacity onPressIn={() => this.setState({ showLocationModal: false })} style={{ position: 'absolute', right: 0, paddingHorizontal: deviceDimesions.width * 0.03, paddingVertical: deviceDimesions.width * 0.02 }}>
                                <Text style={{ fontSize: 20 ,color:"orange" }}>X</Text>
                            </TouchableOpacity>
                            <AutoCompleteInput placeHolder="Enter City" value={!this.state.locationName ? '' : this.state.locationName.name} data={this.state.LocationData} onChangeText={(text) => this.onLocationInputChange(text)} renderOptions={(el) => this._renderLocationOptions(el)} />
                        </View>
                    </View>
                </Modal>
            <CustomImagePicker
                  pickerMode = 'image' 
                  pickerTitle="Upload Image"
                  CaptureImage={()=>{this.ImageCapture()}}
                  UploadImage={()=>{this.ImagePick()}} 
                  UploadImageFromFacebook={()=>null} 
                  showImagePicker={this.state.showCustomImagePicker} 
                  onPressOut={()=>{this.setState({showCustomImagePicker : false})}}
                />
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
    termsAndConditionContainer : {
        flexDirection : "row",
        marginTop : deviceDimesions.Height*0.04,
        alignItems : "center"
    },
    uploadButtonContainer : {
        flex : 1,
        alignItems : "flex-start",
        marginTop : deviceDimesions.Height*0.04
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : 'rgba(255,255,255,0.5)'
    },
    modalView: {
        borderRadius: 10,
        height : deviceDimesions.Height*0.7,
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