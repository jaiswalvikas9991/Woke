import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from "react-native";
class SignIn extends Component {

    render() {

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                </ScrollView>
            </View>
        );
    }
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    }
});