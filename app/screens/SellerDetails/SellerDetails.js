import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from "react-native";

class Seller extends Component {
    static navigationOptions = {
        title: 'Details',
        headerStyle: { backgroundColor: '#e59400' },
        headerTitleStyle: { color: 'white' },
      };
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

export default Seller;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    }
});