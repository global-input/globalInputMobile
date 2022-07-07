import {
  StyleSheet
} from 'react-native';
var styles={
    emptyBigSpace:{
      width:"100%",
      height:500,
      
    },
    emptySpace:{
      width:"100%",
      height:100,

    },
};
styles = StyleSheet.create(styles);
styles.getEmptySpace=function(keyboardshowing){
    if(keyboardshowing){
      return this.emptyBigSpace;
    }
    else{
      return this.emptySpace;
    }
};
export {styles};
