import { CURRENT_NOTIFICATION,
     DATA_MESSAGES_HOME,
      ALL_PRECISION,
      RECEIVE_ALL_PRECISION,
      ANSWERS_USER,
      RECEIVE_ANSWER_USER,
      QUESTION_NO_VALID,
      GET_QUESTION_NO_VALID,} from "../reducer";


export const notificationPrecision=(data)=>({
    type: ALL_PRECISION,
    data
  
})

export const receiveAllPrecision =(allPrecision) =>({
    type:RECEIVE_ALL_PRECISION,
    allPrecision
})

export const notificationQuestion=(data)=>({
    type:DATA_MESSAGES_HOME ,
    data

})

export const  answerUser=(data)=>({
    type:ANSWERS_USER,
    data
})

export const receiveAnswerUser=(answerUser)=>({
    type:RECEIVE_ANSWER_USER,
    answerUser
})

export const currentNotif = ( currentNotification)=>({
   type:CURRENT_NOTIFICATION,
   currentNotification
})

export const QuestionNoValid =(data)=>({
    type:QUESTION_NO_VALID,
    data
})

export const GetQuestionNoValid =(data)=>({
    type:GET_QUESTION_NO_VALID,
    data
})