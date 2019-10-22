import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View} from 'react-native';
import { Style} from './styleChatHome';
import { Button  } from 'react-native-elements'
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import { GiftedChat  } from 'react-native-gifted-chat';
import {message} from '../../data/dataCasual'
var jwtDecode = require('jwt-decode');

class ChatHome extends Component {
 
    state = {
      _messages:undefined,
    }
  
    async componentDidMount() {
      const { dataMessages , dataMessagesHome,receiveResponseConnection} = this.props
         await this.props.dataMessagesHome()
        const allMessages = this.props.allDataMessagesHome
        console.log('tejjjjjjjjjst',allMessages)
        const t  = receiveResponseConnection
         const sessionId = await AsyncStorage.getItem('sessionJWT')
         var decode = jwtDecode(sessionId)
          console.log(decode)
       
          this.setState({
            _messages: message,
          })

  
        }

   actualize= async ()=>{
   
        const allMessages =  await this.props.dataMessages
        this.setState({
          _messages:allMessages
        })
      }
 searchBar= async (text)=>{
    //   await this.props.sendDataFilterHomeMessage(text)
    //   const _messages = await this.props.dataFilterHome
    // this.setState({
    //     _messages
    // })
    console.log(text)
 }
 
 static  getDerivedStateFromProps(props,state){
  // console.log('test',props.allDataMessagesHome)
 }
 
  render() {
 
   const { _messages }=this.state

    return (
       
        <View   style={Style.container}>
        <Menu nameMenu="Chat Géneral" toggle={this.props.navigation.toggleDrawer}/>
      
        <View style={Style.messageContainer}>
          <Filtrate searchBar={this.searchBar} />
              <GiftedChat
                messages={_messages}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={20}
                placeholder="Entrer un message..."
                renderInputToolbar={()=>undefined}
                renderUsernameOnMessage={true}
                keyboardShouldPersistTaps={'never'}
                user={{
                  _id: 'Id user',
                  
                }}
              />
             <Button rounded info 
                        containerStyle={Style.button}
                        buttonStyle={{borderRadius:10,height:45,backgroundColor:'rgba(41,113,232,0.8)'}}
                        onPress= {this.actualize}
                        title= 'Actualiser'
              />
        </View>
       

      </View>
    );
  }
}

export default ChatHome;
