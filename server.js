const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const appName = process.env.APP_NAME;

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  console.log(`Request is served by ${appName}`);
});

// Serve static files (css, js, images, etc.)
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`${appName} is running at http://localhost:${PORT}`);
});
