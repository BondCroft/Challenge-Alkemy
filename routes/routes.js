import express from 'express';
import { 
    getPersonaje,
    postPersonaje,
    putPersonaje,
    deletePersonaje
} from './personajeFunciones.js';

import {
    getPeliculas,
    postPeliculas,
    putPeliculas,
    deletePeliculas
} from './peliculasFunciones.js';


const router = express.Router();

/**************** Rutas Personajes ********************/

router.get('/characters', getPersonaje);

router.post('/characters', postPersonaje);

router.put('/characters/:id', putPersonaje);

router.delete('/characters/:id', deletePersonaje);

/*************** Rutas PeliculasSeries *****************/

router.get('/movies', getPeliculas);

router.post('/movies', postPeliculas);

router.put('/movies/:id', putPeliculas);

router.delete('/movies/:id', deletePeliculas);


export default router;

