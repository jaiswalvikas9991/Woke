import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';

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
                                    source={require('./avatar.png')}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.itemName}>
                            <TouchableOpacity>
                                <Text style={styles.bookName}>BOOK NAME</Text>
                                <Text style={styles.bookDescription}>Description....</Text>
                                <Text style={styles.bookDescription}>Price : 250</Text>
                                <Text style={styles.bookDescription}>Seller Name</Text>
                            </TouchableOpacity>
                            <Text>
                                <Icon name='ios-star' size={20} color="#e5c100" />
                                <Icon name='ios-star' size={20} color="#e5c100" />
                                <Icon name='ios-star' size={20} color="#e5c100" />
                                <Icon name='ios-star' size={20} color="#e5c100" />
                                <Icon name='ios-star' size={20} color="#e5c100" />
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.remove}>
                    <TouchableOpacity>
                        <Text style={styles.removeText}>
                            <Icon name="ios-trash" color="#7f7f7f" size={20} /> Remove
                            </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>
            </View>
        );
    }
}

export default class CartComponent extends Component {

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
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "3",
                "imgUrl": "../../images/2.png",
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "4",
                "imgUrl": "../../images/2.png",
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "5",
                "imgUrl": "../../images/2.png",
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "6",
                "imgUrl": "../../images/2.png",
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "7",
                "imgUrl": "../../images/2.png",
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "8",
                "imgUrl": "../../images/2.png",
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "9",
                "imgUrl": "../../images/2.png",
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
            {
                "key": "10",
                "imgUrl": "../../images/2.png",
                "ProductName": 'BOOK STORE',
                "sellerName": "SELLER NAME"
            },
        ];
        return (
            <View style={styles.container}>
                <View style={styles.address}>
                    <Text style={styles.addressText}>ABC 123 Santacruz Mumbai 400054</Text>
                </View>

                <View style={styles.divider}></View>



                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.ProductListData}
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
        backgroundColor: "#2b2b39",
        elevation: 5,
        padding: 15
    },
    addressText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white"
    },
    divider: {
        height: 15,
        backgroundColor: "#f2f2f2"
    },
    cart: {
        backgroundColor: "white",
        padding: 15,
    },
    cartItem: {
        flexDirection: "row"
    },
    itemPic: {
        width: 70,
        height: 100,
        backgroundColor: "orange",
        elevation: 5
    },
    image: {
        width: 70,
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
        padding: 15
    },
    removeText: {
        color: "#7f7f7f",
        fontSize: 20,
        textAlign: "center"
    }
})
//export default Header;