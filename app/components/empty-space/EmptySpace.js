import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {styles} from "./styles";
export default class EmptySpace extends Component{
  constructor(props){
      super(props);
      this.state={keyboardshowing:null};
  }
  componentWillMount () {
          this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
          this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
   }
   componentWillUnmount () {
         if(this.keyboardDidShowListener){
             this.keyboardDidShowListener.remove();
             this.keyboardDidShowListener=null;
         }
         if(this.keyboardDidHideListener){
           this.keyboardDidHideListener.remove();
           this.keyboardDidHideListener=null;
         }
   }
   _keyboardDidShow(event){
         var keyboardshowing={
           height:event.endCoordinates.height
         }
         this.setState({keyboardshowing});
   }
   _keyboardDidHide(){
         this.setState({keyboardshowing:null});
   }

    render(){
        return(
              <View style={styles.getEmptySpace(this.state.keyboardshowing)}>
                
              </View>
        );
    }

}
