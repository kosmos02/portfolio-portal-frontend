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
    ScrollView
} from 'react-native'

export default function LoginScreen(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={props.outer}>
            <View style={props.inner}>
                <Text style={props.titleText}>Portfolio Portal</Text>
                <View style={localStyles.formBox}>
                    <TextInput style={localStyles.textInput} placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                </View>
                <View style={localStyles.formBox}>
                    <TextInput style={localStyles.textInput} placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                </View>
                <TouchableHighlight 
                    style={localStyles.buttons}
                    onPress={() => props._userSignedIn()}
                    underlayColor={'#68a0ff'}
                    >
                    <Text style={localStyles.buttonText}>
                        Sign In
                    </Text>

                </TouchableHighlight>

            </View>
        </View>
    )
}

const localStyles = StyleSheet.create({
    formBox: {
        flexDirection: 'row',
        alignItems:'center',
        color: 'white',
      },
      textInput: {
        flex: 1,
        color: '#fff',
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
      },
      buttons : {
        height: 80,
        width: 150,
        paddingTop:20,
        paddingBottom:20,
        marginTop: 10,
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor:'hsla(205, 83%, 16%, 0.67)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
      },
      buttonText: {
        color:'#fff',
        textAlign:'center',
        fontSize : 20
      },
})