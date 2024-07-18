import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";

export default function Dashboard() {
  const [name, setName] = useState("");

  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("Users dont exists");
        }
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        marginBottom: 18,
      }}
    >
      <Text style={{ fontSize: 20 }}>
        Hello, {name.firstName} Why are you so cute?
      </Text>
      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
        }}
        style={{
          marginTop: 50,
          height: 70,
          width: 250,
          backgroundColor: "#026efd",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Text>SIgn Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          changePassword()
        }}
        style={{
          marginTop: 50,
          height: 70,
          width: 250,
          backgroundColor: "#026efd",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        <Text>Change Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
