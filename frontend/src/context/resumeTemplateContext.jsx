import { createContext, useContext, useState } from "react";
import { Template1, Template2, Template3 } from "../miscellaneous/ResumePreviewTemplates";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./authContext";
import axios from "axios";

const resumeTemplateContext = createContext();

export const useResumeContext = () => {
    const result = useContext(resumeTemplateContext);
    return result;
}
export const ResumeTemplateProvider = ({ children }) => {

    const [chooseResumes, setChooseResumes] = useState([])
    const [aiLoading, setAiLoading] = useState(false)
    const [choices, setChoices] = useState(['Template1', 'Template2', 'Template3'])
    const navigate = useNavigate()
    const { user } = useAuthentication()
    // console.log(chooseResumes);
    const [loading, setLoading] = useState(false)


    const [formData, setFormData] = useState({
        personalInfo: {
            name: "", email: "", phone: "", address: "", role: ""
        },
        summary: "",
        experience: [{ company: "", duration: "", role: "", details: "" }],
        projects: [{ name: "", from: "", to: "", description: "" }],
        education: [{ college: "", year: "", percentage: "", degree: "" }],
        skills: [""],
        hobbies: "",
        languages: "",
    });
    const handleChange = (section, index, field, value) => {
        if (Array.isArray(formData[section])) {
            const updatedSection = [...formData[section]];
            updatedSection[index][field] = value;
            setFormData({ ...formData, [section]: updatedSection });
        } else {
            setFormData({ ...formData, [section]: { ...formData[section], [field]: value } });
        }
    };

    const addMoreFields = (section, newItem) => {
        setFormData({ ...formData, [section]: [...formData[section], newItem] });
    };
    const handleExpDelete = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            experience: prevData.experience.filter((_, i) => i !== index),
        }));
    };
    const handleProjDelete = (index) => {
        setFormData((prevData) => ({
            ...prevData, projects: prevData.projects.filter((_, i) => i !== index)
        }))
    }
    const handleEduDelete = (index) => {
        setFormData((prevData) => ({
            ...prevData, education: prevData.education.filter((_, i) => i !== index)
        }))
    }
    const handleGenerateJobSummary = async (prompt, section, index, field) => {
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
            if (Array.isArray(formData[section])) {
                const updatedSection = [...formData[section]];
                updatedSection[index][field] = data.candidates[0].content.parts[0].text
            }
            else {

                setFormData({ ...formData, [section]: data.candidates[0].content.parts[0].text })
            }
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
    return (
        <resumeTemplateContext.Provider value={{ choices, formData, handleChange, addMoreFields, setFormData, handleGenerateJobSummary, aiLoading, handleExpDelete, handleProjDelete, handleEduDelete, chooseResumes, setChooseResumes, loading, setLoading }}>
            {children}
        </resumeTemplateContext.Provider>
    )
}   