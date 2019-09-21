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
export default class AddMember extends Component {
  
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
      loading : true
    };

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
    // alert(this.props.navigation.state.params.g_id);
    
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
        
          items.push({
            name: child.val().name,
            uid: child.val().uid,
            email: child.val().email,
            avt : child.val().avatar,
          });
        
          
      });

      this.setState({
        dataSource:items,
        dataBackup : items,
        loading: false
      });

      // alert(this.state.dataSource);
    });
  }

  getLastMessage(current_user,friend){
    var chatId = this.generateChatId(current_user,friend);
    var chatRef = this.getRef().child("chat/"+chatId);
    var snap = "old";
    var chatRefData = chatRef.orderByKey().limitToLast(1).on("child_added",
      (snapshot) => {
      snap = snapshot.val().text;
      // alert(snap);
      }
      );
    // alert(snap);
  }

  getRef() {
    return firebase.database().ref();
  }

  generateChatId(current_user,friend) {
    if (current_user > friend) return `${current_user}-${friend}`;
    else return `${friend}-${current_user}`;
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
    // headerRight: (
    //   <Button
    //     primary
    //     title="Logout"
    //     onPress={() => {
    //       firebase
    //         .auth()
    //         .signOut()
    //         .then(
    //           () => {
    //             this.props.navigation.navigate("Login");
    //           },
    //           function(error) {
    //             // An error happened.
    //           }
    //         );
    //     }}
    //   >
    //     Log out
    //   </Button>
    // )
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
    })
    }
    
    // alert(searchText);
    
  }

  

  addMember = (uid) => {
var user = firebase.auth().currentUser;
    // this.groupRef = this.getRef().child("GroupDetails");
    // alert(this.groupRef);
    // var key = this.groupRef.push().getKey();
    // var members = [];
    // members.push(user.uid);
    // this.groupRef.push({
    //   _id : key,
    //   members : members,
    //   name : this.state.email,
    // });

    var chatRef = this.getRef().child("friends");
    // alert(chatRef);
    var chatRefData = chatRef.orderByChild("uid").equalTo(uid);
    var demo = "Demo User";
    chatRefData.on("child_added",
      (snapshot) => {
        var items = snapshot.val().groups;
        var flag = 0;
        for(var i = 0 ; i < items.length ; i++){
          if(items[i] == this.props.navigation.state.params.g_id){
            flag =  0;
            break;
          }
          else flag = 1;
        }
        if(flag == 1) items.push(this.props.navigation.state.params.g_id);
        snapshot.ref.update({groups : items});
      });

    var groupRef = this.getRef().child("GroupDetails");
    // alert(chatRef);
    var groupRefData = groupRef.orderByChild("_id").equalTo(this.props.navigation.state.params.g_id);
    var demo = "Demo User";
    groupRefData.on("child_added",
      (snapshot) => {
        var items = snapshot.val().members;
        var flag = 0;
        for(var i = 0 ; i < items.length ; i++){
          if(items[i] == uid){
            flag =  0;
            break;
          }
          else flag = 1;
        }
        if(flag == 1)  items.push(uid);
        snapshot.ref.update({members : items});
      });
  }

  renderRow = rowData => {
    // alert(rowData);
    return (
      <TouchableOpacity
        onPress={() => {
          // name = rowData.name;
          // email = rowData.email;
          // uid = rowData.uid;
          name = "saurabh"
          email = "saurabh@gmail.com"
          uid = "Yp4EpnNRIsOrCmyxvlzydyvnwuO2"
          // this.props.navigation.setParam({'name':name});
          this.props.navigation.setParams({
            name: name,
            email: email,
            uid: uid
          });
        }}
      >
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://www.gravatar.com/avatar/"
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  FlatListItemSeparator = () => {
      return (
          <View style={{height : 1.2,width:"100%",backgroundColor:"#e5e5e5"}}>

          </View>
          );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom:10}}>
          <SearchBar
          lightTheme
          onChange = {this.setSearchText.bind(this)}
          placeholder = 'Type Here ...'
          value={this.state.query}
          />
        </View>
        {/* <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        /> */}
        <FlatList
        showsVerticalScrollIndicator = {false}
        renderRow = {this.renderRow}
        data = {this.state.dataSource}
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
          uid = item.uid;
              this.props.navigation.navigate("chats", {
                name: name,
                email: email,
                uid: uid,
                avatar : item.avt
              });
            }}
          >
            <View style={styles.profileContainer}>
              <Image
                source={{uri : item.avt}}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{item.name}</Text>
              <TouchableOpacity 
              onPress = {()=>this.addMember(item.uid)}
              style={{width:40,height:30,borderRadius:5,position:"absolute",right:0}}>
                <Text style={{fontSize:24}}>+</Text>
              </TouchableOpacity>
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
  }
});
