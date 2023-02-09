import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import StudentsGrades from './components/StudentsGrades';
import Navbar from './components/Navbar';
import Subjects from './components/Subjects';
import Students from './components/Students';
import NotFound from './components/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Logout from './components/Logout';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthProvider';

function App() {

/** 
  return (
    <div className="App">
      {!(backendData && backendData.users) ? "Loading..." : backendData.users.map(user => (<p>{user}</p>))}
    </div>
  );
  */
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Navbar />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Subjects />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/:name" element={<StudentsGrades />} />
              <Route path="/subjects/:name/students" element={<Students />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );

}

export default App;
