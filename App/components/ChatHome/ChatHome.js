import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View} from 'react-native';
import { Style} from './styleChatHome';
import { Button  } from 'react-native-elements'
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import { GiftedChat  } from 'react-native-gifted-chat';

var jwtDecode = require('jwt-decode');

class ChatHome extends Component {
 
    state = {
      _messages:undefined,
    }
  
    async componentDidMount() {
      var data = new Object 
      const sessionId = await AsyncStorage.getItem('sessionJWT')

      // console.log("ASYNCSTORAGE avant le decode ===>",this.props.receiveResponseConnection)
  
        var decode = jwtDecode(this.props.receiveResponseConnection)

        console.log("decode du TOKEN ====>",decode)
         data.id =decode.id 
         data.token = this.props.receiveResponseConnection
        await this.props.dataProfileUsers( data )
      await this.props.dataMessagesHome(this.props.receiveResponseConnection)

 
  
        }

   actualize= async ()=>{
   
        const allMessages =  this.state._messages
        console.log("je suis dans chat home pour alllmessages ",allMessages)
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
     
      state._messages = props.allDataMessagesHome
    }
 






  render() {
 
   const { _messages }=this.state

    return (
       
        <View   style={Style.container}>
        <Menu nameMenu="Chat Géneral" navigation={this.props.navigation}/>
      
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
