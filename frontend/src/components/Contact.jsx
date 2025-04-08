import {
    Box,
    Container,
    Heading,
    Text,
    useColorModeValue,
    Stack,
    Icon,
    Link,
    Flex,
    Image,
    SimpleGrid,
    useBreakpointValue
} from "@chakra-ui/react";
import { MdEmail, MdPhone, MdLocationOn, MdSupportAgent } from "react-icons/md";

// Placeholder image URLs (using dummyimage.com service)
const placeholderImages = {
    office: "https://dummyimage.com/600x400/4a5568/ffffff&text=Our+Office",
    team: "https://dummyimage.com/600x400/4a5568/ffffff&text=Support+Team",
    map: "https://dummyimage.com/600x400/4a5568/ffffff&text=Location+Map"
};

export const ContactPage = () => {
    const cardBg = useColorModeValue("white", "gray.800");
    const cardBorder = useColorModeValue("gray.200", "gray.700");
    const headingColor = useColorModeValue("gray.800", "white");
    const textColor = useColorModeValue("gray.600", "gray.400");
    const linkColor = useColorModeValue("teal.500", "teal.300");
    const imageBg = useColorModeValue("gray.100", "gray.700");

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box py={12} px={{ base: 4, md: 8 }}>
            <Container maxW="6xl">
                <Heading as="h1" fontSize="3xl" mb={8} textAlign="center" color={headingColor}>
                    Get in Touch
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                    {/* Contact Information Card */}
                    <Box
                        p={8}
                        rounded="lg"
                        borderWidth="1px"
                        borderColor={cardBorder}
                        bg={cardBg}
                        boxShadow="md"
                    >
                        <Stack spacing={6}>
                            <Flex align="center">
                                <Icon as={MdSupportAgent} w={6} h={6} color="teal.500" mr={4} />
                                <Heading as="h2" fontSize="xl" color={headingColor}>
                                    Contact Information
                                </Heading>
                            </Flex>

                            <Flex align="center">
                                <Icon as={MdEmail} w={6} h={6} color="teal.500" mr={4} />
                                <Box>
                                    <Text fontWeight="medium" color={headingColor}>Email</Text>
                                    <Link
                                        href="mailto:support@resumebuilder.com"
                                        color={linkColor}
                                        isExternal
                                    >
                                        yadwindersingh5879@gmail.com
                                    </Link>
                                </Box>
                            </Flex>

                            <Flex align="center">
                                <Icon as={MdPhone} w={6} h={6} color="teal.500" mr={4} />
                                <Box>
                                    <Text fontWeight="medium" color={headingColor}>Phone</Text>
                                    <Text color={textColor}>+1 (555) 123-4567</Text>
                                </Box>
                            </Flex>

                            <Flex align="center">
                                <Icon as={MdLocationOn} w={6} h={6} color="teal.500" mr={4} />
                                <Box>
                                    <Text fontWeight="medium" color={headingColor}>Address</Text>
                                    <Text color={textColor}>
                                        123 Resume Street<br />
                                        San Francisco, CA 94107
                                    </Text>
                                </Box>
                            </Flex>
                        </Stack>
                    </Box>

                    {/* Image Gallery Section */}
                    {!isMobile && (
                        <Stack spacing={4}>
                            <Box
                                rounded="lg"
                                overflow="hidden"
                                bg={imageBg}
                                height="full"
                                position="relative"
                            >
                                <Image
                                    src={placeholderImages.office}
                                    alt="Our office"
                                    objectFit="cover"
                                    width="100%"
                                    height="100%"
                                />
                            </Box>

                            <SimpleGrid columns={2} spacing={4}>
                                <Box rounded="lg" overflow="hidden" bg={imageBg}>
                                    <Image
                                        src={placeholderImages.team}
                                        alt="Our support team"
                                        objectFit="cover"
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                                <Box rounded="lg" overflow="hidden" bg={imageBg}>
                                    <Image
                                        src={placeholderImages.map}
                                        alt="Location map"
                                        objectFit="cover"
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                            </SimpleGrid>
                        </Stack>
                    )}
                </SimpleGrid>

                {/* Support Hours */}
                <Box
                    mt={8}
                    p={6}
                    rounded="lg"
                    borderWidth="1px"
                    borderColor={cardBorder}
                    bg={cardBg}
                    boxShadow="md"
                >
                    <Heading as="h2" fontSize="xl" mb={4} color={headingColor}>
                        Support Hours
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <Box>
                            <Text fontWeight="medium" color={headingColor}>Monday - Friday</Text>
                            <Text color={textColor}>9:00 AM - 6:00 PM (PST)</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="medium" color={headingColor}>Weekends</Text>
                            <Text color={textColor}>10:00 AM - 4:00 PM (PST)</Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Container>
        </Box>
    );
};