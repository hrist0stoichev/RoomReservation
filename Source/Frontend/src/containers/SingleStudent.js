import { connect } from 'react-redux';
import SingleStudent from '../routes/SingleStudent';

const mapStateToProps = state => ({
  students: state.students.students,
});

export default connect(mapStateToProps)(SingleStudent);
