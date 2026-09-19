import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Input,
    Textarea,
    VStack,
    HStack,
    Progress,
    Heading,
    Icon,
    useToast,
    Flex,
    Text,
    Divider,
    Select,
    useTheme,
    useColorModeValue
} from "@chakra-ui/react";
import { FaUser, FaBriefcase, FaGraduationCap, FaCogs, FaHeart, FaGlobe, FaHome, FaPallet, FaChevronDown, FaArrowCircleUp, FaArrowDown } from "react-icons/fa";
import ResumePreview from "../components/ResumePreview.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { skillsData } from "../skills.js";
import { skills } from "../skills.js";
import Rating from "../components/Rating.jsx";
import { useAuthentication } from "../context/authContext.jsx";
import { Template1, Template2, Template3 } from "../miscellaneous/ResumePreviewTemplates.jsx";

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
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const bgGradient = useColorModeValue(
        "linear-gradient(135deg, #f5f7fa, #e4e8eb)",
        "linear-gradient(135deg, #232526, #414345)"
    );
    const formBg = useColorModeValue("white", "gray.800");

    const [showPalette, setShowPalette] = useState(false);
    const colors = [
        "blue.500",
        "red.500",
        "green.500",
        "yellow.500",
        "purple.500",
        "teal.500",
        "orange.500",
        "gray.300",
        "gray.500",
        "gray.700",
        "red.600",
        "teal.600",
        "green.600",
        "purple.600",
        "yellow.400",
        "orange.600",
        "gray.600",
    ];

    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [suggestions, setSuggestions] = useState({});
    const { user } = useAuthentication();
    const toast = useToast();
    const location = useLocation();
    let resumeData = location.state?.resume;
    const navigate = useNavigate();

    // Use Chakra UI color scheme names instead of hex values
    const [themeColor, setThemeColor] = useState(resumeData?.themeColor || "blue");

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: resumeData?.userName || user?.name,
        jobTitle: resumeData?.jobTitle || "",
        email: resumeData?.email || user?.email || "",
        address: resumeData?.address || "",
        phone: resumeData?.phoneNumber || "",
        company: resumeData?.company || "",
        duration: resumeData?.duration || "",
        role: resumeData?.role || "",
        experience: resumeData?.experience || "",
        jobSummary: resumeData?.jobSummary || "",
        education: resumeData?.education || [{ degree: "", institution: "", year: "", percentage: "" }],
        skills: resumeData?.skills || [{ name: '', rating: 0 }],
        hobbies: resumeData?.interests || "",
        languages: resumeData?.languages || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

    const generate = async (prompt, name) => {
        try {
            setAiLoading(true);
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
            const { data } = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`, requestData, config);
            setFormData({ ...formData, [name]: data.candidates[0].content.parts[0].text });
            setAiLoading(false);
        } catch (error) {
            console.log(error);
            setAiLoading(false);
            toast({
                title: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-left"
            });
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("userInfo"));

            const newResume = {
                resumeId: resumeData?._id,
                userId: user.userId,
                userName: formData.name,
                jobTitle: formData.jobTitle,
                address: formData.address,
                phoneNumber: formData.phone,
                email: formData.email,
                jobSummary: formData.jobSummary,
                company: formData.company,
                duration: formData.duration,
                role: formData.role,
                experience: formData.experience,
                education: formData.education,
                skills: formData.skills,
                interests: formData.hobbies,
                languages: formData.languages,
                themeColor
            };

            await axios.post(`${API_BASE_URL}/api/resume/update`, newResume, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            toast({
                title: "Details Saved",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleEducationChange = (e, index) => {
        const copyFormData = { ...formData };
        copyFormData.education[index][e.target.name] = e.target.value;
        setFormData(copyFormData);
    };

    const handleAddEducation = () => {
        setFormData({ ...formData, education: [...formData.education, { degree: "", institution: "", year: "", percentage: "" }] });
    };

    const removeEducation = (index) => {
        setFormData(prevState => ({
            ...prevState,
            education: prevState.education.filter((_, i) => i !== index)
        }));
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index].name = value;
        setFormData({ ...formData, skills: updatedSkills });
    };

    const handleInputChange = (index, value) => {
        handleSkillChange(index, value);
        if (value.length > 0) {
            const filteredSuggestions = skills.filter((skill) =>
                skill.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions((prev) => ({ ...prev, [index]: filteredSuggestions }));
        } else {
            setSuggestions((prev) => ({ ...prev, [index]: [] }));
        }
    };

    const handleSelectSuggestion = (index, selectedSkill) => {
        handleSkillChange(index, selectedSkill);
        setSuggestions((prev) => ({ ...prev, [index]: [] }));
    };

    const handleSkillRatingClick = (rating, index) => {
        const copyFormData = { ...formData };
        copyFormData.skills[index].rating = rating;
        setFormData(copyFormData);
    };

    const handleAddSkillsForm = () => {
        setFormData({ ...formData, skills: [...formData.skills, { name: '', rating: 0 }] });
    };

    const handleRemoveSkillsForm = (index) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    return (
        <Box bg={bgGradient} minHeight="100vh">
            <HStack spacing={12} align="stretch" p={6} flexWrap="wrap">
                <Icon
                    color={useColorModeValue("gray.800", "white")}
                    cursor="pointer"
                    as={FaHome}
                    mr={2}
                    fontSize="3rem"
                    onClick={() => navigate('/dashboard')}
                />
                <Box display="flex" w={["40%", "40%", "50%"]} justifyContent="space-between" gap="100px">
                    <Icon
                        color={useColorModeValue("gray.800", "white")}
                        as={FaPallet}
                        mr={2}
                        fontSize="3rem"
                        cursor="pointer"
                        onClick={() => setShowPalette(!showPalette)}
                    />
                    {showPalette && (
                        <Flex
                            bg={formBg}
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
                <Box
                    w={["100%", "100%", "50%"]}
                    p={6}
                    borderRadius="lg"
                    bg={formBg}
                    boxShadow="xl"
                >
                    <HStack justify="space-between">
                        <Heading size="md">
                            <Icon as={steps[step].icon} mr={2} color={`${themeColor}.500`} />
                            {steps[step].label}
                        </Heading>
                        <Progress
                            value={(step + 1) * (100 / steps.length)}
                            size="sm"
                            colorScheme={themeColor}
                            w="50%"
                        />
                    </HStack>

                    <VStack spacing={4} mt={6}>
                        {step === 0 && (
                            <>
                                <Box w="100%" display="flex" gap="10px">
                                    <Input
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        focusBorderColor={`${themeColor}.500`}
                                    />
                                    <Input
                                        name="jobTitle"
                                        placeholder="Job Title"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        focusBorderColor={`${themeColor}.500`}
                                    />
                                </Box>
                                <Box w="100%" display="flex" gap="10px">
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        focusBorderColor={`${themeColor}.500`}
                                    />
                                    <Input
                                        name="phone"
                                        type="number"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        focusBorderColor={`${themeColor}.500`}
                                    />
                                </Box>
                                <Box w="100%">
                                    <Textarea
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        focusBorderColor={`${themeColor}.500`}
                                    />
                                </Box>
                            </>
                        )}
                        {step === 1 && (
                            <>
                                <Box w="100%" display="flex" justifyContent="space-between">
                                    Add summary for your Job Title
                                    <Button
                                        isLoading={aiLoading}
                                        onClick={() => generate(`generate two line summary for ${formData.jobTitle} role for resume`, "jobSummary")}
                                        colorScheme={themeColor}
                                    >
                                        ♾️Generate from AI
                                    </Button>
                                </Box>
                                <Box w="100%" h="50%">
                                    <Textarea
                                        name="jobSummary"
                                        placeholder="job Summary"
                                        value={formData.jobSummary}
                                        onChange={handleChange}
                                        focusBorderColor={`${themeColor}.500`}
                                    />
                                </Box>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Input
                                    name="company"
                                    placeholder="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    focusBorderColor={`${themeColor}.500`}
                                />
                                <Input
                                    name="duration"
                                    type="number"
                                    placeholder="Duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    focusBorderColor={`${themeColor}.500`}
                                />
                                <Input
                                    name="role"
                                    type="text"
                                    placeholder="Position"
                                    value={formData.role}
                                    onChange={handleChange}
                                    focusBorderColor={`${themeColor}.500`}
                                />
                                <Button
                                    isLoading={aiLoading}
                                    onClick={() => generate(`Generate a concise and impactful 4-line professional experience summary, with each line separated by *, for someone who worked at ${formData.company} as a ${formData.role} for ${formData.duration}.
Focus on key responsibilities, skills applied, technologies used, and notable achievements. Keep it professional and results-oriented.`, "experience")}
                                    colorScheme={themeColor}
                                >
                                    Generate
                                </Button>
                                <Textarea
                                    name="experience"
                                    placeholder="Work Experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    focusBorderColor={`${themeColor}.500`}
                                />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                {formData.education.map((edu, index) => {
                                    return (
                                        <Box w="100%" key={index}>
                                            <Flex w="100%" gap="10px" mb="10px">
                                                <Input
                                                    name="institution"
                                                    placeholder="Institution"
                                                    value={edu.institution}
                                                    onChange={(e) => handleEducationChange(e, index)}
                                                    focusBorderColor={`${themeColor}.500`}
                                                />
                                                <Input
                                                    name="degree"
                                                    placeholder="Degree"
                                                    value={edu.degree}
                                                    onChange={(e) => handleEducationChange(e, index)}
                                                    focusBorderColor={`${themeColor}.500`}
                                                />
                                            </Flex>
                                            <Flex w="100%" gap="10px" alignItems="center">
                                                <Input
                                                    name="percentage"
                                                    placeholder="Percentage"
                                                    value={edu.percentage}
                                                    onChange={(e) => handleEducationChange(e, index)}
                                                    focusBorderColor={`${themeColor}.500`}
                                                />
                                                <Input
                                                    type="text"
                                                    name="year"
                                                    placeholder="Year"
                                                    value={edu.year}
                                                    onChange={(e) => handleEducationChange(e, index)}
                                                    focusBorderColor={`${themeColor}.500`}
                                                />
                                                <Button
                                                    onClick={() => removeEducation(index)}
                                                    color="red.500"
                                                    border="1px solid"
                                                    borderColor="red.500"
                                                    bg="transparent"
                                                >
                                                    🗑️
                                                </Button>
                                            </Flex>
                                            <Divider borderColor={`${themeColor}.500`} borderWidth="2px" my={4} />
                                        </Box>
                                    );
                                })}
                                <Button
                                    onClick={handleAddEducation}
                                    color={`${themeColor}.500`}
                                    border="1px solid"
                                    borderColor={`${themeColor}.500`}
                                    bg="transparent"
                                >
                                    Add Education
                                </Button>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                {formData?.skills.map((s, i) => {
                                    return (
                                        <Flex key={i} w="100%" justifyContent="space-evenly">
                                            <Input
                                                w="40%"
                                                value={s.name}
                                                placeholder="Skills"
                                                onChange={(e) => handleInputChange(i, e.target.value)}
                                                focusBorderColor={`${themeColor}.500`}
                                            />
                                            <Rating
                                                handleSkillRatingClick={handleSkillRatingClick}
                                                index={i}
                                                r={s.rating}
                                                themeColor={themeColor}
                                            />
                                            <Button
                                                onClick={() => handleRemoveSkillsForm(i)}
                                                color="red.500"
                                                border="1px solid"
                                                borderColor="red.500"
                                                bg="transparent"
                                            >
                                                🗑️
                                            </Button>
                                        </Flex>
                                    );
                                })}
                                <Button
                                    onClick={handleAddSkillsForm}
                                    color={`${themeColor}.500`}
                                    border="1px solid"
                                    borderColor={`${themeColor}.500`}
                                    bg="transparent"
                                >
                                    Add Skills
                                </Button>
                            </>
                        )}
                        {step === 5 && (
                            <>
                                <Textarea
                                    name="hobbies"
                                    placeholder="Hobbies & Interests"
                                    value={formData.hobbies}
                                    onChange={handleChange}
                                    focusBorderColor={`${themeColor}.500`}
                                />
                            </>
                        )}
                        {step === 6 && (
                            <>
                                <Textarea
                                    name="languages"
                                    placeholder="Languages Known"
                                    value={formData.languages}
                                    onChange={handleChange}
                                    focusBorderColor={`${themeColor}.500`}
                                />
                                <Button isLoading={loading} onClick={handleSave} colorScheme={themeColor}>
                                    Save
                                </Button>
                            </>
                        )}

                        <HStack justify="space-between" w="100%">
                            {step > 0 && <Button onClick={handlePrev} colorScheme="gray">Back</Button>}
                            {step < steps.length - 1 ? (
                                <>
                                    <Button onClick={handleNext} colorScheme={themeColor}>Next</Button>
                                    <Button isLoading={loading} onClick={handleSave} colorScheme={themeColor}>
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    colorScheme={themeColor}
                                    onClick={() => {
                                        resumeData = formData;
                                        resumeData.userName = formData.name;
                                        resumeData.interests = formData.hobbies;
                                        resumeData.phoneNumber = formData.phone;
                                        resumeData.themeColor = themeColor;
                                        navigate('/resume-preview', { state: { formData, resumeData } });
                                    }}
                                >
                                    Finish
                                </Button>
                            )}
                        </HStack>
                    </VStack>
                </Box>

                {/* Right Side - Live Resume Preview */}
                <ResumePreview formData={formData} resumeData={resumeData} themeColor={themeColor} />
            </HStack>
        </Box>
    );
}

export default ResumeMaker;