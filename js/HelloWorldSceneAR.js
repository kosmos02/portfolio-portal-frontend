'use strict';

import React, { Component } from 'react';

import { StyleSheet, Text } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroQuad,
  ViroFlexView,
  ViroImage,
  ViroDirectionalLight,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {


  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      projectClick: "",
      project1Text: "WanderLust - Ruby on Rails, RESTful methods, Javascript, Google Maps API - User can select a location on the map to mark. They can post notes about this location and other users can post comments as well.",
      portal1: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    // this.project1Click = this.project1Click.bind(this)
  }

  clickedProject() {
    if (this.state.projectClick === "project1") {
      this.setState({ projectClick: "" })
    }
    else {
      this.setState({ projectClick: "project1" })
    }
  }

  clickedDemo() {
    if (this.state.projectClick === 'project1' && this.state.portal1 === false) {
      this.setState({ portal1: true })
    }
    else if (this.state.portal1 === true) {
      this.setState({portal1: false})
    }
  }

  renderProjectInfo() {
    if (this.state.projectClick === "project1") {
      return (
        <>
          <ViroFlexView dragType="FixedToWorld" onDrag={() => { }} position={[.12, .2, 0]} height={.1} width={.2} style={styles.contactInfo}>
            <ViroText scale={[0.04, 0.04, 0]} position={[-.01, 0.0175, 0]} textClipMode="None" width={4} height={1} text={this.state.project1Text} textAlign='left' />
          </ViroFlexView>

          <ViroFlexView dragType="FixedToWorld" onClick={() => this.clickedDemo()} position={[.12, .12, 0]} height={.03} width={.05} style={styles.contactInfo}>
            <ViroText scale={[0.04, 0.04, 0]} position={[0.07, -0.013, 0]} textClipMode="ClipToBounds" width={4} height={1} text="DEMO" textAlign='left' />
          </ViroFlexView>
        </>
      )
    }
  }

  renderPortal() {
    if (this.state.portal1 === true) {
      return (
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => { }}>
          <ViroPortal position={[.5, .3, 0]} scale={[.05, .05, .1]}>
            <Viro3DObject source={require('./ARPortals/portal_res/portal_ship/portal_ship.vrx')}
              resources={[require('./ARPortals/portal_res/portal_ship/portal_ship_diffuse.png'),
              require('./ARPortals/portal_res/portal_ship/portal_ship_normal.png'),
              require('./ARPortals/portal_res/portal_ship/portal_ship_specular.png')]}
              type="VRX" />
          </ViroPortal>
          <Viro360Image source={require("./ARPortals/portal_res/360_island.jpg")} />
        </ViroPortalScene>
      )
    }
    else {
      return null
    }
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroARImageMarker target={"businessCard"}>

          <ViroFlexView dragType="FixedToWorld" onDrag={() => { }} position={[-.05, 0.2, 0]} height={.06} width={.06} style={styles.contactInfo}>
            <ViroText position={[-.01, 0.0175, 0]} scale={[0.02, 0.02, 0]} style={styles.contactText} textClipMode="None" text="Alexander Gabriel --------  Full Stack Developer -------- 719-244-4120" />
          </ViroFlexView >

          {this.renderProjectInfo()}
          {this.renderPortal()}

          <ViroNode position={[-.15, .06, 0]}>
            <ViroAmbientLight color={"#aaaaaa"} />
            <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
              position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
            <Viro3DObject
              onClick={() => this.clickedProject()}
              source={require('./res/earth/Earth.obj')}
              resources={[
                require('./res/earth/Earth.mtl'),
                require('./res/earth/Night_lights_2K.png'),
                require('./res/earth/Ocean_Mask_2K.png'),
                require('./res/earth/Diffuse_2K.png'),
                require('./res/earth/Bump_2K.png'),
                require('./res/earth/Clouds_2K.png')]}
              scale={[.01, .01, .01]}
              type="OBJ" />
          </ViroNode>

          <Viro3DObject
            source={require('./res/brain/Brain.obj')}
            resources={[
              require('./res/brain/BrainDif.jpg'),
            ]}
            position={[0, .05, 0]}
            scale={[.03, .03, .03]}
            type="OBJ" />

          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
            require('./res/emoji_smile/emoji_smile_normal.png'),
            require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[.15, .05, 0]}
            scale={[.05, .05, .05]}
            type="VRX" />

        </ViroARImageMarker>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Portfolio Portal"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  contactInfo: {

    backgroundColor: 'blue',
    opacity: 0.90,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

  },
  contactText: {
    color: 'white',
    fontSize: 25,
    flex: 1,
    textAlign: 'left'

  },
  project1: {
    backgroundColor: 'lightyellow'
  }
});

ViroARTrackingTargets.createTargets({
  "businessCard": {
    source: require('./res/business-card.jpg'),
    orientation: "Up",
    physicalWidth: 0.09 // real world width in meters
  }
})

module.exports = HelloWorldSceneAR;
