const express = require('express');
const path = require('path');
const app = express();

//app.use(express.static(__dirname))
const staticPath = path.join(__dirname, '..', '..');
console.log('fetching from ',staticPath)
app.use(express.static(staticPath));

app.use(express.json());

//console.log('__dirname',__dirname)
app.get('/test', (req, res) => { res.send(__dirname + '\\index.html'); });
app.get('/', (req, res) => { res.sendFile(__dirname + '\\index.html'); });


app.listen(4044);











