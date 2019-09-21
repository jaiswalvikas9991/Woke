import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import firebase from "firebase";
export default class CreateTeam extends Component {
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
        loading : false,
        groups : [],
        group_details : []
      };

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
            loading: false
        };

        this.friendsRef = this.getRef().child("friends");
        this.groupRef = this.getRef().child("GroupDetails");

  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#2b2b39",
      elevation: null
    },
    headerTitleStyle : {
      color : "white"
    }
  };

  createTeam(){
    var user = firebase.auth().currentUser;
    // this.groupRef = this.getRef().child("GroupDetails");
    // alert(this.groupRef);
    var key = this.groupRef.push().getKey();
    var members = [];
    members.push(user.uid);
    this.groupRef.push({
      _id : key,
      members : members,
      name : this.state.email,
    });

    var chatRef = this.getRef().child("friends");
    // alert(chatRef);
    var chatRefData = chatRef.orderByChild("uid").equalTo(user.uid);
    var demo = "Demo User";
    chatRefData.on("child_added",
      (snapshot) => {
        var items = snapshot.val().groups;
        items.push(key);
        snapshot.ref.update({groups : items});
      });
  }

  getRef() {
    return firebase.database().ref();
  }

  renderErrorMessage = () => {
    if (this.state.errorMessage)
      return <Text style={styles.error}>{this.state.errorMessage}</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#191922" />
        
        <TextInput
          placeholder="Type Team Name..."
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.createTeam.bind(this)}
        >
          <Text style={styles.buttonText}>Create Team</Text>
        </TouchableOpacity>
        {this.renderErrorMessage()}
        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
    justifyContent: "flex-start",
    backgroundColor: "#2b2b39",
    padding: 20,
    paddingTop: 100
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10,
    borderWidth : 1,
    borderColor : "white",
    borderRadius : 10
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15,
    borderWidth : 1,
    borderColor : "white",
    borderRadius : 10
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  }
});
