var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){
    app.get('/inventory/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('inventory').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});

    app.post('/inventory', (req, res) => {
		const item = { name: req.body.name, qty: req.body.qty, price: req.body.price };
		db.collection('inventory').insert(item, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send('Added successfully');
                // res.send(result.ops[0]);
			}
		});
	});

    app.delete('/inventory/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('inventory').remove(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send('Item ' + id + ' deleted!');
			}
		});
	});

    app.put('/inventory/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		const focusItem = { name: req.body.name, qty: req.body.qty, price: req.body.price };
		db.collection('inventory').replaceOne(details, focusItem, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});
}