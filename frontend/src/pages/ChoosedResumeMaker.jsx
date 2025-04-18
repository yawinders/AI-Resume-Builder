import {
    Flex,
    useToast,
    Box,
    Button,
    Input,
    Textarea,
    VStack,
    HStack,
    Icon,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepTitle,
    StepDescription,
    StepSeparator,
    useColorModeValue
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Template1, Template2, Template3 } from '../miscellaneous/ResumePreviewTemplates';
import { FaBriefcase, FaCogs, FaGlobe, FaGraduationCap, FaHeart, FaHome, FaRProject, FaUser } from 'react-icons/fa';
import { useResumeContext } from '../context/resumeTemplateContext';
import { useState } from "react";
import { useAuthentication } from '../context/authContext';
import axios from 'axios';

const steps = [
    { label: "Personal Info", icon: FaUser },
    { label: "Summary", icon: FaBriefcase },
    { label: "Experience", icon: FaBriefcase },
    { label: "Projects", icon: FaRProject },
    { label: "Education", icon: FaGraduationCap },
    { label: "Skills", icon: FaCogs },
    { label: "Hobbies", icon: FaHeart },
    { label: "Languages", icon: FaGlobe },
];

function ChoosedResumeMaker() {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const [step, setStep] = useState(0);
    const location = useLocation();
    const resume = location.state?.resume;
    const choice = location.state?.selectedResume;

    const {
        formData,
        handleChange,
        addMoreFields,
        setFormData,
        handleGenerateJobSummary,
        aiLoading,
        handleExpDelete,
        handleProjDelete,
        handleEduDelete,
        loading,
        setLoading
    } = useResumeContext();

    const { user } = useAuthentication();
    const toast = useToast();
    const navigate = useNavigate();

    // Theme colors
    const bgGradient = useColorModeValue(
        "linear-gradient(135deg, #f5f7fa, #e4e8eb)",
        "linear-gradient(135deg, #232526, #414345)"
    );
    const formBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textColor = useColorModeValue("gray.800", "white");
    const buttonColorScheme = useColorModeValue("blue", "purple");

    useEffect(() => {
        setFormData(resume);
    }, [resume]);

    const handleDataSave = async () => {
        setLoading(true);
        try {
            const newResume = {
                resumeId: resume._id,
                userId: user.userId,
                personalInfo: formData.personalInfo,
                summary: formData.summary,
                experience: formData.experience,
                projects: formData.projects,
                education: formData.education,
                skills: formData.skills,
                hobbies: formData.hobbies,
                languages: formData.languages
            };

            await axios.post(`${API_BASE_URL}/api/resume/update-c-resume`, newResume, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            toast({
                title: "Details Saved",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        } catch (error) {
            toast({
                title: "Error Saving Details",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFinish = () => {
        navigate('/choosed-preview', { state: { choice, formData, resume } });
    };

    return (
        <Box w="100vw" minH="100vh" bg={bgGradient}>
            <Icon
                mt="30px"
                ml="50px"
                color={textColor}
                cursor="pointer"
                as={FaHome}
                mr={2}
                fontSize="3rem"
                onClick={() => navigate('/dashboard')}
            />

            <Flex
                w="100%"
                gap="20px"
                flexWrap="wrap"
                justify="center"
                p={4}
            >
                {/* Form Section */}
                <Box
                    mt="30px"
                    w={{ base: "100%", md: "46%" }}
                    h="auto"
                    p={5}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="lg"
                    bg={formBg}
                    boxShadow="md"
                >
                    <Stepper
                        index={step}
                        size="lg"
                        colorScheme={buttonColorScheme}
                        overflowX="auto"
                        pb={4}
                    >
                        {steps.map((s, i) => (
                            <Step
                                key={i}
                                onClick={() => setStep(i)}
                                cursor="pointer"
                                flexShrink={0}
                            >
                                <StepIndicator>
                                    <StepStatus
                                        complete={<Icon as={s.icon} color={`${buttonColorScheme}.500`} />}
                                        incomplete={<Icon as={s.icon} color="gray.500" />}
                                    />
                                </StepIndicator>
                                <Box>
                                    <StepTitle color={textColor}>{s.label}</StepTitle>
                                </Box>
                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>

                    <Box mt={4}>
                        {step === 0 && (
                            <VStack spacing={4}>
                                {["name", "email", "phone", "address", "role"].map((field) => (
                                    <Input
                                        key={field}
                                        placeholder={field.toUpperCase()}
                                        value={formData.personalInfo[field] || (field === 'name' ? user?.name : "") || (field === 'email' ? user?.email : "")}
                                        onChange={(e) => handleChange("personalInfo", null, field, e.target.value)}
                                        focusBorderColor={`${buttonColorScheme}.500`}
                                    />
                                ))}
                            </VStack>
                        )}

                        {step === 1 && (
                            <>
                                <Flex justify="flex-end" mb={2}>
                                    <Button
                                        onClick={() => handleGenerateJobSummary(
                                            `generate two line summary for ${formData.personalInfo.role} role for resume`,
                                            "summary",
                                            null,
                                            null
                                        )}
                                        colorScheme={buttonColorScheme}
                                        isLoading={aiLoading}
                                        leftIcon={<Icon as={FaBriefcase} />}
                                    >
                                        Generate From AI
                                    </Button>
                                </Flex>
                                <Textarea
                                    placeholder="Enter job summary..."
                                    value={formData.summary || resume?.summary || ""}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    focusBorderColor={`${buttonColorScheme}.500`}
                                    minH="150px"
                                />
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {(formData?.experience?.length > 0 ? formData.experience : resume?.experience || []).map((exp, index) => (
                                    <VStack
                                        key={index}
                                        spacing={3}
                                        border="1px solid"
                                        borderColor={borderColor}
                                        p={3}
                                        borderRadius="md"
                                        mb={4}
                                    >
                                        <Input
                                            placeholder="Company Name"
                                            value={exp.company}
                                            onChange={(e) => handleChange("experience", index, "company", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                        />
                                        <Input
                                            placeholder="Duration"
                                            value={exp.duration}
                                            onChange={(e) => handleChange("experience", index, "duration", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                        />
                                        <Input
                                            placeholder="Role"
                                            value={exp.role}
                                            onChange={(e) => handleChange("experience", index, "role", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                        />
                                        <Flex justify="flex-end" w="100%">
                                            <Button
                                                onClick={() => handleGenerateJobSummary(
                                                    `Generate a professional experience summary in four bullet points, each starting with *, for someone who worked at ${exp.company} for ${exp.duration} year(s) in the role of ${exp.role}.
Each bullet point must be exactly 7 words long, focusing on key skills, responsibilities, technologies, or accomplishments relevant to the role.`,
                                                    "experience",
                                                    index,
                                                    "details"
                                                )}
                                                colorScheme={buttonColorScheme}
                                                isLoading={aiLoading}
                                                size="sm"
                                            >
                                                Generate Experience
                                            </Button>
                                        </Flex>
                                        <Textarea
                                            placeholder="Experience (Bullet Points)"
                                            value={exp.details}
                                            onChange={(e) => handleChange("experience", index, "details", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                            minH="100px"
                                        />
                                        <Button
                                            onClick={() => handleExpDelete(index)}
                                            colorScheme="red"
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </VStack>
                                ))}
                                <Button
                                    onClick={() => addMoreFields("experience", { company: "", duration: "", role: "", details: "" })}
                                    colorScheme={buttonColorScheme}
                                    mt={2}
                                >
                                    Add More Experience
                                </Button>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                {(formData?.projects?.length > 0 ? formData.projects : resume?.projects || []).map((proj, index) => (
                                    <VStack
                                        key={index}
                                        spacing={3}
                                        border="1px solid"
                                        borderColor={borderColor}
                                        p={3}
                                        borderRadius="md"
                                        mb={4}
                                    >
                                        <Input
                                            placeholder="Project Name"
                                            value={proj.name}
                                            onChange={(e) => handleChange("projects", index, "name", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                        />
                                        <HStack w="100%">
                                            <Input
                                                placeholder="From"
                                                value={proj.from}
                                                onChange={(e) => handleChange("projects", index, "from", e.target.value)}
                                                focusBorderColor={`${buttonColorScheme}.500`}
                                            />
                                            <Input
                                                placeholder="To"
                                                value={proj.to}
                                                onChange={(e) => handleChange("projects", index, "to", e.target.value)}
                                                focusBorderColor={`${buttonColorScheme}.500`}
                                            />
                                        </HStack>
                                        <Button
                                            onClick={() => handleGenerateJobSummary(
                                                `Generate only a project description for the project named ${proj.name}, which was developed from ${proj.from} to ${proj.to}.
The description should consist of four lines, each containing exactly 7 words, and each line should begin with a * symbol.`,
                                                "projects",
                                                index,
                                                "description"
                                            )}
                                            colorScheme={buttonColorScheme}
                                            isLoading={aiLoading}
                                            size="sm"
                                        >
                                            Generate Description
                                        </Button>
                                        <Textarea
                                            placeholder="Project Description (Bullet Points)"
                                            value={proj.description}
                                            onChange={(e) => handleChange("projects", index, "description", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                            minH="100px"
                                        />
                                        <Button
                                            onClick={() => handleProjDelete(index)}
                                            colorScheme="red"
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </VStack>
                                ))}
                                <Button
                                    onClick={() => addMoreFields("projects", { name: "", from: "", to: "", description: "" })}
                                    colorScheme={buttonColorScheme}
                                    mt={2}
                                >
                                    Add More Projects
                                </Button>
                            </>
                        )}

                        {step === 4 && (
                            <>
                                {formData.education.map((edu, index) => (
                                    <VStack
                                        key={index}
                                        spacing={3}
                                        border="1px solid"
                                        borderColor={borderColor}
                                        p={3}
                                        borderRadius="md"
                                        mb={4}
                                    >
                                        <Input
                                            placeholder="College Name"
                                            value={edu.college}
                                            onChange={(e) => handleChange("education", index, "college", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                        />
                                        <Input
                                            placeholder="Passing Year"
                                            value={edu.year}
                                            onChange={(e) => handleChange("education", index, "year", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                        />
                                        <Input
                                            placeholder="Percentage"
                                            value={edu.percentage}
                                            onChange={(e) => handleChange("education", index, "percentage", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                        />
                                        <Input
                                            placeholder="Degree"
                                            value={edu.degree}
                                            onChange={(e) => handleChange("education", index, "degree", e.target.value)}
                                            focusBorderColor={`${buttonColorScheme}.500`}
                                        />
                                        <Button
                                            onClick={() => handleEduDelete(index)}
                                            colorScheme="red"
                                            size="sm"
                                        >
                                            Delete
                                        </Button>
                                    </VStack>
                                ))}
                                <Button
                                    onClick={() => addMoreFields("education", { college: "", year: "", percentage: "", degree: "" })}
                                    colorScheme={buttonColorScheme}
                                >
                                    Add More Education
                                </Button>
                            </>
                        )}

                        {step === 5 && (
                            <Textarea
                                placeholder="Enter skills (comma separated)"
                                value={formData.skills.join(", ")}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(", ") })}
                                focusBorderColor={`${buttonColorScheme}.500`}
                                minH="100px"
                            />
                        )}

                        {step === 6 && (
                            <Textarea
                                placeholder="Enter hobbies"
                                value={formData.hobbies}
                                onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
                                focusBorderColor={`${buttonColorScheme}.500`}
                                minH="100px"
                            />
                        )}

                        {step === 7 && (
                            <>
                                <Textarea
                                    placeholder="Enter languages known"
                                    value={formData.languages}
                                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                                    focusBorderColor={`${buttonColorScheme}.500`}
                                    minH="100px"
                                />
                                <Flex justify="flex-end" mt={4}>
                                    <Button
                                        colorScheme="green"
                                        onClick={handleFinish}
                                        size="lg"
                                    >
                                        Finish
                                    </Button>
                                </Flex>
                            </>
                        )}
                    </Box>

                    <HStack mt={6} justify="space-between">
                        <Button
                            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                            isDisabled={step === 0}
                            colorScheme={buttonColorScheme}
                            variant="outline"
                        >
                            Back
                        </Button>
                        <Button
                            isLoading={loading}
                            onClick={() => {
                                handleDataSave();
                                setStep((prev) => Math.min(steps.length - 1, prev + 1));
                            }}
                            colorScheme={buttonColorScheme}
                            isDisabled={step === steps.length - 1}
                        >
                            Next
                        </Button>
                    </HStack>
                </Box>

                {/* Preview Section */}
                <Box
                    mt="30px"
                    w={{ base: "100%", md: "46%" }}
                    h="auto"
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="lg"
                    bg={formBg}
                    boxShadow="md"
                    p={2}
                >
                    {choice === "Template1" && <Template1 formData={formData} resume={resume} />}
                    {choice === "Template2" && <Template2 formData={formData} resume={resume} />}
                    {choice === "Template3" && <Template3 formData={formData} resume={resume} />}
                </Box>
            </Flex>
        </Box>
    );
}

export default ChoosedResumeMaker;