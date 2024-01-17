import { Table, TableContainer, Thead, Td, Tr, Th, Tbody, TabPanel, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { IArticle } from '../interfaces/Article'
import { API } from '../lib/api'
import { useParams } from 'react-router-dom'

export default function AllPosts() {
    const {limit, offset} = useParams()
    const [articles, setArticles] = useState<IArticle[]>()
    const [tabIndex, setTabIndex] = useState(0)

    const navigate = useNavigate()

    const handleClick = () => {
        setTabIndex(2)
    }
    
    const handleTabsChange = (index: any) => {
        setTabIndex(index)
    }
    
    const getArticles = async () => {
        try {
            const response = await API.get(`/article/${limit}/${offset}`);
            setArticles(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('error get articles', error);
        }
    }

    useEffect(() => {
        getArticles();
    }, [])

    return (
        <>
            <Tabs index={tabIndex} onChange={handleTabsChange}>
                <TabList>
                    <Tab>Published</Tab>
                    <Tab>Drafts</Tab>
                    <Tab>Trashed</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Category</Th>
                                    <Th>Action</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                    {articles?.map((item, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{item.title}</Td>
                                                <Td>{item.category}</Td>
                                                <Td>
                                                    <EditIcon onClick={() => navigate('/edit')} mr={'17px'}/>
                                                    <DeleteIcon onClick={handleClick}/>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Category</Th>
                                    <Th>Action</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                    {articles?.map((item, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{item.title}</Td>
                                                <Td>{item.category}</Td>
                                                <Td>
                                                    <EditIcon onClick={() => navigate('/edit')} mr={'17px'}/>
                                                    <DeleteIcon onClick={handleClick}/>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Category</Th>
                                    <Th>Action</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                    {articles?.map((item, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{item.title}</Td>
                                                <Td>{item.category}</Td>
                                                <Td>
                                                    <EditIcon onClick={() => navigate('/edit')} mr={'17px'}/>
                                                    <DeleteIcon onClick={handleClick}/>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}