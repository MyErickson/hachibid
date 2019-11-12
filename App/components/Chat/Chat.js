import React, { Component } from 'react'
import { View,  Text,  TouchableOpacity , Platform } from 'react-native';
import { GiftedChat , Bubble, Send , InputToolbar} from 'react-native-gifted-chat'
import {Icon } from 'native-base'

import { Style } from './styleChat'


export class Chat extends Component {

    renderBubble(props) {
        const { type ,createdAt , answer , text ,user } = props.currentMessage
        console.log("answer dans le renderbubble",answer)
        var minutes = createdAt.getMinutes() 
        if(createdAt.getMinutes() < 10){
         minutes = `0`+createdAt.getMinutes()
             }
          if(type === "record"){
        
           
            return (
             <View style={Style.recorder}>    
               <Text  onPress={()=>this.toggleModal(props)} style={{margin:5}}>Message vocal, Click pour lecture</Text>
               <Text  style={{fontSize:11, textAlign:"right",marginRight:5}}>{`${createdAt.getHours()}:${minutes}`}</Text>
             
             </View>
            )
          }else{
           if(answer){
             return(
                 <View style={Style.answer}> 
                      <View style={{backgroundColor:"#AEECDD",borderRadius:5}}>
                      <Text  style={{marginLeft:5,marginTop:5,fontWeight:"bold"}}>{answer.name}</Text>   
                      <Text  style={{margin:5}}>{answer.text}</Text>   
                      </View>
                  
                     <Text  style={{margin:5,marginBottom:10,marginTop:10}}>{text}</Text>
                
                   <View style={{flexDirection:"row"}}>
                     <Text  style={{fontSize:11, textAlign:"right",marginLeft:8}}>{`~${user.name}`}</Text>
                     <Text  style={{fontSize:11, textAlign:"right",marginLeft:20}}>{`${createdAt.getHours()}:${minutes}`}</Text>
                   </View>
                 </View>
             )
           }else{
             return (
               
                 <Bubble
                   
                   {...props}
                 
                 />
                );
           }
           
          
          }

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
 
        const { ProfileUser, stop  } = this.state
     if(ProfileUser !== undefined && ProfileUser.roles[0]=== "ROLE_ADMIN"){
      if (stop){
        return (
          <TouchableOpacity style={{marginBottom:10,marginLeft:10}}>
          <Icon name="mic-off"  {...props} onPress={()=>this.onStopRecord()}/>
          </TouchableOpacity>
        )
       }else{
        return (
          <TouchableOpacity style={{marginBottom:10,marginLeft:10}}>
          <Icon name="mic"  {...props} onPress={()=>this.onStartRecord()}/>
          </TouchableOpacity>
        )
       }
     }
        
        
        
     }

    render() {
        return (
          
                <GiftedChat
                    inverted={true}
                    scrollToBottom={true}
                    messages={_messages}
                    shouldUpdateMessage={()=>_messages}
                    onSend={messages => this.onSend(messages)}
                    renderUsernameOnMessage={true}
                    renderAvatar={null}
                    isAnimated= {true}
                    minInputToolbarHeight={60}
                    placeholder="Entrer un message..."
                    style={{background:'red'}}  
                    keyboardShouldPersistTaps={'never'}
                    renderBubble={(props)=>this.renderBubble(props)}
                    renderSend={this.renderSend}
                    renderInputToolbar={this.renderInputToolbar}
                    renderActions={this.renderActions}
                    timeFormat='HH:mm'
                    user={{
                    _id: ProfileUser ? ProfileUser.id : "user",

                  
                }}
              />
            
        )
    }
}

export default Chat
