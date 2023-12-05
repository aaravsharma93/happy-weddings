/*Splash_WelcomeScreen_Second*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { goToDrawerScreen, goToLoginScreen } from '../../helper/NavigationFunctions/NavigationFunctions';


export default class WelcomeSplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: ''
    }
  }
  async componentDidMount() {
    this.setState({ loggedIn: await AsyncStorage.getItem('access_token') })
  }
  onSignupPress() {
    this.state.loggedIn ? goToDrawerScreen() : goToLoginScreen({ openModel: false })
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground
          style={styles.splash}
          source={ImagesPathVariable.splashImage}>
          <Image style={styles.logo} source={ImagesPathVariable.LoginLogo} />
          <View style={styles.texttittle}>
            <View style={styles.tittletextheading}>
              <Text style={styles.textstylenormal}>New to Happy Weddings?</Text>
              <Text style={styles.textstylenormal}>Signup with</Text>
              <View style={{ flexDirection: 'row'}}>
                <View style={styles.heading}>
                  <Image style={{ width: 50, height: 50 }} source={ImagesPathVariable.GmailIcon} />
                  <Text style={styles.textemailstyle}>Email</Text>
                </View>
                <View style={styles.heading}>
                  <Image style={{ width: 50, height: 50 }} source={ImagesPathVariable.FacebbokIcon} />
                  <Text style={styles.textemailstyle}>Facebook</Text>
                </View>
                <View style={styles.heading}>
                  <Image style={{ width: 50, height: 50 }} source={ImagesPathVariable.GoogleIcon} />
                  <Text style={styles.textemailstyle}>Google</Text>
                </View>
              </View>
            </View>
            <View style={styles.already_text_heading}>
              <View style={{
                flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: '#ffffff', fontSize: 18, }}>Already a member?</Text>
                <TouchableOpacity onPressIn={() => this.onSignupPress()}>
                  <View style={styles.loginbutton}>
                    <Text style={{ color: '#ffffff', fontSize: 15, }}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // paddingLeft : 5,
  },
  splash: {
    resizeMode: 'cover',
    width: deviceDimesions.width,
    height: deviceDimesions.Height,
  },
  logo: {
    marginTop: deviceDimesions.Height * 0.02,
    marginLeft: deviceDimesions.width * 0.099,
  },
  texttittle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tittletextheading: {
    backgroundColor: 'rgba(255, 255, 255, .4)',
    width: '90%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    bottom: 30,
    marginTop: 10
  },
  already_text_heading: {
    backgroundColor: "#e73140", width: '100%', height: 70, alignItems: 'center',
    justifyContent: 'center',
  },
  loginbutton:{
    backgroundColor: '#e73140',
    borderWidth: 1,
    borderColor: '#fff',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textstylenormal:{ color: '#ffffff', fontSize: 18, },
  textemailstyle:{ color: '#ffffff', fontSize: 15, marginTop: 4 },
  heading:{ alignItems: 'center', padding: 20 }
});
