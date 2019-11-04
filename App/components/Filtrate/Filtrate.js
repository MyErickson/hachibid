import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Input,Icon} from 'react-native-elements';


const input = React.createRef();


 Filtrate =(props)=>{


 const { searchBar,deleteTextSearchBar} = props


 const clear=()=>{
  input.current.clear();
  searchBar(null)
}

    return (
      <View>
        <Input ref={input}
         placeholder='Recherche'
         onChangeText={(text)=> searchBar(text)} 
         rightIcon={
           deleteTextSearchBar &&
        //  <Text 
        //  style ={{color:"grey",fontSize:13}} 
        //  onPress={clear} >
        //    effacer
        //  </Text>} 
         <Icon name="clear" onPress={clear}  /> }
        />
      </View>
    );
  }


export default Filtrate;
