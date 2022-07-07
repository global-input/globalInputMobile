import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  TouchableHighlight,
  Alert,
  Switch,
  ActivityIndicator
} from 'react-native';

import {styles} from './styles';


export default class CancelButton extends Component {
    render(){
          if(this.props.onCancel){
            return (
                    <TouchableHighlight onPress={this.props.onCancel}>
                      <View style={styles.button}>
                          <Text style={styles.buttonText}>Cancel</Text>
                      </View>
                    </TouchableHighlight>
           );
          }
          else{
            return null;
          }




    }
  }
