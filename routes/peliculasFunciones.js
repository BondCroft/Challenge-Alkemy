import { film, personaje } from '../models/models.js';

//funcion que maneja peticiones get condicionadas por parametros de query y consulta la db.
//si no se especifica ningun parametro de query devuelve todos los registros de la tabla film.
export const getPeliculas = async (req, res)=>{
    try {
        const { name, genre, order, id } = req.query;
        if(name){
            const namefilm = await film.findAll({ where: { titulo: name }});
            res.status(200).json(namefilm);
        }
        if(genre){
            const genrefilm = await film.findAll({ where: { generoId: genre }});
            if(genrefilm.length === 0) res.status(404);
        
            res.status(200).json(genrefilm);
        }
        if(order){
            const orderfilm = await film.findAll( {order: [['fechaCreacion', order]]});
            res.status(200).json(orderPelicula);
        }
        if(id){
            const detallePelicula = await film.findByPk( id, {
                include: {
                    model: personaje
                }
            });
            res.status(200).json(detallePelicula);
        }
        const peliculasSeries = await film.findAll({
            attributes: [ 'imagen', 'titulo', 'fechaCreacion' ]
        });
        res.status(200).json(peliculasSeries);
    } catch (error) {
        console.error(error);
    }
};
//funcion que maneja peticiones post. Crea nuevos registros en la tabla film.
export const postPeliculas = async (req, res)=>{
    try {
        const {
            imagen,
            titulo,
            fechaCreacion,
            calificacion,
            generoId
        } = req.body;
        await film.create({
            imagen, titulo, fechaCreacion, calificacion, generoId
        });
        res.status(200).send('Pelicula o serie Creada con exito!');
    } catch (error) {
        console.error(error);
    }
};
//funcion q maneja peticiones put. Modifica registros ya existentes en la tabla film.
//Se espera el id del registro a acualizar.
export const putPeliculas = async (req, res)=>{
    try {
        const { id } = req.params;
        const {
            imagen,
            titulo,
            fechaCreacion,
            calificacion,
            generoId
        } = req.body;
        await film.update({
            imagen, titulo, fechaCreacion, calificacion, generoId
        }, {
            where: { id }
        });
        res.status(200).send(`Pelicula o serie con id: ${id} modificada con exito!`);
    } catch (error) {
        console.error(error);
    }
};
//funcion q maneja peticiones delete, recibe por parametro url el id del registro a eliminar de la tabla film.
export const deletePeliculas = async (req, res)=>{
    try {
        const { id } = req.params;
        await film.destroy({ where: { id }});
        res.status(200).send(`Pelicula con id: ${id} eliminada con exito!`);
    } catch (error) {
        console.error(error);
    }
};
