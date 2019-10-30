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
        paddingTop: 10,

        borderColor:'black',
        // backgroundColor:'red'

    },
    name:{
        paddingLeft:15,
        color:'gray'
    },
    recorder:{
        padding:5,
        backgroundColor:"gray",
        borderRadius:10,
        paddingBottom:10,
        paddingTop:10 ,
     
    },

    Modal:{
        maxHeight:hp('20%'),
        backgroundColor:null,
        top:hp('35%'),
        borderRadius:30,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    recorderPlaySound:{
        padding:5,
        marginRight:20,
        paddingBottom:10,
        paddingTop:10 ,
        flexDirection:'row',
        width:wp("82%"),
        borderRadius:10,
        backgroundColor:'rgba(41,113,232,0.8)'
    },
    iconRecorder:{
     
        margin:5
    },
    iconClose:{
        backgroundColor:'white',
        paddingLeft:7,
        paddingTop:1,
        marginBottom:5,
        marginLeft:35,
        borderRadius:30, 
        height:30,
        width:30
    }
 
})