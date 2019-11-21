import axios from 'axios';

import { SEND_DATA_FILTER_MESSAGE_MYQUESTION, SEND_MESSAGE_USER,DATA_PROFILE_USERS,
     RECEIVE_TOP_DATA_CATEGORY,SEND_DATA_UPDATE_PROFILE,SEND_DATA_FILTER_CATEGORY,RECEIVE_PRECISION,SEND_PRECISION_FOR_QUESTION,
        RECEIVE_DATA_MESSAGES_MYQUESTIONS, RECEIVE_DATA_MESSAGES_CATEGORY,DATA_ALL_CATEGORY,SEND_ANSWERS_FOR_QUESTION,
        SEND_DATA_FILTER_HOME_MESSAGE,DATA_MESSAGES_HOME,SEND_DATA_FILTER_MESSAGES_CATEGORY,ASK_PRECISION  } from './reducer'


import { receiveMessagesHome,receiveDataFilterMessagesHome ,dataMessagesHome} from './actionCreator/ChatHome';
import { receiveDataProfile} from './actionCreator/Profile';
import { dataMessagesCategory,dataFilterMessagesCategory} from './actionCreator/MessageCategory';
import {topDataCategory} from './actionCreator/MenuDrawer';
import { receiveDataMessagesMyQuestions,DataMessagesMyQuestions,receiveDatafilterMessageMyQuestion} from './actionCreator/MyQuestions';
import { receiveDataFilterCategory,receiveDataAllCategory  } from './actionCreator/Category'
import { actionRequeteDataMessage,actionRequeteFilter,actionRequeteSort } from "./actionRequetes/actionRequetes"







 const  ajaxMiddleware = store => next => async action => {
    //  console.log(next,'action')
  
    //match(/"(.*?)"/)[1] recuperer le token sans les ""
   
    
    axios.defaults.baseURL = 'https://rabbin-dev.digitalcube.fr/api/'
    next(action);
     
    switch(action.type){

     
            
        case SEND_MESSAGE_USER:
            next(action)

            axios.defaults.headers['Authorization']= "Bearer "+action.message[0].token;
            axios.post('messages',{
                content:action.message[0].text,
                user:`api/users/${action.message[0].user._id}`,
                valid:false,
              
            }).then((response)=>{

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
                store.dispatch(receiveMessagesHome( undefined))
           
                const dataMessage= actionRequeteDataMessage(response) 
 
                const filterDataMessage = actionRequeteFilter(dataMessage)
             
                const allDataMessageUser = actionRequeteSort(filterDataMessage)  

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

               store.dispatch(receiveDataProfile(response))
            }).catch((err)=>{
                console.log("erroor ajax profil user ",err.response)
                
            })
            break;





 // envoye les données a modifier pour un utilisateur            
        case SEND_DATA_UPDATE_PROFILE:
            next(action)
       
            axios.defaults.headers['Authorization']= "Bearer "+action.data.token;
            axios.put(`users/${action.data.id}`,{
             
                    email:action.data.email,
                    username:action.data.login,
                    password:action.data.password,
                    image:action.data.image
               }).then((response)=>{
                  
                   store.dispatch(receiveDataProfile(response))
               }).catch((err)=>{
                   console.log("axios error update profile ",err.response.data["hydra:description"])
   
               })
            break;





        case SEND_DATA_FILTER_HOME_MESSAGE:
                next(action)
      
                axios.get(`messages?content=${action.data.text}`,{
                    headers:{
                        'Authorization':"Bearer "+action.data.token
                    } 
                }).then((response)=>{

                    const dataMessage= actionRequeteDataMessage(response) 
    
                    const filterDataMessage = actionRequeteFilter(dataMessage)
                    const allDataMessageUser = actionRequeteSort(filterDataMessage)

                    if(action.data.role === "ROLE_ADMIN"){
                        store.dispatch(receiveDatafilterMessageMyQuestion(allDataMessageUser.reverse()))
                    }else{
                        store.dispatch(receiveDataFilterMessagesHome(allDataMessageUser.reverse()))
                    }
                    
                }).catch((err)=>{
                    console.log("axios ",err.response)
                    
                })
                break;

        

          case SEND_DATA_FILTER_MESSAGE_MYQUESTION:
                    next(action)
               
                    axios.get(`messages?user=${action.data.idUser}&content=${action.data.text}`,{
                        headers:{
                            'Authorization':"Bearer "+action.data.token
                        } 
                    }).then((response)=>{
                        console.log("good oro axios ",response)
                        const dataMessage= actionRequeteDataMessage(response) 

                        const allDataMessageUser = actionRequeteSort(dataMessage)

                         store.dispatch(receiveDatafilterMessageMyQuestion(allDataMessageUser.reverse()))
                    }).catch((err)=>{
                        console.log("errr oro axios ",err.response)
                        
                    })
                    break;


        case SEND_DATA_FILTER_MESSAGES_CATEGORY:
            next(action)
      
            axios.get(`messages?content=${action.data.text}&category=${action.data.id}`,{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
            }).then((response)=>{

                const dataMessage= actionRequeteDataMessage(response) 

                const filterDataMessage = actionRequeteFilter(dataMessage)

                const allDataMessageUser = actionRequeteSort(filterDataMessage)   
    
                store.dispatch(dataFilterMessagesCategory(allDataMessageUser.reverse()))
            }).catch((err)=>{
                console.log("ERRROR axios sans ke filtre message catefory ",err)
                store.dispatch(dataFilterMessagesCategory(undefined))
            })
            break;




        case RECEIVE_DATA_MESSAGES_CATEGORY:
            next(action)
                
            axios.get(`messages?category=${action.data.id}`,{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
            }).then((response)=>{
                const dataMessage= actionRequeteDataMessage(response) 
                
                const filterDataMessage = actionRequeteFilter(dataMessage)

                const allDataMessageUser = actionRequeteSort(filterDataMessage)  
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
                
            axios.get(`messages?user=${action.data.idUser}`,{
                headers:{
                    'Authorization':"Bearer "+action.data.token
                } 
            }).then(async (response)=>{
         

                const dataMessage= actionRequeteDataMessage(response) 

                const allDataMessageUser = actionRequeteSort(dataMessage)  

             
                if(allDataMessageUser.length <= 0 ){
                  
                    store.dispatch(DataMessagesMyQuestions(undefined))
                }else {
             
                    store.dispatch(DataMessagesMyQuestions(allDataMessageUser.reverse()))
                }

                        
            }).catch((err)=>{
                console.log("erroorr dans messages myquestion",err)
                
            })
            break;
        
        case ASK_PRECISION:
           next(action)
      
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

         case SEND_PRECISION_FOR_QUESTION:
            next(action)
            console.log(action )
            axios.defaults.headers['Authorization']= "Bearer "+action.data.token;
            axios.put(`answers/${action.data.idAnwsersUser}`,{
                content: action.data.text, 
                message: action.data.idMessage,
                answerer:`api/users/${action.data.idUser}`,
                answered:true,
   
           }).then((response)=>{
               console.log("axios totu els reponses,",response)
         
            store.dispatch(dataMessagesHome(action.data.token))
           }).catch((err)=>{
               console.log(err)
               
           })
            break;

        case SEND_ANSWERS_FOR_QUESTION:
            next(action)
            console.log(action )
            axios.defaults.headers['Authorization']= "Bearer "+action.data.token;
            axios.post(`answers`,{
             content: action.data.text, 
             message: action.data.idMessage,
             answerer:`api/users/${action.data.idUser}`,
             answered:true,

           }).then((response)=>{
            console.log("axios tout les reponses11111",response)
                store.dispatch(dataMessagesHome(action.data.token))
                console.log("axios tout les reponses,22222",response)
           }).catch((err)=>{
               console.log("33333",err.response)
               
           })
            break;


     
    }

  };
  
  export default ajaxMiddleware;