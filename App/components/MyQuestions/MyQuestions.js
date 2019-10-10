import React, { Component } from 'react';
import { View,  Text,  TouchableOpacity } from 'react-native';
import { Style} from './styleMyQuestions';
import { Icon ,Input } from 'native-base'
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
 import {request, PERMISSIONS} from 'react-native-permissions';

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
    console.log(PERMISSIONS.ANDROID.RECORD_AUDIO)

  const test = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
  console.log(test)
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

  soundRecording =async()=>{
   
 
    
  }


  renderBubble(props) {

    return (
      <View>
        
        <Bubble
          {...props}
        />
      </View>
    );
    
  }

  renderSend(props) {
    return (
     
      <Send {...props} label={<Icon name="paper-plane" />} />

    );
  }
 
  renderInputToolbar(props) {
  
    return(
      <InputToolbar
      containerStyle={{paddingTop:10}}
      
      {...props}
      />
    ); 

  }

  renderActions=(props)=>{
    
      return (
        <TouchableOpacity style={{marginBottom:10,marginLeft:10}}>
        <Icon name="mic"  {...props} onPress={()=>this.soundRecording()}/>
        </TouchableOpacity>
      )

    
 }
  searchBar= async (text)=>{
    //   await this.props.sendDatafilterMessage(text)
    //   const _messages = await this.props.receiveDataFilter
    // this.setState({
    //     _messages
    // })
    console.log(text)
  }



  render() {
   

    return (
    
      <View  style={Style.container}>
        <Menu nameMenu="Mes questions" toggle={this.props.navigation.toggleDrawer}/>
      
        <View style={Style.messageContainer}>
            <Filtrate searchBar={this.searchBar} />
              <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                renderUsernameOnMessage={true}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={60}
                placeholder="Entrer un message..."
                style={{background:'red'}}  
                keyboardShouldPersistTaps={'never'}
                renderBubble={this.renderBubble}
                renderSend={this.renderSend}
                renderInputToolbar={this.renderInputToolbar}
                renderActions={this.renderActions}
              
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