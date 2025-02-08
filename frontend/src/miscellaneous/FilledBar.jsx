import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import React from 'react'

const FilledBar = ({ rating, themeColor }) => {
    return (
        <Box
            w="150px"
            height="10px"
            border="1px solid black"
            borderRadius="20px"
            overflow="hidden"
        >
            <Box
                w={`${rating * 30}px`}
                bg={themeColor}

                height="10px"

            ></Box>
        </Box>
    )
}

export default FilledBar