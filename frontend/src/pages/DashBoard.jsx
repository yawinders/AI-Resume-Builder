import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Input, Image, VStack, Text, Icon, useDisclosure, IconButton, useToast, ModalFooter } from "@chakra-ui/react";
import { FaPlus, FaFileAlt, FaRegFileAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircleCanvas from "../miscellaneous/RotatingCircle";
import RotatingGears from "../miscellaneous/RotatingGears";
import WelcomeMessage from "../miscellaneous/WelcomeMessage";
import { DeleteIcon } from "@chakra-ui/icons";
import { AuthContext } from "../context/authContext";
import resumeThumbaNail from "../assets/resume thumbnail.webp"

function Dashboard() {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const [resumes, setResumes] = useState([]);
    // const resume = useState([])
    // console.log(resume);

    const [newResumeName, setNewResumeName] = useState("");
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const { user, pic, setUser } = useContext(AuthContext)
    // console.log(pic);

    console.log(user);


    const toast = useToast();

    const handleAddResume = async () => {
        if (newResumeName === "") {
            toast({
                title: "Enter the Name",
                // description:"Name field Can't be empty",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"


            })
            return;
        }
        try {
            setLoading(true)
            const user = JSON.parse(localStorage.getItem("userInfo"));

            const newResume = { userId: user.userId, resumeName: newResumeName };
            await axios.post("http://localhost:5000/api/resume/create", newResume, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            toast({
                title: "Created Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            setLoading(false)
            setResumes([...resumes, { name: newResumeName }]);
            setNewResumeName("");
            onClose();
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!user) {
            navigate("/login");
        } else {

            // console.log(user);
            // Fetch saved resumes
            axios.get(`${API_BASE_URL}/api/resume/${user.userId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            }).then(response => {
                // console.log(response.data);

                setResumes(response.data);
            }).catch(() => {
                navigate("/login");
            });
        }
    }, [navigate, loading, delLoading]);

    const handleEditClick = (resume) => {
        navigate('/create-resume', { state: { resume } })
    }
    const handleResumeDelete = async (e, resumeId) => {
        setDelLoading(true)
        e.stopPropagation()
        // console.log(resumeId);

        try {

            await axios.delete(`http://localhost:5000/api/resume/delete/${resumeId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            })
            toast({
                title: "Resume Deleted",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            setDelLoading(false)
        } catch (error) {
            setDelLoading(false)
            console.log(error);
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })

        }

    }

    const handleChoose = () => {
        if (newResumeName === "") {
            toast({
                title: "Enter the Name",
                // description:"Name field Can't be empty",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"


            })
            return;
        }
        navigate('/resume-templates')
    }
    return (
        <Box p={6} bgGradient="linear(to-r, yellow.400, purple.600)" minH="100vh" color="white">
            <Heading mb={6} textAlign="center" fontSize="3xl">
                Your Resumes <WelcomeMessage />
            </Heading>

            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
                {resumes.length > 0 ? (
                    resumes.map((resume, index) => (
                        <Box
                            key={index}
                            p={4}
                            bg="white"
                            borderRadius="md"
                            textAlign="center"
                            color="gray.800"
                            boxShadow="lg"
                            transition="0.3s"
                            _hover={{ transform: "scale(1.05)" }}
                            cursor="pointer"
                            onClick={() => handleEditClick(resume)}
                        >
                            <Box h="250px" bg="gray.200" borderRadius="md" mb={4} display="flex" alignItems="center" justifyContent="center">
                                <Image src={resumeThumbaNail} w="100%" height="100%" />
                                {/* <Icon as={FaFileAlt} boxSize={12} color="gray.500" /> */}
                            </Box>
                            <Heading size="md">{resume.resumeName}  <IconButton isLoading={delLoading} onClick={(e) => handleResumeDelete(e, resume._id)} icon={<DeleteIcon />} /></Heading>

                        </Box>
                    ))
                ) : (
                    <VStack w="full" spacing={4}>
                        <Image src="/no-data.png" boxSize="150px" alt="" />
                        <Text fontSize="lg">No resumes created yet.</Text>
                    </VStack>
                )}

                <Button
                    onClick={onOpen}
                    colorScheme="yellow"
                    size="lg"
                    borderRadius="full"
                    p={6}
                    boxShadow="xl"
                    _hover={{ transform: "scale(1.1)" }}
                >
                    <Icon as={FaPlus} boxSize={6} />
                </Button>
            </Grid>

            {/* Modal to Add Resume */}
            <Modal isOpen={isOpen} onClose={onClose} size="md" motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent borderRadius="lg" boxShadow="xl" bg="white">
                    <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">
                        <Icon as={FaRegFileAlt} boxSize={6} color="blue.500" mr={2} />
                        Create a New Resume
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <VStack spacing={4}>
                            <Text fontSize="sm" color="gray.600" textAlign="center">
                                Give your resume a unique name to get started!
                            </Text>
                            <Input
                                placeholder="Enter Resume Name"
                                value={newResumeName}
                                onChange={(e) => setNewResumeName(e.target.value)}
                                size="lg"
                                focusBorderColor="blue.500"
                                borderRadius="md"
                                boxShadow="sm"
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter justifyContent="center">
                        <Box
                            display="flex"
                            flexDir="column"
                            gap="20px"
                        >
                            <Text>Choose the template OR Go with the Default one</Text>

                            <Button colorScheme="orange" size="lg"
                                onClick={handleChoose}
                            >Choose</Button>
                            <Button
                                isLoading={loading}
                                colorScheme="blue"
                                size="lg"
                                width="full"
                                borderRadius="md"
                                boxShadow="md"
                                _hover={{ bg: "blue.600" }}
                                onClick={handleAddResume}
                            >
                                Default
                            </Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Dashboard;
