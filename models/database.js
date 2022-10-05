import Sequelize from 'sequelize';


//************** coneccion a la base de datos ***********//

const sequelize = new Sequelize('disney', 'root', 'admi', {
    host: 'localhost',
    dialect: 'mysql',
    define:{
        freezeTableName: true
    }
});

export default sequelize;