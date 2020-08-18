const newman = require('newman');
const reporters = ['cli', 'html'];
const formatReport = 'html';
const reportTemplate = 'custom-template.hbs';
const postmanEnv = 'postman_environment.json';
const output = 'output';

function callNewman(collections, path, basePath) {
	newmanCall = new Promise(function (resolve, reject) {
		newman.run(buildNewmanRequest(collections.pop(), path, basePath))
		.on('start', function (err, args) {
			console.log('Running a collection...');
		}).on('done', function (err, summary) {
			if (err || summary.error) {
				console.error('Collection run encountered an error.');
				console.error(err !== null ? err : summary.err);
				reject(err !== null ? err : summary.err);
			}
			else {
				console.log('Collection run completed.');
				resolve(summary);
			}
		});
	});

	newmanCall.then((summary) => {
		if (collections.length > 0) {
			callNewman(collections, path, basePath);
		}
	});

}

function buildNewmanRequest(collection, path, basePath) {
	let collectionFile = collection.collectionFile;
	let collectionsDir = collection.collectionsDir;
	return {
		collection: require(`${collectionsDir}/${collectionFile}`),
		environment: require(`${path}/${postmanEnv}`),
		reporters: reporters,
		reporter: {
			html: {
				export: `${collectionsDir}/${output}/${collectionFile}-${Date.now()}.${formatReport}`,
				template: `${basePath}/${reportTemplate}`
			}
		},
		abortOnError: true
	}
}

exports.callNewman = callNewman;