import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    themeColor: { type: String },
    userName: { type: String },
    jobTitle: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    resumeName: { type: String },
    company: { type: String },
    duration: { type: String },
    role: { type: String },
    experience: { type: String },
    personalInfo: { type: Object },
    jobSummary: { type: String },
    // experience: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    interests: { type: String },
    languages: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const Resume = mongoose.model('Resume', resumeSchema)

export default Resume