import React from "react";
import { Box, Flex, Heading, Spacer, Button, HStack, IconButton, useDisclosure, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Avatar, Menu, MenuButton, MenuList, MenuItem, Image, Stack, useColorMode, Container, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuthentication } from "../context/authContext";
import ProfileModal from "../miscellaneous/ProfileModal";
import { useResumeContext } from "../context/resumeTemplateContext";
import Logo from '../assets/logo.webp'
import logoHome from "../assets/logohome.png"
import { Link } from '@chakra-ui/react';

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    let token;
    if (user) {
        token = user.token;
    }

    const { pic } = useAuthentication()
    const handleLogout = () => {
        if (!confirm('Confirm Logout')) return;
        localStorage.removeItem("userInfo");
        navigate("/");
    };
    const { formData, setFormData } = useResumeContext()

    const { colorMode, toggleColorMode } = useColorMode();

    const handleSignIn = () => {
        navigate('/login');
    }

    return (
        <Box
            // bgGradient="linear(to-r, blue.700, purple.600)"
            px={6} py={4}
            // color="white"
            boxShadow="xl"
            position="sticky"
            top="0"
            zIndex="1000"
            bg={colorMode === 'light' ? 'white' : 'gray.800'}
            color={useColorModeValue("gray.800", "white")}
        >
            <Flex align="center" >
                <Heading size="lg" fontWeight="bold" fontFamily="Poppins, sans-serif" display="flex" gap={5} alignItems="center">
                    <Box boxSize='sm' w="120px" h="auto" mr={{ base: 4, md: 8 }}
                        borderRadius={5} overflow="hidden" border="2px solid white">
                        <Image src={logoHome} />
                    </Box>
                    <Link to="/dashboard" _hover={{ textDecoration: "none", color: "cyan.300" }}>
                        AI Resume Builder

                    </Link>
                </Heading>
                <Spacer />

                {/* Desktop Navigation */}
                <HStack HStack spacing={6} display={{ base: "none", md: "flex" }}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        display={{ base: 'none', md: 'flex' }}
                        gap={{ base: 2, md: 6 }}
                    >
                        <Link to='/' href="/" fontWeight="medium" _hover={{ color: "blue.500" }}>Home</Link>
                        <Link href="/#features" fontWeight="medium" _hover={{ color: "blue.500" }}>Features</Link>
                        <Link href="/#aboutpage" fontWeight="medium" _hover={{ color: "blue.500" }}>About</Link>
                        <Link href="/#contactpage" fontWeight="medium" _hover={{ color: "blue.500" }}>Contact</Link>
                    </Stack>
                    <IconButton
                        aria-label="Toggle color mode"
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        onClick={toggleColorMode}
                        variant="ghost"
                    />
                    <Menu >
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size='sm' cursor='pointer'
                                name={user?.name}
                                src={user?.pic} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem color={"black"}>
                                <ProfileModal user={user}>
                                    My Profile
                                </ProfileModal>
                            </MenuItem>
                            {/* <MenuItem color={"black"} onClick={handleLogout}>Logout</MenuItem> */}
                        </MenuList>
                    </Menu>
                    <Button
                        as={Link} to="/dashboard"
                        variant="ghost"
                        _hover={{ bg: "whiteAlpha.300", transform: "scale(1.1)" }}
                        transition="all 0.3s"
                        color={useColorModeValue("gray.800", "white")}
                    >
                        Dashboard
                    </Button>

                    {!token ? (
                        <Button as={Link} to="/login" colorScheme="green">Login</Button>
                    ) : (
                        <Button
                            colorScheme="red"
                            _hover={{ transform: "scale(1.1)" }}
                            transition="all 0.3s"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </HStack>

                {/* Mobile Navigation - Hamburger Icon */}
                <IconButton
                    icon={<HamburgerIcon />}
                    variant="outline"
                    color="white"
                    border="none"
                    _hover={{ bg: "whiteAlpha.300", transform: "scale(1.1)" }}
                    display={{ base: "flex", md: "none" }}
                    onClick={onOpen}
                />
            </Flex >

            {/* Mobile Drawer Menu */}
            <Drawer Drawer isOpen={isOpen} placement="right" onClose={onClose} >
                <DrawerOverlay />
                <DrawerContent bgGradient="linear(to-r, blue.700, purple.600)">
                    <DrawerCloseButton color="white" />
                    <DrawerBody mt={10}>
                        <VStack spacing={6}>
                            <Button
                                as={Link} to="/dashboard"
                                variant="ghost" color="white"
                                _hover={{ bg: "whiteAlpha.300", transform: "scale(1.1)" }}
                                w="100%"

                            >
                                Dashboard
                            </Button>

                            {!token ? (
                                <Button as={Link} to="/login" colorScheme="green" w="100%">Login</Button>
                            ) : (
                                <Button
                                    colorScheme="red"
                                    _hover={{ transform: "scale(1.1)" }}
                                    transition="all 0.3s"
                                    onClick={handleLogout}
                                    w="100%"
                                >
                                    Logout
                                </Button>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer >
        </Box >

        // <Box
        //     as="nav"
        //     bg={colorMode === 'light' ? 'white' : 'gray.800'}
        //     py={4}
        //     boxShadow="sm"
        // >
        //     <Container maxW="container.lg">
        //         <Flex justify="space-between" align="center">
        //             <Flex align="center">
        //                 <Image
        //                     src={colorMode === 'light'
        //                         // "https://dummyimage.com/160x40/3182ce/ffffff.png&text=Logo"
        //                         ? `${logoHome}`

        //                         : `${logoHome}`
        //                         //  "https://dummyimage.com/160x40/90cdf4/1a202c.png&text=Logo"

        //                     }
        //                     alt="Logo"
        //                     h="40px"
        //                     mr={{ base: 4, md: 8 }}
        //                     borderRadius={5}
        //                 />
        //                 <Stack
        //                     direction={{ base: 'column', md: 'row' }}
        //                     display={{ base: 'none', md: 'flex' }}
        //                     gap={{ base: 2, md: 6 }}
        //                 >
        //                     <Link to='/' href="/" fontWeight="medium" _hover={{ color: "blue.500" }}>Home</Link>
        //                     <Link href="/#features" fontWeight="medium" _hover={{ color: "blue.500" }}>Features</Link>
        //                     <Link href="/#aboutpage" fontWeight="medium" _hover={{ color: "blue.500" }}>About</Link>
        //                     <Link href="/#contactpage" fontWeight="medium" _hover={{ color: "blue.500" }}>Contact</Link>
        //                 </Stack>
        //             </Flex>
        //             <Flex align="center" gap={4}>
        //                 <IconButton
        //                     aria-label="Toggle color mode"
        //                     icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        //                     onClick={toggleColorMode}
        //                     variant="ghost"
        //                 />
        //                 {!token ? <Button onClick={handleSignIn} colorScheme="blue" size="sm" display={{ base: 'none', sm: 'block' }}>
        //                     Sign In
        //                 </Button> : <Button onClick={handleLogout} colorScheme="blue" size="sm" display={{ base: 'none', sm: 'block' }}>
        //                     Log Out
        //                 </Button>}
        //             </Flex>
        //         </Flex>
        //     </Container>
        // </Box>
    );
}

export default Navbar;
