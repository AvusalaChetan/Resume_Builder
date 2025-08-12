```jsx
import { Box, Flex, Heading, Input, Textarea, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Flex direction="column" minH="100vh">
      {/* Navbar */}
      <Box bg="teal.500" p={4} color="white">
        <Heading size="md">Resume Builder</Heading>
      </Box>

      {/* Main Content */}
      <Flex flex="1" p={6} gap={6}>
        {/* Left - Form */}
        <Box flex="1" bg="gray.50" p={4} borderRadius="md" shadow="sm">
          <Heading size="md" mb={4}>Enter Your Details</Heading>
          <Input placeholder="Full Name" mb={3} />
          <Input placeholder="Email" mb={3} />
          <Textarea placeholder="Summary" mb={3} />
          <Button colorScheme="teal">Generate Resume</Button>
        </Box>

        {/* Right - Preview */}
        <Box flex="1" bg="white" p={4} borderRadius="md" shadow="md">
          <Heading size="md" mb={2}>Preview</Heading>
          <Box border="1px" borderColor="gray.200" p={4} minH="300px">
            Your resume will appear here...
          </Box>
        </Box>
      </Flex>

      {/* Footer */}
      <Box bg="gray.100" p={4} textAlign="center">
        © 2025 Resume Builder
      </Box>
    </Flex>
  )
}
```
