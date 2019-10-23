import axios from 'axios';

import { SEND_DATA_RESET_PASSWORD, SEND_MESSAGE_USER,DATA_PROFILE_USERS,
     RECEIVE_TOP_DATA_CATEGORY,SEND_DATA_UPDATE_PROFILE,SEND_DATA_FILTER_CATEGORY,DATA_NOTIFICATION,
        RECEIVE_DATA_MESSAGES_MYQUESTIONS, RECEIVE_DATA_MESSAGES_CATEGORY,DATA_ALL_CATEGORY,
        SEND_DATA_FILTER_HOME_MESSAGE,DATA_MESSAGES_HOME,SEND_DATA_FILTER_MESSAGES_CATEGORY,  } from './reducer'


import { receiveMessagesHome,receiveDataMessagesHome } from './actionCreator/ChatHome';
import { responseForReset } from './actionCreator/ResetPassword';
import { receiveDataUpdateProfile ,receiveDataProfile} from './actionCreator/Profile';
import { receiveDataMessagesCategory} from './actionCreator/MessageCategory';
import {topDataCategory} from './actionCreator/MenuDrawer';
import { receiveDataMessagesMyQuestions,DataMessagesMyQuestions} from './actionCreator/MyQuestions';
import { receiveDataFilterCategory,receiveDataAllCategory  } from './actionCreator/Category'
import { receiveDataNotification } from './actionCreator/Notification'
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

// requete pour recuperer tout le top data pour la liste de category
        case RECEIVE_TOP_DATA_CATEGORY:
            next(action)
            await axios.get('categories/top-teen',{
           
            }).then((response)=>{
            
               const allCategory = response.data["hydra:member"].map(value=>{
                return value.title
           })
         
           store.dispatch(topDataCategory(allCategory))
            }).catch((err)=>{
                console.log(err)
                
            })
            break;

        case DATA_MESSAGES_HOME:
            next(action)
            await axios.get('messages',{
            
            }).then((response)=>{
                //  console.log('rrrrr',response)
                store.dispatch(receiveMessagesHome(response))
            }).catch((err)=>{
                console.log("errrr",err)
                
            })
            break;


        case DATA_PROFILE_USERS:
            next(action)
            await axios.get(`users/${action.idUser}`,{
            
            }).then((response)=>{
                //ici un autre axios
               console.log('ajax profile user',response)
               store.dispatch(receiveDataProfile(response))
            }).catch((err)=>{
                console.log("erroor ajax profil user ",err.response)
                
            })
            break;

            
        case SEND_DATA_UPDATE_PROFILE:
            next(action)
            console.log("axios update profile pour action",action)
            await axios.put(`users/${action.data.id}`,{
                email:action.data.email,
                username:action.data.login,
                password:action.data.password
               }).then((response)=>{
                
                   console.log("axios update profile ",response)
                   store.dispatch(receiveDataProfile(response))
               }).catch((err)=>{
                   console.log("axios error update profile ",err.response)
                   
               })
            break;
        case SEND_DATA_FILTER_HOME_MESSAGE:
                next(action)
                await axios.put(`url`,{
                
                }).then((response)=>{
                    //ici un autre axios
                    store.dispatch(receiveDataMessagesHome(response))
                }).catch((err)=>{
                    console.log("axios ",err)
                    
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
        
        case DATA_NOTIFICATION:
           next(action)
           await axios.get('url',{
            
        }).then((response)=>{
            console.log(response)
            store.dispatch(receiveDataNotification(response))
        }).catch((err)=>{
            console.log(err)
            
        })
        
    }

  };
  
  export default ajaxMiddleware;