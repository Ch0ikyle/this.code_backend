export const user = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id : {
            type : DataTypes.STRING(50),
            primaryKey : true,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        nickname : {
            type : DataTypes.STRING(50),
            allowNull : false
        }
    });
};