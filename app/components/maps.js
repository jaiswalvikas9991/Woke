import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TouchableHighlight,
    ScrollView,
    Image,
    StatusBar
} from 'react-native';

// import Book from "../screens/BookDetails/BookDetail";
// import LinearGradient from 'react-native-linear-gradient';
import { withNavigation, createAppContainer, createStackNavigator } from 'react-navigation';
import WebView from 'react-native-webview';

export default class Maps extends Component {

    static navigationOptions = {
        // title : "Team",
        headerTransparent : true,
        headerTintColor : "#fff"
        // headerStyle: {
        //   position:"absolute",
        //   backgroundColor: "transparent",
        //   zIndex : 100,
        //   top : 0,
        //   left : 0,
        //   right : 0,
        //   elevation : 0,
        //   shadowOpacity : 0,
        //   borderBottomWidth : 0,
        // },
      };

    constructor(props) {
        super(props);
        // alert(JSON.stringify(this.props.data));
        this.state = {
            ready : true
        }
    }

    componentDidMount = () => {

    };
    

    render() {
        return (
            this.state.ready && 
            <View style = {{flex : 1}} >
                <WebView
                    automaticallyAdjustContentInsets = {false}
                    source = {{uri : "https://www.google.com/maps/dir/'" + this.props.navigation.state.params.latitude + "," + this.props.navigation.state.params.longitude + "'/'" + this.props.navigation.state.params.object.latitude + "," + this.props.navigation.state.params.object.longitude + "'/"}}
                    javaScriptEnabled = {true}
                    domStorageEnabled = {true}
                    decelerationRate = "normal"
                    startInLodingState = {true}

                />
            </View>
        );
    }
}

// "https://www.google.com/maps/dir/'19.0386008,72.8248019'/'19.0386007,72.8248019'/"

// "https://www.google.com/maps/dir/'" + this.props.navigation.state.params.latitude + "," + this.props.navigation.state.params.longitude + "'/'" + this.props.navigation.state.params.object.latitude + "," + this.props.navigation.state.params.object.longitude + "'/"