export const answer = (sequelize, DataTypes) => {
    return sequelize.define('answer', {
        index : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        testcase : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        answer : {
            type : DataTypes.TEXT,
            allowNull : false
        }
    });
};

