import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from "react-native";
import SellerComponent from "../../components/SellerComponent";

class Sellers extends Component {

    render() {

        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#191922" />
            <SellerComponent></SellerComponent>
            </View>
        );
    }
}

export default Sellers;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    }
});