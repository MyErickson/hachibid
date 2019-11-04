import React from 'react';
import { View} from 'native-base';
import { Input,Icon} from 'react-native-elements';


const input = React.createRef();


 Filtrate =(props)=>{


 const { searchBar,deleteTextSearchBar,textFilter} = props


 const clear=()=>{
  input.current.clear();
  searchBar(null)
}
 console.log("je suis dans filtrate",textFilter)
    return (
      <View>
        <Input ref={input}
         placeholder='Recherche'
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
