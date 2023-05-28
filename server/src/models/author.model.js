const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('Author', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1)
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        }
    }, {
        tableName: 'author',
        timestamps: false
    })
}