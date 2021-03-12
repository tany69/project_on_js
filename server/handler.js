const cart = require('./cart');
const fs = require('fs');

const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            res.send({ result: 0, text: 'error' });
            return;
        }

        let newCart = cart[action](JSON.parse(data), req);
        fs.writeFile(file, newCart, (err) => {
            if (err) {
                res.send({ result: 0, text: 'error' });
                return;
            }

            res.send({ result: 1, text: 'error' })
            //ÇÄÅÑÜ ÇÀÏÈÑÛÂÀÅÌ Â ÔÀÉË ÄÅÉÑÒÂÈÅ Ñ ÝËÅÌÅÍÒÎÌ ÊÎÐÇÈÍÛ
            // let stroka= JSON.stringify({
            // moment().format('MMMM Do YYYY, h:mm:ss a')
            // })
            // fs.writeFile('stat.json', 'i\'m new', (err) => {
            //    if (err) {
            //        console.log(err);
            //    }
            // });
            //-----------------
        })
    })
};

module.exports = handler;