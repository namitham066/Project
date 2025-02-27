import React, { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.ok) {
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      setMessage("Error resetting password.");
    }
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
      <Box w="360px" bg="white" p="30px" borderRadius="md" boxShadow="lg" textAlign="center">
        <Text fontSize="lg" fontWeight="bold" mb="5px">Reset Password</Text>
        <Input
          placeholder="Enter new password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          size="md"
          mb="10px"
        />
        <Button w="100%" bg="green.500" color="white" _hover={{ bg: "green.600" }} onClick={handleResetPassword}>
          Reset Password
        </Button>
        {message && <Text fontSize="sm" color="green.600" mt="10px">{message}</Text>}
      </Box>
    </Box>
  );
};

export default ResetPassword;
