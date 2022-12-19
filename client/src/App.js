import React from 'react'
import {useEffect, useState} from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("/api")
    .then(
      response => {
        return response.json()
      }
    ).then(
      data => setBackendData(data)
    )
  }, [])

  return (
    <div className="App">
      {backendData.users.map(user => (<p>{user}</p>))}
    </div>
  );
}

export default App;
