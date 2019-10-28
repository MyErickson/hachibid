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
        top:hp('15%'),
       
        
    },
    
    containerInput:{
        borderRadius:30,
        margin:10,
        backgroundColor:'white'
        
    },
    form:{
        width:wp('85%'),
        height:wp('60%'),
        marginTop:marginTop,
        
    },
    button:{
        width:wp('83%'),
       marginTop:20,
        justifyContent:"center"
    },
    
    textRegister:{
        flexDirection:'row',
        alignItems:"center",
        backgroundColor:'white',
        justifyContent:"center",
        paddingTop:60,
        paddingBottom:40
        
      
    },


    textConnexion:{
        color:'white',
        fontSize:25,
        fontWeight:'bold',
        marginBottom: 10,
 
    },
    waveContainer:{
 
        height:hp('70%')
      
    },
    wave: {
        minWidth: wp('100%'),
     
        height:hp('70%')
    },
   
    



})