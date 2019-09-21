/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";

import Login from "./app/components/Login";
import Boiler from "./app/components/Boiler";
import Friendlist from "./app/components/Friendlist";
import Chat from "./app/components/Chat";
import GloChat from "./app/components/GloChat";
import ForgetPassword from "./app/components/ForgetPassword";
import Register from "./app/components/Register";
import Maps from './app/components/maps';

//=======================
import MainScreenNavigator from "./app/config/router";



import { createStackNavigator,createAppContainer } from "react-navigation";
import * as firebase from "firebase";
// import "@firebase/messaging";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      page: "connection",
      loading: true,
      authenticated: false
    };
    
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#ffb600",
      elevation: null
    },
    header: null
  };

  componentDidMount() {
    // alert(!firebase.apps.length);
    if(!firebase.apps.length)
    {
      firebase.initializeApp({
        apiKey: "AIzaSyB9TdsMiuHr_2KT8MuSxsHg-AD-pAthPIE",
        authDomain: "book-store-56297.firebaseapp.com",
        databaseURL: "https://book-store-56297.firebaseio.com",
        projectId: "book-store-56297",
        storageBucket: "book-store-56297.appspot.com",
        messagingSenderId: '338626308290',
      });
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        
        // firebase.messaging().requestPermissions();
        // firebase.messaging().subscribeToTopic("chat");
        this.setState({ loading: false, authenticated: true });
      } else {
        // firebase.messaging().unsubscribeFromTopic("chat");
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    console.disableYellowBox = true;
    if (this.state.loading) return null; // Render loading/splash screen etc
    if (!this.state.authenticated) {
      return <Login navigation={this.props.navigation} />;
    }
    // return <Boiler navigation={this.props.navigation} />;
    return <MainScreenNavigator/>
  }
}

const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
      headerTintColor : "white",

    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      headerTintColor : "white"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register",
      headerTintColor : "white"
    },
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      title: "Forget Password",
      headerTintColor : "white"
    },
  },
  Boiler: {
    screen: Boiler,
    navigationOptions: {
      title: "Home",
      headerTintColor : "white",
      headerStyle: {
        backgroundColor: "#2b2b39"
      },
      headerTitleStyle : {
        color : "white"
      }
    },
  },
  GloChat: {
    screen: GloChat,
    navigationOptions: {
      title: "Group Chat",
      headerTintColor : "white"
    },
    
  },
  Friendlist: {
    screen: Friendlist,
    navigationOptions: {
      title: "Friend List",
      headerTintColor : "white"
    },
  },
  Chat: {
    screen: Chat,
    defaultNavigationOptions: {
      title: "Chat",
      headerTintColor : "white",
      headerStyle: {
        backgroundColor: "#2b2b39"
      },
      headerTitleStyle : {
        color : "white"
      }
    }
  },
  maps : {
    screen : Maps,
  }
});

const App2 = createAppContainer(App);
export default App2;
const styles = StyleSheet.create({});
