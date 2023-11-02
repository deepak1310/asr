import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [transcript, setTranscript] = useState('');

  const handleRecordAndTranscribe = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      setTranscript(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Audio Translation App</h1>
      <button onClick={handleRecordAndTranscribe}>Record and Transcribe</button>
      {transcript && <div style={{ marginTop: '20px' }}>{transcript}</div>}
    </div>
  );
}

export default App;

