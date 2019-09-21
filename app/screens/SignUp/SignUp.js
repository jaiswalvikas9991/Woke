import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from "react-native";
class SignUp extends Component {

    render() {

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                </ScrollView>
            </View>
        );
    }
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    }
});