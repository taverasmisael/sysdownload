#Sysdownload
## Un sistema servidor de archivo con basado en MEAN Stack

Esta es una versión con súper poderes del proyecto de pruebas que fue [Spartan](http://github.com/taverasmisael/spartan)

## Este software abarcará
* Subida de Archivos al servidor
* Filtro de archivos por categoría y por tipo de archivo
* Descarga de Archivos
* Rating por descarga de los archivos

## Que se usará
### Para el Frontend
* [SASS](http://sass-lang.com/) como el lenguaje de estilos predilecto
* [Materialize](http://materializecss.com) como framework FrontEnd preferido
* [Include Media ](include-media.com) para mejores medias Queries en SASS
* [Gulp](http://gulpjs.com/) para la agilización y automatización  de tareas (WebStarterKit version from google)

### Para que sea MEAN Stack
* [MongoDB](http://www.mongodb.org/) con [mongoose](http://mongoosejs.com/) para nuestra base de datos
* [Express](http://expressjs.com/) para nuestro servidor
* [AngularJs](https://angularjs.org/) para crear una SPA (Single Page Application)
* [NodeJs](nodejs.org) como plataforma principal


## Versión 0.5
Se ha logrado gran parte de nuestro objetivo, se pueden agregar archivos al servidor y descargarlos, aunque aún no se pueden eliminar.

## Usando Sysdownload

### Configurando e Instalando
En la carpeta `config` encontraremos el archivo `config.sample.js` lo renombramos a `config.js` y allí colocamos nuestra configuración.

**Para instalar**, abre tu terminal y escribe:

  <pre>
    git clone https://github.com/taverasmisael/sysdownload.git
    cd sysdownload
    npm instal && bower install
  </pre>

**Para correr en ambiente de desarrollo:** escribe `gulp` en tu terminal y correrá el servidor en el puerto elegido en el `config.js`

**Para correr en ambiente de produccion:** escribe `gulp develop --env=production` en tu terminal esto creará un servidor de la carpeta `dist` en el puerto elegido en el `config.js`

## Excepciones conocidas por el momento

* No se pueden subir archivos mayores a 500Mb al intentarlo, el servidor muere
* Aun no se eliminan los programas ni del server ni de la DB

Si encuentras alguna otra excepción en el funcionamiento del software, puedes abrir un [issue](https://github.com/taverasmisael/sysdownload/issues) o bien déjamelo saber en [twitter](https://twitter.com/taverasmisael)

## Licencia
Este proyecto está constituido bajo la creencia OpenSource, por lo que está alojado con licencia [Apache V2](http://www.apache.org/licenses/).
### TL;DR
Siéntase libre de contribuir, reproducir, mejor, pero siempre atribuyendo a los creadores principales
