import { StyleSheet} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";


export const Style = StyleSheet.create({
    container:{
        
        minWidth: wp('100%'),
        backgroundColor:"#0259AC"
    },
    icon:{
        color:'white',
    },
    badge:{
   
        position: 'absolute',
         top: -7,
          right: 8 ,
          zIndex:1,
         minWidth:25,
         height:19,
         
         
    }
})