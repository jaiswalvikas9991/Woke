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
import Geolocation from "@react-native-community/geolocation";
var Token;

export default class SendIncident extends Component {
  constructor(props) {
    super(props);
    
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
      calamityType : "",
      calamDes : "",
      errorMessage: null,
      loading: false,
      avatarSource : require('./avatar.png'),
      user_uid : "",
      user_profile : "",
      latitude : 0,
      longitude : 0,
      camps : []
    };

    this.campsRef = this.getRef().child("camps");
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

  renderErrorMessage = () => {
    if (this.state.errorMessage)
      return <Text style={styles.error}>{this.state.errorMessage}</Text>; 
  };

  sendAlert(){

  } 



 pickImage = () => {

  

    const options = {
      title: 'Select Avatar',
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

  componentDidMount= () => {
    this.getCamps(this.campsRef);
    
  };

  getCamps(campsRef)
    {
        campsRef.on("value", snap => {
          // get children as an array
          var items = [];
          snap.forEach(child => {
                  items.push({
                    name: child.val().name,
                    latitude : child.val().latitude,
                    longitude : child.val().longitude
                  });
          });
          // alert(JSON.stringify(items));
          this.setState({
            camps : items
          })

          alert(this.state.camps);
      });
          
    }

  uploadImage = async ()=> {




    var user = firebase.auth().currentUser;
  try {
    const response = await fetch(this.state.avatarSource.uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref('alerts')
      .child(user.email);
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

            Geolocation.getCurrentPosition(position => {
      alert(JSON.stringify(position));

      this.setState({latitude : position.coords.latitude,
                    longitude : position.coords.longitude});

                this.getRef()
                  .child("alerts")
                  .push({
                    calamType : this.state.calamityType,
                    calamDes : this.state.calamDes,
                    picture : this.state.user_profile,
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude,
                    uid : user.uid
                    // token: Token
                  });
                // alert("finish");
                this.setState ({
                  loading : false
                });


                var temp = this.state.latitude;
                var diff = 10000;
                for(var i = 0 ; i < this.state.camps.length ; i++){
                  if(this.state.latitude - this.state.camps[i].latitude < diff){
                    temp =  this.state.camps[i].latitude;
                    diff = this.state.latitude - this.state.camps[i].latitude;
                  } 
                }
                var passObject = {};
                for(var i = 0 ; i < this.state.camps.length ; i++){
                  if(temp ==  this.state.camps[i].latitude){
                    passObject = this.state.camps[i];
                    break;
                }

              }
                this.props.navigation.navigate("maps" , {"object" : passObject , "latitude" : this.state.latitude, "longitude" : this.state.longitude});
                alert("sjknsk");
    });
            
                
              
          });
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
        
          <TextInput
            value={this.state.calamityType}
            onChangeText={calamityType => this.setState({ calamityType })}
            style={styles.input}
            placeholder="Calamity Type..."
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
          <TextInput
            value={this.state.calamDes}
            onChangeText={calamDes => this.setState({ calamDes })}
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            placeholder="Calamity Description"
          />
        <TouchableHighlight
          onPress={this.uploadImage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send Alert</Text>
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
    width : "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom : 30
  },
  logo: {
    width: "100%",
    height: 300,
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
