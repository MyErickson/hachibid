import React, { Component } from 'react';
import { View,  Text,  PanResponder } from 'react-native';
import { Style} from './styleChatHome';
import { Icon } from 'native-base'
import Menu from '../Menu/Menu'

import { GiftedChat , Bubble, Send } from 'react-native-gifted-chat'
class ChatHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages:undefined,
    }
    // this._panResponder = PanResponder.create({
    //   // Ask to be the responder:
    //   onStartShouldSetPanResponder: (evt, gestureState) => true,
    //   onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    //   onMoveShouldSetPanResponder: (evt, gestureState) => true,
    //   onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    //   onPanResponderGrant: (evt, gestureState) => {
    //     // The gesture has started. Show visual feedback so the user knows
    //     // what is happening!
    //     // gestureState.d{x,y} will be set to zero now
       
    //   },
    //   onPanResponderMove: (evt, gestureState) => {
    //     // The most recent move distance is gestureState.move{X,Y}
    //     // The accumulated gesture distance since becoming responder is
    //     // gestureState.d{x,y}
    //     setInterval(()=>console.log( gestureState.moveX, gestureState.dy),3000)
    //   },
    //   onPanResponderTerminationRequest: (evt, gestureState) => true,
    //   onPanResponderRelease: (evt, gestureState) => {
    //     // The user has released all touches while this view is the
    //     // responder. This typically means a gesture has succeeded
        
    //   },
    //   onPanResponderTerminate: (evt, gestureState) => {
    //     // Another component has become the responder, so this gesture
    //     // should be cancelled
        
    //   },
    //   onShouldBlockNativeResponder: (evt, gestureState) => {
    //     // Returns whether this component should block native components from becoming the JS
    //     // responder. Returns true by default. Is currently only supported on android.
       
    //     return true;
    //   },
    // });
  
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
      // {...this._panResponder.panHandlers}
      <View   style={Style.container}>
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
