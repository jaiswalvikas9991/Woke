import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    ImageBackground,
    Button,
    Share
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Book from '../screens/BookDetails/BookDetail';
import LinearGradient from 'react-native-linear-gradient';

let Dimension = Dimensions.get('window');
let height = Dimension.height;
let width = Dimension.width;

class BookData extends Component {

    static navigationOptions = {
        headerTransparent : true,
        headerTintColor : "#fff"
      };
    constructor(props) {
        super(props);
    }

    whatsAppShare = () => {
        var message = "test message";
        var shareOptions = {
            title: "Incident",
            message : this.props.item.data.book_name+"\n"+this.props.item.data.description + "\n"+this.props.item.data.img_url,
            // message: video.content + " " + "http://freehitnews.com?link=" + video.media_uri,
            url: this.props.item.data.img_url,
            subject: this.props.item.data.img_url, //  for email
        };
        Share.share(Object.assign(shareOptions, {
            "social": "whatsapp"
        }));
    };

    render() {
        return (
            <View>

                <View style={styles.profileContainerLogo}>
                    <View style={styles.profileShadow}>
                        <ImageBackground
                            style={styles.profile}
                            source={{ uri: this.props.item.data.img_url }}
                        >
                        <LinearGradient colors={['#cc000000', '#000000']} style={styles.linearGradientBottom}>
                            <View>
                                <Text style={styles.description}>{this.props.item.data.book_name}</Text>
                            </View>
                            <TouchableOpacity style={styles.opt} onPress={this.whatsAppShare}>
                                <Icon name="logo-whatsapp" size={22} color="#fff"/> 
                            </TouchableOpacity>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                </View>

                <View style={styles.descriptionD}>
                    <Text style={styles.desHeading}>Description</Text>
                    <Text style={styles.desData}>
                        {this.props.item.data.description}
                    </Text>

                    <View style={{ height: 0.02, backgroundColor: "white" }}></View>

                    <Text style={styles.desHeading}>{"\n"}Location</Text>
                    <Text style={styles.desData}>
                        {this.props.item.data.location}
                    </Text>
                </View>

                <View style={styles.divider}></View>

            </View>
        );
    }
}

class BookDetails extends Component {
    static navigationOptions = {
        headerTransparent : true,
        headerTintColor : "#fff"
      };
    render() {

        console.disableYellowBox = true;

        return (
            <View style={styles.container}>
                <BookData item={this.props.videos} navigation={this.props.navigation}></BookData>
            </View>
        );
    }
}

export default BookDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    details: {
        marginLeft: 20
    },
    bookName: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold"
    },
    sellerName: {
        fontSize: 20,
        color: "white",
        marginTop: 5
    },
    icon: {
        marginRight: 10,
    },
    divider: {
        height: 0.3,
        backgroundColor: "gray"
    },
    descriptionD: {
        padding: 10,
        margin: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        elevation: 0,
        borderRadius: 5
    },
    desHeading: {
        color: "#e5e5e5",
        fontSize: 15
    },
    desData: {
        fontSize: 17,
        color: "white",
    },
    review : {
        marginTop : 8,
        marginBottom : 8
    },
    reviewContainer: {
        padding: 10,
        margin: 10,
        elevation: 10,
        backgroundColor: "#2b2b39",
        borderRadius: 5,
        // borderWidth: 0.5,
        // borderColor: "#e5e5e5"
    },
    reviewHeading: {
        color: "#fff",
        fontSize: 15
    },
    reviewPerson: {
        flexDirection: "row",
    },
    reviewPersonFirstContainer: {
        height: 40,
        width: 40,
        backgroundColor: "#e5c100",
        padding: 3,
        borderRadius : 20,
        alignItems : "center",
        justifyContent : "center",
        alignContent : "center"
    },
    reviewPersonFirstLetter: {
        fontSize: 25,
        color: "#fff",
        fontWeight : "bold"
    },
    reviewNameRating : {
        marginLeft : 5
    },
    givenRating : {
        flexDirection : "row"
    },
    reviewName : {
        fontSize : 15,
        color : "gray",
        marginLeft : 7
    },
    reviewText : {
        color : "#fff"
    },
    profileContainerLogo: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2b39",
        elevation: 20,
        height : 270,
    },
    profileShadow: {
        flex: 1,
        alignContent: "center",
        backgroundColor : "teal",
        alignItems: "center",
        height: 270,
        width: "100%",
    },
    profile: {
        height: 270,
        width: "100%",
    },
    linearGradientBottom: {
        width:"100%",
        height: 70,
        // marginTop: iHeight - 300,
        // marginBottom:0,
        bottom: 0,
        padding: 15,
        paddingBottom: 5,
        position: "absolute",
        flexDirection : "row"
    },
    description: {
        fontFamily: "Myriad Pro",
        fontSize: 18.3,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        marginTop : 17
    },
    views: {
        fontFamily: "Myriad Pro",
        fontSize: 10,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        marginTop: 5
    },
    option : {
        flexDirection : "row",
        width : "100%",
        borderTopWidth : 0.5,
        // borderBottomWidth : 0.5,
        borderColor : "gray",
        backgroundColor : "#2b2b39",
        height : 45,
        elevation : 10,
        // marginBottom : 10
    },
    opt : {
        position : "absolute",
        right : 15,
        top : 32
    },
})