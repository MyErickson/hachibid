/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import Category from '../../components/Category/Category'

// Action Creators
import { dataAllCategory,sendDataFilterCategory } from '../../store/actionCreator/Category';
import { receiveDataMessagesCategory} from '../../store/actionCreator/MessageCategory';
/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
    dataMessagesHome: state.dataMessagesHome,
    dataStateAllCategory:state.dataAllCategory,
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
  dataAllCategory: (token) => {
    dispatch(dataAllCategory(token));
  },
  sendDataFilterCategory:(text)=>{
      dispatch(sendDataFilterCategory(text));
  },
  receiveDataMessagesCategory:(data)=>{
    dispatch(receiveDataMessagesCategory(data))
  }
});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Category);



/**
 * Export
 */
export default CategoryContainer;