import React, { Component } from 'react';
import { View,  Text,  TouchableOpacity , Platform } from 'react-native';
import {Icon } from 'native-base'
import { Style} from './styleMyQuestions';
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import {request, PERMISSIONS} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { GiftedChat , Bubble, Send , InputToolbar, Message,} from 'react-native-gifted-chat'
import PlaySound from './PlaySound';

class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
      _messages:undefined,
      recordDuration:undefined,
      recordTime:undefined,
      currentPositionSec:undefined,
      currentDurationSec:undefined,
      playTime:undefined,
      duration:undefined,
      stop:false,
      play:false,
      isModalVisible:false,
      propsSounder:undefined


    };
  
    this.permission = undefined;
    this.writeExternalStorage = undefined ;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.path = undefined
  }
    
    async componentDidMount() {
        const { dataProfileUser } = this.props
       console.log("componentdidmount du dataprofile ===>",dataProfileUser.data.id)
        // await this.props.receiveDataMessagesMyQuestions(dataProfileUser.data.id)
    
 
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
          console.log("get derived My QUESTION ==>",props.dataMessagesMyQuestions)
             state._messages = props.dataMessagesMyQuestions
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
     const {_id , createdAt , text , user  , recordDuration,
      recordPosition} = messages[0]
     const newMessage = [{
       _id,
       createdAt,
       text,
       type:'message',
       user,
       recordDuration,
       recordPosition
     }]
     console.log("MYQESTION on send message ===>",newMessage)
    this.setState(previousState =>({
      messages: GiftedChat.append(previousState.messages, newMessage),
    }))
    // await  this.props.sendMessageUser(newMessage)
    // await this.props.receiveDataMessagesMyQuestions(dataProfileUser.data.id)

  }



  renderBubble(props) {
   const { type ,createdAt } = props.currentMessage
     if(type === "record"){
       var minutes = createdAt.getMinutes() 
        if(createdAt.getMinutes() < 10){
            minutes = `0`+createdAt.getMinutes()
        }
       return (
        <View style={Style.recorder}>    
        <Text  onPress={()=>this.toggleModal(props)} style={{margin:5}}>Message vocal, Click pour lecture</Text>
        <Text  style={{fontSize:11, textAlign:"right",marginRight:5}}>{`${createdAt.getHours()}:${minutes}`}</Text>
        
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
    const { stop } = this.state
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


// ******************************* Mehtode Soundrecorder *******************************



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
     console.log("reeee",this.audioRecorderPlayer.mmss(
      this.state.recordSecs,
    ),)
    this.setState(previousState=>({
      recordSecs: 0,
      messages: GiftedChat.append(previousState.messages,  {
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
     

  };

  onStartPlay = async (propsSounder) => {
     const currentPath = propsSounder.currentMessage.text.split('//')
    console.log('onStartPlay',currentPath);
    
    var change =true;
    var  t = 0 ;

    const msg = await this.audioRecorderPlayer.startPlayer(currentPath[1]);
    console.log("msg ==>",msg,this.path);
    this.audioRecorderPlayer.addPlayBackListener(async(e) => {
      // console.log("Ons tart play fonction dans le adddPlabaclisterner===>",e)
      // console.log("resumeplayer  ===>",this.audioRecorderPlayer.resumePlayer(currentPath[1]))
        
      this.setState({
        currentPositionSec: change && e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        play:true
      });
      if(t===e.current_position){
         console.log("t dans on start palyer",t)
       
         change =false
      } else{
        console.log("t dans on start palyer pas egal",t)
        t=e.current_position
        change = true
      }

      if (e.current_position === e.duration) {
      
        
        //  this.audioRecorderPlayer.removeRecordBackListener(currentPath[1]);
         this.audioRecorderPlayer.stopPlayer(currentPath[1]).catch(()=>{});
    
        this.setState({
          play:false
        });
      }
      
    });
 
    this.setState({play:false})
  }
  onPausePlay =  (propsSounder) => {
  const currentPath = propsSounder.currentMessage.text.split('//')
  console.log('onPausePlay');
   this.setState({play:false})
  this.audioRecorderPlayer.stopPlayer(currentPath[1]);
  //  this.audioRecorderPlayer.removeRecordBackListener(currentPath[1]);
  };


 // ******************** Modal *******************

 toggleModal=(props)=>{
   const { isModalVisible } = this.state
  this.setState({isModalVisible: !isModalVisible,
                propsSounder:props
  })
 }






  render() {


    return (
    
      <View  style={Style.container}>
        <Menu nameMenu="Mes questions" navigation={this.props.navigation}/>
       <PlaySound 
        isModalVisible={this.state.isModalVisible}
        toggleModal={this.toggleModal}
        onStartPlay={this.onStartPlay}
        onPausePlay ={this.onPausePlay}
        play={this.state.play}
        propsSounder={this.state.propsSounder}
        duration={this.state.duration}
        currentDurationSec={this.state.currentDurationSec}
        currentPositionSec={this.state.currentPositionSec}
       />
        <View style={Style.messageContainer}>
            <Filtrate searchBar={this.searchBar} />
              <GiftedChat
                messages={this.state.messages}
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
                  _id: this.props.dataProfileUser.data.id,
                  
                }}
              />
    
        </View>
       

      </View>
    );
  }
}

export default Test;