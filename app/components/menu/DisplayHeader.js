import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  StatusBar,
  Image
} from 'react-native';
import {styles,deviceDector} from "./styles";


export default class DisplayHeader extends Component{

    renderTitleIcon(){
        if(this.props.titleIcon){
          return(<Image source={this.props.titleIcon} style={styles.titleIcon}/>);
        }
        else{
          return null;
        }
    }
    render(){
          var headerStyle=styles.header;
          if(deviceDector.isLandscapeMode()){
              headerStyle=styles.headerLandscape;
          }
          if(this.props.title){
                return(
                  <View style={headerStyle}>
                              <View style={styles.centerHeader}>
                                    {this.renderTitleIcon()}
                                    <Text style={styles.titleText}  allowFontScaling={false}>{this.props.title}</Text>
                              </View>
                  </View>
                );
          }
          else{
            return(
                      <View style={headerStyle} onLayout={this.layoutChanged.bind(this)}>
                              {this.props.children}
                      </View>
             );
          }
    }
    layoutChanged(event){
      if(event && event.nativeEvent && event.nativeEvent.layout){
             this.forceUpdate();
      }


    }
}
