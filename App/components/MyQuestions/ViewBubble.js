import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { Style } from "./styleMyQuestions"


const viewBubble = ({
    text,
    user,
    createdAt,
    question,
    showMessage,
    minutes
}) => {

    console.log("user vaut ",user)
    return (
    <View style={Style.answer}> 
    { question && (
        <View style={{backgroundColor:"#AEECDD",borderRadius:5}}>
        <Text  style={{marginLeft:5,marginTop:5,fontWeight:"bold"}}>{question.name}</Text>   
        <Text  style={{margin:5}}>{question.text}</Text>   
        </View>
    )}
            
        
        <Text  style={{margin:5,marginBottom:10,marginTop:10}}>{text}</Text>
    
        <View style={{flexDirection:"row"}}>
        <Text  style={{fontSize:11, textAlign:"right",marginLeft:8,marginTop:3}}>{`~${user.name}`}</Text>
        <Text  style={{fontSize:11, textAlign:"right",marginLeft:20,marginTop:3}}>{`${createdAt.getHours()}:${minutes}`}</Text>
        {user.typeUser !== "User" && (     <TouchableOpacity
                onPress={showMessage}
                style={{flexDirection:"row"}}
            >
            <Text  style={{fontSize:11, marginLeft:80,color:"green",fontWeight:"bold",marginTop:3}}>répondre </Text>
            
                <Text style={{fontSize:15, color:"green",fontWeight:"bold"}}> + </Text>
    
            </TouchableOpacity>)}
   
        </View>
   </View>
    )
}

export default viewBubble
