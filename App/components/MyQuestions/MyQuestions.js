import React, {Component} from 'react'
import { View,  Text,  TouchableOpacity , Platform } from 'react-native';
import {Icon } from 'native-base'
import { Style} from './styleMyQuestions';

import Menu from '../../containers/Menu/Menu'
import FiltrateContainer from '../../containers/Filtrate/Filtrate'
import {request, PERMISSIONS} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { GiftedChat , Bubble, Send , InputToolbar} from 'react-native-gifted-chat'
import PlaySound from './PlaySound/PlaySound';
import AsyncStorage from '@react-native-community/async-storage';
import ViewBubble from './ViewBubble/ViewBubble';
import NetInfo from "@react-native-community/netinfo";
var jwtDecode = require('jwt-decode');
import AlertDialog  from '../AlertDialog/AlertDialog'
import axios from 'axios';
import { answerUser } from '../../store/actionCreator/Notification';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';
import Reactotron from 'reactotron-react-native'

import { osMobile } from '../../store/actionRequetes/actionRequetes'


var timer;
var timerMessage;

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
      ProfileUser:undefined,
      filter:undefined,
      _messageFilter:undefined,
      deleteTextSearchBar:false,
      showAboveInput:false,
      answerCurrent:"",
      dataMessageCurrent:undefined,
      isQuestion:undefined,

      hideInputGifted:undefined


    };

    this.permission = undefined;
    this.writeExternalStorage = undefined ;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.path = undefined
  }
    
    async componentDidMount() {

        const { 
          dataProfileUser ,
          dataMessagesHome,
          receiveMessagesHome,
          notificationPrecision,
          DataMessagesMyQuestions,
          receiveResponseConnection,
          receiveDataMessagesMyQuestions,
          } = this.props

        var isInternetReachable ;
        var isConnected;
        let decode = jwtDecode(receiveResponseConnection)
        
        const data = this._dataInfo()

        await NetInfo.fetch().then(state => {
            isInternetReachable = state.isInternetReachable
            isConnected  = state.isConnected 
       
          });
    
       
      if(decode.roles[0] === "ROLE_ADMIN"){
        dataMessagesHome(receiveResponseConnection)
        notificationPrecision(receiveResponseConnection)
 
            timerMessage = setInterval(()=>{
      
              if(isConnected && isInternetReachable){
               
                dataMessagesHome(receiveResponseConnection)
                notificationPrecision(receiveResponseConnection)
              }
              
            },3000)
        if(Platform.OS ==="android"){
          try{
            const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
            const storage = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            this.permission = granted
            this.writeExternalStorage = storage 
         
          }catch(err){
              console.log("eroor ====== >",err)
          }
        }
   
      
     

      }else{
        receiveDataMessagesMyQuestions(data)
        timerMessage = setInterval(()=>{
      
          if(isConnected && isInternetReachable){
            DataMessagesMyQuestions()
            receiveDataMessagesMyQuestions(data)
          }
          
        },3000)
       
      }
   
  
    }
  


    componentWillUnmount(){
      console.log("quitter")
      clearInterval(timerMessage)
     
    }


    static async getDerivedStateFromProps(props, state){ 
              
  
          if(props.dataProfileUser && props.dataProfileUser.data.roleTitle !== "Utilisateur"){
          state.ProfileUser = props.dataProfileUser.data
            
            if(props.dataFilterMyquestion  ){
              state._messageFilter =props.dataFilterMyquestion
              state.filter = true
              
              }else {
              state._messageFilter =undefined
              state.filter = false
              } 
              if(props.allDataMessagesHome){
              
              state._messages = props.allDataMessagesHome //
              
            }
          
          }else {
          if(props.dataProfileUser ){
          state.ProfileUser = props.dataProfileUser.data
          }
          if(props.dataMessagesMyQuestions){
          state._messages = props.dataMessagesMyQuestions //
          }
        }

  
          if(props.dataFilterMyquestion && state.filter){
          state._messageFilter =props.dataFilterMyquestion
      
          
          }else{
          state._messageFilter =undefined
      
          } 

     }



    searchBar= async (text)=>{
  
      const {sendDatafilterMessageMyQuestion,sendDataFilterHomeMessage}=this.props
      
     
      if(text && text.length > 2 ){

      const data = this._dataInfo(text)
        
      let decode = jwtDecode(this.props.receiveResponseConnection)
          data.role = decode.roles[0]

       if(decode && decode.roles[0] === "ROLE_ADMIN"){
        sendDataFilterHomeMessage(data)
       }else{
        sendDatafilterMessageMyQuestion(data)
       }

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

    _dataInfo=(text )=>{
      const { ProfileUser } = this.state

      const {  receiveResponseConnection } = this.props
      console.log("prifluser =",ProfileUser)
      let data = new Object
      data.token = receiveResponseConnection
      data.idUser = ProfileUser && ProfileUser.id
      data.text = text

  
 

      return data 
    }

// ******************************* Mehtode GiftedChat *******************************
  async  onSend(messages = []) {
    const { ProfileUser , dataMessageCurrent,isQuestion } = this.state
   
    const {_id ,
      createdAt ,
      text ,
      user  ,
      recordDuration,
      recordPosition} = messages[0]

     const {receiveResponseConnection ,receiveDatafilterMessageMyQuestion} = this.props
 
     const newMessage = [{
       _id,
       createdAt,
       text,
       user,
       recordDuration,
       recordPosition,
       token: receiveResponseConnection
     }]

  
    if(ProfileUser.roleTitle !== "Administrateur" ){
      
      this.props.sendMessageUser(newMessage)


    }else {
      if(isQuestion){
        let data = this._dataInfo(text)
        data.idMessage = dataMessageCurrent.idMessage
        data.idAnwsersUser = dataMessageCurrent.idAnwsersUser 
        this.props.sendPrecisionForQuestion(data) 
        receiveDatafilterMessageMyQuestion()
      }else{
        let data = this._dataInfo(text)
        data.idMessage = dataMessageCurrent.idMessage
        this.props.sendAnswersForQuestion(data) 
        receiveDatafilterMessageMyQuestion()
      }
      this.setState({
        answerCurrent:undefined,
        showAboveInput:false,
        dataMessageCurrent:undefined
      })
  
    }          
     
  

  }



  renderBubble(props) {
   const { audio ,createdAt ,question, text ,user ,idMessage,_id} = props.currentMessage
 
  const { ProfileUser } =this.state
  
   var minutes = createdAt.getMinutes() 
   const dataMessageCurrent = new Object
   dataMessageCurrent.idAnwsersUser = user._id
   dataMessageCurrent.idMessage= idMessage


   if(createdAt.getMinutes() < 10){
    minutes = `0`+createdAt.getMinutes()
        }

     if( question || ProfileUser && ProfileUser.roleTitle === "Administrateur"){

        return (
          <ViewBubble
          text={text}
          question={question}
          createdAt={createdAt}
          user={user}
          profileUser={ProfileUser.roleTitle}
          minutes={minutes}
          audio={audio}
          openModal={this.openModal}
          user={user}
          props={props}
          showMessage={(res)=>this.setState({
            answerCurrent:audio ? question.text : text,
            showAboveInput:true,
            dataMessageCurrent:dataMessageCurrent,
            isQuestion:res
          })}
          />
           );
      }else {  
        return(
          <Bubble
              
          {...props}
        
        />
        ) 
      
      }

     
 
  }

  renderSend(props,dataMessageCurrent,ProfileUser) {


    if(ProfileUser && ProfileUser.roleTitle === "Administrateur" && dataMessageCurrent){
      return (
     
        <Send {...props} label={<Icon name="paper-plane" />} />
  
      );
    }else if (ProfileUser && ProfileUser.roleTitle !== "Administrateur" ){
      return (
     
        <Send {...props} label={<Icon name="paper-plane" />} />
  
      );
    }
  
  }
 
  renderInputToolbar(props) {

    return(
      <InputToolbar
      containerStyle={{paddingTop:5}}
      {...props}
      />
    ); 
  }
 
  renderComposer=()=> {
    const {params} = this.props.navigation.state
    const { showAboveInput , answerCurrent} = this.state
  
   
  if(showAboveInput){
    
    return(
      
      <View style={Style.renderComposer}>
          <Text style={Style.closeTextRenderComposer}
          onPress={()=>this.setState({
            answerCurrent:"",
            showAboveInput:false,
            dataMessageCurrent:undefined
          })}
          >x</Text>
          <View style={Style.textRenderComposer}>
            <Text >
              { answerCurrent } 
            </Text>
            
          </View>
        
      </View>
      
    )
  }
 
 
  }

  renderActions=(props)=>{
   
    const { ProfileUser, stop ,dataMessageCurrent } = this.state
 
    if(ProfileUser && ProfileUser.roleTitle === "Administrateur" && dataMessageCurrent ){
      if (stop){
        return (
          <View style={{flexDirection:"row",justifyContent:"space-between",width:wp("80%")}}>
      
              <View style={Style.containerIconRecorderOff}>
              <Icon style={{color:"white"}} name="mic-off"  {...props} onPress={()=>this.onStopRecord()}/>
              </View>
            
            <Text 
            style={{paddingTop:15,color:"red"}}
            onPress={()=>this.onStopRecord()}
            >Annuler</Text>
          </View>
        )
      }else{
        return (
       
   
            <View style={Style.containerIconRecorder}>
              <Icon  style={{color:"white"}} name="mic"  {...props} onPress={()=>this.onStartRecord()}/>
            </View>
     
          
        )
      }
    }
    
  }


// ******************************* Methode Soundrecorder *******************************

 

  onStartRecord = async () => {
    const { stop } =this.state
    this.setState({
      stop:!stop,
      hideInputGifted:true
    })

    this.path = Platform.select({
      ios: `/${Date.now()}.m4a`,
      android: `sdcard/${Date.now()}.mp3`
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
    const { stop ,recordDuration , dataMessageCurrent } =this.state
    this.setState({
      stop:!stop,
      hideInputGifted:false
    })
   var filename= undefined;
    const result = await this.audioRecorderPlayer.stopRecorder(this.path);

    this.audioRecorderPlayer.removeRecordBackListener(this.path);
    
    const resultSplit = this.path.split("/")
    
    if(Platform.OS === 'ios'){
      filename =  resultSplit
    }else{
       filename =  resultSplit[1]
    }

//requete avec la lib RNFetchBlob
    RNFetchBlob.fetch("post",'https://rabbin-dev.digitalcube.fr/api/audios/upload',{
    Authorization : "Bearer "+this.props.receiveResponseConnection,
    headers: JSON.stringify({ 'content-type': 'multipart/form-data' }),
    },[
      {
     // name est la clé attendu pour le backend
      name:'file',
      
      filename : filename,
      // use custom MIME type
      type : Platform.OS==="ios"? 'application/m4a':'application/mp3',
      // data it's the path
      data:RNFetchBlob.wrap(result)
      },
      {
        // name est la clé attendu pour le backend
         name:'duration',
         data:`${recordDuration}`
         },
    ]).then((res) => {
    console.log("TCL: MyQuestions -> onStopRecord -> res", res.json())
   
      Reactotron.log("TCL: MyQuestions -> onStopRecord -> res",res.json()["@id"])
      let data = this._dataInfo( res.json()["@id"])
      data.idMessage  = dataMessageCurrent.idMessage
     if(isQuestion){
      data.idAnwsersUser = dataMessageCurrent.idAnwsersUser 
      this.props.sendPrecisionForQuestion(data) 
      receiveDatafilterMessageMyQuestion()
     }else{
      this.props.sendAnswersForQuestion(data)
      receiveDatafilterMessageMyQuestion()
     }
      

    })
    .catch((err) => {
    console.log("TCL: MyQuestions -> onStopRecord -> err", err)
    })

   
  };
    

  onStartPlay = async (propsSounder) => {
    // const path = osMobile(propsSounder)

    this.setState({
      play:true
    })
    const { duration } = propsSounder.currentMessage.audio
 

    const msg = await this.audioRecorderPlayer.startPlayer(this.path);
    // this.path = msg
     console.log("msg ==>",msg,this.path);

     timer = setInterval(()=>{
   
       this.setState({
         currentPositionSec: 100 + this.state.currentPositionSec
      })
      if (this.state.currentPositionSec > parseInt(duration)){
         this.onStopPlay(propsSounder)
      }
    },100)
     


    await this.audioRecorderPlayer.addPlayBackListener(async(e) => {

      if (e.current_position === e.duration) {
         this.audioRecorderPlayer.stopPlayer(this.path).catch(()=>{});
      }
      return e.current_position;
    });

    
    
  }



  onStopPlay=(propsSounder)=>{
    // const path = osMobile(propsSounder)
  
    clearInterval(timer)  
    this.setState({
      play:false ,
      currentPositionSec:0
    
      })
      this.audioRecorderPlayer.stopPlayer(this.path).catch(()=>{});
  }
  


  onPausePlay =  (propsSounder,currentPositionSec) => {
//  const path = osMobile(propsSounder)
  clearInterval(timer)  

   this.setState({
     play:false ,
     currentPositionSec:currentPositionSec
    })
  this.audioRecorderPlayer.pausePlayer(this.path);
  
  };


 // ******************** Modal *******************

  openModal=(props)=>{

   const { contentUrl } = props.currentMessage.audio

    // upload file audio on device
    RNFetchBlob
    .config({
      // response data will be saved to this path if it has access right.
      fileCache : true,
      path : Platform.OS === "ios"? `/${Date.now()}.m4a`:`/sdcard/Music/${Date.now()}.mp3`
    })
    .fetch('GET', contentUrl)
    .then((res) => {
   
      this.path = res.path()
      RNFetchBlob.fs.scanFile([ { path : res.path(), mime : Platform.OS === "ios"?'audio/m4a' :'audio/mp3' } ])
    })
    
      clearInterval(timer) 
      this.setState({
        isModalVisible: true,
        propsSounder:props,
        play:false ,
        currentPositionSec:0
      })

  }

 closeModal=(props)=>{
  clearInterval(timer) 

  // remove file audio 
  RNFetchBlob.fs.unlink(this.path)
  RNFetchBlob.fs.scanFile([ { path : this.path, mime : Platform.OS === "ios"?'audio/aac' :'audio/aac' } ])

  this.setState({
    isModalVisible: false,
    propsSounder:props,
    play:false ,
    currentPositionSec:0
  })
 }

  render() {
     const { ProfileUser,
      _messages,
      deleteTextSearchBar,
      filter,
      _messageFilter,
      alertConfirm,
      alertText,
      style,
      alertVisible,
      dataMessageCurrent,
      hideInputGifted,
      isModalVisible,
      play,
      propsSounder,
      duration,
      currentPositionSec
     } = this.state
  
    var nameMenu = "";
    if(ProfileUser !== undefined){
      nameMenu = ProfileUser.roleTitle === "Administrateur" ? "Chat Général" :  "Mes questions" 
    }


   
    return (
    
      <View  style={Style.container}>
        <Menu nameMenu={nameMenu} navigation={this.props.navigation}/>

       <PlaySound 
         isModalVisible={isModalVisible}
         closeModal={this.closeModal}
        onStartPlay={this.onStartPlay}
        onPausePlay ={this.onPausePlay}
        play={play}
        propsSounder={propsSounder}
        duration={duration}
        currentPositionSec={currentPositionSec}
       />

        <View style={Style.messageContainer}>
           <FiltrateContainer searchBar={this.searchBar} deleteTextSearchBar={deleteTextSearchBar}/>
              <GiftedChat
                inverted={true}
                scrollToBottom={true}
                messages={filter?_messageFilter :_messages}
                shouldUpdateMessage={()=>_messages}
                maxComposerHeight={90}
                onSend={messages => this.onSend(messages)}
                maxInputLength={ hideInputGifted?0:10000}
                renderUsernameOnMessage={true}
                multiline={true}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={49}
                placeholder={hideInputGifted?"":"Poser une question..."}
                keyboardShouldPersistTaps="handled"
                listViewProps={{keyboardDismissMode: 'on-drag' , keyboardShouldPersistTaps:"handled" }}
                renderBubble={(props)=>this.renderBubble(props)}
                renderSend={(props)=>this.renderSend(props,dataMessageCurrent,ProfileUser)}
                renderInputToolbar={this.renderInputToolbar}
                renderActions={this.renderActions}
                renderChatFooter={this.renderComposer}
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