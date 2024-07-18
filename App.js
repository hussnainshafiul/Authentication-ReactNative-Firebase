import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { firebase } from "./config";

import Login from './src/Login';
import Registration from './src/Registration'
import Dashboard from './src/Dashboard';
import Header from './components/Header';


const Stack = createStackNavigator();

function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(); 

  function onAuthStateChanged(user) {

    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(()=> {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  
  }, []);

  if (initializing) return null;

  if (!user){
    return(
     
         <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
        />
        <Stack.Screen name='Registration' component={Registration} />
      </Stack.Navigator>
     
     
    )
  }

  return (
    
      <Stack.Navigator>

       <Stack.Screen
          name='Dashboard'
          component={Dashboard}
        />
    </Stack.Navigator>
    
  );
} 

export default () => {
  return (
    <NavigationContainer>

    <App/>

    </NavigationContainer>
  )
}