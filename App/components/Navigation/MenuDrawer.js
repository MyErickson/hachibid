import React from 'react';

import { Platform , Dimensions , StyleSheet , View , Text,TouchableOpacity } from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default class MenuDrawer extends React.Component{

    navLink(nav,text){
            return(
                <TouchableOpacity onPress={()=>{}}>
                    <Text style={Styles.link}>{text}</Text>
                </TouchableOpacity>
            )
    }
 render(){
     return(
         <View style={Styles.container}>
             {this.navLink('Home','Home')}
             <Text>menu</Text>
         </View>
     )
 }
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'blue'
    },
    link:{
        flex:1,
        fontSize:20,
        padding:6,
        paddingLeft:14,
        margin:5,
        textAlign:'left'
    }
})
