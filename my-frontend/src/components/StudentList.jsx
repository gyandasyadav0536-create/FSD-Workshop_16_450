function StudentList({
  students,
  onEdit,
  onDelete,
  loading,
  hasSearch
}) {

  if (
    loading &&
    students.length === 0
  ) {

    return (
      <div className="empty-state">
        Loading students...
      </div>
    );
  }


  if (students.length === 0) {

    return (

      <div className="empty-state">

        <div className="empty-icon">
          ⌕
        </div>

        <h3>

          {hasSearch
            ? "No student found"
            : "No students available"}

        </h3>

        <p>

          {hasSearch
            ? "Try another student ID or name."
            : "Add a student using the form above."}

        </p>

      </div>
    );
  }


  return (

    <div className="table-wrapper">

      <table>

        <thead>

          <tr>

            <th>
              Student ID
            </th>

            <th>
              Name
            </th>

            <th>
              Email
            </th>

            <th>
              Branch
            </th>

            <th>
              Semester
            </th>

            <th>
              Mobile Number
            </th>

            <th>
              Actions
            </th>

          </tr>

        </thead>


        <tbody>

          {students.map(
            (student) => (

              <tr key={student.id}>

                <td className="id-cell">
                  {student.id}
                </td>

                <td className="name-cell">
                  {student.name}
                </td>

                <td>
                  {student.email}
                </td>

                <td>

                  <span className="badge">
                    {student.branch}
                  </span>

                </td>

                <td>
                  {student.semester}
                </td>

                <td>
                  {student.mobile}
                </td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        onEdit(student)
                      }
                      type="button"
                    >
                      Edit
                    </button>


                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDelete(student.id)
                      }
                      type="button"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default StudentList;