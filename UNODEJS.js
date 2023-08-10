const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const staticPath = __dirname; // path.join(__dirname, '.'); //relative to appnode.js!!!
app.use(express.static(staticPath));

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Handle POST request to save data
app.post('/saveData', (req, res) => {
  // Process the data from the request (you can save it to a file, database, etc.)
  const data = req.body;
  console.log('Received data:', typeof(data));

  // fs.writeFile('output.txt', data, (err) => {
  //   if (err) {
  //     console.error('Error saving the file:', err);
  //   } else {
  //     console.log('Data saved successfully!');
  //   }
  // });

  // Respond with a success message
  res.json({ data: data, message: 'Data saved successfully!' });
});
// app.get('/', (req, res) => { res.sendFile(__dirname + '\\node0\\index.html'); });
// app.get('/', (req, res) => { res.sendFile(__dirname + 'index.html'); });
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'node0', 'index.html')); });

// Start the server
const port = 4001; // You can use any available port
app.listen(port, () => {  console.log(`Server is running on http://localhost:${port}`);});
