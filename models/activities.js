'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activities = sequelize.define('Activities', {
    activity: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    userId:DataTypes.INTEGER,
  }, {});
  Activities.associate = function(models) {
    // associations can be defined here
  };
  return Activities;
};