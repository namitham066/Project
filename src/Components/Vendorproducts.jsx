import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
  Textarea,
  CheckboxGroup,
  Stack,
  Checkbox,
  useToast,
  Text,
} from "@chakra-ui/react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    img: "",
    price: "",
    description: "",
    sizes: [],
    color: [],
    quantity: "",
  });

  const toast = useToast();
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    const storedVendor = JSON.parse(localStorage.getItem("vendor"));
    const token = localStorage.getItem("token");  
  
    console.log("Local Storage Vendor:", storedVendor);
    console.log(" Local Storage Token:", token);
  
    if (!storedVendor || !storedVendor.id || !token) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in as a vendor to add products.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: formData[name].includes(value)
        ? formData[name].filter((v) => v !== value)
        : [...formData[name], value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in as a vendor.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const response = await fetch("http://localhost:5000/api/vendor/add-product", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast({
        title: "Product Added!",
        description: "Your product has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        title: "",
        category: "",
        subcategory: "",
        img: "",
        price: "",
        description: "",
        sizes: [],
        color: [],
        quantity: "",
      });

      fetchProducts(); 
    } else {
      toast({
        title: "Error",
        description: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/getProducts");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      mt={10}
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="Enter product title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </Select>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Subcategory</FormLabel>
          <Input
            type="text"
            name="subcategory"
            placeholder="Enter subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Image URL</FormLabel>
          <Input
            type="text"
            name="img"
            placeholder="Enter image URL"
            value={formData.img}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Available Sizes</FormLabel>
          <CheckboxGroup value={formData.sizes}>
            <Stack direction="row">
              {["S", "M", "L", "XL"].map((size) => (
                <Checkbox
                  key={size}
                  value={size}
                  onChange={(e) => handleCheckboxChange("sizes", e.target.value)}
                >
                  {size}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Available Colors</FormLabel>
          <CheckboxGroup value={formData.color}>
            <Stack direction="row">
              {["Red", "Blue", "Black", "White"].map((color) => (
                <Checkbox
                  key={color}
                  value={color}
                  onChange={(e) => handleCheckboxChange("color", e.target.value)}
                >
                  {color}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Stock Quantity</FormLabel>
          <Input
            type="number"
            name="quantity"
            placeholder="Enter stock quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </FormControl>

        {formData.quantity && (
          <Text color={formData.quantity < 5 ? "red.500" : "green.500"} fontSize="sm">
            {formData.quantity < 5
              ? `Only ${formData.quantity} left in stock!`
              : `${formData.quantity} available`}
          </Text>
        )}

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          mt={4}
          _hover={{ bg: "blue.500" }}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
