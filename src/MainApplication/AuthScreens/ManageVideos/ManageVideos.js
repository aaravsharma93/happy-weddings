// ManageVideos
import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TextInput, Text, Alert, ScrollView, BackHandler, Image, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { NeuView, NeuInput, NeuButton, NeuBorderView } from 'react-native-neu-element';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { H3 } from 'native-base';
import deviceDimesions from '../../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../../helper/ImagesPathVariable/ImagesPathVariable';
import ImagePicker from 'react-native-image-crop-picker';
import { CustomImagePicker } from '../../../component/ImagePicker/ImagePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAllGalleryVideos, GetMemberDetail, UploadGalleryVideos, UploadProfileVideoAPI } from '../../../helper/API_Call/API_Call';
import { BaseURL } from '../../../API_config/BaseURL';
import LoaderOnButtonPress from '../../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

export default class ManageVideos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: ""
            },
            currentVideo: "",
            isVideoPlayerModalOpen: false,
            allVideos: [
               
            ],
            isImageOptionOpen: false,
            imagesToRemove: [],
            showCustomVideoPicker: false,
            access_token: '',
            userData: '',
            ShowVideoPickerImage: '',
            ShowVideoPicker: ''

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
        try {
            let userDataObj = JSON.parse(await AsyncStorage.getItem('user_data'))
            const access_token = await AsyncStorage.getItem('access_token');
            this.setState({ access_token });
            await GetMemberDetail(userDataObj.userdata.member_id, userDataObj.auth_token)
                .then((res) => {
                    let response = res;
                    console.log(response.data.data)
                    console.log(this.state.access_token)
                    this.setState({
                        userData: response.data.data,
                    })
                    this.setState({ ShowVideoPickerImage: response.data.data.profile_video_thumbnail })
                    this.setState({ ShowVideoPicker: response.data.data.profile_video })

                }).catch(err => {
                    console.log(err)
                })
        }
        catch {

        }
    }

    VideoCapture() {
        ImagePicker.openCamera({
            mediaType: "video"
        }).then(async (video) => {
            this.ToggleLoader("Uploading Video...", true)
            console.log(video)
            await UploadProfileVideoAPI(video, this.state.access_token).then(async (res) => {
                let response = res;
                console.log(response.data.thumbnail_url, "+Uploading Video Image++")
                console.log(response.data.video_url, "+Uploading Video++")
                this.ToggleLoader("Uploading Video...", false)
                 GetMemberDetail(userDataObj.userdata.member_id, userDataObj.auth_token)
                .then((res) => {
                    let response = res;
                    console.log(response.data.data)
                    console.log(this.state.access_token)
                    this.setState({
                        userData: response.data.data,
                    })
                    this.setState({ ShowVideoPickerImage: response.data.data.profile_video_thumbnail })
                    this.setState({ ShowVideoPicker: response.data.data.profile_video })

                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => this.ToggleLoader("", false))
        });

        this.setState({ showCustomVideoPicker: false })
    }

    VideoPick() {
        ImagePicker.openPicker({
            mediaType: "video",
        }).then(async (video) => {
            this.ToggleLoader("Uploading Video...", true)
            console.log(video)
            await UploadProfileVideoAPI(video, this.state.access_token).then(async (res) => {
                let response = res;
                console.log(response.data.thumbnail_url, "+Uploading Video Image++")
                console.log(response.data.video_url, "+Uploading Video++")
                this.ToggleLoader("Uploading Video...", false)

                 GetMemberDetail(userDataObj.userdata.member_id, userDataObj.auth_token)
                .then((res) => {
                    let response = res;
                    console.log(response.data.data)
                    console.log(this.state.access_token)
                    this.setState({
                        userData: response.data.data,
                    })
                    this.setState({ ShowVideoPickerImage: response.data.data.profile_video_thumbnail })
                    this.setState({ ShowVideoPicker: response.data.data.profile_video })

                }).catch(err => {
                    console.log(err)
                })
 
            }).catch(err => this.ToggleLoader("", false))
        });

        this.setState({ showCustomVideoPicker: false })
    }



    onImageCheckUncheck(img, imgIndex) {
        let allImgArr = [...this.state.allImages]
        let imagesToRemoveArr = [...this.state.imagesToRemove]

        allImgArr[imgIndex].isChecked = !allImgArr[imgIndex].isChecked

        if (imagesToRemoveArr.length <= 0) {
            imagesToRemoveArr.push(img);
        }
        else if (!imagesToRemoveArr.some(el => el.videoId == img.videoId && imagesToRemoveArr.length > 0)) {
            imagesToRemoveArr.push(img);
        }
        else if (imagesToRemoveArr.some(el => el.videoId == img.videoId && imagesToRemoveArr.length > 0)) {
            let indexOfImg = imagesToRemoveArr.indexOf(img)
            imagesToRemoveArr.splice(indexOfImg, 1)
        }

        this.setState({ allImages: allImgArr, imagesToRemove: imagesToRemoveArr })
    }

    removePhotos = () => {
        let imagesToRemove = [...this.state.imagesToRemove]
        let allImgArr = [...this.state.allImages]

        let result = imagesToRemove.filter(o1 => allImgArr.some(o2 => o1.videoId === o2.videoId));

        if (result.length == 0) {
            return false
        }
        else if (result.length > 0 && allImgArr.length == imagesToRemove.length) {
            allImgArr = []
        }
        else {
            result.map((el, i) => {
                let indexOfEle = allImgArr.indexOf(el)
                return (
                    allImgArr.splice(indexOfEle, 1)
                )
            })
        }
        this.setState({ imagesToRemove: [], allImages: allImgArr, isImageOptionOpen: false })
    }

    openImageOptions = () => {
        let allImgArr = [...this.state.allImages]

        allImgArr.forEach(element => {
            element.isChecked = false
        });

        this.setState({ allImages: allImgArr, isImageOptionOpen: !this.state.isImageOptionOpen })
    }

    render() {
        const { onBackButtonPress } = this.props
        return (
            <View style={styles.container}>
                {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />

                {
                    !this.state.isImageOptionOpen ?
                        <View style={{ width: deviceDimesions.width * 0.95, alignSelf: "center", alignItems: "center", flexDirection: "row", padding: 10 }}>
                            <TouchableOpacity onPress={() => onBackButtonPress()} style={{}}>
                                <Icon name="chevron-left" size={20} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, marginLeft: deviceDimesions.width * 0.05 }}>Manage Videos</Text>
                        </View>
                        :
                        <View style={{ width: deviceDimesions.width * 0.95, alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <TouchableOpacity onPress={() => this.openImageOptions()} style={{}}>
                                <Icon name="times" size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.removePhotos()} style={{ flexDirection: "row" }}>
                                <Text>Delete  </Text>
                                <Icon name="trash" color="red" size={20} />
                            </TouchableOpacity>
                        </View>
                }

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={{ marginTop: deviceDimesions.Height * 0.02, alignSelf: "center", padding: 5 }}>
                        <NeuView
                            color="#f5f5f5"
                            borderRadius={15}
                            width={deviceDimesions.width * 0.9}
                            height={deviceDimesions.Height * 0.25}
                            convex
                        >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: deviceDimesions.width * 0.8 }}>
                                <View>
                                    <Image
                                        style={{ resizeMode: "stretch", height: deviceDimesions.Height * 0.15, width: deviceDimesions.width * 0.3, borderRadius: 500 }}
                                        source={{ uri: BaseURL.DemoURL + this.state.userData.profile_image }}
                                    />
                                </View>
                                <View style={{ marginLeft: deviceDimesions.width * 0.1, alignItems: "flex-start", justifyContent: "center" }}>
                                    <H3>{this.state.userData ? this.state.userData.first_name : ''}</H3>
                                    <Text>{this.state.userData ? this.state.userData.member_profile_id : ''}</Text>
                                </View>
                            </View>
                        </NeuView>
                    </View>

                    <View style={{ marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
                        <H3>My Videos ( {this.state.ShowVideoPickerImage ? "1" : "0" } )</H3>
                    </View>

                    <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: "row", flexWrap: "wrap", alignItems: 'center' }}>
                        <View style={{ width: deviceDimesions.width * 0.33, alignItems: "center", padding: 5, marginTop: deviceDimesions.Height * 0.05 }}>
                            <NeuButton
                                width={deviceDimesions.width * 0.3}
                                height={deviceDimesions.Height * 0.2}
                                borderRadius={15}
                                color="#f5f5f5"
                                onPress={() => this.setState({ showCustomVideoPicker: true })}
                            >
                                <NeuView
                                    color="#f5f5f5"
                                    borderRadius={15}
                                    width={deviceDimesions.width * 0.2}
                                    height={deviceDimesions.Height * 0.1}
                                    inset
                                >
                                    <Icon name="plus" color="orange" size={20} />
                                </NeuView>
                                <Text>Add Video</Text>
                            </NeuButton>
                        </View>
                       
                        {
                            this.state.ShowVideoPicker
                                ?

                                <View style={{ width: deviceDimesions.width * 0.33, alignItems: "center", marginTop: deviceDimesions.Height * 0.05 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ isVideoPlayerModalOpen: true })}
                                        style={{ padding: 5, borderWidth: 1, borderRadius: 10, width: deviceDimesions.width * 0.3, height: deviceDimesions.Height * 0.21, alignItems: 'center', justifyContent: 'center', justifyContent: 'space-around' }}
                                    >
                                        <View>

                                            <View style={{flex:1}}>
                                            <Image
                                                style={{ resizeMode: "stretch", height: deviceDimesions.Height * 0.2, width: deviceDimesions.width * 0.28, borderRadius: 15, }}
                                                source={{ uri: BaseURL.DemoURL + this.state.ShowVideoPickerImage }}
                                            />


                                            </View>
                                            <View style={{flex:2,marginLeft:50}}>
                                            <Icon name="play" color="orange" size={26} />
                                                </View>
                                          
   


                                        </View>

                                    </TouchableOpacity>
                                </View>

                                : null
                        }
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isVideoPlayerModalOpen}
                        onBackdropPress={() => this.setState({ isVideoPlayerModalOpen: false })}
                        onRequestClose={() => {
                            this.setState({ isVideoPlayerModalOpen: false })
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                               
                                <VideoPlayer
                                    video={{ uri: BaseURL.DemoURL + this.state.ShowVideoPicker }}
                                    videoWidth={1600}
                                    videoHeight={900}
                                    style={{ borderRadius: 10, alignContent: 'center', justifyContent: 'center' }}
                                    thumbnail={{ uri: BaseURL.DemoURL + this.state.ShowVideoPickerImage }}
                                />
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
                
                <CustomImagePicker
                    pickerMode='video'
                    pickerTitle="Upload Video"
                    CaptureVideo={() => { this.VideoCapture() }}
                    UploadVideo={() => { this.VideoPick() }}
                    UploadImageFromFacebook={() => null}
                    showImagePicker={this.state.showCustomVideoPicker}
                    onPressOut={() => { this.setState({ showCustomVideoPicker: false }) }}
                />
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
    },
    contentContainer: {
        justifyContent: "space-around"
    },
    centeredView: {

        justifyContent: "center",
        paddingTop: deviceDimesions.Height * 0.05,
        alignItems: "center",
    },
    modalView: {
        width: deviceDimesions.width,
        height: deviceDimesions.Height * 0.4,
        paddingTop: deviceDimesions.Height * 0.04,
        backgroundColor: "rgba(0,0,0,0.8)",
        marginTop: 80,
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
})
