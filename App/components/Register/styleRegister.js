import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
const marginTop = 20 ; 

export const Style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:"space-between",
        paddingTop:hp('10%'),
      
        
    },

    containerInput:{
        borderRadius:10,
        marginTop:15,
       
        
    },
    form:{
        width:wp('80%'),
        height:hp('55%'),
        marginTop:marginTop,
       
    },
    button:{
        width:wp('80%'),
        justifyContent:"center",
  
    },
    textRegister:{
        textAlign:'left', 
        width:wp('20%'),
        marginTop:10,
        
      

       
    },
    input:{
        color:'white'
    }
  
    



})