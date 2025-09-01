import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['todo', 'doing', 'done'],
    default: 'todo',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  }
}, {

  timestamps: true 
});


taskSchema.index({ createdAt: -1, status: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;

