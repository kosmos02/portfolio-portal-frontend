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

const image1 = { uri: "https://i.ibb.co/Yb7FVFh/forest.jpg" }

export default function HomeScreen(props) {

    const spin = props.spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    var AR_NAVIGATOR_TYPE = "AR";

    return (
        <ImageBackground source={image1} style={localStyles.backImage} imageStyle={{ opacity: 0.7 }} >
            <View style={localStyles.outer} >
                <View style={localStyles.inner} >
                    <ScrollView >
                        <View style={localStyles.inner}>
                            <Image source={require('../js/res/images/logo.png')} style={localStyles.titleImage} />
                            <Animated.Image style={{ height: 250, width: 250, transform: [{ rotate: spin }] }} source={require('../js/res/images/portal.png')} />
                        </View>
                        <View style={localStyles.inner}>
                            <View style={[{ marginTop: 35 }, localStyles.inner]}>
                                
                                <TouchableHighlight style={localStyles.buttons}
                                    underlayColor={'#68a0ff'}
                                    onPress={() => props._goToBuildScreen()} 
                                    >
                                    <Text style={localStyles.buttonText}>Build portfolio</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={[{ marginTop: 30 }, localStyles.inner]}>
                                <Text style={[localStyles.titleText, {fontSize: 25}]}>
                                    Try out your Portfolio!
                                </Text>
                                <TouchableHighlight style={localStyles.buttons}
                                    onPress={props._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                                    underlayColor={'#68a0ff'} >
                                    <Text style={localStyles.buttonText}>AR</Text>
                                </TouchableHighlight>
                                <Text onPress={() => props._logout()} style={[localStyles.titleText, { textDecorationLine: 'underline', top: 80 },]}>Logout</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    )
}

const localStyles = StyleSheet.create({
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
        fontSize: 20,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
    },
    titleImage: {
        marginTop: 110,
        height: 30,
        width: 325
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
    },
    buttons: {
        height: 80,
        width: 150,
        paddingTop: 25,
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'hsla(205, 83%, 16%, 0.67)',
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
    }
});


