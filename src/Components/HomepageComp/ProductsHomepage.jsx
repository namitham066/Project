import React, { useState, useEffect } from "react";
import { Stack, SimpleGrid, Text, useBreakpointValue } from "@chakra-ui/react";
import { BsSuitHeart, BsSuitHeartFill, BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductsHomepage = ({ selectedCategory, selectedSubcategory }) => {
  console.log(selectedCategory, "Selected");

  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");

      const jsonData = await response.json();
      console.log("Raw JSON Data:", jsonData);

      // selectedCategory
      const filteredData = jsonData.filter((item) =>
        item.category ===
          (selectedCategory === "WOMEN"
            ? "Women"
            : selectedCategory === "MEN"
            ? "Men"
            : selectedCategory === "KIDS"
            ? "Kids"
            : "")
      );

      
      const finalData = selectedSubcategory
        ? filteredData.filter(
            (item) => item.subcategory === selectedSubcategory
          )
        : filteredData; 
      setData(finalData); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(); 
  }, [selectedCategory, selectedSubcategory]);

  const handleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SimpleGrid
      pt={"10px"}
      w={useBreakpointValue({ base: "99%", lg: "80%" })}
      gap={"15px"}
      columns={{ base: 1, sm: 2, lg: 4 }}
    >
      {data?.map((el) => (
        <Stack align={"flex-start"} bg={"white"} p={"12px"} key={el.id}>
          <Text pl={"7px"} fontSize={"19px"}>
            {el.title}
          </Text>

          
          <Link to={`/${selectedCategory.toLowerCase()}-category/${encodeURIComponent(el.subcategory)}`}>
            <img
              style={{
                cursor: "pointer",
                height: "400px", 
                objectFit: "cover", 
                width: "100%", 
              }}
              src={el.img}
              alt={el.title}
            />
          </Link>


          <Stack pl={"5px"} direction={"row"}>
            <Stack fontWeight={"500"} lineHeight={"10px"}>
              <Stack direction={"row"}>
                <Text fontSize={"13px"} opacity={"70%"}>
                  By
                </Text>
                <Text fontSize={"15px"}>{el.user}</Text>
              </Stack>
              <Text fontSize={"13px"} opacity={"70%"}>
                {el.followers} Followers
              </Text>
            </Stack>

            <Stack position={"relative"} bottom="40px" direction={"row"}>
              <Stack align={"center"}>
                <Stack
                  _hover={{ cursor: "pointer" }}
                  bg={"white"}
                  w={"50px"}
                  h={"50px"}
                  borderRadius={"50%"}
                  boxShadow={"2px 1px 5px 1px"}
                  align="center"
                  justify={"center"}
                  onClick={() => handleLike(el.id)}
                >
                  {likedItems[el.id] ? (
                    <BsSuitHeartFill color="red" fontSize={"32px"} />
                  ) : (
                    <BsSuitHeart color="#D3145A" fontSize={"32px"} />
                  )}
                </Stack>
                <Text fontWeight={"500"} fontSize={"11px"}>
                  {el.totallikes + (likedItems[el.id] ? 1 : 0)} Likes
                </Text>
              </Stack>

              {/* Share icon design */}
              <Stack>
                <Stack align={"center"}>
                  <Stack
                    onClick={() => window.open("", "_blank")}
                    align="center"
                    justify={"center"}
                    _hover={{ cursor: "pointer" }}
                    w={"50px"}
                    bg={"white"}
                    boxShadow={"2px 1px 5px 1px"}
                    h={"50px"}
                    borderRadius={"50%"}
                  >
                    <BsWhatsapp fontSize={"32px"} color={"#9FDA65"} />
                  </Stack>
                  <Text fontWeight={"500"} fontSize={"11px"}>
                    Share
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default ProductsHomepage;
