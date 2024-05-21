// UpdateRepoModal.js
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

function UpdateRepoModal({ isOpen, onClose, onUpdate, repoData }) {
    const [updatedRepoName, setUpdatedRepoName] = useState(repoData ? repoData.name : '');
    const [updatedRepoDescription, setUpdatedRepoDescription] = useState(repoData ? repoData.description : '');

    const handleSubmit = () => {
        if (repoData?.id) {
            onUpdate({ id: repoData.id, name: updatedRepoName, description: updatedRepoDescription });
            setUpdatedRepoName('');
            setUpdatedRepoDescription('');
            onClose();
        } else {
            // Handle the case where repoData is undefined or doesn't have an id property
            console.error('Error: repoData is undefined or missing id property');
        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Repository</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Repository Name</FormLabel>
                        <Input value={updatedRepoName} onChange={(e) => setUpdatedRepoName(e.target.value)} placeholder="Enter updated repository name" />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Description</FormLabel>
                        <Input value={updatedRepoDescription} onChange={(e) => setUpdatedRepoDescription(e.target.value)} placeholder="Enter updated repository description" />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default UpdateRepoModal;
