/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import MessageCategory from '../../components/MessageCategory/MessageCategory'

// Action Creators
import { receiveDataMessagesCategory,sendDatafilterMessageCategory, dataFilterMessagesCategory } from '../../store/actionCreator/MessageCategory';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
   dataMessagesCategory: state.dataMessagesCategory,
   filterMessagesCategory:state.filterMessagesCategory,
   receiveResponseConnection: state.receiveResponseConnection,
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
    receiveDataMessagesCategory: (data) => {
    dispatch(receiveDataMessagesCategory(data));
  },
  sendDatafilterMessageCategory:(text)=>{
      dispatch(sendDatafilterMessageCategory(text));
  },
  dataFilterMessagesCategory:()=>{
    dispatch(dataFilterMessagesCategory(undefined))
  }

});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const MessageCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageCategory);



/**
 * Export
 */
export default MessageCategoryContainer;