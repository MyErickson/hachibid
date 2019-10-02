import React, { Component } from 'react';
import { View,  Text} from 'react-native';
import { Style} from './styleChatHome';
import { Icon } from 'native-base'
import Menu from '../Menu/Menu'

import { GiftedChat , Bubble, Send } from 'react-native-gifted-chat'
class ChatHome extends Component {
 
    state = {
      messages:undefined,
    }
  
    async componentDidMount() {
    //  const allMessages =  await this.props.dataMessages
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'erickson',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ],
      })
    }
 

  async onSend(messages = []) {
 
    // await this.props.sendMessageUser(messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {

    return (
      <View>
        <Text style={Style.name}>{props.currentMessage.user.name}</Text>
        <Bubble
          {...props}
        />
      </View>
    );
    
  }

  renderSend(props) {
    return (
      <Send {...props}  label={<Icon  name="paper-plane" />} />
    );
}
 
  render() {
     

    return (
      <View style={Style.container}>
        <Menu nameMenu="Chat Général" toggle={this.props.navigation.toggleDrawer}/>
      
        <View style={Style.messageContainer}>
      
              <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                renderAvatar={null}
                isAnimated
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
