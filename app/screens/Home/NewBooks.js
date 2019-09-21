// import React, {Component} from 'react';
// import { Platform, StyleSheet, Text, View, Image, ScrollView, Dimensions,Button,ImageBackground,TouchableHighlight } from "react-native";

// class NewBooks extends Component {
//     render() {
      
//       return (
//         <View style={styles.container}>
//           <Text style={styles.headerText}>BOOK STORE</Text>
//           <View style={{height: 280}} >
//           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/2.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color='teal'/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//             </ImageBackground>
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/1.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/3.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
            
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/4.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
            
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/5.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
            
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/6.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
            
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/7.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
            
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/8.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
            
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/9.jpg")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
          
  
//             <ImageBackground blurRadius={0.4}
//               style={styles.newBookStyle}
//               source={require("./images/10.png")}>
//               <View style={styles.BUYStyle}>
//               <Button title="BUY" color="teal"/>
//               </View>
//               <Text style={styles.BUYText}>Book Name</Text>
//               </ImageBackground>
            
//           </ScrollView>
//           </View>
//         </View>
//       );
//     }
//   }

// export default NewBooks;

// let dimensions = Dimensions.get("window");
// let imageHeight = Math.round((dimensions.width * 9) / 16);
// let imageWidth = dimensions.width-40;
      
// const styles = StyleSheet.create({
//   newBookStyle : {
//     height: imageHeight, 
//     width:imageWidth,
//     margin:10
//   },
//   BUYText : {
//     fontSize : 20,
//     marginLeft : 10,
//     color : "white"
//   },
//   BUYStyle : {
//     width : 80,
//     margin : 10,
//     marginTop : 140,
//     borderWidth : 1,
//     borderColor : "white",
//     shadowOpacity : 1
//   },
//   container: {
//     backgroundColor: "white",
//     height : 285
//   },
//   headerText: {
//     fontSize: 20,
//     textAlign: "center",
//     fontWeight: "bold",
//     padding : 10,
//     color:"white",
//     backgroundColor:"teal"
//   },
//   btnStyle : {
//     width : 20,
//     backgroundColor : "teal"
//   }
// });