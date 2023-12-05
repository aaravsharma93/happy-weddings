import { H2, H3, View } from 'native-base';
import React from 'react';
import {
    StyleSheet,
    ImageBackground,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    Text,
    Modal,
    BackHandler,
    Alert,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { NeuBorderView, NeuButton, NeuView } from 'react-native-neu-element';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubmitAndNextButton from '../../component/SubmitAndNextButton/SubmitAndNextButton';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import SocialLoginButton from '../../component/SocialLoginButton/SocialLoginButton';
import { goToDrawerScreen, goToForgetPasswordScreen, goToLoginWithOTPScreen, goToProfileForSignScreen, ToggleLoader } from '../../helper/NavigationFunctions/NavigationFunctions';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';
import { LoginWithUsernamePassword } from '../../helper/API_Call/API_Call';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { Linking } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import { FirebaseConfig } from '../../helper/Firebase.Config/Firebase.Config';
import { TextInput } from 'react-native';
import {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: ""
            },
            username: '',
            password: '',
            isPasswordVisible: true,
            isSignUpMessage: true,
            userNameInModal: '',
            deviceToken: '',
        }
    }

    backAction = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }
        else {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
    };

    async componentDidMount() {
        await messaging()
        .getToken()
        .then(token => {
          console.log("token is -----" + token)
            this.setState({deviceToken : token})
        });

        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: FirebaseConfig.webClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });


        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

        this.setState({ username: "", password: "", userNameInModal: await AsyncStorage.getItem('first_name_registration') })

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

    // Login Button Press  
    onLoginPress() {
        let reqObj = {
            username: this.state.username,
            password: this.state.password,
            device_token: this.state.deviceToken
        }

        console.log(reqObj,"------------")
        if (reqObj.username && reqObj.password && reqObj.device_token) {
            this.ToggleLoader("Logging In...", true)
            LoginWithUsernamePassword(reqObj).then(async (res) => {
                let response = res
                console.log(JSON.stringify(response.data))
                if (response.data.status) {
                    console.log(response.data)
                    AsyncStorage.setItem('user_data', JSON.stringify(response.data))
                    AsyncStorage.setItem('access_token', response.data.auth_token);
                    AsyncStorage.setItem('isLoggedIn', 'true');
                    this.props.navigation.replace('MainDrawer')
                    this.ToggleLoader("", false)
                    ToastAndroid.showWithGravityAndOffset(
                        'Logged in successfully.',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
                else {
                    this.ToggleLoader("", false)
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
            })
        }
        else {
            if (reqObj.username === "") {
                ToastAndroid.showWithGravityAndOffset(
                    'Username can not be empty.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else if (reqObj.password === "") {
                ToastAndroid.showWithGravityAndOffset(
                    'Password can not be empty.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }
    }

    //  Go to signup screen 
    onSignupPress() {
        AsyncStorage.clear();
        goToProfileForSignScreen()
    }

    async onSignupContinuePress() {
        let reqObj = {
            username: await AsyncStorage.getItem('user_email'),
            password: await AsyncStorage.getItem('user_password'),
        }
        this.ToggleLoader('Loading...', true)
        this.setState({ isSignUpMessage: false })
        await LoginWithUsernamePassword(reqObj).then(async (res) => {
            let response = res
            console.log(JSON.stringify(response.data))
            if (response.data.status) {
                AsyncStorage.setItem('user_data', JSON.stringify(response.data))
                AsyncStorage.setItem('access_token', response.data.auth_token);
                AsyncStorage.setItem('isLoggedIn', 'true');
                goToDrawerScreen()
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                    'Logged in successfully.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            else {
                this.ToggleLoader("", false)
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }).catch(err => {
            let error = err
            console.log(JSON.stringify(error))
            this.ToggleLoader("", false)
        })

    }


    async onGoogleLoginPress() {
        try {
            let status = await GoogleSignin.hasPlayServices();
            const firebaseUser = await GoogleSignin.signIn();
            console.log('in try', firebaseUser)
            firebaseUser.provider = "google"
            socialLoginService(firebaseUser).then(res => onLoginResponseReceived(res))
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }

    }

    async handleFacebookLogin() {
        
        LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends'])
            .then(function (result) {
                if (result.isCancelled) {
                } else {
                    AccessToken
                        .getCurrentAccessToken()
                        .then((data) => {
                            let accessToken = data.accessToken
                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log(result)
                                    AsyncStorage.setItem('user_Social_data', (result.name))
                                    AsyncStorage.setItem('user_Social_data_email', (result.email))

                                    goToProfileForSignScreen()
                                }
                            }

                            const infoRequest = new GraphRequest('/me', {
                                accessToken: accessToken,
                                httpMethod: 'GET',
                                version: 'v2.5',
                                parameters: {
                                    fields: {
                                        string: 'email,name,first_name,middle_name,last_name'
                                    }
                                }
                            }, responseInfoCallback);

                            // Start the graph request.
                            new GraphRequestManager()
                                .addRequest(infoRequest)
                                .start()

                        })
                }
            }, function (error) {
                alert('Login fail with error: ' + error);
            });

    }
    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'email,name,first_name,middle_name,last_name',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    console.log('login info has error: ' + JSON.stringify(error));
                } else {
                    console.log(result)
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };
    render() {
        let isSignupWelcomeModalOpen = this.props.route.params.openModel

        return (
            <ImageBackground style={styles.background} source={ImagesPathVariable.LoginBackground}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    barStyle="dark-content"
                />
                {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />

                <KeyboardAvoidingView>
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.LogoContainer}>
                            <Image source={ImagesPathVariable.LoginLogo} />
                        </View>

                        <View style={{ flexDirection: "row", flex: 1, top: deviceDimesions.Height * 0.05, justifyContent: "space-evenly" }}>
                            <SocialLoginButton
                                buttonTitle="facebook"
                                buttonIcon={<Icon name="facebook" color="#3333ff" />}
                                onButtonPress={() => this.handleFacebookLogin()}
                            />
                            <SocialLoginButton
                                buttonTitle="Google"
                                buttonIcon={<Icon name="google" color="#e62e00" />}
                                onButtonPress={() => this.onGoogleLoginPress()}
                            />
                        </View>
                        {/* User Name Input */}
                        <View style={{ alignItems: "center", flex: 1, top: deviceDimesions.Height * 0.05 }}>
                            <NeuBorderView
                                color="#f5f5f5"
                                width={deviceDimesions.width * 0.65}
                                height={50}
                                borderRadius={20}
                            >
                                <TextInput keyboardType="email-address" placeholder="Email ID" value={this.state.username} style={{ fontFamily: 'roboto-Regular', width: deviceDimesions.width * 0.58 }} onChangeText={(text) => this.setState({ username: text.trimStart() })} textAlignVertical="center" />
                            </NeuBorderView>
                        </View>
                       
                        {/* Password Input */}
                        <View style={{ alignItems: "center", flex: 1, top: deviceDimesions.Height * 0.05 }}>
                            <NeuBorderView
                                color="#f5f5f5"
                                width={deviceDimesions.width * 0.65}
                                height={50}
                                borderRadius={20}
                                containerStyle={{
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly"
                                }}
                            >
                                <TextInput key='Password' placeholder="Password" value={this.state.password} secureTextEntry={this.state.isPasswordVisible} style={{ fontFamily: 'roboto-Regular', width: deviceDimesions.width * 0.5 }} onChangeText={(text) => this.setState({ password: text.trimStart() })} textAlignVertical="center" />
                                <TouchableOpacity style={{ padding: 5 }} onPress={() => this.setState({ isPasswordVisible: !this.state.isPasswordVisible })}>
                                    <Icon name={this.state.isPasswordVisible ? "eye" : "eye-slash"} size={18} />
                                </TouchableOpacity>
                            </NeuBorderView>
                        </View>

                        {/* Forget Password Text with navigation */}
                        <View style={styles.forgetPasswordContainer}>
                            <TouchableOpacity onPressIn={() => goToForgetPasswordScreen()}>
                                <Text>Forgot Password</Text>
                            </TouchableOpacity>
                        </View>


                        {/* Login Button */}
                        <SubmitAndNextButton
                            buttonTitle="Login"
                            buttonIcon={<Icon name="sign-in" color="#e62e00" />}
                            onSubmitPress={() => this.onLoginPress()}
                        />

                        {/* Login Button */}
                        <SubmitAndNextButton
                            buttonTitle="Login With OTP"
                            buttonIcon={<Icon name="phone" color="red" size={16} />}
                            onSubmitPress={() => goToLoginWithOTPScreen()}
                        />

                        <View style={styles.RegisterButtonContainer}>
                            <TouchableOpacity onPressIn={() => this.onSignupPress()}>
                                <LinearGradient
                                    colors={['#e62e00', '#e62e00', '#ff8c1a']}
                                    style={styles.linearGradient}
                                >
                                    <Text style={styles.RegisterButtonText}>Register For Free</Text>
                                    <NeuBorderView
                                        color="#f5f5f5"
                                        width={15}
                                        height={15}
                                        borderRadius={20}
                                    >
                                        <LinearGradient
                                            colors={['#e62e00', '#e62e00', '#ff8c1a']}
                                            style={styles.linearGradientForIcon}
                                        >
                                            <Icon name="plus" size={16} color="#f5f5f5" />
                                        </LinearGradient>
                                    </NeuBorderView>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Modal After Signup Completed */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isSignupWelcomeModalOpen && this.state.isSignUpMessage}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.contentContainer}>
                                <View style={styles.textAndLogoContainer}>
                                    <View style={{ marginTop: deviceDimesions.Height * 0.02, marginBottom: deviceDimesions.Height * 0.02 }}>
                                        <NeuView
                                            color="#f5f5f5"
                                            width={deviceDimesions.width * 0.2}
                                            height={deviceDimesions.Height * 0.1}
                                            borderRadius={40}
                                        >
                                            <Image source={IconsPathVariable.CompleteIcon} />
                                        </NeuView>
                                    </View>
                                    <H2>Hi {this.state.userNameInModal}</H2>
                                    <Text style={{ fontSize: 18, fontWeight: "500" }}>Welcome to Happyweddings.com</Text>
                                    <Text style={styles.smallText}>You are now a Verified Member. Let’s start Searching</Text>
                                    <Text style={styles.smallText}>for your Dream Partner</Text>
                                </View>
                                <View style={styles.contactContainer}>
                                    <View style={styles.textWithIcon}>
                                        <NeuButton
                                            color="#f5f5f5"
                                            width={deviceDimesions.width * 0.1}
                                            height={deviceDimesions.Height * 0.05}
                                            borderRadius={20}
                                            onPress={() => Linking.openURL('mailto:care@happyweddings.com')}
                                        >
                                            <Image source={IconsPathVariable.EmailIcon} />
                                        </NeuButton>
                                        <Text style={{ marginLeft: 20, fontWeight: 'bold', opacity: 0.8 }}>care@happyweddings.com</Text>
                                    </View>

                                    <View style={styles.phoneNumberContainer}>
                                        <View style={styles.textWithIcon}>
                                            <NeuButton
                                                color="#f5f5f5"
                                                width={deviceDimesions.width * 0.1}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => Linking.openURL(`tel:1800 1237 80036`)}
                                            >
                                                <Image source={IconsPathVariable.PhoneIcon} />
                                            </NeuButton>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', opacity: 0.8 }}>1800 1237 80036</Text>
                                        </View>
                                        <View style={styles.textWithIcon}>
                                            <NeuButton
                                                color="#f5f5f5"
                                                width={deviceDimesions.width * 0.1}
                                                height={deviceDimesions.Height * 0.05}
                                                borderRadius={20}
                                                onPress={() => Linking.openURL('whatsapp://send?text=hello&phone=+91 8943000724')}
                                            >
                                                <Icon name="whatsapp" color="green" size={24} />
                                            </NeuButton>
                                            <Text style={{ marginLeft: 5, fontWeight: 'bold', opacity: 0.8 }}>+91 8943000724</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <SubmitAndNextButton
                                buttonTitle="Continue"
                                buttonIcon={<Icon name="chevron-right" color="red" />}
                                onSubmitPress={() => this.onSignupContinuePress()}
                            />
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    container: {
        width: deviceDimesions.width,
        height: deviceDimesions.Height / 1.55,
        padding: 10,
    },
    LogoContainer: {
        alignItems: "center",
        flex: 1,
        top: deviceDimesions.Height * 0.02
    },
    RegisterButtonContainer: {
        alignItems: "center",
        flex: 1,
        top: deviceDimesions.Height * 0.02
    },
    linearGradient: {
        padding: 13,
        width: deviceDimesions.width * 0.6,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    RegisterButtonText: {
        color: "#f5f5f5",
        fontSize: 16,
        fontWeight: "700"
    },
    linearGradientForIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: deviceDimesions.width * 0.07,
        aspectRatio: 1,
        borderRadius: 20
    },
    forgetPasswordContainer: {
        alignItems: "center",
        flex: 1,
        top: deviceDimesions.Height * 0.05,
        opacity: 0.7
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.8)",
    },
    modalView: {
        backgroundColor: "rgba(255,255,255,1)",
        justifyContent: "center",
        borderRadius: 20,
        height: deviceDimesions.Height * 0.6,
        width: deviceDimesions.width,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    contentContainer: {
        padding: 10
    },
    textAndLogoContainer: {
        alignItems: "center"
    },
    smallText: {
        opacity: 0.7,
        marginTop: deviceDimesions.Height * 0.005,
        fontSize: 14
    },
    contactContainer: {
        marginTop: deviceDimesions.Height * 0.02,
    },
    textWithIcon: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    phoneNumberContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: deviceDimesions.Height * 0.02,
        marginBottom: deviceDimesions.Height * 0.03
    },
});
