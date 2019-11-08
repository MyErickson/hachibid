import axios from 'axios';

import { SEND_DATA_FILTER_MESSAGE_MYQUESTION, SEND_MESSAGE_USER,DATA_PROFILE_USERS,
     RECEIVE_TOP_DATA_CATEGORY,SEND_DATA_UPDATE_PROFILE,SEND_DATA_FILTER_CATEGORY,RECEIVE_PRECISION,
        RECEIVE_DATA_MESSAGES_MYQUESTIONS, RECEIVE_DATA_MESSAGES_CATEGORY,DATA_ALL_CATEGORY,
        SEND_DATA_FILTER_HOME_MESSAGE,DATA_MESSAGES_HOME,SEND_DATA_FILTER_MESSAGES_CATEGORY,ASK_PRECISION  } from './reducer'


import { receiveMessagesHome,receiveDataFilterMessagesHome } from './actionCreator/ChatHome';
import { receiveDataProfile} from './actionCreator/Profile';
import { dataMessagesCategory,dataFilterMessagesCategory} from './actionCreator/MessageCategory';
import {topDataCategory} from './actionCreator/MenuDrawer';
import { receiveDataMessagesMyQuestions,DataMessagesMyQuestions} from './actionCreator/MyQuestions';
import { receiveDataFilterCategory,receiveDataAllCategory  } from './actionCreator/Category'
import { receiveDataNotification } from './actionCreator/Notification'


import AsyncStorage from '@react-native-community/async-storage';
import { object } from 'prop-types';





 const  ajaxMiddleware = store => next => async action => {
    //  console.log(next,'action')
  
    //match(/"(.*?)"/)[1] recuperer le token sans les ""
   
    
    axios.defaults.baseURL = 'https://rabbin-dev.digitalcube.fr/api/'
    next(action);
     
    switch(action.type){

     
            
        case SEND_MESSAGE_USER:
            next(action)
            console.log("axios envoyer un message ====>",action)
            axios.defaults.headers['Authorization']= "Bearer "+action.message[0].token;
            axios.post('messages',{
                content:action.message[0].text,
                user:`api/users/${action.message[0].user._id}`,
                valid:false,
              
            }).then((response)=>{
                //ici un autre axios pour recevoir tout les messages
                // console.log("response axios send message user ===>",response)
                const data = new Object
                data.id = action.message[0].user._id
                data.token = action.message[0].token
                store.dispatch(receiveDataMessagesMyQuestions(data))
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
                console.log("axios data message home",response)
                  const dataMessage = response.data['hydra:member'].map((value)=>{
    
                    return{
                        _id:value.id,
                        text:value.content,
                        createdAt:new Date (value.createdAt),
                        type:value.type,
                        valid:value.valid,
                        user:{
                            _id:value.user.id,
                            name:value.user.username
                        }
                      }

        
                     
                       
                       
              
                  })

                  response.data["hydra:member"].map((value)=>{
                    if(value.valid){
                        if(value.answers.length){
                            value.answers.map((valueAnswers)=>{
   
                               dataMessage.push({
                               _id:valueAnswers.id,
                               text:valueAnswers.content,
                               valid:value.valid,
                               question:{
                                   idUser:value.user["@id"], 
                                   text:value.content,
                                   name:value.user.username
                                           },
                               createdAt:new Date(valueAnswers.createdAt),
                               idMessage:value["@id"] ,
                               user:{
                                     _id:valueAnswers.id,
                                     name:"admin"
                                 }
   
                           })})
                           
                       }
                    }  
                   
              
                })

          
               const filterDataMessage = dataMessage.filter((value)=> value.valid === true)
             
                const allDataMessageUser = filterDataMessage.sort((a,b)=>  a.createdAt.getTime() - b.createdAt.getTime())  
                store.dispatch(receiveMessagesHome( allDataMessageUser.reverse()))
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
                     console.log("je suis la reponse de filter home", response )
                  const dataMessage= response.data['hydra:member'].map((value)=>{
                    
                    return{
                        _id:value.id,
                        text:value.content,
                        createdAt:new Date(value.createdAt),
                        type:value["@type"],
                        valid:value.valid,
                        user:{
                            _id:value.user.id,
                            name:value.user.username
                        }
                      }
                })

                response.data["hydra:member"].map((value)=>{
                    if(value.answers.length){
                         value.answers.map((valueAnswers)=>{

                            dataMessage.push({
                                _id:valueAnswers.id,
                                text:valueAnswers.content,
                                valid:value.valid,
                                question:{
                                    idUser:value.user["@id"], 
                                    text:value.content,
                                    name:value.user.username
                                            },
                                createdAt:new Date(valueAnswers.createdAt),
                                idMessage:value["@id"] ,
                                user:{
                                      _id:valueAnswers.id,
                                      name:"admin"
                                  }
    

                        })})
                        
                    }
              
                })
                const allDataMessageUser = dataMessage.sort((a,b)=>  a.createdAt.getTime() - b.createdAt.getTime())  
                     store.dispatch(receiveDataFilterMessagesHome(allDataMessageUser.reverse()))
                }).catch((err)=>{
                    console.log("axios ",err.response)
                    
                })
                break;




        case SEND_DATA_FILTER_MESSAGES_CATEGORY:
            next(action)
      
            axios.get(`messages?content=${action.data.text}&category=${action.data.id}`,{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
            }).then((response)=>{
                
                const data = response.data['hydra:member'].map((value)=>{
                    
                    return{
                        _id:value.id,
                        text:value.content,
                        createdAt:new Date(value.createdAt),
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
                
            axios.get(`categories/${action.data.id}`,{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
            }).then((response)=>{
              console.log("la respose",response)
                const dataMessage = response.data.messages.map((value)=>{
                      const id = value['@id'].split('/')
                    return {
                
                        _id:id[3],
                        text:value.content,
                        createdAt: new Date(value.createdAt),
                   
                        type:value["@type"],
                        user:{
                            _id:value.user.id,
                            name:value.user.username
                        }
                    }
                })

                // response.data.messages.map((value)=>{
                //     if(value.answers.length){
                //          value.answers.map((valueAnswers)=>{
                //             dataMessage.push({
                //             _id:valueAnswers.id,
                //             text:valueAnswers.content,
                //             answer:{
                //                 text:value.content,
                //                 name:value.user.username
                //                         },
                //             createdAt:new Date(valueAnswers.createdAt),
                //             user:{
                //                   _id:valueAnswers.id,
                //                   name:"admin"
                //               }
                //         })})
                        
                //     }
              
                // })
 
             
                const allDataMessageUser = dataMessage.sort((a,b)=>  a.createdAt.getTime() - b.createdAt.getTime())  
                store.dispatch(dataMessagesCategory(allDataMessageUser.reverse()))
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
            console.log("je suis dans receive data my questions", action)
          
           
            axios.get(`messages?user=${action.data.id}`,{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
            }).then(async (response)=>{
             
                console.log("requete message dans axios",response)
             const  dataMessage = response.data["hydra:member"].map( (value)=>{
                                
                                    let  data = {
                                        _id:value.id,
                                        text:value.content,
                                        createdAt:new Date(value.createdAt),
                                        user:{
                                              _id:value.user.id,
                                              name:value.user.username
                                          }
                                        }
                                        return data
                                     
                            
  
                })


                response.data["hydra:member"].map((value)=>{
                    if(value.answers.length){
                         value.answers.map((valueAnswers)=>{
                            dataMessage.push({
                            _id:valueAnswers.id,
                            text:valueAnswers.content,
                            answer:{
                                text:value.content,
                                name:value.user.username
                                        },
                            createdAt:new Date(valueAnswers.createdAt),
                            user:{
                                  _id:valueAnswers.id,
                                  name:"admin"
                              }
                        })})
                        
                    }
              
                })
                       
                const allDataMessageUser = dataMessage.sort((a,b)=>  a.createdAt.getTime() - b.createdAt.getTime())   

          
             store.dispatch(DataMessagesMyQuestions(allDataMessageUser.reverse()))
          
               
                        
            }).catch((err)=>{
                console.log("erroorr dans messages myquestion",err)
                
            })
            break;
        
        case ASK_PRECISION:
           next(action)
           console.log(action)
           axios.defaults.headers['Authorization']= "Bearer "+action.data.token;
           axios.post('accuracies',{
            user:action.data.userQuestion,
            answered:true,
            message:action.data.message

        }).then((response)=>{
            console.log("response pour precisison ",response)
          
        }).catch((err)=>{
            console.log(err.response)
            
        })
         break;

         case RECEIVE_PRECISION:
            next(action)
            axios.get('accuracies',{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
           }).then((response)=>{
               console.log("axios totu els reponses,",response)
            //    store.dispatch(receiveDataNotification(response))
           }).catch((err)=>{
               console.log(err)
               
           })
            break;



         case SEND_DATA_FILTER_MESSAGE_MYQUESTION:
         next(action)
         axios.get('url',{
            
        }).then((response)=>{
            console.log(response)
            store.dispatch(receiveDataNotification(response))
        }).catch((err)=>{
            console.log(err)
            
        })
         break;

     
    }

  };
  
  export default ajaxMiddleware;