/* eslint-disable prettier/prettier */
import { H3 } from 'native-base';
import React, { Component } from 'react';
import { View, Image, StyleSheet,  Text, } from 'react-native';
import {  TouchableOpacity } from 'react-native-gesture-handler';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import IconsPathVariable from '../../helper/IconsPathVariable/IconsPathVariable';
import HomeScreen from './HomeScreen';
import DrawerMailBoxScreen from './DrawerMailBoxScreen';
import ViewAllMatchedUserScreen from './ViewAllMatchedUser';
import { ChatContainer } from '../AuthScreens/ChatMessage/ChatContainer';
import { UpgradeToPremium } from './UpgradeToPremium';

export default class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HomeTab: true,
      ChatTab : false,
      Inbox:false,
      Matches:false,
      Premium:false

    }
  }
  async HomeTabData() {
    this.setState({ HomeTab: true })
    this.setState({ ChatTab: false })
    this.setState({ Inbox: false })
    this.setState({ Matches: false })
    this.setState({Premium:false})
  }
  async MachesTabData() {
    this.setState({ HomeTab: false })
    this.setState({ ChatTab: false })
    this.setState({ Inbox: false })
    this.setState({ Matches: true })
    this.setState({Premium:false})
  }
  async InboxTabData() {
    this.setState({ HomeTab: false })
    this.setState({ ChatTab: false })
    this.setState({ Inbox: true })
    this.setState({ Matches: false })
    this.setState({Premium:false})
  }
  async ChatTabData() {
    this.setState({ HomeTab: false })
    this.setState({ ChatTab: true })
    this.setState({ Inbox: false })
    this.setState({ Matches: false })    
    this.setState({Premium:false})
  }
  async PremiumTabData() {
    this.setState({ HomeTab: false })
    this.setState({ ChatTab: false })
    this.setState({ Inbox: false })
    this.setState({ Matches: false })
    this.setState({Premium:true})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalViewLocation}>
          <View style={{  flexDirection: 'row' }}>
            <TouchableOpacity
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
              onPress={() => this.HomeTabData()}>
               <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon1}
                />
                <Text style={{color:this.state.HomeTab ? "#e82f43" : "black" ,fontWeight: this.state.HomeTab ? '700' : '600'}}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
              onPress={() => this.MachesTabData()}>
             <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon2}
                />
                   <Text style={{color:this.state.Matches ? "#e82f43" : "black" ,fontWeight: this.state.Matches ? '700' : '600'}}>Maches</Text>
              </View>
            </TouchableOpacity>
             <TouchableOpacity 
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
             onPress={() => this.InboxTabData()}>
             <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon3}
                />
                   <Text style={{color:this.state.Inbox ? "#e82f43" : "black" ,fontWeight: this.state.Inbox ? '700' : '600'}}>Inbox</Text>
              </View>
            </TouchableOpacity>
             <TouchableOpacity 
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
             onPress={() => this.ChatTabData()}>
             <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon4}
                />
                   <Text style={{color:this.state.ChatTab ? "#e82f43" : "black" ,fontWeight: this.state.ChatTab ? '700' : '600'}}>Chat</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{justifyContent:'center',alignContent:'center', width: deviceDimesions.width * 0.18,height:deviceDimesions.Height*0.1}}
             onPress={() => this.PremiumTabData()}>
             <View style={{justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
                <Image
                  style={styles.imageTopRow}
                  source={IconsPathVariable.HomeIcon5}
                />
                   <Text style={{color:this.state.Premium ? "#e82f43" : "black" ,fontWeight: this.state.Premium ? '700' : '600'}}>Premium</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {
          this.state.HomeTab ?
            <HomeScreen></HomeScreen>
            :
            null
        }
        {
          this.state.Inbox ?
            <DrawerMailBoxScreen></DrawerMailBoxScreen>
              :
              null

        }
        {
          this.state.Matches ?
          <ViewAllMatchedUserScreen TitleText  />

          // <ViewAllMatchedUserScreen></ViewAllMatchedUserScreen>
          :
          null
        }

        {
         
         this.state.ChatTab ?
         <ChatContainer></ChatContainer>
         :
         null

        }

{
         
         this.state.Premium ?
         <UpgradeToPremium></UpgradeToPremium>
         :
         null

        }

        <View>

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceDimesions.width

  },
  imageTopRow: {
    height: 30,
    width: 30,
  },

  modalViewLocation: {
    width: deviceDimesions.width,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'center',
    marginTop:10

  }

});






