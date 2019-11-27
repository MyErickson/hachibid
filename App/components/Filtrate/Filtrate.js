import React from 'react';
import { View} from 'native-base';
import { Input,Icon} from 'react-native-elements';


const input = React.createRef();


 const Filtrate =(props)=>{


 const { searchBar,deleteTextSearchBar,textFilter, receiveDatafilterMessageMyQuestion} = props


 const clear=()=>{
  input.current.clear();
  receiveDatafilterMessageMyQuestion()
  searchBar(null)
}

    return (
      <View>
        <Input ref={input}
         placeholderTextColor={"#76797C"}
         placeholder='Recherche Questions'
         value={textFilter}
         onChangeText={(text)=> searchBar(text)} 
         rightIcon={
           deleteTextSearchBar &&
         <Icon name="clear" onPress={clear}  /> }
        />
      </View>
    );
  }


export default Filtrate;
