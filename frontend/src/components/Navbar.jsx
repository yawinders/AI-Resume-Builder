import React from "react";
import { Box, Flex, Heading, Spacer, Button, HStack, IconButton, useDisclosure, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Avatar, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useAuthentication } from "../context/authContext";
import ProfileModal from "../miscellaneous/ProfileModal";
import { useResumeContext } from "../context/resumeTemplateContext";
import Logo from '../assets/logo.webp'

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
        localStorage.removeItem("userInfo");
        navigate("/login");
    };
    const { formData, setFormData } = useResumeContext()

    return (
        <Box
            bgGradient="linear(to-r, blue.700, purple.600)"
            px={6} py={4}
            color="white"
            boxShadow="xl"
            position="sticky"
            top="0"
            zIndex="1000"
        >
            <Flex align="center">
                <Heading size="lg" fontWeight="bold" fontFamily="Poppins, sans-serif" display="flex" gap={5} alignItems="center">
                    <Box boxSize='sm' w="75px" h="auto" borderRadius="50%" overflow="hidden" border="2px solid white">
                        <Image src={Logo} />
                    </Box>
                    <Link to="/dashboard" _hover={{ textDecoration: "none", color: "cyan.300" }}>
                        AI Resume Builder

                    </Link>
                </Heading>
                <Spacer />

                {/* Desktop Navigation */}
                <HStack spacing={6} display={{ base: "none", md: "flex" }}>
                    <Menu >
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size='sm' cursor='pointer'
                                name={user.name}
                                src={user.pic} />
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
                        variant="ghost" color="white"
                        _hover={{ bg: "whiteAlpha.300", transform: "scale(1.1)" }}
                        transition="all 0.3s"
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
            </Flex>

            {/* Mobile Drawer Menu */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
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
            </Drawer>
        </Box>
    );
}

export default Navbar;
