import express from 'express';
import jwt from 'jsonwebtoken';
import sgMail from '../sendgrid/sendgrid.js';
import helpers from '../lib/helpers.js';
import { user } from '../models/models.js';

const regRouter = express.Router();

//formulario ruta de registro
regRouter.get('/register', (req, res)=>{
    res.send(
        `<html>
            <Head>
                <title>Registro</title>
            </Head>
            <body>
                <form method="POST" action="/auth/register">
                    <input type="text" name="username" placeholder="Nombre de usuario"></input><br/>
                    <br/>
                    <input type="password" name="password" placeholder="Password"></input></br>
                    <br/>
                    <input type="mail" name="mail" placeholder="example@mail.com"></input>
                    <br/>
                    <br/>
                    <input type="submit" value="Registrarse"></input>
                </form>
            </body>
        </html>`
    );
});
//metodo post que espera tres parametros del formulario de registro: nombre, password y mail. 
regRouter.post('/register', async (req, res)=>{
    const { username, password, mail } = req.body;
    try {
        //hago un hash del password proporcionado.
        const passwordHash = await helpers.encryptPass(password);
        //creo un objeto con los datos del nuevo usuario q se registra
        const newUser = {
            nombre: username,
            password: passwordHash,
            mail
        }
        //guardo los datos de registro en la base de datos.
        await user.create(newUser);
        //recupero los datos de la db.
        const usuario = await user.findAll({where: { mail: mail }});
        //le agrego el id recuperado desde la db para completar el objeto newUser.
        newUser.id = usuario[0].id;
        //genero un token de acceso con el password del usuario q expira en una hora.
        const token_generado = jwt.sign({password}, process.env.SECRET, { expiresIn: '1h' });
    
        res.header('authorization', token_generado).status(200).json(newUser);

    } catch (error) {
        
        console.log(error);
        res.status(404).send('Error al registrarse! intenelo nuevamente!');
    }

    //sendgrid: envio de mail de bienvenida!
    const msg = {
        to: `${mail}`,
        from: 'ssebass.ross@gmail.com',
        subject: `${username}. Bienvenido a nuestra api!`,
        text: 'Gracias por registrarte en nuestra api!',
        html: '<strong>La mejor api del mundo Disney!</strong>'
    }
    sgMail.send(msg)
        .then(()=>{
            console.log('email enviado con exito!');
        }).catch((e)=>{
            console.error(`soy err sgMail: ${e}`);
        });
});


//middleware para validar el token

export const validarToken = (req, res, next)=>{
    //recupero el token que puede venir por header o por parametros de query.
    const token_generado = req.headers['authorization'] || req.query.token;
    //si no hay token niego el acceso.
    if(!token_generado) res.send('Acceso denegado!');
    //verifico q el token aun sea valido 
    jwt.verify(token_generado, process.env.SECRET, (err, user)=>{
        if(err){
            res.send('Error! El token expiro o es invalido!');
        }else{
            next();
        }
    })
};

export default regRouter;