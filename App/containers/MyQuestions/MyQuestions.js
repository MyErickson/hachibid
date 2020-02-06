/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import MyQuestions from '../../components/MyQuestions/MyQuestions'
import { dataMessagesHome,sendDataFilterHomeMessage,receiveMessagesHome,askPrecision} from '../../store/actionCreator/ChatHome';
// Action Creators
import { sendMessageUser ,
        receiveDataMessagesMyQuestions,
        receivePrecision,
        sendDatafilterMessageMyQuestion,
        sendAnswersForQuestion,
        sendPrecisionForQuestion,DataMessagesMyQuestions,receiveDatafilterMessageMyQuestion} from '../../store/actionCreator/MyQuestions'
import { notificationPrecision,GetQuestionNoValid} from '../../store/actionCreator/Notification'
import {sendDatafilterMessageCategory, } from '../../store/actionCreator/MessageCategory';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
  allDataMessagesHome: state.allDataMessagesHome,
  dataMessagesMyQuestions: state.dataMessagesMyQuestions,
  dataProfileUser: state.dataProfileUser,
  receiveResponseConnection: state.receiveResponseConnection,
  dataFilterMyquestion:state.dataFilterMyquestion,
  currentNotification:state.currentNotification,
  dataFilterHome:state.dataFilterHome,

} );

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  sendMessageUser: (message ) => {
    dispatch(sendMessageUser(message));
  },
  receiveDataMessagesMyQuestions:(data)=>{
    dispatch(receiveDataMessagesMyQuestions(data))
  },
  receivePrecision:(data)=>{
    dispatch(receivePrecision(data))
  },
  sendDatafilterMessageMyQuestion:(data)=>{
    dispatch(sendDatafilterMessageMyQuestion(data))
  },
  dataMessagesHome: (token) => {
    dispatch(dataMessagesHome(token));
  },
  sendAnswersForQuestion :(data)=>{
    dispatch(sendAnswersForQuestion (data))
  },
  sendPrecisionForQuestion:(data)=>{
    dispatch(sendPrecisionForQuestion(data))
  },  sendDataFilterHomeMessage:(data)=>{
    dispatch(sendDataFilterHomeMessage(data));
  },
  receiveMessagesHome:()=>{
    dispatch(receiveMessagesHome(undefined))
  },
  DataMessagesMyQuestions:()=>{
    dispatch(DataMessagesMyQuestions(undefined))
  },
  notificationPrecision:(data)=>{
    dispatch(notificationPrecision(data))
  },
  receiveDatafilterMessageMyQuestion:()=>{
    dispatch( receiveDatafilterMessageMyQuestion(undefined))
  },
  sendDatafilterMessageCategory:(text)=>{
    dispatch(sendDatafilterMessageCategory(text));
  },
  askPrecision:(data)=>{
    dispatch(askPrecision(data))
  },
  GetQuestionNoValid:(data)=>{
    dispatch(GetQuestionNoValid(data))
  }

})
// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const MyQuestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyQuestions);



/**
 * Export
 */
export default MyQuestionsContainer;