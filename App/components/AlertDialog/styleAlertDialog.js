import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
export const Style = StyleSheet.create({

    succesRegister:{
        color:"green",
        textAlign:'center',
        fontSize:20
    },
    errorRegister:{
        color:"red",
        textAlign:'center',
        fontSize:20
    },
    buttonIos:{
        fontSize:15,
        width:wp("44.9%"),
        paddingVertical: 15,
        backgroundColor:"#0B6ACA"
    },
    containerButtonIos:{
        flexDirection:"row",
        backgroundColor:"#0B53CA"
        
     
    },
    containerButtonAndroid:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:20,
     
    },
    buttonAndroidYes:{
        fontSize:15,
        width:wp("26%"),
        paddingVertical: 6,
        margin:10,
        marginBottom:0,
        marginTop:15,
        backgroundColor:"#0B6ACA",
        borderRadius:30
        
    },
    buttonAndroidNo:{
        fontSize:15,
        width:wp("26%"),
        paddingVertical: 6,
        margin:10,
        marginBottom:0,
        marginTop:15,
        backgroundColor:"gray",
        borderRadius:30
        
    }
       
    


})