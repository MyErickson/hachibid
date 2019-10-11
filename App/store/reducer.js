/**
 * Initial State
 */
const initialState = {
  receiveResponseConnection: undefined,
  receiveResponseRegister:undefined,
  receiveResponseForReset:undefined,
  dataCategory:undefined,
  dataMessagesHome:undefined,
  dataProfileUser:undefined,
  dataFilterHome:undefined,
  dataMessagesCategory:undefined,
  dataFilterCategory:undefined,
  dataMessagesMyQuestions:undefined,
  dataFilterMessagesCategory:undefined,
  dataFilterCategory:undefined,

  
};

/**
 * Types
 */

export const RESPONSE_CONNECTION = 'REPONSE_CONNECTION';
export const RESPONSE_REGISTER = 'REPONSE_REGISTER';
export const RESPONSE_FOR_RESET = ' RESPONSE_FOR_RESET';
export const RECEIVE_DATA_CATEGORY ='RECEIVE_DATA_CATEGORY';
export const RECEIVE_MESSAGES_HOME ='RECEIVE_MESSAGES_HOME';
export const RECEIVE_DATA_FILTER_MESSAGE ='RECEIVE_DATA_FILTER_MESSAGE';
export const RECEIVE_DATA_UPDATE_PROFILE ='RECEIVE_DATA_UPDATE_PROFILE';
export const SEND_DATA_UPDATE_PROFILE ='SEND_DATA_UPDATE_PROFILE';
export const SEND_DATA_FILTER_HOME_MESSAGE='SEND_DATA_FILTER_HOME_MESSAGE';
export const SEND_MESSAGE_USER= 'SEND_MESSAGE_USER';
export const SEND_DATA_RESET_PASSWORD = 'SEND_DATA_RESET_PASSWORD';
export const SEND_DATA_REGISTER ='SEND_DATA_REGISTER';
export const SEND_DATA_CONNECTION = 'SEND_DATA_CONNECTION';
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

/**
 * Traitements
 */

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESPONSE_CONNECTION:
      return {
        ...state,
        receiveResponseConnection:action.responseConnection
      };

    case RESPONSE_REGISTER:
      return {
        ...state,
        receiveResponseRegister:action.esponseRegister
      };
      
    case RESPONSE_FOR_RESET:
      return {
        ...state,
        receiveResponseForReset:action.responseReset
      };


    case RECEIVE_DATA_CATEGORY:
        return {
          ...state,
          dataCategory:action.allCategory
        };

    case RECEIVE_MESSAGES_HOME:
        return {
          ...state,
          dataMessagesHome:action.allMessageHome
        };

    case RECEIVE_DATA_UPDATE_PROFILE:
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

/**
 * Export
 */
export default reducer;

