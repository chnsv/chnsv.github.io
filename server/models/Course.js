module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    format: DataTypes.STRING
  });

  return Course;
};
