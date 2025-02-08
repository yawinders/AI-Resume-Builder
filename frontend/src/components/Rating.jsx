import { Box, Flex, Icon, IconButton } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

const Rating = ({ handleSkillRatingClick, index, r }) => {
    const [rating, setRating] = useState(r);
    const [hover, setHover] = useState(0)
    useEffect(() => {

        handleSkillRatingClick(rating, index)
    }, [rating])
    return (
        <Flex>{[1, 2, 3, 4, 5].map((num, index) => {
            const starValue = index + 1;
            return (
                <IconButton
                    key={index}
                    aria-label={`Star ${starValue}`}
                    icon={<StarIcon />}
                    size="lg"
                    variant="link"
                    _focus={{ outline: "none" }}
                    isRound
                    color={(num <= (hover || rating) ? "yellow" : "")}
                    fontSize="2rem"
                    onClick={() => setRating(num)}
                    onMouseEnter={() => setHover(num)}
                    onMouseLeave={() => setHover(rating)}
                />
            )
        }

        )}
        </Flex>

    )
}

export default Rating