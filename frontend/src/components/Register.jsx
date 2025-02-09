import React, { useEffect, useState, useRef } from "react";
import { Box, Input, Button, Heading, VStack, Text, useToast, Flex, useColorModeValue, Image } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Globe from "react-globe.gl";

function Register() {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const toast = useToast()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true)
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (formData.name === "" || formData.email === "" || formData.password === "") {
            toast({
                title: "Credentials",
                description: "Enter all credential to proceed",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"

            })
            setLoading(false)
            return;
        }
        if (!regex.test(formData.email)) {
            toast({
                title: "Email",
                description: "Enter Valid email Address",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"

            })
            setLoading(false)
            return;
        }
        if (formData.password.length < 6) {
            toast({
                title: "Password",
                description: "Lenght should be greater than six",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"

            })
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post(`${API_BASE_URL}/api/user/register`, formData, config);

            toast({
                title: data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })

            setLoading(false)
            navigate("/login");
        } catch (error) {
            setLoading(false)
            if (error.response && error.response.status === 400) {
                // User already registered
                toast({
                    title: "User Already Registered",
                    description: error.response.data.message || "Please login instead.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
            } else {
                // Other errors
                toast({
                    title: "Registration Failed",
                    description: error.response?.data?.message || error.message || "Something went wrong.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        }
    };
    const bgColor = useColorModeValue("gray.50", "gray.800");
    const globeEl = useRef();
    // const cardBgColor = useColorModeValue("white", "gray.700");
    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 1.5;
        }
    }, []);

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bgGradient="linear(to-r, yellow.400, purple.600)" // AI-themed background
            bgSize="cover"
            bgPosition="center"
            position="relative"
            overflow="hidden"
        >
            {/* 3D Globe Background */}
            <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                zIndex={1}
            >
                <Globe
                    ref={globeEl}
                    globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    backgroundColor="rgba(0, 0, 0, 0)"
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            </Box>

            {/* Overlay for better readability */}
            <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                bg="rgba(0, 0, 0, 0.5)" // Semi-transparent overlay
                zIndex={2}
            />

            {/* Registration Form */}
            <Box
                w={["90%", "400px"]}
                p={8}
                borderRadius="2xl"
                textAlign="center"
                bg='transparent'
                position="relative"
                zIndex={3}
                boxShadow="2xl"
            >
                {/* Logo and Heading */}
                <Heading size="xl" mb={6} color="blue.500">
                    AI Resume Builder
                </Heading>

                {/* Form */}
                <VStack spacing={4}>
                    <Input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        leftIcon={<FaUser />}
                        variant="filled"
                        size="lg"
                        bg={"transparent"}
                        color={"white"}
                    />
                    <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={handleChange}
                        leftIcon={<FaEnvelope />}
                        variant="filled"
                        size="lg"
                        bg={"transparent"}
                        color={"white"}
                    />
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange}
                        leftIcon={<FaLock />}
                        variant="filled"
                        size="lg"
                        bg={"transparent"}
                        color={"white"}
                    />
                    <Button
                        isLoading={loading}
                        colorScheme="blue"
                        onClick={handleSubmit}
                        size="lg"
                        w="100%"
                        mt={4}
                    >
                        Sign Up
                    </Button>
                </VStack>

                {/* Login Link */}
                <Text mt={6} color="gray.500">
                    Already have an account?{" "}
                    <Button
                        variant="link"
                        color="blue.500"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                </Text>
            </Box>
        </Flex>
    );
}

export default Register;
