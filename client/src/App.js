import React from 'react'
import {useEffect, useState} from 'react'

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

  return (
    <div className="App">
      {!(backendData && backendData.users) ? "Loading..." : backendData.users.map(user => (<p>{user}</p>))}
    </div>
  );
}

export default App;
