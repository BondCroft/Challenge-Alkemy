import sequelize from './database.js';
import { DataTypes, Model } from 'sequelize';

/************** defino modelos ***************/

class user extends Model{}; 

user.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true            
    }

}, {
    sequelize,
    timestamps: false
});


class film extends Model{};

film.init({
    imagen:{
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaCreacion:{
        type: DataTypes.DATE,
        allowNull: false
    },
    calificacion:{
        type: DataTypes.INTEGER,
       allowNull: false,
       validate:{
         min: 1,
         max: 5
       }
    }
}, {
    sequelize,
    timestamps: false
});

class genero extends Model{};

genero.init({
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    timestamps: false
});

class personaje extends Model{};

personaje.init({
    imagen:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
        
    },
    edad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    peso:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    historia:{
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    sequelize,
    timestamps: false
});


class personaje_film extends Model{};

personaje_film.init({
    personajeId: {
        type: DataTypes.INTEGER,
        references: {
            model: personaje,
            key: 'id'
        }
    },
    filmId: {
        type: DataTypes.INTEGER,
        references: {
            model: film,
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false
});

//***************  relaciones entre tablas  ******************//

//relacion de uno a muchos

genero.hasMany(film, {   //se agrega la foreignKey 'generoId' al modelo film automaticamente;
    foreignKey:{
        name:'generoId',
        allowNull: false
    }
});
film.belongsTo(genero);

//relacion de muchos a mucho

personaje.belongsToMany( film, { through: personaje_film, timestamps: false });
film.belongsToMany(personaje, { through: personaje_film, timestamps: false });

export {film, user, personaje};