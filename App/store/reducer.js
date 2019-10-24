import AsyncStorage from '@react-native-community/async-storage';

/**
 * Initial State
 */
const initialState = {
  receiveResponseConnection: undefined,
  receiveResponseRegister:undefined,
  receiveResponseForReset:undefined,
  dataCategory:undefined,
  allDataMessagesHome:undefined,
  dataProfileUser:undefined,
  dataFilterHome:undefined,
  dataMessagesCategory:undefined,
  dataFilterCategory:undefined,
  dataMessagesMyQuestions:undefined,
  dataFilterMessagesCategory:undefined,
  dataFilterCategory:undefined,
  topDataCategory:undefined,
  dataNotification:undefined
  
};

/**
 * Types
 */

export const RESPONSE_CONNECTION = 'REPONSE_CONNECTION';
export const RESPONSE_FOR_RESET = ' RESPONSE_FOR_RESET';
export const RECEIVE_TOP_DATA_CATEGORY ='RECEIVE_TOP_DATA_CATEGORY';
export const RECEIVE_MESSAGES_HOME ='RECEIVE_MESSAGES_HOME';
export const RECEIVE_DATA_FILTER_MESSAGE ='RECEIVE_DATA_FILTER_MESSAGE';
export const RECEIVE_DATA_UPDATE_PROFILE ='RECEIVE_DATA_UPDATE_PROFILE';
export const SEND_DATA_UPDATE_PROFILE ='SEND_DATA_UPDATE_PROFILE';
export const SEND_DATA_FILTER_HOME_MESSAGE='SEND_DATA_FILTER_HOME_MESSAGE';
export const SEND_MESSAGE_USER= 'SEND_MESSAGE_USER';
export const SEND_DATA_RESET_PASSWORD = 'SEND_DATA_RESET_PASSWORD';
export const DATA_MESSAGES_HOME ='DATA_MESSAGES_HOME';
export const RECEIVE_DATA_MESSAGES_CATEGORY ='RECEIVE_DATA_MESSAGES_CATEGORY,';
export const SEND_DATA_FILTER_MESSAGES_CATEGORY= ' SEND_DATA_FILTER_MESSAGES_CATEGORY';
export const DATA_MESSAGES_CATEGORY ='DATA_MESSAGES_CATEGORY';
export const RECEIVE_DATA_MESSAGES_MYQUESTIONS ='RECEIVE_DATA_MESSAGES_MYQUESTIONS';
export const DATA_FILTER_MESSAGES_CATEGORY ='DATA_FILTER_MESSAGES_CATEGORY';
export const RECEIVE_DATA_FILTER_CATEGORY='RECEIVE_DATA_FILTER_CATEGORY';
export const SEND_DATA_FILTER_CATEGORY='SEND_DATA_FILTER_CATEGORY';
export const DATA_ALL_CATEGORY='DATA_ALL_CATEGORY';
export const RECEIVE_DATA_ALL_CATEGORY ='RECEIVE_DATA_ALL_CATEGORY';
export const DATA_MESSAGES_MYQUESTIONS='DATA_MESSAGES_MYQUESTIONS';
export const DATA_PROFILE_USERS ='DATA_PROFILE_USERS'
export const TOP_DATA_CATEGORY='TOP_DATA_CATEGORY'
export const DATA_NOTIFICATION ='DATA_NOTIFICATION'
export const RECEIVE_DATA_NOTIFICATION ='RECEIVE_DATA_NOTIFICATION'
export const RECEIVE_DATA_PROFILE='RECEIVE_DATA_PROFILE'
/**
 * Traitements
 */

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESPONSE_CONNECTION:
      
       AsyncStorage.setItem('sessionJWT', action.responseConnection)
      
      return {
        ...state,
        receiveResponseConnection:action.responseConnection,
      
      };

 
    case RESPONSE_FOR_RESET:
      return {
        ...state,
        receiveResponseForReset:action.responseReset
      };


    case TOP_DATA_CATEGORY:
        return {
          ...state,
          topDataCategory:action.topDataCategory
        };

    case RECEIVE_MESSAGES_HOME:
        return {
          ...state,
          allDataMessagesHome:action.allMessageHome
        };

    case RECEIVE_DATA_PROFILE:
        return {
          ...state,
          dataProfileUser:action.ProfileUser
        };
    case RECEIVE_DATA_FILTER_MESSAGE:
    return {
      ...state,
      dataFilterHome:action.dataFilterMessage
    };

    case DATA_MESSAGES_CATEGORY:
      return {
        ...state,
        dataMessagesCategory:action.messagesCategory
      };

    case DATA_FILTER_MESSAGES_CATEGORY:
    return {
      ...state,
      dataFilterMessagesCategory:action.dataFilterMessagesCategory
    };

    case RECEIVE_DATA_FILTER_CATEGORY:
    return {
      ...state,
      dataFilterCategory:action.dataFilterCategory
    };

    case RECEIVE_DATA_ALL_CATEGORY:
      return {
        ...state,
        dataAllCategory:action.dataAllCategory
      };
    
    case DATA_MESSAGES_MYQUESTIONS:
      return {
        ...state,
        dataMessagesMyQuestions:action.dataMessagesMyQuestions
      };
      
    case RECEIVE_DATA_NOTIFICATION:
      return {
        ...state,
        dataNotification:action.dataNotification
      };

    default:
      return state;
  }
};



/**
 * Action Creators
 */

/**
 * Selectors
 */

/*
 * Export
 */
export default reducer;

