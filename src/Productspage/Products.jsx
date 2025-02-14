import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Stack,SimpleGrid,Text,Image,Button} from "@chakra-ui/react";
import { BsSuitHeart, BsWhatsapp } from "react-icons/bs";

const Products = () => {
  const { category } = useParams(); 
  const [subData, setSubData] = useState([]);

  useEffect(() => {
    fetch("/subcategory.json") 
      .then((response) => response.json())
      .then((data) => {
        console.log("Category from URL:", category);
        console.log("Data fetched:", data);

       
        const normalizedCategory = category?.trim().toLowerCase();

        
        const matchingCategories = data.filter(
          (cat) => cat.category.trim().toLowerCase() === normalizedCategory
        );

        console.log("Matching categories:", matchingCategories);

        
        const allSubcategories = matchingCategories.flatMap(cat => cat.subcategories);

        setSubData(allSubcategories);
      })
      .catch((error) => console.error("Error fetching subcategories:", error));
  }, [category]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} p={5}>
      {subData.length > 0 ? (
        subData.map((sub) => (
          <Stack key={sub.id} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
            <Image src={sub.img} alt={sub.number} />
            <Text fontSize="lg" fontWeight="bold">{sub.number}</Text>
            <Text fontSize="md">Price: {sub.price}</Text>
            <Stack direction="row" justifyContent="space-between">
              <Button leftIcon={<BsSuitHeart color="#D3145A" />} variant="ghost">
                {sub.likes}
              </Button>
              <Button
                leftIcon={<BsWhatsapp color="#25D366" />}    
                as="a"
                href={sub.whatsappLink}
                target="_blank"
              >
                
              </Button>
            </Stack>
          </Stack>
        ))
      ) : (
        <Text>No subcategories found.</Text>
      )}
    </SimpleGrid>
  );
};

export default Products;
