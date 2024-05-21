import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Input, Select, List } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import RepoItem from './RepoItem';

function RepoList({ onOpenUpdateModal, onDeleteRepo }) {
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        async function fetchRepos() {
            try {
                const response = await axios.get(`https://api.github.com/users/Tiloyeade/repos`, {
                    headers: {
                        Authorization: `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`, // Replace YOUR_ACCESS_TOKEN with your GitHub access token
                    },
                    params: {
                        visibility: 'all',
                        page: currentPage + 1,
                        per_page: 10,
                    },
                });
                setRepos(response.data);
                setFilteredRepos(response.data);
                const totalCount = response.headers['x-total-count'];
                const calculatedPageCount = Math.ceil(totalCount / 10);
                setPageCount(calculatedPageCount || 0); // Ensure pageCount is not undefined
            } catch (error) {
                console.error('Error fetching repos:', error);
            }
        }
        fetchRepos();
    }, [currentPage]);

    useEffect(() => {
        const filtered = repos.filter(repo => {
            const searchMatch = repo.name.toLowerCase().includes(searchTerm.toLowerCase());
            const filterMatch = filterCriteria ? repo.language === filterCriteria : true;
            return searchMatch && filterMatch;
        });
        setFilteredRepos(filtered);
    }, [repos, searchTerm, filterCriteria]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const handleFilter = event => {
        setFilterCriteria(event.target.value);
    };

    return (
        <Box p="4" className="bg-blue-100 min-h-screen" maxW="sm" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box mb="4">
                <Text fontSize="2xl" fontWeight="bold" mb="2" align="center">My GitHub Repositories Portfolio</Text>
                <Input
                    type="text"
                    placeholder="Search repositories"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 mb-2 border rounded"
                />
                <Select
                    value={filterCriteria}
                    onChange={handleFilter}
                    className="w-full p-2 mb-2 border rounded"
                >
                    <option value="">All Languages</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                </Select>
            </Box>
            <List className="space-y-2">
                {filteredRepos.map(repo => (
                    <RepoItem key={repo.id} repo={repo} onOpenUpdateModal={onOpenUpdateModal} onDeleteRepo={onDeleteRepo} />
                ))}
            </List>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName="pagination flex justify-center space-x-2 mt-4"
                activeClassName="active"
                previousLabel={"<"}
                nextLabel={">"}
                pageClassName="page-item"
                pageLinkClassName="page-link px-3 py-1 border rounded"
                previousClassName="page-item"
                previousLinkClassName="page-link px-3 py-1 border rounded"
                nextClassName="page-item"
                nextLinkClassName="page-link px-3 py-1 border rounded"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link px-3 py-1 border rounded"
            />
        </Box>
    );
}

export default RepoList;
