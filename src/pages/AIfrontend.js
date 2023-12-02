import axios from "axios";
import { useState } from "react";

export default function AIfrontend() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const handleRecognitionResult = (event) => {
    event.preventDefault();
    // Clear the prompt state
    setPrompt("");
    const { transcript } = event.results[0][0];

    // Clean up the transcript before using it as the prompt
    const cleanedPrompt = transcript.trim();
    setPrompt(cleanedPrompt);
    
    // Send a request to the server with the cleaned prompt
    axios
      .post("http://localhost:8000/chat", { prompt:cleanedPrompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
        
        // Only speak the response if it's less than 100 characters
        if (res.data.length < 200) {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(String(res.data));
          synth.speak(utterance);
          setPrompt("");
        }
      })
      .catch((err) => {
        console.error(err);
      });
      
  };

  const handleStartListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = handleRecognitionResult;
    recognition.start();
  };

  const handleLogout=()=>{
    window.location.reload();
    window.location.href = 'http://localhost:3000';
  }


  return (
    <div>
     
        <button onClick={handleStartListening}
        style={{ 
                  backgroundColor: "darkgreen", 
                  color: "white", 
                  padding: "8px",
                  cursor: 'pointer', // cursor style
                }
                }
                  
              
        >
         AI assist
        </button> 
        <button style={{backgroundColor:'red', marginTop:'100px'}} onClick={handleLogout}>LOG OUT</button>


      
     
    </div>
  );
}