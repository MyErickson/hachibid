
import axios from 'axios';



export const actionRequeteDataMessage = (response)=>{
    
          const dataMessage = response.data['hydra:member'].map((value)=>{

            return{
                _id:value["@id"],
                text:value.content,
                createdAt:new Date (value.createdAt),
                idMessage:value["@id"],
                valid:value.valid,
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
                            answered:valueAnswers.answered,
                            question:{
                                id:value["@id"], 
                                text:value.content,
                                name:value.user.username
                                        },
                            createdAt:new Date(valueAnswers.createdAt),
                            user:{
                                  _id:valueAnswers.id,
                                  name:"admin",
                                  typeUser:value.user["@type"]
                            }
                        })
                    }
                    date++
                     })   
               }
            }  
        })
  console.log("je suis dans action requete",dataMessage)
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