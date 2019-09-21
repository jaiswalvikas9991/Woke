import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    TouchableHighlight,
    Button,
    Dimensions
} from 'react-native';
// import LoginComponent from  "./LoginComponent";
import { createSwitchNavigator, createAppContainer, createMaterialTopTabNavigator,createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-imagepicker';
import firebase from "firebase";
import FriendsList from "./Friendlist";
import MyProduct from "./MyProduct";
import Chat from "./GroupMessage";
import Chats from "./Chat";
import GloChat from "./GloChat";
import TeamComponent from "./teamComponent";
import CreateTeam from "./CreateTeam";
import TeamInfo from "./TeamInfo";
import Spinner from "react-native-loading-spinner-overlay";
import Maps from './maps';
let Dimention = Dimensions.get('window');
let height = Dimention.height;
let width = Dimention.width;

class UserProfile extends Component {

    constructor(props)
    {
        super(props);
        this.showDetails = this.showDetails.bind(this);

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
        this.state = {
            aboutColor : "orange",
            productColor : "black",
            current_user : [],
            loading: true,
            userdata : {}
        };

        this.friendsRef = this.getRef().child("friends");
    
    }
    listenForItems(friendsRef) {
        var user = firebase.auth().currentUser;
        // alert(user);

        friendsRef.on("value", snap => {
          var items = [];
          snap.forEach(child => {
            if (child.val().email == user.email)
            {
              items.push({
                name: child.val().name,
                uid: child.val().uid,
                email: child.val().email,
                avt : child.val().avatar,
              });
            }
              
          });

          this.setState({
            current_user : items,
            loading : false
          });
        });
      }

    getRef() {
        return firebase.database().ref();
    }

    componentDidMount(){
        // alert(this.state.loading);
        this.listenForItems(this.friendsRef);
    }

    LogOut = () => {
        const navi = this.props.navigation;
        firebase.auth().signOut().then(function() {
            navi.navigate('login');
         }, function(error) {
            console.log(error.message);
         });
    }

    showDetails(){
        alert(JSON.stringify(this.state.current_user[0].avt));
    }

    render() {


        if(this.state.current_user[0] != undefined)
        {
            return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileShadow}>
                        <ImageBackground
                            borderRadius={200 / 2}
                            style={styles.profile}
                            source={{uri : this.state.current_user[0].avt}}
                        >
                        </ImageBackground>
                    </View>
                    <TouchableOpacity style={styles.edit} onPress={()=>{this.LogOut()}}>
                        <Text style={styles.editText}><Icon name="md-log-out" size={25}/></Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.nameEmail}>
                    <Text style={styles.name}>{this.state.current_user[0].name}</Text>
                    <Text style={styles.username}>{this.state.current_user[0].email}</Text>
                </View>

                <View style={styles.divider}></View>
                <Spinner visible={this.state.loading} />
            </View>
        );
        }

        return (
            <View style={styles.container}>
                <Spinner visible={this.state.loading} />
            </View>
        );
    }
}

const app = createMaterialTopTabNavigator({
    Profile : { screen : UserProfile,
    navigationOptions : {
        header : null
    } },
    // team : { screen : TeamComponent,
    //     navigationOptions : {
    //         headerStyle: {
    //         position:"absolute",
    //       backgroundColor: "transparent",
    //       zIndex : 100,
    //       top : 0,
    //       left : 0,
    //       right : 0,
    //       elevation : 0,
    //       shadowOpacity : 0,
    //       borderBottomWidth :0
    //     },
    //     }
    // },
    // feed : { screen : MyProduct },
},
    {
        tabBarOptions : {
            activeTintColor : "white",
            inactiveTintColor : "gray",
            style : {
                backgroundColor : "#2b2b39"
            },
            indicatorStyle : {
                backgroundColor : "#ff3232"
            }
        }
    }
)

 const MainScreenNavigator = createStackNavigator({
  Tab: {
    screen: app,
    navigationOptions : {
        header : null
    }
  },
  Friendlist : { 
    screen : FriendsList,
    navigationOptions : 
    {
      title : "Friend List",
      header : null
    } 
  },
  Chat : {
    screen : Chat,
  },
  chats : {
    screen : Chats
  },
  createTeam : {
    screen : CreateTeam
  },
  teamInfo : {
    screen : TeamInfo,
  },
  maps : {screen : Maps}
});

 export default createAppContainer(MainScreenNavigator);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    profileContainer: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2b39",
        elevation: 20,
        height : 300
    },
    profileShadow: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        height: 200,
        width: 200,
        borderRadius: 100,
        elevation: 20,
        margin: 20,
        marginTop: 35,
        marginBottom: 0,
    },
    profile: {
        height: 200,
        width: 200,
        borderRadius : 100,
        borderWidth : 1,
        borderColor : "white",
        overflow : "hidden"
    },
    nameEmail: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10
    },
    name: {
        fontSize: 20,
        color: "black",
        textAlign: "center"
    },
    username: {
        fontSize: 17,
        color: "gray",
        textAlign: "center"
    },
    divider: {
        height: 10,
        backgroundColor: "#e5e5e5"
    },
    addressContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: 10
    },
    addressHeading: {
        fontSize: 14,
        color: "gray"
    },
    address: {
        fontSize: 17,
        color: "black"
    },
    cartContainer: {
        backgroundColor: "black",
        padding: 0
    },
    cart: {
        fontSize: 20,
        color: "black",
        padding: 12,
    },
    logoutContainer: {
        height: 80,
        backgroundColor: "white",
        padding: 10
    },
    edit: {
        width: 400,
        backgroundColor: "#2b2b39"
    },
    editText: {
        color: "white",
        fontSize: 20,
        textAlign: "right",
        padding: 7,
        paddingRight: 13
    },
    option : {
        flexDirection : "row",
        backgroundColor : "white",
        padding : 10
    },
    optionTitle : {
        fontSize : 22,
        color : "black",
        textAlign : "center"
    },
    about : {
        width : width/2,
        borderRightWidth : 1,
        borderColor : "black"
    },
    products : {
        width : width/2
    }
})
