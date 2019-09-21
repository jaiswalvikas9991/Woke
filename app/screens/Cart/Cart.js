import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from "react-native";
// import Header from "../../components/Header";
import CartComponent from "../../components/CartComponent";
class Cart extends Component {

    render() {

        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#191922" />   
            <CartComponent/>        
             </View>
        );
    }
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    }
});