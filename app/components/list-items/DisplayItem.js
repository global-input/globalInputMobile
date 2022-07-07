import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Button,
  TouchableHighlight,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Slider,

} from 'react-native';





import {styles} from "./styles";




export default class DisplayItem extends Component{

  render(){
         return(
                  <View style={styles.item}>
                           <View style={styles.itemIcon}>

                                 <TouchableHighlight onPress={this.props.onPress}>
                                   <Image source={this.props.image}/>
                                 </TouchableHighlight>

                          </View>
                          <View  style={styles.itemDescription}>
                            <Text>{this.props.description}</Text>
                          </View>
                 </View>
         );
   }
}
