import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordAndTranscribe = async () => {
    setIsRecording(true);
    try {
      const response = await axios.get('http://localhost:5000/');
      setTranscript(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Audio Translation App</h1>
      <button
        onClick={handleRecordAndTranscribe}
        style={{ backgroundColor: isRecording ? 'red' : 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginTop: '20px' }}
        disabled={isRecording}
      >
        {isRecording ? 'Recording...' : 'Record and Transcribe'}
      </button>
      {transcript && <div style={{ marginTop: '20px' }}>{transcript}</div>}
    </div>
  );
}

export default App;

