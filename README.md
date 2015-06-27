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

## Desplegando en la nube

Vamos a desplegar nuestra aplicación a la nube utilizando [Heroku](http://heroku.com/), primero debemos crear una
cuenta en Heroku y descargar el [Heroku Toolbelt](https://toolbelt.heroku.com/).

Para que nuestra aplicación pueda ser desplegada debemos garantizar que estemos trabajando en un repositorio git.

Para iniciar un repositorio git ejecutamos:

``` bash 
$ git init
```

Y luego agregamos todos los archivos al repositorio y hacemos commit:

``` bash 
$ git add .
$ git commit -m "Añadir archivos al repo"
```

Luego debemos hacer login con la aplicación de heroku:

``` bash
$ heroku login
```

Después de autenticarse debemos crear nuestra aplicación en heroku ejecutando:

``` bash
$ heroku create <app-name>
```

Y ya lo último que falta es subir nuestra aplicación a Heroku!, para eso utilizamos git

``` bash
$ git push heroku master
```

De ahora en adelante cada que queramos subir una nueva versión de la aplicación a Heroku solo debemos realizar
el commit y hacer push a `heroku master`

## Servidor estático - index.html

Ahora vamos a modificar el servidor para que nos entregue un archivo html, para esto vamos a utilizar el módulo
`fs` que nos permite acceder al sistema de archivos.

Primero crearemos un directorio llamado `public` donde guardaremos los archivos estáticos, y luego creamos un archivo
`index.html` para enviarlo en la respuesta del servidor.

``` js 
var path = require('path');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  fs.createReadStream(path.join(__dirname, 'public', 'index.html')).pipe(res);
});
```

## Servidor estático - express.js

Vamos a utilizar el módulo `express` para crear un servidor web mucho más completo, primero debemos instalar `express` ejecutando:

``` bash 
$ npm install express --save
```

Luego vamos a crear una aplicación express y la usaremos como Request Listener de nuestro servidor `http` y vamos a utilizar
`express.static` como middleware para servir archivos estáticos desde la carpeta `public`.

``` js 
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
```

## Formulario

Crearemos un formulario sencillo en el archivo `index.html` donde preguntaremos por el campo tipo texto `fullName`,
este formulario deberá enviar una petición `POST` a la ruta `/save` de nuestra aplicación.

``` html 
<form action="/save" method="POST">
  <input type="text" name="fullName">
  <button type="submit">Save</button>
</form>
```

## Ruta /save

Crearemos una ruta tipo `POST` en nuestro servidor `http`, para eso utilizaremos express, y para poder
procesar los parametros que nos envia el formulario necesitas definir un body parser como un middleware de express.

Primero debemos instalar este módulo desde npm así:

``` bash 
$ npm install body-parser --save
```

Y luego lo adherimos como middleware de nuestra aplicación:

``` js 
var bodyParser = require('body-parser');
...
app.use(bodyParser.urlencoded({ extended: false }));

```

Ya que tenemos el middleware podemos definir nuestra ruta y recibir el parámetro `fullName`:

``` js 
app.post('/save', function (req, res) {
  var fullName = req.body.fullName;
  res.end(fullName);
});
```

## Vistas con EJS

Vamos a utilizar un motor de plantillas llamado EJS, este me permitirá crear vistas html dinámicas con información
que enviaremos desde el servidor, en este caso con el nombre completo.

Primero instalamos ejs:

``` bach
$ npm install ejs --save
```

Luego configuramos express para que utilice ejs:

``` js
app.set('view engine', 'ejs');
```

Este motor de plantillas espera que yo las guarde en un directorio llamado `views` con extensión `.ejs`, en este directorio
crearemos un archivo llamado `profile.ejs` con lo siguiente:

``` html
<h1>I'm <%= fullName %></h1>
```

Y por último le diremos a nuestra ruta `/save` que renderice la vista que acabamos de crear:

``` js 
var fullName = req.body.fullName;
res.render('profile', { fullName: fullName });
```
