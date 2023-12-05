/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';
import 'react-native-gesture-handler';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { navigationRef } from './src/helper/RootNavigator/RootNavigator';
import LandingScreen from './src/MainApplication/LandingScreen/LandingScreen';
import Login from './src/MainApplication/Login/Login';
import ProfileFor from './src/MainApplication/SignupScreens/ProfileFor';
import SignupDetails from './src/MainApplication/SignupScreens/SignupDetails';
import PersonalDetails from './src/MainApplication/SignupScreens/PersonalDetails';
import AstroInformation from './src/MainApplication/SignupScreens/AstroInformation';
import VerifyMobileNumber from './src/MainApplication/SignupScreens/VerifyMobileNumber';
import UploadPhotoAndVideo from './src/MainApplication/SignupScreens/UploadPhotoAndVideo';
import PreviewAndSubmitProfile from './src/MainApplication/SignupScreens/PreviewAndSubmitProfile';
import WelcomeScreen from './src/MainApplication/SignupScreens/WelcomeScreen';
import ForgetPassword from './src/MainApplication/ForgetPassword/ForgetPassword';
import ForgetPasswordVerification from './src/MainApplication/ForgetPassword/ForgetPasswordVerification';
import LoginWithOTP from './src/MainApplication/LoginWithOTP/LoginWithOTP';
import LoginWithOTPVerification from './src/MainApplication/LoginWithOTP/LoginWithOTPVerification';
import ChangePassword from './src/MainApplication/ChangePassword/ChangePassword';
import MainDrawer from './src/MainApplication/Drawer/MainDrawer';
import Splash from './src/MainApplication/Splash/Splash';
import MatchedUserProfileOverview from './src/MainApplication/AuthScreens/MatchedUserProfileOverview/MatchedUserProfileOverview';
import AddPhotosOnRequest from './src/MainApplication/AuthScreens/AddPhotosOnRequest/AddPhotosOnRequest';
import ChatMessageScreen from './src/MainApplication/AuthScreens/ChatMessage/ChatMessageScreen';
import { ChatContainer } from './src/MainApplication/AuthScreens/ChatMessage/ChatContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableScreens } from 'react-native-screens';
import { fromBottom } from 'react-navigation-transitions';
import messaging from '@react-native-firebase/messaging';
import MatchedUserFullProfiles from './src/MainApplication/AuthScreens/MatchedUserFullProfile/MatchedUserFullProfile';
import WelcomeSplashScreen from './src/MainApplication/SplashWelcomeScreen/WelcomeSplashScreen';
// import LoaderOnButtonPress from './src/component/LoaderOnButtonPress/LoaderOnButtonPress';
// import { showLoader } from './src/helper/NavigationFunctions/NavigationFunctions';
// import AsyncStorage from '@react-native-community/async-storage';


enableScreens()
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        
       // isLoggedIn : UserLoggedIn.accessToken && UserLoggedIn.isLoggedIn ? false : true,
          
    }
  }

  componentDidMount() {
    // AsyncStorage.setItem('@storage_Key', 435435453555555);

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }

  render() {
    const config = {
      animation: 'spring',
      config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    };

    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>


          {/* Splash Screen */}
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />

          {/* Landing Screen */}
          <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />

          {/* Login Screen */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

          {
            /////////////////////
            /* Signup Screens Start */
            //////////////////////
          }
          {/* 1. Profile For Screen */}
          <Stack.Screen name="ProfileFor" component={ProfileFor} options={{ headerShown: false }} />

          {/* 2. Signup Details Screen */}
          <Stack.Screen name="SignupDetails" component={SignupDetails} options={{ headerShown: false }} />

          {/* 3. Personal Details Screen */}
          <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />

          {/* 4. Astro Information Screen */}
          <Stack.Screen name="AstroInformation" component={AstroInformation} options={{ headerShown: false }} />

          {/* 5. Mobile Number Verification Screen */}
          <Stack.Screen name="VerifyMobileNumber" component={VerifyMobileNumber} options={{ headerShown: false }} />

          {/* 6. Upload Photo And Video Screen */}
          <Stack.Screen name="UploadPhotoAndVideo" component={UploadPhotoAndVideo} options={{ headerShown: false }} />

          {/* 7. Preview And Submit Profile Screen */}
          <Stack.Screen name="PreviewAndSubmitProfile" component={PreviewAndSubmitProfile} options={{ headerShown: false }} />

          {/* 8.Welcome Screen */}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />

          {
            /////////////////////
            /* Signup Screens End */
            //////////////////////
          }

          {/* Forget Password Screen */}
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />

          {/* Forget Password Verification Screen */}
          <Stack.Screen name="ForgetPasswordVerification" component={ForgetPasswordVerification} options={{ headerShown: false }} />

          {/* LoginWithOTP Screen */}
          <Stack.Screen name="LoginWithOTP" component={LoginWithOTP} options={{ headerShown: false }} />

          {/* LoginWithOTPVerification Screen */}
          <Stack.Screen name="LoginWithOTPVerification" component={LoginWithOTPVerification} options={{ headerShown: false }} />

          {/* Splash Screen */}
          {/* <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} initialParams = {{loggedIn : true}} /> */}

          {/* Change Password Screen */}
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />

          {/* Main Drawer Screen */}
          <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />

          {/* Matched User Profile Overview Screen */}
          <Stack.Screen
            name="MatchedUserProfileOverview"
            component={MatchedUserProfileOverview}
            options={{
              headerShown: false,
              transitionSpec: {
                open: config,
                close: config,
              }
            }}
          />
        
          {/* Matched User Full Profile Screen */}
          <Stack.Screen name="MatchedUserFullProfile" component={MatchedUserFullProfiles} options={{ headerShown: false, ...TransitionPresets.ModalTransition }} />

          {/* Add Photos On Request Screen */}
          <Stack.Screen name="AddPhotosOnRequest" component={AddPhotosOnRequest} options={{ headerShown: false }} />

          {/* Chat Container screen */}
          <Stack.Screen name="ChatContainerScreen" component={ChatContainer} options={{ headerShown: false }} />

          {/* Chat Message screen */}
          <Stack.Screen name="ChatMessageScreen" component={ChatMessageScreen} options={{ headerShown: false }} />

         <Stack.Screen name="WelcomeSplashScreen"  component={WelcomeSplashScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
