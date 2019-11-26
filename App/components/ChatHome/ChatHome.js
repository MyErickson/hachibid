import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text,TouchableOpacity} from 'react-native';
import { Style} from './styleChatHome';
import { Button ,Icon } from 'react-native-elements'
import Menu from '../../containers/Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import { GiftedChat ,Bubble } from 'react-native-gifted-chat';
import axios from 'axios';
import AlertDialog  from '../AlertDialog/AlertDialog'
var jwtDecode = require('jwt-decode');
import NetInfo from "@react-native-community/netinfo";
var timerMessage;
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
      var isInternetReachable 
      var isConnected  

      const { receiveResponseConnection , dataMessagesHome , dataProfileUsers ,answerUser} = this.props
     
      console.log("ASYNCSTORAGE avant le decode ===>",receiveResponseConnection)
  
        var decode = jwtDecode(receiveResponseConnection)
        console.log(decode)
        data.id = decode.id 
        data.token = receiveResponseConnection
        dataProfileUsers( data )
        answerUser(data)
        dataMessagesHome(receiveResponseConnection)
      
        await NetInfo.fetch().then(state => {
          isInternetReachable = state.isInternetReachable
          isConnected  = state.isConnected 
     
        });
        
        timerMessage = setInterval(()=>{
      
          if(isConnected && isInternetReachable){
          
            dataMessagesHome(receiveResponseConnection)
            answerUser(data)
          }
          
        },3000)
     
        this.setState({
          idUser:decode.id
        })
  
        }

    goToMyQuestion= async ()=>{
        this.setState({
      
        filter:undefined
      })
      this.props.navigation.navigate("MyQuestions")
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
     
     
     if(props.allDataMessagesHome){
      state._messages = props.allDataMessagesHome
     }
     if(props.dataFilterHome && state.filter){
      state._messageFilter = props.dataFilterHome
     
     }else{
      state._messageFilter =undefined
     }
 
     
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

     componentWillUnmount(){

      clearInterval(timerMessage)
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
                shouldUpdateMessage={()=>_messages}
                messages={filter?_messageFilter :_messages}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={0}
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
       </View>
       <View style={Style.containerButton} >
        <Button  
        title="Poser une question" 
        buttonStyle={{ borderRadius:20,padding:10}} 
        onPress={this.goToMyQuestion} />
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
