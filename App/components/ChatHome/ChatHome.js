import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text,TouchableOpacity} from 'react-native';
import { Style} from './styleChatHome';
import { Button ,Icon } from 'react-native-elements'
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import { GiftedChat ,Bubble } from 'react-native-gifted-chat';
import axios from 'axios';
import AlertDialog  from '../AlertDialog/AlertDialog'
var jwtDecode = require('jwt-decode');


class ChatHome extends Component {
 
    state = {
      _messages:undefined,
      _messageFilter:undefined,
      filter:undefined,
      deleteTextSearchBar:undefined,
      _textFilter:undefined,
      idUser:undefined,
      alertVisible:false,
      alertText :undefined,
      alertConfirm:undefined,
      style:undefined,
      currentMessageForPrecision:undefined
    }
  
    async componentDidMount() {
       let data = new Object 
       const sessionId = await AsyncStorage.getItem('sessionJWT')

      console.log("ASYNCSTORAGE avant le decode ===>",this.props.receiveResponseConnection)
  
        var decode = jwtDecode(this.props.receiveResponseConnection)
        console.log(decode)
        data.id = decode.id 
        data.token = this.props.receiveResponseConnection
        await this.props.dataProfileUsers( data )
        await this.props.dataMessagesHome(this.props.receiveResponseConnection)
      
     
        this.setState({
          idUser:decode.id
        })
  
        }

   actualize= async ()=>{
        this.setState({
      
        filter:undefined
      })
    await this.props.receiveMessagesHome()
     await this.props.dataMessagesHome(this.props.receiveResponseConnection)
        // const allMessages =  this.state._messages
        // console.log("je suis dans chat home pour alllmessages ",allMessages)
      
    }


    searchBar = async (text)=>{
        
        const _textFilter = text
        this.setState({
            _textFilter 
        })

        if(text && text.length > 2 ){
          let data = new Object
          data.text = text
          data.token = this.props.receiveResponseConnection
          await this.props.sendDataFilterHomeMessage(data)
          this.setState({
             filter:true,
             deleteTextSearchBar:true,
          })    
        }else if (text){
          this.setState({ deleteTextSearchBar:true})     
        }else{
            this.setState({
              filter:false,
              deleteTextSearchBar:false
            
           }) 
          }
    }
    
  

    static  getDerivedStateFromProps(props,state){
     
     if(props.dataFilterHome && state.filter){
      state._messageFilter = props.dataFilterHome
     
     }else{
      state._messageFilter =undefined
     }
     state._messages = props.allDataMessagesHome
     
    }
 


    renderBubble(props) {
      const { type ,createdAt , question , text ,user } = props.currentMessage
   
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
         if(question){
           return(
               <View style={Style.answer}> 
                    <View style={{backgroundColor:"#AEECDD",borderRadius:5}}>
                    <Text  style={{marginLeft:5,marginTop:5,fontWeight:"bold"}}>{question.name}</Text>   
                    <Text  style={{margin:5}}>{question.text}</Text>   
                    </View>
                
                   <Text  style={{margin:5,marginBottom:10,marginTop:10}}>{text}</Text>
              
                 <View style={{flexDirection:"row"}}>
                 <Text  style={{fontSize:11, textAlign:"right",marginLeft:8,marginTop:3}}>{`~${user.name}`}</Text>
                <Text  style={{fontSize:11, textAlign:"right",marginLeft:20,marginTop:3}}>{`${createdAt.getHours()}:${minutes}`}</Text>
                   <TouchableOpacity
                     onPress={()=>this.alertPrecision(props.currentMessage)}
                     style={{flexDirection:"row"}}
                   >
                    <Text  style={{fontSize:11, marginLeft:50,color:"green",fontWeight:"bold",marginTop:3}}>plus de précision</Text>
                    <Text style={{fontSize:15, color:"green",fontWeight:"bold",marginRight:20}}> + </Text>
            
                   </TouchableOpacity>
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

  alertPrecision = (currentMessageForPrecision)=>{
    this.setState({
      alertVisible:true,
      alertText:"êtes vous sur de vouloir faire une demande de plus de précision ?",
      alertConfirm:true,
      style:false,
      currentMessageForPrecision
    })
  }

  closeAlert=()=>{
    this.setState({
      alertVisible:false,
      currentMessageForPrecision:undefined

    })
  }
  sendPrecision=()=>{
    const { currentMessageForPrecision } = this.state
  
    
    let data = new Object;

    data.content = currentMessageForPrecision.text
    data.message = currentMessageForPrecision.idMessage
    data.userQuestion = currentMessageForPrecision.question.idUser
    data.token = this.props.receiveResponseConnection

    this.props.askPrecision(data)
    this.setState({
      alertText:"Une demande de precision à bien été envoyé",
      alertConfirm:false,
      style:true,
      currentMessageForPrecision:undefined

    })
  }

  render() {
 
   const { _messages,
    _messageFilter,
    filter,
    deleteTextSearchBar,
    _textFilter,
    idUser ,
    alertVisible,alertText,alertConfirm ,style}=this.state
  
    return (
       
        <View   style={Style.container}>
        <Menu nameMenu="Chat Géneral" navigation={this.props.navigation} />
      
        <View style={Style.messageContainer}>
          <Filtrate  searchBar={this.searchBar} textFilter={_textFilter} deleteTextSearchBar={deleteTextSearchBar} />
              <GiftedChat
                scrollToBottom={true}
                messages={filter?_messageFilter :_messages}
                renderAvatar={null}
                isAnimated= {false}
                minInputToolbarHeight={1}
                placeholder="Entrer un message..."
                renderInputToolbar={()=>undefined}
                renderUsernameOnMessage={true}
                keyboardShouldPersistTaps={'never'}
                renderBubble={(props)=>this.renderBubble(props)}
                timeFormat='HH:mm'
                user={{
                  _id: idUser,
                  
                }}
              />
             <View style={Style.containerIcon } >
               <Icon containerStyle={{width:40}} onPress={this.actualize} name="refresh" />
              </View>
        </View>
        <AlertDialog 
          alertVisible={alertVisible}
          messageAlert={alertText}
          closeAlert={this.closeAlert}
          alertConfirm={alertConfirm}
          yesConfirm={this.sendPrecision}
          style={style}
                 />
     
      </View>
    );
  }
}

export default ChatHome;
