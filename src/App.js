import React, { useState } from 'react';
import Navbar from './Components/Navbar';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './Components/Home';
import About from './Components/About';
import NoteState from './ContexAPis/Notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {

  const [AlertMessage, setAlertMessage] = useState('');
  // is an function used by parent
  const handlealert = (message, type) => {

    setAlertMessage(
      {
        msg: message,
        typ: type
      }
    );

  }

  return (
    <div >
      <NoteState>
        <Router>
          <Navbar aboutalert={handlealert} />
          <Alert showalert={AlertMessage} />
          <div className='container' >
            <Routes>
              <Route exact path="/" element={<Home aboutalert={handlealert} />} />
              <Route exact path="/about" element={<About  />} />
              <Route exact path="/login" element={<Login aboutalert={handlealert} />} />
              <Route exact path="/signup" element={<Signup aboutalert={handlealert} />} />
            </Routes>
          </div>
        </Router>

      </NoteState>
    </div>
  );
}

export default App;
