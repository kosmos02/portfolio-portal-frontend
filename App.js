

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
  ScrollView
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';
import LoginScreen from './screens/LoginScreen';
import Login from './screens/LoginScreen'

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

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      loginPage: true,
      buildPage: false,
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._loginScreen = this._loginScreen.bind(this);
    this._userSignedIn = this._userSignedIn.bind(this)
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.loginPage === false && this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } 
    else if (this.state.loginPage === true){
      return this._loginScreen();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _loginScreen(){
    return(
      <LoginScreen 
        outer={localStyles.outer} 
        inner={localStyles.inner} 
        titleText={localStyles.titleText} 
        _userSignedIn={this._userSignedIn}
        />
    
      )
  }

  _userSignedIn(){
    return this.setState({ loginPage: false})
  }


  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >
          <Text style={localStyles.titleText}>Portfolio Portal</Text>
          <Text style={localStyles.titleText}>Click on Build Portfolio to add a new portfolio. Click AR to view your portfolio in Augmented Reality.</Text>
          <TouchableHighlight style={localStyles.buttons} 
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Build portfolio</Text>
          </TouchableHighlight>
          <Text style={localStyles.titleText}>
            Try out your Portfolio!
          </Text>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <Fragment>
        <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, width: "100%", height: "100%" }}>
          <ViroARSceneNavigator {...this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
            numberOfTrackedImages={1} />
        </View>
      </Fragment>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    console.warn(this.state.navigatorType)
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
    backgroundColor: "black",
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "black",
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
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
  }
});

module.exports = ViroSample
