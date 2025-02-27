import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Flex,
  Input,
  Checkbox,
  CheckboxGroup,
  VStack,
  Select
} from "@chakra-ui/react";

const KidsSubcategory = () => {
  const { subcategory } = useParams(); 
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const jsonData = await response.json();

        
        const kidsCategory = jsonData.find((item) => item.category === "kids");

        if (kidsCategory) {
          const foundSubcategories = kidsCategory.subcategories.filter(
            (sub) => sub.name.toLowerCase() === subcategory.toLowerCase()
          );

          if (foundSubcategories.length > 0) {
            
            const mergedProducts = foundSubcategories.flatMap((sub) => sub.products);
            setSubcategoryData(mergedProducts);
          } else {
            setSubcategoryData([]); 
          }
        }
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };

    fetchSubcategoryData();
  }, [subcategory]);

  
  const availableColors = [
    ...new Set(subcategoryData.flatMap((item) => item.color || [])),
  ];

  
  const filteredData = subcategoryData.filter((item) => {
    const price = parseInt(item.price?.replace("Rs. ", "").trim(), 10);
    const min = minPrice ? parseInt(minPrice, 10) : 0;
    const max = maxPrice ? parseInt(maxPrice, 10) : Infinity;
    const matchesPrice = price >= min && price <= max;

    const matchesColor =
      selectedColors.length === 0 || selectedColors.some((color) => item.color.includes(color));

    return matchesPrice && matchesColor;
  });

  
  const sortedData = [...filteredData].sort((a, b) => {
    const priceA = parseInt(a.price?.replace("Rs. ", "").trim(), 10);
    const priceB = parseInt(b.price?.replace("Rs. ", "").trim(), 10);

    if (sortOption === "High Price") return priceB - priceA;
    if (sortOption === "Low Price") return priceA - priceB;
    return 0;
  });

  return (
    <Flex p="20px" flexDirection={{ base: "column", lg: "row" }} gap="20px">
     
      <Box flex="1" p="20px" bg="gray.50" borderRadius="8px">
        <Text fontSize="20px" fontWeight="bold" mb="10px">
          Filter & Sort
        </Text>

       
        <Text fontSize="16px" fontWeight="bold" mt="10px">
          Filter by Price
        </Text>
        <Flex gap="10px" mt="5px">
          <Input
            placeholder="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            bg="white"
            width="45%"
          />
          <Input
            placeholder="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            bg="white"
            width="45%"
          />
        </Flex>

        {/* Color Filter */}
        <Text fontSize="16px" fontWeight="bold" mt="15px">
          Filter by Color
        </Text>
        <CheckboxGroup
          colorScheme="green"
          value={selectedColors}
          onChange={(values) => setSelectedColors(values)}
        >
          <VStack align="start" spacing="5px" mt="5px">
            {availableColors.map((color) => (
              <Checkbox key={color} value={color}>
                {color}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>

        {/* Sort By */}
        <Text fontSize="16px" fontWeight="bold" mt="15px">
          Sort By
        </Text>
        <Select
          placeholder="Select"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
          mt="5px"
          bg="white"
        >
          <option value="Trending">Trending</option>
          <option value="New">New</option>
          <option value="Discounts">Discounts</option>
          <option value="High Price">High Price</option>
          <option value="Low Price">Low Price</option>
        </Select>
      </Box>

      {/* Right Side - Product Grid */}
      <Box flex="3">
        <Text fontSize="24px" fontWeight="bold" mb="10px">
          {subcategory}
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing="15px">
          {sortedData.length > 0 ? (
            sortedData.map((item) => (
              <Link to={`/product/${item._id}`} key={item._id}>
                <Box
                  p="10px"
                  bg="white"
                  border="1px solid #ccc"
                  borderRadius="8px"
                  cursor="pointer"
                  _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    borderRadius="8px"
                    width="100%"
                    height="300px"
                    objectFit="cover"
                  />
                  <Text color="green.600">
                                      {/* ₹{item.price?.replace("Rs. ", "").trim()} */}
                                      ₹{item.price}
                                    </Text>
                  <Flex gap="5px" mt="5px">
                    {item.color.map((color) => (
                      <Box key={color} w="20px" h="20px" bg={color.toLowerCase()} border="1px solid black" />
                    ))}
                  </Flex>
                </Box>
              </Link>
            ))
          ) : (
            <Text fontSize="18px" color="red.500">
              No products found matching the selected filters.
            </Text>
          )}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default KidsSubcategory;
