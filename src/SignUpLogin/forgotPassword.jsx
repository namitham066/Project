import React, { useState } from "react";
import {
  
  Input,
  Button,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/lime_logo.png";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.ok) {
        setTimeout(() => {
          onClose(); // Close modal after success
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setMessage("Error sending reset link.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={6} borderRadius="md" maxW="400px">
        <ModalCloseButton />
        <ModalHeader textAlign="center">
          <Image src={logo} alt="LimeRoad Logo" w="150px" m="auto" mb="10px" />
          Reset Password
        </ModalHeader>
        <ModalBody>
          <Text fontSize="sm" color="gray.500" mb="15px" textAlign="center">
            Enter your registered email to receive a reset link.
          </Text>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleResetRequest}
          >
            Send Reset Link
          </Button>
          {message && <Text fontSize="sm" color="green.600" mt="10px" textAlign="center">{message}</Text>}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// **Trigger Component**
const ForgotPassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text fontSize="sm" color="blue.500" cursor="pointer" textAlign="center" onClick={onOpen}>
        Forgot Password?
      </Text>
      <ForgotPasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ForgotPassword;
