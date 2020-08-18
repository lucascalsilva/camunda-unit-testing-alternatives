const junk = require('junk');
const fs = require('fs');
const collectionsFolder = 'collections';
const formatFilter = '.json';

function getCollections(path){
	let collections = [];
		readDirectories(path).forEach(function (test) {
			let collectionsDir =  `${path}/${test}/${collectionsFolder}`;
			readFiles(collectionsDir).forEach(function(collectionFile){
				collections.push({
					collectionsDir: collectionsDir,
					collectionFile: collectionFile
				});
			});
		});
		return collections;
}

function readDirectories(path) {
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(`${path}/${file}`).isDirectory();
	}).filter(junk.not);
}

function readFiles(path) {
	return fs.readdirSync(path).filter(function (file) {
		return file.includes(formatFilter);
	}).filter(junk.not);
}

exports.getCollections = getCollections;