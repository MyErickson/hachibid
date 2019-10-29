import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Input,Icon} from 'react-native-elements';

 Filtrate =(props)=>{
 const { searchBar,clear ,ref} = props

    return (
      <View>
        <Input ref={ref} placeholder='Recherche'  onChangeText={(text)=> searchBar(text)} rightIcon={<Icon name="clear" onPress={clear} />} />
      </View>
    );
  }


export default Filtrate;
