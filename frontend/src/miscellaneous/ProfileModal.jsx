import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    Image,
    Text,
    Avatar,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
function ProfileModal({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>

            {children ? (<Button onClick={onOpen}>{children}</Button>) : (
                <IconButton
                    display={{ base: "flex" }}
                    icon={<ViewIcon />}
                    onClick={onOpen} />
            )}


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        justifyContent="space-between"
                        flexDir="column"
                        alignItems="center"
                    >
                        <Avatar size='2xl' cursor='pointer'
                            name={user.name}
                            src={user.pic} />
                        <Text >Email:{user.email}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal