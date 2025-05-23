import React, { useState } from "react";
import {
    Box,
    Input,
    Button,
    Heading,
    VStack,
    Text,
    useToast,
    Flex,
    Icon,
    InputLeftElement,
    InputGroup,
    InputRightElement,
    useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaRobot } from "react-icons/fa";
import { useAuthentication } from "../context/authContext.jsx";
import RotatingGears from "../miscellaneous/RotatingGears.jsx";

function Login({ setToken }) {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const { setUser } = useAuthentication();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    // Define color values for light and dark mode
    const bgGradient = useColorModeValue("linear(to-r, yellow.400, purple.600)", "linear(to-r, gray.900, gray.700)");
    const cardBgColor = useColorModeValue("whiteAlpha.900", "gray.800");
    const inputBgColor = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("black", "white");

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true);
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formData.email || !formData.password) {
            toast({ title: "Missing Credentials", description: "Enter all credentials to proceed", status: "warning", duration: 5000, isClosable: true, position: "bottom" });
            setLoading(false);
            return;
        }
        if (!regex.test(formData.email)) {
            toast({ title: "Invalid Email", description: "Enter a valid email address", status: "warning", duration: 5000, isClosable: true, position: "top-right" });
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/user/login`, formData, { headers: { "Content-type": "application/json" } });
            toast({ title: "Login Successful", status: "success", duration: 5000, isClosable: true, position: "bottom" });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/dashboard");
        } catch (error) {
            toast({ title: "Login Failed", description: "Invalid credentials", status: "error", duration: 5000, isClosable: true, position: "bottom" });
            setLoading(false);
        }
    };
    const handleGuesUserLogin = () => {
        const guest = { email: 'guestuser@gmail.com', password: 'guest@123' }
        setFormData(guest)
    }

    return (
        <Flex height="100vh" align="center" justify="center" bgGradient={bgGradient} position="relative" overflow="hidden">
            <RotatingGears />

            {/* Left Side - Background Image */}
            <Box position="absolute" left={0} top={0} w="50%" h="100%" display={{ base: "none", lg: "block" }}
                backgroundImage="url('https://source.unsplash.com/800x800/?future,tech,ai')"
                backgroundSize="cover" backgroundPosition="center" filter="brightness(0.5)" zIndex={1}
            />

            {/* Right Side - Login Box */}
            <Box w={{ base: "90%", sm: "400px" }} p={8} boxShadow="2xl" borderRadius="lg" textAlign="center"
                bg={cardBgColor} backdropFilter="blur(10px)" border="1px solid rgba(255, 255, 255, 0.2)" position="relative" zIndex={2}
            >
                {/* Floating AI Icon */}
                <Box position="absolute" top="-40px" left="50%" transform="translateX(-50%)" p={3} bg="blue.500" borderRadius="full" boxShadow="lg">
                    <Icon as={FaRobot} color="white" boxSize={8} />
                </Box>

                <Heading size="lg" mb={6} color={textColor}>
                    AI Resume Builder Login
                </Heading>

                <VStack spacing={5}>
                    {/* Email Input */}
                    <InputGroup>
                        <InputLeftElement pointerEvents="none"><Icon as={FaEnvelope} color="gray.300" /></InputLeftElement>
                        <Input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange}
                            focusBorderColor="blue.400" bg={inputBgColor} color={textColor} borderRadius="md"
                        />
                    </InputGroup>

                    {/* Password Input */}
                    <InputGroup>
                        <InputLeftElement pointerEvents="none"><Icon as={FaLock} color="gray.300" /></InputLeftElement>
                        <Input name="password" value={formData.password} placeholder="Password" type={showPass ? "text" : "password"}
                            onChange={handleChange} focusBorderColor="blue.400" bg={inputBgColor} color={textColor} borderRadius="md"
                        />
                        <InputRightElement>
                            {showPass ? <Icon cursor="pointer" onClick={() => setShowPass(false)} as={FaEyeSlash} color="gray.300" />
                                : <Icon cursor="pointer" onClick={() => setShowPass(true)} as={FaEye} color="gray.300" />}
                        </InputRightElement>
                    </InputGroup>

                    {/* Login Button */}
                    <Button isLoading={loading} onClick={handleSubmit} colorScheme="blue" bgGradient="linear(to-r, blue.400, blue.600)"
                        _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)", transform: "scale(1.05)" }} transition="0.3s ease-in-out"
                        size="lg" borderRadius="full" w="full"
                    >
                        Login
                    </Button>
                    <Button isLoading={loading} onClick={handleGuesUserLogin} colorScheme="orange"
                        _hover={{ bgGradient: "linear(to-r, blue.500, blue.700)", transform: "scale(1.05)" }} transition="0.3s ease-in-out"
                        size="lg" borderRadius="full" w="full"
                    >
                        Guest User Login
                    </Button>
                </VStack>

                {/* Sign-up Option */}
                <Text mt={5} color={textColor}>
                    Don't have an account?{" "}
                    <Button variant="link" onClick={() => navigate("/register")} color="blue.300">
                        Sign Up
                    </Button>
                </Text>
            </Box>
        </Flex>
    );
}

export default Login;
