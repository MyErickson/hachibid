/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import AlertNotification from '../../components/AlertDialog/AlertNotification'

// Action Creators
import { dataAllCategory,sendDataFilterCategory } from '../../store/actionCreator/Category';
import { receiveDataMessagesCategory} from '../../store/actionCreator/MessageCategory';


const mapStateToProps = (state, ownProps) => ({

    dataStateAllCategory:state.dataAllCategory,
    receiveResponseConnection:state.receiveResponseConnection
});


const mapDispatchToProps = (dispatch, ownProps) => ({
    dataAllCategory: (token) => {
        dispatch(dataAllCategory(token));
      },
});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const AlertNotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertNotification);



/**
 * Export
 */
export default AlertNotificationContainer;