const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'docs');

app.use('/slaap-app', express.static(publicDir));

app.get('/', (req, res) => {
    res.redirect('/slaap-app/index.html');
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
