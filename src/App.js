import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      console.log("Raw JSON input:", jsonInput);
      const parsedJson = JSON.parse(jsonInput);
      console.log("Parsed JSON:", parsedJson);
      const result = await axios.post('http://127.0.0.1:5000/bfhl', parsedJson);
      console.log("Server response:", result.data);
      setResponse(result.data);
      setError('');
    } catch (err) {
      console.error("Error:", err);
      setError('Invalid JSON input or server error');
      setResponse(null);
    }
  };

  const handleFilterChange = (selectedOptions) => {
    setFilter(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Assesment App</h1>
      <input
        type="text"
        placeholder='Enter JSON'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <label>Filter response: </label>
          <Select
            isMulti
            options={[
              { value: 'numbers', label: 'Numbers' },
              { value: 'alphabets', label: 'Alphabets' },
              { value: 'highest_alphabet', label: 'Highest Alphabet' },
            ]}
            onChange={handleFilterChange}
          />
          <pre>{JSON.stringify(response, filter, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
