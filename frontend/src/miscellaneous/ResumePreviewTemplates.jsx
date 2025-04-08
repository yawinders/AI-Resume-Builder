import { Box, Flex, Heading, Text, VStack, HStack, Divider, Icon, List, ListItem, ListIcon, Button, useColorModeValue } from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaTools, FaHeart, FaLanguage, FaCheckCircle, FaStar, FaFile, FaCommentDots } from "react-icons/fa";
import { downloadResumeAsPDF } from "./DownlaoadResumePdf";
import { useRef, useState } from "react";
import { useAuthentication } from "../context/authContext";

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
    education: "B.Sc in Computer Science, XYZ University (2015)",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Chakra UI"],
    hobbies: ["Coding", "Gaming", "Traveling"],
    languages: ["English", "Spanish"]
};

export const Template1 = ({ formData, resume, resumeRef }) => {
    console.log("formddta", formData);
    console.log("resume", resume);
    // const resumeRef = useRef(null)
    // const [loading, setLoading] = useState(false)

    return (
        <>


            <Box
                color={useColorModeValue("black", "black")}
                ref={resumeRef && resumeRef}
                width="100%" height="100%" bgGradient="linear(to-b, teal.100, blue.100)" p={8} m="auto" boxShadow="lg" borderRadius="md" border="1px solid gray">
                <VStack align="start" spacing={2} mb={4}>
                    <Heading size="lg" color="blue.700">{formData?.personalInfo.name || resumeData.name}</Heading>
                    <Text fontSize="md" color="gray.600">{formData?.personalInfo.role || resumeData.jobTitle}</Text>
                </VStack>
                <Divider mb={4} />
                <VStack align="start" spacing={2} mb={4}>
                    <HStack><Icon as={FaMapMarkerAlt} color="red.500" /><Text>{formData?.personalInfo.address || resumeData.address}</Text></HStack>
                    <HStack><Icon as={FaPhone} color="green.500" /><Text>{formData?.personalInfo.phone || resumeData.mobile}</Text></HStack>
                    <HStack><Icon as={FaEnvelope} color="blue.500" /><Text>{formData?.personalInfo.email || resumeData.email}</Text></HStack>
                </VStack>
                <Divider mb={4} />
                <Heading size="md" mb={2} color="purple.700">Professional Summary</Heading>
                <Text fontSize="sm" mb={4}>{formData?.summary || resumeData.summary}</Text>
                <Heading size="md" mb={2} color="purple.700">Professional Experience</Heading>
                {formData ? (
                    <>
                        {formData.experience?.map((exp, i) => (
                            <Box key={i} p={2} mb={3} bg="gray.100" borderRadius="md">
                                <Text fontWeight="bold">{exp.role} at {exp.company}</Text>
                                <Text fontSize="sm" color="gray.500">{exp.duration}</Text>
                                <List spacing={1} mt={2}>
                                    {(exp.details?.split('*') || []).map((desc, j) => {
                                        if (j === 0) return null;
                                        return <ListItem key={j}><ListIcon as={FaCheckCircle} color="green.500" /> {desc}</ListItem>;
                                    })}
                                </List>
                            </Box>
                        ))}
                    </>
                ) : (
                    <>
                        {resumeData.experience?.map((exp, i) => (
                            <Box key={i} p={2} mb={3} bg="gray.100" borderRadius="md">
                                <Text fontWeight="bold">{exp.role} at {exp.company}</Text>
                                <Text fontSize="sm" color="gray.500">{exp.duration}</Text>
                                <List spacing={1} mt={2}>
                                    {exp.description?.map((desc, j) => (
                                        <ListItem key={j}><ListIcon as={FaCheckCircle} color="green.500" /> {desc}</ListItem>
                                    ))}
                                </List>
                            </Box>
                        ))}
                    </>
                )}


                <Divider mb={4} />
                <Heading size="md" mb={2} color="purple.700">Projects</Heading>
                {formData ? (<>
                    {formData.projects.map((proj, i) => {
                        return <Box key={i} p={2} mb={3} bg="gray.100" borderRadius="md">
                            <Box display="flex" justifyContent="space-between">
                                <Text fontWeight="bold">{proj.name}</Text>
                                <Text fontWeight="bold">{`${proj.from}`}</Text>
                            </Box>
                            <List spacing={1} mt={2}>
                                {proj.description.split("*").map((desc, j) => {
                                    if (j === 0) return
                                    return <ListItem key={j}><ListIcon as={FaCheckCircle} color="blue.500" /> {desc}</ListItem>
                                })}
                            </List>
                        </Box>
                    })}
                </>) : (<>{resumeData.projects.map((proj, i) => (
                    <Box key={i} p={2} mb={3} bg="gray.100" borderRadius="md">
                        <Text fontWeight="bold">{proj.title}</Text>
                        <List spacing={1} mt={2}>
                            {proj.description.map((desc, j) => (
                                <ListItem key={j}><ListIcon as={FaCheckCircle} color="blue.500" /> {desc}</ListItem>
                            ))}
                        </List>
                    </Box>
                ))}</>)}

                <Divider mb={4} />
                <Heading size="md" mb={2} color="purple.700">Education</Heading>
                {formData ? (<>
                    {formData.education.map((edu, i) => {
                        return <Text key={i} fontSize="sm">{`${edu.degree}, ${edu.college} (${edu.year})-${edu.percentage}%` || resumeData.education}</Text>
                    })}

                </>) : (<><Text fontSize="sm">{resumeData.education}</Text></>)}

                <Divider mb={4} />
                <Flex justify="space-between">
                    <Box>
                        <Heading size="md" mb={2} color="purple.700">Skills</Heading>
                        {formData ? (<>
                            {formData.skills.map((skill, i) => (<Text fontSize="sm" key={i}>• {skill}</Text>))}
                        </>) : (<>
                            {resumeData.skills.map((skill, i) => <Text fontSize="sm" key={i}>• {skill}</Text>)}
                        </>)}

                    </Box>
                    <Box>
                        <Heading size="md" mb={2} color="purple.700">Hobbies</Heading>
                        {formData ? (<>
                            {formData.hobbies.split(', ').map((hobby, i) => <Text fontSize="sm" key={i}>• {hobby}</Text>)}
                        </>) : (<> {resumeData.hobbies.map((hobby, i) => <Text fontSize="sm" key={i}>• {hobby}</Text>)}</>)}

                    </Box>
                    <Box>
                        <Heading size="md" mb={2} color="purple.700">Languages</Heading>
                        {formData ? (<>
                            {formData.languages.split(", ").map((lang, i) => <Text fontSize="sm" key={i}>• {lang}</Text>)}
                        </>) : (<>{resumeData.languages.map((lang, i) => <Text fontSize="sm" key={i}>• {lang}</Text>)}</>)}

                    </Box>
                </Flex>
            </Box>
        </>
    );
};



export const Template2 = ({ formData, resume, resumeRef }) => {
    console.log("formddta", formData);
    console.log("resume", resume);
    return (
        <Box
            color={useColorModeValue("black", "black")}
            ref={resumeRef}
            width="100%" height="100%"
            bgGradient="linear(to-b, purple.100, pink.100)"
            boxShadow="2xl"
            borderRadius="10px"
            p={8} m="auto"
        >
            <Flex justifyContent="center" alignItems="center" bg="purple.600" color="white" p={4} borderRadius="10px">
                <VStack>
                    <Text fontSize="2xl" fontWeight="bold">{formData?.personalInfo.name || "John Doe"}</Text>
                    <Text fontSize="lg">{formData?.personalInfo.role || "Software Engineer"}</Text>
                </VStack>
            </Flex>

            <HStack mt={6} spacing={6} color="gray.800" justify="center">
                <HStack><FaMapMarkerAlt /><Text>{formData?.personalInfo.address || "New York, USA"}</Text></HStack>
                <HStack><FaPhone /><Text>{formData?.personalInfo.phone || "+1 234 567 890"}</Text></HStack>
                <HStack><FaEnvelope /><Text>{formData?.personalInfo.email || "john.doe@example.com"}</Text></HStack>
            </HStack>

            <Divider my={6} borderColor="purple.600" />
            <Text fontSize="xl" fontWeight="bold" color="purple.700">Job Summary</Text>
            {formData ? (<><Text>{formData.summary}</Text></>) : (<>
                <VStack align="start" spacing={3} mt={3} bg="white" p={4} borderRadius="10px" boxShadow="md">
                    <Text >Highly adaptable and motivated individual with a proven ability to learn quickly and contribute effectively in diverse environments. Seeking a challenging role leveraging strong [mention a key skill or two, e.g., communication and problem-solving] skills.</Text>
                </VStack>
            </>)}

            <Divider my={6} borderColor="purple.600" />

            <Box>
                <Text fontSize="xl" fontWeight="bold" color="purple.700">Professional Experience</Text>

                {formData ? (<>
                    {formData.experience.map((exp, i) => (
                        <VStack key={i} align="start" spacing={3} mt={3} bg="white" p={4} borderRadius="10px" boxShadow="md">
                            <Text fontWeight="semibold">{`${exp.role} | ${exp.company}` || "Software Engineer | ABC Tech"}</Text>
                            <Text fontSize="sm" color="gray.600">{exp.duration || "2018 - Present"}</Text>
                            <VStack pl={4} align="start" fontSize="sm" color="gray.700">
                                {exp.details.split('*').map((point, i) => {
                                    if (i === 0) return;
                                    return <Text>• {point}</Text>
                                })}
                            </VStack>
                        </VStack>
                    ))}

                </>) : (<>

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
                </>)}

            </Box>

            <Divider my={6} borderColor="purple.600" />
            {formData ? (<>
                {formData.projects.map((proj, i) => {
                    return <Box>
                        <Text fontSize="xl" fontWeight="bold" color="purple.700">Projects</Text>
                        <VStack align="start" spacing={3} mt={3} bg="white" p={4} borderRadius="10px" boxShadow="md">
                            <Text fontWeight="semibold">{proj.name || "E-commerce Platform"}</Text>
                            <Text fontSize="sm" color="gray.600">{`${proj.from}-${proj.to}` || "March-2021"}</Text>

                            <VStack pl={4} align="start" fontSize="sm" color="gray.700">
                                {proj.description.split('*').map((point, i) => {
                                    if (i === 0) return
                                    return <Text key={i}>• {point}</Text>
                                })}

                            </VStack>
                        </VStack>
                    </Box>
                })}
            </>) : (<>
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
            </>)}



            <Divider my={6} borderColor="purple.600" />
            <Box>

                <Text fontSize="xl" fontWeight="bold" color="purple.700">Education</Text>
                <VStack bg="white" p={4} borderRadius="10px" boxShadow="md">
                    {formData ? (<>
                        {formData.education.map((edu, i) => {
                            return <Text fontWeight="semibold">{`${edu.degree} | ${edu.college} (${edu.year})` || "B.Sc. Computer Science | XYZ University (2014 - 2018)"}</Text>
                        })}

                    </>) : (<>

                        <Text fontWeight="semibold">B.Sc. Computer Science | XYZ University (2014 - 2018)</Text>
                    </>)}
                </VStack>
            </Box>

            <Divider my={6} borderColor="purple.600" />

            <Box>
                <Text fontSize="xl" fontWeight="bold" color="purple.700">Skills</Text>
                <VStack bg="white" p={4} borderRadius="10px" boxShadow="md">
                    {formData ? (<>
                        <Text>{formData.skills.map((skill, i) => (<span key={i}>{skill}, </span>))}</Text>
                    </>) : (<><Text>React, Node.js, JavaScript, TypeScript, GraphQL</Text></>)}
                </VStack>
            </Box>
            <Box>
                <Text fontSize="xl" fontWeight="bold" color="purple.700">Hobbies</Text>
                <VStack bg="white" p={4} borderRadius="10px" boxShadow="md">
                    {formData ? (<>
                        <Text>{formData.hobbies}</Text>
                    </>) : (<><Text>Love to Travel,Reading books etc</Text></>)}
                </VStack>
            </Box>
            <Box>
                <Text fontSize="xl" fontWeight="bold" color="purple.700">Languages Known</Text>
                <VStack bg="white" p={4} borderRadius="10px" boxShadow="md">
                    {formData ? (<>
                        <Text>{formData.languages}</Text>
                    </>) : (<><Text>English, Hindi</Text></>)}
                </VStack>
            </Box>
        </Box>
    );
};

export const Template3 = ({ formData, resume, resumeRef }) => {
    console.log("formddta", formData);
    console.log("resume", resume);

    return (
        <Box
            color={useColorModeValue("black", "black")}
            ref={resumeRef}
            width="100%" height="100%" p={8} bgGradient="linear(to-r, teal.200, blue.300)" boxShadow="2xl" borderRadius="10px" m="auto" >
            <Flex>
                {/* Left Section */}
                <Box w="40%" bg="teal.700" color="white" p={6} borderRadius="10px 0 0 10px">
                    <VStack align="start" spacing={6}>
                        <Text fontSize="2xl" fontWeight="bold">{formData?.personalInfo.name || resume?.personalInfo.name || "Emily Johnson"}</Text>
                        <Text fontSize="lg">{formData?.personalInfo.role || resume?.personalInfo.role || "Software Engineer"}</Text>
                        <Divider borderColor="whiteAlpha.600" />
                        <VStack align="start" spacing={2}>
                            <HStack><Icon as={FaMapMarkerAlt} /><Text>{formData?.personalInfo.address || resume?.personalInfo.address || "San Francisco, USA"}</Text></HStack>
                            <HStack><Icon as={FaPhone} /><Text>{formData?.personalInfo.phone || resume?.personalInfo.phone || "+1 456 789 1234"}</Text></HStack>
                            <HStack><Icon as={FaEnvelope} /><Text>{formData?.personalInfo.email || resume?.personalInfo.email || "emily.johnson@example.com"}</Text></HStack>
                        </VStack>
                        <Divider borderColor="whiteAlpha.600" />
                        <Box>
                            <Text fontSize="xl" fontWeight="bold" color="white"><Icon as={FaGraduationCap} mr={2} />Education</Text>
                            {formData ? (
                                <>
                                    {(formData?.education || resume?.education).map((edu, idx) => (
                                        <VStack p={4} borderRadius="10px" boxShadow="md" key={idx}>
                                            <Text fontWeight="semibold">
                                                {`${edu.degree} | ${edu.college} (${edu.year}) - (${edu.percentage}%)` ||
                                                    "B.S. in Computer Science | Stanford University (2014 - 2018)"}
                                            </Text>
                                        </VStack>
                                    ))}

                                </>
                            ) : (<>
                                <VStack p={4} borderRadius="10px" boxShadow="md">
                                    <Text fontWeight="semibold">B.S. in Computer Science | Stanford University (2014 - 2018)</Text>
                                </VStack>
                            </>)}

                        </Box>
                        <Divider borderColor="whiteAlpha.600" />
                        <Text fontSize="xl" fontWeight="bold">Skills</Text>
                        <List spacing={2}>
                            {formData ? (
                                <>
                                    {formData.skills.map((skill, idx) => <ListItem key={idx}>{skill}</ListItem>)}
                                </>
                            ) : (<>
                                <ListItem>React</ListItem>
                                <ListItem>Node.js</ListItem>
                                <ListItem>Python</ListItem>
                                <ListItem>MongoDB</ListItem>
                                <ListItem>Docker</ListItem>
                                <ListItem> AWS</ListItem>
                                <ListItem>HTML</ListItem>
                                <ListItem>CSS</ListItem>
                                <ListItem> JAVA</ListItem>
                            </>)}

                        </List>
                        {/* <Text>React, Node.js, Python, MongoDB, Docker, AWS</Text> */}
                        <Divider borderColor="whiteAlpha.600" />

                        <Text fontSize="xl" fontWeight="bold">Hobbies</Text>
                        {formData ? (<Text>{formData.hobbies || "Photography, Hiking, Reading"}</Text>) : (<Text>Photography, Hiking, Reading</Text>)}
                        <Text fontSize="xl" fontWeight="bold">Languages</Text>
                        {formData ? (<Text>{formData.languages || "English, Spanish"}</Text>) : (<Text>English, Spanish</Text>)}


                    </VStack>
                </Box>
                {/* Right Section */}
                <Box w="60%" p={6} bg="white" borderRadius="0 10px 10px 0">
                    <VStack align="start" spacing={6}>
                        <Box>
                            <Text fontSize="xl" fontWeight="bold" color="teal.700"><Icon as={FaFile} mr={2} />Job Summary</Text>
                            <VStack align="start" spacing={3} mt={3} p={4} mb={3} borderRadius="10px" boxShadow="md">
                                <Text >{formData?.summary || "Summary Content Proficient in diverse skills applicable across various roles; eager to leverage experience and adaptability in a challenging and rewarding position.  Seeking a challenging opportunity to contribute to a dynamic team and further develop professional expertise. "}</Text>

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


                                {formData ? null : (<>
                                    <Text fontWeight="semibold">Software Engineer | Tech Innovations</Text>
                                    <Text fontSize="sm" color="gray.600">2018 - Present</Text>
                                    <VStack pl={4} align="start" fontSize="sm" color="gray.700">
                                        <Text>• Developed scalable web applications using React and Node.js.</Text>
                                        <Text>• Led a team of 5 developers in agile development cycles.</Text>
                                        <Text>• Implemented RESTful APIs and integrated third-party services.</Text>
                                        <Text>• Optimized application performance, reducing load time by 30%.</Text>
                                    </VStack>
                                </>
                                )}
                            </VStack>
                        </Box>
                        {formData ? (
                            <Box>
                                <Text fontSize="xl" fontWeight="bold" color="teal.700"><Icon as={FaStar} mr={2} />Projects</Text>

                                {formData.projects.map((proj, idx) => {
                                    return (
                                        <VStack align="start" spacing={3} p={4} borderRadius="10px" boxShadow="md" key={idx}>
                                            <Text fontWeight="semibold">{proj.name || "E-commerce Platform Development"}</Text>
                                            <Text fontSize="sm" color="gray.600">{`${proj.from}-${proj.to}` || "2021-2025"}</Text>
                                            <ul style={{ marginLeft: "20px" }}>
                                                {proj.description?.split('*').map((points, idx) => {
                                                    if (idx === 0) return;
                                                    return <li key={idx}>{points}</li>
                                                })}
                                            </ul>
                                        </VStack>
                                    )
                                })}

                            </Box>
                        ) : (<Box>
                            <Text fontSize="xl" fontWeight="bold" color="teal.700"><Icon as={FaStar} mr={2} />Projects</Text>
                            <VStack align="start" spacing={3} mt={3} p={4} borderRadius="10px" boxShadow="md">
                                <Text fontWeight="semibold">E-commerce Platform Development</Text>
                                <Text fontSize="sm" color="gray.600">2021-2025</Text>
                                <VStack pl={4} align="start" fontSize="sm" color="gray.700">
                                    <Text>• Designed and implemented a full-stack e-commerce application.</Text>
                                    <Text>• Integrated secure payment gateways and authentication.</Text>
                                    <Text>• Developed a real-time order tracking system.</Text>
                                    <Text>• Conducted extensive testing, ensuring a bug-free user experience.</Text>
                                </VStack>
                            </VStack>
                        </Box>)}
                        {/* <Box>
                            <Text fontSize="xl" fontWeight="bold" color="teal.700"><Icon as={FaGraduationCap} mr={2} />Education</Text>
                            <VStack p={4} borderRadius="10px" boxShadow="md">
                                <Text fontWeight="semibold">B.S. in Computer Science | Stanford University (2014 - 2018)</Text>
                            </VStack>
                        </Box> */}
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};