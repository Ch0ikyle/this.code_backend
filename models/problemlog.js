export const problemlog = (sequelize, DataTypes) => {
    return sequelize.define('problemlog', {
        index : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : DataTypes.STRING
        },
        problemnum : {
            type : DataTypes.INTEGER
        },
        isCorrect : {
            type : DataTypes.BOOLEAN
        }
    });
};