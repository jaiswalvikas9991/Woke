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
import { Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
import Geolocation from "@react-native-community/geolocation"
// import Book from "../screens/BookDetails/BookDetail";
// import LinearGradient from 'react-native-linear-gradient';
import { withNavigation, createAppContainer, createStackNavigator } from 'react-navigation';

class ProductData extends Component {
    constructor(props) {
        super(props);
        // alert(JSON.stringify(this.props.data));
    }
    feedSelector = (feed, index) => {
        // alert(JSON.stringify(feed))
        this.props.navigation.navigate('book', { 'data': feed });
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.feedSelector(this.props.item, this.props.index)}
                    style={styles.Product}>
                    <Card
                        borderRadius={10}
                        image={{ uri: this.props.item.img_url }}
                        imageStyle={styles.cardImage}
                        containerStyle={{ padding : 0,borderWidth:0,borderRadius:0,backgroundColor: "#fff", elevation: 10, margin: 0,overflow:"hidden" ,height : 282}}
                    >
                    <View style={styles.cardData}>
                        
                        <View style={styles.cardDetails}>
                            <Text style={styles.ProductName}>
                                {this.props.item.book_name}
                            </Text>
                            <Text style={styles.sellerName} numberOfLines={2}>
                                {this.props.item.description}
                            </Text>
                            <Text style={styles.sellerName2}>
                                <Icon name="ios-locate"/> {this.props.item.location}
                            </Text>
                        </View>
                    </View>
                    
                    </Card>
                </TouchableOpacity>
                {/* {this.props.index %2==0? <View style={{height:5,backgroundColor:"#e5e5e5"}}></View>:<View style={{height:5,backgroundColor:"#e5e5e5"}}></View>} */}
            </View>
        );
    }
}

export default class ProductComponent extends Component {

    constructor(props){
        super(props);
        // alert(JSON.stringify(this.props.data));
        this.state = {
            query : "",
            latitude : 0,
            longitude : 0,
            location : ''
        }

    }

    getLocation =  async (latitude , longitude) => {
            var data = await fetch("https://api.opencagedata.com/geocode/v1/json?q=" + latitude + "+" + longitude + "&key=5c0bf3a094c742fe99bd791d7e8eaf71");
            var dataObj = await data.json();
            // alert(dataObj.results[0].components.road);
            this.setState({location : dataObj.results[0].components.road});
    }

    componentDidMount(){
            Geolocation.getCurrentPosition(position => {
      // alert(JSON.stringify(position));
        this.getLocation(position.coords.latitude, position.coords.longitude)
      this.setState({latitude : position.coords.latitude,
                    longitude : position.coords.longitude});
        });
    }

    sendIncident =()=>{
        this.props.navigation.navigate('SendIncident');
    }
    render() {
        return (
            <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white"/>
            <View style={styles.address}>
                    <Text style={styles.addressText}>{this.state.location}</Text>
                    <TouchableOpacity style={styles.topAddress} onPress = {this.sendIncident}>
                        <Text style={{textAlign:"center",fontSize:22,color : "white"}}>Alert</Text>
                    </TouchableOpacity>
                </View>
              <ScrollView>
                <View style={{backgroundColor: "#2b2b39" }}>
                    <FlatList
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        data={this.props.data}
                        renderItem={({ item, index }) => {
                            return (
                                <ProductData navigation={this.props.navigation} data={this.props.data} item={item} index={index}>

                                </ProductData>
                            );
                        }}
                    />
                </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    topAddress : {
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        textAlign:"center",
        position:"absolute",
        right:10,
        top:7,
        width:75,
        height:38,
        borderRadius:5,
        backgroundColor:"#ff3232",
        borderWidth : 0.5,
        borderColor : "gray"
    },
    Product: {
        height: 300,
        width: "100%",
        backgroundColor: "#e5e5e5",

    },
    ProductName: {
        color: "black",
        textAlign: "left",
        alignContent: "center",
        alignItems: "center"
    },
    sellerName: {
        color: "gray",
        textAlign: "left",
    },
    sellerName2: {
        color: "black",
        fontWeight : "bold",
        textAlign: "left",
    },
    cardImage: {
        height : 190
    },
    cardDetails : {
        // marginBottom : 10
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
        width : "50%",
        justifyContent : "center",
        alignItems : "center",
        alignContent : "center"
    },
    cardData : {
        flexDirection : "row"
    },
    cardLogo : {

    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        // marginLeft: 0,
        marginRight : 7
      },
      address: {
        backgroundColor: "#fff",
        elevation: 5,
        padding: 15,
        flexDirection : "row",
        height : 60
    },
    addressText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#000"
    },
})