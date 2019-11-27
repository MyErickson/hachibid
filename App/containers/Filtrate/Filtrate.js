/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import Filtrate from '../../components/Filtrate/Filtrate'

// Action Creators

import { receiveDatafilterMessageMyQuestion} from '../../store/actionCreator/MyQuestions'
/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
    // currentNotification:state.currentNotification
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch, ownProps) => ({

  receiveDatafilterMessageMyQuestion:()=>{
    dispatch( receiveDatafilterMessageMyQuestion(undefined))
  }
})

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const FiltrateContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filtrate);



/**
 * Export
 */
export default FiltrateContainer;