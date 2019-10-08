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
        paddingLeft:wp('5%'),
        flex:1
    },
    ocean:{
        height: '30%',
        width:'100%',
        position:'absolute',
        bottom:0,
        left:0,
        backgroundColor: 'white', 
        
    },
    wave:{
        position: 'absolute',
        top: 10,
        width: 'auto',
        height: 'auto',
        
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
        width: wp('100%'),
     
        height:hp('70%')
    },
   
    



})