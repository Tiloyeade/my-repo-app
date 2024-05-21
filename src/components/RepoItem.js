// components/RepoItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, Box, Text } from '@chakra-ui/react';

function RepoItem({ repo }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/repo/${repo.name}`);
    };

    return (
        <ListItem onClick={handleClick} cursor="pointer">
            <Box>
                <Text fontSize="lg" fontWeight="bold">{repo.name}</Text>
                <Text>{repo.description}</Text>
            </Box>
        </ListItem>
    );
}

export default RepoItem;
