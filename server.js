require('dotenv').config();
const app = require('./src/app');
const { seedRoles, seedAdmin } = require('./src/utils/seed');

(async () => {
  try {
    await seedRoles();
    await seedAdmin();
  } catch (err) {
    console.error('Error during seeding:', err);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});