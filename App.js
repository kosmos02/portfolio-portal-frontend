

// 

//  * Copyright (c) 2017-present, Viro, Inc.
//  * All rights reserved.
//  *
//  * This source code is licensed under the BSD-style license found in the
//  * LICENSE file in the root directory of this source tree. An additional grant
//  * of patent rights can be found in the PATENTS file in the same directory.
//  */

// import 'react-native-gesture-handler';
import React, { Component, Fragment } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
// import AsyncStorage from '@react-native-community/async-storage';
import { HOST_WITH_PORT } from './environment'

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

const image1 = { uri: "https://i.ibb.co/Yb7FVFh/forest.jpg" }

// const baseUrl = 'http://10.0.0.11:3000/'
const baseUrl = 'https://portfolio-portal-ar.herokuapp.com'

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      signUpPage: false,
      buildPage: false,
      spinAnim: new Animated.Value(0),
      user: {},
      error: "",

    }

    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._signUpScreen = this._signUpScreen.bind(this);
    this._loginScreen = this._loginScreen.bind(this);
    this._userLoggedIn = this._userLoggedIn.bind(this)
    this._userSignedIn = this._userSignedIn.bind(this)
    this._toggleSignUp = this._toggleSignUp.bind(this)
    this._logout = this._logout.bind(this)
  }

  componentDidMount() {
    Animated.loop(Animated.timing(
      this.state.spinAnim,
      {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true
      }
    )).start()

    // let token = localStorage.getItem('token')
    //   if(token){
    //     fetch(`${baseUrl}/profile`, {
    //       method: "GET",
    //       headers: {
    //         "Authorization": `Bearer ${token}` 
    //       }
    //     })
    //     .then(response => response.json())
    //     .then(result => {
    //       if (result.id){
    //         this.setState({
    //           user: result
    //         })
    //       }
    //     })
    //   }
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.user.username && this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    }
    else if (!this.state.user.username) {
      // return this._signUpScreen();
      if (this.state.signUpPage === false) {
        return this._loginScreen();
      }
      else {
        return this._signUpScreen();
      }
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  _toggleSignUp() {
    this.setState({ signUpPage: !this.state.signUpPage })
  }

  // Presents the user with a choice of an AR or VR experience
  _loginScreen() {
    return (
      <LoginScreen
        _userLoggedIn={this._userLoggedIn}
        error={this.state.error}
        outer={localStyles.outer}
        inner={localStyles.inner}
        titleText={localStyles.titleText}
        _toggleSignUp={this._toggleSignUp}
      />
    )
  }

  _userLoggedIn(username, password) {
    fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result.token) {
          // localStorage.setItem('token', result.token)
          this.setState({
            user: result.user
          })
        }
        else {
          this.setState({
            error: result.error
          })
        }
      })

    // this.setState({user: {"username": username, "password": password }})
  }

  _signUpScreen() {
    return (
      <SignUpScreen
        outer={localStyles.outer}
        inner={localStyles.inner}
        titleText={localStyles.titleText}
        _userSignedIn={this._userSignedIn}
        error={this.state.error}
        _toggleSignUp={this._toggleSignUp}
      />
    )
  }

  _userSignedIn(user) {
    fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })
      .then(response => response.json())
      .then(user => this.setState({ user: user }))

    // this.setState({ user: user }
  }

  _logout() {
    this.setState({ user: {} })
  }

  _getExperienceSelector() {
    return (
      <HomeScreen
        _getExperienceButtonOnPress={this._getExperienceButtonOnPress}
        spinAnim={this.state.spinAnim}
        _logout={this._logout}
      />
    )
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <Fragment>
        <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, width: "100%", height: "100%" }}>
          <ViroARSceneNavigator {...this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
            numberOfTrackedImages={1}
            _exitViro={this._exitViro}
          />
          <View style={localStyles.topMenu}>
            <TouchableOpacity style={{flex: 1}} activeOpacity={.5} onPress={() => this._exitViro()}>
              <Image
                style={localStyles.topMenu}
                source={require('./js/res/images/icon_left_w.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {

    return () => {
      this.setState({
        navigatorType: navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  titleImage: {
    marginTop: 70,
    height: 30,
    width: 325
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 25,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'hsla(205, 83%, 16%, 0.67)',
    // backgroundColor: '#90C3AA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    opacity: 0.7
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  backImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: 'hsla(205, 83%, 16%, 0.87)'
  },
  topMenu: {
    height: '25%',
    width: '25%',
    marginTop: 20,
    marginLeft: 10,
    position: 'absolute'
},
});

module.exports = ViroSample
