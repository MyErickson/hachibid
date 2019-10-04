import React, { Component } from 'react';
import { View, TouchableOpacity , ScrollView } from 'react-native';
import { Style} from './styleChatHome'
import {  Item , Container, Content , Textarea, Icon} from 'native-base';
import Menu from '../Menu/Menu'

import { GiftedChat , Bubble, Send , InputToolbar } from 'react-native-gifted-chat';

class ChatHome extends Component {
 
    state = {
      message:undefined,
     
    }
  
    async componentDidMount() {
        //  const allMessages =  await this.props.dataMessages
          this.setState({
            messages: [
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
                    text: 'How are you ? ',
                    createdAt: new Date(),
                    user: {
                      _id: 1,
                      name: 'erickson',
                      avatar: 'https://placeimg.com/140/140/any',
                    },
                  },
                {
                    _id: 'Id user',
                    text: 'Hey',
                    createdAt: new Date(),
                    user: {
                        _id: 'Id user',
                      name: 'erickson',
                      avatar: 'https://placeimg.com/140/140/any',
                    },
                  },
              {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: 'erickson',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },

            ],
          })
        }
  writeMessage=(message)=>{
    this.setState({message , show:false}) 
  }

  sendDataMessage=()=>{
   
    const { message,dataMessageCasual } =this.state
    this.setState({dataMessageCasual:[...dataMessageCasual,{
                                        login:'erickson',
                                        message
                                      }], 
                    message: undefined,
                    show:true
                  })
  }

 
  render() {
 
   const { messages } =this.state

    return (
       
        <View   style={Style.container}>
        <Menu nameMenu="Chat Géneral" toggle={this.props.navigation.toggleDrawer}/>
      
        <View style={Style.messageContainer}>
      
              <GiftedChat
                messages={messages}
                onSend={messages => this.onSend(messages)}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={60}
                placeholder="Entrer un message..."
                renderInputToolbar={()=>undefined}
                style={{background:'red'}}  
                keyboardShouldPersistTaps={'never'}
                renderBubble={this.renderBubble}
                renderSend={this.renderSend}
                user={{
                  _id: 'Id user',
                  
                }}
              />
    
        </View>
       

      </View>
    );
  }
}

export default ChatHome;
