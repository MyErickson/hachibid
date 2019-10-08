import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Menu from '../Menu/Menu';
import { GiftedChat } from 'react-native-gifted-chat';
import { Style } from './styleMessageCategory'

class MessageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _messages:undefined,
        title:'dere'
        
    };
    //  this.title='ikol'
  }


    static async getDerivedStateFromProps(props, state){
    const {params } = props.navigation.state
    //  const allMessages =  await this.props.dataMessages
        props.navigation.closeDrawer()
        state.title = params.nameCategory
        state._messages=  [
            {
                _id: 'Id user',
                text: 'Fine ! and you ? ',
                createdAt: new Date(),
                user: {
                    _id: 'Id user',
                  name: 'erickson',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },
            {
                _id: 1,
                text: 'How are you,god ? ',
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: 'erickson',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },
            {
                _id: 'Id users',
                text: 'Hey',
                createdAt: new Date(),
                user: {
                    _id: 'Id user',
                  name: 'erickson',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },
          {
            _id: 2,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'erickson',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },

        ]
        
      
  
    }

  render() {
     const { _messages,title }=this.state
     const {navigation} = this.props.navigation.state.params
   
    return (
             
        <View   style={Style.container}>
        <Menu nameMenu={title} toggle={navigation.toggleDrawer}/>
      
        <View style={Style.messageContainer}>
      
              <GiftedChat
                messages={_messages}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={60}
                placeholder="Entrer un message..."
                renderInputToolbar={()=>undefined}
                style={{background:'red'}}  
                keyboardShouldPersistTaps={'never'}
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
