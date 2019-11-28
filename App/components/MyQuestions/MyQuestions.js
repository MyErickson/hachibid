import React, {Component} from 'react'
import { View,  Text,  TouchableOpacity , Platform } from 'react-native';
import {Icon } from 'native-base'
import { Style} from './styleMyQuestions';
import Menu from '../../containers/Menu/Menu'
import FiltrateContainer from '../../containers/Filtrate/Filtrate'
import {request, PERMISSIONS} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { GiftedChat , Bubble, Send , InputToolbar} from 'react-native-gifted-chat'
import PlaySound from './PlaySound';
import AsyncStorage from '@react-native-community/async-storage';
import ViewBubble from './ViewBubble';
import NetInfo from "@react-native-community/netinfo";
var jwtDecode = require('jwt-decode');
import AlertDialog  from '../AlertDialog/AlertDialog'
import axios from 'axios';
import { answerUser } from '../../store/actionCreator/Notification';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import RNFetchBlob from 'rn-fetch-blob'
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
      alertVisible:undefined,
      alertText:undefined,
      alertConfirm:undefined,
      style:undefined,
      hideInputGifted:undefined


    };

    this.permission = undefined;
    this.writeExternalStorage = undefined ;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.path = undefined
  }
    
    async componentDidMount() {

      // const formData = new FormData();
      // console.log("TCL: MyQuestions -> componentDidMount -> formData", formData)

      //     formData.append("file",{
      //       uri: "file://sdcard/Music/1574765701686.aac",
      //       name: Date.now(),
      //       type: ".aac"
      //     })

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

        try{
          // const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
          // const storage = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
          // this.permission = granted
          // this.writeExternalStorage = storage 
       
        }catch(err){
            console.log("eroor ====== >",err)
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

    _dataInfo=(text)=>{
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
   const { type ,createdAt ,question, text ,user ,idMessage,_id} = props.currentMessage
   const { ProfileUser } = this.state
  
   var minutes = createdAt.getMinutes() 
   const dataMessageCurrent = new Object
   dataMessageCurrent.idAnwsersUser = user._id
   dataMessageCurrent.idMessage= idMessage


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
     }else if( question || ProfileUser && ProfileUser.roleTitle === "Administrateur"){

        return (
          <ViewBubble
          text={text}
          question={question}
          createdAt={createdAt}
          user={user}
          profileUser={ProfileUser.roleTitle}
          minutes={minutes}
          showMessage={(res)=>this.setState({
            answerCurrent:text,
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
  
    // if(ProfileUser && ProfileUser.roleTitle === "Administrateur" && dataMessageCurrent ){
    //   if (stop){
    //     return (
    //       <View style={{flexDirection:"row",justifyContent:"space-between",width:wp("80%")}}>
    //         <TouchableOpacity >
    //           <View style={Style.containerIconRecorder}>
    //           <Icon style={{color:"white"}} name="mic-off"  {...props} onPress={()=>this.onStopRecord()}/>
    //           </View>
    //         </TouchableOpacity>
    //         <Text 
    //         style={{paddingTop:15,color:"red"}}
    //         onPress={()=>this.onStopRecord()}
    //         >Annuler</Text>
    //       </View>
    //     )
    //   }else{
    //     return (
       
    //       <TouchableOpacity >
    //         <View style={Style.containerIconRecorder}>
    //           <Icon  style={{color:"white"}} name="mic"  {...props} onPress={()=>this.onStartRecord()}/>
    //         </View>
    //       </TouchableOpacity>
          
    //     )
    //   }
    // }
    
  }


// ******************************* Methode Soundrecorder *******************************

 

  onStartRecord = async () => {
    const { stop } =this.state
    this.setState({
      stop:!stop,
      hideInputGifted:true
    })
    this.path = Platform.select({
      ios: 'hello.m4a',
      android: `sdcard/Music/${Date.now()}.aac`
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
      stop:!stop,
      hideInputGifted:false
    })

    const result = await this.audioRecorderPlayer.stopRecorder(this.path);

    this.audioRecorderPlayer.removeRecordBackListener(this.path);
  
   
    // this.setState(previousState=>({
    //   recordSecs: 0,
    //   _messages: GiftedChat.append(previousState._messages,  {
    //     id:Date.now(),
    //     text: result,
    //     createdAt: new Date(),
    //     recordDuration:this.state.recordDuration,
    //     recordPosition:0,
    //     type:'record',
    //     user: {
    //       _id:this.props.dataProfileUser.data.id,
      
    //     },
    //     valid: true
    //   },),
    // }));
    // const formData = new FormData();
    // console.log(formData)
    // formData.append("file",{
    //    uri: "file://sdcard/Music/1574765701686.aac",
    //    name: Date.now(),
    //    type: ".aac"
    //  })

   
 };

  onStartPlay = async (propsSounder) => {
     const currentPath = propsSounder.currentMessage.text.split('//')
    console.log('onStartPlay',currentPath);
  
    this.setState({
      play:true
    })

    const msg = await this.audioRecorderPlayer.startPlayer(currentPath[1]);
     console.log("msg ==>",msg,this.path);

     timer = setInterval(()=>{
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

 showAlertDialog = ()=>{
   this.setState({
    alertVisible:true,
    alertText:"Etes sur de vouloir enregistrer un message vocal ?",
    alertConfirm:true,
    style:true
   })
 }
 
 closeAlert=()=>{
  this.setState({
    alertVisible:false,
    alertText:"",
    alertConfirm:false,
    style:false
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
      hideInputGifted
     } = this.state
  
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
           <FiltrateContainer searchBar={this.searchBar} deleteTextSearchBar={deleteTextSearchBar}/>
              <GiftedChat
                inverted={true}
                scrollToBottom={true}
                messages={filter?_messageFilter :_messages}
                extraData={filter?_messageFilter :_messages}
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
                keyboardShouldPersistTaps={'never'}
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
        <AlertDialog 
          alertVisible={alertVisible}
          messageAlert={alertText}
          closeAlert={this.closeAlert}
          alertConfirm={alertConfirm}
          yesConfirm={this.onStartRecord}
          style={style}
                 />

      </View>
    );
  }
}

export default MyQuestions;