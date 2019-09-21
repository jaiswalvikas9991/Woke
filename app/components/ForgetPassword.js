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
export default class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errorMessage: null,
      password: "",
      loading: false
    };
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

  onForgetPress() {
    this.setState({ errorMessage: null, loading: true });
    const { email } = this.state;
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
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ loading: false });
        // alert("The email has been sent to reset password.");
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({
          errorMessage,
          loading: false
        });
      });
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
          placeholder="Email Id"
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
          onPress={this.onForgetPress.bind(this)}
        >
          <Text style={styles.buttonText}>Forget Password</Text>
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
