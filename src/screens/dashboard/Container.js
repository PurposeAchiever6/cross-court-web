import { compose } from 'redux';
import { connect } from 'react-redux';
import DashboardPage from './DashboardPage';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardPage);
