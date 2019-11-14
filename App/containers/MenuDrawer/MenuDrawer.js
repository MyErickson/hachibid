/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import MenuDrawer from '../../components/Navigation/MenuDrawer'

// Action Creators

import { receiveTopDataCategory } from '../../store/actionCreator/MenuDrawer'
import { dataAllCategory } from '../../store/actionCreator/Category';
import {dataProfileUsers } from '../../store/actionCreator/Profile';
import { receiveDataMessagesCategory,dataFilterMessagesCategory, dataMessagesCategory} from '../../store/actionCreator/MessageCategory';
import { receiveDataMessagesMyQuestions,DataMessagesMyQuestions} from '../../store/actionCreator/MyQuestions'
/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
    topDataCategory: state.topDataCategory,
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
    receiveTopDataCategory:(token)=>{
        dispatch(receiveTopDataCategory(token))
    },
    dataAllCategory: (token) => {
        dispatch(dataAllCategory(token));
      },
    dataProfileUsers:(idUser)=>{
        dispatch(dataProfileUsers(idUser))
    },
    receiveDataMessagesCategory:(data)=>{
        dispatch(receiveDataMessagesCategory(data))
    },
    dataFilterMessagesCategory:()=>{
        dispatch(dataFilterMessagesCategory(undefined))
      },
      dataMessagesCategory:()=>{
          dispatch(dataMessagesCategory(undefined))
      },
      receiveDataMessagesMyQuestions:(data)=>{
        dispatch(receiveDataMessagesMyQuestions(data))
      },
      DataMessagesMyQuestions:()=>{
          dispatch(DataMessagesMyQuestions(undefined))
      }
    
  
});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const  MenuDrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)( MenuDrawer);



/**
 * Export
 */
export default  MenuDrawerContainer;