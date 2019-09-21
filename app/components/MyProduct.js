import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Animated,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from "firebase";
class CartData extends Component {
    render() {
        return (
            <View>
                <View style={styles.cart}>
                    <View style={styles.cartItem}>
                        <TouchableOpacity>
                            <View style={styles.itemPic}>
                                <Image
                                    style={styles.image}
                                    source={{uri:this.props.item.picture}}
                                />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.itemName}>
                            <TouchableOpacity>
                                <Text style={styles.bookName}>{this.props.item.type}</Text>
                                <Text style={styles.bookDescription}>{this.props.item.desc}</Text>
                                <Text style={styles.bookDescription}>Location : Bandra</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.divider}></View>
            </View>
        );
    }
}

export default class MyProduct extends Component {

    constructor(props){
        super(props);
        if(!firebase.apps.length)
        {
          firebase.initializeApp({
            apiKey: "AIzaSyB9TdsMiuHr_2KT8MuSxsHg-AD-pAthPIE",
            authDomain: "book-store-56297.firebaseapp.com",
            databaseURL: "https://book-store-56297.firebaseio.com",
            projectId: "book-store-56297",
            storageBucket: "book-store-56297.appspot.com",
            messagingSenderId: '338626308290',
          });
        }

        this.alertsRef = this.getRef().child("alerts");

        this.state = {
            alerts : []
        }
    }

    getRef(){
        return firebase.database().ref();
    }

    listenForItems(friendsRef) {
        var user = firebase.auth().currentUser;
        

        friendsRef.on("value", snap => {
          // get children as an array
          var items = [];
          snap.forEach(child => {
            if (child.val().uid == user.uid)
            {
              items.push({
                latitude: child.val().latitude,
                longitude: child.val().longitude,
                desc: child.val().calamDes,
                type : child.val().calamType,
                picture : child.val().picture
              });
            }
              
          });

          this.setState({
            alerts : items
          });

        //   alert(this.state.alerts);
        });
      }


    componentDidMount(){
        this.listenForItems(this.alertsRef);
    }

    render() {
        this.ProductListData = [
            {
                "key": "1",
                "imgUrl": "../../images/seller.jpg",
                "ProductName": 'BOOK NAME',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "2",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "3",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "4",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "5",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "6",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "7",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "8",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "9",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "10",
                "imgUrl": "../../images/2.png",
                "ProductName": 'Title',
                "sellerName": "SELLER NAME"
            },
        ];
        return (
            <View style={styles.container}>

            <TouchableOpacity style={styles.addProduct}>
              <Text style={styles.addStyle2}>Add Feed</Text>
              <Text style={styles.addStyle}> +</Text>
            </TouchableOpacity>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.alerts}
                    renderItem={({ item, index }) => {
                        return (
                            <CartData item={item} index={index}>

                            </CartData>
                        );
                    }}
                />



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    address: {
        backgroundColor: "white",
        elevation: 5,
        padding: 15
    },
    addressText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "black"
    },
    divider: {
        height: 15,
        backgroundColor: "#f2f2f2"
    },
    cart: {
        backgroundColor: "white",
        padding: 15,
        elevation : 10
    },
    cartItem: {
        flexDirection: "row"
    },
    itemPic: {
        width: 160,
        height: 100,
        backgroundColor: "#2b2b39",
        elevation: 5
    },
    image: {
        width: 160,
        height: 100
    },
    itemName: {
        paddingLeft: 15
    },
    bookName: {
        fontSize: 20,
        color: "black"
    },
    bookDescription: {
        color: "#7f7f7f",
        fontSize: 14
    },
    remove: {
        borderWidth: 0.5,
        borderColor: "#e5e5e5",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "white",
        elevation: 5,
        padding: 15,
        flexDirection : "row"
    },
    removeText: {
        color: "#7f7f7f",
        fontSize: 20,
        textAlign: "center"

    },
    addProduct : {
      // position : "absolute",
      // bottom : 15,
      // right : 15,
      flexDirection : "row",
      // marginTop : 5,
      height : 50,
      width : "100%",
      backgroundColor : "white",
      justifyContent : "center",
      alignItems : "center",
      alignContent : "center",
      // borderRadius : 25,
      elevation : 25,
      alignSelf : "center"
    },
    addStyle : {
      color : "#2b2b39",
      fontSize : 32,
      fontWeight : "bold",
    },
    addStyle2 : {
      color : "#2b2b39",
      fontSize : 22,
      fontWeight : "bold",
    },
})
//export default Header;