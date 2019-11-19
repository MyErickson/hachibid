import {StyleSheet ,Dimensions} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

  const HEIGHT= Dimensions.get('window').height;
var menuHeight;

if(HEIGHT > 650 ){
   menuHeight= hp('70%')

}else  {
    
    menuHeight= hp('90%')
 
}

export const Styles = StyleSheet.create({
    container:{
        height:menuHeight,
        borderRadius:20,
        
       
    },
    topLinks:{
        marginTop:20,
        marginLeft:15,
        backgroundColor:"rgba(16,55,121,0.6)",
        height:96,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderColor:"white"
       
    },
    bottomLinks:{

        flex:1,
        marginLeft:15,
        backgroundColor:"rgba(9,55,121,0.6)",
        paddingTop:10,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        
    },
    list:{
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
    },
    link:{
        color:"white",
        fontSize:20,
        padding:6,
        paddingLeft:14,
        margin:5,
        textAlign:'left'
    },
    icons:{
        color:"white",
        padding:6,
        paddingLeft:25,
        margin:5,
    },
    iconList:{
        color:"white",
        padding:6,
        paddingLeft:40,
        fontSize:25,
        margin:4,
    },
    profile:{
        flex:1,

        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'black',
    },
    profileText:{
        paddingBottom:20
    },
    nameText:{
         top:30,
         color:'white',
         fontSize:20 ,
         fontWeight:'bold'
    }
})
