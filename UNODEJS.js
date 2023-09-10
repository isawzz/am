
//#region app.js
const express = require('express');
const app = express();
const port = 3000; // Change this to your preferred port

// Middleware to parse incoming JSON data
app.use(express.json());

// Serve a simple HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle POST request
app.post('/submit', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // You can now use the username and password as needed
  console.log('Received username:', username);
  console.log('Received password:', password);
  
  res.send('Data received successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//#endregion








app.get('/', (req, res) => {
  //console.log('req',Object.keys(req))
  for(const k in req){
    if (typeof req[k] == 'string') console.log(k,req[k]); else console.log('obj:',k)

  }
  //console.log('req',Object.keys(req))
  for(const k in res){
    if (typeof res[k] == 'string') console.log(k,res[k]); else console.log('obj:',k)
  }
  // console.log('url',req.url,req.originalUrl)
  // console.log('res',Object.keys(res))
  const filePath = path.join(__dirname, 'index.html'); // Replace with the actual path to your file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('GET error:', err);
    } else {
      console.log('GET successfull!');
    }
  });
});
app.post('/post', function (req, res) {
	console.log('body',req.body);
	res.send('wieso');
});

app.get('/', (req, res) => {
  //console.log('req',Object.keys(req))
  for(const k in req){
    if (typeof req[k] == 'string') console.log(k,req[k]); else console.log('obj:',k)

  }
  //console.log('req',Object.keys(req))
  for(const k in res){
    if (typeof res[k] == 'string') console.log(k,res[k]); else console.log('obj:',k)
  }
  // console.log('url',req.url,req.originalUrl)
  // console.log('res',Object.keys(res))
  const filePath = path.join(__dirname, 'index.html'); // Replace with the actual path to your file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('GET error:', err);
    } else {
      console.log('GET successfull!');
    }
  });
});




//_________________
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
