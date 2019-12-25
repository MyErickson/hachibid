import React,{Component } from 'react'
import { View, Text,TouchableOpacity , Image } from 'react-native'
import { Style } from "../styleMyQuestions"
import AlertDialog  from '../../AlertDialog/AlertDialog'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";



class viewBubble extends Component{
    state = {
        alertVisible:false,
        alertText :undefined,
        alertConfirm:undefined,
        style:undefined,
        currentMessageForPrecision:undefined,
        askPrecision:undefined
      }

    alertPrecision = (currentMessageForPrecision)=>{
        this.setState({
          alertVisible:true,
         
          alertText:"Pouvez vous me dire ce que vous n'avez pas compris ou ce que vous attendez comme précision ? ",
          askPrecision:true,
          alertConfirm:true,
          style:true,
          currentMessageForPrecision
        })
      }
    
      closeAlert=()=>{
        this.setState({
          alertVisible:false,
          currentMessageForPrecision:undefined,
          textValue:"",
    
        })
      }
    
    
      yesConfirm=(text)=>{
 
        this.setState({
          alertText:"êtes vous sur de vouloir faire la demande  de précision ?",
          textValue:text,
          askPrecision:false,
          alertConfirm:true,
          style:false,
    
        })
      }
    sendPrecision=()=>{
      const { currentMessageForPrecision,textValue } = this.state
      
      console.log("demande une precision",currentMessageForPrecision)
      let data = new Object;
  
      data.content = currentMessageForPrecision.text
      data.message = currentMessageForPrecision.idMessage
      data.user = currentMessageForPrecision.question.id
      data.token = this.props.receiveResponseConnection
      data.textPrecision = textValue  
      console.log("TCL: viewBubble -> sendPrecision -> data.text", textValue  )
       this.props.askPrecision(data)
       this.setState({
        alertText:"Une demande de precision à bien été envoyé",
        textValue:"",
        alertConfirm:false,
        style:true,
        currentMessageForPrecision:undefined
  
      })
    }

    render() {
        const {
            text,
            user,
            createdAt,
            question,
            showMessage,
            minutes,
            profileUser,
            audio,
            openModal,
            props,
           
        } = this.props

        const { 
            alertVisible,
            alertText,
            askPrecision,
            alertConfirm 
            ,style}=this.state
  
        return (
        <View style={Style.answer}> 
            { question && (
                <View style={{backgroundColor:"#AEECDD",borderRadius:5}}>
                <Text  style={{marginLeft:5,marginTop:5,fontWeight:"bold"}}>{question.name}</Text>   
                <Text  style={{margin:5}}>{question.text}</Text>   
                </View>
            )}
                
           { audio ? (
                   <TouchableOpacity   onPress={()=>openModal(props)}   style={{margin:5,alignItems:"center"}}>
                   <Image style={{width: 50, height: 50}} source={{uri:`https://blog.planethoster.com/wp-content/uploads/2018/05/streaming-music-560x560.png`} } />
                   <Text style={{fontWeight:"bold"}}>Touch pour écouter le message</Text>
               </TouchableOpacity >
           ) : (
            <Text  style={{margin:5,marginBottom:10,marginTop:10}}>{text}</Text>
           )} 
            
        
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text  style={{fontSize:11, textAlign:"right",marginLeft:8,marginTop:3}}>{`~${user.name}`}</Text>
                <Text  style={{fontSize:11, textAlign:"right",marginRight:10, marginLeft:10,marginTop:3}}>{`${createdAt.getHours()}:${minutes}`}</Text>
                {profileUser === "Administrateur" ?
                (   <TouchableOpacity
                        onPress={question ? ()=>showMessage(true) :()=>showMessage(false)}
                        style={{flexDirection:"row"}}
                    >
                        <Text  style={{fontSize:11, color:"green",fontWeight:"bold",marginTop:3}}>{question ? "plus d'info" : "répondre"}</Text>
                        <Text style={{fontSize:15,marginRight:10, color:"green",fontWeight:"bold"}}> + </Text>
            
                    </TouchableOpacity>)
                    :
                (<TouchableOpacity
                        onPress={()=>this.alertPrecision(props.currentMessage)}
                        style={{flexDirection:"row"}}
                        >
                        <Text  style={{fontSize:11, marginLeft:50,color:"green",fontWeight:"bold",marginTop:3}}>plus de précision</Text>
                        <Text style={{fontSize:15, color:"green",fontWeight:"bold",marginRight:20}}> + </Text>
                
                    </TouchableOpacity>)
                }
       
            </View>
            <AlertDialog 
            alertVisible={alertVisible}
            messageAlert={alertText}
            closeAlert={this.closeAlert}
            alertConfirm={alertConfirm}
            yesConfirm={this.yesConfirm}
            sendPrecision={this.sendPrecision}
            askPrecision={askPrecision}
            style={style}
            />
       </View>
        )
    }

} 

export default viewBubble
