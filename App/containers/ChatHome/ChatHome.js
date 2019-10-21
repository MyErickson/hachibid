/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import ChatHome from '../../components/ChatHome/ChatHome'

// Action Creators
import { dataMessagesHome,sendDataFilterHomeMessage } from '../../store/actionCreator/ChatHome';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
    dataMessagesHome: state.dataMessagesHome,
    dataFilterHome:state.dataFilterHome,
    receiveResponseConnection: state.receiveResponseConnection,
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  dataMessagesHome: () => {
    dispatch(dataMessagesHome());
  },
  sendDataFilterHomeMessage:(text)=>{
      dispatch(sendDataFilterHomeMessage(text));
  }
});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const ChatHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatHome);



/**
 * Export
 */
export default ChatHomeContainer;