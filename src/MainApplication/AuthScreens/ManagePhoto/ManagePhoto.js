// ManagePhoto

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
import { GetMemberAllGalleryPics, GetMemberDetail, setProfilePic, UploadGalleryPictures, UploadProfilePictureAPI } from '../../../helper/API_Call/API_Call';
import { ToastAndroid } from 'react-native';
import { BaseURL } from '../../../API_config/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderOnButtonPress from '../../../component/LoaderOnButtonPress/LoaderOnButtonPress';

export default class ManagePhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: '',
            Img_Id: 1,
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: ""
            },
            allImages: [],
            isImageOptionOpen: false,
            imagesToRemove: [],
            showCustomImagePicker: false,
            showCustomProfileImagePicker: false,
            access_token: '',
            selectedImageToMakeProfilePicture: "",
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
                }).catch(err => {
                    console.log(err)
                })

            await GetMemberAllGalleryPics(this.state.access_token, "")
                .then(res => {
                    let ImageArr = [];
                    // let imgID = 1;
                    let response = res;
                    console.log(JSON.stringify(response.data))
                    if (response.data.status) {
                        console.log(response.data.gallery_photos)
                        response.data.gallery_photos.map((el, i) => {
                            let imgModifiedObj = {
                                imgId: this.state.Img_Id,
                                ImgSrc: { uri: BaseURL.DemoURL + el.gallery },
                                isChecked: false
                            };
                            // imgID++;
                            this.setState({ Img_Id: this.state.Img_Id + 1 })
                            return ImageArr.push(imgModifiedObj)
                        })
                        console.log(ImageArr)
                        // return Image
                        this.setState({ allImages: ImageArr })
                    }
                    else {
                        ToastAndroid.showWithGravityAndOffset(
                            ' Gallery is empty.',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        )
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }
        catch {

        }


    }

    ImageCapture() {
        let newImgId = this.state.allImages.length + 1
        let imagesArr = [...this.state.allImages]
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
        };

        ImagePicker.openCamera({
            compressImageQuality: 0.5,
            cropping: true,
            width: 300,
            height: 400,
        }).then(image => {
            UploadGalleryPictures([image], this.state.access_token)
                .then(res => {
                    GetMemberAllGalleryPics(this.state.access_token, "")
                        .then(res => {
                            let ImageArr = [];
                            let imgID = 1;
                            let response = res;
                            console.log(JSON.stringify(response.data))
                            if (response.data.status) {
                                console.log(response.data.gallery_photos)
                                response.data.gallery_photos.map((el, i) => {
                                    let imgModifiedObj = {
                                        imgId: this.state.Img_Id,
                                        ImgSrc: { uri: BaseURL.DemoURL + el.gallery },
                                        isChecked: false
                                    };
                                    // imgID++;
                                    this.setState({ Img_Id: this.state.Img_Id + 1 })
                                    return ImageArr.push(imgModifiedObj)
                                })
                                // console.log(ImageArr)
                                // return Image
                                this.setState({ allImages: ImageArr })
                            }
                            else {
                                ToastAndroid.showWithGravityAndOffset(
                                    ' Gallery is empty.',
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50
                                )
                            }

                        })
                        .catch(err => {
                            console.log(err)
                        })
                    let response = res;
                    console.log(response.data);
                    ToastAndroid.showWithGravityAndOffset(
                        'Gallery Pictures Uploaded Successfully.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                   
                })
                .catch(err => {
                    let error = err
                    ToastAndroid.showWithGravityAndOffset(
                        'Failed to upload Gallery pictures.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                })

        })

    
        this.setState({ showCustomImagePicker: false })
    }

    ImagePick() {
        ImagePicker.openPicker({
            multiple: true,
            compressImageQuality: 0.5,
            cropping: true,
            width: 300,
            height: 400,
        }).then(images => {
 
            UploadGalleryPictures(images, this.state.access_token)
                .then(res => {
                    GetMemberAllGalleryPics(this.state.access_token, "")
                        .then(res => {
                            let ImageArr = [];
                            let imgID = 1;
                            let response = res;
                            console.log(JSON.stringify(response.data))
                            if (response.data.status) {
                                console.log(response.data.gallery_photos,"------------------")
                                response.data.gallery_photos.map((el, i) => {
                                    let imgModifiedObj = {
                                        imgId: this.state.Img_Id,
                                        ImgSrc: { uri: BaseURL.DemoURL + el.gallery },
                                        isChecked: false
                                    };
                                    this.setState({ Img_Id: this.state.Img_Id + 1 })
                                    return ImageArr.push(imgModifiedObj)
                                })
                                
                                this.setState({ allImages: ImageArr })
                            }
                            else {
                                ToastAndroid.showWithGravityAndOffset(
                                    ' Gallery is empty.',
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50
                                )
                            }

                        })
                        .catch(err => {
                            console.log(err)
                        })
                    let response = res;
                    console.log(response.data);
                    ToastAndroid.showWithGravityAndOffset(
                        'Gallery Pictures Uploaded Successfully.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                   
                })
                .catch(err => {
                    let error = err
                    ToastAndroid.showWithGravityAndOffset(
                        'Failed to upload Gallery pictures.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                })
        })
        
        this.setState({ showCustomImagePicker: false })
    }

    ProfileImageCapture() {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
                }).then(image => {
            console.log(image,"Image--------------------26");
            this.ToggleLoader("Uploading Profile Picture...", true)
            
        })
        this.setState({ showCustomProfileImagePicker: false })
    }

    ProfileImagePick() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image,"-----------------image-------------------")
            this.ToggleLoader("Uploading Profile Picture...", true)
            UploadProfilePictureAPI(image, this.state.access_token)
                .then(res => {
                    let response = res;
                    console.log(response);
                    if (response.status) {
                        this.setProfilePictureGlobally(response.data)
                      
                        ToastAndroid.showWithGravityAndOffset(
                            'Profile Picture Uploaded Successfully.',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                    }
                    else {
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
                .catch(err => {
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

        this.setState({ showCustomProfileImagePicker: false })
    }

    async setProfilePictureGlobally(data) {
        let userData = await AsyncStorage.getItem('user_data')
        let newProfileImage = data.profile_image.replace("https://demo.happyweddings.com/", "")
        console.log(newProfileImage)
        let newUserData = JSON.parse(userData)
        newUserData.userdata.profile_pic = newProfileImage
        await AsyncStorage.setItem("user_data", JSON.stringify(newUserData)).then(res => this.ToggleLoader("", false))
        await GetMemberDetail(newUserData.userdata.member_id, this.state.access_token)
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
    }

    onImageCheckUncheck(img, imgIndex) {
        let allImgArr = [...this.state.allImages]
        let imagesToRemoveArr = [...this.state.imagesToRemove]

        allImgArr[imgIndex].isChecked = !allImgArr[imgIndex].isChecked

        if (imagesToRemoveArr.length <= 0) {
            imagesToRemoveArr.push(img);
        }
        else if (!imagesToRemoveArr.some(el => el.imgId == img.imgId && imagesToRemoveArr.length > 0)) {
            imagesToRemoveArr.push(img);
        }
        else if (imagesToRemoveArr.some(el => el.imgId == img.imgId && imagesToRemoveArr.length > 0)) {
            let indexOfImg = imagesToRemoveArr.indexOf(img)
            imagesToRemoveArr.splice(indexOfImg, 1)
        }

        this.setState({ allImages: allImgArr, imagesToRemove: imagesToRemoveArr })
    }

    makeProfilePicture = () => {
        console.log(this.state.selectedImageToMakeProfilePicture.ImgSrc.uri.replace("https://demo.happyweddings.com/uploads/gallery_image/", ""))
        setProfilePic(this.state.selectedImageToMakeProfilePicture.ImgSrc.uri.replace("https://demo.happyweddings.com/uploads/gallery_image/", ""), this.state.access_token).then(async (res) => {
            let response = res;
            if (response.data.status) {
                let userData = await AsyncStorage.getItem('user_data')
                let newProfileImage = this.state.selectedImageToMakeProfilePicture.ImgSrc.uri.replace("https://demo.happyweddings.com/", "")
                console.log(newProfileImage)
                let newUserData = JSON.parse(userData)
                newUserData.userdata.profile_pic = newProfileImage
                await AsyncStorage.setItem("user_data", JSON.stringify(newUserData)).then(res => this.ToggleLoader("", false))
                await GetMemberDetail(newUserData.userdata.member_id, this.state.access_token)
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
                this.setState({ isImageOptionOpen: false })
                ToastAndroid.showWithGravityAndOffset(
                    'Profile Picture Changed.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                )
            } else {
                this.setState({ isImageOptionOpen: false })
                ToastAndroid.showWithGravityAndOffset(
                    'Failed to change profile picture',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                )
            }
        })
            .catch(err => {
                let error = err;
                this.setState({ isImageOptionOpen: false })
                ToastAndroid.showWithGravityAndOffset(
                    'Failed to change profile picture',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                )
            })
          }

    openImageOptions = (el) => {

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
                        <View style={{ width: deviceDimesions.width * 0.95, alignSelf: "center", alignItems: "center", flexDirection: "row", padding: 20 }}>
                            <TouchableOpacity onPressIn={() => onBackButtonPress()} style={{}}>
                                <Icon name="chevron-left" size={20} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, marginLeft: deviceDimesions.width * 0.05 }}>Manage Photo</Text>
                        </View>
                        :
                        <View style={{ width: deviceDimesions.width * 0.95, alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                            <TouchableOpacity onPressIn={() => this.openImageOptions()} style={{}}>
                                <Icon name="times" size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.makeProfilePicture()} style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Text>Make Profile Picture  </Text>
                                <Icon name="picture-o" size={20} />
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
                            <View style={{ flexDirection: "row", justifyContent: "space-around", width: deviceDimesions.width * 0.8 }}>
                                <TouchableOpacity onPress={() => this.setState({ showCustomProfileImagePicker: true })}>
                                    <Image
                                        style={{ height: deviceDimesions.Height * 0.17, width: deviceDimesions.width * 0.32, borderRadius: 100 }}
                                        source={{ uri: BaseURL.DemoURL + this.state.userData.profile_image }}
                                    />
                                    <Text style={{ paddingVertical: deviceDimesions.Height * 0.01, color: "orange", fontSize: 14, fontWeight: '700' }}>Change Profile Photo</Text>
                                </TouchableOpacity>
                                <View style={{ marginLeft: deviceDimesions.width * 0.1, alignItems: "flex-start", justifyContent: "center" }}>
                                    <H3>{this.state.userData ? this.state.userData.first_name : ''}</H3>
                                    <Text>{this.state.userData ? this.state.userData.member_profile_id : ''}</Text>
                                </View>
                            </View>
                        </NeuView>
                    </View>

                    <View style={{ marginTop: deviceDimesions.Height * 0.02, width: deviceDimesions.width * 0.9, alignSelf: "center" }}>
                        <H3>My Photos ( {this.state.allImages.length} )</H3>
                    </View>

                    <View style={{ marginTop: deviceDimesions.Height * 0.02, flexDirection: "row", flexWrap: "wrap" }}>
                        <View style={{ width: deviceDimesions.width * 0.33, alignItems: "center", padding: 5, marginTop: deviceDimesions.Height * 0.05 }}>
                            <NeuButton
                                width={deviceDimesions.width * 0.3}
                                height={deviceDimesions.Height * 0.2}
                                borderRadius={15}
                                color="#f5f5f5"
                                onPressIn={() => this.setState({ showCustomImagePicker: true })}
                                active={this.state.isImageOptionOpen ? true : false}
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
                                <Text>Add Photo</Text>
                            </NeuButton>
                        </View>
                        {
                            this.state.allImages.length > 0
                                ?
                                this.state.allImages.map((el, i) => {
                                    return (
                                        <View style={{ width: deviceDimesions.width * 0.33, alignItems: "center", marginTop: deviceDimesions.Height * 0.05 }}>
                                            <TouchableOpacity
                                                style={{ padding: 5 }}
                                                onLongPress={() => { this.setState({ selectedImageToMakeProfilePicture: el }, () => this.openImageOptions()) }}
                                            >
                                               
                                                <Image style={{ width: deviceDimesions.width * 0.3, height: deviceDimesions.Height * 0.2, resizeMode: "stretch", borderRadius: 15 }} source={el.ImgSrc} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                                : null
                        }
                    </View>
                </ScrollView>
                <CustomImagePicker
                    pickerMode='image'
                    pickerTitle="Upload Image"
                    CaptureImage={() => { this.ImageCapture() }}
                    UploadImage={() => { this.ImagePick() }}
                    UploadImageFromFacebook={() => null}
                    showImagePicker={this.state.showCustomImagePicker}
                    onPressOut={() => { this.setState({ showCustomImagePicker: false }) }}
                />
                <CustomImagePicker
                    pickerMode='image'
                    pickerTitle="Upload Profile Image"
                    CaptureImage={() => { this.ProfileImageCapture() }}
                    UploadImage={() => { this.ProfileImagePick() }}
                    UploadImageFromFacebook={() => null}
                    showImagePicker={this.state.showCustomProfileImagePicker}
                    onPressOut={() => { this.setState({ showCustomProfileImagePicker: false }) }}
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
        flex: 1,
        paddingTop: deviceDimesions.Height * 0.05,
        alignItems: "center",
    },
    modalView: {
        width: deviceDimesions.width * 0.85,
        height: deviceDimesions.Height * 0.45,
        paddingTop: deviceDimesions.Height * 0.04,
        backgroundColor: "#f5f5f5",
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
})
