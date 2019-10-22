import axios from 'axios';

import { SEND_DATA_RESET_PASSWORD, SEND_MESSAGE_USER,
     RECEIVE_TOP_DATA_CATEGORY,SEND_DATA_UPDATE_PROFILE,SEND_DATA_FILTER_CATEGORY,RECEIVE_DATA_ALL_CATEGORY,
        RECEIVE_DATA_MESSAGES_MYQUESTIONS, RECEIVE_DATA_MESSAGES_CATEGORY,DATA_ALL_CATEGORY,
        SEND_DATA_FILTER_HOME_MESSAGE,DATA_MESSAGES_HOME,SEND_DATA_FILTER_MESSAGES_CATEGORY,  } from './reducer'


import { receiveMessagesHome,receiveDataMessagesHome } from './actionCreator/ChatHome';
import { responseForReset } from './actionCreator/ResetPassword';
import { receiveDataUpdateProfile } from './actionCreator/Profile';
import { receiveDataMessagesCategory} from './actionCreator/MessageCategory';
 import {topDataCategory} from './actionCreator/MenuDrawer';
import { receiveDataMessagesMyQuestions,DataMessagesMyQuestions} from './actionCreator/MyQuestions';
import { receiveDataFilterCategory,receiveDataAllCategory  } from './actionCreator/Category'
import AsyncStorage from '@react-native-community/async-storage';

var sessionId =  AsyncStorage.getItem('sessionJWT')

 const  ajaxMiddleware = store => next => async action => {
    //  console.log(next,'action')

    //match(/"(.*?)"/)[1] recuperer le token sans les ""
   
     axios.defaults.headers.common['Authorization']= "Bearer "+sessionId._55;
    axios.defaults.baseURL = 'https://rabbin-dev.digitalcube.fr/api/'
    next(action);
    switch(action.type){


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


        case RECEIVE_TOP_DATA_CATEGORY:
            next(action)
            await axios.get('categories/top-teen',{
           
            }).then((response)=>{
            
               const allCategory = response.data["hydra:member"].map(value=>{
                return value.title
           })
           console.log('data category ',allCategory)
           store.dispatch(topDataCategory(allCategory))
            }).catch((err)=>{
                console.log(err)
                
            })
            break;

        case DATA_MESSAGES_HOME:
            next(action)
            await axios.get('messages',{
            
            }).then((response)=>{
                // console.log('rrrrr',response)
                store.dispatch(receiveMessagesHome(response))
            }).catch((err)=>{
                console.log(err)
                
            })
            break;


        // case DATA_PROFILE_USERS:
        //     next(action)
        //     await axios.get('users/{}',{
            
        //     }).then((response)=>{
        //         //ici un autre axios
              
        //     }).catch((err)=>{
        //         console.log(err)
                
        //     })
        //     break;

            
        case SEND_DATA_UPDATE_PROFILE:
            next(action)
            await axios.get('url',{
            
            }).then((response)=>{
                //ici un autre axios
              
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
// requete pour recuperer tout le data pour la liste de category
        case DATA_ALL_CATEGORY:
            next(action)
            await axios.get('categories')
            .then((response)=>{
                console.log("eeeeeeeee",response)
                 const allCategory = response.data["hydra:member"].map(value=>{
                      return value.title
                 })
              
                store.dispatch(receiveDataAllCategory(allCategory))
            }).catch((err)=>{
                console.log('category',err)
                
            })
            break;

        case RECEIVE_DATA_MESSAGES_MYQUESTIONS:
            next(action)
            await axios.get('messages',{
            
            }).then((response)=>{
                console.log(response)
                store.dispatch(DataMessagesMyQuestions(response))
            }).catch((err)=>{
                console.log(err)
                
            })
            break;
        
    }

  };
  
  export default ajaxMiddleware;