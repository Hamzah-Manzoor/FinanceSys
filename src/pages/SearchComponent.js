import React, { useState } from 'react';
import axios from 'axios';
import './SearchComponent.css'
function SearchComponent() {
  const [searchResults, setSearchResults] = useState([]);
  const [answer, setAnswer] = useState('');

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      performSearch(transcript);
    };

    recognition.start();
  };

  const performSearch = (query) => {
    axios
      .get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyAo-SJ22kA5mjlqs3LWcpYDUQzsj6DC9xM&cx=95ec33e5150274d95&q=${query}`
      )
      .then((response) => {
        const items = response.data.items || [];
        setSearchResults(items);
        setAnswer(getPreciseAnswer(items));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const getPreciseAnswer = (items) => {
    let answer = '';
  
    if (items && items.length > 0) {
      const answerObject = items.find((item) => item.pagemap?.answerobject);
      if (answerObject && answerObject.pagemap.answerobject[0]?.text) {
        answer = answerObject.pagemap.answerobject[0].text;
      }
    }
  
    return answer;
  };

  return (
    <div className='SearchAssistant'>
      <button id='search-btn' onClick={handleVoiceSearch} >Google Search Assistant</button>
      
      {searchResults.length > 0 && (
        <div>
          <h2 style={{color:'whitesmoke',marginTop:'50px'}}>Search Results:</h2>

          <ul style={{marginTop:'40px'}}>
            {searchResults.map((item) => (
              <li key={item.link}>
                <a href={item.link} style={{ color: 'white' }}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
