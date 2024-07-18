import { View, Text, TouchableOpacity,TextInput, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import the MaterialIcons

import {firebase} from "../config"

export default function Registration() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
   
    registerUser = async (email, password, firstName, lastName)=> {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://test-bcc09.firebaseapp.com',
            })
        .then (() => {
            alert("Verification email Sent")

        }).catch((error)=> {
            alert(error.message)
        })
        .then(()=> {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                firstName, lastName, email
            })
        })
        .catch((error)=> {alert(error.message)})
        })
        .catch((error)=> {alert(error.message)})
    }

  return (
   <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: '#fff2' }}>
            <View style={{ paddingHorizontal: 20, paddingLeft: 20 }}>

            
                <Text style={{ fontSize: 23, fontWeight: "500", color: "#333", marginBottom: 30 }}>
                    Registration
                </Text>
                
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }}>
                    <MaterialIcons
                        name="person"
                        size={20}
                        color="black"
                        style={{ marginRight: 5 }}
                    />
                    <TextInput
                        placeholder="First Name"
                        onChangeText={(firstName) => setFirstName(firstName)}
                        autoCorrect={false}
                        style={{
                            flex: 1,
                            paddingHorizontal: 5,
                            color: 'white',
                        }}
                    />
                </View>
                
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }}>
                    <MaterialIcons
                        name="person"
                        size={20}
                        color="black"
                        style={{ marginRight: 5 }}
                    />
                    <TextInput
                        placeholder="Last Name"
                        onChangeText={(lastName) => setLastName(lastName)}
                        autoCorrect={false}
                        style={{
                            flex: 1,
                            paddingHorizontal: 5,
                            color: 'white',
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }}>
                    <MaterialIcons
                        name="email"
                        size={20}
                        color="black"
                        style={{ marginRight: 5 }}
                    />
                    <TextInput
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCorrect={false}
                        style={{
                            flex: 1,
                            paddingHorizontal: 5,
                            color: 'white',
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                }}>
                    <MaterialIcons
                        name="lock"
                        size={20}
                        color="black"
                        style={{ marginRight: 5 }}
                    />
                    <TextInput
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCorrect={false}
                        secureTextEntry={true}
                        style={{
                            flex: 1,
                            paddingHorizontal: 5,
                            color: 'white',
                        }}
                    />
                </View>
                
            </View>

            <View style={{
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 30
            }}>
                <TouchableOpacity onPress={() => registerUser(email, password, firstName, lastName)}
                    style={{
                        backgroundColor: 'black',
                        borderRadius: 10,
                        paddingVertical: 15,
                        paddingHorizontal: 40,
                    }}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>Register</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
