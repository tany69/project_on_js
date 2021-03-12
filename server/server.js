const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');

const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cartRouter);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf8', (err, data) => {
        if (err) {
            res.send({ result: 0, text: 'error' });
            return;
        }

        res.send(data);
    })
});

app.listen(3000, () => console.log('Server started....'));





// app.get();
// app.post();
// app.put();
// app.delete();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//
// app.get('/api/products', (req, res) => {
//     res.send(JSON.stringify([
//         {name: 'Notebook', price: 2000},
//         {name: 'Notebook', price: 2000},
//         {name: 'Notebook', price: 2000}
//     ]));
// });
//
// app.get('/api/products/:id/:some', (req, res) => {
//     // res.send(req.params.id);
//     res.send(req.query);
// });
//
// app.listen(3000, () => console.log('Server started....'));