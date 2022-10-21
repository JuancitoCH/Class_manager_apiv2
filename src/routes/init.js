const express = require('express')

module.exports = (app) =>{
	const router = express.Router()
	app.use('/api',router)
	
	router.get('/',(req,res)=>{
		return res.send('It Work')
	})
	router.get('/facebook/privacy_policy',(req,res)=>{
		return res.send(`
		<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy</title>
</head>
<body>
    <h1>Politicas de Privacidad</h1>
    <h2>Class Manager Api</h2>
    <p>Solo Usaremos y guardaremos Tu nombre de usuario e email para autenticarte en nuestros servicios.</p>
    <p>Tus Datos no Seran Compartidos con Terceros.</p>
    <p>Tus Datos no Seran usados para ninguna otra accion que no sea para la prestacion de nuestros servicios.</p>
    <p>Meta no Se hace responsable del uso de tus datos compartidos.</p>
</body>
</html>
		`)
	})

}
