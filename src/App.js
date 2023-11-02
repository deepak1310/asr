import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const colors = ['orange', 'white', 'green'];
  const dotStyle = { marginRight: '5px' };
  const [dotSequence, setDotSequence] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setDotSequence((dotSequence) => (dotSequence + 1) % 3);
      }, 500);
    } else {
      setDotSequence(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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

  const renderRecordingText = () => {
    let dots = [];
    for (let i = 0; i < dotSequence + 1; i++) {
      dots.push(
        <span key={i} style={{ ...dotStyle, color: colors[i] }}>
          •
        </span>
      );
    }
    return dots;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Audio Translation App</h1>
      <button
        onClick={handleRecordAndTranscribe}
        style={{
          backgroundColor: isRecording ? 'black' : 'green',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled={isRecording}
      >
        {isRecording ? renderRecordingText() : <i className="fas fa-microphone" style={{ marginRight: '5px' }}></i>}
      </button>
      {transcript && <div style={{ marginTop: '20px' }}>{transcript}</div>}
    </div>
  );
}

export default App;

