// PrivacySettings
import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ToastAndroid } from "react-native";
import Autocomplete from 'react-native-autocomplete-input';
import { NeuBorderView, NeuButton } from "react-native-neu-element"
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import { Picker } from '@react-native-picker/picker';
import { ImageBackground } from 'react-native';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { PrivacySettingsApi } from '../../helper/API_Call/API_Call'
import { goToChangePasswordScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import { ScrollView } from 'react-native';
import { SignupDropDownFullWidth } from '../../component/SignupDropDownFullWidth/SignupDropDownFullWidth';

export const PrivacySettings = ({ onBackButtonPress }) => {

    const [ProfilePictureShow, setProfilePictureShow] = useState({ id: 1, name: 'All' });
    const [GalleryImagesShow, setGalleryImagesShow] = useState({ id: 1, name: 'All' });
    const [ContactView, setContactView] = useState('');
    const [SendContactWithEmail, setSendContactWithEmail] = useState(false)
    const [SendContactWithMobile, setSendContactWithMobile] = useState(false)

    const OnSubmit = async () => {


        if (!ProfilePictureShow) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose your Profile Picture',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!GalleryImagesShow) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose your Galleryimg',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!SendContactWithMobile && !SendContactWithEmail) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose Email or Mobile',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else if (!ContactView) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Choose your Contact',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
        else {
            let Obj = {
                profile_pic_show: ProfilePictureShow,
                gallery_show: GalleryImagesShow,
                contact_show_privacy: ContactView,
                connect_via_email: SendContactWithEmail ? 1 : 0,
                connect_via_sms: SendContactWithMobile ? 1 : 0,



            }
            PrivacySettingsApi(Obj).then(res => {
                console.log(res.data)
                ToastAndroid.showWithGravityAndOffset(
                    'Privacy Settings Updated.',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            })
                .catch(err => {
                    let error = err
                    console.log(error)
                })

        }
    }

    const PickerShowSettingOptions = [
        {
            id: 2,
            name: 'Premium members only'
        },


        {
            id: 3,
            name: 'Interest accepted members only'
        },
    ]


    useEffect(() => {

    })

    return (
        <ImageBackground source={ImagesPathVariable.SignupBackground} style={styles.container}>
            <ScrollView>
                <View style={{ width: deviceDimesions.width * 0.95, alignSelf: "center", alignItems: "center", flexDirection: "row", padding: 10 }}>
                    <TouchableOpacity onPress={() => onBackButtonPress()} style={{}}>
                        <Icon name="chevron-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginLeft: deviceDimesions.width * 0.05 }}>Privacy Settings</Text>
                </View>
                <View style={styles.ChangePasswordButtonContainer}>
                    <SubmitAndNextButton
                        buttonTitle="Change Password"
                        buttonIcon={<Icon name="unlock" color="red" />}
                        onSubmitPress={() => goToChangePasswordScreen()}
                    />
                </View>
                <View style={styles.contentContainer}>
                    {/* Profile Picture */}
                    <View>
                        <Text style={styles.OptionsTitleText}>Profile Picture</Text>
                        <SignupDropDownFullWidth
                            selectedPickerValue={ProfilePictureShow}
                            onChangeHandler={(item, index) => setProfilePictureShow(item)}
                            staticLable="All"
                            renderPickerOption={() =>
                                PickerShowSettingOptions.map((el, i) => {
                                    return (
                                        <Picker.Item value={el.id} label={el.name} />
                                    )
                                })
                            }
                        />
                    </View>
                    {/* Gallery Images */}
                    <View>
                        <Text style={styles.OptionsTitleText}>Gallery Images</Text>
                        <SignupDropDownFullWidth
                            selectedPickerValue={GalleryImagesShow}
                            onChangeHandler={(item, index) => setGalleryImagesShow(item)}
                            staticLable="All"
                            renderPickerOption={() =>
                                PickerShowSettingOptions.map((el, i) => {
                                    return (
                                        <Picker.Item value={el.id} label={el.name}
                                        />
                                    )
                                })
                            }
                        />
                    </View>
                    {/* Send Connection Checkbox */}
                    <View>
                        <Text style={styles.OptionsTitleText}>How I want to be contacted </Text>
                        <View style={styles.ContactChackBoxContainer}>
                            <View style={styles.checkBoxOption}>
                                <NeuButton
                                    width={deviceDimesions.width * 0.08}
                                    height={deviceDimesions.Height * 0.04}
                                    color="#f5f5f5"
                                    borderRadius={5}
                                    onPress={() => setSendContactWithEmail(!SendContactWithEmail)}
                                >
                                    {
                                        SendContactWithEmail ? <Icon name="check" color="red" /> : null
                                    }
                                </NeuButton>
                                <Text>Email</Text>
                            </View>
                            <View style={styles.checkBoxOption}>
                                <NeuButton
                                    width={deviceDimesions.width * 0.08}
                                    height={deviceDimesions.Height * 0.04}
                                    color="#f5f5f5"
                                    borderRadius={5}
                                    onPress={() => setSendContactWithMobile(!SendContactWithMobile)}
                                >
                                    {
                                        SendContactWithMobile ? <Icon name="check" color="red" /> : null
                                    }
                                </NeuButton>
                                <Text>Mobile</Text>
                            </View>
                        </View>
                    </View>

                    {/* Contact View */}
                    <View>
                        <Text style={styles.OptionsTitleText}>View My Contact</Text>
                        <SignupDropDownFullWidth
                            selectedPickerValue={ContactView}
                            onChangeHandler={(item, index) => setContactView(item)}
                            staticLable="Only Me"
                            renderPickerOption={() =>
                                PickerShowSettingOptions.map((el, i) => {
                                    return (
                                      
                                            <Picker.Item value={el.id} label={el.name} />
                                     
                                    )
                                })
                            }
                        />
                    </View>
                </View>
                <View style={styles.SubmitButtonContainer}>
                    <SubmitAndNextButton
                        buttonTitle="Save"
                        buttonIcon={<Icon name="chevron-right" color="red" />}
                        onSubmitPress={() => OnSubmit()}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: deviceDimesions.Height * 0.01,
        width: deviceDimesions.width,
    },
    contentContainer: {
        paddingBottom: deviceDimesions.Height * 0.03
    },
    SubmitButtonContainer: {
        flex: 1,
        paddingVertical: deviceDimesions.Height * 0.05
    },
    ChangePasswordButtonContainer: {
        flex: 1,
        paddingVertical: deviceDimesions.Height * 0.03
    },
    OptionsTitleText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: deviceDimesions.width * 0.1,
        marginTop: deviceDimesions.Height * 0.04,
        marginBottom: -deviceDimesions.Height * 0.04
    },
    ContactChackBoxContainer: {
        flexDirection: 'row',
        width: deviceDimesions.width * 0.9,
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: deviceDimesions.Height * 0.06
    },
    checkBoxOption: {
        flexDirection: 'row',
        width: deviceDimesions.width * 0.4,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
});