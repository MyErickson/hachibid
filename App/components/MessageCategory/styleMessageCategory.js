import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";


export const Style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",

    },

  
    messageContainer:{
        flex:1,

        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,

    },
    
    message:{

        paddingTop: 5,
        

     
       
    },
    
 

    
 
})