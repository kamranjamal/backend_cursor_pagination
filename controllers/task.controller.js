import { validationResult } from 'express-validator';
import Task from '../models/task.model.js';


export const getTasks = async (req, res, next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {  status, cursor } = req.query;
    const limit = parseInt(req.query.limit, 10) || 10;
    const filter = {};
    if (status) {
      filter.status = status;
    }

    if (cursor) {
      const cursorDoc = await Task.findById(cursor).select('createdAt');
      if (!cursorDoc) {
        return res.status(400).json({ message: 'Invalid cursor: Task not found.' });
      }
      
      filter.$or = [
        { createdAt: { $lt: cursorDoc.createdAt } },
        { createdAt: cursorDoc.createdAt, _id: { $lt: cursor } }
      ];
    }
    
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1, _id: -1 }) 
      .limit(limit + 1)
      
      .select('-__v -updatedAt') 
      .lean();

    let nextCursor = null;
    if (tasks.length > limit) {
      const nextTask = tasks.pop(); 
      nextCursor = nextTask._id;
    }

 
    res.status(200).json({
      items: tasks,
      nextCursor,
    });
  } catch (error) {

    next(error);
  }
};


