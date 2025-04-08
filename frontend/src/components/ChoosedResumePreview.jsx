import React, { useRef, useState } from 'react'
import { Template1, Template2, Template3 } from '../miscellaneous/ResumePreviewTemplates'
import { Box, Button, useColorMode } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { downloadResumeAsPDF } from '../miscellaneous/DownlaoadResumePdf'

const ChoosedResumePreview = () => {
    const location = useLocation()
    const choice = location.state?.choice
    // console.log(choice);
    const { formData, resume } = location.state
    // console.log(formData, resume);
    const [loading, setLoading] = useState(false)

    const resumeRef = useRef()
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box
                bg={colorMode === 'light' ? 'gray.50' : 'white'}
                color={colorMode === 'light' ? 'gray.900' : 'black'}
                display={'flex'}
                mt={10}
                justifyContent={"center"}
            ><Button bgColor={"palegoldenrod"} isLoading={loading} onClick={() => downloadResumeAsPDF(resumeRef, loading, setLoading)}>Download</Button></Box>
            <Box mx={'auto'} w={["90%", "80%", "70%", "60%"]} my={10}>
                {choice === "Template1" && <Template1 formData={formData} resume={resume} resumeRef={resumeRef} />}
                {choice === "Template2" && <Template2 formData={formData} resume={resume} resumeRef={resumeRef} />}
                {choice === "Template3" && <Template3 formData={formData} resume={resume} resumeRef={resumeRef} />}
            </Box>

        </>
    )
}

export default ChoosedResumePreview