/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import Notification from '../../components/Notification/Notification'

// Action Creators
import {notificationPrecision} from '../../store/actionCreator/Notification'

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
    notificationQuestions: state.allDataMessagesHome,
    dataStateAllCategory:state.dataAllCategory,
    receiveResponseConnection: state.receiveResponseConnection,
    dataProfileUser: state.dataProfileUser,
    allPrecision:state.allPrecision,
    answerUser:state.answerUser
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  notificationQuestion: (data) => {
    dispatch(notificationQuestion(data));
  },
  notificationPrecision:(data)=>{
      dispatch(notificationPrecision(data));
  }
});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification);



/**
 * Export
 */
export default NotificationContainer;