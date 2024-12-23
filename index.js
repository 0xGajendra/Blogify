const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const path = require('path');


app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))

app.get('/', (req, res) => {
    res.render('home');
}
);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});