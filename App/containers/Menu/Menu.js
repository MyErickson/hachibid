/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import Menu from '../../components/Menu/Menu'

// Action Creators
import { dataMessagesHome, } from '../../store/actionCreator/ChatHome';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
    notificationQuestion: state.allDataMessagesHome,
    dataProfileUser: state.dataProfileUser,
    receiveResponseConnection: state.receiveResponseConnection,
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
  dataMessagesHome: (token) => {
    dispatch(dataMessagesHome(token));
  },
})

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);



/**
 * Export
 */
export default MenuContainer;