import React, { useState } from 'react';
import { ChakraProvider, Button, Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import NewRepoModal from './components/NewRepoModal';
import UpdateRepoModal from './components/UpdateRepoModal';

function App() {
  const [isNewRepoModalOpen, setIsNewRepoModalOpen] = useState(false);
  const [isUpdateRepoModalOpen, setIsUpdateRepoModalOpen] = useState(false);

  const openNewRepoModal = () => {
    setIsNewRepoModalOpen(true);
  };

  const closeNewRepoModal = () => {
    setIsNewRepoModalOpen(false);
  };

  const openUpdateRepoModal = () => {
    setIsUpdateRepoModalOpen(true);
  };

  const closeUpdateRepoModal = () => {
    setIsUpdateRepoModalOpen(false);
  };

  const handleCreateRepo = (newRepoData) => {
    console.log('Creating new repository:', newRepoData);
  };

  const handleUpdateRepo = (updatedRepoData) => {
    console.log('Updating repository:', updatedRepoData);
  };

  const handleDeleteRepo = (repoId) => {
    console.log('Deleting repository:', repoId);
  };

  return (
    <ChakraProvider>
      <ErrorBoundary>
        <Box className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-6">
          <Button colorScheme="blue" onClick={openNewRepoModal} className="mb-4">
            Create New Repository
          </Button>
          <Routes>
            <Route path="/" element={<RepoList onOpenUpdateModal={openUpdateRepoModal} onDeleteRepo={handleDeleteRepo} />} />
            <Route path="/repo/:id" element={<RepoDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <NewRepoModal isOpen={isNewRepoModalOpen} onClose={closeNewRepoModal} onCreate={handleCreateRepo} />
          <UpdateRepoModal isOpen={isUpdateRepoModalOpen} onClose={closeUpdateRepoModal} onUpdate={handleUpdateRepo} />
        </Box>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
