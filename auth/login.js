import express from 'express';
import jwt from 'jsonwebtoken';
import helpers from '../lib/helpers.js';
import { user } from '../models/models.js';

const logRouter = express.Router();
//formulario de login.
logRouter.get('/login', (req, res)=>{

    res.send(
        `<html>
            <Head>
                <title>LogIn</title>
            </Head>
            <body>
                <form method="POST" action="/auth/login">
                    <input type="mail" name="mail" placeholder="example: user@mail.com"></input><br/>
                    <br/>
                    <input type="password" name="password" placeholder="Password"></input></br>
                    <br/>
                    <input type="submit" value="Login"></input>
                </form>
            </body>
        </html>`
    );
});
//metodo post q recibe dos parametros de login: mail y password
logRouter.post('/login', async(req, res, next)=>{
    //recupero los datos del login
    const { mail, password } = req.body;
    
    try {
        //busco el registro con el mail proporcionado en la db.
        const usuario = await user.findAll({ where: {mail: mail}});
        //funcion que compara el password proporcionado con el q esta en la db y debuelve true / false. 
        const esIgual = await helpers.comparePass(password, usuario[0].password);
    
        if(esIgual){
            //si el password es correcto genero un token de acceso.
            const token_generado = jwt.sign({password: usuario[0].password}, process.env.SECRET, { expiresIn: '1h' });
            req.body.token = token_generado;
            req.body.nombre = usuario[0].nombre;
            res.status(200).header('authorization', token_generado);
        }else{
            res.status(404).send('Mail o Password incorrectos!');
        }

    } catch (error) {

        console.log(error.message);
    } 
    next();
}, (req, res)=>{

    res.status(200).json({token: req.body.token}).send(`Login exitoso! Bienvenido ${req.body.nombre}`);
});

export default logRouter;