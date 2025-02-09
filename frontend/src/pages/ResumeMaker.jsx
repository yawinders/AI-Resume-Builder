import React, { useEffect, useState } from "react";
import { Box, Button, Input, Textarea, VStack, HStack, Progress, Heading, Icon, useToast, Flex, Text, Divider, Select } from "@chakra-ui/react";
import { FaUser, FaBriefcase, FaGraduationCap, FaCogs, FaHeart, FaGlobe, FaHome, FaPallet, FaChevronDown, FaArrowCircleUp, FaArrowDown } from "react-icons/fa";
import ResumePreview from "../components/ResumePreview.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { skillsData } from "../skills.js";
import { skills } from "../skills.js";


import Rating from "../components/Rating.jsx";
import { useResumeContext } from "../context/resumeContext.jsx";

const steps = [
    { label: "Personal Info", icon: FaUser },
    { label: "Summary", icon: FaBriefcase },
    { label: "Experience", icon: FaBriefcase },
    { label: "Education", icon: FaGraduationCap },
    { label: "Skills", icon: FaCogs },
    { label: "Hobbies", icon: FaHeart },
    { label: "Languages", icon: FaGlobe },
];

function ResumeMaker() {



    const [showPalette, setShowPalette] = useState(false);
    const colors = [
        "#3498db",
        "#e74c3c",
        "#2ecc71",
        "#f39c12",
        "#9b59b6",
        "#1abc9c", // Teal
        "#e67e22", // Carrot
        "#ecf0f1", // Light Gray
        "#95a5a6", // Gray
        "#34495e", // Dark Blue Gray
        "#c0392b", // Dark Red
        "#16a085", // Dark Teal
        "#27ae60", // Dark Green
        "#8e44ad", // Dark Purple
        "#f1c40f", // Yellow
        "#d35400", // Dark Orange
        "#7f8c8d", // Dark Gray
    ];


    const [loading, setLoading] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [suggestions, setSuggestions] = useState({});

    const toast = useToast()
    const location = useLocation()
    let resumeData = location.state?.resume;
    const navigate = useNavigate()
    // console.log(resumeData);
    // const resumeId = resumeData._id;
    const [themeColor, setThemeColor] = useState(resumeData.themeColor || "blue")

    const [step, setStep] = useState(0);
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
        //updating suggestion

    };

    const handleInputChange = (index, value) => {
        handleSkillChange(index, value)

        console.log(value.length);

        if (value.length > 0) {

            const filteredSuggestions = skills.filter((skill) =>
                skill.toLowerCase().includes(value.toLowerCase())
            );


            setSuggestions((prev) => ({ ...prev, [index]: filteredSuggestions }));
        } else {
            setSuggestions((prev) => ({ ...prev, [index]: [] })); // Clear suggestions if input is empty
        }
    }


    const handleSelectSuggestion = (index, selectedSkill) => {
        handleSkillChange(index, selectedSkill); // ✅ Set the selected skill
        setSuggestions((prev) => ({ ...prev, [index]: [] })); // ✅ Clear suggestions after selection
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
    // console.log(formData);

    return (
        <Box bgGradient="linear(to-r, blue.400, purple.600)" minHeight="100vh">
            <HStack spacing={12} align="stretch" p={6} flexWrap="wrap">
                <Icon cursor={"pointer"} as={FaHome} mr={2} fontSize="3rem" onClick={() => navigate('/dashboard')} />
                <Box display="flex" w={["40%", "40%", "50%"]} justifyContent="space-between" gap="100px">
                    <Icon as={FaPallet} mr={2} fontSize="3rem" cursor={"pointer"} onClick={() => setShowPalette(!showPalette)} />
                    {showPalette && (
                        <Flex
                            bg="white"
                            p={{ base: 2, md: 4 }}
                            boxShadow="md"
                            borderRadius="md"
                            position="absolute"
                            mt={{ base: 2, md: 5 }}
                            left={{ base: "5%", md: "10%" }}
                            right={{ base: "5%", md: "10%" }}
                            zIndex="10"
                            w={{ base: "90%", md: "auto" }}
                        >
                            {colors.map((color) => (
                                <Box
                                    key={color}
                                    w="30px"
                                    h="30px"
                                    bg={color}
                                    borderRadius="full"
                                    mx="2"
                                    cursor="pointer"
                                    border={color === themeColor ? "2px solid black" : "none"}
                                    onClick={() => {
                                        setThemeColor(color);
                                        setShowPalette(false);
                                    }}
                                    onMouseEnter={() => setThemeColor(color)}
                                />
                            ))}
                        </Flex>
                    )}
                </Box>
            </HStack>

            <HStack w="100%" spacing={6} align="stretch" p={6} flexWrap="wrap">
                {/* Left Side - Multi-Step Form */}
                <Box w={["100%", "100%", "50%"]} p={6} borderRadius="lg" bg="white" boxShadow="xl">
                    <HStack justify="space-between">
                        <Heading size="md">
                            <Icon as={steps[step].icon} mr={2} />
                            {steps[step].label}
                        </Heading>
                        <Progress value={(step + 1) * (100 / steps.length)} size="sm" colorScheme="blue" w="50%" />
                    </HStack>

                    <VStack spacing={4} mt={6}>
                        {step === 0 && (
                            <>
                                <Box
                                    w="100%"
                                    display="flex"
                                    gap="10px"
                                // justifyContent="flex-start"

                                >
                                    <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                                    <Input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} />
                                </Box>
                                <Box
                                    w="100%"
                                    display="flex"
                                    gap="10px"
                                >
                                    <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                    <Input name="phone" type="number" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                                </Box>
                                <Box
                                    w="100%"
                                >
                                    <Textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

                                </Box>



                            </>
                        )}
                        {step === 1 && (
                            <>

                                <Box
                                    w="100%"
                                    display="flex"
                                    justifyContent="space-between"

                                >

                                    Add summary for your Job Title
                                    <Button isLoading={aiLoading} onClick={() => generate(`generate two line summary for ${formData.jobTitle} role for resume`, "jobSummary")} colorScheme="blue">♾️Generate from AI</Button>
                                </Box>
                                <Box
                                    w="100%"
                                    h="50%"
                                >
                                    <Textarea name="jobSummary" placeholder="job Summary" value={formData.jobSummary} onChange={handleChange} />

                                </Box>



                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Input name="company" placeholder="company" value={formData.company} onChange={handleChange} />
                                <Input name="duration" type="number" placeholder="Duration" value={formData.duration} onChange={handleChange} />
                                <Input name="role" type="text" placeholder="Position" value={formData.role} onChange={handleChange} />
                                <Button isLoading={aiLoading} onClick={() => generate(`Generate professional experience in 4 lines for someone who worked at ${formData.company} for the role ${formData.role} for ${formData.duration}:`, "experience")} colorScheme="blue">Generate</Button>
                                <Textarea name="experience" placeholder="Work Experience" value={formData.experience} onChange={handleChange} />


                            </>
                        )}
                        {step === 3 && (
                            <>
                                {formData.education.map((edu, index) => {
                                    return <Box w="100%" key={index} >
                                        <Flex w="100%" gap="10px" mb="10px">
                                            <Input name="institution" placeholder="Institution"
                                                value={edu.institution}
                                                onChange={(e) => handleEducationChange(e, index)} />
                                            <Input name="degree" placeholder="Degreee"
                                                value={edu.degree}
                                                onChange={(e) => handleEducationChange(e, index)} />


                                        </Flex>
                                        <Flex
                                            w="100%"
                                            gap="10px"
                                            alignItems="center"
                                        >
                                            <Input name="percentage" placeholder="Percentage"
                                                value={edu.percentage}
                                                onChange={(e) => handleEducationChange(e, index)} />


                                            <Input type="text" name="year" placeholder="Year"
                                                value={edu.year}
                                                onChange={(e) => handleEducationChange(e, index)} />


                                            <Button
                                                onClick={() => removeEducation(index)}
                                                color="red"
                                                border="1px solid red"
                                                bg="transparent">🗑️</Button>
                                        </Flex>
                                        <Divider borderColor={themeColor} borderWidth="2px" my={4} />
                                    </Box>

                                })}

                                <Button
                                    onClick={handleAddEducation}
                                    color="blue"
                                    border="1px solid blue"
                                    colorScheme="blue" bg="transparent">Add Education</Button>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                {formData?.skills.map((s, i) => {
                                    return <Flex key={i} w="100%" justifyContent="space-evenly">
                                        <Input
                                            w="40%"
                                            type="text"
                                            value={s.name}
                                            placeholder="Skills"
                                            onChange={(e) => handleInputChange(i, e.target.value)}
                                        />

                                        {/* ✅ Suggestions List */}
                                        {/* {suggestions[i] && suggestions[i].length > 0 && (
                                            <Box
                                                position="absolute"
                                                bg="white"
                                                border="1px solid gray"
                                                borderRadius="md"
                                                mt={1}
                                                zIndex="10"
                                                boxShadow="md"
                                                w="40%"
                                            >
                                                {suggestions[i].map((skill, skillIndex) => (
                                                    <Box
                                                        key={skillIndex}
                                                        p={2}
                                                        _hover={{ bg: "gray.200", cursor: "pointer" }}
                                                        onClick={() => handleSelectSuggestion(i, skill)}
                                                    >
                                                        {skill}
                                                    </Box>
                                                ))}
                                            </Box>
                                        )} */}

                                        {/* rating */}
                                        < Rating handleSkillRatingClick={handleSkillRatingClick} index={i} r={s.rating} />
                                        <Button
                                            onClick={() => handleRemoveSkillsForm(i)}
                                            color="red"
                                            border="1px solid red"
                                            bg="transparent">🗑️</Button>
                                    </Flex>


                                })}

                                <Button
                                    onClick={handleAddSkillsForm}
                                    color="blue"
                                    border="1px solid blue"
                                    colorScheme="blue" bg="transparent">Add Skills</Button>
                            </>
                        )}
                        {step === 5 && (
                            <>
                                <Textarea name="hobbies" placeholder="Hobbies & Interests" value={formData.hobbies} onChange={handleChange} />
                            </>
                        )}
                        {step === 6 && (
                            <>
                                <Textarea name="languages" placeholder="Languages Known" value={formData.languages} onChange={handleChange} />
                                <Button isLoading={loading} onClick={handleSave} colorScheme="green">Save</Button>
                            </>

                        )}

                        <HStack justify="space-between" w="100%">
                            {step > 0 && <Button onClick={handlePrev} colorScheme="gray">Back</Button>}
                            {step < steps.length - 1 ? (
                                <>
                                    <Button onClick={handleNext} colorScheme="blue">Next</Button>
                                    <Button isLoading={loading} onClick={handleSave} colorScheme="green">Save</Button>
                                </>

                            ) : (
                                <Button colorScheme="green" onClick={() => {

                                    resumeData = formData
                                    resumeData.userName = formData.name
                                    resumeData.interests = formData.hobbies
                                    resumeData.phoneNumber = formData.phone
                                    resumeData.themeColor = themeColor
                                    navigate('/resume-preview', { state: { formData, resumeData } })
                                }}>Finish</Button>
                            )}
                        </HStack>
                    </VStack>
                </Box>

                {/* Right Side - Live Resume Preview */}
                <ResumePreview formData={formData} resumeData={resumeData} themeColor={themeColor} />
            </HStack >
        </Box >
    );
}

export default ResumeMaker;
