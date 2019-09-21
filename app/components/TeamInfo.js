import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    TouchableHighlight,
    Button,
    Dimensions,
    FlatList,
    Image,
    StatusBar
} from 'react-native';
// import LoginComponent from  "./LoginComponent";
import { createSwitchNavigator, createAppContainer, createMaterialTopTabNavigator,createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from "react-native-elements";
// import ImagePicker from 'react-native-imagepicker';
import firebase from "firebase";
import FriendsList from "./Friendlist";
import MyProduct from "./MyProduct";
import Chat from "./GroupMessage";
import Chats from "./Chat";
import GloChat from "./GloChat";
import TeamComponent from "./teamComponent";
import CreateTeam from "./CreateTeam";
import Spinner from "react-native-loading-spinner-overlay";
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';

let Dimention = Dimensions.get('window');
let height = Dimention.height;
let width = Dimention.width;

export default class TeamInfo extends Component {

    static navigationOptions = {
        // title : "Team",
        headerTransparent : true,
        headerTintColor : "#fff"
        // headerStyle: {
        //   position:"absolute",
        //   backgroundColor: "transparent",
        //   zIndex : 100,
        //   top : 0,
        //   left : 0,
        //   right : 0,
        //   elevation : 0,
        //   shadowOpacity : 0,
        //   borderBottomWidth : 0,
        // },
      };
    constructor(props)
    {
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

        this.state = {
            loading : true,
            members : [],
            alerts : [],
            tabCount : 0,
            latitude : 0,
            longitude : 0
        }
        this.groupRef = this.getRef().child("friends");
        this.alertsRef = this.getRef().child("alerts");
        // alert(this.props.navigation.state.params.uid);
    }

    getRef(){
        return firebase.database().ref();
    }

    getAlerts(alertsRef)
    {
        alertsRef.on("value", snap => {
          // get children as an array
          var items = [];
          snap.forEach(child => {
                  items.push({
                    name: child.val().latitude,
                    avt : child.val().longitude,
                    des : child.val().calamDes,
                    type : child.val().calamType,
                    picture :child.val().picture,
                  });
          });
          // alert(JSON.stringify(items));
          this.setState({
            loading : false,
            alerts : items
          })

      });
          
    }

    listenForItems(friendsRef) {
        var user = firebase.auth().currentUser;
        
        friendsRef.on("value", snap => {
          // get children as an array
          var items = [];
          snap.forEach(child => {
            var members = this.props.navigation.state.params.member;
            for(var i=0;i<members.length;i++)
            {
                if (child.val().uid == members[i])
                {
                  items.push({
                    name: child.val().name,
                    avt : child.val().avatar
                  });
                }    
            }
            
          });

          this.setState({
            loading: false
          });
          this.setState({
            members : items
          });
          // alert(this.state.members);
        });
      }

      onTap = (item) => {
        var passObject = {"latitude" : item.latitude, "longitude" : item.longitude};
        this.props.navigation.navigate('maps' , {"latitude" : this.state.latitude , "longitude" : this.state.longitude , "object" : passObject});
      };

      renderTapComp = () => {
        switch(this.state.tabCount){
            case 0 : return(

                <FlatList
                        showsVerticalScrollIndicator = {false}
                        data = {this.state.alerts}
                        ItemSeparatorComponent = {this.FlatListItemSeparator}
                        renderItem = {({item,index}) => {
                          return (
                            <TouchableOpacity onPress={() => this.onTap(item)}
                                style={styles.Product}>
                                <Card
                                    borderRadius={10}
                                    image={{ uri: item.picture }}
                                    imageStyle={styles.cardImage}
                                    containerStyle={{ padding : 0,borderWidth:0,borderRadius:0,backgroundColor: "#fff", elevation: 10, margin: 0,overflow:"hidden" ,height : 276}}
                                >
                                <View style={styles.cardData}>
                                    
                                    <View style={styles.cardDetails}>
                                        <View style={{width:"90%"}}>
                                            <Text style={styles.ProductName}>
                                            {item.type}
                                            </Text>
                                            <Text style={styles.sellerName}>
                                                {item.des}
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.onTap(item)}>
                                        <View style={{position:"absolute",right:10}}>
                                        
                                        <Icon name="ios-locate" size= {30} style={{position: "absolute",top:10,left:10}}/>
                                        
                                        </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                </Card>
                            </TouchableOpacity>
                          );
                      }}
                        />
                );


            case 1 : return(
                <View style={styles.memberContainer}>
                    <Text style={styles.descriptionM}>Members</Text>
                    <FlatList
                        showsVerticalScrollIndicator = {false}
                        data = {this.state.members}
                        ItemSeparatorComponent = {this.FlatListItemSeparator}
                        renderItem = {({item,index}) => {
                          return (
                            <View style={{marginRight:0,marginLeft:0,marginBottom : 0,backgroundColor :"#2b2b39"}}>
                            
                            <View style={styles.profileContainer}>
                              <Image
                                source={{uri : item.avt}}
                                style={styles.profileImage}
                              />
                              <Text style={styles.profileName}>{item.name}</Text>
                              <Icon name="ios-trophy" size={25} color="gold" style={{position:"absolute",right:12}}/>
                            </View>
                          </View>
                          );
                      }}
                        />
                </View>
            );
        }
      };

      onTabChangeFeed = () => {
        this.setState((currentState) => {
            if(currentState.tabCount != 0)
                return({tabCount : 0});
        });
      };

      onTabChangeMember = () => {
        this.setState((currentState) => {
            if(currentState.tabCount != 1)
                return({tabCount : 1});
        });
      };

    componentDidMount(){
        Geolocation.getCurrentPosition(position => {
      // alert(JSON.stringify(position));

      this.setState({latitude : position.coords.latitude, longitude : position.coords.longitude,loading : false});
  });
        this.listenForItems(this.groupRef);
        this.getAlerts(this.alertsRef);
    }

    FlatListItemSeparator = () => {
      return (
          <View style={{height : 0.5,width:"100%",backgroundColor:"#40404c"}}>

          </View>
          );
      }


    render() {
            return (
            <View style={styles.container}>
                <View style={styles.profileContainerLogo}>
                    <View style={styles.profileShadow}>
                        <ImageBackground
                            style={styles.profile}
                            source={require('./avatar.png')}
                        >
                        <LinearGradient colors={['#cc000000', '#000000']} style={styles.linearGradientBottom}>
                                <Text style={styles.description}>{this.props.navigation.state.params.name}</Text>
                                <Text style={styles.views}>81k Likes</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.addToCart}>
                    <View style={{width:"48.5%"}}>
                        <Button
                                title="ADD MEMBER"
                                color="#2b2b39"
                                onPress = {()=> {
                                    this.props.navigation.navigate("addMember",{"g_id":this.props.navigation.state.params.uid});
                                }}
                            />
                    </View>
                    <View style={{width:"48.5%"}}>
                        <Button
                                title="CHAT"
                                color="#2b2b39"
                                onPress={() => {
                                      this.props.navigation.navigate("Chat", {
                                        name: this.props.navigation.state.params.name,
                                        uid: this.props.navigation.state.params.uid,
                                      });
                                    }}
                            />
                    </View>
                        
                </View>

                <View style={styles.addToCart2}>
                    <View style={{width:"50%"}}>
                        <Button
                                title="MEMBERS"
                                color="#2b2b39"
                                onPress = {this.onTabChangeMember}
                            />
                    </View>
                    <View style={{width:"50%"}}>
                        <Button
                                title="LIVE FEED"
                                color="#2b2b39"
                                onPress= {this.onTabChangeFeed}
                            />
                    </View>


                        
                </View>

                {this.renderTapComp()}




                
                <Spinner visible={this.state.loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    memberContainer : {
        paddingTop : 5,
        paddingBottom: 5,
        backgroundColor : "#40404c"
    },
    cardDetails : {
        flexDirection : "row",
        justifyContent : 'space-between'
    },
    addToCart: {
        padding: 10,
        flexDirection : "row",
        justifyContent : "space-between"
    },
    addToCart2: {
        flexDirection : "row",
        justifyContent : "space-between",
        marginBottom : 5
    },
    Product: {
        height: 300,
        width: "100%",
        backgroundColor: "#e5e5e5",

    },
    cardImage : {
        height: 190
    },
    cardData : {
        flexDirection : "row"
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
    profileContainerLogo: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2b39",
        elevation: 20,
        height : 250,
    },
    profileShadow: {
        flex: 1,
        alignContent: "center",
        backgroundColor : "teal",
        alignItems: "center",
        height: 250,
        width: "100%",
    },
    profile: {
        height: 250,
        width: "100%",
    },
    linearGradientBottom: {
        width:"100%",
        height: 96,
        // marginTop: iHeight - 300,
        // marginBottom:0,
        bottom: 0,
        padding: 15,
        paddingBottom: 5,
        position: "absolute"
    },
    description: {
        fontFamily: "Myriad Pro",
        fontSize: 18.3,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        marginTop : 10
    },
    descriptionM: {
        fontFamily: "Myriad Pro",
        fontSize: 18.3,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        marginTop : 5,
        marginLeft : 8,
        marginBottom : 8
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
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginLeft: 8,
        marginBottom: 6,
      },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginLeft: 0,
        marginRight : 0
      },
    profileName: {
        marginLeft: 8,
        fontSize: 16,
        color : "gray"
      },
})
