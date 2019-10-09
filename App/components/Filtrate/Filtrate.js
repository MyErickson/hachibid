import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Input } from 'react-native-elements';

 Filtrate =(props)=>{
 const { searchBar } = props

    return (
      <View>
        <Input placeholder='Recherche'  onChangeText={(text)=> searchBar(text)}/>
      </View>
    );
  }


export default Filtrate;
