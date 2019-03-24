import { connect } from 'react-redux';
import Students from '../routes/Students';
import { fetchStudents } from '../actions/students';

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  students: state.students.students
});

const mapDispatchToProps = dispatch => ({
  fetchStudents() {
    dispatch(fetchStudents());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);