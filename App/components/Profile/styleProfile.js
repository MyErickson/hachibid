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
    
   
    },
    
    containerInput:{
        borderRadius:10,
        marginBottom:10,
       
    },
    form:{
        width:300,
        marginTop:marginTop,
        
    },
    button:{
        width:300,
       marginTop:30,
        justifyContent:"center",
        borderRadius:30
    },
    textRegister:{
        alignItems:"center",
        marginTop:marginTop,
     
       
    },
    header:{
        height:50,
        paddingBottom:25,
      
    },
    avatar:{
      
        marginLeft:10
    },
    scrollview:{
        marginHorizontal: 0,
        backgroundColor:'white',
        backgroundColor:null
        
    }
  
    



})