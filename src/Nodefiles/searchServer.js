const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.get('/search', (req, res) => {
  const { query } = req.query;

  axios
    .get(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyAo-SJ22kA5mjlqs3LWcpYDUQzsj6DC9xM&cx=95ec33e5150274d95&q=${query}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

const PORT = 4000; // Change this to the desired port number

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
