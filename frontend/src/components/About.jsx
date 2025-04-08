import {
    Box,
    Container,
    Heading,
    Text,
    useColorModeValue,
    Stack,
    Icon
} from "@chakra-ui/react";
import { MdInfoOutline } from "react-icons/md";

export const AboutPage = () => {
    const cardBg = useColorModeValue("white", "gray.800");
    const cardBorder = useColorModeValue("gray.200", "gray.700");
    const headingColor = useColorModeValue("gray.800", "white");
    const textColor = useColorModeValue("gray.600", "gray.400");

    return (
        <Box py={12} px={{ base: 4, md: 8 }}>
            <Container maxW="6xl">
                <Box
                    p={8}
                    rounded="lg"
                    borderWidth="1px"
                    borderColor={cardBorder}
                    bg={cardBg}
                    boxShadow="md"
                >
                    <Stack direction="row" align="center" mb={6}>
                        <Icon as={MdInfoOutline} w={8} h={8} color="teal.500" />
                        <Heading as="h1" fontSize="2xl" color={headingColor}>
                            About Our Resume Builder
                        </Heading>
                    </Stack>

                    <Stack spacing={4} color={textColor}>
                        <Text>
                            Our AI-powered resume builder helps you create professional resumes that stand out
                            to employers and pass through Applicant Tracking Systems (ATS) with ease.
                        </Text>

                        <Text>
                            With features like real-time previews, smart suggestions, and customizable templates,
                            we make resume building effortless and effective.
                        </Text>

                        <Text>
                            Founded in 2023, our mission is to empower job seekers with tools that highlight
                            their skills and experience in the best possible way.
                        </Text>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};