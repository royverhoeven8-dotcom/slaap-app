const express = require('express');
const path = require('path');
const app = express();


const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname);

app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'docs', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
