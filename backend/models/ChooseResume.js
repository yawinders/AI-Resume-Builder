import mongoose from "mongoose";


const ChooseResumeSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resumeName: { type: String },
    templateName: { type: String },
    personalInfo: {
        type: Object,
        required: true,
        default: {
            name: "",
            email: "",
            phone: "",
            address: "",
            role: ""
        }
    },
    summary: { type: String, default: "" },
    experience: {
        type: [Object],
        default: [{ company: "", duration: "", role: "", details: "" }]
    },
    projects: {
        type: [Object],
        default: [{ name: "", from: "", to: "", description: "" }]
    },
    education: {
        type: [Object],
        default: [{ college: "", year: "", percentage: "", degree: "" }]
    },
    skills: { type: [String], default: [""] }, // Array of strings
    hobbies: { type: String, default: "" },
    languages: { type: String, default: "" }

})


const ChooseResume = mongoose.model('ChooseResume', ChooseResumeSchema)

export default ChooseResume;