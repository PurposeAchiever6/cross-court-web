import { compose } from 'redux';
import { connect } from 'react-redux';

import Routes from './Routes';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Routes);
