import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // ListView,
  Image,
  Button,
  FlatList
} from "react-native";

import { StackNavigator } from "react-navigation";
import firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";
import {SearchBar} from 'react-native-elements';
import Chat from "./Chat";
// import Voice from "react-native-voice";

var name, uid, email;
var av_url = "hello";
export default class TeamComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uid: null,
      email: "",
      dataSource : [],
      dataBackup : [],
      query : "",
      avatar_uri : "",
      mounted : true,
      loading : true,
      groups : [],
      group_details : []
    };

    this.getGroupDetails = this.getGroupDetails.bind(this);
    this.createTeam = this.createTeam.bind(this);

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
        loading: true
    };

    this.friendsRef = this.getRef().child("friends");
    this.groupRef = this.getRef().child("GroupDetails");
    
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(friendsRef) {
    var user = firebase.auth().currentUser;
    
    friendsRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        if (child.val().email == user.email)
        {
          items.push({
            name: child.val().name,
            uid: child.val().uid,
            email: child.val().email,
            avt : child.val().avatar,
            group : child.val().groups
          });
        }
          
      });

      this.setState({
        dataSource:items,
        dataBackup : items,
        loading: false
      });
      var groups = []
      // alert(JSON.stringify(this.state.dataSource[0].group));
      for(var i=0;i<this.state.dataSource[0].group.length;i++)
      {
        groups.push(this.state.dataSource[0].group[i]);
      }
      // alert(groups);
      this.setState({
        groups : groups
      });
      this.getGroupDetails(this.state.groups);
    });
  }

  getGroupDetails(groups)
  {
    // alert(groups);
    // alert(this.groupRef.Key());
    this.groupRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        // alert(JSON.stringify(child));
        for(var i=0;i<groups.length;i++)
        {
          if (child.val()._id == groups[i])
          {
            items.push({
              name: child.val().name,
              id : child.val()._id,
              member : child.val().members
            });
          }  
        }
        
          
      });
      // alert(JSON.stringify(items));
      this.setState({
        group_details : items
      })
      // alert(this.state.group_details);
    });
  }

  createTeam(){
    this.props.navigation.navigate("createTeam");
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    this.setState({
      mounted : true
    });
    this.listenForItems(this.friendsRef);

    
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#2b2b39",
      elevation: null
    },
    headerTitleStyle : { 
      color : "white"
    },
    header : null
  };

  setSearchText(event){
    searchText = event.nativeEvent.text;
    this.setState({
      query : searchText
    })
    if(searchText == "")
    {
      fullData = this.state.dataBackup;
      // alert(fullData);
      this.setState({
        dataSource : fullData
      });
    }
    else {
      data = this.state.dataSource;
    searchText = searchText.toLowerCase();
    // alert(searchText);
    data = data.filter(l => 
      l.name.toLowerCase().match(searchText)
    );
    // alert(JSON.stringify(data));
    this.setState({
      dataSource : data
    });

    }
  }

  FlatListItemSeparator = () => {
      return (
          <View style={{height : 1.2,width:"100%",backgroundColor:"#e5e5e5"}}>

          </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addProduct} onPress={this.createTeam}>
              <Text style={styles.addStyle2}>Create Team</Text>
              <Text style={styles.addStyle}> +</Text>
            </TouchableOpacity>
        <FlatList
        showsVerticalScrollIndicator = {false}
        data = {this.state.group_details}
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        renderItem = {({item,index}) => {
          //alert(JSON.stringify(item));
          return (
            <View style={{marginRight:10,marginLeft:10,marginBottom : 3}}>
            <TouchableOpacity
            onPress={() => {
              // name = rowData.name;
              // email = rowData.email;
              // uid = rowData.uid;
              name = item.name;
              email = item.email;
              uid = item.id;
              this.props.navigation.navigate("teamInfo", {
                name: name,
                email: email,
                uid: uid,
                member : item.member,
                avatar : item.avt
              });
            }}
          >
            <View style={styles.profileContainer}>
              <Image
                source={require('./avatar.png')}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
          </View>
          );
      }}
        />
        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    // marginRight: 10,
    // marginLeft: 10
  },
  rightButton: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    padding: 0
  },
  topGroup: {
    flexDirection: "row",
    margin: 10
  },
  myFriends: {
    flex: 1,
    color: "#3A5BB1",
    //tintColor: "#fff",
    //secondaryColor: '#E9E9E9',
    //grayColor: '#A5A5A5',
    fontSize: 16,
    padding: 5
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 6,
    marginBottom: 6,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 0,
    marginRight : 7
  },
  profileName: {
    marginLeft: 6,
    fontSize: 16
  },
  addProduct : {
      // position : "absolute",
      // bottom : 15,
      // right : 15,
      flexDirection : "row",
      // marginTop : 5,
      height : 50,
      width : "100%",
      backgroundColor : "white",
      justifyContent : "center",
      alignItems : "center",
      alignContent : "center",
      // borderRadius : 25,
      elevation : 25,
      alignSelf : "center"
    },
    addStyle : {
      color : "#2b2b39",
      fontSize : 32,
      fontWeight : "bold",
    },
    addStyle2 : {
      color : "#2b2b39",
      fontSize : 22,
      fontWeight : "bold",
    },
});
