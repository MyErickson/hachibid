import axios from 'axios';
import { actionRequeteSort } from "../actionRequetes/actionRequetes"
import { QuestionNoValid  } from "../actionCreator/Notification"
axios.defaults.baseURL = 'https://rabbin-dev.digitalcube.fr/api/'

export const requestGetQuestionNoValid =(value)=>{
     const { store , action } = value
    axios.get(`messages?valid=false`,{
        headers:{
            'Authorization':"Bearer "+action.data
        } 
    }).then((response)=>{
    console.log("TCL: requestGetQuestionNoValid -> response", response)
 
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
    console.log("TCL: requestGetQuestionNoValid -> ataMessage ", dataMessage )

         const allDataMessageUser = actionRequeteSort(dataMessage)
         store.dispatch(QuestionNoValid(allDataMessageUser.reverse()) )
         console.log("TCL: requestGetQuestionNoValid -> allDataMessageUser ", allDataMessageUser )

        
    }).catch((err)=>{
        console.log("axios ",err.response)
        
    })
}