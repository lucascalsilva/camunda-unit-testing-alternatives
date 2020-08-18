const console = require('console');
const request = require('requestretry');
const collection = require('./collection.js');
const newmanRunner = require('./newman-runner.js');

const camundaUrl = process.env.CAMUNDA_URL;
const basePath = process.env.BASE_TEST_DIR;
const path = `${basePath}/tests`;

request(buildCamundaRequest(camundaUrl))
	.then(response => {
		let collections = collection.getCollections(path);
		newmanRunner.callNewman(collections, path, basePath);
	})
	.catch(err => {
		console.log(err);
	});

function buildCamundaRequest(url){
	return {
		url: url,
		json: true,
		maxAttempts: 10,
		retryDelay: 10000,
		retryStrategy: request.RetryStrategies.HTTPOrNetworkError
	};
}