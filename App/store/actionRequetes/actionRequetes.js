
import axios from 'axios';



export const actionRequeteDataMessage = (response)=>{
    //   console.log("je sis dans action requetes ", response)
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
                        
                    if(valueAnswers.answered){
                        dataMessage.push({
                            _id:value["@id"]+ date,
                            idMessage:value["@id"],
                            text:valueAnswers.content,
                            valid:value.valid,
                            seen:value.seen,
                            answered:valueAnswers.answered,
                            question:{
                                id:value["@id"], 
                                text:value.content,
                                name:value.user.username
                                        },
                            createdAt:new Date(valueAnswers.createdAt),
                            user:{
                                  _id:valueAnswers.answerer.id,
                                  name:valueAnswers.answerer.username,
                                  typeUser:valueAnswers.answerer["@type"]
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
