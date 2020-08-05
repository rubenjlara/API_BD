const {Router} = require('express');
const router = Router();
const mysqlConnection  = require('../Base.js');

router.get('/',(req,res)=>{
	mysqlConnection.query('SELECT * FROM peliculas', (err, rows, fields) => {//Nos puede regresar un error, filas o campos
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.get('/:clave',(req,res)=>{
	const {clave} = req.params;
	mysqlConnection.query('SELECT * FROM peliculas where clave = ?',[clave],(err,rows,fields)=>{
		if(!err){
			res.json(rows);
		}else{
			console.log(err);
		}
	});
});

router.post('/',(req,res)=>{
	const {clave,nombre,director,year,rating,precio} = req.body;
	if(clave && nombre && director && year && rating && precio){
		mysqlConnection.query('INSERT INTO peliculas (clave,nombre,director,dyear,rating,precio) VALUES (?,?,?,?,?,?)',[clave,nombre,director,year,rating,precio],(err,rows,field)=>{
			if(!err){
				res.json({"Status":'Exito al guardar la película'});
			}else{
				res.json({"error":'Error al insertar los datos a la B.D'});
			}
		});
	}else{
		res.json({"Status":'Por favor ingrese todos los datos al formulario'});
	}
});

router.put('/:clave',(req,res)=>{
	const {clave} = req.params;
	const {nombre,director,year,rating,precio}=req.body;
	if(nombre && director && year && rating && precio){
		mysqlConnection.query('UPDATE peliculas SET nombre = ?, director = ?, dyear = ?, rating = ?, precio = ? WHERE clave = ?',[nombre,director,year,rating,precio,clave],(err,rows,field)=>{
			if(!err){
				res.json({"Status":'Película actualizada correctamente'});
			}else{
				res.json({"Status":'No se pudo actualizar la película'});
			}
		});
	}else{
		res.json({"Status":'Por favor ingrese todos los datos al formulario'});
	}
});

router.delete('/:clave',(req,res)=>{
	const {clave} = req.params;
	mysqlConnection.query('DELETE FROM peliculas WHERE clave = ?',[clave],(err,rows,field)=>{
		if(!err){
			res.json({"Status":'Película borrada exitosamente'});
		}else{
			res.json({"Status":'No se pudo eliminar la película'});
		}
	});
});

module.exports=router;