const config = require('./config');
let io = require('socket.io').listen(config.socketPort);
io.sockets.on('connection', (socket) => {
	socket.on('join', (data) => {
		//io.sockets.emit('userJoined', data);
		socket.broadcast.emit('userJoined', data);
		socket.username = data.username;
	});

	socket.on('ping', (data, done) => {
		if (data.username !== undefined && data.username !== '' && data.username !== null) {
			socket.broadcast.emit('ping', { success: true, username: data.username });
		} else {
			socket.emit('ping', { success: false, message: 'Username not provided' });
		}
		done('ACK');
	});

	socket.on('pong', (data) => {
		console.log('CLIENT SAYS: ', data);
	});

	socket.on('disconnect', () => {
		socket.broadcast.emit('userDisconnected', { username: socket.username });
	});
});
