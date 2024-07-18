import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";



export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };
  const forgetPassword = () => {
      firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Login
        </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        />

        <TextInput
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        />

        <TouchableOpacity onPress={() => loginUser(email, password)}>
          <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {forgetPassword()}}>
          <Text style={{ color: "#AD40AF", fontWeight: "1000" }}>FOrgot? Password</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
            Don' have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
