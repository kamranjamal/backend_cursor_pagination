
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import Task from '../models/task.model.js';
import connectDB from '../libs/db.connection.js';


connectDB();

const generateSeedData = (count) => {
  const tasks = [];
  const statuses = ['todo', 'doing', 'done'];
  const priorities = ['low', 'medium', 'high'];
  const titles = [
    'Design the new API schema', 'Implement user authentication', 'Fix the login page bug',
    'Deploy the staging server', 'Write unit tests for the controller', 'Update the documentation',
    'Refactor the database connection module', 'Add caching layer with Redis', 'Optimize the build process',
    'Conduct a security audit', 'Plan the next sprint', 'Review pull requests', 'Set up CI/CD pipeline',
    'Migrate legacy data', 'Monitor application performance', 'Resolve customer support tickets',
    'Create a new component library', 'Improve accessibility (a11y)', 'Configure logging and monitoring',
    'Research new technologies', 'Build the user profile page', 'Integrate with a third-party service',
    'Write end-to-end tests', 'Prepare a presentation for stakeholders', 'Analyze user feedback',
    'Fix the memory leak issue', 'Update third-party dependencies', 'Perform database backup',
    'Create a marketing landing page', 'Optimize frontend asset loading'
  ];

  for (let i = 0; i < count; i++) {
    tasks.push({
      title: titles[i % titles.length],
      status: statuses[i % statuses.length],
      priority: priorities[i % priorities.length],
  
      createdAt: new Date(Date.now() - i * 60 * 60 * 1000), 
    });
  }
  return tasks;
};

const seedTasks = generateSeedData(30);

const importData = async () => {
  try {
    await Task.deleteMany();
    console.log('Data destroyed...');

    await Task.insertMany(seedTasks);
    console.log('Data imported successfully! ✅');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Task.deleteMany();
    console.log('Data destroyed successfully! 🗑️');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
