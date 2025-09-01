import { getTasks } from "../controllers/task.controller.js";
import { validateGetTasks } from "../middlewares/validator.middleware.js";
import { Router } from "express";

const router = Router();
router.get('/', validateGetTasks, getTasks);


export default router;