const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
app.use(cors());
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

console.log('Boo is running.');