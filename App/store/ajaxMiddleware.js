import axios from 'axios';
import { SEND_DATA_REGISTER , SEND_DATA_CONNECTION ,SEND_DATA_RESET_PASSWORD, SEND_MESSAGE_USER,
        RECEIVE_DATA_CATEGORY,SEND_DATA_UPDATE_PROFILE,SEND_DATA_FILTER_CATEGORY,RECEIVE_DATA_ALL_CATEGORY,
        RECEIVE_DATA_MESSAGES_MYQUESTIONS,
        SEND_DATA_FILTER_HOME_MESSAGE,DATA_MESSAGES_HOME,SEND_DATA_FILTER_MESSAGES_CATEGORY,  } from './reducer'


import { receiveMessagesHome,receiveDataMessagesHome } from './actionCreator/ChatHome';
import { responseConnection  } from './actionCreator/Connection';
import { responseRegister } from './actionCreator/Register';
import { responseForReset } from './actionCreator/ResetPassword';
import { receiveDataUpdateProfile } from './actionCreator/Profile';
import { dataMessagesCategory } from './actionCreator/MessageCategory';
import { receiveDataCategory } from './actionCreator/MenuDrawer';
import { receiveDataMessagesMyQuestions,DataMessagesMyQuestions} from './actionCreator/MyQuestions';
import { receiveDataFilterCategory } from './actionCreator/Category'



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
                receiveDataMessagesMyQuestions(response)
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

        case DATA_MESSAGES_HOME:
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
        case SEND_DATA_FILTER_HOME_MESSAGE:
                next(action)
                await axios.get('url',{
                
                }).then((response)=>{
                    //ici un autre axios
                    receiveDataMessagesHome(response)
                }).catch((err)=>{
                    console.log(err)
                    
                })
                break;

        case SEND_DATA_FILTER_MESSAGES_CATEGORY:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
                //ici un autre axios
                dataFilterMessagesCategory(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;

        case RECEIVE_DATA_MESSAGES_CATEGORY:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
             
                dataMessagesCategory(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;
        case SEND_DATA_FILTER_CATEGORY:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
               
                receiveDataFilterCategory(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;

        case DATA_ALL_CATEGORY:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
           
                receiveDataAllCategory(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;

        case RECEIVE_DATA_MESSAGES_MYQUESTIONS:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
           
                DataMessagesMyQuestions(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;
        
    }

  };
  
  export default ajaxMiddleware;