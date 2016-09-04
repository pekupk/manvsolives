
var Hapi = require('hapi');
var server=new Hapi.Server();
var Vision=require('vision');

var Path = require('path');

var Inert = require('inert');

server.register([Vision, Inert], (err) => {

    server.views({
        engines: {
            html: require('handlebars')
        },
		path: Path.join(__dirname,'.')
  	});

	/*server.views({

		engines: {
			html: require('handlebars')	
		},
		path: Path.join(__dirname,'.')
	});*/

	server.connection({
		host:'localhost',
		port:8080
	});

	server.route({
		
		method:'GET',
		path:'/',
		handler: {
				
			view:"part1.html"
		}
	});

	server.route({
		
		method:'GET',
		path:'/js/{param}',
		
		handler: {
			file: './js/phaser.min.js'
		}
	});

	server.route({
		
		method:'GET',
		path:'/assets/{filename}',
		
		handler: {
			file: function(request) {
				return Path.join(__dirname, '/assets/'+request.params.filename);
			}
		}
	});

	server.start(function() {
		
		console.log('Game server started at:'+server.info.uri);
		
	});

});


