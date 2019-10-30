import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View} from 'react-native';
import { Style} from './styleChatHome';
import { Button ,Icon } from 'react-native-elements'
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import { GiftedChat  } from 'react-native-gifted-chat';

var jwtDecode = require('jwt-decode');

class ChatHome extends Component {
 
    state = {
      _messages:undefined,
      _messageFilter:undefined,
      filter:undefined
    }
  
    async componentDidMount() {
       let data = new Object 
       const sessionId = await AsyncStorage.getItem('sessionJWT')

      // console.log("ASYNCSTORAGE avant le decode ===>",this.props.receiveResponseConnection)
  
        var decode = jwtDecode(this.props.receiveResponseConnection)
        data.id =decode.id 
        data.token = this.props.receiveResponseConnection
        await this.props.dataProfileUsers( data )
        await this.props.dataMessagesHome(this.props.receiveResponseConnection)

 
  
        }

   actualize= async ()=>{
    // await this.props.dataMessagesHome(this.props.receiveResponseConnection)
        const allMessages =  this.state._messages
        console.log("je suis dans chat home pour alllmessages ",allMessages)
        this.setState({
          _messages:allMessages,
          filter:undefined
        })
    }


    searchBar = async (text)=>{
        //   
        //   const _messages = await this.props.dataFilterHome
        // this.setState({
        //     _messages
        // })
        console.log(text)
        if(text.length > 2 ){
          let data = new Object
          data.text = text
          data.token = this.props.receiveResponseConnection
          await this.props.sendDataFilterHomeMessage(data)
          this.setState({ filter:true})    
        }else{
          this.setState({ filter:undefined})     
          }
    }
    
  

    static  getDerivedStateFromProps(props,state){
     console.log("je suis dans get derived ", props.dataFilterHome)
     if(props.dataFilterHome && state.filter){
      state._messageFilter = props.dataFilterHome
     
     }else{
      state._messageFilter =undefined
     }
     state._messages = props.allDataMessagesHome
     
    }
 






  render() {
 
   const { _messages,_messageFilter,filter }=this.state
     console.log("je suis dans le chathome",_messageFilter)
    return (
       
        <View   style={Style.container}>
        <Menu nameMenu="Chat Géneral" navigation={this.props.navigation}/>
      
        <View style={Style.messageContainer}>
          <Filtrate  searchBar={this.searchBar} />
              <GiftedChat
                scrollToBottom={true}
                messages={filter?_messageFilter :_messages}
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
             <View style={Style.containerIcon } >
               <Icon containerStyle={{width:40}} onPress={this.actualize} name="refresh" />
              </View>
        </View>
      
     
      </View>
    );
  }
}

export default ChatHome;
