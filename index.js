
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './libs/db.connection.js';
import errorHandler from './middlewares/errorhandler.middleware.js';
import taskRoutes from './routes/task.routes.js';


const app = express();
connectDB(); 


app.use(express.json());


app.use('/api/tasks', taskRoutes);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

