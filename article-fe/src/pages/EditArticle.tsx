import { Button, Input, Box, Text, Center } from '@chakra-ui/react'

export function EditArticle() {
    return (
        <>
            <Center mt={'90px'}>
                <Box display={'flex'} flexDirection={'column'} w={'40%'} gap={3}>
                    <Box>
                        <Text mb='8px'>Title</Text>
                        <Input/>
                    </Box>
                    <Box>
                        <Text mb='8px'>Content</Text>
                        <Input/>
                    </Box>
                    <Box>
                        <Text mb='8px'>Category</Text>
                        <Input/>
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