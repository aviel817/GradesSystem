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
        <Route path="/" element={<Subjects />} />
        <Route path="/studentsgrades" element={<StudentsGrades />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/students" element={<Students />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;