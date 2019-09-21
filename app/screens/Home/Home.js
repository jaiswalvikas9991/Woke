import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar
} from "react-native";
import { StackNavigator } from 'react-navigation';

import ProductComponent from "../../components/ProductComponent";
class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerStyle: { backgroundColor: 'black' },
        headerTitleStyle: { color: 'white' },
      };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            news: []
        }
    }
    componentWillMount() {
        this.fetchData();
        this.fetchNews();
    }

    fetchData = async () => {

    }

    fetchNews(){
        // const response =await fetch("http://192.168.0.120:8000/employees/");
        // alert(JSON.stringify(response));
        // const json =await response.json();
        // alert(JSON.stringify(json));
        // var imageUrls = [];
        // var articles = json.data.articles;

        // var articlesState = [];
        // for (var i = 0; i < articles.length; i++) {
        //     var aritcleObj = articles[i];
        //     var media_uri = aritcleObj['media_path'];
        //     aritcleObj['media_uri'] = media_uri;
        //     aritcleObj['media_path'] = 'https://s3.amazonaws.com/fhp-hls-vid/' + media_uri;
        //     aritcleObj['images_path'] = ['https://s3.amazonaws.com//1552227580183-image_2.jpg'];
        //     if (aritcleObj['article_type'] == 'image') {
        //         aritcleObj['video_path'] = '';
        //     }
        //     articlesState.push(aritcleObj);
        // }
        // for (var i=0; i <articles.length; i++){
        // 	var images = articles[i].images_path;
        // 	var imageObj = {};
        // 	var imageArray = [];
        // 	for (var j=0; j < images.length; j++){
        // 		imageObj['url'] = images[j];
        // 		imageArray.push(imageObj);
        // 	}
        // 	articles[i]['images'] = imageArray; 
        // }
        //alert(JSON.stringify(articlesState));
        var products = [
            {
                "id": "1",
                "book_name": "Floods",
                "seller_name": "DAILY SHOP",
                "price": "₹ 250",
                "rating": 4,
                "img_url": "http://i.dawn.com/primary/2015/12/56613b578b5a2.jpg",
                "location": "Kolhapur",
                "description":"The floods have occurred over here , because of the heavy rainfall which was going on for non stop 6 hours. The water level rose from few cms from the ground to 4 feet from the ground in about 20 mins . Lots of houses , farms and roads were completely flooded. We had to evacuate from the area as soon as possible. So I took the suggested route of the WOEK application. Around 50 miles area is affected. And 400 people have been evacuated from the local area."    
            },
            {
                "id": "2",
                "book_name": "Earthquake",
                "seller_name": "BOOK SHOP",
                "price": "₹ 250",
                "rating": 3.5,
                "img_url": "https://images.indianexpress.com/2015/05/nepal6.jpg",
                "location": "Dadar West",
                "description":"At around 3:40 pm a huge shockwave shook the entire road where alot of traffic was there. We could see the cracking of the road and buildings falling like cards. It continued for about 15 mins . Then the after shocks were intermittently hitting the area. Around 150 people were buried under the rubble of fallen building near the given landmark. Because of WOEK APP around 200 people were able to find the safety shelters as per the government."
            },
            {
                "id": "3",
                "book_name": "Old building collapses",
                "seller_name": "DAILY BOOK STORE",
                "price": "₹ 250",
                "rating": 4.5,
                "img_url": "http://static.dnaindia.com/sites/default/files/styles/full/public/2017/09/01/605669-mumbai-collapse.jpg",
                "location": "Mahim East",
                "description":"Near the flyover at the given location , there was an old building made about 50 years ago. The condition of the building was very damaged to begin with. Nearly 20 families lived there. Aorund 5  in the morning everyone heard the huge noice coming from the building in front of our colony. We saw everyone was running here and there. Alot of people were buried under the rubble. And everyone was trying to save there loved ones and contact the rescue team. Beacuse of woek some of the trained disaster management personnel came just after I sent the ping and had a chat about this situation. And they helped around 30 people immediately."
            },
            {
                "id": "4",
                "book_name": "Fire at the college",
                "seller_name": "BOOK STORE",
                "price": "₹ 250",
                "rating": 2,
                "img_url": "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201810/kolkata_hospital_fire.jpeg?rqVo.CcGeS0pH0Yhz9MuOz.aOPYJawAS",
                "location": "Matunga West",
                "description":"At around 2 pm a huge fire broke out from the 3rd floor of the college building in front of my building. Alot of people were being evacuated. But because of the people and the panicking the routes were blocked in such a way that the main way for fire brigade to come was completely blocked. So I sent the update on the woek app and the fire brigade and the affected people were able to clear the route and get to the safe zone. Fortunately no one was harmed."
            },
        ]
        this.setState({ news: products });
        // alert(this.state.news);

    }
    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2b2b39" />
                
                    <ProductComponent navigation={this.props.navigation} data={this.state.news} />
            
            </View>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    }
});