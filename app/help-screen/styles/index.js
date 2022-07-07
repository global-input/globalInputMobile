import {
  StyleSheet
} from 'react-native';

import {commonStyles} from "../../common-styles";

const stylesData ={


  content:{
     display:"flex",
     flexDirection:"column",
     justifyContent:"flex-start",
     paddingBottom:45,
     paddingLeft:5,
     paddingRight:5
  },
  subtitle:{

      display: "flex",
      flexDirection: 'row',
      justifyContent:"flex-end",
      alignItems:"center",
      width:"100%"
  },
  subtitleText:{
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Futura-Medium',
    color:"white"
  },
  subtitleContainer:{
    width:"100%",
    paddingRight:20,
    marginBottom:10
  },
  titlesContainer:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    justifyContent:"center"
  },
  section:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    marginTop:10,
    marginBottom:10
  }

};
export const styles = StyleSheet.create(Object.assign({},commonStyles,stylesData));
