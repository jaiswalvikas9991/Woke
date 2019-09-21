import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar
} from "react-native";
import BookDetails from "../../components/BookDetails";

class Book extends Component {
    static navigationOptions = {
        headerTransparent : true,
        headerTintColor : "#fff"
      };
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#191922" />
                <ScrollView>
                    <BookDetails videos={this.props.navigation.state.params} navigation={this.props.navigation}></BookDetails>
                
                </ScrollView>
            </View>
        );
    }
}

export default Book;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    }
});