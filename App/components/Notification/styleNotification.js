import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
  
  } from "react-native-responsive-screen";
const marginTop = 20 ; 

export const Style = StyleSheet.create({

    scrollview:{
        marginHorizontal: 0,
        backgroundColor:'white',
        backgroundColor:null
        
    },
    titleQ:{
        borderColor:"black",
        paddingRight:5,
        paddingLeft:5,
        backgroundColor:"#D7DCE1",
        justifyContent:'center'
    },
    title:{
        backgroundColor:"white",
        padding:5,
        borderRadius:5
    },
    containerTitle:{
        flexDirection:"row",
        marginLeft:0,
        paddingLeft:0,
        backgroundColor:"white",
        borderRadius:5
    },
    button:{
        justifyContent:"center",
        borderRadius:20,
        height:30,
        paddingTop:0
    }


  
    



})