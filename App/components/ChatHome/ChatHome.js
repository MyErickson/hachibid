import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Input, Form , Item ,Icon} from 'native-base';
import { Style} from './styleChatHome'



class ChatHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={Style.container}>
        <View style={{flex:1, backgroundColor:'blue'}}></View>
        <View  style={Style.containerInput}>

        <Item>
        <TextInput 
        style={Style.input} 
        name="login"
     
        multiline
        maxLength={255}
      
        />
  </Item>
      <View>
      <Icon  name="paper-plane" />
      </View>
      
         
  
        </View >      
       
     
      </View>
    );
  }
}

export default ChatHome;
