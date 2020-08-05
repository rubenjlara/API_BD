const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port',process.env.PORT||3000);//por si nos envian un puerto definido por la nube, que tome ese puerto, si no que tome el 3000
app.set('json spaces',2); //Darle formato de espacio a json

//middlewares
app.use(morgan('combined')); //y usamos morgan.- Descripción de los mensajes en la consola    //probar combined o dev
app.use(express.urlencoded({extended:false}));//Leer datos de un formulario como texto, numeros
app.use(express.json());//Leeremos datos tipo JSON

//routes
app.use('/api/movies',require('./routes/movies'));

//starting server
app.listen(app.get('port'),()=>{
	console.log(`Server en puerto ${app.get('port')}`);
}) ;