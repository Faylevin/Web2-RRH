const express = require('express');
const app = express();
const port = 3036; 

app.get('/', (req, res) => {
  res.type('text/plain'); 
  res.send('Express');
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://127.0.0.1:${port}`);
});
