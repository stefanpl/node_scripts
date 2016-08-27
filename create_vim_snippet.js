var cp = require('child_process');
var prompt = require('prompt');

prompt.start();

prompt.get('how are you today?', function (err, result) {
	console.log('something has been entered');
	console.log(result);
});
