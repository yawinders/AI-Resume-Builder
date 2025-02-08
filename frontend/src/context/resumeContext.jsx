import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ResumeContext = createContext();

export function useResumeContext() {
    const result = useContext(ResumeContext);
    return result
}


const ResumeProvider = ({ children }) => {

    const [showPalette, setShowPalette] = useState(false);


    const [loading, setLoading] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)

    const [themeColor, setThemeColor] = useState(resumeData.themeColor || "blue")
    const location = useLocation()
    const resumeData = location.state?.resume;
    const navigate = useNavigate()
    console.log(resumeData);

    const [formData, setFormData] = useState({
        name: resumeData.userName,
        jobTitle: resumeData.jobTitle,
        email: resumeData.email,
        address: resumeData.address,
        phone: resumeData.phoneNumber,
        company: resumeData.company,
        duration: resumeData.duration,
        role: resumeData.role,
        experience: resumeData.experience,
        jobSummary: resumeData.jobSummary,
        education: resumeData.education,
        skills: resumeData.skills,
        hobbies: resumeData.interests,
        languages: resumeData.languages,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

    const generate = async (prompt, name) => {
        // console.log(import.meta.env.VITE_OPENAI_API_KEY);


        try {
            setAiLoading(true)
            const requestData = {
                "contents": [{
                    "parts": [{ "text": prompt }]
                }]
            };
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`, requestData, config)
            // console.log(data.candidates[0].content.parts[0].text);
            setFormData({ ...formData, [name]: data.candidates[0].content.parts[0].text })
            setAiLoading(false)

        } catch (error) {
            console.log(error);

            setAiLoading(false)
            toast({
                title: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
        }
    }
    const handleSave = async () => {
        try {
            setLoading(true)
            const user = JSON.parse(localStorage.getItem("userInfo"));

            const newResume = { resumeId: resumeData._id, userId: user.userId, userName: formData.name, jobTitle: formData.jobTitle, address: formData.address, phoneNumber: formData.phone, email: formData.email, jobSummary: formData.jobSummary, company: formData.company, duration: formData.duration, role: formData.role, experience: formData.experience, education: formData.education, skills: formData.skills, interests: formData.hobbies, languages: formData.languages, themeColor };
            await axios.post("http://localhost:5000/api/resume/update", newResume, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            toast({
                title: "Details Saved",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }

    const handleEducationChange = (e, index) => {

        const copyFormData = { ...formData }
        copyFormData.education[index][e.target.name] = e.target.value;
        setFormData(copyFormData)
    }
    const handleAddEducation = () => {

        // console.log(formData);
        setFormData({ ...formData, education: [...formData.education, { degree: "", institution: "", year: "", percentage: "" }] })

    }
    const removeEducation = (index) => {
        setFormData(prevState => ({
            ...prevState,
            education: prevState.education.filter((_, i) => i !== index)
        }));
    }
    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills]; // Copy the array
        updatedSkills[index].name = value; // Update the specific skill name
        setFormData({ ...formData, skills: updatedSkills }); // Set the updated state
    };
    const handleSkillRatingClick = (rating, index) => {

        const copyFormData = { ...formData }
        // copyFormData.skills[index].name = skl;
        copyFormData.skills[index].rating = rating;
        setFormData(copyFormData);
    }
    const handleAddSkillsForm = () => {
        setFormData({ ...formData, skills: [...formData.skills, { name: '', rating: 0 }] })
    }
    const handleRemoveSkillsForm = (index) => {
        setFormData((prev) => ({
            ...prev, skills: prev.skills.filter((_, i) => i !== index)
        }))
    }

    return <ResumeContext.Provider value={{ formData, setFormData, showPalette, setShowPalette, colors, loading, setLoading, aiLoading, setAiLoading, handleChange, handleNext, handlePrev, generate, handleSave, handleEducationChange, handleAddEducation, removeEducation, handleSkillChange, handleSkillRatingClick, handleAddSkillsForm, handleRemoveSkillsForm }}>
        {children}
    </ResumeContext.Provider>
}
export default ResumeProvider;