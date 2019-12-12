import React from 'react'
import { View, Text,TouchableOpacity , Image } from 'react-native'
import { Style } from "../styleMyQuestions"


const viewBubble = ({
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
}) => {

  
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
               <Image style={{width: 50, height: 50}} source={require(`../../../images/Music.png`) } />
               <Text style={{fontWeight:"bold"}}>Touch pour écouter le message</Text>
           </TouchableOpacity >
       ) : (
        <Text  style={{margin:5,marginBottom:10,marginTop:10}}>{text}</Text>
       )} 
        
    
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text  style={{fontSize:11, textAlign:"right",marginLeft:8,marginTop:3}}>{`~${user.name}`}</Text>
        <Text  style={{fontSize:11, textAlign:"right",marginRight:10, marginLeft:10,marginTop:3}}>{`${createdAt.getHours()}:${minutes}`}</Text>
        {profileUser === "Administrateur" && 
        (   <TouchableOpacity
                onPress={question ? ()=>showMessage(true) :()=>showMessage(false)}
                style={{flexDirection:"row"}}
            >
                <Text  style={{fontSize:11, color:"green",fontWeight:"bold",marginTop:3}}>{question ? "plus d'info" : "répondre"}</Text>
            
                <Text style={{fontSize:15,marginRight:10, color:"green",fontWeight:"bold"}}> + </Text>
    
            </TouchableOpacity>)}
   
        </View>
   </View>
    )
}

export default viewBubble
