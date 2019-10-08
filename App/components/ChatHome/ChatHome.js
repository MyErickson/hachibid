import React, { Component } from 'react';
import { View } from 'react-native';
import { Style} from './styleChatHome';
import { Button  } from 'react-native-elements'
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import { GiftedChat  } from 'react-native-gifted-chat';
import {message} from '../../data/dataCasual'
class ChatHome extends Component {
 
    state = {
      _messages:undefined,
    }
  
    async componentDidMount() {
        //  const allMessages =  await this.props.dataMessages
   
          this.setState({
            _messages: message,
          })

  
        }

   actualize= async ()=>{
        console.log('data')
        const allMessages =  await this.props.dataMessages
        this.setState({
          _messages:allMessages
        })
      }
 searchBar= async (text)=>{
    //   await this.props.sendDatafilterMessage(text)
    //   const _messages = await this.props.receiveDataFilter
    // this.setState({
    //     _messages
    // })
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
                minInputToolbarHeight={60}
                placeholder="Entrer un message..."
                renderInputToolbar={()=>undefined}
                style={{background:'red'}}  
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
