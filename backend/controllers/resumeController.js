import Resume from "../models/Resume.js";


export const createResume = async (req, res) => {
    const { userId, resumeName } = req.body;
    // console.log(userId, resumeName);

    try {
        const newResume = new Resume({ userId, resumeName });
        await newResume.save();
        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({ error: "Error creating resume" });
    }
}

export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.params.userId });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching resumes" });
    }
};


export const updateResume = async (req, res) => {
    const { resumeId, userId, userName, jobTitle, address, phoneNumber, email, jobSummary, company, duration, role, experience, education, skills, interests, languages, themeColor } = req.body;
    console.log(resumeId);

    try {
        // Find and update the resume
        const updatedResume = await Resume.findByIdAndUpdate(
            resumeId,  // Find resume by userId
            { $set: { userId, userName, jobTitle, address, phoneNumber, email, jobSummary, company, duration, role, experience, education, skills, interests, languages, themeColor } }, // Update fields
            { new: true } // Return the updated document
        );

        if (!updatedResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.status(200).json(updatedResume);
    } catch (error) {
        res.status(500).json({ error: "Error updating resume" });
    }
}


export const deleteResume = async (req, res) => {
    const { resumeId } = req.params
    // console.log(resumeId);

    try {
        await Resume.findByIdAndDelete(resumeId)
        res.status(200).json({ message: "resume deleted" })
    } catch (error) {
        res.status(500).json({ error: "Error deletin gresume" })

    }

}

export const getResume = async (req, res) => {
    const { resumeId } = req.params;
    console.log("Requested Resume ID:", resumeId);

    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
        return res.status(400).json({ error: "Invalid Resume ID format" });
    }

    try {
        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({ error: "Resume Not Found" });
        }

        res.status(200).json(resume);
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// export const generateExperienceContent = async (req, res, next) => {
//     const { company, duration, role } = req.body;
//     const prompt = `Generate professional experience 5 bullet points for someone who worked at ${company} for the role ${role} for ${duration}:`


// };