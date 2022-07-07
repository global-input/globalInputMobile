import React, { Component } from 'react';
import {
  View,
  Clipboard
} from 'react-native';

import IconButton from "./IconButton";

import NotificationText from "../display-text/NotificationText";
import {styles} from "./styles";
import {menusConfig,deviceInputTextConfig} from "../../configs";

export default class ClipboardCopyButton extends Component {
    constructor(props){
        super(props);
        this.state={notificationMessage:null};
    }
    componentWillUnmount(){
        if(this.clipboardTimerHandler){
          clearTimeout(this.clipboardTimerHandler);
          this.clipboardTimerHandler=null;
        }
    }
    displayNotificationMessage(notificationMessage){
           this.setState(Object.assign({},
                this.state,{notificationMessage}),
                    ()=>{
                        this.clipboardTimerHandler=setTimeout(()=>{
                              this.setState(Object.assign({},this.state,{notificationMessage:null}));
                        },2000);
                    });
    }
    exportToClipboard(){
      var content=this.props.content;
      if(!content){
            this.displayNotificationMessage(deviceInputTextConfig.clipboardCopyButton.emptyClipboard);
            return
      }
      if(this.props.convert){
        try{
              content=this.props.convert(content);
              if(!content){
                  this.displayNotificationMessage(deviceInputTextConfig.clipboardCopyButton.errorConvert);
                  return;
              }
          }
        catch(error){
            console.log(error);
            this.displayNotificationMessage(deviceInputTextConfig.clipboardCopyButton.errorConvert+":"+error);
            return;
        }
      }
      Clipboard.setString(content);
      this.displayNotificationMessage(deviceInputTextConfig.clipboardCopyButton.notification);
    }
    renderNotificationMessage(){
      if(this.state.notificationMessage){
        var labelStyle="";
        if(this.props.white){
          labelStyle="light"
        }
        return (<NotificationText message={this.state.notificationMessage} labelStyle={labelStyle}/>)
      }
      else{
        return null;
      }
    }
    render(){
      var image=menusConfig.clipboardCopyButton.menu.image;
      var labelStyle=null;
      if(this.props.white){
        image=menusConfig.clipboardCopy.menu.image;
        labelStyle="light";
      }
      return(
          <View style={styles.clipboardButtonContainer}>
                {this.renderNotificationMessage()}
              <IconButton image={image}
                labelStyle={labelStyle}
                label={menusConfig.clipboardCopy.menu.label}
                onPress={()=>{
                   this.exportToClipboard();
                }}/>
          </View>
        );
    }


}
