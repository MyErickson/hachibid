/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import MyQuestions from '../../components/MyQuestions/MyQuestions'

// Action Creators
import { sendMessageUser ,receiveDataMessagesMyQuestions} from '../../store/actionCreator/MessageCategory'

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
  dataMessagesMyQuestions: state.dataMessagesMyQuestions,
  dataProfileUser: state.dataProfileUser,
});

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
  receiveDataMessagesMyQuestions:(id)=>{
    dispatch(receiveDataMessagesMyQuestions(id))
  }
});

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