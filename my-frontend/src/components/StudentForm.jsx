function StudentForm({
  form,
  setForm,
  editingId,
  onSubmit,
  onCancel,
  loading
}) {

  const updateField = (event) => {

    const {
      name,
      value
    } = event.target;

    setForm(
      (previous) => ({
        ...previous,
        [name]: value
      })
    );
  };


  return (

    <section className="card">

      <div className="section-heading">

        <div>

          <h2>
            {editingId === null
              ? "Add Student"
              : "Update Student"}
          </h2>

          <p>

            {editingId === null
              ? "Enter the student's details below."
              : `Editing student ID ${editingId}.`}

          </p>

        </div>

      </div>


      <form
        className="student-form"
        onSubmit={onSubmit}
      >


        {/* Student ID */}

        <div className="field">

          <label htmlFor="id">
            Student ID
          </label>

          <input
            id="id"
            name="id"
            type="number"
            min="1"
            value={form.id}
            onChange={updateField}
            placeholder="e.g. 101"
            required
            disabled={editingId !== null}
          />

        </div>


        {/* Name */}

        <div className="field">

          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={updateField}
            placeholder="Enter full name"
            required
          />

        </div>


        {/* Email */}

        <div className="field">

          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="student@example.com"
            required
          />

        </div>


        {/* Branch */}

        <div className="field">

          <label htmlFor="branch">
            Branch
          </label>

          <select
            id="branch"
            name="branch"
            value={form.branch}
            onChange={updateField}
            required
          >

            <option value="">
              Select branch
            </option>

            <option value="CSE">
              CSE
            </option>

            <option value="CS">
              CS
            </option>

            <option value="IT">
              IT
            </option>

            <option value="ECE">
              ECE
            </option>

          </select>

        </div>


        {/* Semester */}

        <div className="field">

          <label htmlFor="semester">
            Semester
          </label>

          <select
            id="semester"
            name="semester"
            value={form.semester}
            onChange={updateField}
            required
          >

            <option value="">
              Select semester
            </option>

            {[1,2,3,4,5,6,7,8].map(
              (semester) => (

                <option
                  key={semester}
                  value={semester}
                >
                  {semester}
                </option>

              )
            )}

          </select>

        </div>


        {/* Mobile */}

        <div className="field">

          <label htmlFor="mobile">
            Mobile Number
          </label>

          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength="10"
            value={form.mobile}
            onChange={updateField}
            placeholder="10-digit mobile"
            required
          />

        </div>


        {/* Buttons */}

        <div className="form-actions">

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Please wait..."
              : editingId === null
                ? "Add Student"
                : "Update Student"}

          </button>


          {editingId !== null && (

            <button
              className="secondary-btn"
              type="button"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>

          )}

        </div>

      </form>

    </section>
  );
}

export default StudentForm;