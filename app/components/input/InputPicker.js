import React, { Component,PureComponent } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  Picker
} from 'react-native';
import {styles} from "./styles";
import {images} from "../../configs";
export default class InputPicker extends Component{
      render(){
        var selectedValue=null;
        if(this.props.selectedItem){
          selectedValue=this.props.selectedItem.value;
        }
        if(this.props.items){
          return(
            <View style={styles.selectionFieldContainer}>
                  <Picker style={styles.picker}
                  selectedValue={selectedValue}
                  onValueChange={selected =>{
                          this.props.onValueChange(selected);
                  }}>
                  {this.props.items.map((item, index)=>{
                    var  key=index+"_"+item.value;
                    return(
                          <Picker.Item label={item.label} value={item.value} key={key} />
                    )
                  })}

              </Picker>

            </View>

          );
        }
        else{
          return null;
        }



      }
  }
