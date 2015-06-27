# whoami

A Node.js example web application

## Introducción

Vamos a crear un proyecto Node.js desde cero, para esto debemos garantizar que tenemos Node.js y npm
instalado, para verificar ejecutamos:

``` bash
$ node -v
$ npm -v
```

Si no aparecen las versiones debemos descargar e instalar Node.js, para eso pueden visitar la página [http://nodejs.org](https://nodejs.org/)

Luego de verificar que tengamos instalado Node.js vamos a crear un nuevo directorio e inicializarlo como proyecto Node.js

``` bash 
$ mkdir whoami
$ cd whoami
$ npm init
```

El comando `npm init` nos va a realizar preguntas sobre nuestro proyecto, después de finalizar esto nos creará un archivo
llamado `package.json` el cual contiene la información del proyecto y sus dependencias.

## Servidor http

Node.js contiene una serie de módulos en su core para realizar diferentes operaciones, uno de ellos se llama
`http` el cual permite crear servidores http los cuales serán la base de nuestra aplicación web.

Para crear un servidor web con Node.js primero debemos requerir el módulo y luego crear un servidor

``` js
var http = require('http');
var server = http.createServer(function (req, res) {
  res.end('Hello world');
});

server.listen(8080);
```

La función que se le pasa al método `createServer` se conoce como Request Listener y se ejecutará
cada vez que llegue una petición al servidor.

los objetos `req` y `res` representan el request y el response, en el uno recibimos los parametros de la petición
y con el otro enviamos la respuesta a quien nos hace la petición.
