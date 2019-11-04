import axios from 'axios';

import { SEND_DATA_RESET_PASSWORD, SEND_MESSAGE_USER,DATA_PROFILE_USERS,
     RECEIVE_TOP_DATA_CATEGORY,SEND_DATA_UPDATE_PROFILE,SEND_DATA_FILTER_CATEGORY,DATA_NOTIFICATION,
        RECEIVE_DATA_MESSAGES_MYQUESTIONS, RECEIVE_DATA_MESSAGES_CATEGORY,DATA_ALL_CATEGORY,
        SEND_DATA_FILTER_HOME_MESSAGE,DATA_MESSAGES_HOME,SEND_DATA_FILTER_MESSAGES_CATEGORY,  } from './reducer'


import { receiveMessagesHome,receiveDataFilterMessagesHome } from './actionCreator/ChatHome';
import { responseForReset } from './actionCreator/ResetPassword';
import { receiveDataUpdateProfile ,receiveDataProfile} from './actionCreator/Profile';
import { dataMessagesCategory,dataFilterMessagesCategory} from './actionCreator/MessageCategory';
import {topDataCategory} from './actionCreator/MenuDrawer';
import { receiveDataMessagesMyQuestions,DataMessagesMyQuestions} from './actionCreator/MyQuestions';
import { receiveDataFilterCategory,receiveDataAllCategory  } from './actionCreator/Category'
import { receiveDataNotification } from './actionCreator/Notification'
import AsyncStorage from '@react-native-community/async-storage';



var sessionId =  AsyncStorage.getItem('sessionJWT')

 const  ajaxMiddleware = store => next => async action => {
    //  console.log(next,'action')
    //    console.log("dans ajax middleware sessinID  =======>",sessionId)
    //match(/"(.*?)"/)[1] recuperer le token sans les ""
   
    // axios.defaults.headers.common['Authorization']= "Bearer "+sessionId._55;
    axios.defaults.baseURL = 'https://rabbin-dev.digitalcube.fr/api/'
    next(action);
     
    switch(action.type){

     
            
        case SEND_MESSAGE_USER:
            next(action)
            console.log("axios envoyer un message ====>",action)
            axios.post('messages',{
                content:action.message[0].text,
                type:action.message[0].type,
                user:`api/users/${action.message[0].user._id}`,
                valid:false,
              
            }).then((response)=>{
                //ici un autre axios pour recevoir tout les messages
                console.log("response axios send message user ===>",response)
                stor.dispatch(receiveDataMessagesMyQuestions(action.message.id))
            }).catch((err)=>{
                console.log("error axios message send user",err)
                
            })
            break;





// requete pour recuperer tout le top data pour la liste de category
        case RECEIVE_TOP_DATA_CATEGORY:
            next(action)
          
            axios.get('categories/top-ten',{
                headers:{
                    'Authorization':"Bearer "+action.token
                } 
            }).then((response)=>{
             
               const allCategory = response.data["hydra:member"].map(value=>{
                return {
                    id:value.id,
                    title:value.title
                }
           })
         
           store.dispatch(topDataCategory(allCategory))
            }).catch((err)=>{
                console.log(err)
                
            })
            break;



// recupere tout les données (message) dans la page Home 
        case DATA_MESSAGES_HOME:
            next(action)
           
            axios.get('messages',{
                headers:{
                    'Authorization':"Bearer "+action.token
                } 
            }).then((response)=>{
               
                  const data = response.data['hydra:member'].map((value)=>{
                    
                      return{
                          _id:value.id,
                          text:value.content,
                          createdAt:value.createdAt,
                          type:value.type,
                          user:{
                              _id:value.user.id,
                              name:value.user.username
                          }
                        }
                  })
           
     
                store.dispatch(receiveMessagesHome(data.reverse()))
            }).catch((err)=>{
                console.log("error axios data message home",err.response)
                
            })
            break;





// recupere les données d'un utilisateur
        case DATA_PROFILE_USERS:
            next(action)
           
            
            axios.get(`users/${action.idUser.id}`,{
               headers:{
                   'Authorization':"Bearer "+action.idUser.token
               } 
            }).then((response)=>{
                //ici un autre axios
               console.log('ajax profile user',response)
               store.dispatch(receiveDataProfile(response))
            }).catch((err)=>{
                console.log("erroor ajax profil user ",err.response)
                
            })
            break;





 // envoye les données a modifier pour un utilisateur            
        case SEND_DATA_UPDATE_PROFILE:
            next(action)
            console.log("axios update profile pour action",action)
            axios.defaults.headers['Authorization']= "Bearer "+action.data.token;
            axios.put(`users/${action.data.id}`,{
             
                    email:action.data.email,
                    username:action.data.login,
                    password:action.data.password,
                    image:action.data.image
               }).then((response)=>{
                
                  
                   store.dispatch(receiveDataProfile(response))
               }).catch((err)=>{
                   console.log("axios error update profile ",err.response)
                   
               })
            break;





        case SEND_DATA_FILTER_HOME_MESSAGE:
                next(action)
           
                axios.get(`messages?content=${action.data.text}`,{
                    headers:{
                        'Authorization':"Bearer "+action.data.token
                    } 
                }).then((response)=>{
                    //ici un autre axios
                     
                  const data = response.data['hydra:member'].map((value)=>{
                    
                    return{
                        _id:value.id,
                        text:value.content,
                        createdAt:value.createdAt,
                        type:value["@type"],
                        user:{
                            _id:value.user.id,
                            name:value.user.username
                        }
                      }
                })
                console.log("axios sans ke friktre des messsage  ",response)
                     store.dispatch(receiveDataFilterMessagesHome(data.reverse()))
                }).catch((err)=>{
                    console.log("axios ",err.response)
                    
                })
                break;




        case SEND_DATA_FILTER_MESSAGES_CATEGORY:
            next(action)
            console.log("ACTIOOOON axios sans ke filtre message catefory ",action)
            axios.get(`messages?content=${action.data.text}&category=${action.data.id}`,{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
            }).then((response)=>{
                
                const data = response.data['hydra:member'].map((value)=>{
                    
                    return{
                        _id:value.id,
                        text:value.content,
                        createdAt:value.createdAt,
                        type:value["@type"],
                        user:{
                            _id:value.user.id,
                            name:value.user.username
                        }
                      }
                })
    
                store.dispatch(dataFilterMessagesCategory(data))
            }).catch((err)=>{
                console.log("ERRROR axios sans ke filtre message catefory ",err)
                store.dispatch(dataFilterMessagesCategory(undefined))
            })
            break;




        case RECEIVE_DATA_MESSAGES_CATEGORY:
            next(action)
        console.log("action dans receive data message category", action)
            axios.get(`categories/${action.data.id}`,{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
            }).then((response)=>{
               console.log("je suis dans receive data message category",response)
                const dataMessage = response.data.messages.map((value)=>{
                      const id = value['@id'].split('/')
                    return {
                
                        _id:id[3],
                        text:value.content,
                        createdAt:value.createdAt,
                        type:value["@type"],
                        user:{
                            _id:value.user.id,
                            name:value.user.username
                        }
                    }
                })
                 store.dispatch(dataMessagesCategory(dataMessage))
            }).catch((err)=>{
                console.log("axios error message category", err.reponse)
                
            })
            break;



        case SEND_DATA_FILTER_CATEGORY:
            next(action)
            axios.get('url',{
            
            }).then((response)=>{
               
                receiveDataFilterCategory(response)
            }).catch((err)=>{
                console.log(err)
                
            })
            break;



// requete pour recuperer tout le data pour la liste de category
        case DATA_ALL_CATEGORY:
            next(action)
            axios.get('categories',{
                headers:{
                    'Authorization':"Bearer "+action.token
                } 
             })
            .then((response)=>{
                 console.log("axios all category ===>",response)
                 const allCategory = response.data["hydra:member"].map(value=>{
                      return{
                          id:value.id,
                          title:value.title
                      }
                 })
              
                store.dispatch(receiveDataAllCategory(allCategory))
            }).catch((err)=>{
                console.log('category',err)
                
            })
            break;





// recupere les doonées (message) de l'utisateur , page my questions            
        case RECEIVE_DATA_MESSAGES_MYQUESTIONS:
            next(action)
         
            axios.get(`messages/${action.id}`,{
            
            }).then((response)=>{
              
                     const data = response.data['hydra:member'].map((value)=>{
                      return{
                          _id:value.id,
                          text:value.content,
                          createdAt:value.createdAt,
                          type:value.type,
                          user:{
                              _id:value.userInfo.id,
                              name:value.userInfo.username
                          }


                        }
                  })
                store.dispatch(DataMessagesMyQuestions(data.reverse()))
            }).catch((err)=>{
                console.log("erroorr dans messages myquestion",err)
                
            })
            break;
        
        case DATA_NOTIFICATION:
           next(action)
           axios.get('url',{
            
        }).then((response)=>{
            console.log(response)
            store.dispatch(receiveDataNotification(response))
        }).catch((err)=>{
            console.log(err)
            
        })
        
    }

  };
  
  export default ajaxMiddleware;