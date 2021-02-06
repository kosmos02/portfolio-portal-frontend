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
  ViroPortalScene,
  ViroVideo,
  ViroButton,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {


  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      projectClick: "",
      project1Text: "WanderLust - Ruby on Rails, RESTful methods, Javascript, Google Maps API - User can select a location on the map to mark. They can post notes about this location and other users can post comments as well.",
      project2Text: "TrivAbility - Ruby on Rails, React, OPen DB Trivia API - A two player trivia game where the objective is to get to the end gameboard space. Correct answers move the player further.",
      portal1: false,
      portal2: false,
      portal3: false,

      videoPaused: true,
      videoIndex: 0,

      runAnimation: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    // this.project1Click = this.project1Click.bind(this)
  }

  clickedProject(project) {
    if (this.state.projectClick.name === project.name) {
      this.setState({ projectClick: "" })
    }
    else {
      this.setState({ projectClick: project })
    }
  }

  clickedDemo() {
    if (this.state.projectClick.name === 'project1' && this.state.portal1 === false) {
      this.setState({ portal1: true, portal2: false, portal3: false })
    }
    else if (this.state.projectClick.name === 'project1' && this.state.portal1 === true) {
      this.setState({portal1: false})
    }

    else if (this.state.projectClick.name === 'project2' && this.state.portal2 === false) {
      this.setState({ portal2: true, portal1: false, portal3: false })
    }
    else if (this.state.projectClick.name === 'project2' && this.state.portal2 === true) {
      this.setState({portal1: false})
    }

    else if (this.state.projectClick.name === 'project3' && this.state.portal3 === false) {
      this.setState({ portal3: true, portal2: false, portal1: false })
    }
    else if (this.state.projectClick.name === 'project3' && this.state.portal3 === true) {
      this.setState({portal3: false})
    }
  }

  renderProjectInfo() {
    if (this.state.projectClick !== "") {
      return (
        <>
          <ViroFlexView dragType="FixedDistance" onDrag={() => { }} rotation={[0, -20, 0]} position={[.12, .2, 0]} height={.1} width={.2} style={styles.contactInfo}>
            <ViroText scale={[0.04, 0.04, 0]} position={[-.01, 0.025, 0]} textClipMode="None" width={4} height={1} text={this.state.projectClick.projectName} textAlign='left' />
            <ViroText scale={[0.04, 0.04, 0]} position={[-.01, 0.01, 0]} textClipMode="None" width={4} height={1} text={this.state.projectClick.tech} textAlign='left' />
            <ViroText scale={[0.04, 0.04, 0]} position={[-.01, -.025, 0]} textClipMode="None" width={4} height={1} text={this.state.projectClick.description} textAlign='left' />
          </ViroFlexView>

          <ViroFlexView dragType="FixedDistance" onClick={() => this.clickedDemo()} rotation={[0, -20, 0]} position={[.12, .12, 0]} height={.03} width={.05} style={styles.contactInfo}>
            <ViroText scale={[0.04, 0.04, 0]} position={[0.07, -0.013, 0]} textClipMode="ClipToBounds" width={4} height={1} text="DEMO" textAlign='left' />
          </ViroFlexView>
        </>
      )
    }
  }

  renderPortal() {
    if (this.state.portal1 === true) {
      return (
        <ViroPortalScene passable={true} >
          <ViroPortal position={[.5, .3, 0]} scale={[.05, .05, .1]} dragType="FixedDistance" onDrag={() => { }}>
            <Viro3DObject source={require('./ARPortals/portal_res/portal_ship/portal_ship.vrx')}
              resources={[require('./ARPortals/portal_res/portal_ship/portal_ship_diffuse.png'),
              require('./ARPortals/portal_res/portal_ship/portal_ship_normal.png'),
              require('./ARPortals/portal_res/portal_ship/portal_ship_specular.png')]}
              type="VRX" />
          </ViroPortal>
          <ViroVideo
              source={require('./videos/wanderlust.mp4')}
              loop={true}
              position={[0,.05,-3]}
              scale={[2.5, 2, 0]}
              paused={this.state.videoPaused}
          />
          {this.renderVideoControls()}
          <Viro360Image source={require("./ARPortals/portal_res/360_island.jpg")} />
        </ViroPortalScene>
      )
    }
    if (this.state.portal2 === true) {
      return(
        <ViroPortalScene passable={true} >
          <ViroPortal position={[.5, .3, 0]} scale={[.05, .05, .1]} dragType="FixedDistance" onDrag={() => { }}>
            <Viro3DObject source={require('./ARPortals/portal_res/portal_ship/portal_ship.vrx')}
              resources={[require('./ARPortals/portal_res/portal_ship/portal_ship_diffuse.png'),
              require('./ARPortals/portal_res/portal_ship/portal_ship_normal.png'),
              require('./ARPortals/portal_res/portal_ship/portal_ship_specular.png')]}
              type="VRX" />
          </ViroPortal>
          <ViroVideo
              source={require('./videos/trivability.mp4')}
              loop={true}
              position={[0,.05,-3]}
              scale={[2.5, 2, 0]}
              paused={this.state.videoPaused}
          />
          {this.renderVideoControls()}
          <Viro360Image source={require("./ARPortals/portal_res/stage.jpg")} />
        </ViroPortalScene>
      )
    }
    if (this.state.portal3 === true){
      return(
        <ViroPortalScene passable={true} >
          <ViroPortal position={[.5, .3, 0]} scale={[.05, .05, .1]} dragType="FixedDistance" onDrag={() => { }}>
            <Viro3DObject source={require('./ARPortals/portal_res/portal_ship/portal_ship.vrx')}
              resources={[require('./ARPortals/portal_res/portal_ship/portal_ship_diffuse.png'),
              require('./ARPortals/portal_res/portal_ship/portal_ship_normal.png'),
              require('./ARPortals/portal_res/portal_ship/portal_ship_specular.png')]}
              type="VRX" />
          </ViroPortal>
          <ViroVideo
              source={require('./videos/zodihack.mp4')}
              loop={true}
              position={[0,.05,-3]}
              scale={[2.5, 2, 0]}
              paused={this.state.videoPaused}
          />
          {this.renderVideoControls()}
          <Viro360Image source={require("./ARPortals/portal_res/nightsky.jpg")} />
        </ViroPortalScene>
      )
    }
  }

  renderVideoControls(){
    var buttonSize = 0.25
    return(
      <ViroNode position={[0, -.3, -1]} opacity={1.0}>
        {this.renderPlayControl()}
      </ViroNode>
    )
  }

  renderPlayControl(){
    var buttonSize = 0.25;
    if (this.state.videoPaused){
      return (
        <ViroButton
        // position={[0,.4,-1]}
        scale={[1, 1, 1]}
        width={buttonSize}
        height={buttonSize}
        source={require("./videos/controls/icon_play_w.png")}
        gazeSource={require("./videos/controls/icon_play_w.png")}
        tapSource={require("./videos/controls/icon_play_w.png")}
        onClick={() => this.togglePauseVideo()}/>
      );
    } else {
      return (
          <ViroButton
              // position={[0,.4,-1]}
              scale={[1, 1, 1]}
              width={buttonSize}
              height={buttonSize}
              source={require("./videos/controls/icon_pause_w.png")}
              gazeSource={require("./videos/controls/icon_pause_w.png")}
              tapSource={require("./videos/controls/icon_pause_w.png")}
              onClick={() => this.togglePauseVideo()}/>
      );
    }
  }

  togglePauseVideo(){
    this.setState({videoPaused: !this.state.videoPaused})
  }

  project1= {name: "project1", projectName: "WanderLust", tech: "Ruby on Rails, RESTful methods, Javascript, Google Maps API", description: "User can select a location on the map to mark. They can post notes about this location and other users can post comments as well."}
  project2= {name: "project2", projectName: "TrivAbility", tech: "Ruby on Rails, React, Open DB Trivia API", description: "A two player trivia game where the objective is to get to the end gameboard space. Correct answers move the player further."}
  project3= {name: "project3", projectName: "ZodiHack", tech: "Ruby on Rails, Javascript, Aztro API", description: "Aesthetically appeasing horoscope app. User can select their zodiac and view their horoscope for yesterday, today, and tomorrow."}
  
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroARImageMarker target={"businessCard"} onAnchorFound={() => this.setState({runAnimation: true})}>
          {/* <ViroNode height={.06} width={0.9} opacity={0} position={[-.05, 0.2, 0]} animation={{name: 'uiAppear', run: this.state.runAnimation}}> */}
            <ViroFlexView   dragType="FixedDistance" onDrag={() => { }} rotation={[0, 20, 0]} position={[-.05, 0.2, 0]} height={.06} width={.09} style={styles.contactInfo}>
                  <ViroText  textAlign='center' position={[.00, .01, 0]} scale={[0.04, 0.04, 0]} height={1} width={3} textClipMode="None" text="Alexander Gabriel" />
                  <ViroText  textAlign='center' position={[.00 , -.005, 0]} scale={[0.04, 0.04, 0]} height={1} width={3} textClipMode="None" text="Full Stack Developer" />
                  <ViroText  textAlign='center' position= {[.00, -.02, 0]} scale={[0.04, 0.04, 0]} height={1} width={3} textClipMode="None" text="719-244-4120" />
                  <ViroText  textAlign='center' position= {[.00, -.03, 0]} scale={[0.04, 0.04, 0]} height={1} width={3} textClipMode="None" text="alexandrgabe@gmail.com" />
              </ViroFlexView >
            {/* </ViroNode> */}
            
          
          

          {this.renderProjectInfo()}
          {this.renderPortal()}

          <ViroNode position={[-.15, .06, 0]}>
            <ViroAmbientLight color={"#aaaaaa"} />
            <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
              position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
            
            <ViroImage height={0.07} width={0.07} source={require('./res/images/globe-feather.png')} onClick={() => this.clickedProject(this.project1)} animation={{name: 'loopRotate', run: true, loop:true}} />
          </ViroNode>

          <Viro3DObject
            onClick={() => this.clickedProject(this.project2)}
            source={require('./res/brain/Brain.obj')}
            resources={[
              require('./res/brain/BrainDif.jpg'),
            ]}
            position={[0, .05, 0]}
            scale={[.03, .03, .03]}
            type="OBJ" />

          <Viro3DObject
            onClick={() => this.clickedProject(this.project3)}
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
    flex: 1,
    flexDirection: 'row'
    

  },
  contactText: {
    color: 'white',
    fontSize: 25,
    textAlignVertical: 'center',
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

ViroAnimations.registerAnimations({
  loopRotate:{properties:{rotateY: "+=45"}, duration: 1000},
  uiAppear: {
    properties:{ 
      opacity: 1
    },
    easing: "Bounce",
    duration: 4000,
  }
})

module.exports = HelloWorldSceneAR;
