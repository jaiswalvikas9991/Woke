import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TouchableHighlight
} from 'react-native';
import { Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';

class SellerData extends Component {
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <View>
            <TouchableOpacity style={styles.seller}>

                <Card
                    borderRadius={10}
                    image={require('./email.png')}
                    imageStyle={styles.cardImage}
                    containerStyle={{ backgroundColor: "white", elevation: 5 }}
                >
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                        <Text style={{ paddingLeft: 125 }}>
                            <Icon name='ios-star' size={20} color="#e5c100" />
                            <Icon name='ios-star' size={20} color="#e5c100" />
                            <Icon name='ios-star' size={20} color="#e5c100" />
                            <Icon name='ios-star' size={20} color="#e5c100" />
                            <Icon name='ios-star' size={20} color="#e5c100" />
                        </Text>
                    </View>
                    <Text style={styles.sellerName}>
                        {this.props.item.sellerName}
                    </Text>
                    <Text style={styles.address}>
                        {this.props.item.address}
                    </Text>

                </Card>
            </TouchableOpacity>
                    {this.props.index %2==0? <View style={{height:15,backgroundColor:"#e5e5e5"}}></View>:<View style={{height:15,backgroundColor:"#e5e5e5"}}></View>}
            </View>
        );
    }
}

class SellerComponent extends Component {
    constructor(props){
        super(props);
        // alert(JSON.stringify(this.props.data));
        this.state = {
            query : "",
        }
    }
    render() {
        this.sellerListData = [
            {
                "key": "1",
                "imgUrl": "../../images/seller2.jpg",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "2",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "3",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "4",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "5",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "6",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "7",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "8",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "9",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
            {
                "key": "10",
                "imgUrl": "../../images/2.png",
                "sellerName": 'BOOK STORE',
                "address": "ABC 123 Mumbai 400054 SANTACRUZ"
            },
        ];
        return (
            <View style={styles.container}>
            <SearchBar
              // lightTheme
              // onChange = {this.setSearchText.bind(this)}
              placeholder = 'Type Here ...'
              value={this.state.query}
              />
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "white" }}>
                    <FlatList
                        numColumns={1}
                        showsVerticalScrollIndicator={false}
                        data={this.sellerListData}
                        renderItem={({ item, index }) => {
                            return (
                                <SellerData item={item} index={index}>

                                </SellerData>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default SellerComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff3232"
    },
    seller: {
        height: 430,
        width: 390,
        backgroundColor: "white",
    },
    sellerName: {
        color: "black",
        textAlign: "center",
        alignContent: "center",
        alignItems: "center"
    },
    address: {
        textAlign: "center"
    },
    cardImage: {
        overflow: "hidden",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height : 300,
        elevation : 5
    }
})