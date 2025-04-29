module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    studentName: DataTypes.STRING,
    grade: DataTypes.STRING,
    parentName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    }
  });

  Application.associate = models => {
    Application.belongsTo(models.User);
    Application.belongsTo(models.Course);
  };

  return Application;
};
