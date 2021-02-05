const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.add(new Band('Queen'));
bands.add(new Band('Metalica'));
bands.add(new Band('Jose Jose'));
bands.add(new Band('Alvaro Torrez'));

io.on('connection', (client) => {
	console.log('Connect		=> Client');

	client.on('disconnect', () => {
		console.log('Disconnect	=> Client');
	});

	client.on('mensaje', (payload) => {
		console.log('Mensaje => ', payload);
		io.emit('mensaje', { admin: true });
	});

	client.emit('active-bands', bands.getAll());

	client.on('vote-band', (payload) => {
		bands.vote(payload.id);
		io.emit('active-bands', bands.getAll());
	});

	client.on('add-band', (payload) => {
		const newband = new Band(payload.name);
		bands.add(newband);
		io.emit('active-bands', bands.getAll());
	});

	client.on('delete-band', (payload) => {
		bands.delete(payload.id);
		io.emit('active-bands', bands.getAll());
	});
});
