import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const marginTop = 20 ; 

export const Style = StyleSheet.create({
    container:{
      
        maxHeight:250,
        flexDirection:'column',
        padding:13,
        backgroundColor:'white',
        borderRadius:20


    },
    
    containerInput:{
        width:wp("80%"),
        borderRadius:10,
        margin:10,
        
    },
    form:{
        width:wp("90%"),
        marginTop:marginTop
        
    },
    button:{
        width:90,
        marginTop:40,
        margin:10,
        justifyContent:"center",
      
   
    },
  
    textRegister:{
        alignItems:"center",
        marginTop:marginTop,
     
       
    },
    containerButton:{
        flexDirection:'row',
        justifyContent:'flex-end'
   
    },
    text:{
        fontSize:20,
    },

    



})