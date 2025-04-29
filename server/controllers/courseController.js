const Course = require('../models/Course');
const Application = require('../models/Application');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const [updated] = await Course.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCourse = await Course.findByPk(req.params.id);
      res.json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.applyForCourse = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      courseId: req.params.courseId,
      userId: req.userId
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { userId: req.userId },
      include: [Course]
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение всех заявок
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      include: [{
        model: Course,
        attributes: ['title']
      }]
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Изменение статуса заявки
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const [updated] = await Application.update({ status }, {
      where: { id }
    });
    
    if (updated) {
      const updatedApp = await Application.findByPk(id, {
        include: [{
          model: Course,
          attributes: ['title']
        }]
      });
      res.json(updatedApp);
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};