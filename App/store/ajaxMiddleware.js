import axios from 'axios';
import { SEND_DATA_REGISTER , SEND_DATA_CONNECTION ,SEND_DATA_RESET_PASSWORD, SEND_MESSAGE_USER,
         responseConnection ,responseRegister , responseForReset } from './reducer'

 const  ajaxMiddleware = store => next => async (action) => {
    console.log(next,'action')
    console.log(action)
    next(action);
    switch(action.type){
        case SEND_DATA_CONNECTION :
            next(action)
           await axios.post('url',{
                identifiant:action.login,
                pdw:action.password
            }).then((response)=>{
                console.log(response)
                responseConnection(true)
            }).catch((err)=>{
                responseConnection(false)
            
               
            })
            break;
        case SEND_DATA_REGISTER :
            next(action)
            await axios.post('url',{

            }).then((response)=>{
                console.log(response)
                responseRegister(true)
            }).catch((err)=>{
                console.log(err)
                responseRegister(false)
            })
            break;
        
        case SEND_DATA_RESET_PASSWORD:
            next(action)
            await axios.post('url',{
         
            }).then((response)=>{
                console.log(response)
                responseForReset(true)
            }).catch((err)=>{
                console.log(err)
                responseForReset(false)
            })
            break;
        
        case SEND_MESSAGE_USER:
            next(action)
            await axios.post('url',{
            
            }).then((response)=>{
                console.log(response)
                responseForReset(true)
            }).catch((err)=>{
                console.log(err)
                responseForReset(false)
            })
            break;
        
    }

  };
  
  export default ajaxMiddleware;