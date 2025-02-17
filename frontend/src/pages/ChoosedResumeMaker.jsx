import { Flex } from '@chakra-ui/react';
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Template1, Template2, Template3 } from '../miscellaneous/ResumePreviewTemplates';
import { FaBriefcase, FaCogs, FaGlobe, FaGraduationCap, FaHeart, FaRProject, FaUser } from 'react-icons/fa';
import { useResumeContext } from '../context/resumeTemplateContext';

import { useState } from "react";
import {
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
} from "@chakra-ui/react";

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
    const [step, setStep] = useState(0);
    const location = useLocation()
    const resume = location.state?.resume;
    console.log(resume);

    const choice = location.state?.selectedResume;
    // console.log((choice));

    const { formData, handleChange, addMoreFields, setFormData, handleGenerateJobSummary, aiLoading, handleExpDelete, handleProjDelete, handleEduDelete } = useResumeContext();


    return (
        <Flex w="100vw" gap="5px" >
            <Box
                mt="100px"
                mx="auto"
                w="46%"
                h="auto"
                p={5}

                border="2px solid black"
                bg="white"
            >

                <Stepper index={step} size="lg" colorScheme="purple" display={'flex'} flexWrap={'wrap'}>
                    {steps.map((s, i) => (
                        <Step key={i}>
                            <StepIndicator >
                                <StepStatus complete={<Icon as={s.icon} />} incomplete={<Icon as={s.icon} />} />
                            </StepIndicator>
                            <Box>
                                <StepTitle>{s.label}</StepTitle>
                                <StepDescription></StepDescription>
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
                                    value={formData.personalInfo[field]}
                                    onChange={(e) => handleChange("personalInfo", null, field, e.target.value)}
                                />
                            ))}
                        </VStack>
                    )}

                    {step === 1 && (
                        <>
                            <Box display="flex" justifyContent={'flex-end'} mb={2} >
                                <Button
                                    onClick={() => handleGenerateJobSummary(`generate two line summary for ${formData.personalInforole} role for resume`, "summary", null, null)}
                                    color={'white'}
                                    bgColor={'blue.900'}
                                    isLoading={aiLoading}
                                >
                                    ♾️Generate From AI
                                </Button>
                            </Box>
                            <Textarea
                                placeholder="Enter job summary..."
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            />
                        </>
                    )}

                    {step === 2 &&
                        formData.experience.map((exp, index) => (
                            <VStack key={index} spacing={3} border="1px solid gray" p={3} borderRadius="md">
                                <Input
                                    placeholder="Company Name"
                                    value={exp.company}
                                    onChange={(e) => handleChange("experience", index, "company", e.target.value)}
                                />
                                <Input
                                    placeholder="Duration"
                                    value={exp.duration}
                                    onChange={(e) => handleChange("experience", index, "duration", e.target.value)}
                                />
                                <Input
                                    placeholder="Role"
                                    value={exp.role}
                                    onChange={(e) => handleChange("experience", index, "role", e.target.value)}
                                />
                                <Box display="flex" justifyContent={'flex-end'} mb={2} >
                                    <Button
                                        onClick={() => handleGenerateJobSummary(`generate experience for working in company ${exp.company} for duration of ${exp.duration} year in the position of  ${exp.role} in four points line using * symbol each line should be of 7 words`, "experience", index, "details")}
                                        color={'white'}
                                        bgColor={'blue.900'}
                                        isLoading={aiLoading}
                                    >
                                        ♾️Generate From AI
                                    </Button>
                                </Box>
                                <Textarea
                                    placeholder="Experience (Bullet Points)"
                                    value={exp.details}
                                    onChange={(e) => handleChange("experience", index, "details", e.target.value)}
                                /><Button onClick={() => handleExpDelete(index)}>
                                    Delete
                                </Button>
                            </VStack>
                        ))}
                    {step === 2 && (
                        <Button onClick={() => addMoreFields("experience", { company: "", duration: "", role: "", details: "" })}>
                            Add More Experience
                        </Button>
                    )}

                    {step === 3 &&
                        formData.projects.map((proj, index) => (
                            <VStack key={index} spacing={3} border="1px solid gray" p={3} borderRadius="md">
                                <Input
                                    placeholder="Project Name"
                                    value={proj.name}
                                    onChange={(e) => handleChange("projects", index, "name", e.target.value)}
                                />
                                <HStack>
                                    <Input
                                        placeholder="From"
                                        value={proj.from}
                                        onChange={(e) => handleChange("projects", index, "from", e.target.value)}
                                    />
                                    <Input
                                        placeholder="To"
                                        value={proj.to}
                                        onChange={(e) => handleChange("projects", index, "to", e.target.value)}
                                    />
                                </HStack>
                                <Button
                                    onClick={() => handleGenerateJobSummary(`generate only project description for project name ${proj.name} for duration of ${proj.from} to ${proj.to} of four lines of 7 words and each line starts with * mark  `, "projects", index, "description")}
                                    color={'white'}
                                    bgColor={'blue.900'}
                                    isLoading={aiLoading}
                                >
                                    ♾️Generate From AI
                                </Button>
                                <Textarea
                                    placeholder="Project Description (Bullet Points)"
                                    value={proj.description}
                                    onChange={(e) => handleChange("projects", index, "description", e.target.value)}
                                />
                                <Button onClick={() => handleProjDelete(index)}>
                                    Delete
                                </Button>
                            </VStack>
                        ))}
                    {step === 3 && (
                        <Button onClick={() => addMoreFields("projects", { name: "", from: "", to: "", description: "" })}>
                            Add More Projects
                        </Button>
                    )}

                    {step === 4 &&
                        formData.education.map((edu, index) => (
                            <VStack key={index} spacing={3} border="1px solid gray" p={3} borderRadius="md">
                                <Input
                                    placeholder="College Name"
                                    value={edu.college}
                                    onChange={(e) => handleChange("education", index, "college", e.target.value)}
                                />
                                <Input
                                    placeholder="Passing Year"
                                    value={edu.year}
                                    onChange={(e) => handleChange("education", index, "year", e.target.value)}
                                />
                                <Input
                                    placeholder="Percentage"
                                    value={edu.percentage}
                                    onChange={(e) => handleChange("education", index, "percentage", e.target.value)}
                                />
                                <Input
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleChange("education", index, "degree", e.target.value)}
                                />
                                <Button onClick={() => handleEduDelete(index)}>
                                    Delete
                                </Button>
                            </VStack>
                        ))}
                    {step === 4 && <Button onClick={() => addMoreFields("education", { college: "", year: "", percentage: "", degree: "" })}>Add More Education</Button>}

                    {step === 5 && (
                        <Textarea
                            placeholder="Enter skills (comma separated)"
                            value={formData.skills.join(", ")}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(", ") })}
                        />
                    )}

                    {step === 6 && <Textarea placeholder="Enter hobbies" value={formData.hobbies} onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })} />}
                    {step === 7 && <Textarea placeholder="Enter languages known" value={formData.languages} onChange={(e) => setFormData({ ...formData, languages: e.target.value })} />}
                </Box>

                <HStack mt={6}>
                    <Button onClick={() => setStep((prev) => Math.max(0, prev - 1))} isDisabled={step === 0}>Back</Button>
                    <Button onClick={() => setStep((prev) => Math.min(steps.length - 1, prev + 1))}>Next</Button>
                </HStack>
            </Box>

            <Box
                mt="100px"
                mx="auto"
                w="46%"
                h="auto"
                border="2px solid black"
            >
                {choice === "Template1" ? <Template1 formData={formData} /> : null}
                {choice === "Template2" ? <Template2 formData={formData} /> : null}
                {choice === "Template3" ? <Template3 formData={formData} /> : null}

            </Box>
        </Flex>
    )
}

export default ChoosedResumeMaker