/**
 * Initial State
 */
const initialState = {
  receiveResponseConnection: undefined,
  receiveResponseRegister:undefined,
  receiveResponseForReset:undefined,
  dataMessages:undefined,
  dataCategory:undefined,
  dataMessagesHome:undefined,
  dataProfileUser:undefined,
  receiveDataFilter:undefined
  
};

/**
 * Types
 */

export const RESPONSE_CONNECTION = 'REPONSE_CONNECTION';
export const RESPONSE_REGISTER = 'REPONSE_REGISTER';
export const RESPONSE_FOR_RESET = ' RESPONSE_FOR_RESET';
export const RECEIVE_DATA_MESSAGE='RECEIVE_DATA_MESSAGE';
export const RECEIVE_DATA_CATEGORY ='RECEIVE_DATA_CATEGORY';
export const RECEIVE_MESSAGES_HOME ='RECEIVE_MESSAGES_HOME';
export const RECEIVE_DATA_FILTER_MESSAGE ='RECEIVE_DATA_FILTER_MESSAGE';
export const RECEIVE_DATA_UPDATE_PROFILE ='RECEIVE_DATA_UPDATE_PROFILE';
export const SEND_DATA_UPDATE_PROFILE ='SEND_DATA_UPDATE_PROFILE';
export const SEND_DATA_FILTER_MESSAGE='SEND_DATA_FILTER_MESSAGE';
export const SEND_MESSAGE_USER= 'SEND_MESSAGE_USER';
export const SEND_DATA_RESET_PASSWORD = 'SEND_DATA_RESET_PASSWORD';
export const SEND_DATA_REGISTER ='SEND_DATA_REGISTER';
export const SEND_DATA_CONNECTION = 'SEND_DATA_CONNECTION';
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

    case RECEIVE_DATA_MESSAGE:
          return {
            ...state,
            dataMessages:action.allMessage
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
      receiveDataFilter:action.text
    };
    default:
      return state;
  }
};



/**
 * Action Creators
 */
export const sendDataConnection = (login,password) => ({
  type: SEND_DATA_CONNECTION,
  login,
  password
});

export const sendDataRegister = (login , email , password , confPWD) =>({
  type: SEND_DATA_REGISTER,
  login,
  email,
  password,
  confPWD
})

export const sendDataResetPassword= (email) =>({
  type: SEND_DATA_RESET_PASSWORD,
  email,
 
})

export const sendMessageUser =( message ) =>({
  type: SEND_MESSAGE_USER,
  message
})

export const sendDataUpdateProfile=(login , email , password , confPwd)=>({
  type:SEND_DATA_UPDATE_PROFILE,
  login,
  email,
  password,
  confPwd

})

export const responseConnection = (responseConnection) => ({
  type: RESPONSE_CONNECTION,
  responseConnection,

});

export const responseRegister = (responseRegister) => ({
  type: RESPONSE_REGISTER,
  responseRegister,

});

export const responseForReset= (responseReset) => ({
  type: RESPONSE_FOR_RESET,
  responseReset,

});

export const receiveDataMessages=(allMessage)=>({
  type:RECEIVE_DATA_MESSAGE,
  allMessage
})

export const receiveDataCategory=(allCategory)=>({
  type:RECEIVE_DATA_CATEGORY,
  allCategory
})

export const receiveMessagesHome=(allMessageHome)=>({
  type:RECEIVE_MESSAGES_HOME,
  allMessageHome
})


export const receiveDataUpdateProfile=(ProfileUser)=>({
  type:RECEIVE_DATA_UPDATE_PROFILE,
  ProfileUser
})

export const sendDatafilterMessage=(text)=>({
 type: SEND_DATA_FILTER_MESSAGE,
 text
})

export const receiveDataFilterMessage=(text)=>({
  type: RECEIVE_DATA_FILTER_MESSAGE,
  text
})
/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;

