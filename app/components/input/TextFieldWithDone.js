import React, { Component } from 'react';
import { View,  Keyboard } from 'react-native';


import {styles} from "./styles";



import {images} from "../../configs";
import IconButton from "../buttons/IconButton";
import TextInputField from "./TextInputField";


export default class TextFieldWithDone extends Component{

      focus(){
          if(this.textField){
              this.textField.focus();
          }
      }
      onBlur(){
          if(this.props.onBlur){
            this.props.onBlur();
          }

      }
      onFocus(){
          if(this.props.onFocus){
            this.props.onFocus();
          }
      }
      donePress(){
          Keyboard.dismiss();
      }
      renderFocusedContent(){
                if(this.props.focusedContent){
                      return this.props.focusedContent;
                }
                else{
                        var  imageURL=images.doneIcon;
                        if(this.props.dark){
                          imageURL=images.doneIconDark;
                        }
                        return(
                         <View style={styles.icon}>
                                <IconButton image={imageURL} onPress={this.donePress.bind(this)}/>
                         </View>
                        );
                }
      }


      render(){

          return(
              <TextInputField multiline={this.props.multiline}
                secureTextEntry={this.props.secureTextEntry}
                editable={this.props.editable}
                value={this.props.value}
                numberOfLines={this.props.numberOfLines}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                ref={(textField)=>{this.textField=textField}}
                onChangeTextValue={this.props.onChangeTextValue}
                autoCapitalize={this.props.autoCapitalize}
                placeholder={this.props.placeholder}
                notFocusedContent={this.props.notFocusedContent}
                focusedContent={this.renderFocusedContent()}
                labelIcon={this.props.labelIcon}/>
          );

      }
}
