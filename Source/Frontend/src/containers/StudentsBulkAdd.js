import { connect } from 'react-redux';
import StudentsBulkAdd from '../routes/StudentsBulkAdd';
import { bulkAddStudents, studentsBulkAddDone } from '../actions/students';

const mapStateToProps = state => ({
  isDone: state.students.bulkAddIsDone,
});

const mapDispatchToProps = dispatch => ({
  bulkAddStudents(data) {
    dispatch(bulkAddStudents(data));
  },

  bulkAddDone(isDone) {
    dispatch(studentsBulkAddDone(isDone));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsBulkAdd);