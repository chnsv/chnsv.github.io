const { Application, Course, User } = require('../models');

exports.createApplication = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      UserId: req.userId
    });
    
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { UserId: req.userId },
      include: Course
    });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [
        { model: User, attributes: ['email'] },
        { model: Course, attributes: ['title'] }
      ]
    });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
