import React, { Component } from 'react';
import { View,  Text,  PanResponder } from 'react-native';
import { Style} from './styleMyQuestions';
import { Icon ,Input } from 'native-base'
import Menu from '../Menu/Menu'

import { GiftedChat , Bubble, Send , InputToolbar } from 'react-native-gifted-chat'
class MyQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages:undefined,
    }
  
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
     

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
        // await this.props.sendMessageUser(messages)
        // const allMessages =  await this.props.dataMessages
    // this.setState(previousState => ({
    //       messages: allMessages ,
    //     }))
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
      <Send {...props} label={<Icon  name="paper-plane" />} />
    );
}
 
renderInputToolbar(props) {

  return(
    <InputToolbar
    {...props}
    />
  ); 

}

  render() {
     

    return (
    
      <View   style={Style.container}>
        <Menu nameMenu="Mes questions" toggle={this.props.navigation.toggleDrawer}/>
      
        <View style={Style.messageContainer}>
      
              <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={60}
                placeholder="Entrer un message..."
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

export default MyQuestions;
