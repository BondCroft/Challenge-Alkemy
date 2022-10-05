import express from 'express';
import dotenv from 'dotenv';
import sequelize from './models/database.js';
import router from './routes/routes.js';
import regRouter from './auth/register.js';
import logRouter from './auth/login.js';
import {validarToken} from './auth/register.js'; 

dotenv.config();
const app = express();

//setting
app.set('PORT', process.env.PORT || 3000);


//middelwares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', regRouter, logRouter);
//app.use(validarToken);
app.use('/', router);



async function main(){
    try {
        await sequelize.sync({ alert: true });
        app.listen(app.get('PORT'), ()=>{
            console.log('Servidor en puerto: ', app.get('PORT'));
        });
    } catch (error) {
        console.error(`Mensaje error: ${error}`);
    }
}

main();