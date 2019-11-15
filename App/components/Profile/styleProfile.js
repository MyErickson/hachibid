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
        width:wp("85%"),
        marginTop:40,
        marginLeft:wp("2%"),
        
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
    scrollview:{
        marginHorizontal: 0,
        backgroundColor:'white',
        backgroundColor:null,
    },
    info:
    {
        padding:35 ,
        borderColor:"black",
        borderRadius:10,
    
     
    },
    cardInfo:{
        marginTop:20,
        shadowColor: "#000",
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 10,
  
}



})