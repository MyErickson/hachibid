import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Style } from './styleMessageCategory'
import Filtrate from '../Filtrate/Filtrate'
import Menu from '../Menu/Menu';


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
    const { params } = props.navigation.state
    console.log(params)
    // await this.props.receiveDataMessagesCategory(params.nameCategory)
    // const allMessages =  await this.props.dataMessagesCategory
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
     const {navigation} = this.props.navigation.state.params
   
    return (
             
        <View   style={Style.container}>
        <Menu nameMenu={title} toggle={navigation.toggleDrawer}/>
      
        <View style={Style.messageContainer}>
        <Filtrate searchBar={this.searchBar} />
              <GiftedChat
                messages={_messages}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={20}
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
