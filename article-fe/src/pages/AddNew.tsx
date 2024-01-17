import { FormControl, FormLabel, Button, Input, Box, Center } from '@chakra-ui/react'
import { handleArticle } from '../hooks/articleHooks';

export function AddNew() {
    const {handleChange, createData} = handleArticle();

    return (
        <>
            <Center mt={'90px'}>
                <Box display={'flex'} flexDirection={'column'} w={'40%'} gap={3}>
                    <Box>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <form onSubmit={createData}>
                                <Input name="title" onChange={handleChange}/>
                            </form>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>Content</FormLabel>
                            <form onSubmit={createData}>
                                <Input name="content" onChange={handleChange}/>
                            </form>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <form onSubmit={createData}>
                                <Input name="category" onChange={handleChange}/>
                            </form>
                        </FormControl>
                    </Box>
                    <Box display={'flex'} mt={'60px'} justifyContent={'space-around'}>
                        <Button colorScheme='blue'>Draft</Button>
                        <Button colorScheme='yellow'>Publish</Button>
                    </Box>
                </Box>
            </Center>
        </>
    )
}