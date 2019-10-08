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
        marginTop:10,
        marginBottom:20,
        height:50,
        width:wp('98%'),

    },
    input:{
        width:wp('90%'),

        
    },
    icon:{
        justifyContent:'center',
        marginTop:15,
        margin:10

    },
    messageContainer:{
        flex:1,
        justifyContent:'flex-end',
    
        borderColor:'black',
        // backgroundColor:'red'

    },
    name:{
        paddingLeft:15,
        color:'gray'
    },


    
 
})