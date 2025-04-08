

import {
    Box, Button, Container, Flex, Heading, Text, VStack, Link, Image,
    useColorMode, IconButton, Stack
} from "@chakra-ui/react";
import { ChevronRightIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import logoHome from "../assets/logohome.png"
import FeaturesSection from "../components/Features";
import { AboutPage } from "../components/About";

import { ContactPage } from "../components/Contact";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate('/login');
    }
    const user = JSON.parse(localStorage.getItem("userInfo"));
    let token;
    if (user) {
        token = user.token;
    }
    const handleLogout = () => {
        if (!confirm('Confirm Logout')) return;
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <Box bg={colorMode === 'light' ? 'gray.50' : 'gray.900'} minH="100vh">
            {/* Navigation */}
            <Box
                as="nav"
                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                py={4}
                boxShadow="sm"
            >
                <Container maxW="container.lg">
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Image
                                src={colorMode === 'light'
                                    // "https://dummyimage.com/160x40/3182ce/ffffff.png&text=Logo"
                                    ? `${logoHome}`

                                    : `${logoHome}`
                                    //  "https://dummyimage.com/160x40/90cdf4/1a202c.png&text=Logo"

                                }
                                alt="Logo"
                                h="40px"
                                mr={{ base: 4, md: 8 }}
                                borderRadius={5}
                            />
                            <Stack
                                direction={{ base: 'column', md: 'row' }}
                                display={{ base: 'none', md: 'flex' }}
                                gap={{ base: 2, md: 6 }}
                            >
                                <Link as={RouterLink} to='/dashboard' fontWeight="medium" _hover={{ color: "blue.500" }}>DashBoard</Link>
                                <Link href="#features" fontWeight="medium" _hover={{ color: "blue.500" }}>Features</Link>
                                <Link href="#aboutpage" fontWeight="medium" _hover={{ color: "blue.500" }}>About</Link>
                                <Link href="#contactpage" fontWeight="medium" _hover={{ color: "blue.500" }}>Contact</Link>
                            </Stack>
                        </Flex>
                        <Flex align="center" gap={4}>
                            <IconButton
                                aria-label="Toggle color mode"
                                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                onClick={toggleColorMode}
                                variant="ghost"
                            />
                            {!token ? <Button onClick={handleSignIn} colorScheme="blue" size="sm" display={{ base: 'none', sm: 'block' }}>
                                Sign In
                            </Button> : <Button onClick={handleLogout} colorScheme="blue" size="sm" display={{ base: 'none', sm: 'block' }}>
                                Log Out
                            </Button>}
                        </Flex>
                    </Flex>
                </Container>
            </Box>

            {/* Hero Section */}
            <Container maxW="container.lg" py={{ base: 12, md: 20 }} px={{ base: 4, md: 0 }}>
                <Flex
                    direction={{ base: "column-reverse", md: "row" }}
                    align="center"
                    gap={{ base: 8, md: 12 }}
                >
                    <VStack align="start" spacing={6} flex={1}>
                        <Heading
                            as="h1"
                            size={{ base: "xl", md: "2xl" }}
                            lineHeight="1.2"
                            fontWeight="bold"
                        >
                            Build Smart <Box as="span" color="blue.500">AI-Powered</Box><br />
                            Resumes in Minutes!
                        </Heading>

                        <Box
                            bg={colorMode === 'light' ? 'blue.50' : 'blue.900'}
                            p={4}
                            borderRadius="lg"
                            borderLeft="4px solid"
                            borderColor="blue.500"
                        >
                            <Text fontWeight="bold" fontSize="lg">RESUME</Text>
                            <Text mt={1}>Leverage AI to create a job-winning resume effortlessly.</Text>
                        </Box>

                        <Button
                            colorScheme="blue"
                            size="lg"
                            rightIcon={<ChevronRightIcon />}
                            px={8}
                        >
                            Get Started
                        </Button>
                    </VStack>

                    <Box flex={1} w="full">
                        <Image
                            src={colorMode === 'light'
                                ? "https://dummyimage.com/600x400/3182ce/ffffff.png&text=AI+Resume+Builder"
                                : "https://dummyimage.com/600x400/1a365d/90cdf4.png&text=AI+Resume+Builder"
                            }
                            alt="AI Resume Builder"
                            borderRadius="lg"
                            boxShadow="xl"
                            w="full"
                        />
                    </Box>
                </Flex>
            </Container>
            {/* feature section */}
            <Box id="features"></Box>
            <FeaturesSection />
            <Box id="aboutpage"></Box>
            <AboutPage />
            <Box id="contactpage"></Box>
            <ContactPage />
        </Box>
    );
};

// Wrap this in your App with ChakraProvider and ColorModeProvider
export default HomePage;