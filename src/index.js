const express = require('express');
const path = require('path');

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
