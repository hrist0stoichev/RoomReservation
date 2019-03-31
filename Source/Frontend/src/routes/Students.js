import React from 'react';
import MainLayout from '../components/MainLayout';
import StudentsGrid from '../components/Students/StudentsGrid';

class Students extends React.Component {
  componentWillMount() {
    this.props.fetchStudents();
  }

  render() {
    return (
      <div id="students">
        <MainLayout
          title="Students"
          secondaryNav={[
            {
              title: 'All Students',
              href: '/students/'
            },
            {
              title: 'Create Student',
              href: '/students/create'
            },
            {
              title: 'Bulk Add Students',
              href: '/students/bulk-add'
            }
          ]}
        >
          <StudentsGrid students={this.props.students} isLoading={this.props.isLoading} accessToken={this.props.accessToken} fetchStudents={this.props.fetchStudents} />
        </MainLayout>
      </div>
    );
  }
}

export default Students;
