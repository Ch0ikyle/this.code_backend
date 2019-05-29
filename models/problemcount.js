export const problemcount = (sequelize, DataTypes) => {
    return sequelize.define('problemcount', {
        index : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        trynum : {
            type : DataTypes.INTEGER
        },
        cornum : {
            type : DataTypes.INTEGER
        }
    });
};