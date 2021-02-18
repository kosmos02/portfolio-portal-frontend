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
  Viro360Video,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {


  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      projectClick: "",

      project1: { name: "project1", projectName: "WanderLust", tech: "Ruby on Rails, RESTful methods, Javascript, Google Maps API", description: "User can select a location on the map to mark. They can post notes about this location and other users can post comments as well." },
      project2: { name: "project2", projectName: "TrivAbility", tech: "Ruby on Rails, React, Open DB Trivia API", description: "A two player trivia game where the objective is to get to the end gameboard space. Correct answers move the player further." },
      project3: { name: "project3", projectName: "ZodiHack", tech: "Ruby on Rails, Javascript, Aztro API", description: "Aesthetically appeasing horoscope app. User can select their zodiac and view their horoscope for yesterday, today, and tomorrow." },

      portal1: false,
      portal2: false,
      portal3: false,

      videoPaused: true,
      videoIndex: 0,

      runAnimation: false,
      scale: [.05, .05, .1]
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  clickedProject(project) {

    if (this.state.projectClick.project_name === project.project_name) {
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
    // else if (this.state.projectClick.name === 'project1' && this.state.portal1 === true) {
    //   this.setState({portal1: false})
    // }

    else if (this.state.projectClick.name === 'project2' && this.state.portal2 === false) {
      this.setState({ portal2: true, portal1: false, portal3: false })
    }
    // else if (this.state.projectClick.name === 'project2' && this.state.portal2 === true) {
    //   this.setState({portal2: false})
    // }

    else if (this.state.projectClick.name === 'project3' && this.state.portal3 === false) {
      this.setState({ portal3: true, portal2: false, portal1: false })
    }
    // else if (this.state.projectClick.name === 'project3' && this.state.portal3 === true) {
    //   this.setState({portal3: false})
    // }
  }

  renderProjectInfo() {
    if (this.state.projectClick !== "") {
      return (
        <>
          <ViroFlexView dragType="FixedDistance" onDrag={() => { }} rotation={[0, -20, 0]} position={[.12, .25, 0]} height={.1} width={.18} style={styles.contactInfo}>
            <ViroText scale={[0.014, 0.014, 0]} style={styles.contactText} position={[0, 0.035, 0]} textClipMode="None" width={12} height={1} text={this.state.projectClick.project_name} textAlign='left' />
            <ViroText scale={[0.014, 0.014, 0]} style={styles.contactText} position={[0, 0.021, 0]} textClipMode="None" width={12} height={1} text={this.state.projectClick.tech} textAlign='left' />
            <ViroText scale={[0.014, 0.014, 0]} style={styles.contactText} position={[0, -.011, 0]} textClipMode="None" width={12} height={1} text={this.state.projectClick.description} textAlign='left' />
          </ViroFlexView>
          <ViroFlexView dragType="FixedDistance" onClick={() => this.clickedDemo()} rotation={[0, -20, 0]} position={[.12, .16, 0]} height={.03} width={.05} style={styles.contactInfo}>
            <ViroText scale={[0.025, 0.025, 0]} style={styles.contactText} position={[0.068, 0, 0]} textClipMode="ClipToBounds" width={7} height={1} text="DEMO" textAlign='left' />
          </ViroFlexView>
        </>
      )
    }
  }

  // _setARNodeRef(component) {
  //   this.arNodeRef = component;
  // }

  // _onPinch(pinchState, scaleFactor, source) {
  //   var newScale = this.state.scale.map((x)=>{return x * scaleFactor})

  //   if (pinchState == 3) {
  //     this.setState({
  //       scale : newScale
  //     });
  //     this.arNodeRef.setNativeProps({scale: newScale});
  //   }
  // }

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
            position={[.5, .05, -3]}
            scale={[2.5, 2, 0]}
            paused={this.state.videoPaused}
          />
          {this.renderVideoControls()}
          <Viro360Image source={require("./ARPortals/portal_res/360_island.jpg")} />
        </ViroPortalScene>
      )
    }
    if (this.state.portal2 === true) {
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
            source={require('./videos/trivability.mp4')}
            loop={true}
            position={[.5, .05, -3]}
            scale={[2.5, 2, 0]}
            paused={this.state.videoPaused}
          />
          {this.renderVideoControls()}

          <Viro360Video source={require("./ARPortals/portal_res/Ayutthaya.mp4")} loop={true} muted={true} />
        </ViroPortalScene>
      )
    }
    if (this.state.portal3 === true) {
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
            source={require('./videos/zodihack.mp4')}
            loop={true}
            position={[.5, .05, -3]}
            scale={[2.5, 2, 0]}
            paused={this.state.videoPaused}
          />
          {this.renderVideoControls()}
          <Viro360Image source={require("./ARPortals/portal_res/kyoto_large.jpg")} />
        </ViroPortalScene>
      )
    }
  }

  renderVideoControls() {
    var buttonSize = 0.25
    return (
      <ViroNode position={[.5, -.3, -1]} opacity={1.0}>
        {this.renderPlayControl()}
      </ViroNode>
    )
  }

  renderPlayControl() {
    var buttonSize = 0.25;
    if (this.state.videoPaused) {
      return (
        <ViroButton
          scale={[1, 1, 1]}
          width={buttonSize}
          height={buttonSize}
          source={require("./videos/controls/icon_play_w.png")}
          gazeSource={require("./videos/controls/icon_play_w.png")}
          tapSource={require("./videos/controls/icon_play_w.png")}
          onClick={() => this.togglePauseVideo()} />
      );
    } else {
      return (
        <ViroButton
          scale={[1, 1, 1]}
          width={buttonSize}
          height={buttonSize}
          source={require("./videos/controls/icon_pause_w.png")}
          gazeSource={require("./videos/controls/icon_pause_w.png")}
          tapSource={require("./videos/controls/icon_pause_w.png")}
          onClick={() => this.togglePauseVideo()} />
      );
    }
  }

  togglePauseVideo() {
    this.setState({ videoPaused: !this.state.videoPaused })
  }

  // project1= {name: "project1", projectName: "WanderLust", tech: "Ruby on Rails, RESTful methods, Javascript, Google Maps API", description: "User can select a location on the map to mark. They can post notes about this location and other users can post comments as well."}
  // project2= {name: "project2", projectName: "TrivAbility", tech: "Ruby on Rails, React, Open DB Trivia API", description: "A two player trivia game where the objective is to get to the end gameboard space. Correct answers move the player further."}
  // project3= {name: "project3", projectName: "ZodiHack", tech: "Ruby on Rails, Javascript, Aztro API", description: "Aesthetically appeasing horoscope app. User can select their zodiac and view their horoscope for yesterday, today, and tomorrow."}

  render() {

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >


        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroARImageMarker target={"businessCard"} onAnchorFound={() => this.setState({ runAnimation: true })}>

          <ViroImage height={0.06} width={0.06} rotation={[0, 20, 0]} source={require('./res/images/headshot.jpeg')} onDrag={() => { }} dragType='FixedDistance' position={[-.055, 0.27, -.02]} />
          {/* <ViroNode height={} width={6} opacity={0} position={[0, .2, 0]} animation={{ name: 'uiAppear', run: true, delay: 4000 }}> */}
            <ViroFlexView dragType="FixedDistance" onDrag={() => { }} position={[-.05, .2, 0]} rotation={[0, 20, 0]}  height={.06} width={.09} style={styles.contactInfo}>
              <ViroText textAlign='center' style={styles.contactText} position={[.00, .020, 0]} scale={[0.014, 0.014, 0]} height={1} width={6} textClipMode="None" text={this.props.arSceneNavigator.viroAppProps.user.name} />
              <ViroText textAlign='center' style={styles.contactText} position={[.00, .006, 0]} scale={[0.014, 0.014, 0]} height={1} width={6} textClipMode="None" text={this.props.arSceneNavigator.viroAppProps.user.title} />
              <ViroText textAlign='center' style={styles.contactText} position={[.00, -.008, 0]} scale={[0.014, 0.014, 0]} height={1} width={6} textClipMode="None" text={this.props.arSceneNavigator.viroAppProps.user.phone_number} />
              <ViroText textAlign='center' style={styles.contactText} position={[.00, -.021, 0]} scale={[0.014, 0.014, 0]} height={1} width={6} textClipMode="None" text={this.props.arSceneNavigator.viroAppProps.user.email} />
            </ViroFlexView >
          {/* </ViroNode> */}

          {this.renderProjectInfo()}
          {this.renderPortal()}

          {/* <ViroNode position={[-.15, .06, 0]}> */}
          <ViroAmbientLight color={"#aaaaaa"} />
          <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
            position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

          {/* <ViroImage height={0.07} width={0.07} source={require('./res/images/globe-feather.png')} onClick={() => this.clickedProject(this.project1)} animation={{name: 'loopRotate', run: true, loop:true}} /> */}
          {/* </ViroNode> */}

          <Viro3DObject
            onClick={() => this.clickedProject(this.props.arSceneNavigator.viroAppProps.user.portfolios[0].projects[0])}
            source={require('./res/animations/emoji_smile/emoji_smile_anim_a.vrx')}
            resources={[
              require('./res/animations/emoji_smile/emoji_smile_specular.png'),
              require('./res/animations/emoji_smile/emoji_smile_normal.png'),
              require('./res/animations/emoji_smile/emoji_smile_diffuse.png'),
            ]}
            position={[-.15, .05, 0]}
            scale={[.06, .06, .05]}
            type="VRX"
            animation={{
              name: '02',
              run: true,
              loop: true,
              delay: 1000
            }}
          />

          <ViroQuad
            rotation={[-90, 0, 0]}
            position={[0, 0, 0]}
            width={1}
            height={1}
            arShadowReceiver={true}
          />

          <Viro3DObject
            onClick={() => this.clickedProject(this.props.arSceneNavigator.viroAppProps.user.portfolios[0].projects[1])}
            source={require('./res/animations/heart/emoji_heart_anim.vrx')}
            resources={[
              require('./res/animations/heart/emoji_heart_specular.png'),
              require('./res/animations/heart/emoji_heart.png'),
            ]}
            position={[0, .05, 0]}
            scale={[.06, .06, .05]}
            type="VRX"
            animation={{
              name: '02',
              run: true,
              loop: true,
              delay: 1000
            }}
          />

          <Viro3DObject
            onClick={() => this.clickedProject(this.props.arSceneNavigator.viroAppProps.user.portfolios[0].projects[2])}
            source={require('./res/animations/star/object_star_anim.vrx')}
            resources={[require('./res/animations/star/object_star_diffuse.png'),
            require('./res/animations/star/object_star_specular.png')
            ]}
            position={[.15, .05, 0]}
            scale={[.04, .04, .05]}
            type="VRX"
            animation={{
              name: '02',
              run: true,
              loop: true,
              delay: 1000
            }}
          />

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
    fontSize: 50,
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: '#000',
  },
  project1: {
    backgroundColor: 'lightyellow'
  },

});

ViroARTrackingTargets.createTargets({
  "businessCard": {
    source: require('./res/business-card.jpg'),
    orientation: "Up",
    physicalWidth: 0.09 // real world width in meters
  }
})

ViroAnimations.registerAnimations({
  loopRotate: { properties: { rotateY: "+=45" }, duration: 1000 },
  uiAppear: {
    properties: {
      opacity: .9,
      positionX: -.05
    },
    easing: "Bounce",
    duration: 3000,
  },



})

module.exports = HelloWorldSceneAR;
