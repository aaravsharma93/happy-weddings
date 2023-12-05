import { StackActions } from "@react-navigation/native"
import { navigate } from "../RootNavigator/RootNavigator"

// Go to Previous screen
export const goToPreviousScreen = (obj) =>{
    // navigate.goBack(null);
    obj.props.navigation.goBack(null)
}

// Go to Landing screen after Splash Screen
export const goToLandingScreen = () =>{
    navigate("LandingScreen");
}

// Go to Login screen after Landing Screen
export const goToLoginScreen = (openModel) =>{
    navigate("Login",openModel);
}
// Go to WelcomeScreen  after Landing Screen
export const goToSplashWelcomeScreen = (openModel) =>{
    navigate("WelcomeSplashScreen",openModel);
}

// -----------------------------------//
// Sign up Screen Navigations Start
// ----------------------------------//

// Go to ProfileFor screen after Login screen
export const goToProfileForSignScreen = () =>{
    navigate("ProfileFor");
}

// Go to Signup Details screen after  ProfileFor screen 
export const goToSignupDetailsSignScreen = (isGenderMale) =>{
    navigate("SignupDetails",isGenderMale);
}

// Go to Personal Details screen after  Signup Details screen
export const goToPersonalDetailsSignScreen = () =>{
    navigate("PersonalDetails");
}

// Go to AstroInformation screen after Personal Details screen
export const goToAstroInformationSignScreen = () =>{
    navigate("AstroInformation");
}

// Go to AstroInformation screen after Landing Screen
export const goToVerifyMobileNumberSignScreen = () =>{
    navigate("VerifyMobileNumber");
}

// Go to AstroInformation screen after AstroInformation screen
export const goToUploadPhotoAndVideoSignScreen = () =>{
    navigate("UploadPhotoAndVideo");
}

// Go to Preview And Submit Profile screen after Landing Screen
export const goToPreviewAndSubmitProfileSignScreen = (UserImg) =>{
    navigate("PreviewAndSubmitProfile", UserImg);
}

// Go to Welcome Screen after Landing Screen
export const goToWelcomeScreenSignScreen = () =>{
    navigate("WelcomeScreen");
}

// --------------------------------//
// Sign up Screen Navigations End
// --------------------------------//



// Go To Forget Password Screen
export const goToForgetPasswordScreen = () =>{
    navigate("ForgetPassword");
}

// Go To Forget Password Verification Screen
export const goToForgetPasswordVerificationScreen = () =>{
    navigate("ForgetPasswordVerification");
}

// Go To LoginWithOTP Screen
export const goToLoginWithOTPScreen = () =>{
    navigate("LoginWithOTP");
}

// Go To LoginWithOTPVerification Screen
export const goToLoginWithOTPVerificationScreen = (MobileNumber) =>{
    navigate("LoginWithOTPVerification", MobileNumber);
}

// Go To Change Password Screen
export const goToChangePasswordScreen = () =>{
    navigate("ChangePassword");
}

// -----------------------------------//
// Drawer Screen Navigations Start
// ----------------------------------//

// Go To Drawer Home Screen
export const goToDrawerScreen = () =>{
    navigate("MainDrawer");
}

// Go To Drawer Home Screen
export const goToDrawerHomeScreen = ()=>{
    navigate("Home")
}

// Go To Drawer Home Screen
export const goToDrawerHomeScreenHomeTab = ()=>{
    navigate("HomeTab")
}
// Go To Drawer Mailbox Screen
export const goToDrawerMailBoxScreen = () =>{
    navigate("MailBox")
}

// Go To Drawer View All Matched User Screen
export const goToDrawerViewAllMatchedUserScreen = (Title) =>{
    navigate("ViewAllMatchedUser",Title)
}

// Go To Notification Screen
export const goToNotificationScreen = () =>{
    navigate("NotificationScreen")
}

// Go To Edit User Profile Screen
export const goToEditUserProfilenScreen = () =>{
    navigate("EditUserProfile")
}
// Go To Edit User Profile Screen
// export const goToEditUserProfilenScreenSentToHomeScreen = (title) =>{
//     console.log(title,"TitleBanner----------")
//     navigate("EditUserProfile",title)
// }
// Go To Edit User Preferences Screen
export const goToEditUserPreferencesScreen = () =>{
    navigate("EditUserPreferences")
}

// Go To Trusted Badges Screen
export const goToTrustedBadgesScreen = () =>{
    navigate("TrustedBadgesScreen")
}

// Go To Trusted Badges Slider Screen
export const goToTrustBadgesSliderScreen = () =>{
    navigate("TrustBadgesSliderScreen")
}

// Go To Settings Screen
export const goToSettingsScreen = () =>{
    navigate("SettingsScreen")
}

// Go To Privacy Settings Screen
export const goToPrivacySettingsScreen = () =>{
    navigate("PrivacySettingsScreen")
}

// Go To Blog Screen
export const goToBlogScreen = () =>{
    navigate("BlogScreen")
}

// Go To Manage Photo Screen
export const goToManagePhotoScreen = () =>{
    navigate("ManagePhotoScreen")
}

// Go To Manage Video Screen
export const goToManageVideoScreen = () =>{
    navigate("ManageVideoScreen")
}

// Go To Upgrade To Premium Screen
export const goToUpgradeToPremiumScreen = () =>{
    navigate("UpgradeToPremium")
}

// Go To Help And Support Screen
export const goToHelpAndSupportScreen = () =>{
    navigate("HelpAndSupportScreen")
}

// Go To AddOn Packages Screen
export const goToAddonPackagesScreen = () =>{
    navigate("AddonPackagesScreen")
}

// Go To Search Profiles Screen
export const goToSearchProfilesScreen = (Index) =>{
    console.log(Index,"activeTabIndexcount")
      navigate('SearchProfilesScreen', Index)
}

// Go To All Filters Screen
export const goToAllFiltersScreen = () =>{
    navigate("AllFiltersScreen")
}

// Go To Filter By Type Screen
export const goToFilterByTypeScreen = (Title) =>{
    navigate("FilterByTypeScreen", Title)
}

// -----------------------------------//
// Drawer Screen Navigations End
// ----------------------------------//

// Auth Screens

// Go To Matched User Profile Overview User Screen
export const goToMatchedUserProfileOverviewrScreen = (users, index, title) =>{
    console.log("------------------------######################",users, index, title)
    navigate("MatchedUserProfileOverview",{data : {dataArr : users, activeIndex : index, DataTitle : title}})
}
export const goToMatchedUserProfilerScreen = (users) =>{
    navigate("MatchedUserProfile",{data : {dataArr : users}})
}
// Go To Matched User Full Profile User Screen
export const goToMatchedUserFullProfileScreen = (userData) =>{
    navigate("MatchedUserFullProfile", {data : userData})
}

// Go To Add Photos On Request Screen
export const goToAddPhotosOnRequestScreen = () =>{
    navigate("AddPhotosOnRequest")
}

// Go To Chat Container Screen
export const goToChatContainerScreen = () =>{
    navigate("ChatContainerScreen")
}

// Go To Chat Message Screen
export const goToChatMessageScreen = () =>{
    navigate("ChatMessageScreen")
}