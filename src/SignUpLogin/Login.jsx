import React, { useState } from "react";
import { Box, Input, Button, Text, Divider, Image } from "@chakra-ui/react";
import logo from "../assets/lime_logo.png"

const Login = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleLogin = () => {
    alert(`Logging in with: ${input}`);
    
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="#f8f8f8"
    >
      <Box
        w="360px"
        bg="white"
        p="30px"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
      >
       
        <Image src={logo} 
          alt="LimeRoad Logo"
          w="150px"
          m="auto"
          mb="10px"
        />

        <Text fontSize="lg" fontWeight="bold" mb="5px">
          Sign In
        </Text>
        <Text fontSize="sm" color="gray.500" mb="15px">
          Sign in to access your account
        </Text>

        <Input
          placeholder="Enter Mobile Number or Email"
          value={input}
          onChange={handleInputChange}
          size="md"
          mb="10px"
          borderColor="gray.400"
          focusBorderColor="green.500"
        />

        <Button
          w="100%"
          bg="green.500"
          color="white"
          _hover={{ bg: "green.600" }}
          onClick={handleLogin}
        >
          Continue
        </Button>

        <Divider my="15px" />

        <Text fontSize="sm" mt="10px">
          New to LimeRoad?{" "}
          <Text as="span" color="green.500" cursor="pointer">
            Sign Up
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
