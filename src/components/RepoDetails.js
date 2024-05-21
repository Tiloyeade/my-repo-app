// components/RepoDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Text, Spinner, List, ListItem, VStack, HStack, Divider } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faStar, faCode } from '@fortawesome/free-solid-svg-icons';

function RepoDetails() {
    const { id } = useParams(); // Get the repository name from URL params
    const [repoDetails, setRepoDetails] = useState(null);
    const [files, setFiles] = useState([]);
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRepoDetails() {
            try {
                const response = await axios.get(`https://api.github.com/repos/Tiloyeade/${id}`, {
                    headers: {
                        Authorization: `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`, // Replace YOUR_ACCESS_TOKEN with your GitHub access token
                    }
                });
                setRepoDetails(response.data);
                // Fetch files for the repository
                const filesResponse = await axios.get(`https://api.github.com/repos/Tiloyeade/${id}/contents`, {
                    headers: {
                        Authorization: `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`, // Replace YOUR_ACCESS_TOKEN with your GitHub access token
                    }
                });
                setFiles(filesResponse.data);
                // Fetch language statistics for the repository
                const languagesResponse = await axios.get(`https://api.github.com/repos/Tiloyeade/${id}/languages`, {
                    headers: {
                        Authorization: `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`, // Replace YOUR_ACCESS_TOKEN with your GitHub access token
                    }
                });
                setLanguages(languagesResponse.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchRepoDetails();
    }, [id]);

    if (loading) {
        return <Spinner size="xl" className="flex justify-center my-8" />;
    }

    if (error) {
        return <Box className="text-red-500">Error: {error.message}</Box>;
    }

    if (!repoDetails) {
        return <Box>Repository not found.</Box>;
    }

    return (
        <Box p="3" className="bg-blue-100 min-h-screen" maxW="sm" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">
            <VStack spacing="3" align="start" width="100%">
                <Text fontSize="xl" fontWeight="bold">Repository Details</Text>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Name:</Text>
                    <Text fontSize="sm">{repoDetails.name}</Text>
                </Box>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Description:</Text>
                    <Text fontSize="sm">{repoDetails.description}</Text>
                </Box>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Language:</Text>
                    <Text fontSize="sm">{repoDetails.language}</Text>
                </Box>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Owner/Author:</Text>
                    <Text fontSize="sm">{repoDetails.owner.login}</Text>
                </Box>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Creation Date:</Text>
                    <Text fontSize="sm">{new Date(repoDetails.created_at).toLocaleDateString()}</Text>
                </Box>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Last Updated:</Text>
                    <Text fontSize="sm">{new Date(repoDetails.updated_at).toLocaleDateString()}</Text>
                </Box>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Stars:</Text>
                    <Text fontSize="sm">{repoDetails.stargazers_count}</Text>
                </Box>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Forks:</Text>
                    <Text fontSize="sm">{repoDetails.forks_count}</Text>
                </Box>
                <Divider />
                <HStack spacing="3" justify="center" width="100%">
                    <Box className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                        <Text fontSize="sm">{repoDetails.stargazers_count} Stars</Text>
                    </Box>
                    <Box className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faShareAlt} className="text-blue-500" />
                        <Text fontSize="sm">{repoDetails.forks_count} Forks</Text>
                    </Box>
                    {repoDetails.language && (
                        <Box className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faCode} className="text-green-500" />
                            <Text fontSize="sm">{repoDetails.language}</Text>
                        </Box>
                    )}
                </HStack>
                <Divider />
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Files:</Text>
                    <List spacing="1">
                        {files.map(file => (
                            <ListItem key={file.name} fontSize="sm">{file.name}</ListItem>
                        ))}
                    </List>
                </Box>
                <Box width="100%">
                    <Text fontSize="md" fontWeight="bold">Languages Used:</Text>
                    <List spacing="1">
                        {Object.entries(languages).map(([language, bytes]) => (
                            <ListItem key={language} fontSize="sm">
                                {language}: {(bytes / Object.values(languages).reduce((a, b) => a + b, 0) * 100).toFixed(2)}%
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </VStack>
        </Box>
    );
}

export default RepoDetails;
