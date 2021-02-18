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

export default function BuildScreen(props) {

    const [projectName1, setProjectName1] = useState('')
    const [tech1, setTech1] = useState('')
    const [description1, setDescription1] = useState('')

    const [projectName2, setProjectName2] = useState('')
    const [tech2, setTech2] = useState('')
    const [description2, setDescription2] = useState('')

    const [projectName3, setProjectName3] = useState('')
    const [tech3, setTech3] = useState('')
    const [description3, setDescription3] = useState('')

    const image1 = { uri: "https://i.ibb.co/Yb7FVFh/forest.jpg" }

    // const handleSubmit = (user) => {
    //     props._userSignedIn(user)
    //     props._toggleSignUp()
    // }


    

    return (
        <ImageBackground source={image1} style={localStyles.backImage} imageStyle={{ opacity: 0.7 }} >

            <TouchableOpacity
                style={{ top: 10 }}
                activeOpacity={.5}
                onPress={() => props._goToBuildScreen()}
            >
                <Image
                    style={localStyles.topMenu}
                    source={require('../js/res/images/icon_left_w.png')}
                />
            </TouchableOpacity>

            <View style={props.outer}>
                <View style={[props.inner, { bottom: 100 }]}>

                    <Text style={[localStyles.titleText, { bottom: 50, fontSize: 25 }]}>Build A Portfolio</Text>

                    <ScrollView bounces={false} style={{width: 400}}>
                    
                        <Text style={[localStyles.titleText, { fontSize: 20, right: 150 }]}>Project #1</Text>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="project_name1" value={projectName1} placeholder="Project Name" placeholderTextColor={'#F8F5E8'} onChangeText={text => setProjectName1(text)} />
                        </View>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="tech1" value={tech1} placeholder="Tech Used" placeholderTextColor={'#F8F5E8'} onChangeText={text => setTech1(text)} />
                        </View>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="description1" value={description1} placeholder="Description" placeholderTextColor={'#F8F5E8'} onChangeText={text => setDescription1(text)} />
                        </View>

                        <Text style={[localStyles.titleText, { fontSize: 20, right: 150 }]}>Project #2</Text>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="project_name2" value={projectName2} placeholder="Project Name" placeholderTextColor={'#F8F5E8'} onChangeText={text => setProjectName2(text)} />
                        </View>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="tech2" value={tech2} placeholder="Tech Used" placeholderTextColor={'#F8F5E8'} onChangeText={text => setTech2(text)} />
                        </View>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="description2" value={description2} placeholder="Description" placeholderTextColor={'#F8F5E8'} onChangeText={text => setDescription2(text)} />
                        </View>

                        <Text style={[localStyles.titleText, { fontSize: 20, right: 150 }]}>Project #3</Text>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="project_name3" value={projectName3} placeholder="Project Name" placeholderTextColor={'#F8F5E8'} onChangeText={text => setProjectName3(text)} />
                        </View>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="tech3" value={tech3} placeholder="Tech Used" placeholderTextColor={'#F8F5E8'} onChangeText={text => setTech3(text)} />
                        </View>
                        <View style={localStyles.formBox}>
                            <TextInput style={localStyles.textInput} name="description3" value={description3} placeholder="Description" placeholderTextColor={'#F8F5E8'} onChangeText={text => setDescription3(text)} />
                        </View>

                        {props.error ? <Text style={localStyles.errorText}>{props.error}</Text> : null}
                        
                    </ScrollView>
                    <TouchableHighlight
                            style={[localStyles.buttons, { top: 40 }]}
                            onPress={() => {
                                props._buildPortfolio();
                                // setTimeout(() => {
                                //     props._buildProjects({project_name: projectName1}, {tech: tech1},{description: description1}),
                                //     props._buildProjects({project_name: projectName2}, {tech: tech2}, {description: description2}),
                                //     props._buildProjects({project_name: projectName3}, {tech: tech3}, {description: description3})
                                // }, 4000)
                            }}
                                
                            //     {
                            //     project_name: projectName1, tech: tech1, description: description1,
                            //     project_name: projectName2, tech: tech2, description: description2,
                            //     project_name: projectName3, tech: tech3, description: description3,
                            // })}
                            underlayColor={'#68a0ff'}
                        >
                            <Text style={localStyles.buttonText}>
                                Create Portfolio
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
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
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
})