const app = require('./app');
const PORT = process.env.PORT || 5000;

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log('Error: ' + err));

const createAdmin = async () => {
  const admin = await User.findOne({ where: { email: 'admin@example.com' } });
  if (!admin) {
    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Администратор создан: admin@example.com / admin123');
  }
};

if (process.env.NODE_ENV !== 'production') {
  createAdmin();
}