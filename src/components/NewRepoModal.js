import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

function NewRepoModal({ isOpen, onClose, onCreate }) {
    const [repoName, setRepoName] = useState('');
    const [repoDescription, setRepoDescription] = useState('');

    const handleSubmit = () => {
        // Perform validation if needed
        // Call onCreate prop to create new repository
        onCreate({ name: repoName, description: repoDescription });
        // Reset form fields
        setRepoName('');
        setRepoDescription('');
        // Close the modal
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Repository</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Repository Name</FormLabel>
                        <Input value={repoName} onChange={(e) => setRepoName(e.target.value)} placeholder="Enter repository name" />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Description</FormLabel>
                        <Input value={repoDescription} onChange={(e) => setRepoDescription(e.target.value)} placeholder="Enter repository description" />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Create
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default NewRepoModal;

