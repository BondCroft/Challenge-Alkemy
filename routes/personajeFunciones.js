import { personaje, film } from '../models/models.js';

export const getPersonaje = async (req, res)=>{
    try {
        const {name, age, movies, id} = req.query;
        if(name){
            const namePersonaje = await personaje.findAll({ where: { nombre: name }});
            res.status(200).json(namePersonaje);
        }
        if(age){
            const agePersonaje = await personaje.findAll({ where: { edad: age }});
            res.status(200).json(agePersonaje);
        }
        if(movies){
            const idMoviePersonaje = await film.findByPk(movies, {
                include: {
                    model: personaje,
                    attributes: ['id', 'nombre', 'edad']
                }
            });
            res.status(200).json(idMoviePersonaje);
        }
        if(id){
            console.log(`Soy id//****** ${id}`)
            const detallePersonaje = await personaje.findByPk( id, {
                include: {
                    model: film
                }
            });
            res.status(200).json(detallePersonaje);
        }   
        const personajes = await personaje.findAll({
            attributes: ['imagen', 'nombre']
        });
        res.status(200).json(personajes);
        
    } catch (error) {
        console.error(error);
    }
}

export const postPersonaje = async (req, res)=>{
    try {
        const {
            imagen,
            nombre,
            edad,
            peso,
            historia
        } = req.body;
        await personaje.create({
            imagen, nombre, edad, peso, historia
        });
        res.status(200).send('Personaje creado con exito!');

    } catch (error) {
        console.error(error);
    }
}

export const putPersonaje = async (req, res)=>{
    try {
        const { id } = req.params;
        const {
            imagen,
            nombre,
            edad,
            peso,
            historia
        } = req.body;
        await personaje.update({imagen, nombre, edad, peso, historia},{where: {id}});
        res.status(200).send(`Personaje con id: ${id} modificado con exito!`);

    } catch (error) {
        console.log(error);
    }
}

export const deletePersonaje = async (req, res)=>{
    try {
        const { id } = req.params;
        await personaje.destroy({ where: { id }});
    } catch (error) {
        console.error(error);
    }
    res.status(200).send(`Personaje con id: ${req.params.id} eliminado con exito!`);
}