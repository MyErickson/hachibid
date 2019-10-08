import axios from 'axios';
import { SEND_DATA_REGISTER , SEND_DATA_CONNECTION ,SEND_DATA_RESET_PASSWORD, SEND_MESSAGE_USER,
        RECEIVE_DATA_CATEGORY,RECEIVE_MESSAGES_HOME,SEND_DATA_UPDATE_PROFILE,receiveDataMessages,
        SEND_DATA_FILTER_MESSAGE, receiveMessagesHome,receiveDataFilterMessage,
        responseConnection ,responseRegister , responseForReset, receiveDataCategory,receiveDataUpdateProfile } from './reducer'

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
                //ici un autre axios pour recevoir tout les messages
                receiveDataMessages(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;


        case RECEIVE_DATA_CATEGORY:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
               
                receiveDataCategory(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;

        case RECEIVE_MESSAGES_HOME:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
                
                receiveMessagesHome(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;
        
        case SEND_DATA_UPDATE_PROFILE:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
                //ici un autre axios
                receiveDataUpdateProfile(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;
        case SEND_DATA_FILTER_MESSAGE:
                next(action)
                await axios.get('url',{
                
                }).then((response)=>{
                    //ici un autre axios
                    receiveDataFilterMessage(response)
                }).catch((err)=>{
                    console.log(err)
                    
                })
                break;
        
    }

  };
  
  export default ajaxMiddleware;