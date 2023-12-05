import React, {Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SignupFormHeader from '../../component/SignupFormHeader/SignupFormHeader';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import {ScrollView, ImageBackground, StatusBar, StyleSheet, View, Text, Image, Alert, BackHandler } from 'react-native';
import { H2 } from 'native-base';
import { NeuView } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import { goToLoginScreen, goToPreviewAndSubmitProfileSignScreen, goToPreviousScreen, goToWelcomeScreenSignScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import { CustomImagePicker } from '../../component/ImagePicker/ImagePicker';
import { UploadGalleryPictures, UploadGalleryVideos, UploadProfilePictureAPI, UploadProfileVideoAPI } from '../../helper/API_Call/API_Call';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';

export default class UploadPhotoAndVideo extends Component {
    constructor(props){
        super(props);
        this.state = {
            showTiemPicker : false,
            singleFileOBJ : '',
            defaultUserImg : ImagesPathVariable.DummyUserLarge,
            videoSource : 'Add Profile Video',
            showCustomImagePicker : false,
            showCustomVideoPicker : false,
            showCustomGalleryImagePicker : false,
            userName : '',
            signup_token : '',
            LoaderProperties : {
              isLoading : false,
              LoadingTitle : ""
            },
            GalleryImagesArr : [],
            showAddMorePicturesButton : false,
        }
    }

    async componentDidMount(){
      this.setState({userName : await AsyncStorage.getItem('first_name_registration')})
      this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
      );
      
      const signup_token = await AsyncStorage.getItem('auth_token_registration');
      this.setState({ signup_token });
      console.log("token is--------" + signup_token)
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

    
    GalleryImagesCapture(){
      ImagePicker.openCamera({
        multiple : true,
        cropping: true,
      }).then(images => {
        let galleryCurrentImages = [...this.state.GalleryImagesArr]
        images.map((el,i)=>{
          return galleryCurrentImages.push({imgSrc : el.path})
        })
        this.setState({GalleryImagesArr : galleryCurrentImages})

        this.ToggleLoader('Uploading Gallery Images...', true)
        console.log(images);
        UploadGalleryPictures([images],this.state.signup_token)
            .then(res => {
              let response = res;
              console.log(response.data);
              ToastAndroid.showWithGravityAndOffset(
                'Gallery Pictures Uploaded Successfully.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              this.ToggleLoader('', false)
            })
            .catch(err=>{
              let error = err
              console.log(JSON.stringify(error))
              ToastAndroid.showWithGravityAndOffset(
                'Failed to upload Gallery pictures.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              this.ToggleLoader('', false)
            })
        
      })
        this.setState({showCustomGalleryImagePicker : false})
    }

    GalleryImagesPick(){
      ImagePicker.openPicker({
        multiple : true,
        cropping: true,
      }).then(images => {
        let galleryCurrentImages = [...this.state.GalleryImagesArr]
        images.map((el,i)=>{
          return galleryCurrentImages.push({imgSrc : el.path})
        })
        this.setState({GalleryImagesArr : galleryCurrentImages})
        console.log(images)
        this.ToggleLoader('Uploading Gallery Images...', true)
        console.log(images);
        UploadGalleryPictures(images,this.state.signup_token)
            .then(res => {
              let response = res;
              console.log(response.data);
              ToastAndroid.showWithGravityAndOffset(
                'Gallery Pictures Uploaded Successfully.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              setTimeout(() => {
                this.ToggleLoader('', false)
              }, 1000);
            })
            .catch(err=>{
              let error = err
              ToastAndroid.showWithGravityAndOffset(
                'Failed to upload Gallery pictures.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
              this.ToggleLoader('', false)
            })
        
      })
        this.setState({showCustomGalleryImagePicker : false})
    }
    
    
    ImageCapture(){
        ImagePicker.openCamera({
          cropping: true,
        }).then(image => {
          this.ToggleLoader("Uploading Profile Picture...", true)
          UploadProfilePictureAPI(image, this.state.signup_token )
              .then(res => {
                let response = res;
                console.log(response);
                if(response.status){
                  this.ToggleLoader("", false)
                  this.setState({
                        defaultUserImg : {
                          uri : image.path
                        },
                        showAddMorePicturesButton : true
                  });
                  ToastAndroid.showWithGravityAndOffset(
                    'Profile Picture Uploaded Successfully.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
                }
                else{
                  this.ToggleLoader("", false)
                  ToastAndroid.showWithGravityAndOffset(
                    'Please Try Again.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
                }
                
              })
              .catch(err=>{
                this.ToggleLoader("", false)
                let error = err
                ToastAndroid.showWithGravityAndOffset(
                  'Failed to upload profile picture.',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
              })
          
        })
          this.setState({showCustomImagePicker : false})
    }

    ImagePick(){
      ImagePicker.openPicker({
        cropping: true,

      }).then(image => {
        this.ToggleLoader("Uploading Profile Picture...", true)
        UploadProfilePictureAPI(image, this.state.signup_token )
            .then(res => {
              let response = res;
              console.log(response);
              if(response.status){
                this.ToggleLoader("", false)
                this.setState({
                    defaultUserImg : {
                      uri : image.path
                    },
                    showAddMorePicturesButton : true
              });
                ToastAndroid.showWithGravityAndOffset(
                  'Profile Picture Uploaded Successfully.',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
              }
              else{
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                  'Please Try Again.',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
              }
            })
            .catch(err=>{
              let error = err
              this.ToggleLoader("", false)
              ToastAndroid.showWithGravityAndOffset(
                'Failed to upload profile picture.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            })
        
      })
        this.setState({showCustomImagePicker : false})
  }


  GalleryVideosCapture(){
     ImagePicker.openCamera({
            mediaType: "video"
        }).then(async (video) => {
            this.ToggleLoader("Uploading Video...", true)
            console.log(video)
            await UploadProfileVideoAPI(video, this.state.signup_token).then(async (res) => {
                let response = res;

               if(response.status){
                 
                console.log(response.data.thumbnail_url, "+Uploading Video Image++")
                console.log(response.data.video_url, "+Uploading Video++")
                this.ToggleLoader("Uploading Video...", false)
                ToastAndroid.showWithGravityAndOffset(
                  'Video Uploaded Successfully.',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
               }else {
                
                this.ToggleLoader("Uploading Video...", false)
            ToastAndroid.showWithGravityAndOffset(
             response.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
               }


            }).catch(err => this.ToggleLoader("", false))
        });

        this.setState({ showCustomVideoPicker: false })
  }

  GalleryVideosPick(){
    ImagePicker.openPicker({
      mediaType: "video"
  }).then(async (video) => {
      this.ToggleLoader("Uploading Video...", true)
      console.log(video)
      await UploadProfileVideoAPI(video, this.state.signup_token).then(async (res) => {
          let response = res;
          if(response.status){
                 
            console.log(response.data.thumbnail_url, "+Uploading Video Image++")
            console.log(response.data.video_url, "+Uploading Video++")
            this.ToggleLoader("Uploading Video...", false)
            ToastAndroid.showWithGravityAndOffset(
              'Video Uploaded Successfully.',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
           }else {
            
            this.ToggleLoader("Uploading Video...", false)
            ToastAndroid.showWithGravityAndOffset(
             response.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
           }

      }).catch(err => this.ToggleLoader("", false))
  });

  this.setState({ showCustomVideoPicker: false })
  }

    onNextPress(){
      navigate('PreviewAndSubmitProfile', {UserImg : this.state.defaultUserImg})
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar
                    backgroundColor = "rgba(0,0,0,0)"
                    barStyle = "dark-content"
                />
                  {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText = {this.state.LoaderProperties.LoadingTitle} />

                    <View style={{height : deviceDimesions.Height*0.2}}>
                        <SignupFormHeader
                          progressValue={0.80} 
                          progressBarTotalWidth={deviceDimesions.width*0.9}
                          backIcon = {false}
                          onBackPress = {()=>goToPreviousScreen(this)}
                          ScreenLogoAndTitle = {true}
                        />
                    </View>

                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <H2>Welcome {this.state.userName}</H2>
                        <TouchableOpacity onPress={()=>this.setState({showCustomImagePicker : true})}>
                            <Image style={{height : 150, width : 150, borderRadius : 70, marginTop : 20}} source={this.state.defaultUserImg} />
                            <View style={styles.imagePlusButtonContainer}>
                                <NeuView 
                                  color="#f5f5f5"
                                  borderRadius = {20}
                                  width = {deviceDimesions.width*0.1}
                                  height = {deviceDimesions.Height*0.055}
                                >
                                    <Icon name="plus" color="red" size={18} />
                                </NeuView>
                            </View>
                        </TouchableOpacity>
                        <View style={{marginTop : deviceDimesions.Height*0.04, marginBottom : deviceDimesions.Height*0.01, alignItems : "center"}}>
                            <Text style={{fontSize : 20, fontWeight : "600" , opacity : 0.9}}>You're All Set</Text>
                            <Text style={{marginTop : deviceDimesions.Height*0.01,fontSize : 16, opacity : 0.6}}>Take a minute to upload a photo</Text>
                        </View>

                          
                                {this.state.showAddMorePicturesButton ?
                                  <SubmitAndNextButton
                                      buttonTitle = "Add More Pictures"
                                      buttonIcon = {<Icon name="plus" color="red" />}
                                      onSubmitPress={()=>this.setState({showCustomGalleryImagePicker : true})}
                                  />
                                  : null
                                }
                       
                             <SubmitAndNextButton
                                  buttonTitle = "Add Profile Video"
                                  buttonIcon = {<Icon name="plus" color="red" />}
                                  onSubmitPress={()=>this.setState({showCustomVideoPicker : true})}
                              />
                                
                         
                                <SubmitAndNextButton
                                  buttonTitle = {this.state.showAddMorePicturesButton ? "Submit" : "Skip And Submit"}
                                  buttonIcon = {<Icon name="chevron-right" color="red" />}
                                  onSubmitPress = {()=>goToWelcomeScreenSignScreen()}
                              />
                      </ScrollView>
                <CustomImagePicker 
                  pickerMode = 'image' 
                  pickerTitle="Upload Image"
                  CaptureImage={()=>{this.ImageCapture()}}
                  UploadImage={()=>{this.ImagePick()}} 
                  UploadImageFromFacebook={()=>null} 
                  showImagePicker={this.state.showCustomImagePicker} 
                  onPressOut={()=>{this.setState({showCustomImagePicker : false})}}
                />

                <CustomImagePicker 
                  pickerMode = 'image' 
                  pickerTitle="Upload Gallery Images"
                  CaptureImage={()=>{this.GalleryImagesCapture()}}
                  UploadImage={()=>{this.GalleryImagesPick()}} 
                  UploadImageFromFacebook={()=>null} 
                  showImagePicker={this.state.showCustomGalleryImagePicker} 
                  onPressOut={()=>{this.setState({showCustomGalleryImagePicker : false})}}
                />

                <CustomImagePicker 
                  pickerMode = 'video'
                  pickerTitle="Upload Video" 
                  CaptureVideo={()=>{this.GalleryVideosCapture()}}
                  UploadVideo={()=>{this.GalleryVideosPick()}} 
                  UploadImageFromFacebook={()=>null} 
                  showImagePicker={this.state.showCustomVideoPicker} 
                  onPressOut={()=>{this.setState({showCustomVideoPicker : false})}} 
                />
                {
                      this.state.GalleryImagesArr.length > 0 ?
                      <>
                        <Text style={{width : deviceDimesions.width*0.8, alignSelf : 'center', fontSize : 16, fontWeight : "600", marginVertical : deviceDimesions.Height*0.03}}>Uploaded Gallery Images -</Text>
                        <View style={{flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'space-evenly', paddingBottom : deviceDimesions.Height*0.02}}>
                          {this.state.GalleryImagesArr.map((el,i)=>{
                              return (
                                <>
                                  <Image source = {{uri : el.imgSrc}} style={{width : deviceDimesions.width*0.25, height : deviceDimesions.Height*0.15, marginVertical : deviceDimesions.Height*0.01}} />
                                </>
                              )
                            })
                          }
                        </View>
                      </>
                      :
                      null
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    padding : 10,
    width : deviceDimesions.width,
    paddingBottom : deviceDimesions.Height*0.1,
    backgroundColor : '#ffffff'
  },
  background: {
    resizeMode : 'cover',
    height: deviceDimesions.Height,
  },
  contentContainer : {
    alignItems : "center",
    justifyContent : "center",
    height : deviceDimesions.Height*0.7
  },
  imagePlusButtonContainer : {
    alignItems : "flex-end",
    marginTop : -deviceDimesions.Height*0.055 ,
    padding : 10
  },
});
