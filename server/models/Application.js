module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    studentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentName: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new'
    }
  });

  Application.associate = models => {
    Application.belongsTo(models.User);
    Application.belongsTo(models.Course);
  };

  return Application;
};
