export const problem = (sequelize, DataTypes) => {
    return sequelize.define('problem', {
        i : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        input : {
            type : DataTypes.STRING,
            allowNull : false
        },
        output : {
            type : DataTypes.STRING,
            allowNull    : false
        },
        exInput : {
            type : DataTypes.STRING,
            allowNull : false
        },
        exOutput : {
            type : DataTypes.STRING,
            allowNull : false
        }
    });
};

