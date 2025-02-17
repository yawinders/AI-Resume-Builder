import express from "express";
import { createResume, deleteResume, getResume, getUserResumes, updateResume } from "../controllers/resumeController.js";
import { createChooseResume, deleteChooseResume, getUserChooseResumes, updateChooseResume } from "../controllers/chooseResumeController.js";


const router = express.Router()


router.post('/create', createResume)
router.post('/update', updateResume)
router.get("/:userId", getUserResumes)
router.delete("/delete/:resumeId", deleteResume)
router.get('/:resumeId', getResume)

//choosed resumeroutes
router.post('/create-c-resume', createChooseResume)
router.post('/update-c-resume', updateChooseResume)
router.get("/c-resume/:userId", getUserChooseResumes)
router.delete("/delete-c-resume/:resumeId", deleteChooseResume)
// router.get('c-resume/:resumeId', getResume)


export default router;