import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Select,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/lime_logo.png";

const SignupModal = ({ isOpen, onClose }) => {
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    productName: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      companyName: "",
      productName: "",
      username: "",
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:5000/api/auth/signup/${userType}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Signup successful!");
        onClose();
        navigate("/"); // Redirect after signup
      } else {
        alert(result.message || "Signup failed!");
      }
    } catch (error) {
      alert("Error during signup: " + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
       <ModalOverlay bg="blackAlpha.600" position="fixed" top="0" left="0" w="100vw" h="100vh" />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Image src={logo} alt="LimeRoad Logo" w="120px" m="auto" mb="5px" />
          Sign Up
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} as="form" onSubmit={handleSignup}>
            <Select value={userType} onChange={handleUserTypeChange} required>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </Select>

            {userType !== "admin" && (
              <Input
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            )}

            {userType === "admin" && (
              <Input
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            )}

            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {userType !== "admin" && (
              <Input
                placeholder="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            )}

            {userType === "vendor" && (
              <>
                <Input
                  placeholder="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  placeholder="Product Name"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            <Button w="100%" colorScheme="green" type="submit">
              Sign Up
            </Button>

            <Text fontSize="sm">
              Already have an account?{" "}
              <Text as="span" color="green.500" cursor="pointer" onClick={onClose}>
                Login
              </Text>
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
