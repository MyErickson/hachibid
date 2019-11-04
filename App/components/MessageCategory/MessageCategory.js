import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Style } from './styleMessageCategory'
import Filtrate from '../Filtrate/Filtrate'
import Menu from '../Menu/Menu';
import AsyncStorage from '@react-native-community/async-storage';

class MessageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _messages:undefined,
        title:'dere'
        
    };
 
  }


    static async getDerivedStateFromProps(props, state){
    const { params } = props.navigation.state
        props.navigation.closeDrawer()
        state.title = params.nameCategory
        state._messages=  props.dataMessagesCategory
        
  
    }

    searchBar= async (text)=>{
      //   await this.props.sendDatafilterMessageCategory(text)
      //   const _messages = await this.props.dataFilterCategory
      // this.setState({
      //     _messages
      // })
      console.log(text)
   }
   


  render() {
     const { _messages,title }=this.state
   
   
    return (
             
        <View   style={Style.container}>
        <Menu nameMenu={title} navigation={this.props.navigation}/>
      
        <View style={Style.messageContainer}>
        <Filtrate searchBar={this.searchBar} />
              <GiftedChat
                scrollToBottom={true}
                messages={_messages}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={20}
                placeholder="Entrer un message..."
                renderInputToolbar={()=>undefined}
                style={{background:'red'}}  
                keyboardShouldPersistTaps={'never'}
                renderUsernameOnMessage={true}
                user={{
                  _id: 'Id user',
                  
                }}
              />
    
        </View>
       

      </View>
    );
  }
}

export default MessageCategory;
