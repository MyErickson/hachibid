/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
// import Example from 'App/components/Example';
import ResetPassword from '../../components/ResetPassword/ResetPassword'

// Action Creators
import { sendDataConnection } from '../../store/reducer';



const mapStateToProps = (state, ownProps) => ({
    receiveResponseForReset: state.receiveResponseForReset,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
    sendDataForReset: (email) => {
    dispatch(sendDataForReset(email ));
  },
});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
 const ResetPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);



/**
 * Export
 */
export default ResetPasswordContainer;