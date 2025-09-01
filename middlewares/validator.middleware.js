import {  query } from 'express-validator';

export const validateGetTasks = [
    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage('Limit must be an integer between 1 and 50.')
        .toInt(),
    query('status')
        .optional()
        .isIn(['todo', 'doing', 'done']).withMessage('Status must be one of: todo, doing, done.'),
    query('cursor')
        .optional()
        .isMongoId().withMessage('Cursor must be a valid MongoDB ObjectId.'),
];