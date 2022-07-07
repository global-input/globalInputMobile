import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {styles} from "./styles";

export default class FloatingIcon extends Component{


  renderLabel(){
      if(this.props.label){
          return (<Text>{this.props.label}</Text>);
      }
      else{
        return null;
      }
  }
  renderImage(){
    if(this.props.image){         
        return(<Image source={this.props.image}/>);
    }
  }
  render(){
    return (
        <TouchableHighlight onPress={this.props.onPress} style={styles.floatingIcon}>
          <View style={styles.iconcontainer}>
              {this.renderImage()}
              {this.renderLabel()}
          </View>
        </TouchableHighlight>
      );
    }

}
