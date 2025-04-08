import {
    Box,
    Container,
    SimpleGrid,
    Icon,
    Text,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
import {
    MdVisibility,
    MdSmartToy,
    MdFileDownload,
    MdVerified,
    MdStyle,
    MdLightbulbOutline,
} from "react-icons/md";

const features = [
    {
        icon: MdVisibility,
        title: "Live Preview",
        description: "See changes in real-time",
    },
    {
        icon: MdSmartToy,
        title: "AI-Powered Content",
        description: "Generate accurate content using AI",
    },
    {
        icon: MdFileDownload,
        title: "One-Click Export",
        description: "Download in PDF or DOC",
    },
    {
        icon: MdVerified,
        title: "ATS Optimization",
        description: "Ensures your resume passes ATS",
    },
    {
        icon: MdStyle,
        title: "Customizable Templates",
        description: "Choose from multiple modern resume styles",
    },
    {
        icon: MdLightbulbOutline,
        title: "Smart Suggestions",
        description: "Get recommendations to improve your resume",
    },
];

export default function FeaturesSection() {
    const cardBg = useColorModeValue("white", "gray.800");
    const cardBorder = useColorModeValue("gray.200", "gray.700");
    const headingColor = useColorModeValue("gray.800", "white");

    return (
        <Box py={12} px={{ base: 4, md: 8 }}>
            <Container maxW="6xl">
                <Heading
                    as="h2"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    mb={8}
                    textAlign="center"
                    color={headingColor}
                >
                    Features
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {features.map((feature, index) => (
                        <Box
                            key={index}
                            p={6}
                            rounded="lg"
                            borderWidth="1px"
                            borderColor={cardBorder}
                            bg={cardBg}
                            boxShadow="md"
                            transition="all 0.2s"
                            _hover={{
                                transform: "translateY(-4px)",
                                boxShadow: "lg",
                            }}
                        >
                            <Icon as={feature.icon} w={8} h={8} color="teal.500" mb={4} />
                            <Heading as="h3" fontSize="xl" mb={2}>
                                {feature.title}
                            </Heading>
                            <Text color={useColorModeValue("gray.600", "gray.400")}>
                                {feature.description}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}