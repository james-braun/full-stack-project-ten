'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Course.associate = function(models) {
      Course.belongsTo(models.User, {
          as: 'Courses',
          foreignKey: {
              fieldName: 'userId',
              allowNull: false,
          },
      });
  };
  return Course;
};