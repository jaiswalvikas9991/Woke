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
export default class FriendsList extends Component {
  
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
        if (child.val().email != user.email)
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

  renderRow = rowData => {
    alert(rowData);
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
