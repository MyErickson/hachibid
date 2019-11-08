import React, {Component} from 'react'
import { View,  Text,  TouchableOpacity , Platform } from 'react-native';
import {Icon } from 'native-base'
import { Style} from './styleMyQuestions';
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import {request, PERMISSIONS} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { GiftedChat , Bubble, Send , InputToolbar} from 'react-native-gifted-chat'
import PlaySound from './PlaySound';
import AsyncStorage from '@react-native-community/async-storage';




var timer;
class MyQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
      _messages:undefined,
      recordDuration:undefined,
      recordTime:undefined,
      currentPositionSec:0,
      currentDurationSec:undefined,
      playTime:undefined,
      duration:undefined,
      stop:false,
      play:false,
      isModalVisible:false,
      propsSounder:undefined,
      ProfileUser:undefined


    };
  
    this.permission = undefined;
    this.writeExternalStorage = undefined ;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.path = undefined
  }
    
    async componentDidMount() {
        const { dataProfileUser, receiveResponseConnection} = this.props
        const data = new Object
        data.token = receiveResponseConnection
        data.id = dataProfileUser && dataProfileUser.data.id
   
          console.log("componentdidmount du dataprofile ===>",dataProfileUser)
           await this.props.receiveDataMessagesMyQuestions(data)
         
       
 
      try{
        const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
        const storage = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        this.permission = granted
        this.writeExternalStorage = storage 
       
      }catch(err){
          console.log("eroor ====== >",err)
      }
    
  
    }
  


     static async getDerivedStateFromProps(props, state){ 
       
            if(props.dataMessagesMyQuestions.length >0){
              console.log("get derived My QUESTION ==>",props.dataMessagesMyQuestions)
                 state._messages = props.dataMessagesMyQuestions
            }
            
             if(props.dataProfileUser ){
              state.ProfileUser = props.dataProfileUser.data
             }
       

     }




    searchBar= async (text)=>{
      //   await this.props.sendDatafilterMessage(text)
      //   const _messages = await this.props.receiveDataFilter
      // this.setState({
      //     _messages
      // })
      console.log(text)
    }


// ******************************* Mehtode GiftedChat *******************************
  async  onSend(messages = []) {
    const { ProfileUser } = this.state
    const {  receiveResponseConnection } = this.props
    const {_id ,
      createdAt ,
      text ,
      user  ,
      recordDuration,
      recordPosition} = messages[0]
    const data = new Object
    data.token = receiveResponseConnection
    data.id = ProfileUser.id
 
     const newMessage = [{
       _id,
       createdAt,
       text,
       user,
       recordDuration,
       recordPosition,
       token: receiveResponseConnection
     }]
  
    this.setState(previousState =>({
      _messages: GiftedChat.append(previousState._messages, newMessage),
    }))

    if(ProfileUser.roleTitle !== "Administrateur" ){
      console.log("je suis pas admin")
      await  this.props.sendMessageUser(newMessage)
      this.setState(previousState =>({
        ...this.state._messages,
        _messages: GiftedChat.append(previousState._messages, newMessage),
      }))
    }
     
  

  }



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


// ******************************* Methode Soundrecorder *******************************



  onStartRecord = async () => {
    const { stop } =this.state
    this.setState({
      stop:!stop
    })
    this.path = Platform.select({
      ios: 'hello.m4a',
      android: `sdcard/Music/${Date.now()}.mp4`
    })
     await this.audioRecorderPlayer.startRecorder(this.path);
   
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      

      this.setState({
        recordDuration: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        
      });
      return;
    });
  
  };
   
  onStopRecord = async () => {
    const { stop } =this.state
    this.setState({
      stop:!stop
    })

    const result = await this.audioRecorderPlayer.stopRecorder(this.path);

    this.audioRecorderPlayer.removeRecordBackListener(this.path);
  
   
    this.setState(previousState=>({
      recordSecs: 0,
      _messages: GiftedChat.append(previousState._messages,  {
        id:Date.now(),
        text: result,
        createdAt: new Date(),
        recordDuration:this.state.recordDuration,
        recordPosition:0,
        type:'record',
        user: {
          _id:this.props.dataProfileUser.data.id,
      
        },
        valid: true
      },),
    }));
    // let formData = new FormData();
    //  formData.append('file',{
    //    uri: result,
    //    name: Date.now(),
    //    type: ".mp4"
    //  })

    //  console.log(formData)

  };


  onStartPlay = async (propsSounder) => {
     const currentPath = propsSounder.currentMessage.text.split('//')
    console.log('onStartPlay',currentPath);
  
    this.setState({
      play:true
    })

    const msg = await this.audioRecorderPlayer.startPlayer(currentPath[1]);
    console.log("msg ==>",msg,this.path);
     timer=setInterval(()=>{
       console.log("dans le timer 2");
       this.setState({
         currentPositionSec: 100 + this.state.currentPositionSec
      })
      if (this.state.currentPositionSec > propsSounder.currentMessage.recordDuration){
         this.onStopPlay(propsSounder)
      }
    },100)


    await this.audioRecorderPlayer.addPlayBackListener(async(e) => {

      if (e.current_position === e.duration) {
         this.audioRecorderPlayer.stopPlayer(currentPath[1]).catch(()=>{});
      }
      return e.current_position;
    });

    
    
  }

 onStopPlay=(propsSounder)=>{
  const currentPath = propsSounder.currentMessage.text.split('//')
  clearInterval(timer)  
   this.setState({
     play:false ,
     currentPositionSec:0
    })
    this.audioRecorderPlayer.stopPlayer(currentPath[1]).catch(()=>{});
 }


  onPausePlay =  (propsSounder,currentPositionSec) => {
  const currentPath = propsSounder.currentMessage.text.split('//')
  clearInterval(timer)  

   this.setState({
     play:false ,
     currentPositionSec:currentPositionSec
    })
  this.audioRecorderPlayer.pausePlayer(currentPath[1]);
  
  };


 // ******************** Modal *******************

 toggleModal=(props)=>{
  clearInterval(timer) 
   const { isModalVisible } = this.state
  this.setState({isModalVisible: !isModalVisible,
                propsSounder:props,
                play:false ,
                currentPositionSec:0
  })
 }





  render() {
     const { ProfileUser,_messages } = this.state
    console.log("le profile data ====",_messages)
    var nameMenu = "";
    if(ProfileUser !== undefined){
      nameMenu = ProfileUser.roleTitle === "Administrateur" ? "Chat Général" :  "Mes questions" 
    }
      
   
    return (
    
      <View  style={Style.container}>
        <Menu nameMenu={nameMenu} navigation={this.props.navigation}/>
       <PlaySound 
        isModalVisible={this.state.isModalVisible}
        toggleModal={this.toggleModal}
        onStartPlay={this.onStartPlay}
        onPausePlay ={this.onPausePlay}
        play={this.state.play}
        propsSounder={this.state.propsSounder}
        duration={this.state.duration}
        currentPositionSec={this.state.currentPositionSec}
       />
        <View style={Style.messageContainer}>
            {/* <Filtrate searchBar={this.searchBar} /> */}
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
    
        </View>
       

      </View>
    );
  }
}

export default MyQuestions;