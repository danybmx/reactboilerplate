import mongoose from 'mongoose';
import config from '../config';

// Bootstrap db connection
const db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});


// Globbing model files
config.getGlobbedFiles(__dirname + '/app/models/**/*.js').forEach(function(modelPath) {
	require(path.resolve(modelPath));
});
