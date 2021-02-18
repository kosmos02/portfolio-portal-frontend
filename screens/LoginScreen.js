import React, { useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    StatusBar,
    StyleSheet,
    PixelRatio,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator
} from 'react-native'

export default function LoginScreen(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // const [spinner, setSpinner] = useState(false)

    const image1 = { uri: "https://i.ibb.co/Yb7FVFh/forest.jpg" }

    const handleSubmit = () => {
        
        props._userLoggedIn(username, password)
        
    }

    // const ifError = () => {
    //     if (props.error){
    //         setSpinner(false)
    //     }
    //     else {
    //         setSpinner(true)
    //     }
    // }

    return (
        <ImageBackground source={image1} style={localStyles.backImage} imageStyle={{ opacity: 0.7 }} >
            <View style={props.outer}>
                <View style={props.inner}>
                    {props.spinner === false ?
                        <>
                            <Text style={[localStyles.titleText, { bottom: 50, fontSize: 30 }]}>Portfolio Portal</Text>
                            <View style={localStyles.formBox}>
                                <TextInput style={localStyles.textInput} name="username" value={username} placeholder="Username" placeholderTextColor={'#F8F5E8'}  onChangeText={text => setUsername(text)} />
                            </View>
                            <View style={localStyles.formBox}>
                                <TextInput style={localStyles.textInput} name="password" value={password} secureTextEntry={true} placeholder="Password" placeholderTextColor={'#F8F5E8'} onChangeText={text => setPassword(text)} />
                            </View>
                            {props.error ? <Text style={localStyles.errorText}>{props.error}</Text> : null}
                            <TouchableHighlight
                                style={[localStyles.buttons, { top: 50 }]}
                                onPress={() => handleSubmit()}
                                underlayColor={'#68a0ff'}
                            >
                                <Text style={localStyles.buttonText}>
                                    Login
                        </Text>
                            </TouchableHighlight>
                            <Text style={[localStyles.titleText, { top: 30 }]}>
                                Or
                    </Text>
                            <TouchableHighlight
                                style={[localStyles.buttons, { top: 25 }]}
                                onPress={() => props._toggleSignUp()}
                                underlayColor={'#68a0ff'}
                            >
                                <Text style={localStyles.buttonText}>
                                    Sign Up
                        </Text>
                            </TouchableHighlight>
                        </> :
                        <ActivityIndicator size='large' color='#D6D29D' />
                        }
                        
                </View>
            </View>
        </ImageBackground>
    )
}

const localStyles = StyleSheet.create({
    formBox: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white',
    },
    textInput: {
        flex: 1,
        color: 'white',
        borderBottomColor: '#FCF9C5',
        borderBottomWidth: 1,
        padding: 15,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    errorText: {
        paddingTop: 30,
        paddingBottom: 20,
        color: 'red',
        textAlign: 'center',
        fontSize: 20
    },
    buttons: {
        height: 80,
        width: 150,
        paddingTop: 25,
        paddingBottom: 20,
        marginTop: 10,
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: 'hsla(205, 83%, 16%, 0.67)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
    },
    backImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: 'hsla(205, 83%, 16%, 0.87)'
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
    }
})