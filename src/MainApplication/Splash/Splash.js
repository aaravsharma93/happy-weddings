/*SplashScreen*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import {goToDrawerScreen, goToSplashWelcomeScreen } from '../../helper/NavigationFunctions/NavigationFunctions';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: ''
    }
  }
  async componentDidMount() {
    this.setState({ loggedIn: await AsyncStorage.getItem('access_token') })

    setTimeout(() => {
        this.state.loggedIn ? goToDrawerScreen() : goToSplashWelcomeScreen({openModel : false})
    }, 1000);   
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground
          style={styles.splash}
          source={ImagesPathVariable.splashImage}>
          <Image style={styles.logo} source={ImagesPathVariable.LoginLogo} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  splash: {
    resizeMode: 'cover',
    width: deviceDimesions.width,
    height: deviceDimesions.Height,
  },
  logo: {
    marginTop: deviceDimesions.Height * 0.02,
    marginLeft: deviceDimesions.width * 0.099,
  }
});
