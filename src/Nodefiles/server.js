//curl -X POST -H "Content-Type: application/json" -d "{\"prompt\":\"describe the invention of newton in one sentence\"}" http://localhost:8080/chat


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  //irtaza
 // apiKey: "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",
  // hassan
  // apiKey: "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",
  // jun fasih
  // apiKey: "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",
  // mar fasih
  // apiKey: "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",
  // Junaid Fast
  //apiKey : "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",
  // Fouzia
   apiKey : "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", 
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;
  

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048,
    temperature: 1,
  });
  res.send(completion.data.choices[0].text);
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});