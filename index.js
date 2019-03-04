const express = require('express');
const path = require('path')
const fs = require('fs')
const port = 1337

//httpserver.createServer(requestHandler).listen(port);
var app = express();
app.listen(port);

app.use("/", requestHandler);

function requestHandler(req, res)
{
    var filebase = path.basename(req.url) || 'index.html';
    var dirName = path.dirname(req.url) || '';
    var fileName = path.join(dirName, filebase);
	localFolder = __dirname + '/public/';
	page404 = localFolder + '404.html';
 
	//call our helper function
	//pass in the path to the file we want,
	//the response object, and the 404 page path
	//in case the requestd file is not found
	getFile((localFolder + fileName),res,page404);
}

function getFile(filePath,res,page404){
	//does the requested file exist?
	fs.exists(filePath,function(exists){
		//if it does...
		if(exists){
			//read the file, run the anonymous function
			fs.readFile(filePath,function(err,contents){
				if(!err){
					//if there was no error
					//send the contents with the default 200/ok header
					res.end(contents);
				} else {
					//for our own troubleshooting
					console.dir(err);
				};
			});
		} else {
			//if the requested file was not found
			//serve-up our custom 404 page
			fs.readFile(page404,function(err,contents){
				//if there was no error
				if(!err){
					//send the contents with a 404/not found header 
					res.writeHead(404, {'Content-Type': 'text/html'});
					res.end(contents);
				} else {
					//for our own troubleshooting
					console.dir(err);
				};
			});
		};
	});
};