import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useLatestRef,
    useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useResumeContext } from '../context/resumeTemplateContext'
import { Avatar, Box, Button, Flex, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";
import { useAuthentication } from '../context/authContext';
import { Template1, Template2, Template3 } from '../miscellaneous/ResumePreviewTemplates';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';




function ResumeTemplates() {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const { user } = useAuthentication()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { choices } = useResumeContext();
    const [selectedResume, setSelectedResume] = useState(null);
    const location = useLocation();
    const toast = useToast()
    const newResumeName = location.state?.newResumeName;
    console.log(newResumeName);
    const [chooseLoader, setChooseLoader] = useState(false)

    const creatingSelectedResume = async () => {
        // console.log("Runnig");

        setChooseLoader(true)
        try {
            const newResume = { userId: user.userId, resumeName: newResumeName, templateName: selectedResume }
            const { data } = await axios.post(`${API_BASE_URL}/api/resume/create-c-resume`, newResume,
                { headers: { Authorization: `Bearer ${user.token}` } }
            )
            toast({
                title: "Created Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            setChooseLoader(false)

            // setNewResumeName("");
            // onClose();
            navigate('/dashboard')

        } catch (error) {
            setChooseLoader(false)
            console.log(error);

        }
    }
    return (
        <>
            <Flex
                flexWrap="wrap"
                gap="20px"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bgGradient="linear(to-r, gray.100, blue.100)" // Background gradient
                p={6}
            >
                {choices.map((c, i) => (
                    <Box
                        key={i}
                        w="260px"
                        h="350px"
                        bg="white"
                        borderRadius="12px"
                        boxShadow="lg"
                        border="2px solid"
                        borderColor="gray.300"
                        p={4}
                        transition="all 0.3s"
                        _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "2xl",
                            cursor: "pointer",
                            bg: useColorModeValue("gray.200", "gray.700"),
                        }}
                        onClick={() => {
                            onOpen()
                            setSelectedResume(c)

                        }}

                    >
                        <VStack spacing={3}>
                            {/* Resume Icon */}
                            <FaFileAlt size="50px" color="#2D3748" />

                            {/* Placeholder Image */}
                            <Avatar name={user ? (user.name) : ""} src={user ? (user.pic) : ""} size='2xl' cursor='pointer'
                            />
                            {/* <Image
                            src={`https://source.unsplash.com/250x150/?resume,template${i}`}
                            alt="Resume Preview"
                            borderRadius="8px"
                        /> */}

                            {/* Resume Title */}
                            <Text fontSize="lg" fontWeight="bold" color="gray.700">
                                {c}
                            </Text>
                        </VStack>
                        {/* <Box display={'flex'} justifyContent={'center'}>

                            <Button p={4} bgColor={'orange'}>Select</Button>
                        </Box> */}
                    </Box>

                ))}
            </Flex>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    maxW={{ base: "100%", md: "900px", lg: "900px" }} // Adjust width based on screen size
                    maxH={{ base: "100vh", md: "90vh", lg: "100%" }} // Maintain A4 height 
                    p={{ base: "10px", md: "20px", lg: "30px" }} // Adjust padding for readability
                    overflowY="auto" // Allow scrolling if content exceeds modal height
                >
                    <ModalHeader>{selectedResume}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedResume === "Template1" ? (<Template1 selectedResume={selectedResume} />) : null}
                        {selectedResume === "Template2" ? (<Template2 selectedResume={selectedResume} />) : null}
                        {selectedResume === "Template3" ? (<Template3 selectedResume={selectedResume} />) : null}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={creatingSelectedResume} bgColor={'orange'} isLoading={chooseLoader} >Select</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ResumeTemplates