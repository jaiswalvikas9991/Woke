import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from "react-native";
class Categories extends Component {

    render() {

        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#191922" />
            </View>
        );
    }
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    }
});