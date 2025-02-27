import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, Button, Select, VStack, Image, Text, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/lime_logo.png";

const Login = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    companyName: "",
    productName: "",
    username: "",
    userType: "customer",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        emailOrPhone: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        companyName: "",
        productName: "",
        username: "",
        userType: "customer",
      });
      setIsForgotPassword(false);
      setMessage("");
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const handleAuthAction = async (e) => {
  e.preventDefault();

  if (isForgotPassword) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.emailOrPhone }),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.ok) {
        setTimeout(() => onClose(), 3000);
      }
    } catch (error) {
      setMessage("Error sending reset link.");
    }
    return;
  }

  const endpoint = isSignup
    ? `http://localhost:5000/api/auth/signup/${formData.userType}`
    : "http://localhost:5000/api/auth/login";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        isSignup
          ? formData
          : { emailOrPhone: formData.emailOrPhone, password: formData.password }
      ),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Login failed!");

    alert(result.message || "Login successful!");

  
    localStorage.setItem("token", result.token); 
    localStorage.setItem("role", result.role);
    localStorage.setItem("user", JSON.stringify({
      // emailOrPhone: formData.emailOrPhone,
      // role: result.role,
      vendorId: result.vendorId, 
    }));

    
    if (result.role === "vendor") {
      setTimeout(() => navigate("/vendor-dashboard"), 500);
    } else {
      setTimeout(() => navigate("/"), 500);
    }

    onClose();
    onLoginSuccess();
  } catch (error) {
    alert(error.message || "Something went wrong. Please try again!");
  }
};

  
  
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" position="fixed" top="0" left="0" w="100vw" h="100vh" />
      <ModalContent p={10} borderRadius="md">
        <ModalCloseButton />
        <ModalHeader textAlign="center">
          <Image src={logo} alt="LimeRoad Logo" w="120px" m="auto" mb="10px" />
          {isForgotPassword ? "Reset Password" : isSignup ? "Sign Up" : "Login"}
        </ModalHeader>

        <ModalBody>
          <VStack spacing={4} as="form" onSubmit={handleAuthAction}>
            {isForgotPassword ? (
              <>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  Enter your registered email to receive a reset link.
                </Text>
                <Input placeholder="Enter your email" name="emailOrPhone" type="email" value={formData.emailOrPhone} onChange={handleInputChange} required />
                <Button w="100%" bg="green.500" color="white" _hover={{ bg: "green.600" }} type="submit">
                  Send Reset Link
                </Button>
                {message && <Text fontSize="sm" color="green.600" mt="10px" textAlign="center">{message}</Text>}
                <Text fontSize="sm" color="blue.500" cursor="pointer" textAlign="center" onClick={() => setIsForgotPassword(false)}>
                  Back to Login
                </Text>
              </>
            ) : (
              <>
                {isSignup ? (
                  <>
                    <Select value={formData.userType} onChange={handleUserTypeChange} required>
                      <option value="customer">Customer</option>
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
                    </Select>
                    {formData.userType !== "admin" && <Input placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} required />}
                    {formData.userType === "admin" && <Input placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} required />}
                    <Input placeholder="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    <Input placeholder="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                    {formData.userType !== "admin" && <Input placeholder="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />}
                    {formData.userType === "vendor" && (
                      <>
                        <Input placeholder="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                        <Input placeholder="Product Name" name="productName" value={formData.productName} onChange={handleInputChange} required />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Input placeholder="Email or Phone" name="emailOrPhone" value={formData.emailOrPhone} onChange={handleInputChange} required />
                    <Input placeholder="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                  </>
                )}

                <Button w="100%" bg="green.500" color="white" _hover={{ bg: "green.600" }} type="submit">
                  {isSignup ? "Sign Up" : "Login"}
                </Button>

                <Divider my="10px" />
                {!isSignup && (
                  <Text fontSize="sm" color="blue.500" cursor="pointer" textAlign="center" onClick={() => setIsForgotPassword(true)}>
                    Forgot Password?
                  </Text>
                )}
                <Text fontSize="sm" textAlign="center">
                  {isSignup ? "Already have an account? " : "Don't have an account? "}
                  <Text as="span" color="green.500" cursor="pointer" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Login" : "Sign Up"}
                  </Text>
                </Text>
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Login;
