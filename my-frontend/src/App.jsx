import {
  useEffect,
  useMemo,
  useState
} from "react";

import axios from "axios";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchStudent from "./components/SearchStudent";


const API_URL =
  "http://localhost:5000/api/students";


const emptyStudent = {
  id: "",
  name: "",
  email: "",
  branch: "",
  semester: "",
  mobile: ""
};


function App() {

  const [students, setStudents] =
    useState([]);

  const [form, setForm] =
    useState(emptyStudent);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("success");

  const [loading, setLoading] =
    useState(false);


  // Show notification
  const showMessage = (
    text,
    type = "success"
  ) => {

    setMessage(text);

    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3500);
  };


  // Get all students
  const fetchStudents = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(API_URL);

      setStudents(response.data);

    } catch (error) {

      showMessage(
        error.response?.data?.message ||
        "Could not connect to backend.",
        "error"
      );

    } finally {

      setLoading(false);
    }
  };


  // Fetch students when page loads
  useEffect(() => {

    fetchStudents();

  }, []);


  // Add / Update
  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);

      if (editingId === null) {

        const response =
          await axios.post(
            API_URL,
            form
          );

        showMessage(
          response.data.message,
          "success"
        );

      } else {

        const response =
          await axios.put(
            `${API_URL}/${editingId}`,
            form
          );

        showMessage(
          response.data.message,
          "success"
        );
      }


      setForm(emptyStudent);

      setEditingId(null);

      await fetchStudents();

    } catch (error) {

      const errors =
        error.response?.data?.errors;

      const firstError =
        errors
          ? Object.values(errors)[0]
          : null;

      showMessage(
        firstError ||
        error.response?.data?.message ||
        "Something went wrong.",
        "error"
      );

    } finally {

      setLoading(false);
    }
  };


  // Edit
  const handleEdit = (student) => {

    setEditingId(student.id);

    setForm({
      id: student.id,
      name: student.name,
      email: student.email,
      branch: student.branch,
      semester: student.semester,
      mobile: student.mobile
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // Delete
  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmed) {
      return;
    }

    try {

      setLoading(true);

      const response =
        await axios.delete(
          `${API_URL}/${id}`
        );

      showMessage(
        response.data.message,
        "success"
      );

      await fetchStudents();

    } catch (error) {

      showMessage(
        error.response?.data?.message ||
        "Could not delete student.",
        "error"
      );

    } finally {

      setLoading(false);
    }
  };


  // Cancel editing
  const handleCancelEdit = () => {

    setEditingId(null);

    setForm(emptyStudent);
  };


  // Search
  const filteredStudents =
    useMemo(() => {

      const query =
        search.trim().toLowerCase();

      if (!query) {
        return students;
      }

      return students.filter(
        (student) =>

          String(student.id)
            .includes(query) ||

          student.name
            .toLowerCase()
            .includes(query)
      );

    }, [students, search]);


  return (

    <div className="app">

      {/* Header */}

      <header className="header">

        <div className="header-inner">

          <div>

            <p className="eyebrow">
              Full Stack Development Workshop
            </p>

            <h1>
              Student Management System
            </h1>

            <p className="subtitle">
              Manage student records using
              React, Node.js and Express.
            </p>

          </div>


          <div className="count-card">

            <span>
              Total Students
            </span>

            <strong>
              {students.length}
            </strong>

          </div>

        </div>

      </header>


      <main className="container">

        {/* Notification */}

        {message && (

          <div
            className={`notification ${messageType}`}
          >
            {message}
          </div>

        )}


        {/* Form */}

        <StudentForm

          form={form}

          setForm={setForm}

          editingId={editingId}

          onSubmit={handleSubmit}

          onCancel={handleCancelEdit}

          loading={loading}

        />


        {/* Student list */}

        <section className="card">

          <div className="section-heading">

            <div>

              <h2>
                Student Records
              </h2>

              <p>
                View, search, edit and delete
                student records.
              </p>

            </div>


            <SearchStudent

              search={search}

              setSearch={setSearch}

            />

          </div>


          <StudentList

            students={filteredStudents}

            onEdit={handleEdit}

            onDelete={handleDelete}

            loading={loading}

            hasSearch={Boolean(
              search.trim()
            )}

          />

        </section>

      </main>


      <footer>

        <p>
          Student Management System
          {" • "}
          React + Node.js + Express
        </p>

      </footer>

    </div>
  );
}


export default App;