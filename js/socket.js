// Simple Application using Sockets

var os = require('os');

var interfaces = os.networkInterfaces();
for (item in interfaces) {
	console.log('Network interface name: ' + item);
	for (att in interfaces[ item ]) {
		var address = interfaces[item][att];

		console.log('Family: ' + address.family);
		console.log('IP Address: ' + address.address);
		console.log('Is Internal: ' + address.internal);
		console.log('');
	}
	console.log('=============================');
}