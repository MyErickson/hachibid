/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import Connection from '../../components/Connection/Connection'

// Action Creators
import { sendDataConnection,responseConnection} from '../../store/actionCreator/Connection';
import { dataProfileUsers } from '../../store/actionCreator/Profile';
/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
    receiveResponseConnection:state.receiveResponseConnection,
   
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  sendDataConnection: (login , password ) => {
    dispatch(sendDataConnection(login , password));
  },
  responseConnection:(token)=>{
    dispatch(responseConnection(token))
  },
  dataProfileUsers:(idUser)=>{
    dispatch(dataProfileUsers(idUser))
  },
 


});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const ConnectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Connection);



/**
 * Export
 */
export default ConnectionContainer;