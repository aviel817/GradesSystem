import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import StudentsGrades from './components/StudentsGrades';
import Navbar from './components/Navbar';
import Subjects from './components/Subjects';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/studentsgrades" element={<StudentsGrades />} />
        <Route path="/subjects" element={<Subjects />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
