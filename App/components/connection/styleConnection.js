import { StyleSheet , Dimensions} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";



const marginTop = 20 ; 
const HEIGHT= Dimensions.get('window').height;
var waveHeight;
var paddingTop;
var top; 


if(HEIGHT > 700 ){
   waveHeight= hp('65%')
   paddingTop=150
   top =hp('18%')
}else {
    
    waveHeight= hp('72%')
    paddingTop=40
    top =hp('8%')
}



export const Style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:"space-between",
        top:top,
        height:waveHeight ,
       
        

    },
    
    containerInput:{
        borderRadius:30,
        margin:10,
        backgroundColor:'white',
       
    },
    form:{
        width:wp('85%'),
        height:hp('60%'),
        marginTop:marginTop,
       
    },
    button:{
        width:wp('83%'),
       marginTop:20,
        justifyContent:"center"
    },
    
    textRegister:{
        alignItems:"center",
        justifyContent:"center",
        paddingTop:paddingTop,
        paddingBottom:40,

    },


    textConnexion:{
        color:'white',
        fontSize:25,
        fontWeight:'bold',
        marginBottom: 10,
    },
  
    wave: {
        minWidth: wp('100%'),
  
    },
   
    



})