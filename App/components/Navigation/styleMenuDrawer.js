import {StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";


export const Styles = StyleSheet.create({
    container:{
        flex:1,
      
    },
    topLinks:{
        height:160,
       
    },
    bottomLinks:{
       flex:1,
        backgroundColor:'white',
        paddingTop:10,
        height:hp('100%'),
    },
    link:{
        
        fontSize:20,
        padding:6,
        paddingLeft:14,
        margin:5,
        textAlign:'left'
    },
    icons:{
    
        padding:6,
        paddingLeft:25,
        margin:5,
    },
    iconList:{
        padding:6,
        paddingLeft:60,
        fontSize:25,
        margin:4,
    },
    profile:{
        flex:1,

        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#777777',
    },
    imgView:{
        flex:1,
        justifyContent:'center'
    },
    img:{
        height:95,
        width:95,
        borderRadius:50
    },
    profileText:{
        paddingBottom:20
    },
    nameText:{
        color:'white',
        fontSize:20 ,
         fontWeight:'bold'
    }
})
