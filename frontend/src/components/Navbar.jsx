import React from "react";
import { Box, Flex, Heading, Spacer, Button, HStack, IconButton, useDisclosure, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    let token;
    if (user) {
        token = user.token;
    }


    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
    };

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
                <Heading size="lg" fontWeight="bold" fontFamily="Poppins, sans-serif">
                    <Link to="/dashboard" _hover={{ textDecoration: "none", color: "cyan.300" }}>
                        AI Resume Builder
                    </Link>
                </Heading>
                <Spacer />

                {/* Desktop Navigation */}
                <HStack spacing={6} display={{ base: "none", md: "flex" }}>
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
