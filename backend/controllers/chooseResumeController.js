import ChooseResume from "../models/ChooseResume.js";


export const createChooseResume = async (req, res) => {
    const { userId, resumeName, templateName } = req.body;

    try {
        const newResume = new ChooseResume({ userId, resumeName, templateName })
        await newResume.save();
        res.status(201).json(newResume)
    } catch (error) {
        res.status(500).json({ error: "Error creating resume" });
    }
}

export const getUserChooseResumes = async (req, res) => {
    try {
        const resumes = await ChooseResume.find({ userId: req.params.userId });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching resumes" });
    }
}

export const updateChooseResume = async (req, res) => {
    const { resumeId, userId, personalInfo, templateName, summary, experience, projects, education, skills, hobbies, languages } = req.body;
    console.log(resumeId);
    try {
        const updatedResume = await ChooseResume.findByIdAndUpdate(
            resumeId,  // Find resume by userId
            { $set: { userId, personalInfo, templateName, summary, experience, projects, education, skills, hobbies, languages } }, // Update fields
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

export const deleteChooseResume = async (req, res) => {
    const { resumeId } = req.params
    // console.log(resumeId);

    try {
        await ChooseResume.findByIdAndDelete(resumeId)
        res.status(200).json({ message: "resume deleted" })
    } catch (error) {
        res.status(500).json({ error: "Error deletin gresume" })

    }

}
export const getChoosedResume = async (req, res) => {
    const { resumeId } = req.params;
    // console.log("Requested Resume ID:", resumeId);

    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
        return res.status(400).json({ error: "Invalid Resume ID format" });
    }

    try {
        const resume = await ChooseResume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({ error: "Resume Not Found" });
        }

        res.status(200).json(resume);
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};