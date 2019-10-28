/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import Profile from '../../components/Profile/Profile';

// Action Creators
import { sendDataUpdateProfile ,dataProfileUsers ,initializeState} from '../../store/actionCreator/Profile';
import {responseConnection} from '../../store/actionCreator/Connection';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
    dataProfileUser: state.dataProfileUser,
    receiveResponseConnection:state.receiveResponseConnection
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  sendDataUpdateProfile: (data) => {
    dispatch(sendDataUpdateProfile(data));
  },
  dataProfileUsers:(idUser)=>{
    dispatch(dataProfileUsers(idUser))
  },
    responseConnection:(token)=>{
    dispatch(responseConnection(token))
  },
  initializeState:()=>{
    dispatch(initializeState())
  }
 
});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);



/**
 * Export
 */
export default ProfileContainer;