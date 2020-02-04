import {  Platform } from 'react-native';
import axios from 'axios';



export const actionRequeteDataMessage = (response)=>{
    //    console.log("je sis dans action requetes ", response)
          const dataMessage = response.data['hydra:member'].map((value)=>{

            return{
                _id:value["@id"],
                text:value.content,
                createdAt:new Date (value.createdAt),
                idMessage:value["@id"],
                valid:value.valid,
                seen:value.seen,
                user:{
                    _id:value.user.id,
                    name:value.user.username,
                    typeUser:value.user["@type"]
                }
              }
      
          })

          response.data["hydra:member"].map((value)=>{
       
            if(value.valid){
                if(value.answers.length){
                    var date = 0 ;
                    value.answers.map((valueAnswers)=>{
                        const { audio ,answerer} = valueAnswers
                   
                        
                    if(valueAnswers.answered){
                        dataMessage.push({
                            _id:value["@id"]+ date,
                            idMessage:value["@id"],
                            text:valueAnswers.content,
                            valid:value.valid,
                            seen:value.seen,
                            answered:valueAnswers.answered,
                            audio:audio && {
                                idAudio:audio.id,
                                id:audio["@id"],
                                contentUrl: audio.contentUrl,
                                duration:audio.duration,

                            },
                            question:{
                                id:value.user["@id"],
                                idAnswer:valueAnswers.id, 
                                text:value.content,
                                name:value.user.username
                                        },
                            createdAt:new Date(valueAnswers.createdAt),
                            user:{
                                  _id:answerer.id,
                                  name:answerer.username,
                                  typeUser:answerer["@type"]
                            }
                        })
                    }
                    date++
                     })   
               }
            }  
        })
       
        return dataMessage
        
   
}

export const actionRequeteFilter = (dataMessage)=>{
    const filterDataMessage = dataMessage.filter((value)=> value.valid === true)
    
    return filterDataMessage
}

export const actionRequeteSort =(filterDataMessage )=>{
    const allDataMessageUser = filterDataMessage.sort((a,b)=>  a.createdAt.getTime() - b.createdAt.getTime()) 
    return allDataMessageUser   
}

export const counterNotif = (notificationQ = null, notificationP = null)=>{

    var x  = 0 , i = 0
    if(notificationQ){
        let counterNotif = notificationQ.filter((value)=> value.answered !== true && value.seen === false)
        i = counterNotif.length
    }
    if(notificationP){
       let counterNotif = notificationP.filter((value)=> value.answered !== true && value.seen === false)
       x =  counterNotif.length
    }
 
    return x + i 
}

export const presetColors = {
    backgroundColor: [
        '#1285F0',
        '#12EEF0',
     
   
    ],
    colorsProfile: [
      '#7F7FD5',
      '#86A8E7',
      '#91EAE4',
   
    ],
 }



 export const modif = (value)=>{
    return value < 10 ?"0" + value  : value
  }


  export const dateTime =(date)=>{
      
    const data = new FormData()


    const hours = date.getHours()
    const modifHours = modif(hours)


    const minutes = date.getMinutes()
    const modifMinutes  = modif(minutes)


    const showTime = modifHours+ ":"+modifMinutes
    data.showTime = showTime

    const month = date.getUTCMonth()
    const modifMonth = month  < 10 ?"0" + (month  +1) : month 
    
    const showDate = date.getDate() +"/"+ modifMonth +"/"+date.getFullYear()
    data.showDate = showDate
    return data 

  }