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
    
    containerInput:{

        flexDirection:'row',
        borderRadius:30,
        marginBottom:10,
        height:50,
        width:wp('100%'),
 
     
        
    },
    input:{
        width:wp('50%'),
    },
    icon:{

    }
 

    
 
})