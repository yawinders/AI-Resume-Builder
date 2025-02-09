import React, { useRef, useState } from "react";
import { Box, Button, Divider, Flex, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import FilledStar from "../miscellaneous/FilledBar";
import FilledBar from "../miscellaneous/FilledBar";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResumePreview({ formData, themeColor }) {
    const location = useLocation()
    const { resumeData } = location.state || {}
    const resumeRef = useRef(null)
    // console.log(resumeData);

    const [loading, setLoading] = useState(false)
    // console.log(resumeRef.current.innerText);
    // console.log(resumeRef.current.innerHTML);
    const toast = useToast()



    const downloadResumeAsPDF = async () => {
        setLoading(true)
        if (!resumeRef.current) return;

        const canvas = await html2canvas(resumeRef.current, {
            scale: 2, // Higher scale for better clarity
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        // PDF Dimensions
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Image dimensions
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let yPosition = 0; // Start position

        // If image height is larger than PDF page, we need to split into multiple pages
        while (yPosition < imgHeight) {
            pdf.addImage(imgData, "PNG", 0, yPosition * -1, imgWidth, imgHeight);
            yPosition += pdfHeight; // Move to next page
            if (yPosition < imgHeight) pdf.addPage(); // Add new page if needed
        }
        setLoading(false)
        toast({
            title: "Download Successfully",

            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right"

        })

        pdf.save("resume.pdf");
    };
    return (
        <>
            {resumeData && <Box mt="20px">
                <Button isLoading={loading} colorScheme="blue" bgColor={`${resumeData.themeColor}`} onClick={downloadResumeAsPDF}>Download Resume</Button>
            </Box>}
            <Box
                mb="20px"
                ref={resumeRef}
                w={{
                    base: "100%",  // 100% width on mobile
                    md: resumeData ? "60%" : "47%"  // Dynamic width on medium+ screens
                }}
                mx={resumeData ? "auto" : null}
                p={6}
                bg="gray.50"
                borderRadius="lg"
                boxShadow="lg"
                borderTop={`8px solid ${themeColor || resumeData.themeColor}`}
            >
                <VStack align="start" spacing={4} >
                    <Box w="100%" display="flex" justifyContent="center" flexDir="column">
                        <Heading mx={"auto"} color={themeColor} size="lg">
                            {formData?.name || resumeData?.userName || "Your Name"}
                        </Heading>
                        <Text mx={"auto"}>
                            <strong>{formData?.jobTitle || resumeData?.jobTitle || "Job Title"}</strong>
                        </Text>
                        <Text mx={"auto"}>
                            {formData?.address || resumeData?.address || "Address"}
                        </Text>
                    </Box>

                    <Box display={"flex"} justifyContent={"space-between"} w="100%">
                        <Text>{formData?.phone || resumeData?.phoneNumber || "Number"} </Text>
                        <Text>{formData?.email || resumeData?.email || "your.email@example.com"} </Text>
                    </Box>

                    <Divider borderColor={themeColor || resumeData.themeColor} borderWidth="2px" my={4} />

                    <Text>{formData?.jobSummary || resumeData?.jobSummary}</Text>

                    {/* Professional Experience */}
                    {(formData?.experience || resumeData?.experience || formData?.company || resumeData?.company) && (
                        <>
                            <Text mx={"auto"} color={themeColor || resumeData.themeColor}>
                                <strong>Professional Experience</strong>
                            </Text>
                            <Divider borderColor={themeColor || resumeData.themeColor} borderWidth="2px" my={4} />
                        </>
                    )}

                    <Box w="100%">
                        <Flex w="100%" justifyContent="space-between">
                            {formData?.role || resumeData?.role ? (
                                <Text color={themeColor || resumeData.themeColor}>{formData?.role || resumeData?.role}</Text>
                            ) : null}
                            <Text>Start To End</Text>
                        </Flex>
                        <Text>{formData?.company || resumeData?.company}</Text>
                    </Box>
                    <Text>{formData?.experience || resumeData?.experience}</Text>

                    {/* Education Preview */}
                    {(formData?.education?.length > 0 || resumeData?.education?.length > 0) && (
                        <>
                            <Text mx={"auto"} color={themeColor || resumeData.themeColor}>
                                <strong>Education:</strong>
                            </Text>
                            <Divider borderColor={themeColor || resumeData.themeColor} borderWidth="2px" my={4} />
                        </>
                    )}
                    {(formData?.education || resumeData?.education || []).map((edu, index) => (
                        <Box w="100%" key={index}>
                            <Box display="flex" w="100%" justifyContent="space-between">
                                <Text color={themeColor || resumeData.themeColor}>{edu.institution}</Text>
                                <Text>{edu.year}</Text>
                            </Box>
                            <Box display="flex" w="100%" justifyContent="space-between">
                                <Text>{edu.degree}</Text>
                                <Text>{edu.percentage ? `${edu.percentage}%` : ""}</Text>
                            </Box>
                        </Box>
                    ))}

                    {/* Skills Preview */}
                    {(formData?.skills?.length > 0 || resumeData?.skills?.length > 0) && (
                        <>
                            <Text mx={"auto"} color={themeColor || resumeData.themeColor}>
                                <strong>Skills</strong>
                            </Text>
                            <Divider borderColor={themeColor || resumeData.themeColor} borderWidth="2px" my={4} />
                        </>
                    )}
                    <Box w="100%" display="flex" gap="3px" flexWrap="wrap">
                        {(formData?.skills || resumeData?.skills || []).map((obj, i) => (
                            <Box key={i}>
                                <Text>
                                    <strong>{obj.name} </strong>
                                </Text>
                                <FilledBar rating={obj.rating} themeColor={themeColor || resumeData.themeColor} />
                            </Box>
                        ))}
                    </Box>

                    {/* Hobbies and Languages */}
                    {formData?.hobbies || resumeData?.interests ? (
                        <Text>
                            <strong>Hobbies:</strong> {formData?.hobbies || resumeData?.interests}
                        </Text>
                    ) : null}
                    {formData?.languages || resumeData?.languages ? (
                        <Text>
                            <strong>Languages:</strong> {formData?.languages || resumeData?.languages}
                        </Text>
                    ) : null}
                </VStack>
            </Box>
        </>
    );
}

export default ResumePreview;
