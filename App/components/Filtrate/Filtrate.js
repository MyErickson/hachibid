import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Input,Icon} from 'react-native-elements';


const input = React.createRef();


 Filtrate =(props)=>{


 const { searchBar} = props


 const clear=()=>{
  input.current.clear();
}

    return (
      <View>
        <Input ref={input} placeholder='Recherche'  onChangeText={(text)=> searchBar(text)} rightIcon={<Text style ={{color:"grey",fontSize:13}} onPress={clear} >effacer</Text>} />
      </View>
    );
  }


export default Filtrate;
