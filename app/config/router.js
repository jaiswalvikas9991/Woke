import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Book from "../screens/BookDetails/BookDetail";
import FriendsList from "../components/Friendlist";
import Chat from "../components/GroupMessage";
import SendIncident from "../components/sendIncident";
import Maps from '../components/maps';
import TeamComponent from "../components/teamComponent";
import TeamInfo from "../components/TeamInfo";
import MyProduct from "../components/MyProduct";
import AddMember from "../components/AddMember";
const Tabs = createBottomTabNavigator({
  Home: { 
    screen: Home ,
    navigationOptions : {
      tabBarTitle : "Home",
      tabBarIcon : ({focused}) => <Icon name="ios-home" color ={focused ? "white":"gray"} size = {22}/>
    },
  },

  Teams: { 
    screen: TeamComponent ,
    navigationOptions : {
      tabBarIcon : ({focused}) => <Icon name="ios-people" color ={focused ? "white":"gray"} size = {focused ? 32:22}/>
    }
  },
  Feed: { 
    screen : MyProduct ,
    navigationOptions : {
      tabBarIcon : ({focused}) => <Icon name="ios-cart" color ={focused ? "white":"gray"} size = {22}/>
    }
  },
  Profile: { 
    screen: Profile ,
    navigationOptions : {
      header : null,
      tabBarIcon : ({focused}) => <Icon name="ios-person" color ={focused ? "white":"gray"} size = {22}/>
    }
  },
},
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    lazyLoad: true,
    animationEnabled: true,
    tabBarOptions: {
      style : {
        backgroundColor : "#2b2b39",
        height : 55
        // borderTopWidth : 1,
        // borderTopColor : "#ff3232",
      },
      activeTintColor : "white",
      inactiveTintColor : "gray",
      // activeBackgroundColor : "#ff3232",
      showLabel: true,
      allowFontScaling: true,
      labelStyle : {
        fontSize : 10,
        padding : 12,
        paddingBottom : 4,
        paddingTop : 0
      }
    },
  }
);


const MainScreenNavigator = createStackNavigator({
  Tab: {
    screen: Tabs,
    navigationOptions: {
      title: "BOOK STORE",
      headerLeft: <Icon style={{ paddingLeft: 22 }} name="ios-book" size={30} color="#fff" />,
      headerStyle: {
        backgroundColor: "#2b2b39",
      },
      headerTitleStyle: { color: "white" },
      header :null
    }
  },
  book: { 
    screen: Book ,
    navigationOptions : {
        headerTransparent : true,
        headerTintColor : "#fff"
      }
  },
  Friendlist : { 
    screen : FriendsList,
    navigationOptions : 
    {
      title : "Friend List"
    } 
  },
  Chat : { 
    screen : Chat ,
    navigationOptions : 
    {
      headerTintColor : "white",
    }
  },
  teamInfo : {
    screen : TeamInfo,
  },
  Home : { screen : Home },
  SendIncident : {
    screen : SendIncident
  },
  maps : {screen : Maps},
  addMember : { screen : AddMember}
});

export default createAppContainer(MainScreenNavigator);

let { width, height } = Dimensions.get("window");

let counter = 1;

const route = (index) => {
  counter = index
}

const styles = StyleSheet.create({
  LinearGradient: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    zIndex: -2
  },
  tabBarOption: {
    width: width / 5
  },
  tabBarOptionText: {
    fontFamily: "MyriadPro",
    fontSize: 8,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
    marginTop: 2
  }
});