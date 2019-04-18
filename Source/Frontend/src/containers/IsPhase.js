import { connect } from 'react-redux';
import IsPhase from '../components/IsPhase';

const mapStateToProps = (state, ownProps) => ({
  inputPhase: ownProps.phase,
  phase: state.auth.phase,
  elseMessage: ownProps.elseMessage,
});

export default connect(mapStateToProps)(IsPhase);