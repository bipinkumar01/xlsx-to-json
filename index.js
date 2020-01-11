'use strict';
const excelToJson = require('convert-excel-to-json'),
	fs = require("fs"),
	path = require("path"),
	es = require("event-stream");


var file_path = path.join(__dirname,'files');

//Reading files from directory
async function readFile() {
  	try {
		fs.readdir(file_path, async function (err, items) {
			if (items != null) {
				for (let i = 0; i < items.length; i++) {
					console.log("file name: ", items[i]);
					let filepath = path.join(file_path, items[i]);
					let res = await convertExcelToJSON(filepath);
				}
			}
		});
	} catch (error) {
	    console.error("Error while reading the file", error);
	    process.exit(1);
	}
}


//Reading file contents and convert into json object - [{"key":"value"}]
async function convertExcelToJSON(fileName){
	let result = await excelToJson({
		sourceFile: fileName,
		columnToKey: {
			A: 'Id ',
			B: 'Name ',
			D: 'Education '
		}
	});
	console.log("result ", result);
}

async function init() {
	await readFile();
}

init();