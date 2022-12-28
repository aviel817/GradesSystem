import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import StudentsGrades from './components/StudentsGrades';
import Navbar from './components/Navbar';
import Subjects from './components/Subjects';
import Students from './components/Students';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

function App() {
  const [backendData, setBackendData] = useState(null)
  
  useEffect(() => {
    fetch("/api")
    .then(response => response.json())
    .then(data => setBackendData(data))
  }, [])

  useEffect(() => {
    console.log(backendData)
  }, [backendData])
/** 
  return (
    <div className="App">
      {!(backendData && backendData.users) ? "Loading..." : backendData.users.map(user => (<p>{user}</p>))}
    </div>
  );
  */
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/studentsgrades" element={<StudentsGrades />} />
        <Route path="/subjects" element={<Subjects />} />
<<<<<<< HEAD
        <Route path="/students" element={<Students />} />
=======
        <Route path="/login" element={<Login />} />
>>>>>>> c6b04424a82e80d0c8fc05a879fe3f60dbe98db2
      </Routes>
    </BrowserRouter>
  );

}

export default App;
