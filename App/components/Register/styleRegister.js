import { StyleSheet,Platform } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
const marginTop = 20 ; 
console.log("le platform est ",Platform)
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
        marginBottom:marginTop,
  
    },
    textRegister:{
        textAlign:'left', 
        width:wp('20%'),
        marginTop:Platform.OS ==="ios" ?hp("5%"):10,
       
    },
    input:{
        color:'white'
    },
    succesRegister:{
        color:"green",
        textAlign:'center',
        fontSize:20
    },
    errorRegister:{
        color:"red",textAlign:'center'

    },
 
   
    



})