const http = require("http");
const fs = require("fs");
const form = require("querystring")
const  loki = require ("lokijs")

let noticias = null;

let db = new loki("public/db/noticias.json",{

	autoload : true,
	autosave : true,
	autosaveInterval : 3000,
	autoloadCallback: function(){
		noticias = db.getCollection("noticias")
		if( noticias == null){
			noticias = db.addCollection("noticias")
		}
	},
})

http.createServer(function(request, response) {
		
		let dir = "public/";

		let file = (request.url == "/") ? "index.html" : request.url;
			file = (file.match(/[^.]+(\.[^?#]+)?/) || [])[0];
		
		let ext = file.substring( file.lastIndexOf(".") ).toLowerCase();

		if(request.method == "POST" && file == "/enviar"){

			//aca hay que leer los datos que mando el formulario

			request.on("data", function(datos){

				let noticia = datos.toString()

				noticia = form.parse( noticia )

				noticias.insert(noticia)

				response.end( "Noticias guradada exitosamente" )
			})

			
		}

		let types = {
			".html"	: "text/html",
			".js"	: "text/javascript",
			".css"	: "text/css",
			".txt" 	: "text/plain",
			".json"	: "application/json",
			".png"	: "image/png",
			".jpg"	: "image/jpg",
			".gif"	: "image/gif",
			".ico"	: "image/x-icon",
			".wav"	: "audio/wav",
			".mp4"	: "video/mp4",
			".woff"	: "application/font-woff",
			".ttf"	: "application/font-ttf",
			".eot"	: "application/vnd.ms-fontobject",
			".otf"	: "application/font-otf",
			".svg"	: "application/image/svg+xml"
		};

		let contentType = types[ext] || "application/octet-stream";

		fs.readFile( dir + file, function(error, content) {
			
			if ( error ) {
				response.writeHead(404, { "Content-Type" : "text/plain" } );
				response.end("ARCHIVO NO ENCONTRADO");
			} else {
				response.writeHead(200, { "Content-Type" : contentType } );
				response.end(content);
			}

		});

}).listen(4000);