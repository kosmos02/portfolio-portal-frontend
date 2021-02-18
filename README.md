# Porfolio Portal #

![Portfolio Portal](https://i.ibb.co/0X8YfXS/unnamed.jpg
"Porfolio Portal")

This app is intended to view and build portfolios in Augmented Reality.

https://github.com/kosmos02/portalportfolio_backend

## Technologies Used ##

*Ruby on Rails back-end
*React Native front-end
*ViroReact

## Startup ##

* Fork and Clone GitHub frontend Repo,
* This app uses xcode to bundle and run on your phone or an emulator

## How to Use ##

* Upon entry, a user can either login or sign up with a username and password
* You can then build a portfolio with your 3 projects and view your portfolio in AR
* Selecting AR accesses your phones camera, use an image marker such as a business card or resume for image tracking.
* Once your camera detects the image marker the 3D models will render.
* Select a 3D model by clicking or swiping left on it to display the project information
* Select 'DEMO' to render a portal beside you. You can move the portal.
* Enter the portal and click on the play icon to start your project demo video. Click it again to stop.

## Code Examples ##

To render a portal
```
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
```
Render 3D objects with shadows
```
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
```
To render the UI interface
```
<ViroFlexView dragType="FixedDistance" onDrag={() => { }} rotation={[0, -20, 0]} position={[.12, .25, 0]} height={.1} width={.18} style={styles.contactInfo}>
            <ViroText scale={[0.014, 0.014, 0]} style={styles.contactText} position={[0, 0.035, 0]} textClipMode="None" width={12} height={1} text={this.state.projectClick.project_name} textAlign='left' />
            <ViroText scale={[0.014, 0.014, 0]} style={styles.contactText} position={[0, 0.021, 0]} textClipMode="None" width={12} height={1} text={this.state.projectClick.tech} textAlign='left' />
            <ViroText scale={[0.014, 0.014, 0]} style={styles.contactText} position={[0, -.011, 0]} textClipMode="None" width={12} height={1} text={this.state.projectClick.description} textAlign='left' />
          </ViroFlexView>
          <ViroFlexView dragType="FixedDistance" onClick={() => this.clickedDemo()} rotation={[0, -20, 0]} position={[.12, .16, 0]} height={.03} width={.05} style={styles.contactInfo}>
            <ViroText scale={[0.025, 0.025, 0]} style={styles.contactText} position={[0.068, 0, 0]} textClipMode="ClipToBounds" width={7} height={1} text="DEMO" textAlign='left' />
          </ViroFlexView>
```
## Demo ##

[![Portfolio Portal](https://i.ibb.co/0X8YfXS/unnamed.jpg)](https://youtu.be/nQO1z6mE9iA "Portfolio Portal")

## Contributors ##

### Alexander Gabriel - on GitHub: @kosmos02
