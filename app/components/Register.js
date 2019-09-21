import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import { StackNavigator } from "react-navigation";
import firebase from "firebase";
import ImagePicker from 'react-native-image-picker';
import Spinner from "react-native-loading-spinner-overlay";
import Icon from 'react-native-vector-icons/Ionicons';

var Token;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      contact : "",
      password: "",
      password_confirmation: "",
      errorMessage: null,
      loading: false,
      avatarSource : require('./avatar.png'),
      user_uid : "",
      user_profile : ""
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
    firebase
      // .messaging()
      // .getToken()
      // .then(token => {
      //   console.warn("Device firebase Token: ", token);
      //   Token = token;
      // });
  }

  getRef() {
    return firebase.database().ref();
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

  async onRegisterPress() {
    this.setState({ errorMessage: null, loading: true });
    const { email, password, name } = this.state;
    console.log(email);
    console.log(name);
    console.log(password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ errorMessage, loading: false });
      });

    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("password", password);

    this.uploadImage(this.state.avatarSource);

  }

  renderErrorMessage = () => {
    if (this.state.errorMessage)
      return <Text style={styles.error}>{this.state.errorMessage}</Text>; 
  };

  pickImage = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
     
    ImagePicker.showImagePicker(options, (response) => {
      // alert(JSON.stringify(response));
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
     
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
     
        this.setState({
          avatarSource: source,
        });
        //alert(JSON.stringify(this.state.avatarSource));
        // this.uploadImage(this.state.avatarSource);
      }
    });
  }

  uploadImage = async uri => {
    
  try {
    const response = await fetch(uri.uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref('avatar')
      .child(this.state.email);
    const task = ref.put(blob);



    return new Promise((resolve, reject) => {
      task.on('state_changed',
        (snapshot) => {
          // alert("progress");
        },
        (error) => {
          //alert("founderror");
        },
        () => {
          ref.getDownloadURL().then(url => {
            this.setState({
              user_profile : url,
              loading : true
            });
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log(user.uid, user.email);
                //alert(user.uid);
                this.setState({
                  user_uid : user.uid
                });
                this.getRef()
                  .child("alerts")
                  .push({
                    email: user.email,
                    uid: user.uid,
                    name: this.state.name,
                    avatar : this.state.user_profile
                    // token: Token
                  });
                  //alert(this.state.avatarSource);
                  this.setState({
                  loading: false
                });
                this.props.navigation.navigate("Boiler");
                
                //alert("finish");
              }
            });
          })
        }
      );

    });
  } catch (err) {
    console.log('uploadImage try/catch error: ' + err.message);
  }
};


  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#191922" />
        
        {/* <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./banana.png")} />
          <Text style={styles.subtext}>Sign Up:</Text>
        </View> */}
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={this.state.avatarSource} />

          <TouchableHighlight onPress={this.pickImage}>
            <Text>{'\n'}<Icon name="ios-camera" size = {40} color = "white"/></Text>
          </TouchableHighlight>
        </View>
        
        <KeyboardAvoidingView>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(255,255,255,0.7)"
            ref={input => (this.passwordCInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            value={this.state.password}
            onChangeText={password_confirmation =>
              this.setState({ password_confirmation })
            }
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
          />
        </KeyboardAvoidingView>
        <TouchableHighlight
          onPress={this.onRegisterPress.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
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
    alignItems: "center",
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
    height: 200,
    borderRadius : 100,
    borderWidth : 1,
    borderColor : "white"
  },
  input: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10,
    borderWidth : 1,
    borderColor : "white",
    borderRadius : 10
  },
  button: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 10,
    borderWidth : 1,
    borderColor : "white",
    borderRadius : 10
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  subtext: {
    color: "#ffffff",
    width: 160,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 20
  },
  error: {
    margin: 8,
    marginBottom: 0,
    color: "red",
    textAlign: "center"
  }
});

AppRegistry.registerComponent("Register", () => Register);
