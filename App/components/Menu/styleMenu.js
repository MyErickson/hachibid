import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

export const Style = StyleSheet.create({
    container:{
        width: wp('100%')
    },
    icon:{
        color:'white',
    }
})