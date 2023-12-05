import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import DrawerHeader from '../../component/DrawerHeader/DrawerHeader'
import HomeScreen from '../DrawerScreens/HomeScreen';
import DrawerMailBoxScreen from '../DrawerScreens/DrawerMailBoxScreen';
import ViewAllMatchedUserScreen from '../DrawerScreens/ViewAllMatchedUser'
import NotificationScreen from '../AuthScreens/NotificationScreen/NotificationScreen';
import EditProfile from '../DrawerScreens/EditProfile';
import EditPreferences from '../DrawerScreens/EditPreferences';
import TrustedBadges from '../DrawerScreens/TrustedBadges';
import Settings from '../DrawerScreens/Settings';
import Blog from '../DrawerScreens/Blog';
import ManagePhoto from '../AuthScreens/ManagePhoto/ManagePhoto';
import { UpgradeToPremium } from '../DrawerScreens/UpgradeToPremium';
import { HelpAndSupport } from '../DrawerScreens/HelpAndSupport';
import { AddonPackages } from '../DrawerScreens/AddonPackages';
import { SearchProfilesMainContainer } from '../AuthScreens/SearchProfiles/SearchProfilesMainContainer';
import ManageVideos from '../AuthScreens/ManageVideos/ManageVideos';
import AllFilters from '../DrawerScreens/AllFilters';
import FilterByType from '../DrawerScreens/FilterByType';
import { PrivacySettings } from '../DrawerScreens/PrivacySettings';
import TrustBadgesSliderScreen from '../DrawerScreens/TrustBadgesSliderScreen';
import TabNavigator from '../DrawerScreens/TabNavigator';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <HomeScreen handleMenuClick = {()=>navigation.openDrawer()} />
    </View>
  );
}

function HomeTab({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <TabNavigator handleMenuClick = {()=>navigation.openDrawer()} />
    </View>
  );
}


function MailBox({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <DrawerMailBoxScreen />
    </View>
  );
}

function ViewAllMatchedUser({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <ViewAllMatchedUserScreen TitleText = {route.params} />
    </View>
  );
}

function Notification({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <NotificationScreen  onBackButtonPress={()=>navigation.goBack(null)} />
    </View>
  );
}

function EditUserProfile({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <EditProfile   onBackButtonPress={()=>navigation.goBack()}  />
    </View>
  );
}

function EditUserPreferences({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <EditPreferences  onBackButtonPress={()=>navigation.goBack(null)}  />
    </View>
  );
}

function TrustedBadgesScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <TrustedBadges  onBackButtonPress={()=>navigation.goBack()}  />
    </View>
  );
}

function TrustedBadgesSlider({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <TrustBadgesSliderScreen />
    </View>
  );
}

function SettingsScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <Settings 
        onBackButtonPress={()=>navigation.goBack(null)}
        onLogOutResetStack = {()=>{navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          }); navigation.replace('Login', {openModel : false})}
        }
      />
    </View>
  );
}

function PrivacySettingsScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <PrivacySettings  onBackButtonPress={()=>navigation.goBack()}  />
    </View>
  );
}

function BlogScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <Blog  onBackButtonPress={()=>navigation.goBack()}  />
    </View>
  );
}

function ManagePhotoScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <ManagePhoto  onBackButtonPress={()=>navigation.goBack()}  />
    </View>
  );
}

function UpgradeToPremiumScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      
      <UpgradeToPremium onBackButtonPress={()=>navigation.goBack()}/>
    </View>
  );
}

function HelpAndSupportScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <HelpAndSupport />
    </View>
  );
}

function AddonPackagesScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <AddonPackages />
    </View>
  );
}


function SearchProfilesScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <SearchProfilesMainContainer TitleText = {route.params} onBackButtonPress={()=>navigation.goBack()} />
    </View>
  );
}

function ManageVideoScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <ManageVideos onBackButtonPress={()=>navigation.goBack()}  />
    </View>
  );
}

function AllFiltersScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <AllFilters />
    </View>
  );
}

function FilterByTypeScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#ffffff' }}>
      <DrawerHeader handleMenuClick = {()=>navigation.openDrawer()} />
      <FilterByType TitleText = {route.params} onBackButtonPress={()=>navigation.goBack()} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  
  return (
      <Drawer.Navigator initialRouteName="HomeTab"
        drawerStyle={{
          backgroundColor: '#c6cbef',
          width: deviceDimesions.width*0.85,
        }}
        drawerContent={props => <CustomDrawer {...props} />}
        drawerType = "slide"
      >
        <Drawer.Screen name="Home" component={Home} options={{unmountOnBlur: true}} />

        <Drawer.Screen name="HomeTab" component={HomeTab} options={{unmountOnBlur: true}} />
        
        {/* Mailbox Screen */}
        <Drawer.Screen name="MailBox" component={MailBox} />

        {/* View All Matched Users */}
        <Drawer.Screen name="ViewAllMatchedUser" component={ViewAllMatchedUser} options={{unmountOnBlur: true}} />

        {/* Notification Screen */}
        <Drawer.Screen name="NotificationScreen" component={Notification} options={{unmountOnBlur: true}} />

        {/* Edit Profile */}
        <Drawer.Screen name="EditUserProfile" component={EditUserProfile} options={{unmountOnBlur: true}} />

        {/* Edit Preferences */}
        <Drawer.Screen name="EditUserPreferences" component={EditUserPreferences} />

        {/* Trusted Badges screen */}
        <Drawer.Screen name="TrustedBadgesScreen" component={TrustedBadgesScreen} />

        {/* Trusted Badges Slider screen */}
        <Drawer.Screen name="TrustBadgesSliderScreen" component={TrustedBadgesSlider} />

        {/* Settings screen */}
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />

        {/* Settings screen */}
        <Drawer.Screen name="PrivacySettingsScreen" component={PrivacySettingsScreen} />

        {/* Blog screen */}
        <Drawer.Screen name="BlogScreen" component={BlogScreen} />

        {/* Manage Photo screen */}
        <Drawer.Screen name="ManagePhotoScreen" component={ManagePhotoScreen} options={{unmountOnBlur: true}} />

        {/* Manage Video screen */}
        <Drawer.Screen name="ManageVideoScreen" component={ManageVideoScreen} options={{unmountOnBlur: true}} />

        {/* Upgrade to premium screen */}
        <Drawer.Screen name="UpgradeToPremium" component={UpgradeToPremiumScreen} />

        {/* Upgrade to premium screen */}
        <Drawer.Screen name="HelpAndSupportScreen" component={HelpAndSupportScreen} />

        {/* AddonPackages Screen */}
        <Drawer.Screen name="AddonPackagesScreen" component={AddonPackagesScreen} />

        {/* Search Profiles Screen */}
        <Drawer.Screen name="SearchProfilesScreen" component={SearchProfilesScreen} />

        {/* All Filter Screen */}
        <Drawer.Screen name="AllFiltersScreen" component={AllFiltersScreen} />

        {/*Filter By TypeS creen */}
        <Drawer.Screen name="FilterByTypeScreen" component={FilterByTypeScreen} />

      </Drawer.Navigator>
  );
}