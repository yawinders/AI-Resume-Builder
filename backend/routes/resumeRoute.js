import express from "express";
import { createResume, deleteResume, getResume, getUserResumes, updateResume } from "../controllers/resumeController.js";


const router = express.Router()


router.post('/create', createResume)
router.post('/update', updateResume)
router.get("/:userId", getUserResumes)
router.delete("/delete/:resumeId", deleteResume)
router.get('/:resumeId', getResume)


export default router;