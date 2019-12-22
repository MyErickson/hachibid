import React from 'react'
import {  View ,ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ConnectionContainer from '../../containers/Connection/Connection';
import { Style } from './styleWelcome'

 const Welcome=({
     navigation
 })=>{
    const storageConnection = AsyncStorage.getItem('sessionJWT').then(res=>{
        return res
    })
    console.log("TCL: storageConnection", storageConnection)
    
    
if(storageConnection){
       
        storage = true
      
    }

    return (
       
        <View style={{flex:1}}>
        {storage ? 
           <ConnectionContainer navigation={navigation}/>
            : 
         <View style={[ {
            flex: 1,
            justifyContent: 'center'
          }, Style.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        }
        </View>
    )
 }  

export default Welcome
