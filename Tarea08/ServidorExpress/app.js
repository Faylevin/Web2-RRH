const express = require('express');
const app = express();
const port = 3036; // puedes usar otro número distinto al del primer servidor

app.get('/', (req, res) => {
  res.type('text/plain'); // indica que es texto plano
  res.send('Express');
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://127.0.0.1:${port}`);
});
