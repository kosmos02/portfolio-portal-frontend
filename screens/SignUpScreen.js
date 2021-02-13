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
    Image,
} from 'react-native'

export default function SignUpScreen(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const image1 = { uri: "https://i.ibb.co/Yb7FVFh/forest.jpg" }

    const handleSubmit = (user) => {
        props._userSignedIn(user)
        props._toggleSignUp()
    }

    return (
        <ImageBackground source={image1} style={localStyles.backImage} imageStyle={{ opacity: 0.7 }} >
            
                <TouchableOpacity
                    style={{top: 10}}
                    activeOpacity={.5}
                    onPress={() => props._toggleSignUp()}
                >
                    <Image
                        style={localStyles.topMenu}
                        source={require('../js/res/images/icon_left_w.png')}
                    />
                </TouchableOpacity>
            
            <View style={props.outer}>
                <View style={[props.inner, {bottom: 100}]}>

                    <Text style={[props.titleText, {bottom: 50}]}>Portfolio Portal</Text>
                    <View style={localStyles.formBox}>
                        <TextInput style={localStyles.textInput} name="username" value={username} placeholder="Username" placeholderTextColor={'#D6D29D'} onChangeText={text => setUsername(text)} />
                    </View>
                    <View style={localStyles.formBox}>
                        <TextInput style={localStyles.textInput} name="password" value={password} secureTextEntry={true} placeholder="Password" placeholderTextColor={'#D6D29D'} onChangeText={text => setPassword(text)} />
                    </View>
                    <View style={localStyles.formBox}>
                        <TextInput style={localStyles.textInput} name="name" value={name} placeholder="Name" placeholderTextColor={'#D6D29D'} onChangeText={text => setName(text)} />
                    </View>
                    <View style={localStyles.formBox}>
                        <TextInput style={localStyles.textInput} name="title" value={title} placeholder="Title" placeholderTextColor={'#D6D29D'} onChangeText={text => setTitle(text)} />
                    </View>
                    <View style={localStyles.formBox}>
                        <TextInput style={localStyles.textInput} name="phoneNumber" value={phoneNumber} placeholder="Phone Number" placeholderTextColor={'#D6D29D'} onChangeText={text => setPhoneNumber(text)} />
                    </View>
                    <View style={localStyles.formBox}>
                        <TextInput style={localStyles.textInput} name="email" value={email} placeholder="Email" placeholderTextColor={'#D6D29D'} onChangeText={text => setEmail(text)} />
                    </View>
                    {props.error ? <Text style={localStyles.errorText}>{props.error}</Text> : null}
                    <TouchableHighlight
                        style={[localStyles.buttons, {top: 40}]}
                        onPress={() => handleSubmit({ username: username, password: password, name: name, title: title, phone_number: phoneNumber, email: email })}
                        underlayColor={'#68a0ff'}
                    >
                        <Text style={localStyles.buttonText}>
                            Sign Up
                        </Text>
                    </TouchableHighlight>
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
    },
    backImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: 'hsla(205, 83%, 16%, 0.87)',
    },
    topMenu: {
        height: '20%',
        width: '20%',
        marginTop: 0,
        top: 40,
    },
})