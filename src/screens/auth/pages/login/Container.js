import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { loginInit } from 'screens/auth/actionCreators';
import { getLoginLoading, getLoginError } from 'screens/auth/reducer';
import LoginPage from './LoginPage';

const mapStateToProps = state => ({
  isLoading: getLoginLoading(state),
  error: getLoginError(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ loginInit }, dispatch),
});
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginPage);
