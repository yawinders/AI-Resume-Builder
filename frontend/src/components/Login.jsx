import React, { useState } from "react";
import { Box, Input, Button, Heading, VStack, Text, useToast, Flex, Image, useColorModeValue, Icon, InputLeftElement, InputGroup } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaPenFancy, FaRobot, FaUser } from "react-icons/fa";
import { keyframes } from "framer-motion";
import CircleCanvas from "../miscellaneous/RotatingCircle.jsx";
import RotatingGears from "../miscellaneous/RotatingGears.jsx";


function Login({ setToken }) {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false)
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const navigate = useNavigate();
    const toast = useToast()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true)
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (formData.email === "" || formData.password === "") {
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
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post(`${API_BASE_URL}/api/user/login`, formData, config);
            toast({
                title: "Login Successfuly",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid credentials");
            setLoading(false)
        }
    };

    return (
        <Flex
            height="100vh"
            align="center"
            justify="center"
            bgGradient="linear(to-r, yellow.400, purple.600)"
            position="relative"
            overflow="hidden"
        >
            {/* Left Side - AI Illustration */}
            <CircleCanvas />
            <RotatingGears />
            <Box
                position="absolute"
                left={0}
                top={0}
                w="50%"
                h="100%"
                display={{ base: "none", lg: "block" }}
                backgroundImage="url('https://source.unsplash.com/800x800/?future,tech,ai')"
                backgroundSize="cover"

                backgroundPosition="center"
                filter="brightness(0.5)"
                zIndex={1}
            />

            {/* Right Side - Login Box */}
            <Box
                w={{ base: "90%", sm: "400px" }}
                p={8}
                boxShadow="2xl"
                borderRadius="lg"
                textAlign="center"
                bg="rgba(255, 255, 255, 0.15)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                position="relative"
                zIndex={2}

            >
                {/* Floating AI Icon */}
                <Box position="absolute" top="-40px" left="50%" transform="translateX(-50%)" p={3} bg="blue.500" borderRadius="full" boxShadow="lg">
                    <Icon as={FaRobot} color="white" boxSize={8} />
                </Box>

                <Heading size="lg" mb={6} color="white">
                    AI Resume Builder Login
                </Heading>

                <VStack spacing={5}>
                    {/* Email Input with Icon */}
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={FaEnvelope} color="gray.300" />
                        </InputLeftElement>
                        <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={handleChange}
                            focusBorderColor="blue.400"
                            bg="white"
                            borderRadius="md"
                        />
                    </InputGroup>

                    {/* Password Input with Icon */}
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={FaLock} color="gray.300" />
                        </InputLeftElement>
                        <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={handleChange}
                            focusBorderColor="blue.400"
                            bg="white"
                            borderRadius="md"
                        />
                    </InputGroup>

                    {/* Login Button with Gradient Effect */}
                    <Button
                        isLoading={loading}
                        onClick={handleSubmit}
                        colorScheme="blue"
                        bgGradient="linear(to-r, blue.400, blue.600)"
                        _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)", transform: "scale(1.05)" }}
                        transition="0.3s ease-in-out"
                        size="lg"
                        borderRadius="full"
                        w="full"
                    >
                        Login
                    </Button>
                </VStack>

                {/* Sign-up Option */}
                <Text mt={5} color="white">
                    Don't have an account?{" "}
                    <Button
                        variant="link"
                        onClick={() => navigate("/register")}
                        color="blue.300"
                    >
                        Sign Up
                    </Button>
                </Text>
            </Box>
        </Flex>
    );
}

export default Login;
