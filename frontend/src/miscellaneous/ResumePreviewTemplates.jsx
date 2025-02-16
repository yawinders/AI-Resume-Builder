// const navigate = useNavigate()
// const handleBack = () => {
//     navigate('/resume-templates')
// }
// const handleSelect = () => {

// }
//  <Button position={"fixed"} w={100} top={"10"} onClick={handleBack} mt={10} ml={10} bgColor={"Highlight"}>Back</Button>
//             <Button position={"fixed"} w={100} top={"10"} left={"130"} onClick={handleSelect} mt={10} ml={10} bgColor={"orange"}>Select</Button>



import { Box, Flex, Heading, Text, VStack, HStack, Divider, Icon, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaTools, FaHeart, FaLanguage, FaCheckCircle, FaStar, FaFile, FaCommentDots } from "react-icons/fa";

const resumeData = {
    name: "John Doe",
    jobTitle: "Full Stack Developer",
    address: "1234 Street, New York, NY",
    mobile: "+1 (555) 555-5555",
    email: "johndoe@email.com",
    summary: "Passionate full-stack developer with expertise in JavaScript, React, and Node.js. Proven ability to deliver high-quality applications with a user-centered approach.",
    experience: [
        {
            company: "Tech Corp",
            role: "Frontend Developer",
            duration: "2019 - Present",
            description: [
                "Developed responsive web applications using React.js and Chakra UI.",
                "Implemented state management using Redux and Context API.",
                "Optimized website performance, improving load times by 30%.",
                "Collaborated with backend team to integrate APIs efficiently."
            ]
        },
        {
            company: "Web Solutions",
            role: "Backend Developer",
            duration: "2017 - 2019",
            description: [
                "Built robust APIs with Node.js and Express.js, improving performance by 40%.",
                "Implemented authentication and authorization using JWT.",
                "Designed and managed MongoDB databases, ensuring data consistency.",
                "Collaborated with frontend developers to ensure seamless user experience."
            ]
        }
    ],
    projects: [
        {
            title: "E-Commerce Website",
            description: [
                "Developed a full-stack e-commerce website with React, Redux, and Stripe integration.",
                "Implemented user authentication and role-based access control.",
                "Integrated real-time order tracking and payment gateway.",
                "Optimized SEO and performance for better search rankings."
            ]
        },
        {
            title: "Job Portal",
            description: [
                "Built a job portal allowing recruiters to post jobs and candidates to apply with real-time updates.",
                "Integrated email notifications for job applications and interview scheduling.",
                "Developed an admin dashboard for managing users and job postings.",
                "Implemented a recommendation engine for personalized job listings."
            ]
        }
    ],
    education: "B.Sc in Computer Science, XYZ University (2015 - 2019)",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Chakra UI"],
    hobbies: ["Coding", "Gaming", "Traveling"],
    languages: ["English", "Spanish"]
};

export const Template1 = ({ formData }) => {
    return (
        <Box width="100%" height="100%" bgGradient="linear(to-b, teal.100, blue.100)" p={8} m="auto" boxShadow="lg" borderRadius="md" border="1px solid gray">
            <VStack align="start" spacing={2} mb={4}>
                <Heading size="lg" color="blue.700">{formData?.personalInfo.name || resumeData.name}</Heading>
                <Text fontSize="md" color="gray.600">{resumeData.jobTitle}</Text>
            </VStack>
            <Divider mb={4} />
            <VStack align="start" spacing={2} mb={4}>
                <HStack><Icon as={FaMapMarkerAlt} color="red.500" /><Text>{resumeData.address}</Text></HStack>
                <HStack><Icon as={FaPhone} color="green.500" /><Text>{resumeData.mobile}</Text></HStack>
                <HStack><Icon as={FaEnvelope} color="blue.500" /><Text>{resumeData.email}</Text></HStack>
            </VStack>
            <Divider mb={4} />
            <Heading size="md" mb={2} color="purple.700">Professional Summary</Heading>
            <Text fontSize="sm" mb={4}>{resumeData.summary}</Text>
            <Heading size="md" mb={2} color="purple.700">Professional Experience</Heading>
            {resumeData.experience.map((exp, i) => (
                <Box key={i} p={2} mb={3} bg="gray.100" borderRadius="md">
                    <Text fontWeight="bold">{exp.role} at {exp.company}</Text>
                    <Text fontSize="sm" color="gray.500">{exp.duration}</Text>
                    <List spacing={1} mt={2}>
                        {exp.description.map((desc, j) => (
                            <ListItem key={j}><ListIcon as={FaCheckCircle} color="green.500" /> {desc}</ListItem>
                        ))}
                    </List>
                </Box>
            ))}
            <Divider mb={4} />
            <Heading size="md" mb={2} color="purple.700">Projects</Heading>
            {resumeData.projects.map((proj, i) => (
                <Box key={i} p={2} mb={3} bg="gray.100" borderRadius="md">
                    <Text fontWeight="bold">{proj.title}</Text>
                    <List spacing={1} mt={2}>
                        {proj.description.map((desc, j) => (
                            <ListItem key={j}><ListIcon as={FaCheckCircle} color="blue.500" /> {desc}</ListItem>
                        ))}
                    </List>
                </Box>
            ))}
            <Divider mb={4} />
            <Heading size="md" mb={2} color="purple.700">Education</Heading>
            <Text fontSize="sm">{resumeData.education}</Text>
            <Divider mb={4} />
            <Flex justify="space-between">
                <Box>
                    <Heading size="md" mb={2} color="purple.700">Skills</Heading>
                    {resumeData.skills.map((skill, i) => <Text fontSize="sm" key={i}>• {skill}</Text>)}
                </Box>
                <Box>
                    <Heading size="md" mb={2} color="purple.700">Hobbies</Heading>
                    {resumeData.hobbies.map((hobby, i) => <Text fontSize="sm" key={i}>• {hobby}</Text>)}
                </Box>
                <Box>
                    <Heading size="md" mb={2} color="purple.700">Languages</Heading>
                    {resumeData.languages.map((lang, i) => <Text fontSize="sm" key={i}>• {lang}</Text>)}
                </Box>
            </Flex>
        </Box>
    );
};



export const Template2 = () => {
    return (
        <Box
            width="100%" height="100%"
            bgGradient="linear(to-b, purple.100, pink.100)"
            boxShadow="2xl"
            borderRadius="10px"
            p={8} m="auto"
        >
            <Flex justifyContent="center" alignItems="center" bg="purple.600" color="white" p={4} borderRadius="10px">
                <VStack>
                    <Text fontSize="2xl" fontWeight="bold">John Doe</Text>
                    <Text fontSize="lg">Software Engineer</Text>
                </VStack>
            </Flex>

            <HStack mt={6} spacing={6} color="gray.800" justify="center">
                <HStack><FaMapMarkerAlt /><Text>New York, USA</Text></HStack>
                <HStack><FaPhone /><Text>+1 234 567 890</Text></HStack>
                <HStack><FaEnvelope /><Text>john.doe@example.com</Text></HStack>
            </HStack>

            <Divider my={6} borderColor="purple.600" />

            <Box>
                <Text fontSize="xl" fontWeight="bold" color="purple.700">Professional Experience</Text>
                <VStack align="start" spacing={3} mt={3} bg="white" p={4} borderRadius="10px" boxShadow="md">
                    <Text fontWeight="semibold">Software Engineer | ABC Tech</Text>
                    <Text fontSize="sm" color="gray.600">2018 - Present</Text>
                    <VStack pl={4} align="start" fontSize="sm" color="gray.700">
                        <Text>• Developed scalable web applications using React and Node.js.</Text>
                        <Text>• Led a team of developers in building enterprise solutions.</Text>
                        <Text>• Optimized backend APIs for better performance.</Text>
                        <Text>• Conducted code reviews and mentored junior developers.</Text>
                    </VStack>
                </VStack>
            </Box>

            <Divider my={6} borderColor="purple.600" />

            <Box>
                <Text fontSize="xl" fontWeight="bold" color="purple.700">Projects</Text>
                <VStack align="start" spacing={3} mt={3} bg="white" p={4} borderRadius="10px" boxShadow="md">
                    <Text fontWeight="semibold">E-commerce Platform</Text>
                    <Text fontSize="sm" color="gray.600">2021</Text>
                    <VStack pl={4} align="start" fontSize="sm" color="gray.700">
                        <Text>• Designed a fully responsive e-commerce website.</Text>
                        <Text>• Implemented secure payment gateways.</Text>
                        <Text>• Integrated real-time tracking for shipments.</Text>
                        <Text>• Improved performance using caching mechanisms.</Text>
                    </VStack>
                </VStack>
            </Box>

            <Divider my={6} borderColor="purple.600" />

            <Box>
                <Text fontSize="xl" fontWeight="bold" color="purple.700">Education</Text>
                <VStack bg="white" p={4} borderRadius="10px" boxShadow="md">
                    <Text fontWeight="semibold">B.Sc. Computer Science | XYZ University (2014 - 2018)</Text>
                </VStack>
            </Box>

            <Divider my={6} borderColor="purple.600" />

            <Box>
                <Text fontSize="xl" fontWeight="bold" color="purple.700">Skills</Text>
                <VStack bg="white" p={4} borderRadius="10px" boxShadow="md">
                    <Text>React, Node.js, JavaScript, TypeScript, GraphQL</Text>
                </VStack>
            </Box>
        </Box>
    );
};

export const Template3 = ({ formData }) => {
    return (
        <Box width="100%" height="100%" p={8} bgGradient="linear(to-r, teal.200, blue.300)" boxShadow="2xl" borderRadius="10px" m="auto" >
            <Flex>
                {/* Left Section */}
                <Box w="40%" bg="teal.700" color="white" p={6} borderRadius="10px 0 0 10px">
                    <VStack align="start" spacing={6}>
                        <Text fontSize="2xl" fontWeight="bold">{formData?.personalInfo.name || "Emily Johnson"}</Text>
                        <Text fontSize="lg">{formData?.personalInfo.role || "Software Engineer"}</Text>
                        <Divider borderColor="whiteAlpha.600" />
                        <VStack align="start" spacing={2}>
                            <HStack><Icon as={FaMapMarkerAlt} /><Text>{formData?.personalInfo.address || "San Francisco, USA"}</Text></HStack>
                            <HStack><Icon as={FaPhone} /><Text>{formData?.personalInfo.phone || "+1 456 789 1234"}</Text></HStack>
                            <HStack><Icon as={FaEnvelope} /><Text>{formData?.personalInfo.email || "emily.johnson@example.com"}</Text></HStack>
                        </VStack>
                        <Divider borderColor="whiteAlpha.600" />
                        <Text fontSize="xl" fontWeight="bold">Skills</Text>
                        <List spacing={2}>
                            <ListItem>React</ListItem>
                            <ListItem>Node.js</ListItem>
                            <ListItem>Python</ListItem>
                            <ListItem>MongoDB</ListItem>
                            <ListItem>Docker</ListItem>
                            <ListItem> AWS</ListItem>
                            <ListItem>HTML</ListItem>
                            <ListItem>CSS</ListItem>
                            <ListItem> JAVA</ListItem>
                        </List>
                        {/* <Text>React, Node.js, Python, MongoDB, Docker, AWS</Text> */}

                        <Text fontSize="xl" fontWeight="bold">Hobbies</Text>
                        <Text>Photography, Hiking, Reading</Text>
                        <Text fontSize="xl" fontWeight="bold">Languages</Text>
                        <Text>English, Spanish</Text>
                    </VStack>
                </Box>
                {/* Right Section */}
                <Box w="60%" p={6} bg="white" borderRadius="0 10px 10px 0">
                    <VStack align="start" spacing={6}>
                        <Box>
                            <Text fontSize="xl" fontWeight="bold" color="teal.700"><Icon as={FaFile} mr={2} />Job Summary</Text>
                            <VStack align="start" spacing={3} mt={3} p={4} mb={3} borderRadius="10px" boxShadow="md">
                                <Text >{formData?.summary || "Summary Content"}</Text>

                            </VStack>
                            <Text fontSize="xl" fontWeight="bold" color="teal.700"><Icon as={FaBriefcase} mr={2} />Professional Experience</Text>
                            <VStack align="start" spacing={3} mt={3} p={4} borderRadius="10px" boxShadow="md">
                                {formData?.experience.map((exp, indx) => {
                                    return (<Box key={indx}>
                                        <Text fontWeight="semibold">{exp.role || "Software Engineer"} | {exp.company || "Tech Innovations"}</Text>
                                        <Text fontSize="sm" color="gray.600">{exp.duration || "2018 - Present"}</Text>
                                        <ul style={{ marginLeft: "20px" }}>
                                            {exp.details?.split('*').map((points, idx) => {
                                                if (idx === 0) return;
                                                return <li key={idx}>{points}</li>
                                            })}
                                        </ul>
                                    </Box>)
                                })
                                }


                                <VStack pl={4} align="start" fontSize="sm" color="gray.700">
                                    <Text>• Developed scalable web applications using React and Node.js.</Text>
                                    <Text>• Led a team of 5 developers in agile development cycles.</Text>
                                    <Text>• Implemented RESTful APIs and integrated third-party services.</Text>
                                    <Text>• Optimized application performance, reducing load time by 30%.</Text>
                                </VStack>
                            </VStack>
                        </Box>
                        <Box>
                            <Text fontSize="xl" fontWeight="bold" color="teal.700"><Icon as={FaStar} mr={2} />Projects</Text>
                            <VStack align="start" spacing={3} mt={3} p={4} borderRadius="10px" boxShadow="md">
                                {formData?.projects.map((proj, idx) => {
                                    return (
                                        <Text fontWeight="semibold">{proj.name || "E-commerce Platform Development"}</Text>
                                    )
                                })}
                                <Text fontWeight="semibold">E-commerce Platform Development</Text>
                                <Text fontSize="sm" color="gray.600">2021</Text>
                                <VStack pl={4} align="start" fontSize="sm" color="gray.700">
                                    <Text>• Designed and implemented a full-stack e-commerce application.</Text>
                                    <Text>• Integrated secure payment gateways and authentication.</Text>
                                    <Text>• Developed a real-time order tracking system.</Text>
                                    <Text>• Conducted extensive testing, ensuring a bug-free user experience.</Text>
                                </VStack>
                            </VStack>
                        </Box>
                        <Box>
                            <Text fontSize="xl" fontWeight="bold" color="teal.700"><Icon as={FaGraduationCap} mr={2} />Education</Text>
                            <VStack p={4} borderRadius="10px" boxShadow="md">
                                <Text fontWeight="semibold">B.S. in Computer Science | Stanford University (2014 - 2018)</Text>
                            </VStack>
                        </Box>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};